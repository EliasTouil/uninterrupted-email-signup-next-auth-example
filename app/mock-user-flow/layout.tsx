"use client";
import { SessionProvider } from "next-auth/react";

const LayoutWithNextAuthSession: React.FC<{
	children?: React.ReactNode;
}> = ({ children }) => {
	//TODO this flow is meant for a first time / onboarding user, handle here any redirection if the user is authenticated or not meant to be here.
	return <SessionProvider>{children}</SessionProvider>;
};

export default LayoutWithNextAuthSession;
