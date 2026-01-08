"use client";
import { Fragment, useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import * as m from "motion/react-m";

import { September } from "./September";
import { incrementPats } from "./incrementPats";

import Moon from "@/icons/Moon";
import Computer from "@/icons/Computer";
import SmartphoneHomeButton from "@/icons/SmartphoneHomeButton";
import Sun from "@/icons/Sun";
import { useTheme } from "next-themes";
import NoSSR from "@/components/NoSSR";
import { locales } from "@/i18n/config";
import { setUserLocale } from "@/i18n/locale";
import Heart from "@/icons/Heart";
import HotCup from "@/icons/HotCup";
import Bluesky from "@/icons/Bluesky";
import YouTube from "@/icons/YouTube";
import GitHub from "@/icons/GitHub";
import Kofi from "@/icons/Kofi";
import { AnimatePresence } from "motion/react";
import AnimatedCounter from "./counter";

type Phase = "idle" | "fetching" | "animating";

export default function Footer() {
	const t = useTranslations("FOOTER");

	const { theme, setTheme } = useTheme();
	const currentLocale = useLocale();
	const otherLocale = locales?.find((cur) => cur !== currentLocale);

	// Mina easter egg states.
	const [clicks, setClicks] = useState(0);
	const [pissedOffMina, setPissedOffMina] = useState(false);

	// September easter egg states.
	const [septemberLineIndex, setSeptemberLineIndex] = useState(0);
	const [septemberBeats, setSeptemberBeats] = useState(0);
	const [isSeptember, setIsSeptember] = useState(false);

	const audioRef = useRef<HTMLAudioElement | null>(null);
	useEffect(() => {
		// Initialize audio.
		audioRef.current = new Audio("/sounds/nadenade_1.wav");
		// Check localStorage for pissedOffMina state.
		setPissedOffMina(!!localStorage.getItem("pissedOffMina"));
		// Check if it's September.
		setIsSeptember(new Date().getMonth() === 8);
	}, []);

	// States during global pat count increment.
	const [patCount, setPatCount] = useState(0);
	const [phase, setPhase] = useState<Phase>("idle");

	useEffect(() => {
		if (clicks === 0 || phase !== "idle") return;

		const timeout = setTimeout(async () => {
			setPhase("fetching");

			const updated = await incrementPats(clicks);
			setPatCount(updated ?? clicks);

			setPhase("animating");

			setTimeout(() => {
				setClicks(0);
				setPhase("idle");
			}, 4000);
		}, 5000);

		return () => clearTimeout(timeout);
	}, [clicks, phase]);

	function getTranslationKey(clicks: number, pissedOffMina: boolean): string {
		if (clicks > Number.MAX_SAFE_INTEGER) return "Mina.humanityIsDead";
		if (clicks >= 100000) return "Mina.tooMany10";
		if (clicks >= 50000) return "Mina.tooMany9";
		if (clicks >= 10000) return "Mina.tooMany8";
		if (clicks >= 5000) return "Mina.tooMany7";
		if (clicks >= 1000) return "Mina.tooMany6";
		if (clicks >= 500) return "Mina.tooMany5";
		if (clicks >= 300) return "Mina.tooMany4";
		if (clicks >= 200) return "Mina.tooMany3";
		if (clicks >= 100) return "Mina.tooMany2";
		if (clicks >= 50) return "Mina.tooMany1";
		if (clicks >= 3) return pissedOffMina ? "Mina.forgive" : "Mina.lovePats";
		return "Mina.lovePats";
	}

	function handleClickActions(clickCount: number) {
		if (clickCount === 10) {
			localStorage.removeItem("pissedOffMina");
			setPissedOffMina(false);
		}
	}

	function handlePat() {
		if (phase === "idle") {
			if (isSeptember) {
				// September easter egg.
				setSeptemberBeats((prevBeats) => {
					const newBeats = prevBeats + 1;
					const currentLine = September[septemberLineIndex];
					if (newBeats >= currentLine.beats && septemberLineIndex < September.length - 1) {
						setSeptemberLineIndex((prevIndex) => prevIndex + 1);
						// Reset beats for next line.
						return 0;
					}
					return newBeats;
				});
			} else {
				// Mina easter egg.
				if (audioRef.current) {
					if (!audioRef.current.paused) {
						audioRef.current.currentTime = 0;
					}
					audioRef.current.play();
				}
				setClicks((prevClicks) => {
					const newClicks = Math.min(prevClicks + 1, Number.MAX_SAFE_INTEGER);
					handleClickActions(newClicks);
					return newClicks;
				});
			}
		}
	}

	const translationKey = getTranslationKey(clicks, pissedOffMina);
	const currentSeptemberLine = September[septemberLineIndex];

	return (
		<footer className="w-full overflow-x-hidden">
			<div className="relative w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
				<div className="w-full border-x border-black/5 dark:border-white/5 pt-10 lg:pt-20 xl:pt-40">
					<div className="relative h-36 overflow-clip">
						<AnimatePresence mode="popLayout">
							{phase === "animating" ? (
								<m.div
									key="counter"
									initial={{ opacity: 0, y: -50 }}
									animate={{
										opacity: 1,
										y: 0,
										transition: { type: "spring", bounce: 0, duration: 0.5, delay: 0.1 },
									}}
									exit={{ opacity: 0, y: -50, transition: { duration: 0.2, ease: "easeIn" } }}
									className="flex items-center justify-center h-full w-auto mx-auto select-none text-neutral-950 dark:text-white"
								>
									<AnimatedCounter target={patCount} offset={clicks} />
								</m.div>
							) : (
								<m.div
									key="mina"
									initial={{ opacity: 0, y: 50 }}
									animate={{
										opacity: 1,
										y: 0,
										transition: { type: "spring", bounce: 0, duration: 0.5, delay: 0.1 },
									}}
									exit={{ opacity: 0, y: 50, transition: { duration: 0.2, ease: "easeIn" } }}
									className="h-full w-auto mx-auto"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 972 600"
										className={`group h-full w-auto mx-auto fill-neutral-50 dark:fill-neutral-900 ${
											phase === "fetching"
												? "opacity-75 pointer-events-none"
												: "cursor-grab active:cursor-grabbing"
										}`}
										onMouseDown={handlePat}
									>
										<g className="translate-y-6 group-hover:translate-y-0 group-active:translate-y-3 group-hover:rotate-2 origin-right duration-300 group-active:duration-50 ease-[cubic-bezier(0.1,1.48,0.5,1)]">
											<path d="M88.715 680.48c4.377 27.534-28.753 46.17-28.753 46.17 20.806-27.05 18.726-70.742 14.564-101.952C71.5 602.012 44.346 574.762 57.88 506.1c3.087-15.661 7.715-29.861 12.469-41.766-15.742 18.016-35.398 26.624-61.313 33.443 31.939-11.614 62.592-37.034 74.903-66.58 10.404-24.968 16.646-64.501 45.775-95.71-9.712 4.48-31.88 11.462-43.694 12.484 15.28-1.38 63.34-44.934 75.893-60.34 51.477-63.18 109.95-97.79 193.5-97.79 38.543 0 26.17 4.923 38.543 4.162 7.08-.436 15.11-7.402 45.775-7.402 20.806 0 28.287 10.58 52.016 28.208 22.564 16.762 51.3 39.078 73.3 67.853-8.456-21.678-16.134-51.982-16.134-90.556 0-108.194 93.63-185.362 93.63-185.362-3.14 32.182 27.048 141.668 20.806 179.12-9.61 57.653-33.478 100.812-52.225 122.566 6.512-.174 13.9 3 19.664 10.044-.663-16.423 10.208-40.364 74.174-64.133 88.027-32.708 102.91-40.336 112.355-54.097-3.945 19.725-49.026 41.319-62.568 66.556 79.013-7.583 144.45 49.96 144.45 49.96-4.824-1.808-12.501-1.474-22.237.353 35.14 17.432 86 68.484 86 112.003 0 22.887-8.322 37.452-8.322 37.452s6.613-12.141 2.08-37.452c-2.945-16.454-9.331-34.33-25.29-52.286 10.655 23.866 14.888 50.406 14.888 75.173 0 70.742-20.807 99.87-85.307 156.049 54.097-72.823 68.66-149.807 22.426-199.396 0 0 35.593 43.279 8.784 74.557-24.968 29.129-46.25 40.489-60.34 58.258-21.744 27.423-29.875 55.308-37.451 95.71-4.723-42.505 2.08-81.145 10.403-97.791 12.11-24.221 13.496-54.793 9.913-76.472-5.288 45.188-79.691 79.092-101.461 76.472 24.606 2.93 81.145-54.693 81.145-76.984 0-22.29-31.21-64.5-78.32-50.824-33.967 10.457-55.867 5.435-63.681-7.434l-.133-.515c-.686 8.616-4.042 13.188-10.32 15.08-5.194 1.565-9.8 1.062-13.888-.923a505.13 505.13 0 0 1 6.132 23.81c6.543 28.276 20.807 101.952 60.339 151.887-12.287-7.798-25.764-18.77-43.694-41.613 0 60.339-16.956 87.955-29.13 122.759-11.048 31.807-33.774 54.833-66.58 62.419-14.52 3.358-49.935 2.08-89.468-18.726l12.484-8.322s-27.048 2.08-41.613-8.323l14.565-14.564c-18.726-4.162-57.771-29.51-62.42-33.291 79.065 2.08 111.03-49.186 122.759-81.145-24.726 15.412-52.84 25.177-74.904 4.16 20.6 4.559 57.485-10.402 76.984-56.176 2.814-6.606-33.977-66.893-48.81-65.895-30.371 2.045-67.611-7.113-86.432-33.977-20.53-29.301-20.806-29.13-20.806-29.13s0 16.646 14.564 39.534c-29.13-8.323-24.968-79.065-24.968-79.065s-22.887 62.419 14.565 120.678c-8.645-4.576-15.65-10.791-21.478-18.183-.253 8.335 2.31 18.748 11.075 28.586-58.258 6.242-83.226-106.113-81.146-122.758-6.242 10.403-6.242 35.37-6.242 60.338-9.897-21.438-12.57-51.48-6.242-91.548-14.564 16.645-33.91 102.953-33.29 108.194-2.201-12.697-3.79-28.837-.558-53.607-13.868 20.39-24.187 48.54-28.571 86.897-6.058 53.008 20.504 96.598 52.016 110.274-29.126-.034-48.844-31.21-48.844-31.21 5.999 50.562 18.726 81.146 47.855 95.71 0 0-16.645 12.484-35.371 10.404 0 0 22.887 29.129 66.58 54.097-18.725 0-47.854-22.887-47.854-22.887 10.403 14.564 30.118 24.967 30.118 24.967-58.085 21.496-85.307-31.21-85.307-31.21s6.48 30.71 54.097 54.098c0 0-26.531 2.603-61.814-11.767 7.049 10.379 20.34 20.13 41.008 26.33-97.527 52.828-118.062-63.562-118.973-69.056Zm505.934-392.847c-8.121-52.58-1.833-113.241 20.846-183.097 0 0-31.21 33.29-35.371 91.548-2.53 35.429 5.167 57.004 14.525 91.549Z" />
											<path
												className="group-hover:rotate-45 group-active:rotate-30 origin-[36%_32%] duration-300 group-active:duration-50 ease-[cubic-bezier(0.1,1.48,0.5,1)]"
												d="M358.386 193.88c-5.452-9.953-18.764-32.965-62.22-29.268-52.016 4.424-91.696 44.16-108.194 104.295-16.497 60.135 6.242 93.629 6.242 93.629s-16.645-31.21 10.403-97.79c26.373-64.917 58.258-83.574 93.63-89.469 31.21-5.201 34.372 11.864 39.332 20.684 6.637 11.795 26.56 8.42 20.807-2.08Z"
											/>
										</g>
									</svg>
								</m.div>
							)}
						</AnimatePresence>
					</div>
				</div>
				{phase === "idle" && isSeptember ? (
					<>
						<p
							className={`absolute bottom-44 inset-x-0 text-center transition-opacity text-xs duration-300 select-none ${
								currentSeptemberLine.lyric ? "opacity-100" : "opacity-0"
							}`}
						>
							{currentSeptemberLine.lyric}
						</p>
						<p
							className={`absolute bottom-36 -rotate-3 left-1/2 -translate-x-1/2 bg-blue text-neutral-950 rounded-md px-2 py-1 w-max text-xs transition-opacity duration-300 select-none ${
								currentSeptemberLine.lyric ? "opacity-100" : "opacity-0"
							}`}
						>
							{septemberBeats}/{currentSeptemberLine.beats}
						</p>
					</>
				) : (
					phase === "idle" && clicks > 2 && (
						<p className="absolute bottom-44 inset-x-0 text-center transition-opacity text-xs duration-300 select-none">
							{t(translationKey)}
						</p>
					)
				)}
			</div>
			<hr className="border-black/5 dark:border-white/5" />
			<div className="flex flex-col sm:flex-row gap-3 justify-between p-6">
				<div className="sm:w-1/3">
					<div className="text-sm text-center sm:text-left">
						<p className="leading-4">
							{t("madeWith")}
							<Heart className="inline fill-red mx-0.5" />
							{t("and")}
							<Link
								href="https://github.com/pprmint/pprmint.de/blob/main/package.json"
								target="_blank"
								rel="noopener noreferrer"
							>
								<HotCup className="inline fill-yellow mx-0.5" />
							</Link>
						</p>
					</div>
					<p className="text-neutral-950 dark:text-white text-center sm:text-left">
						{"© "}
						{new Date().getFullYear()} pprmint.
					</p>
				</div>
				<div className="sm:w-1/3 flex justify-center items-center">
					<Link
						href="https://bsky.app/profile/pprmint.de"
						target="_blank"
						rel="noopener noreferrer"
						className="size-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 duration-100 active:duration-75 active:opacity-75"
					>
						<Bluesky />
					</Link>
					<Link
						href="https://youtube.com/@pprmint"
						target="_blank"
						rel="noopener noreferrer"
						className="size-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 duration-100 active:duration-75 active:opacity-75"
					>
						<YouTube />
					</Link>
					<Link
						href="https://github.com/pprmint"
						target="_blank"
						rel="noopener noreferrer"
						className="size-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 duration-100 active:duration-75 active:opacity-75"
					>
						<GitHub />
					</Link>
					<Link
						href="https://ko-fi.com/pprmint"
						target="_blank"
						rel="noopener noreferrer"
						className="size-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 duration-100 active:duration-75 active:opacity-75"
					>
						<Kofi />
					</Link>
				</div>
				<div className="sm:w-1/3 flex items-center justify-between sm:justify-end gap-6">
					<button
						onClick={() => setUserLocale(otherLocale!)}
						className="relative flex border border-black/5 dark:border-white/5"
					>
						{locales.map((locale) => (
							<div
								key={locale}
								className={`inline-flex items-center justify-center text-sm w-9 h-[27px] ${
									currentLocale === locale
										? "text-neutral-950 dark:text-white bg-neutral-950/5 dark:bg-neutral-50/5"
										: "hover:bg-neutral-950/5 dark:hover:bg-neutral-50/5"
								} duration-100 active:duration-75 active:opacity-75 uppercase`}
							>
								{locale}
							</div>
						))}
					</button>
					<NoSSR>
						<div className="relative flex w-max border border-black/5 dark:border-white/5">
							{[
								{ name: "dark", icon: <Moon /> },
								{
									name: "system",
									icon: (
										<Fragment>
											<Computer className="hidden lg:block" />
											<SmartphoneHomeButton className="lg:hidden" />
										</Fragment>
									),
								},
								{ name: "light", icon: <Sun /> },
							].map((item) => (
								<button
									key={item.name}
									onClick={() => setTheme(item.name)}
									className={`p-1.5 ${
										theme === item.name
											? "text-neutral-950 dark:text-white bg-neutral-950/5 dark:bg-neutral-50/5"
											: "hover:bg-neutral-950/5 dark:hover:bg-neutral-50/5"
									} duration-100 active:duration-75 active:opacity-75`}
								>
									{item.icon}
								</button>
							))}
						</div>
					</NoSSR>
				</div>
			</div>
		</footer>
	);
}
