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
			<Link className="absolute z-90 left-6 md:left-[33px] top-3.5" href="/">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157 35" className="h-auto w-[157px] mt-[3px]">
					<path
						fill="currentColor"
						d="M3.8 34.59V24.33c1.4 2.05 3.65 3.12 6.65 3.12 5.66 0 9.5-4.03 9.5-9.95 0-5.93-3.84-9.96-9.5-9.96-3 0-5.24 1.07-6.65 3.12V8H.53v26.59H3.8Zm6.38-24.16c3.88 0 6.5 2.85 6.5 7.07 0 4.21-2.62 7.06-6.5 7.06-3.87 0-6.5-2.85-6.5-7.06 0-4.22 2.63-7.07 6.5-7.07ZM27 34.59V24.33c1.41 2.05 3.65 3.12 6.65 3.12 5.66 0 9.5-4.03 9.5-9.95 0-5.93-3.84-9.96-9.5-9.96-3 0-5.24 1.07-6.64 3.12V8h-3.27v26.59h3.27Zm6.39-24.16c3.87 0 6.5 2.85 6.5 7.07 0 4.21-2.63 7.06-6.5 7.06-3.88 0-6.5-2.85-6.5-7.06 0-4.22 2.62-7.07 6.5-7.07ZM46.95 27h3.26v-9.88c0-3.8 1.98-6.23 5.7-6.23h1.86V8h-1.86c-2.54 0-4.33.99-5.7 2.73V8h-3.26v19ZM61.2 27h3.26V16.35c0-3.69 1.94-5.93 5.13-5.93 2.62 0 4.17 1.9 4.17 5.09v11.47h3.27V16.36c0-3.69 1.94-5.93 5.16-5.93 2.63 0 4.18 1.9 4.18 5.09v11.47h3.27V15.33c0-4.86-2.66-7.79-7.07-7.79-2.5 0-4.82 1.3-6.38 3.46-1.1-2.16-3.38-3.46-6.23-3.46a7.11 7.11 0 0 0-5.5 2.82V8h-3.27v19ZM94 27h3.27V8h-3.26v19Zm1.64-22.65c1.3 0 2.09-.76 2.09-2.05 0-1.29-.8-2.05-2.09-2.05-1.3 0-2.09.76-2.09 2.05 0 1.3.8 2.05 2.09 2.05ZM101.83 27h3.23V16.35c0-3.54 2.32-5.93 5.74-5.93 3 0 5.05 2.05 5.05 5.09v11.47h3.26V15.33c0-4.63-3.19-7.79-7.93-7.79a8.36 8.36 0 0 0-6.12 2.97V8h-3.23v19ZM129.9 27h3.46v-2.9h-3.42c-2.05 0-3.2-1.1-3.2-3.41v-9.8h6.62V8h-6.61V2.3h-3.27v18.23c0 4.37 2.05 6.46 6.42 6.46Z"
					/>
					<g style={{ opacity: noAccents && !solid ? 0 : 1, transitionDuration: "0.3s" }}>
						<path
							d="m140 27-1-1.5 1-1.5h2.74C148.4 24 153 19.4 153 13.74V11l1.5-1 1.5 1v2.74c0 7.32-5.94 13.26-13.26 13.26H140Z"
							fill="url(#pprmint.a)"
						/>
						<path
							d="M156 8v3h-5.74C144.6 11 140 15.6 140 21.26V27h-3v-5.74C137 13.94 142.94 8 150.26 8H156Z"
							fill="url(#pprmint.b)"
						/>
					</g>
					<g style={{ opacity: noAccents && !solid ? 1 : 0, transitionDuration: "0.3s" }}>
						<path
							d="m140 27-1-1.5 1-1.5h2.74C148.4 24 153 19.4 153 13.74V11l1.5-1 1.5 1v2.74c0 7.32-5.94 13.26-13.26 13.26H140Z"
							fill="url(#pprmint.c)"
						/>
						<path
							d="M156 8v3h-5.74C144.6 11 140 15.6 140 21.26V27h-3v-5.74C137 13.94 142.94 8 150.26 8H156Z"
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
							gradientTransform="matrix(0 -13 13 0 151.75 23.86)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" style={{ stopColor: "#17925f", stopOpacity: 1 }} />
							<stop offset="1" style={{ stopColor: "#1b6b47", stopOpacity: 1 }} />
						</linearGradient>
						<linearGradient
							id="pprmint.b"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="matrix(0 -13 13 0 138.5 23.86)"
							gradientUnits="userSpaceOnUse"
						>
							<stop offset="0" style={{ stopColor: "#17925f", stopOpacity: 1 }} />
							<stop offset="1" style={{ stopColor: "#0b7", stopOpacity: 1 }} />
						</linearGradient>
						<linearGradient
							id="pprmint.c"
							x1="0"
							x2="1"
							y1="0"
							y2="0"
							gradientTransform="matrix(0 -13 13 0 151.75 23.86)"
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
							gradientTransform="matrix(0 -13 13 0 138.5 23.86)"
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
								<p className="pl-3 text-neutral-950 dark:text-white text-2xl font-serif">
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
								<p className="pl-3 text-neutral-950 dark:text-white text-2xl font-serif">
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
								<p className="pl-3 text-neutral-950 dark:text-white text-2xl font-serif">
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
