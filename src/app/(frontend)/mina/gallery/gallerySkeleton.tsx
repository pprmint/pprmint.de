export default function GallerySkeleton() {
	return (
		<div className="animate-pulse border-x border-black/5 dark:border-white/5">
			<div className="group grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 md:p-2 border-y border-black/5 dark:border-white/5 md:gap-2">
				{[...Array(24)].map((_, index) => (
					<div key={index} className="bg-black/5 dark:bg-white/5 w-full aspect-square" />
				))}
			</div>
		</div>
	);
}
