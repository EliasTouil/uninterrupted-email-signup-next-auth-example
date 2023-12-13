"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { sendAsyncVerificationEmail } from "./actions";
import { useRouter } from "next/navigation";

const MockUserFlowSignupPage = () => {
	const [email, setEmail] = useState("");
	const [needsMagicLink, setNeedsMagicLink] = useState(false);
	const router = useRouter();

	const handleSignup = async () => {
		signIn("onboarding-signup", {
			email,
			redirect: false,
			callbackUrl: "/mock-user-flow/post",
		}).then((res) => {
			if (!res)
				throw new Error("Unknown internal server error at signup, no response");
			if (res.error === "User already exists.") {
				console.log(
					"User already exists .... retyring with email provider to send verification e-mail"
				);

				signIn("email", {
					email,
					redirect: false,
					callbackUrl: "/mock-user-flow/post",
				});
				setNeedsMagicLink(true);
			}
			// You can provide a redirectUrl as second parameter
			sendAsyncVerificationEmail(email);
			router.push("/mock-user-flow/post");
		});
	};

	const session = useSession();

	return (
		<div className="flex flex-col justify-center items-center w-full h-[100dvh]">
			<div className="">{session.status}</div>
			<div className="w-[350px] h-[100%] flex flex-col items-stretch justify-center">
				<label htmlFor="email">Email</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
				/>
				<button
					onClick={handleSignup}
					className="mt-8 rounded-lg text-sky-50 bg-sky-600"
					disabled={needsMagicLink}
				>
					Sign up {needsMagicLink && "(disabled)"}
				</button>
				{needsMagicLink && (
					<div className="mt-8">
						<p>
							You need to use the magic link to sign in. Check your email for a
							link.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default MockUserFlowSignupPage;
