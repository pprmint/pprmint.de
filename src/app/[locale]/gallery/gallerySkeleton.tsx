export default function GallerySkeleton() {
	return (
		<div className="mb-10 grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 animate-pulse">
			{[...Array(20)].map((_, index) => (
				<div key={index} className="bg-neutral-900 rounded-lg w-full aspect-video" />
			))}
		</div>
	);
}
