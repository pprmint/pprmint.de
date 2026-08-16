export default function GallerySkeleton() {
	return (
		<div className="sm:border-x border-black/5 dark:border-white/5">
			<div className="animate-pulse bg-black/5 dark:bg-white/5 w-full h-9.25" />
			<div className="animate-pulse group grid grid-cols-2 xl:grid-cols-4 md:p-2 border-y border-black/5 dark:border-white/5 md:gap-2">
				{[...Array(20)].map((_, index) => (
					<div key={index} className="bg-black/5 dark:bg-white/5 w-full aspect-3/2" />
				))}
			</div>
			<div className="animate-pulse bg-black/5 dark:bg-white/5 w-full h-9.25" />
		</div>
	);
}

