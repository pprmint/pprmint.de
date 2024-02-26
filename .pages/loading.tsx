import Head from "src/components/Head";
import LoadingCircle from "src/components/LoadingCircle";

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
