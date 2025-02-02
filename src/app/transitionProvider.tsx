"use client";
import { useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import { animate } from "motion/react";

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
	const wrapperRef = useRef<HTMLDivElement>(null!);
	return (
		<TransitionRouter
			auto
			leave={(next) => {
				animate(
					wrapperRef.current,
					{
						opacity: [1, 0],
						y: [0, -20],
					},
					{ duration: 0.3, ease: [0.3, 0, 0.65, 0], onComplete: next }
				);
			}}
			enter={(next) => {
				animate(
					wrapperRef.current,
					{
						opacity: [0, 1],
						y: [40, 0],
					},
					{ duration: 0.75, ease: [0.25, 1, 0.5, 1], onComplete: next }
				);
			}}
		>
			<div ref={wrapperRef}>{children}</div>
		</TransitionRouter>
	);
}
