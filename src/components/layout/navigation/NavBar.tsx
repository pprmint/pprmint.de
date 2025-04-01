"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Pages, Projects } from "./Links";
import { useNavbar } from "./NavBarContext";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";

export default function NavBar() {
	const t = useTranslations("NAVIGATION");
	const pathname = usePathname();
	const { inverted, noAccents } = useNavbar();
	const [solid, setSolid] = useState(false);
	// Show "solid" background when scrolling.
	useEffect(() => {
		const handleScroll = () => {
			setNavOpen(false);
			if (window.scrollY > 0) {
				setSolid(true);
			} else {
				setSolid(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Opening and closing logic
	const [navOpen, setNavOpen] = useState(false);
	const handleOpen = () => {
		setNavOpen(true);
		setSolid(true);
	};
	const handleClose = () => {
		setNavOpen(false);
		if (window.scrollY > 0) {
			setSolid(true);
		} else {
			setSolid(false);
		}
	};
	const toggleOpen = navOpen ? handleClose : handleOpen;
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleClose();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	// Handle click outside of nav.
	const navRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (navRef.current && !navRef.current.contains(e.target as Node)) {
				handleClose();
			}
		};
		if (navOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [navOpen]);

	return (
		<nav
			ref={navRef}
			className={`z-90 fixed top-0 inset-x-0 ${navOpen ? "h-full md:h-96 xl:h-72 shadow-xl shadow-neutral-950/5 dark:shadow-neutral-950/25" : "h-16"} flex justify-between duration-300 overflow-auto border-b ${
				!inverted ? "text-neutral-950 dark:text-white" : solid ? "text-neutral-950 dark:text-white" : "text-white "
			}
				${solid || navOpen ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl border-black/5 dark:border-white/5" : "border-transparent"}`}
		>
			<Link className="absolute z-90 left-6 md:left-9 top-3.5" href="/">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 282 59" className="h-auto w-[150px] mt-1">
					<path
						fill="currentColor"
						d="M 34.11 29.7 C 34.11 19 26.37 12.34 17.5 12.34 C 8.62 12.34 5.48 18.88 5.48 18.88 L 5.48 13.22 L 0 13.22 L 0 58.15 L 5.48 58.15 L 5.48 40.6 C 5.48 40.6 8.62 47.08 17.5 47.08 C 26.38 47.08 34.1 40.4 34.1 29.7 M 5.47 29.76 C 5.47 23.84 8.11 17.42 17.61 17.42 C 23.84 17.42 28.63 22.72 28.63 29.7 C 28.63 36.68 23.84 42.03 17.61 42.03 C 8.11 42.03 5.47 35.68 5.47 29.76 M 75.77 29.7 C 75.77 19 68.03 12.33 59.15 12.33 C 50.27 12.33 47.13 18.87 47.13 18.87 L 47.13 13.21 L 41.66 13.21 L 41.66 58.14 L 47.13 58.14 L 47.13 40.6 C 47.13 40.6 50.28 47.08 59.15 47.08 C 68.02 47.08 75.78 40.4 75.78 29.7 M 47.14 29.76 C 47.14 23.84 49.78 17.42 59.29 17.42 C 65.52 17.42 70.3 22.72 70.3 29.7 C 70.3 36.68 65.52 42.04 59.3 42.04 C 49.8 42.04 47.15 35.69 47.15 29.77 M 98.51 17.37 C 102.41 17.37 106.81 19.01 106.94 25.93 L 106.94 46.2 L 112.48 46.2 L 112.48 26.69 C 112.48 22.53 115 17.37 121.98 17.37 C 126.01 17.37 130.16 19.32 130.16 26.06 L 130.1 46.2 L 135.64 46.2 L 135.52 26.12 C 135.45 16.49 129.03 12.27 122.49 12.27 C 117.89 12.27 113.24 14.6 110.84 19.26 C 108.07 13.72 102.85 12.34 99.64 12.34 C 94.1 12.34 90.83 15.99 89.32 18.82 L 89.32 13.22 L 83.78 13.22 L 83.78 46.2 L 89.32 46.2 L 89.32 26.69 C 89.32 22.47 91.96 17.37 98.51 17.37 M 143.57 3.65 C 143.57 5.666 145.204 7.3 147.22 7.3 C 149.236 7.3 150.87 5.666 150.87 3.65 C 150.87 1.63 149.23 -0.006 147.21 0 C 145.194 0 143.56 1.634 143.56 3.65 M 144.44 46.2 L 149.98 46.2 L 149.98 13.22 L 144.44 13.22 L 144.44 46.2 Z M 175.16 12.34 L 175.09 12.34 C 168.29 12.34 165.34 17.06 164.33 18.82 L 164.33 13.22 L 158.79 13.22 L 158.79 46.2 L 164.33 46.2 L 164.33 26.69 C 164.33 22.47 167.16 17.37 173.39 17.37 C 181.51 17.37 182.52 22.91 182.59 25.93 L 182.59 46.2 L 188.12 46.2 L 188.12 26.12 C 188.12 15.8 180.82 12.34 175.16 12.34 M 202.47 35.74 L 202.47 18.26 L 213.49 18.26 L 213.49 13.23 L 202.47 13.23 L 202.47 3.78 L 196.93 3.78 L 196.93 35.43 C 197.06 41.98 200.96 46.13 207.13 46.2 L 213.49 46.2 L 213.49 41.16 L 208 41.16 C 206.3 41.16 202.59 41.16 202.46 35.75"
					/>
					<g style={{ opacity: noAccents && !solid ? 0 : 1, transitionDuration: "0.3s" }}>
						<path
							d="M 221.04 46.2 L 221.04 41.15 L 230.97 41.15 C 240.92 41.15 249 33.08 249 23.13 L 249 13.2 L 254.04 13.2 L 254.04 23.13 C 254.034 35.869 243.709 46.194 230.97 46.2 L 221.04 46.2 Z"
							fill="url(#pprmint.a)"
						/>
						<path
							d="M 254.04 13.2 L 254.04 18.24 L 244.11 18.24 C 234.155 18.246 226.086 26.315 226.08 36.27 L 226.08 46.2 L 221.04 46.2 L 221.04 36.27 C 221.046 23.535 231.365 13.211 244.1 13.2 L 254.04 13.2 Z"
							fill="url(#pprmint.b)"
						/>
					</g>
					<g style={{ opacity: noAccents && !solid ? 1 : 0, transitionDuration: "0.3s" }}>
						<path
							d="M 221.04 46.2 L 221.04 41.15 L 230.97 41.15 C 240.92 41.15 249 33.08 249 23.13 L 249 13.2 L 254.04 13.2 L 254.04 23.13 C 254.034 35.869 243.709 46.194 230.97 46.2 L 221.04 46.2 Z"
							fill="url(#pprmint.c)"
						/>
						<path
							d="M 254.04 13.2 L 254.04 18.24 L 244.11 18.24 C 234.155 18.246 226.086 26.315 226.08 36.27 L 226.08 46.2 L 221.04 46.2 L 221.04 36.27 C 221.046 23.535 231.365 13.211 244.1 13.2 L 254.04 13.2 Z"
							fill="url(#pprmint.d)"
						/>
					</g>
					<defs>
						<linearGradient
							id="pprmint.a"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="matrix(0 -22 22 0 273.72 40.8)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" style={{ stopColor: "#3da447", stopOpacity: 1 }} />
							<stop offset="1" style={{ stopColor: "#32863a", stopOpacity: 1 }} />
						</linearGradient>
						<linearGradient
							id="pprmint.b"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="matrix(0 -22 22 0 250.56 40.8)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" style={{ stopColor: "#3da447", stopOpacity: 1 }} />
							<stop offset="1" style={{ stopColor: "#4b5", stopOpacity: 1 }} />
						</linearGradient>
						<linearGradient
							id="pprmint.c"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="matrix(0 -22 22 0 273.72 40.8)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" style={{ stopColor: "#fff", stopOpacity: 1 }} />
							<stop offset="1" style={{ stopColor: "#fff", stopOpacity: 0.66 }} />
						</linearGradient>
						<linearGradient
							id="pprmint.d"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="matrix(0 -22 22 0 250.56 40.8)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" style={{ stopColor: "#fff", stopOpacity: 1 }} />
							<stop offset="1" style={{ stopColor: "#fff", stopOpacity: 1 }} />
						</linearGradient>
					</defs>
				</svg>
			</Link>
			<button
				className="absolute z-90 top-2.5 right-3 md:right-[18px] p-3 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
				onClick={toggleOpen}
			>
				<MenuIcon close={navOpen} size={19} xPadding={1} yPadding={3} strokeWidth={1} />
			</button>
			<AnimatePresence>
				{navOpen && (
					<m.div className="grid grid-cols-1 md:grid-cols-4 md:gap-3 xl:gap-9 px-3 pb-9 w-full 3xl:max-w-7xl md:mx-3 xl:mx-52 3xl:mx-auto overflow-auto md:overflow-hidden z-80">
						<m.div
							initial={{ opacity: 0, y: -20 }}
							animate={{
								opacity: 1,
								y: 0,
								transition: { delay: 0.1, duration: 0.5, type: "spring", bounce: 0 },
							}}
							exit={{ opacity: 0, transition: { duration: 0.2 } }}
							className="w-full h-max pt-20 xl:pt-5"
						>
							<div className="flex items-baseline gap-3">
								<p className="pl-3 text-neutral-950 dark:text-white text-2xl font-serif font-stretch-ultra-condensed">
									{t("Path.General.title")}
								</p>
								<div className="w-full h-px bg-neutral-950/5 dark:bg-white/5" />
							</div>
							<ul>
								{Pages.map((Page) => (
									<Link
										className={`flex items-center ${
											Page.link === pathname
												? "text-neutral-950 dark:text-white bg-black/5 dark:bg-white/5 cursor-default"
												: "hover:text-neutral-950 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 active:opacity-75"
										} px-3 py-1.5 w-full duration-100 active:duration-75`}
										key={Page.link}
										href={Page.link}
										onClick={handleClose}
									>
										<li>
											<div className="flex flex-col">
												<span>{t(`Path.General.${Page.strings}.title`)}</span>
												<span className="text-xs opacity-75">{t(`Path.General.${Page.strings}.description`)}</span>
											</div>
										</li>
									</Link>
								))}
							</ul>
						</m.div>
						<m.div
							initial={{ opacity: 0, y: -20 }}
							animate={{
								opacity: 1,
								y: 0,
								transition: { delay: 0.15, duration: 0.5, type: "spring", bounce: 0 },
							}}
							exit={{ opacity: 0, transition: { duration: 0.2 } }}
							className="w-full h-max col-span-2 pt-9 md:pt-20 xl:pt-5"
						>
							<div className="flex items-baseline gap-3">
								<p className="pl-3 text-neutral-950 dark:text-white text-2xl font-serif font-stretch-ultra-condensed">
									{t("Path.Work.title")}
								</p>
								<div className="w-full h-px bg-neutral-950/5 dark:bg-white/5" />
							</div>
							<ul className="md:grid grid-cols-2">
								<Link
									className={`flex items-center ${
										"/graphics" === pathname
											? "text-neutral-950 dark:text-white bg-black/5 dark:bg-white/5 cursor-default"
											: "hover:text-neutral-950 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 active:opacity-75"
									} px-3 py-1.5 w-full duration-100 active:duration-75`}
									href="/graphics"
									onClick={handleClose}
								>
									<li>
										<div className="flex flex-col">
											<span>{t(`Path.Work.Graphics.title`)}</span>
											<span className="text-xs opacity-75">{t(`Path.Work.Graphics.description`)}</span>
										</div>
									</li>
								</Link>
								<Link
									className={`flex items-center ${
										"/photos" === pathname
											? "text-neutral-950 dark:text-white bg-black/5 dark:bg-white/5 cursor-default"
											: "hover:text-neutral-950 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 active:opacity-75"
									} px-3 py-1.5 w-full duration-100 active:duration-75`}
									href="/photos"
									onClick={handleClose}
								>
									<li>
										<div className="flex flex-col">
											<span>{t(`Path.Work.Photos.title`)}</span>
											<span className="text-xs opacity-75">{t(`Path.Work.Photos.description`)}</span>
										</div>
									</li>
								</Link>
								{Projects.map((Project) => (
									<Link
										className={`flex items-center ${
											Project.link === pathname
												? "text-neutral-950 dark:text-white bg-black/5 dark:bg-white/5 cursor-default"
												: "hover:text-neutral-950 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 active:opacity-75"
										} px-3 py-1.5 w-full duration-100 active:duration-75`}
										key={Project.link}
										href={Project.link}
										onClick={handleClose}
									>
										<li>
											<div className="flex flex-col">
												<span>{t(`Path.Work.Projects.${Project.strings}.title`)}</span>
												<span className="text-xs opacity-75">{t(`Path.Work.Projects.${Project.strings}.description`)}</span>
											</div>
										</li>
									</Link>
								))}
								<Link
									className={`flex items-center ${
										"/projects" === pathname
											? "text-neutral-950 dark:text-white bg-black/5 dark:bg-white/5 cursor-default"
											: "hover:text-neutral-950 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 active:opacity-75"
									} px-3 py-1.5 w-full duration-100 active:duration-75`}
									href="/projects"
									onClick={handleClose}
								>
									<li>
										<div className="flex flex-col">
											<span>{t("Path.Work.Projects.More.title")}</span>
										</div>
									</li>
								</Link>
							</ul>
						</m.div>
						<m.div
							initial={{ opacity: 0, y: -20 }}
							animate={{
								opacity: 1,
								y: 0,
								transition: { delay: 0.2, duration: 0.5, type: "spring", bounce: 0 },
							}}
							exit={{ opacity: 0, transition: { duration: 0.2 } }}
							className="w-full h-max pt-9 md:pt-20 xl:pt-5"
						>
							<div className="flex items-baseline gap-3">
								<p className="pl-3 text-neutral-950 dark:text-white text-2xl font-serif font-stretch-ultra-condensed">
									{t("Path.Other.title")}
								</p>
								<div className="w-full h-px bg-neutral-950/5 dark:bg-white/5" />
							</div>
							<ul>
								<Link
									className={`flex items-center ${
										"/privacy" === pathname
											? "text-neutral-950 dark:text-white bg-black/5 dark:bg-white/5 cursor-default"
											: "hover:text-neutral-950 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 active:opacity-75"
									} px-3 py-1.5 w-full duration-100 active:duration-75`}
									href="/privacy"
									onClick={handleClose}
								>
									<li>
										<div className="flex flex-col">
											<span>{t("Path.Other.Privacy.title")}</span>
											<span className="text-xs opacity-75">{t("Path.Other.Privacy.description")}</span>
										</div>
									</li>
								</Link>
								<Link
									className={`flex items-center ${
										"/ai" === pathname
											? "text-neutral-950 dark:text-white bg-black/5 dark:bg-white/5 cursor-default"
											: "hover:text-neutral-950 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 active:opacity-75"
									} px-3 py-1.5 w-full duration-100 active:duration-75`}
									href="/ai"
									onClick={handleClose}
								>
									<li>
										<div className="flex flex-col">
											<span>{t("Path.Other.AI.title")}</span>
											<span className="text-xs opacity-75">{t("Path.Other.AI.description")}</span>
										</div>
									</li>
								</Link>
							</ul>
						</m.div>
					</m.div>
				)}
			</AnimatePresence>
		</nav>
	);
}

function MenuIcon({
	close,
	size,
	xPadding,
	yPadding,
	strokeWidth,
}: {
	close: boolean;
	size: number;
	xPadding: number;
	yPadding: number;
	strokeWidth: number;
}) {
	return (
		<svg
			width={size}
			height={size}
			xmlns="http://www.w3.org/2000/svg"
			strokeWidth={strokeWidth}
			className="stroke-current fill-none"
			strokeLinecap="butt"
		>
			<path
				d={
					close
						? `M${yPadding},${yPadding} ${size / 2},${size / 2} ${size - yPadding},${yPadding}`
						: `M${xPadding},${yPadding + (size % 2 ? 0.5 : 0)} ${size / 2},${yPadding + (size % 2 ? 0.5 : 0)} ${size - xPadding},${yPadding + (size % 2 ? 0.5 : 0)}`
				}
				className="duration-400 ease-out-quint"
			/>
			<path
				d={close ? `M${size / 2},${size / 2} ${size / 2},${size / 2}` : `M${xPadding},${size / 2} ${size - xPadding},${size / 2}`}
				className="duration-400 ease-out-quint"
			/>
			<path
				d={
					close
						? `M${yPadding},${size - yPadding} ${size / 2},${size / 2} ${size - yPadding},${size - yPadding}`
						: `M${xPadding},${size - yPadding - (size % 2 ? 0.5 : 0)} ${size / 2},${size - yPadding - (size % 2 ? 0.5 : 0)} ${size - xPadding},${size - yPadding - (size % 2 ? 0.5 : 0)}`
				}
				className="duration-400 ease-out-quint"
			/>
		</svg>
	);
}
