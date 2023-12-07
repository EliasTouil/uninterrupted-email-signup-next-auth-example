import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUser } from "./actions";
import prisma from "../../../../prisma/prismaClient";
import Email from "next-auth/providers/email";
import { decode, encode } from "next-auth/jwt";

const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	//TODO add your own adapter here if not using prisma, and cmd+f prisma to replace it where it's used
	adapter: PrismaAdapter(prisma),
	events: {
		createUser,
	},
	callbacks: {
		async session({ session }) {
			// TODO revise this as it's copy pastaed from another project
			if (!session.user || !session.user.email) {
				return session;
			}

			let user = await prisma.user.findUnique({
				where: { email: session.user.email },
			});

			const nextUser = { ...session.user, ...user };

			session.user = nextUser;
			return session;
		},
	},
	providers: [
		Email({
			async sendVerificationRequest(params) {
				// TODO use your email API or nodemailer setup to send this url to the user
				// NB, you can also not specify this sendVerificationRequest function and use next-auth defaults
				console.log("Use this magic link lo sign in");
				console.log(params.url);
			},
		}),
		CredentialsProvider({
			name: "Onboarding Signup",
			id: "onboarding-signup",
			credentials: {
				email: { label: "email", type: "email", placeholder: "email" },
			},
			async authorize(credentials) {
				if (!credentials?.email) {
					throw new Error("No email provided");
				}

				// If user exists, it means the user was here already here. He's not supposed to.
				// Maybe it's just an accident
				// Or it's sus af and someone may be trying to abuse this feature to impersonate the user
				const userExists = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!!userExists) {
					throw new Error("User already exists.");
				}

				const user = await prisma.user.create({
					data: { email: credentials.email },
				});

				//TODO the "createUser" event is not fired when using credentials provider
				// If you had some custom logic in it, here is a good place to call it

				return user;
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 7 * 24 * 60 * 60, // 7 days
	},
	jwt: { encode, decode },
	pages: {
		// TODO add your base sign in page here, or at least obscure the default one
		//signIn: "/",
	},
};

export default authOptions;
