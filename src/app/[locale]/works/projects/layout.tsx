"use client";
import { ReactNode, useState } from "react";
import { useRouter } from "src/navigation";
import { easings, useTransition, a } from "@react-spring/web";
import ArrowLeft from "src/icons/ArrowLeft";

export default function Layout({ children }: { children: ReactNode }) {
	const [exit, setExit] = useState(false);
	const router = useRouter();
	const viewTransition = useTransition(exit, {
		from: {
			x: -150,
			opacity: 0,
		},
		enter: {
			x: 0,
			opacity: 1,
			config: {
				duration: 750,
				easing: easings.easeOutExpo,
			},
		},
		leave: {
			x: -50,
			opacity: 0,
			config: {
				duration: 200,
				easing: easings.easeInCubic,
			},
		},
		exitBeforeEnter: true,
		onDestroyed: () => router.push(`/works`),
	});
	return viewTransition((style, item) =>
		!item ? (
			<a.div style={{ ...style }}>
				<button
					onClick={() => setExit(true)}
					className="group absolute top-56 xl:top-96 left-1/2 -translate-x-1/2 inline-flex z-10 text-lg text-neutral-50 hover:text-neutral-950 border-2 border-neutral-50 hover:bg-neutral-50 active:border-neutral-200 active:bg-neutral-200 rounded-full p-1 duration-100"
				>
					<ArrowLeft className="md:size-[30px] stroke-0 group-hover:stroke-1 stroke-current duration-100" />
				</button>
				{children}
			</a.div>
		) : <div className="h-screen" />
	);
}
