export default function LoadingSpinner() {
	const segments = 5;
	return (
		<div className="size-16 -rotate-90">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				{[...Array(segments)].map((_, index) => (
					<g key={index} style={{ transform: `rotate(${index * -1}deg)`, transformOrigin: "center" }}>
						<ellipse
							className={`animate-spin fill-transparent stroke-green origin-center`}
							style={{
								animationTimingFunction: "cubic-bezier(0.7, 0.25, 0.4, 0.8)",
								animationDelay: `${index * 0.03}s`,
								opacity: 1 - index * 0.15,
							}}
							strokeLinecap="round"
							cx="16"
							cy="16"
							rx="11"
							ry="11"
							strokeWidth={2 - index * 0.225}
							strokeDasharray={69}
							strokeDashoffset={73}
							filter={`blur(${index * 0.3}px)`}
						/>
					</g>
				))}
			</svg>
		</div>
	);
}
