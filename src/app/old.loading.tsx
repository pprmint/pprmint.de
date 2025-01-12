import Spinner from "src/components/loading/Glow";

export default function Loading() {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<Spinner />
		</div>
	);
}
