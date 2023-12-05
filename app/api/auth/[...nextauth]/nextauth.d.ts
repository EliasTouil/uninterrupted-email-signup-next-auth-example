import "next-auth";

// This is how we extend the session object
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
