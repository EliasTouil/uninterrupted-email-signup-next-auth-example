import jwt from "jsonwebtoken";
import prisma from "../../prisma/prismaClient";
import { redirect } from "next/navigation";

export interface VerifyTokenPageProps {
	searchParams?: {
		userEmail?: string;
		token?: string;
		redirectUrl?: string;
	};
}

const verifyToken = (token: string, userEmail: string) =>
	new Promise((resolve) => {
		jwt.verify(token, process.env.NEXTAUTH_SECRET + userEmail, (err) => {
			if (err) resolve(false);
			if (!err) resolve(true);
		});
	});

/**
 * Verifies a user using a url with a signed token and userEmail.
 * Will NOT sign the user in.
 * @param param0
 * @returns
 */
const VerifyTokenPage: React.FC<VerifyTokenPageProps> = async ({
	searchParams,
}) => {
	const { token, redirectUrl, userEmail } = searchParams || {};
	if (!token || !userEmail) {
		//TODO use Nextjs' error page to have a nice display
		throw new Error("No token provided");
	}

	const isTokenValid = await verifyToken(token, userEmail);

	if (!isTokenValid) {
		//TODO use Nextjs' error page to have a nice display
		throw new Error("Token is not valid");
	}
	console.log("verify token page baby");
	await prisma.user
		.update({
			where: { email: userEmail },
			data: { emailVerified: new Date(Date.now()) },
		})
		.then((res) => console.log(res));

	// TODO simple redirect logic, you can improve this by showing a toaster and redirecting or something that fits your use case.
	if (redirectUrl) {
		return redirect(redirectUrl);
	}
	return redirect("/verify-email/verified");
};

export default VerifyTokenPage;
