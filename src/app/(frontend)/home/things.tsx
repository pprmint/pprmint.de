"use client";
import FadingImage from "@/components/ui/FadingImage";
import ArrowRight from "@/icons/ArrowRight";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as m from "motion/react-m";
import { useTranslations } from "next-intl";
import { AnimatePresence, useInView } from "motion/react";

function ThingCycle({
	items,
	sizes,
	className,
}: {
	items: {
		alt: string;
		link: string;
		src: string;
	}[];
	sizes: string;
	className?: string;
}) {
	const ref = useRef<HTMLAnchorElement>(null);
	const isInView = useInView(ref, {
		amount: 0.1,
	});

	const [current, setCurrent] = useState(0);
	const [hovered, setHovered] = useState(false);
	const [justLeft, setJustLeft] = useState(false);

	// Cycles through items after 6 seconds. Current item stays on screen while the mouse if hovered over it.
	// If the mouse just left, the next item shown after just one second.
	useEffect(() => {
		if (!isInView || hovered || items.length <= 1) return;

		const timeout = setTimeout(
			() => {
				setCurrent((prev) => (prev + 1) % items.length);
				setJustLeft(false);
			},
			justLeft ? 1000 : 6000,
		);

		return () => clearTimeout(timeout);
	}, [isInView, hovered, justLeft, current, items.length]);

	const handleMouseLeave = () => {
		setJustLeft(true);
		setHovered(false);
	};

	const handleMouseEnter = () => {
		setHovered(true);
		setJustLeft(false);
	};

	return (
		<Link
			ref={ref}
			href={items[current].link}
			className={`group relative w-full overflow-clip ${className}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<AnimatePresence mode="popLayout">
				<m.div
					key={current}
					initial={{
						position: "relative",
						clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
					}}
					animate={{
						position: "relative",
						clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
						transition: { type: "spring", duration: 0.8, bounce: 0 },
					}}
					exit={{
						position: "absolute",
						clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
						transition: { type: "spring", duration: 0.8, bounce: 0 },
					}}
					className="size-full bg-black/5 dark:bg-white/5"
				>
					<m.div
						initial={{
							y: "50%",
						}}
						animate={{
							y: "0%",
							opacity: 1,
							transition: { type: "spring", duration: 0.8, bounce: 0 },
						}}
						exit={{
							y: "-50%",
							opacity: 0,
							transition: { type: "spring", duration: 0.8, bounce: 0 },
						}}
						className="relative size-full"
					>
						<FadingImage
							hideSpinner
							src={items[current].src}
							alt={items[current].alt}
							fill
							sizes={sizes}
							className="group-hover:brightness-110 group-hover:contrast-90 duration-200 group-hover:duration-0"
						/>
					</m.div>
				</m.div>
			</AnimatePresence>
		</Link>
	);
}

export default function Things() {
	const t = useTranslations("HOME.Content.Things");

	function Arrow() {
		return (
			<div className="xl:ml-auto relative size-7.5 sm:size-11.25 text-3xl sm:text-[2.8125rem] overflow-clip duration-0">
				<ArrowRight width="1em" height="1em" className="absolute group-hover:opacity-0 group-hover:duration-100" />
				<ArrowRight
					width="1em"
					height="1em"
					className="text-neutral-950 dark:text-white stroke-current stroke-[1px] absolute -translate-x-full group-hover:translate-x-0 group-hover:duration-400 ease-out-quint"
				/>
			</div>
		);
	}
	return (
		<section className="relative w-full max-w-8xl sm:px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
			<div className="grid grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 border-y sm:border-x border-black/5 dark:border-white/5 w-full">
				<Link
					href="/fonts"
					className="group flex items-center xl:flex-col xl:items-start justify-between col-span-2 xl:col-span-1 xl:order-3 p-6 xl:p-9 hover:bg-black/5 dark:hover:bg-white/5 duration-200 hover:duration-0"
				>
					<div>
						<h2 className="pb-0 xl:pb-3">
							{t("Fonts.heading")}
							<span className="text-green">.</span>
						</h2>
						<p className="xl:text-xl">{t("Fonts.description")}</p>
					</div>
					<Arrow />
				</Link>
				<ThingCycle
					items={[
						{
							alt: "MN Varia",
							link: "/fonts/varia",
							src: "/api/assets/file/MNVaria_Thumbnail.png",
						},
						{
							alt: "MN Celesta",
							link: "/fonts/celesta",
							src: "/api/assets/file/MNCelesta_Thumbnail.svg",
						},
					]}
					sizes="(max-width: 1280px) 50vw, 66vw"
					className="xl:col-span-2 xl:row-span-2 aspect-video"
					/>
				<ThingCycle
					items={[
						{
							alt: "MN Markow",
							link: "/fonts/markow",
							src: "/api/assets/file/MNMarkow_Thumbnail.svg",
						},
						{
							alt: "MN Covert",
							link: "/fonts/covert",
							src: "/api/assets/file/MNCovert_Thumbnail.webp",
						},
					]}
					sizes="(max-width: 1280px) 50vw, 33vw"
					className="aspect-video"
				/>
			</div>
			<div className="h-9 lg:h-20 w-full border-x border-black/5 dark:border-white/5" />
			<div className="grid grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 border-y sm:border-x border-black/5 dark:border-white/5 w-full">
				<Link
					href="/photos"
					className="group flex items-center xl:flex-col xl:items-start justify-between col-span-2 xl:col-span-1 p-6 xl:p-9 hover:bg-black/5 dark:hover:bg-white/5 duration-200 hover:duration-0"
				>
					<div>
						<h2 className="pb-0 xl:pb-3">
							{t("Photos.heading")}
							<span className="text-green">.</span>
						</h2>
						<p className="xl:text-xl">{t("Photos.description")}</p>
					</div>
					<Arrow />
				</Link>
				<ThingCycle
					items={[
						{
							alt: "DSC00275",
							link: "/photos",
							src: "/api/photos/file/DSC00275.webp",
						},
						{
							alt: "DSC01773",
							link: "/photos",
							src: "/api/photos/file/DSC01773.webp",
						},
					]}
					sizes="(max-width: 1280px) 50vw, 66vw"
					className="xl:col-span-2 xl:row-span-2 aspect-3/2"
				/>
				<ThingCycle
					items={[
						{
							alt: "DSC01569",
							link: "/photos",
							src: "/api/photos/file/DSC01569.webp",
						},
						{
							alt: "DSC01241",
							link: "/photos",
							src: "/api/photos/file/DSC01241.webp",
						},
					]}
					sizes="(max-width: 1280px) 50vw, 33vw"
					className="aspect-3/2"
				/>
			</div>
			<div className="h-9 lg:h-20 w-full border-x border-black/5 dark:border-white/5" />
			<div className="grid grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 border-y sm:border-x border-black/5 dark:border-white/5 w-full">
				<Link
					href="/graphics"
					className="group flex items-center xl:flex-col xl:items-start justify-between col-span-2 xl:col-span-1 xl:order-1 p-6 xl:p-9 hover:bg-black/5 dark:hover:bg-white/5 duration-200 hover:duration-0"
				>
					<div>
						<h2 className="pb-0 xl:pb-3">
							{t("Graphics.heading")}
							<span className="text-green">.</span>
						</h2>
						<p className="xl:text-xl">{t("Graphics.description")}</p>
					</div>
					<Arrow />
				</Link>
				<ThingCycle
					items={[
						{
							alt: "Solar System 2",
							link: "/graphics/solar-system-3",
							src: "/api/assets/file/Solar_System_2_f133addf64.webp",
						},
						{
							alt: "Pimples",
							link: "/graphics/pimples",
							src: "/api/assets/file/Pimples_b41ae5d165.png",
						},
					]}
					className="xl:col-span-2 xl:row-span-2 aspect-video"
					sizes="(max-width: 1280px) 50vw, 66vw"
				/>
				<ThingCycle
					items={[
						{
							alt: "OpenSUSE Rebrand Concept",
							link: "/graphics/opensuse-rebrand-concept",
							src: "/api/assets/file/openSUSE_overview_19d4d56646.png",
						},
						{
							alt: "Pimples",
							link: "/graphics/apotheke-redesign",
							src: "/api/assets/file/Apotheke_a9cd2b26be.png",
						},
					]}
					className="xl:order-2 aspect-video"
					sizes="(max-width: 1280px) 50vw, 33vw"
				/>
			</div>
			<div className="h-9 lg:h-16 xl:h-48 w-full border-x border-black/5 dark:border-white/5" />
		</section>
	);
}
