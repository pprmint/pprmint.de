"use client";
import { useTranslations } from "next-intl";
import * as m from "motion/react-m";
import { useEffect, useState } from "react";
import { useNavbar } from "@/components/layout/navigation/NavBarContext";

export default function HomeTitle() {
	const t = useTranslations("HOME");
	const [canPlay, setCanPlay] = useState(false);
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
					onCanPlay={() => setCanPlay(true)}
				/>
				<div
					className={`absolute w-[150%] left-0 ${canPlay ? "-translate-x-full" : "translate-x-0"} inset-y-0 bg-linear-to-r from-white dark:from-neutral-950 via-white dark:via-neutral-950 via-75% duration-2500 delay-300 ease-out-cubic`}
				/>
			</div>
			<div className="w-full h-full max-w-8xl sm:px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
				<div className="size-full sm:border-x border-black/5 dark:border-white/5">
					<div className="relative py-28 md:py-32 lg:py-36 xl:py-44 px-6 xl:px-9">
						<m.h1
							className="relative pb-1 md:pb-3 font-light"
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
