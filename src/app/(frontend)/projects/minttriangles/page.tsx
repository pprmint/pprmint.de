import { Viewport } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import Title from "@/components/layout/Title";
import FadingImage from "@/components/ui/FadingImage";

import Link from "next/link";
import Button from "@/components/ui/Button";

import TitleBg from "/public/assets/triangles/triangles.svg";
import Monitor from "/public/assets/triangles/Monitor.svg";
import CountUp from "./countUp";
import Time from "./time";
import Download from "@/icons/Download";

export async function generateMetadata() {
	const t = await getTranslations("MINTTRIANGLES");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export const viewport: Viewport = {
	themeColor: "#ee66cc",
};

export default async function Page() {
	const locale = await getLocale();
	const t = await getTranslations("MINTTRIANGLES");
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<div className="w-screen h-full bg-neutral-50 dark:bg-neutral-950">
					<FadingImage src={TitleBg} alt="" fill className="object-cover object-center opacity-50" />
					<CountUp />
				</div>
			</Title>
			<main className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
				<section className="py-20 md:py-32 xl:py-40 text-center border-x border-b border-black/5 dark:border-white/5">
					<h2>
						{t("Content.Intro.heading")}
						<span className="text-pink">.</span>
					</h2>
					<p>
						{t.rich("Content.Intro.text1", {
							Link: (chunks) => (
								<Link
									href="https://youtu.be/7MYYjseY-Do?t=31"
									target="_blank"
									rel="noopener noreferrer"
									className="text-link-external"
								>
									{chunks}
								</Link>
							),
						})}
					</p>
					<div className="relative mb-12 max-w-7xl mx-auto">
						<FadingImage src={Monitor} alt="" />
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
							<span className="font-minttriangles text-white/10" aria-hidden>
								**:**:**
							</span>
							<Time />
						</div>
					</div>
					<p>{t("Content.Intro.text2")}</p>
					<p>{t("Content.Intro.text3")}</p>
				</section>
				<section className="lg:grid grid-cols-2 items-center border-x border-black/5 dark:border-white/5">
					<div className="md:order-1 pt-20 pb-6 lg:py-0 lg:pl-20 lg:text-right">
						<h2>
							{t("Content.Wireframe.heading")}
							<span className="text-pink">.</span>
						</h2>
						<p>
							{t.rich("Content.Wireframe.text", {
								key: (chunks) => (
									<span className="px-1 text-neutral-950 dark:text-white bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900 border border-b-4 border-neutral-100 dark:border-neutral-800 rounded-sm">
										{chunks}
									</span>
								),
							})}
						</p>
					</div>
					<video
						autoPlay
						muted
						playsInline
						loop
						src={locale == "de" ? "/assets/triangles/KeysQWERTZ.mp4" : "/assets/triangles/KeysQWERTY.mp4"}
					/>
				</section>
				<section className="lg:grid grid-cols-2 items-center border-x border-black/5 dark:border-white/5">
					<div className="pt-20 pb-6 lg:py-0 lg:pr-20">
						<h2>
							{t("Content.Punctuation.heading")}
							<span className="text-pink">.</span>
						</h2>
						<p>{t("Content.Punctuation.text")}</p>
					</div>
					<video autoPlay muted playsInline loop src="/assets/triangles/Special1.mp4" />
				</section>
				<section className="lg:grid grid-cols-2 items-center border-x border-black/5 dark:border-white/5">
					<div className="md:order-1 pt-20 pb-6 lg:py-0 lg:pl-20 lg:text-right">
						<h2>
							{t("Content.Special.heading")}
							<span className="text-pink">.</span>
						</h2>
						<p>{t("Content.Special.text")}</p>
					</div>
					<video autoPlay muted playsInline loop src="/assets/triangles/Special2.mp4" />
				</section>
				<section className="text-center border-x border-t border-black/5 dark:border-white/5 pt-20 md:pt-32 xl:pt-40">
					<h2>
						{t("Content.Download.heading")}
						<span className="text-pink">.</span>
					</h2>
					<p className="pb-6">{t("Content.Download.text")}</p>
					<Link className="flex w-max mx-auto" href="/api/download/file/mint_triangles_1.0.zip" download>
						<Button color="pink" tabIndex={-1} design="filled">
							<Download />
							{t("Content.Download.button")}
						</Button>
					</Link>
				</section>
			</main>
		</>
	);
}
