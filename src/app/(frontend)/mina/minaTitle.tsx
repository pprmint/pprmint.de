"use client";

import { useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import * as m from "motion/react-m";
import FadingImage from "@/components/ui/FadingImage";
import Title from "@/components/layout/Title";
import { useTranslations } from "next-intl";

export default function MinaTitle() {
	const t = useTranslations("MINA");
	const spring = { damping: 10, stiffness: 120, mass: 0.8, restDelta: 0.01 };

	const ref = useRef<HTMLDivElement | null>(null);
	const x1 = useSpring(0, spring);
	const y1 = useSpring(0, spring);
	const x2 = useSpring(0, spring);
	const y2 = useSpring(0, spring);
	const x3 = useSpring(0, spring);
	const y3 = useSpring(0, spring);
	const x4 = useSpring(0, spring);
	const y4 = useSpring(0, spring);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
			const rect = element.getBoundingClientRect();
			const offsetX = ((clientX - rect.left) / rect.width - 0.5) * 2;
			const offsetY = ((clientY - rect.top) / rect.height - 0.5) * 2;
			x1.set(offsetX * 20);
			y1.set(offsetY * 10);
			x2.set(offsetX * 30);
			x3.set(offsetX * 40);
			y3.set(offsetY * 20);
			x4.set(offsetX * 60);
			y4.set(offsetY * 40);
		};

		const handlePointerLeave = () => {
			x1.set(0);
			y1.set(0);
			x2.set(0);
			y2.set(0);
			x3.set(0);
			y3.set(0);
			x4.set(0);
			y4.set(0);
		};

		element.addEventListener("pointermove", handlePointerMove);
		element.addEventListener("pointerleave", handlePointerLeave);

		return () => {
			element.removeEventListener("pointermove", handlePointerMove);
			element.removeEventListener("pointerleave", handlePointerLeave);
		};
	}, [x1, y2, x2, y2, x3, y3, x4, y4]);

	return (
		<Title
			ref={ref}
			title={t("Head.title")}
			description={t("Head.description")}
			credits={[
				{ name: "mi", link: "https://www.instagram.com/mil_porcento_" },
				{ name: "nekomimi", link: "https://x.com/neko__draws" },
			]}
			blackText
		>
			<div className="size-full bg-white" ref={ref}>
				<div className="relative size-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto flex items-end justify-end 2xl:justify-center">
					<m.div
						style={{ x: x1, y: y1 }}
						className="absolute -bottom-1/4 right-0 w-1/2 sm:right-1/8 sm:bottom-1/2 sm:translate-y-1/2 2xl:right-1/2 2xl:translate-x-1/2 2xl:w-2/3"
					>
						<FadingImage hideSpinner src="/api/assets/file/minaverse.svg" alt="Minaverse" width={2376} height={3304} />
					</m.div>
					<m.div style={{ x: x3, y: y3 }} className="absolute w-full h-fit">
						<FadingImage
							hideSpinner
							src="/api/assets/file/nekomimi_mi_splats_a.webp"
							alt=""
							width={3385}
							height={2138}
							quality={0}
							className="size-full object-contain"
						/>
					</m.div>
					<m.div
						style={{ x: x2 }}
						className="relative flex items-end w-full max-w-52 sm:max-w-none sm:w-auto sm:h-full xl:w-3/4 xl:h-auto 2xl:h-full"
					>
						<FadingImage
							hideSpinner
							src="/api/assets/file/nekomimi_mi_main.webp"
							loading="eager"
							alt=""
							width={3385}
							height={2138}
							quality={100}
							className="size-full object-contain"
						/>
					</m.div>
					<m.div style={{ x: x4, y: y4 }} className="absolute w-full h-fit">
						<FadingImage
							hideSpinner
							src="/api/assets/file/nekomimi_mi_splats_b.webp"
							alt=""
							width={3385}
							height={2138}
							quality={0}
							className="size-full object-contain"
						/>
					</m.div>
				</div>
			</div>
		</Title>
	);
}
