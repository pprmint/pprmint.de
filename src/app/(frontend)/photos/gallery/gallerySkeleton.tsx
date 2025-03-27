export default function GallerySkeleton() {
	return (
		<>
			<div className="mb-10 grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse">
				{[...Array(20)].map((_, index) => (
					<div key={index} className="bg-neutral-black/5 dark:bg-white/5 w-full aspect-[3/2]" />
				))}
			</div>
		</>
	);
}
