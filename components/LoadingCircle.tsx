import { useSpring, a } from "@react-spring/web";

export default function LoadingCircle() {
	const circleDot = useSpring({
		from: { rotate: 0 },
		to: { rotate: -90 },
		config: {
			tension: 100,
			friction: 20,
		},
	});
	const circleMid = useSpring({
		from: { rotate: 0 },
		to: { rotate: -55 },
		config: {
			tension: 100,
			friction: 20,
		},
	});
	const circleHalf = useSpring({
		from: { val: 160 },
		to: { val: 87 },
		config: {
			tension: 100,
			friction: 20,
		},
	});
	return (
		<div className="relative animate-spin w-16 h-16">
			<a.svg
				height={64}
				width={64}
				className="absolute"
				style={{ ...circleDot }}
			>
				<circle
					cx={32}
					cy={32}
					r={27}
					strokeWidth={8}
					className="stroke-green opacity-30 fill-none"
					strokeDasharray={175}
					strokeDashoffset={174}
					strokeLinecap="round"
				/>
			</a.svg>
			<a.svg
				height={64}
				width={64}
				className="absolute"
				style={{ ...circleMid }}
			>
				<circle
					cx={32}
					cy={32}
					r={27}
					strokeWidth={8}
					className="stroke-green opacity-60 fill-none"
					strokeDasharray={175}
					strokeDashoffset={150}
					strokeLinecap="round"
				/>
			</a.svg>
			<svg height={64} width={64} className="absolute">
				<a.circle
					cx={32}
					cy={32}
					r={27}
					strokeWidth={8}
					className="stroke-green fill-none"
					strokeDasharray={175}
					strokeDashoffset={circleHalf.val}
					strokeLinecap="round"
				/>
			</svg>
		</div>
	);
}
