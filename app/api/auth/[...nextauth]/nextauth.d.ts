import "next-auth";

// This is how we augment the session
declare module "next-auth" {
	interface User {
		id?: string;
		handle?: string | null;
		image?: string | null;
		emailVerified?: boolean | Date | null;
		bio?: string | null;
		createdAt?: Date;
		updatedAt?: Date;
	}

	interface Session {
		user: User;
	}
}
