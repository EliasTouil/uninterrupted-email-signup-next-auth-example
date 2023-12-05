"use server";
import prisma from "../../prisma/prismaClient";

export const getAuthorPostByEmail = async (email: string) => {
	return prisma.post.findMany({
		where: { author: { email } },
	});
};
