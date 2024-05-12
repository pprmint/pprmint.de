"use client";
import { useSpring, a } from "@react-spring/web";

export default function CountUp() {
	const countUp = useSpring({
		from: { val: 10000 },
		to: { val: 69420 },
		config: {
			tension: 5,
			friction: 100,
			clamp: true,
		},
	});

	return (
		<div className="absolute inset-0">
			<p className="font-minttriangles absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] z-10 text-neutral-800">
				*****
			</p>
			<a.p className="font-minttriangles absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] z-10 text-neutral-50 drop-shadow-[0px_0px_30px_#111]">
				{countUp.val.to((val) => Math.floor(val))}
			</a.p>
		</div>
	);
}
