"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSpring, a, easings } from "@react-spring/web";

import Button from "src/components/ui/Button";

import DetectiveMina from "public/assets/404/mina_chibi.webp";
import { useState } from "react";
import Home from "src/icons/Home";

export default function NotFound() {
	const t = useTranslations("404");
	// Animations
	const inFromBottom = useSpring({
		from: {
			y: 100,
			clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
			opacity: 0,
		},
		to: {
			y: 0,
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			opacity: 1,
		},
		delay: 1650,
		config: {
			easing: easings.easeOutExpo,
			duration: 1000,
		},
	});
	const fadeIn = useSpring({
		from: { opacity: 0 },
		to: { opacity: 0.75 },
		config: {
			duration: 300,
		},
	});
	const [countFinished, setCountFinished] = useState(false);
	const countUp = useSpring({
		from: { val: 100 },
		to: { val: 404 },
		config: {
			tension: 150,
			friction: 40,
		},
		onRest: () => setCountFinished(true),
	});
	const ripple = useSpring({
		from: { opacity: 0.75, scale: 0 },
		to: { opacity: 0, scale: 1.5 },
		delay: 1650,
		config: {
			mass: 3,
			friction: 100,
		},
	});

	return (
		<main className="relative w-screen h-screen overflow-clip">
			{/* @ts-expect-error */}
			<a.div className="absolute inset-0" style={{ ...fadeIn }}>
				{/* @ts-expect-error */}
				<a.div
					className={`absolute top-1/2 translate-y-[-47%] ${
						countFinished ? "text-neutral-800" : "text-green dark:text-green-800"
					} font-digits blur-sm lg:blur-lg w-full text-center -skew-y-6 duration-500`}
					style={{ fontSize: "50vw" }}
				>
					{countUp.val.to((val) => Math.floor(val))}
				</a.div>
				<div className="absolute flex items-center justify-center top-0 left-0 w-screen h-screen">
					{/* @ts-expect-error */}
					<a.div style={{ ...ripple }} className="bg-green dark:bg-green-800 aspect-square h-screen md:h-auto md:w-screen rounded-full" />
				</div>
				<div
					className="absolute w-full h-full top-0 left-0 light:invert light:brightness-[0.33]"
					style={{
						backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><path d="M0 10V0h10a2 2 0 0 0 4 0h10v10a2 2 0 0 0 0 4v10H14a2 2 0 0 0-4 0H0V14a2 2 0 0 0 0-4Z" style="fill:%23111111"/></svg>')`,
						backgroundRepeat: "repeat",
					}}
				/>
			</a.div>
			{/* @ts-expect-error */}
			<a.div
				className="z-10 flex flex-col md:flex-row-reverse justify-center items-center gap-3 md:gap-6 h-full px-6 md:px-9"
				style={{ ...inFromBottom }}
			>
				<Image src={DetectiveMina} alt="Detective Mina chibi art, drawn by Layer." className="w-40 md:w-72 lg:w-80" priority />
				<div>
					<div className="flex flex-col items-center md:items-start md:flex-grow text-center md:text-left h-max">
						<div className="pb-6">
							<h1>
								{t("Content.title")}
								<span className="text-green">.</span>
							</h1>
							<p className="md:text-lg">{t("Content.info")}</p>
						</div>
						<Link href="/" className="w-fit">
							<Button color="green">
								Go to home page
								<Home />
							</Button>
						</Link>
					</div>
					<p className="md:absolute pt-6 bottom-3 md:bottom-5 left-0 right-0 text-xs text-center">
						{t.rich("Content.credit", {
							Link: (chunks) => (
								<Link href="https://twitter.com/DIVAOFDESPAlR" target="_blank" className="text-link-external">
									{chunks}
								</Link>
							),
						})}
					</p>
				</div>
			</a.div>
		</main>
	);
}
