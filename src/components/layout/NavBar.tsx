"use client";
import Image from "next/image";
import { Link } from "src/navigation";

import DesktopNavigation from "./navigation/Desktop";
import MobileNavigation from "./navigation/Mobile";

import Wordmark from "public/assets/wordmark.svg";
import { useEffect, useState } from "react";
import { useTransition, a } from "@react-spring/web";
import Settings from "./navigation/Settings";

export default function NavBar() {
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
		<div className="z-90 fixed top-0 inset-x-0 h-16 pl-6 md:pl-9 pr-2 md:pr-5 flex items-center justify-between duration-300">
			{bgFadeIn((styles, item) =>
				item ? (
					<a.div
						style={styles}
						// @ts-ignore
						className="fixed top-0 inset-x-0 bg-neutral-950/80 h-16 backdrop-blur-xl border-b border-neutral-50/10 ring-1 ring-neutral-950 shadow-xl"
					/>
				) : (
					// @ts-ignore
					<a.div style={styles} className="fixed top-0 inset-x-0 bg-gradient-to-b from-neutral-950/60 via-70% via-neutral-950/10 h-16" />
				)
			)}
			<Link href="/" className="z-80 my-auto drop-shadow-[0px_2px_12px_#1118] text-neutral-50">
				<Image src={Wordmark} alt="pprmint. logo" className="h-auto w-[150px] mt-1 duration-250" />
			</Link>
			<div className="hidden z-80 md:flex">
				<DesktopNavigation />
			</div>
			<div className="block z-80 md:hidden">
				<MobileNavigation />
			</div>
			<Settings />
		</div>
	);
}
