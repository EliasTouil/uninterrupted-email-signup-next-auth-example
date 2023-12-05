"use server";
import prisma from "../../../prisma/prismaClient";

export const createPostAction = (post: string, userEmail: string) => {
	return prisma.post.create({
		data: { text: post, author: { connect: { email: userEmail } } },
	});
};
