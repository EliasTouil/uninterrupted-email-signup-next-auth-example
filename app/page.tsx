import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24 gap-16">
			<div className="relative flex flex-col place-items-center gap-4 ">
				<div className="text-xl">
					Passwordless and verificationless user signup with next-auth
				</div>
				<p className="w-1/2 mt-2">
					In this example, a user can signup within a user flow using only and
					email address, and verify the email address at a later time.
				</p>
			</div>

			<Link
				href="/mock-user-flow/signup"
				className="text-blue-600 underline cursor-pointer"
			>
				Begin user flow ↗️
			</Link>
		</main>
	);
}
