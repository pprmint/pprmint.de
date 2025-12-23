"use client";
import { useEffect, useState } from "react";
import { useMotionValue, useSpring } from "motion/react";
import * as m from "motion/react-m";

export default function AnimatedCounter({ target, offset = 0 }: { target: number; offset?: number }) {
	const startValue = target - offset;
	const base = useMotionValue(startValue);
	const spring = useSpring(base, { duration: 1500, bounce: 0 });
	const [display, setDisplay] = useState(startValue.toString());

	useEffect(() => {
		const t = setTimeout(() => base.set(target), 1000);
		return () => clearTimeout(t);
	}, [target, base]);

	useEffect(() => spring.on("change", (v) => setDisplay(Math.ceil(v).toString())), [spring]);

	return (
		<div className="relative">
			<div className="text-7xl font-light font-stretch-75">{display}</div>
			<m.div
				animate={{ y: [0, -20], opacity: [0, 1, 0] }}
				transition={{ duration: 0.75, delay: 0.95, type: "spring", bounce: 0 }}
				className="absolute top-1/2 left-1/2 -translate-1/2 font-bold text-green font-stretch-150 text-4xl text-shadow-xl/20"
			>
				+{offset}
			</m.div>
		</div>
	);
}
