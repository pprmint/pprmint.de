export default function Loading() {
	return (
		<div className="flex w-full h-full items-center justify-center">
			<svg height={64} width={64} className="animate-spin">
				<circle
					cx={32}
					cy={32}
					r={27}
					strokeWidth={4}
					className="stroke-green fill-none"
					strokeDasharray={175}
					strokeDashoffset={100}
					strokeLinecap="butt"
				/>
			</svg>
		</div>
	);
}
