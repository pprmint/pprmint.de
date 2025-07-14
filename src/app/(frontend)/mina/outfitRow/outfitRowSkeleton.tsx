export default function OutfitRowSkeleton() {
	return (
		<div className="animate-pulse border-x border-black/5 dark:border-white/5 pt-20 lg:pt-32 xl:pt-40">
			<div className="w-full p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 md:max-h-[800px] border-y border-black/5 dark:border-white/5 backdrop-blur-sm">
				{[...Array(6)].map((_, index) => (
					<div key={index} className="bg-black/5 dark:bg-white/5 w-full aspect-[1/2]" />
				))}
			</div>
		</div>
	);
}
