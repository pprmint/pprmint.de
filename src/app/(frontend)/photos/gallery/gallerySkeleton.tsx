export default function GallerySkeleton() {
	return (
		<div className="animate-pulse border-x border-black/5 dark:border-white/5">
			<div className="group grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-2 border-y border-black/5 dark:border-white/5 md:gap-2">
				{[...Array(20)].map((_, index) => (
					<div key={index} className="bg-black/5 dark:bg-white/5 w-full aspect-[3/2]" />
				))}
			</div>
		</div>
	);
}

