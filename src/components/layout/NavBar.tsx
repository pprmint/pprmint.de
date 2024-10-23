"use client";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Link, locales } from "src/navigation";
import { setUserLocale } from "src/i18n/locale";

import DesktopNavigation from "./navigation/Desktop";
import MobileNavigation from "./navigation/Mobile";

import Wordmark from "public/assets/wordmark.svg";
import { useEffect, useState } from "react";
import { useTransition, a } from "@react-spring/web";

export default function NavBar() {
	const [solid, setSolid] = useState(false);
	const currentLocale = useLocale();
	const otherLocale = locales?.find((cur) => cur !== currentLocale);
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
		<div className="z-90 fixed top-0 inset-x-0 h-16 pl-6 md:pl-9 pr-2 md:pr-5 flex items-center justify-between duration-300">
			{bgFadeIn((styles, item) =>
				item ? (
					<a.div
						style={styles}
						className="fixed top-0 inset-x-0 bg-neutral-950/80 h-16 backdrop-blur-xl border-b border-neutral-50/10 ring-1 ring-neutral-950 shadow-xl"
					/>
				) : (
					<a.div style={styles} className="fixed top-0 inset-x-0 bg-gradient-to-b from-neutral-950/60 via-70% via-neutral-950/10 h-16" />
				)
			)}
			<Link href="/" className="z-80 my-auto drop-shadow-[0px_2px_12px_#1118]">
				<Image src={Wordmark} alt="pprmint. logo" className="h-auto w-[150px] mt-1 duration-250" />
			</Link>
			<div className="hidden z-80 md:flex">
				<DesktopNavigation />
			</div>
			<div className="block z-80 md:hidden">
				<MobileNavigation />
			</div>
			<div className="hidden md:inline-flex justify-end z-70 w-[150px] duration-250">
				<button
					onClick={() => setUserLocale(otherLocale!)}
					className="relative inline-flex w-20 h-7 hover:bg-neutral-50/10 active:opacity-75 rounded-full border border-neutral-50/10 backdrop-blur-sm duration-100 active:duration-75"
				>
					<div
						className={`absolute w-[36px] h-[22px] top-0.5 text-center uppercase bg-gradient-to-b from-neutral-50 to-neutral-100 text-neutral-950 shadow-sm rounded-full ${
							currentLocale === "en" ? "left-[40px]" : "left-0.5"
						} duration-200 ease-out-cubic`}
					/>
					<div className="absolute inset-0 flex items-center">
						{locales.map((locale, _) => (
							<span
								key={locale}
								className={`w-full text-center ${currentLocale === locale && "text-neutral-950 font-medium"} text-sm uppercase duration-100`}
							>
								{locale}
							</span>
						))}
					</div>
				</button>
			</div>
		</div>
	);
}
