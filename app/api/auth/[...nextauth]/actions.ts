"use server";

import { EventCallbacks } from "next-auth";
import prisma from "../../../../prisma/prismaClient";

export const createUser: EventCallbacks["createUser"] = async ({ user }) => {
	//placeholder
	await prisma.user
		.update({
			where: { id: user.id },
			data: {},
		})
		.catch((e: any) => {
			console.error(
				"Failed to update new user (initial user creation and setup)"
			);
			console.error(e);
		});
};
