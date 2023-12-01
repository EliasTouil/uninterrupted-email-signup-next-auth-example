import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { createUser } from "./actions";
import prisma from "../../../../prisma/prismaClient";

const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	adapter: PrismaAdapter(prisma),
	events: {
		createUser,
	},
	callbacks: {
		async session({ session }) {
			// TODO revise this
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
	providers: [],
};

export default authOptions;
