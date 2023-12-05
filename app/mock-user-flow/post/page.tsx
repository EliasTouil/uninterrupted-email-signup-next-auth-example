"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { createPostAction } from "./actions";
import { useRouter } from "next/navigation";

const MockUserFlowPostPage = () => {
	const [post, setPost] = useState("");
	const session = useSession();
	const router = useRouter();
	const handleCreatePost = () => {
		createPostAction(post, session.data!.user!.email!).then((res) => {
			router.push("/dashboard");
		});
	};

	const disabled = !session.data?.user?.email || !post;
	return (
		<div className="flex flex-col justify-center items-center w-full h-[100dvh]">
			<div className="w-[350px] h-[100%] flex flex-col items-stretch justify-center">
				<label htmlFor="post">Post</label>
				<textarea
					value={post}
					id="post"
					onChange={(e) => setPost(e.target.value)}
				/>
				<button
					onClick={handleCreatePost}
					className="mt-8 rounded-lg text-lime-50 bg-lime-600"
					disabled={disabled}
				>
					{disabled && "disabled: "}Create first post
				</button>
			</div>
		</div>
	);
};

export default MockUserFlowPostPage;
