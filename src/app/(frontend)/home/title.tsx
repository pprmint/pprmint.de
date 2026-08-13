"use client";
import { useTranslations } from "next-intl";
import * as m from "motion/react-m";
import Link from "next/link";
import { useEffect } from "react";
import { useNavbar } from "@/components/layout/navigation/NavBarContext";

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

export default function HomeTitle() {
	const t = useTranslations("HOME");
	const { setNoAccents, setDefaultColor } = useNavbar();
	useEffect(() => {
		setDefaultColor();
		setNoAccents(false);
	});
	return (
		<div className="relative w-full overflow-hidden text-balance">
			<div className="absolute -z-10 inset-0 bg-green-300 dark:bg-neutral-950">
				<video
					src="/api/assets/file/home_waves.mp4"
					className="absolute inset-0 object-bottom object-cover w-full h-full contrast-105 dark:contrast-90 invert dark:invert-0 mix-blend-luminosity dark:mix-blend-lighten bg-black"
					autoPlay
					muted
					playsInline
					loop
				/>
			</div>
			<div className="w-full h-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
				<div className="size-full border-x border-black/5 dark:border-white/5">
					<div className="relative py-28 md:py-32 lg:py-36 xl:py-44 px-6 xl:px-9">
						<m.h1
							className="relative pb-1 md:pb-3 font-extralight"
							initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
							animate={{
								opacity: 1,
								y: 0,
								filter: "blur(0px)",
								transition: {
									type: "spring",
									bounce: 0,
									delay: 0,
									duration: 0.6,
								},
							}}
						>
							{t("Content.Hero.title")}
							<span className="text-green">.</span>
						</m.h1>
						<m.p
							initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
							animate={{
								opacity: 1,
								y: 0,
								filter: "blur(0px)",
								transition: {
									type: "spring",
									bounce: 0,
									duration: 0.6,
									delay: 0.05,
								},
							}}
							className="text-xl md:text-2xl xl:text-3xl"
						>
							{t("Content.Hero.description")}
						</m.p>
					</div>
				</div>
			</div>
		</div>
	);
}
