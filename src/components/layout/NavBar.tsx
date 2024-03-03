"use client";
import { useState, useEffect } from "react";
import { Link } from "src/navigation";
import Image from "next/image";

import DesktopNavigation from "./Navbar/Desktop";
import MobileNavigation from "./Navbar/Mobile";

import Wordmark from "public/assets/wordmark.svg";

export default function NavBar() {
	// Hide navbar background on scroll
	const [navBackground, setNavBackground] = useState(true);
	const hideNavBackground = () => {
		if (window.scrollY >= 1) {
			setNavBackground(false);
		} else {
			setNavBackground(true);
		}
	};
	useEffect(() => {
		hideNavBackground();
		window.addEventListener("scroll", hideNavBackground);
	});

	return (
		<div
			className={`z-50 fixed w-full h-16 flex items-start ${
				!navBackground && "shadow-[0_6px_22px_#11111166]"
			} duration-300`}
		>
			<div
				className={`absolute z-0 inset-0 border-b ${
					navBackground
						? "ease-out border-transparent"
						: "linear border-neutral-50/10 backdrop-blur-xl bg-neutral-950/75"
				} duration-300`}
			/>
			<Link href="/" className="z-50 pl-3 md:pl-6 my-auto mr-auto drop-shadow-md">
				<Image src={Wordmark} alt="pprmint. logo" className="h-9 w-[184px] mt-1" />
			</Link>
			<div className="hidden z-50 md:flex">
				<DesktopNavigation />
			</div>
			<div className="block z-50 md:hidden">
				<MobileNavigation />
			</div>
		</div>
	);
}
