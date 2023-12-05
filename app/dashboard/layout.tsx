"use client";
import { SessionProvider } from "next-auth/react";

const LayoutWithNextAuthSession: React.FC<{
	children?: React.ReactNode;
}> = ({ children }) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default LayoutWithNextAuthSession;
