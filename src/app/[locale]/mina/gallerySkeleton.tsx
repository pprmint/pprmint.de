export default function GallerySkeleton() {
	return (
		<div className="mb-10 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 animate-pulse">
			{[...Array(20)].map((_, index) => (
				<div key={index} className="bg-neutral-900 rounded-lg w-full aspect-square" />
			))}
		</div>
	);
}
