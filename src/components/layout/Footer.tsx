"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

import FooterCursor from "public/assets/footer/cursor.svg";
import FooterCube from "public/assets/footer/cube.svg";
import FooterBrackets from "public/assets/footer/brackets.svg";
import FooterLeaf from "public/assets/footer/leaf.svg";
import Link from "next/link";
import Moon from "src/icons/Moon";
import Computer from "src/icons/Computer";
import SmartphoneHomeButton from "src/icons/SmartphoneHomeButton";
import Sun from "src/icons/Sun";
import { useTheme } from "next-themes";
import NoSSR from "../NoSSR";
import { locales } from "src/i18n/config";
import { setUserLocale } from "src/i18n/locale";
import Heart from "src/icons/Heart";
import HotCup from "src/icons/HotCup";
import Bluesky from "src/icons/Bluesky";
import Twitter from "src/icons/Twitter";
import YouTube from "src/icons/YouTube";
import GitHub from "src/icons/GitHub";
import Kofi from "src/icons/Kofi";

export default function Footer() {
	const t = useTranslations("FOOTER");

	const { theme, setTheme } = useTheme();
	const currentLocale = useLocale();
	const otherLocale = locales?.find((cur) => cur !== currentLocale);

	const [clicks, setClicks] = useState(0);
	const [textVisible, setTextVisible] = useState(false);
	const [counterVisible, setCounterVisible] = useState(false);
	const [pissedOffMina, setPissedOffMina] = useState(false);

	const audioRef = useRef<HTMLAudioElement | null>(null);
	useEffect(() => {
		// Initialize audio.
		audioRef.current = new Audio("/sounds/nadenade_1.wav");
		// Check localStorage for pissedOffMina state.
		setPissedOffMina(!!localStorage.getItem("pissedOffMina"));
	}, []);

	useEffect(() => {
		// Reset visibility and clicks after 7 seconds.
		const hiderTimeout = setTimeout(() => {
			setTextVisible(false);
			setCounterVisible(false);
		}, 7000);
		const counterTimeout = setTimeout(() => {
			setClicks(0);
		}, 7300);

		return () => {
			clearTimeout(hiderTimeout);
			clearTimeout(counterTimeout);
		};
	}, [clicks]);

	function getTranslationKey(clicks: number, pissedOffMina: boolean): string {
		if (clicks > Number.MAX_SAFE_INTEGER) return "Mina.humanityIsDead";
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
		if (clickCount === 3) {
			setTextVisible(true);
		}
		if (clickCount === 10) {
			localStorage.removeItem("pissedOffMina");
			setPissedOffMina(false);
		}
		if (clickCount === 300) {
			setCounterVisible(true);
		}
	}

	function handlePat() {
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

	const translationKey = getTranslationKey(clicks, pissedOffMina);

	return (
		<footer className="w-screen overflow-x-hidden">
			<div className="relative w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
				<div className="w-full border-x border-black/5 dark:border-white/5 pt-10 lg:pt-20 xl:pt-40">
					<div className="h-44 overflow-clip">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 160 160"
							className="group fill-neutral-100 dark:fill-neutral-900 hover:fill-neutral-200 dark:hover:fill-neutral-800 h-full w-auto mx-auto -rotate-6 hover:rotate-0 translate-y-12 hover:translate-y-9 active:translate-y-10 duration-300 active:duration-75 ease-in-out-custom cursor-grab active:cursor-grabbing"
							onMouseDown={handlePat}
						>
							<path
								d="m490.172 76.467.018-.186a2.602 2.602 0 1 1-.018.186m25.987 29.561q.017.153.025.309l.001.063a2.603 2.603 0 0 1-2.602 2.602 2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 5.178-.372m-42.932 2.641a92 92 0 0 0-2.578-2.921 89 89 0 0 0 2.185-1.797 2.602 2.602 0 0 1 .393 4.718m5.075-9.839a2.601 2.601 0 1 1-3.548 3.435 72 72 0 0 0 3.548-3.435m4.277-4.946a2.602 2.602 0 1 1-2.728 3.279 57 57 0 0 0 2.728-3.279m3.056-4.477a2.603 2.603 0 0 1 4.473 1.807 2.603 2.603 0 0 1-2.602 2.602 2.603 2.603 0 0 1-2.459-3.453q.302-.477.588-.956m29.677 9.013a2.602 2.602 0 1 1-1.313-4.512q.252.637.539 1.348c.299.737.552 1.814.774 3.164m2.219 24.874a2.603 2.603 0 0 1-.382-4.378c.118 1.447.244 2.911.382 4.378m1.205 10.214h-.008a2.603 2.603 0 0 1-2.602-2.602c0-1.205.822-2.221 1.936-2.515.201 1.734.424 3.448.674 5.117m1.839 9.153a2.603 2.603 0 0 1-4.449-1.831 2.603 2.603 0 0 1 3.451-2.46c.3 1.502.631 2.939.998 4.291m-3.982 6.604a2.602 2.602 0 0 1 4.504 2.563 19.5 19.5 0 0 1-4.504-2.563m2.395 4.077a2.602 2.602 0 0 1-2.657-3.603c.561.972 1.473 2.377 2.657 3.603m-7.577-8.682a2.603 2.603 0 0 1 4.774 1.432 2.603 2.603 0 0 1-3.014 2.569c-.706-1.353-1.281-2.749-1.76-4.001m-.935-2.374a2.602 2.602 0 1 1-2.156-4.058 2.603 2.603 0 0 1 2.19 4.007c-.189-.499-.357-.92-.51-1.235 0 0 .193.453.476 1.286m1.494 5.847a2.6 2.6 0 0 1-.709-3.214c.243.933.49 2.012.709 3.214m.67 10.308a2.604 2.604 0 0 1-.013-4.846c.089 1.526.105 3.15.013 4.846m-1.409 8.611a2.6 2.6 0 0 1 .744-3.159 39 39 0 0 1-.744 3.159m-2.274 6.07a2.602 2.602 0 1 1 1.587-3.875 38 38 0 0 1-1.587 3.875m1.964-2.605.001.082a2.6 2.6 0 0 1-1.477 2.346c.457-.695.974-1.525 1.476-2.428m2.399-1.99a2.6 2.6 0 0 1-1.195-.434c.417-.965.756-1.946.947-2.882 0 0 .04 1.238.248 3.316m1.521 9.612a2.602 2.602 0 1 1-.906-4.856c.235 1.487.531 3.122.906 4.856m4.838 14.728a2.603 2.603 0 0 1-1.996-4.805 59 59 0 0 0 1.996 4.805m21.538 19.415a2.604 2.604 0 0 1-4.197-1.353 28 28 0 0 0 4.197 1.353m19.174.611h-.034a2.6 2.6 0 0 1-1.996-.934A57 57 0 0 0 562 211s-.533.773-1.609 1.893m-6.461 4.925a2.602 2.602 0 1 1 3.866-2.57 27.5 27.5 0 0 1-3.866 2.57m-6.577 2.568a2.603 2.603 0 0 1 4.739-1.648 27.4 27.4 0 0 1-4.739 1.648m-10.27.68a2.602 2.602 0 1 1 4.874.118 32 32 0 0 1-4.874-.118m-10.048-2.387a2.603 2.603 0 0 1 4.701 1.451 45 45 0 0 1-4.701-1.451m-2.902-.527a2.602 2.602 0 1 1 .951-.237A57 57 0 0 1 523 217s.399.463 1.133 1.152m6.327 4.301a2.603 2.603 0 0 1-3.927-2.239l.001-.077c1.099.8 2.422 1.628 3.926 2.316m1.36 3.379a2.599 2.599 0 0 1 1.052-2.462c.991.299 2.036.521 3.128.63 0 0-1.623.898-4.18 1.832m-8.93 2.003a2.602 2.602 0 1 1 2.734-.334c-.885.151-1.8.267-2.734.334m-6.754-7.847a2.602 2.602 0 1 1 1.381 2.53q-.225-.424-.455-.834a77 77 0 0 1-.926-1.696m-3.286-6.931q.35-.104.733-.105a2.603 2.603 0 0 1 1.405 4.792 88 88 0 0 1-2.138-4.687m8.462-2.465a2.603 2.603 0 1 1-5.098-.974c1.936.615 3.699.878 5.098.974m-10.086-15.987a2.603 2.603 0 0 1 4.959 1.103 2.603 2.603 0 0 1-3.027 2.567 74 74 0 0 1-1.932-3.67m-3.008-6.76.102-.002a2.603 2.603 0 0 1 1.816 4.465 111 111 0 0 1-1.918-4.463m-5.042-14.585a2.601 2.601 0 0 1 1.477 4.743 194 194 0 0 1-1.477-4.743m-2.342-8.456a2.603 2.603 0 0 1 4.944 1.134 2.603 2.603 0 0 1-4.077 2.144 259 259 0 0 1-.867-3.278m-4.643-16.001a2.603 2.603 0 0 1 4.324 1.95 2.6 2.6 0 0 1-2.827 2.592 139 139 0 0 0-1.497-4.542m-5.787-13.719a2.602 2.602 0 1 1 1.743 3.612 98 98 0 0 0-1.743-3.612m-3.648-6.67a2.602 2.602 0 0 1 2.475 4.439l-.005-.01a229 229 0 0 0-2.47-4.429m-12.155-18.086a2.602 2.602 0 1 1 2.59 3.332 108 108 0 0 0-2.59-3.332m12.905 3.334a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m10.407 0a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m10.407-19.846a2.602 2.602 0 1 1 .003-5.205 2.602 2.602 0 0 1-.003 5.205m-10.407 0a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m0-9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m-10.407 19.846a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m20.814 0a2.602 2.602 0 1 1 .003-5.205 2.602 2.602 0 0 1-.003 5.205m-10.407 0a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m-10.407 19.846a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m20.814-9.923a2.602 2.602 0 1 1 .003-5.205 2.602 2.602 0 0 1-.003 5.205m0 19.846a2.602 2.602 0 0 1 0-5.203 2.602 2.602 0 0 1 0 5.203m-10.407 9.923a2.603 2.603 0 0 1-2.602-2.601 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.601m0-19.846a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m0 9.923a2.602 2.602 0 1 1 .001-5.201 2.602 2.602 0 0 1-.001 5.201m10.407-9.923a2.602 2.602 0 1 1 .003-5.205 2.602 2.602 0 0 1-.003 5.205m0 29.769a2.602 2.602 0 1 1 .001-5.203 2.602 2.602 0 0 1-.001 5.203m0 9.924a2.602 2.602 0 1 1 .003-5.205 2.602 2.602 0 0 1-.003 5.205m0 19.846a2.602 2.602 0 1 1 .003-5.205 2.602 2.602 0 0 1-.003 5.205m10.408 19.846a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m10.407 9.923a2.602 2.602 0 1 1 .001-5.201 2.602 2.602 0 0 1-.001 5.201M503.176 89.155a2.602 2.602 0 1 1 .001-5.201 2.602 2.602 0 0 1-.001 5.201m-10.407 9.923a2.602 2.602 0 0 1 0-5.203 2.602 2.602 0 0 1 0 5.203m10.407 0a2.602 2.602 0 1 1 .001-5.205 2.602 2.602 0 0 1-.001 5.205m-10.407-9.923a2.602 2.602 0 1 1 2.601-2.602 2.6 2.6 0 0 1-2.601 2.602m0 29.77a2.603 2.603 0 0 1-2.602-2.602 2.602 2.602 0 1 1 2.602 2.602m0 9.923a2.603 2.603 0 0 1-2.602-2.602 2.602 2.602 0 1 1 2.602 2.602m0-19.846a2.603 2.603 0 0 1-2.602-2.602 2.602 2.602 0 1 1 2.602 2.602m-10.408 9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m31.222 0a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m-10.407-9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m-20.815 0a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m20.815 9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m0 9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m10.407 0a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m-10.407 9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m0 19.846a2.602 2.602 0 1 1 .001-5.201 2.602 2.602 0 0 1-.001 5.201m0-9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m10.407-9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m0 49.615a2.602 2.602 0 1 1 .001-5.205 2.602 2.602 0 0 1-.001 5.205m10.407 19.847a2.602 2.602 0 1 1 .003-5.205 2.602 2.602 0 0 1-.003 5.205m10.408 9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m10.407 0a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602"
								transform="matrix(.51246 0 0 .51246 -128.005 -.376)"
							/>
							<path
								d="M621.186 253.184c-2.867-3.884-12.016-6.746-12.053-6.853-4.709-13.826 4.858-29.103 23.043-32.89a1.02 1.02 0 0 1 1.167 1.334c-1.363 4.081-4.368 14.726-.943 20.892 4.563 8.214.66 15.407-6.739 21.582-.312.261-3.786-3.766-4.22-7.517a54 54 0 0 1-.331-6.324 72 72 0 0 1 .298-6.318c.122-1.409.278-2.811.481-4.186.453-3.053 1.137-5.963 2.112-8.501 1.193-3.106 2.789-5.651 4.885-7.186-2.055 1.261-3.776 3.401-5.156 6.094-.778 1.518-1.443 3.21-1.995 5.015a42 42 0 0 0-1.24 5.254 44 44 0 0 0-.463 3.567 46 46 0 0 0-.167 3.592 50 50 0 0 0 .242 5.382c.138 1.385.007 2.845 1.079 7.063"
								transform="translate(-513.052 -207)"
							/>
							<path
								d="M494.452 269.483c.589-.853 7.255-12.585 6.943-20.893-3.059 18.949-18.026 30.479-21.435 32.391 0 0 5.597-10.872 4.986-21.615C474.237 309.56 436.311 305.386 424 299c0 0 15.037.885 25.146-18.976-9.611 9.007-20.714 10.065-20.714 10.065 27.834-11.204 26.602-53.333 23.559-84.122-.077-.148-30.614-22.644-40.991-44.967 11.628 28.253 37.808 46.1 37.808 46.1S435.409 216.647 426 214c-17.22-4.845-28-26-36-42 0 0 4.669 18.725 17 33-50-29.734-33-90-33-90-10.467 21.224-1.43 70.224-1.43 70.224C371.155 185.015 356 178 352 158c.58 8.792 1.231 17.507 6 26-13.036-4.563-19.999-14.556-20-25-.002-19.199 10.497-31.245 10.497-31.245S335 140.588 335 165c0 5.168-2.485 30.814-1.323 36.99-1.971-.618-4.785-8.036-4.785-8.036-3.468 26.878-4.511 77.617 8.655 89.915 0 0-11.792-9.455-16.419-30.205A154 154 0 0 0 321 260c0 24 13 36 13 36-.128.199-18.786-4.075-32.252-16.191-3.18-2.861-8.388-8.89-8.388-8.89.596 4.13 2.044 7.763 4.171 11.434-6.384-3.582-12.636-14.998-17.394-24.418-6.679-13.223-9.571-24.054-8.5-35.083 1.579-16.261 10.508-27.876 14.252-32.177-6.363 4.592-11.018 14.447-11.018 14.447-.789-6.792.362-20.81 5.371-29.158C285.562 167.097 299.878 148.4 306 140c0 0-6.774 4.973-10.952 4.862 7.825-4.879 20.429-19.029 23.002-22.994C326.322 109.117 335.28 96.36 348 89c18.962-10.972 32.971-15.759 44.981-14.367 7.539.874 13.289 5.773 27.299 4.106 8.422-1.003 19.448 3.225 27.166 7.541 17.113 9.571 28.065 25.146 37.236 42.019 5.128 9.436 8.561 19.78 11.137 30.102 3.029 12.138 11.375 42.074 24.17 47.592 0 0-7.046 1.084-14.052-3.722 1.749 5.153 3.954 10.197 6.581 14.869C517.16 225.395 520 238 516 248c-5.85 14.625-20.804 21.165-21.548 21.483m0 0q-.063.091-.028.012zM321.425 144.862c-3.427 5.311-7.564 13.865-12.14 23.287-2.475 5.096-5.08 10.442-7.783 15.661a296 296 0 0 1-4.421 8.241c-1.566 2.803-3.14 5.51-4.757 8.031a64 64 0 0 0-3.202 5.619c-2.459 4.898-4.012 9.649-4.895 14.217-1.487 7.682-1.077 14.837.058 21.321-.912-6.477-1.063-13.59.642-21.175 1.003-4.465 2.655-9.091 5.182-13.854a65 65 0 0 1 3.247-5.457 135 135 0 0 0 4.887-8.052 199 199 0 0 0 4.385-8.319c2.632-5.268 5.123-10.683 7.462-15.856 4.311-9.536 8.092-18.245 11.335-23.664m116.174-22.994a41 41 0 0 0 .075 6.167c.243 2.903.751 5.991 1.536 9.152a65.5 65.5 0 0 0 3.286 9.792 60 60 0 0 0 1.77 3.739 65 65 0 0 0 3.097 5.371 61 61 0 0 0 3.595 5.041 53 53 0 0 0 6.35 6.725c-2.115-2.147-4.052-4.547-5.834-7.109a70 70 0 0 1-3.261-5.173 81 81 0 0 1-2.821-5.413 104 104 0 0 1-1.671-3.708 103 103 0 0 1-1.535-3.766 85 85 0 0 1-1.981-5.773c-.932-3.081-1.641-6.086-2.076-8.932-.329-2.149-.515-4.198-.53-6.113m42.155 27.045c.031 2.708.46 6.158 1.173 10.122.8 4.445 1.945 9.533 3.264 14.944a530 530 0 0 0 1.654 6.59c.834 3.242 1.702 6.548 2.58 9.852.485 1.825.976 3.649 1.464 5.462.745 2.768 1.482 5.51 2.179 8.193 1.26 4.847 2.391 9.496 3.242 13.74 1.503 7.489 2.15 13.704 1.131 17.475 1.084-3.455.855-9.058-.161-15.85-.486-3.249-1.149-6.769-1.941-10.453a356 356 0 0 0-3.451-14.466 590 590 0 0 0-2.591-9.56c-1.37-4.924-2.748-9.757-3.983-14.302-2.406-8.861-4.286-16.61-4.56-21.747"
								transform="matrix(.51246 0 0 .51246 -129.197 -1.568)"
							/>
							<g className="group-hover:rotate-45 group-active:rotate-[30deg] duration-300 group-active:duration-75 ease-in-out-custom origin-[51.6%_24.4%]">
								<path
									d="M378 54c17.022 0 15.506-6.048-2-4s-22.829 13.544-24 26 10.132 60.361 22 68.846c0 0-14-36.846-14-53.846s4.479-37 18-37"
									className="fill-white dark:fill-neutral-950"
									transform="matrix(.51246 0 0 .51246 -126.696 .933)"
								/>
								<path
									d="M414 79c-2.127-10.527-20.494-31.048-38-29s-22.829 13.544-24 26 10.132 60.361 22 68.846c0 0-14-36.846-14-53.846s4.479-37 18-37c17.022 0 31.742 21.048 34.768 25.226.165.229.547.603.804.503.27-.105.487-.437.428-.729"
									transform="matrix(.51246 0 0 .51246 -129.197 -1.568)"
								/>
							</g>
						</svg>
					</div>
				</div>
				{clicks > 2 && (
					<p
						className={`absolute bottom-44 inset-x-0 text-center transition-opacity text-xs duration-300 select-none ${
							textVisible ? "opacity-100" : "opacity-0"
						}`}
					>
						{t(translationKey)}
					</p>
				)}
				<p
					className={`absolute bottom-36 -rotate-3 left-1/2 -translate-x-1/2 bg-green text-white rounded-md px-2 py-1 w-max text-xs transition-opacity duration-300 select-none ${
						counterVisible ? "opacity-100" : "opacity-0"
					}`}
				>
					{clicks}
				</p>
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
						href="https://twitter.com/npprmint"
						target="_blank"
						rel="noopener noreferrer"
						className="size-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 duration-100 active:duration-75 active:opacity-75"
					>
						<Twitter />
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
								className={`inline-flex items-center justify-center text-sm w-9 h-[27px] ${currentLocale === locale ? "text-neutral-950 dark:text-white bg-neutral-950/5 dark:bg-neutral-50/5" : "hover:bg-neutral-950/5 hover:dark:bg-neutral-50/5"} duration-100 active:duration-75 active:opacity-75 uppercase`}
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
									className={`p-1.5 ${theme === item.name ? "text-neutral-950 dark:text-white bg-neutral-950/5 dark:bg-neutral-50/5" : "hover:bg-neutral-950/5 hover:dark:bg-neutral-50/5"} duration-100 active:duration-75 active:opacity-75`}
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
