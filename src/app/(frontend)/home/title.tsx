"use client";
import { useTranslations } from "next-intl";
import * as m from "motion/react-m";
import Link from "next/link";
import FadingImage from "@/components/ui/FadingImage";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { useNavbar } from "@/components/layout/navigation/NavBarContext";
import dynamic from "next/dynamic";

const Links = [
	{
		link: "/graphics",
		text: "Content.Hero.graphics",
		image: "/api/assets/file/ribbon_dark_4fb33611b4-1920x1080.webp",
	},
	{
		link: "/photos",
		text: "Content.Hero.photos",
		image: "/api/photos/file/DSC01818-1620x1080.webp",
	},
	{
		link: "/fonts",
		text: "Content.Hero.fonts",
		image: "/api/assets/file/MinaSans_title-1643x1080.webp",
	},
	{
		link: "/projects",
		text: "Content.Hero.projects",
		image: "/api/assets/file/keyboard_6e2f9e1d1a-1620x1080.webp",
	},
	{
		link: "/contact",
		text: "Content.Hero.contact",
		image: "/api/assets/file/MINT_Night_2_cd895e32a4.png",
	},
];

function HomeTitle() {
	const t = useTranslations("HOME");
	const [hovered, setHovered] = useState(-1);
	const { setNoAccents, setDefaultColor } = useNavbar();
	useEffect(() => {
		setDefaultColor();
		setNoAccents(false);
	});
	const baseDelay = localStorage.getItem("welcome") ? 0 : 1.5;

	useEffect(() => {
		if (!localStorage.getItem("welcome")) {
			localStorage.setItem("welcome", "hiya");
		}
	}, []);
	return (
		<>
			<div className="absolute -z-10 inset-0 bg-white dark:bg-neutral-500 saturate-0">
				<AnimatePresence>
					{Links[hovered] && (
						<m.div
							key={Links[hovered].link}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0, transition: { duration: 0.2 } }}
							className="absolute inset-0"
							style={{ perspective: 2000 }}
						>
							<FadingImage src={Links[hovered].image} fill alt="" hideSpinner className="object-cover" />
						</m.div>
					)}
				</AnimatePresence>
				<video
					src="/api/assets/file/wavy_ff6ca718a6.webm"
					className="absolute inset-0 object-fill w-full h-full dark:opacity-100 mix-blend-exclusion dark:mix-blend-color-burn"
					loop
					autoPlay
					muted
					playsInline
				/>
				<m.div className="absolute inset-0 dark:bg-neutral-950 dark:mix-blend-exclusion" />
				<div className="absolute inset-0 bg-linear-to-t from-white dark:from-neutral-950 via-white/75 dark:via-neutral-950/75 to-white dark:to-neutral-950" />
				<m.div
					initial={{ opacity: 1 }}
					animate={{
						opacity: 0,
						transition: { duration: 1, delay: baseDelay + 0.25, ease: "linear" },
					}}
					className="absolute inset-0 bg-white dark:bg-neutral-950"
				/>
			</div>
			<div className="w-full h-screen max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
				<m.div
					className="relative size-full border-x border-black/5 dark:border-white/5"
					initial={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
					animate={{
						clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
						transition: {
							type: "spring",
							bounce: 0,
							duration: 1,
						},
					}}
				>
					<m.div
						className="absolute py-28 md:py-28 lg:py-32 xl:py-40"
						initial={localStorage.getItem("welcome") ? {} : { top: "50%", translateY: "-50%" }}
						animate={{
							top: "0%",
							translateY: "0%",
							transition: {
								type: "spring",
								bounce: 0,
								delay: baseDelay + 0.25,
								duration: 1.5,
							},
						}}
					>
						<h1 className="relative pb-1 md:pb-3 font-serif" aria-label={t("Content.Hero.title")}>
							{String(t("Content.Hero.title") + ".")
								.split("")
								.map((character, index) => (
									<m.div
										aria-hidden
										key={index}
										initial={{ opacity: 0, filter: "blur(5px)", y: 20 }}
										animate={{
											opacity: 1,
											filter: "blur(0px)",
											y: 0,
											transition: {
												type: "spring",
												bounce: 0,
												delay: index / 50 + 0.25,
												duration: 1,
											},
										}}
										className={`inline-block ${character === "." && "text-green"}`}
									>
										{character.replace(" ", "\xa0")}
									</m.div>
								))}
						</h1>
						<m.p
							initial={{ opacity: 0, y: 40 }}
							animate={{
								opacity: 1,
								y: 0,
								transition: {
									type: "spring",
									bounce: 0,
									delay: (String(t("Content.Hero.title")).length + 1) / 50 + 0.25,
									duration: 1,
								},
							}}
							className="text-xl md:text-2xl xl:text-3xl"
						>
							{t("Content.Hero.description")}
						</m.p>
					</m.div>
					<div
						onMouseLeave={() => setHovered(-1)}
						className="absolute bottom-0 flex flex-col sm:flex-row w-full items-end"
					>
						{Links.map((button, index) => (
							<Link
								href={button.link}
								key={index}
								onMouseEnter={() => setHovered(index)}
								className="group w-full overflow-hidden leading-0"
							>
								<m.button
									tabIndex={-1}
									initial={{ opacity: 0, y: 40 }}
									animate={{
										opacity: 1,
										y: 0,
										transition: {
											type: "spring",
											bounce: 0,
											duration: 1,
											delay: baseDelay + 0.5 + (index + 1) / 10,
										},
									}}
									className="relative w-full h-16 md:h-20 border-black/5 dark:border-white/5 sm:border-r group-last:border-r-0 border-t"
								>
									<div className="absolute flex items-center justify-center z-10 inset-x-0 bottom-0 h-0 group-hover:h-full bg-neutral-950 dark:bg-white active:group-active:bg-neutral-800 dark:group-active:bg-neutral-100 text-white dark:text-neutral-950 text-xl sm:text-base md:text-2xl uppercase font-bold duration-400 ease-out-expo overflow-clip">
										<div className="flex opacity-0 group-hover:opacity-100 duration-100">
											{t(button.text)
												.split("")
												.map((char, index) => (
													<div
														className="group-hover:animate-tooltip-enter-bottom select-none"
														style={{
															animationDuration: "0.5s",
															animationTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
															animationDelay: `${index * 0.02}s`,
															animationFillMode: "backwards",
														}}
														key={index}
														aria-hidden
													>
														{char}
													</div>
												))}
										</div>
									</div>
									<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-950 dark:text-white uppercase">
										{t(button.text)}
									</span>
								</m.button>
							</Link>
						))}
					</div>
				</m.div>
			</div>
		</>
	);
}

export default dynamic(() => Promise.resolve(HomeTitle), {
	ssr: false,
});
