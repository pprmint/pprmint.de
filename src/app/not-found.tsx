"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import * as m from "motion/react-client";
import { useSpring, a, easings } from "@react-spring/web";

import Button from "src/components/ui/Button";

import DetectiveMina from "public/assets/404/mina_chibi.webp";
import { useState } from "react";
import Home from "src/icons/Home";

export default function NotFound() {
	const t = useTranslations("404");
	return (
		<main className="relative w-screen h-screen overflow-clip">
			<video
				src="https://static.pprmint.de/uploads/wavy_ff6ca718a6.webm"
				className="absolute inset -z-10 object-fill w-full h-full light:invert opacity-10"
				loop
				autoPlay
				muted
				playsInline
			/>
			<div className="absolute inset-0 -z-10 dark:bg-black dark:mix-blend-multiply">
				<m.div
					className="absolute top-1/2 translate-y-[-52%] italic w-full font-bold font-expanded text-center -rotate-12 text-white light:text-neutral-900"
					style={{ fontSize: "60vw" }}
				>
					404
				</m.div>
			</div>
			<div className="absolute inset-0 -z-10 dark:bg-neutral-950 dark:mix-blend-lighten" />
			<div className="z-10 flex flex-col md:flex-row-reverse justify-center items-center gap-3 md:gap-6 h-full px-6 md:px-9">
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
			</div>
		</main>
	);
}
