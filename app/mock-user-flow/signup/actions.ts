"use server";
import jwt from "jsonwebtoken";
import prisma from "../../../prisma/prismaClient";

/**
 * Generates a and sends a verification email to the user.
 * @param email
 * @param callbackUrl
 */
export const sendAsyncVerificationEmail = async (
	email: string,
	callbackUrl?: string
) => {
	const user = await prisma.user
		.findUniqueOrThrow({ where: { email } })
		.catch((e) => {
			console.error(e);
			throw new Error(
				"User not found in db while trying to send verification email"
			);
		});
	const id = user.id;
	const token = jwt.sign({ id }, process.env.NEXTAUTH_SECRET + email, {
		// TODO change this to an appropriate expiration date for your use case
		expiresIn: "3d",
	});

	console.log("Use this link to verify your account");
	const url = new URL("http://localhost:3000/verify-email");
	url.searchParams.append("token", token);
	url.searchParams.append("userEmail", email);

	//TODO add redirection to your logic if needed
	callbackUrl && url.searchParams.append("redirectUrl", callbackUrl);

	// TODO use your email API or nodemailer setup to send this url to the user
	console.log(url.toString());
};
