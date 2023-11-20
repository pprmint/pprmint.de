import Head from "components/Head";
import LoadingCircle from "components/LoadingCircle";

export default function Loading() {
	return (
		<>
			<Head
				title="Loading circle"
				description="It's loading absolutely nothing."
			/>
			<main className="flex w-screen h-screen items-center justify-center">
				<LoadingCircle />
			</main>
		</>
	);
}
