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
	const handleClickOutside = (e: MouseEvent) => {
		if (navRef.current && !navRef.current.contains(e.target as Node)) {
			handleClose();
		}
	};
	useEffect(() => {
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
				!inverted
					? "text-neutral-950 dark:text-white"
					: solid
						? "text-neutral-950 dark:text-white"
						: "text-white "
			}
				${solid || navOpen ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl border-black/5 dark:border-white/5" : "border-transparent"}`}
		>
			<Link className="absolute z-90 left-6 md:left-9 top-3.5" href="/">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 282 59" className="h-auto w-[150px] mt-1">
					<path
						fill="currentColor"
						d="M34.11 29.7c0-10.7-7.74-17.36-16.61-17.36-8.88 0-12.02 6.54-12.02 6.54v-5.66H0v44.93h5.48V40.6s3.14 6.48 12.02 6.48S34.1 40.4 34.1 29.7m-28.63.06c0-5.92 2.64-12.34 12.14-12.34 6.23 0 11.02 5.3 11.02 12.28s-4.79 12.33-11.02 12.33c-9.5 0-12.14-6.35-12.14-12.27m70.3-.06c0-10.7-7.74-17.37-16.62-17.37s-12.02 6.54-12.02 6.54v-5.66h-5.47v44.93h5.47V40.6s3.15 6.48 12.02 6.48S75.78 40.4 75.78 29.7m-28.64.06c0-5.92 2.64-12.34 12.15-12.34 6.23 0 11.01 5.3 11.01 12.28S65.52 42.04 59.3 42.04c-9.5 0-12.15-6.35-12.15-12.27m41.73-2.2c0-5.98 3.96-9.32 9.5-9.32h4.85v-5.03h-4.78c-7.18 0-9.57 5.6-9.57 5.6v-5.6h-5.54V46.2h5.54zm36.63-10.2c3.9 0 8.3 1.64 8.43 8.56V46.2h5.54V26.69c0-4.16 2.52-9.32 9.5-9.32 4.03 0 8.18 1.95 8.18 8.69l-.06 20.14h5.54l-.12-20.08c-.07-9.63-6.49-13.85-13.03-13.85-4.6 0-9.25 2.33-11.65 6.99-2.77-5.54-7.99-6.92-11.2-6.92-5.54 0-8.81 3.65-10.32 6.48v-5.6h-5.54V46.2h5.54V26.69c0-4.22 2.64-9.32 9.19-9.32m45.06-13.72a3.65 3.65 0 0 0 3.65 3.65 3.65 3.65 0 0 0 3.65-3.65A3.65 3.65 0 0 0 174.21 0a3.65 3.65 0 0 0-3.65 3.65m.88 42.55h5.54V13.22h-5.54zm30.72-33.86h-.07c-6.8 0-9.75 4.72-10.76 6.48v-5.6h-5.54V46.2h5.54V26.69c0-4.22 2.83-9.32 9.06-9.32 8.12 0 9.13 5.54 9.2 8.56V46.2h5.53V26.12c0-10.32-7.3-13.78-12.96-13.78m27.31 23.4V18.26h11.02v-5.03h-11.02V3.78h-5.54v31.65c.13 6.55 4.03 10.7 10.2 10.77h6.36v-5.04H235c-1.7 0-5.41 0-5.54-5.41"
					/>
					<g style={{ opacity: noAccents && !solid ? 0 : 1, transitionDuration: "0.3s" }}>
						<path
							d="M248.04 46.2v-5.05h9.93c9.95 0 18.03-8.07 18.03-18.02V13.2h5.04v9.93a23.08 23.08 0 0 1-23.07 23.07z"
							fill="url(#pprmint.a)"
						/>
						<path
							d="M281.04 13.2v5.04h-9.93a18.04 18.04 0 0 0-18.03 18.03v9.93h-5.04v-9.93A23.08 23.08 0 0 1 271.1 13.2z"
							fill="url(#pprmint.b)"
						/>
					</g>
					<g style={{ opacity: noAccents && !solid ? 1 : 0, transitionDuration: "0.3s" }}>
						<path
							d="M248.04 46.2v-5.05h9.93c9.95 0 18.03-8.07 18.03-18.02V13.2h5.04v9.93a23.08 23.08 0 0 1-23.07 23.07z"
							fill="url(#pprmint.c)"
						/>
						<path
							d="M281.04 13.2v5.04h-9.93a18.04 18.04 0 0 0-18.03 18.03v9.93h-5.04v-9.93A23.08 23.08 0 0 1 271.1 13.2z"
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
								transition: { delay: 0.15, duration: 0.5, type: "spring", bounce: 0 },
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
										} px-3 py-1.5 w-full duration-100 rounded-md`}
										key={Page.link}
										href={Page.link}
										onClick={handleClose}
									>
										<li>
											<div className="flex flex-col">
												<span>{t(`Path.General.${Page.strings}.title`)}</span>
												<span className="text-xs opacity-75">
													{t(`Path.General.${Page.strings}.description`)}
												</span>
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
								transition: { delay: 0.2, duration: 0.5, type: "spring", bounce: 0 },
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
									} px-3 py-1.5 w-full duration-100 rounded-md`}
									href="/graphics"
									onClick={handleClose}
								>
									<li>
										<div className="flex flex-col">
											<span>{t(`Path.Work.Graphics.title`)}</span>
											<span className="text-xs opacity-75">
												{t(`Path.Work.Graphics.description`)}
											</span>
										</div>
									</li>
								</Link>
								<Link
									className={`flex items-center ${
										"/photos" === pathname
											? "text-neutral-950 dark:text-white bg-black/5 dark:bg-white/5 cursor-default"
											: "hover:text-neutral-950 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 active:opacity-75"
									} px-3 py-1.5 w-full duration-100 rounded-md`}
									href="/photos"
									onClick={handleClose}
								>
									<li>
										<div className="flex flex-col">
											<span>{t(`Path.Work.Photos.title`)}</span>
											<span className="text-xs opacity-75">
												{t(`Path.Work.Photos.description`)}
											</span>
										</div>
									</li>
								</Link>
								{Projects.map((Project) => (
									<Link
										className={`flex items-center ${
											Project.link === pathname
												? "text-neutral-950 dark:text-white bg-black/5 dark:bg-white/5 cursor-default"
												: "hover:text-neutral-950 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 active:opacity-75"
										} px-3 py-1.5 w-full duration-100 rounded-md`}
										key={Project.link}
										href={Project.link}
										onClick={handleClose}
									>
										<li>
											<div className="flex flex-col">
												<span>{t(`Path.Work.Projects.${Project.strings}.title`)}</span>
												<span className="text-xs opacity-75">
													{t(`Path.Work.Projects.${Project.strings}.description`)}
												</span>
											</div>
										</li>
									</Link>
								))}
								<Link
									className={`flex items-center ${
										"/projects" === pathname
											? "text-neutral-950 dark:text-white bg-black/5 dark:bg-white/5 cursor-default"
											: "hover:text-neutral-950 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 active:opacity-75"
									} px-3 py-1.5 w-full duration-100 rounded-md`}
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
								transition: { delay: 0.25, duration: 0.5, type: "spring", bounce: 0 },
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
									} px-3 py-1.5 w-full duration-100 rounded-md`}
									href="/privacy"
									onClick={handleClose}
								>
									<li>
										<div className="flex flex-col">
											<span>{t("Path.Other.Privacy.title")}</span>
											<span className="text-xs opacity-75">
												{t("Path.Other.Privacy.description")}
											</span>
										</div>
									</li>
								</Link>
								<Link
									className={`flex items-center ${
										"/ai" === pathname
											? "text-neutral-950 dark:text-white bg-black/5 dark:bg-white/5 cursor-default"
											: "hover:text-neutral-950 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 active:opacity-75"
									} px-3 py-1.5 w-full duration-100 rounded-md`}
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
				d={
					close
						? `M${size / 2},${size / 2} ${size / 2},${size / 2}`
						: `M${xPadding},${size / 2} ${size - xPadding},${size / 2}`
				}
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
