import { Viewport } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";

import { Link } from "src/navigation";
import Button from "src/components/ui/Button";

import TitleBg from "public/assets/triangles/triangles.svg";
import Monitor from "public/assets/triangles/Monitor.svg";
import CountUp from "./countUp";
import Time from "./time";
import Download from "src/icons/Download";

type Props = {
	params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "MINTTRIANGLES" });
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export const viewport: Viewport = {
	themeColor: "#ee66cc",
};

export default function Page({ params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const t = useTranslations("MINTTRIANGLES");
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")} accentColor="text-pink">
				<div className="relative w-screen h-screen max-h-svh">
					<FadingImage src={TitleBg} alt="" fill className="object-cover object-center opacity-50 z-0" />
					<CountUp />
				</div>
			</Title>
			<main className="max-w-7xl mx-auto px-6 md:px-9">
				<section className="my-20 md:my-32 xl:my-40 text-center">
					<h2>
						{t("Content.Intro.heading")}
						<span className="text-pink">.</span>
					</h2>
					<p>
						{t.rich("Content.Intro.text1", {
							Link: (chunks) => (
								<Link href="https://youtu.be/7MYYjseY-Do?t=31" target="_blank" rel="noopener noreferrer" className="text-link-external">
									{chunks}
								</Link>
							),
						})}
					</p>
					<div className="relative mb-12">
						<FadingImage src={Monitor} alt="" />
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
							<span className="font-minttriangles text-neutral-50/10" aria-hidden>
								**:**:**
							</span>
							<Time />
						</div>
					</div>
					<p>{t("Content.Intro.text2")}</p>
					<p>{t("Content.Intro.text3")}</p>
				</section>
				<section className="my-20 md:grid grid-cols-2 gap-6 items-center">
					<div>
						<h2>
							{t("Content.Wireframe.heading")}
							<span className="text-pink">.</span>
						</h2>
						<p>
							{t.rich("Content.Wireframe.text", {
								key: (chunks) => (
									<span className="px-1 text-neutral-50 bg-gradient-to-b from-neutral-800 to-neutral-900 border border-b-4 border-neutral-800 rounded-sm">
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
				<section className="my-20 md:grid grid-cols-2 gap-6 items-center">
					<div>
						<h2>
							{t("Content.Punctuation.heading")}
							<span className="text-pink">.</span>
						</h2>
						<p>{t("Content.Punctuation.text")}</p>
					</div>
					<video autoPlay muted playsInline loop src="/assets/triangles/Special1.mp4" />
				</section>
				<section className="my-20 md:grid grid-cols-2 gap-6 items-center">
					<div>
						<h2>
							{t("Content.Special.heading")}
							<span className="text-pink">.</span>
						</h2>
						<p>{t("Content.Special.text")}</p>
					</div>
					<video autoPlay muted playsInline loop src="/assets/triangles/Special2.mp4" />
				</section>
				<section className="my-20 md:my-32 xl:my-40">
					<h2>
						{t("Content.Download.heading")}
						<span className="text-pink">.</span>
					</h2>
					<p className="pb-6">{t("Content.Download.text")}</p>
					<Link href="https://static.pprmint.de/download/mint_triangles_1.0.zip" download>
						<Button color="pink" tabIndex={-1}>
							<Download />
							{t("Content.Download.button")}
						</Button>
					</Link>
				</section>
			</main>
		</>
	);
}
