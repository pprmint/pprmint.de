export default function GallerySkeleton() {
	return (
		<>
			<div className="bg-neutral-black/5 dark:bg-white/5 w-28 h-[38px] rounded-md mb-3 mx-auto" />
			<div className="mb-10 grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse">
				{[...Array(20)].map((_, index) => (
					<div key={index} className="bg-neutral-black/5 dark:bg-white/5 rounded-lg w-full aspect-video" />
				))}
			</div>
			<div className="flex gap-2 justify-center">
				{[...Array(3)].map((_, index) => (
					<div key={index} className="bg-neutral-black/5 dark:bg-white/5 rounded-full size-10" />
				))}
			</div>
		</>
	);
}
