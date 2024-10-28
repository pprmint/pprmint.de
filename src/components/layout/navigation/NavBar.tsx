"use client";
import DesktopNavigation from "./Desktop";
import MobileNavigation from "./Mobile";
import { useEffect, useState } from "react";
import { useTransition, a } from "@react-spring/web";
import Settings from "./Settings";
import Link from "next/link";
import { useNavbar } from "./NavBarContext";

export default function NavBar() {
	const { showNavbarGradient } = useNavbar();
	const [solid, setSolid] = useState(false);
	useEffect(() => {
		const handleScroll = () => {
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

	const bgFadeIn = useTransition(solid, {
		from: {
			opacity: 0,
		},
		enter: {
			opacity: 1,
		},
		leave: {
			opacity: 0,
		},
	});

	return (
		<div
			className={`z-90 fixed top-0 inset-x-0 h-16 pl-6 md:pl-9 pr-2 md:pr-5 flex items-center md:justify-between duration-300 ${
				!showNavbarGradient
					? "text-neutral-50"
					: solid
					? "text-neutral-50"
					: "text-neutral-950 dark:text-neutral-50"
			}`}
		>
			{bgFadeIn((styles, item) =>
				item ? (
					<a.div
						style={styles}
						// @ts-expect-error
						className="fixed top-0 inset-x-0 bg-neutral-950/80 h-16 backdrop-blur-xl border-b border-white/10 ring-1 ring-black/10 dark:ring-black/50 shadow-lg"
					/>
				) : (
					showNavbarGradient && (
						<a.div
							style={styles}
							// @ts-expect-error
							className="fixed top-0 inset-x-0 bg-gradient-to-b from-neutral-50/50 dark:from-neutral-950/60 via-70% via-neutral-50/10 dark:via-neutral-950/10 h-16"
						/>
					)
				)
			)}
			<Link href="/" className="z-80 my-auto grow md:grow-0">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 282 59" className="h-auto w-[150px] mt-1">
					<path
						fill="currentColor"
						d="M34.11 29.7c0-10.7-7.74-17.36-16.61-17.36-8.88 0-12.02 6.54-12.02 6.54v-5.66H0v44.93h5.48V40.6s3.14 6.48 12.02 6.48S34.1 40.4 34.1 29.7m-28.63.06c0-5.92 2.64-12.34 12.14-12.34 6.23 0 11.02 5.3 11.02 12.28s-4.79 12.33-11.02 12.33c-9.5 0-12.14-6.35-12.14-12.27m70.3-.06c0-10.7-7.74-17.37-16.62-17.37s-12.02 6.54-12.02 6.54v-5.66h-5.47v44.93h5.47V40.6s3.15 6.48 12.02 6.48S75.78 40.4 75.78 29.7m-28.64.06c0-5.92 2.64-12.34 12.15-12.34 6.23 0 11.01 5.3 11.01 12.28S65.52 42.04 59.3 42.04c-9.5 0-12.15-6.35-12.15-12.27m41.73-2.2c0-5.98 3.96-9.32 9.5-9.32h4.85v-5.03h-4.78c-7.18 0-9.57 5.6-9.57 5.6v-5.6h-5.54V46.2h5.54zm36.63-10.2c3.9 0 8.3 1.64 8.43 8.56V46.2h5.54V26.69c0-4.16 2.52-9.32 9.5-9.32 4.03 0 8.18 1.95 8.18 8.69l-.06 20.14h5.54l-.12-20.08c-.07-9.63-6.49-13.85-13.03-13.85-4.6 0-9.25 2.33-11.65 6.99-2.77-5.54-7.99-6.92-11.2-6.92-5.54 0-8.81 3.65-10.32 6.48v-5.6h-5.54V46.2h5.54V26.69c0-4.22 2.64-9.32 9.19-9.32m45.06-13.72a3.65 3.65 0 0 0 3.65 3.65 3.65 3.65 0 0 0 3.65-3.65A3.65 3.65 0 0 0 174.21 0a3.65 3.65 0 0 0-3.65 3.65m.88 42.55h5.54V13.22h-5.54zm30.72-33.86h-.07c-6.8 0-9.75 4.72-10.76 6.48v-5.6h-5.54V46.2h5.54V26.69c0-4.22 2.83-9.32 9.06-9.32 8.12 0 9.13 5.54 9.2 8.56V46.2h5.53V26.12c0-10.32-7.3-13.78-12.96-13.78m27.31 23.4V18.26h11.02v-5.03h-11.02V3.78h-5.54v31.65c.13 6.55 4.03 10.7 10.2 10.77h6.36v-5.04H235c-1.7 0-5.41 0-5.54-5.41"
					/>
					<path
						d="M248.04 46.2v-5.05h9.93c9.95 0 18.03-8.07 18.03-18.02V13.2h5.04v9.93a23.08 23.08 0 0 1-23.07 23.07z"
						fill="url(#pprmint.a)"
					/>
					<path
						d="M281.04 13.2v5.04h-9.93a18.04 18.04 0 0 0-18.03 18.03v9.93h-5.04v-9.93A23.08 23.08 0 0 1 271.1 13.2z"
						fill="url(#pprmint.b)"
					/>
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
							<stop offset="0" style={{ stopColor: " #00b85c", stopOpacity: 1 }} />
							<stop offset="1" style={{ stopColor: " #008f47", stopOpacity: 1 }} />
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
							<stop offset="0" style={{ stopColor: " #00b85c", stopOpacity: 1 }} />
							<stop offset="1" style={{ stopColor: " #0c6", stopOpacity: 1 }} />
						</linearGradient>
					</defs>
				</svg>
			</Link>
			<div className="hidden z-80 md:flex">
				<DesktopNavigation />
			</div>
			<div className="z-80 flex justify-end md:w-[150px]">
				<Settings />
			</div>
			<div className="block z-90 md:hidden ml-1">
				<MobileNavigation />
			</div>
		</div>
	);
}
