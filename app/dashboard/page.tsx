"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getAuthorPostByEmail } from "./actions";
import { Post } from "@prisma/client";
import { sendAsyncVerificationEmail } from "../mock-user-flow/signup/actions";

const DashboardPage = () => {
	const session = useSession();
	const [posts, setPosts] = useState<Post[]>([]);
	const [called, setCalled] = useState(false);

	useEffect(() => {
		if (!called && session.data?.user?.email) {
			getAuthorPostByEmail(session.data.user.email).then((res) => {
				setPosts(res);
				setCalled(true);
			});
		}
	}, [called, session?.data?.user.email]);

	const handleResendVerificationEmail = () =>
		sendAsyncVerificationEmail(session.data!.user!.email!, "/dashboard");

	const userIsVerified = session.data?.user?.emailVerified;

	return (
		<div className="">
			<div className="flex flex-col justify-center items-center w-full h-[100dvh]">
				<div className="w-[350px] h-[100%] flex flex-col items-stretch justify-center gap-8">
					<div className="text-2xl">Welcome {session.data?.user?.email}</div>
					{!userIsVerified && (
						<div className="flex flex-col justify-center items-center rounded-lg bg-amber-300 text-amber-800 p-4">
							<h2 className="text-xl font-medium w-[100%]">
								{posts.length} posts waiting for verification.
							</h2>
							<p className="">
								A verification e-mail was sent to you. Let&apos;s make sure
								nobody is spoofing you.
							</p>
							<button
								onClick={handleResendVerificationEmail}
								className="font-medium border-2 border-amber-800 rounded-lg p-2 mt-4"
							>
								Resend
							</button>
						</div>
					)}
					<ul>
						{posts.map((post) => (
							<li key={post.id} className="text-xl">
								{post.text}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
