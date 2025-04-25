"use client";
import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring } from "motion/react";

export default function AnimatedCounter({
	target,
	digits = 4,
	duration = 1250,
	delay,
	unit,
}: {
	target: number;
	digits?: number;
	duration?: number;
	delay?: number;
	unit?: string;
}) {
	const ref = useRef(null);
	const [display, setDisplay] = useState("0".repeat(digits));
	const base = useMotionValue(0);
	const spring = useSpring(base, { duration, bounce: 0 });

	useEffect(() => {
		function triggerAnimation() {
			if (delay) {
				setTimeout(() => base.set(target), delay);
			} else {
				base.set(target);
			}
		};

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					triggerAnimation();
					observer.disconnect();
				}
			},
			{ threshold: 1 },
		);

		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [target, delay, base]);

	useEffect(() => {
		return spring.on("change", (latest) => {
			const num = Math.floor(latest);
			const pad = num.toString().padStart(digits, "0");
			setDisplay(pad);
		});
	}, [spring, digits]);

	return (
		<div ref={ref}>
			{display.split("").map((digit, i) => {
				const firstVisibleIndex = display.search(/[1-9]/);
				const isLeading = i < firstVisibleIndex || firstVisibleIndex === -1;
				return (
					<span key={i} className={isLeading ? "opacity-25" : "opacity-100"}>
						{digit}
					</span>
				);
			})}
			{unit}
		</div>
	);
}
