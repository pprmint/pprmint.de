export default function FlipCharacter({ character }: { character: string }) {
	return (
		<div className="relative flex flex-col gap-0.5 w-24 h-36 md:w-28 md:h-44 font-display-mono font-light text-[7.15rem] md:text-[8.75rem]">
			<div className="absolute z-10 left-0 top-1/2 -translate-y-1/2 w-1.5 h-9 bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-950 rounded-full border-2 border-neutral-950" />
			<div className="relative top-0 left-0 w-full h-1/2 bg-gradient-to-b from-neutral-700 to-neutral-800 border-t border-neutral-600 rounded-t-lg overflow-hidden">
				<span className="text-neutral-50 leading-tight absolute top-0 left-0 w-full text-center">
					{character}
				</span>
			</div>
			<div className="relative bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-neutral-900 to-neutral-900 border-t border-neutral-700 rounded-b-lg overflow-hidden">
				<span
					aria-hidden
					className="text-neutral-200 leading-tight absolute bottom-0 left-0 w-full text-center"
				>
					{character}
				</span>
			</div>
			<div className="absolute z-10 right-0 top-1/2 -translate-y-1/2 w-1.5 h-9 bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-950 rounded-full border-2 border-neutral-950" />
		</div>
	);
}
