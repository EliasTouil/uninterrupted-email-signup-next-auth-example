import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/authOptions";

const TestServerSession = async () => {
	const session = await getServerSession(authOptions);
	console.log(session);
	return (
		<div className="w-full h-[100dvh]">
			current user e-mail: {session?.user.email}
		</div>
	);
};

export default TestServerSession;
