import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";

import Ref from "./ref";

import Stickers from "public/assets/mina/stickers.svg";
import StickerSeyana from "public/assets/mina/sticker_seyana.webp";
import StickerStare from "public/assets/mina/sticker_stare.webp";
import StickerWhat from "public/assets/mina/sticker_what.webp";
import StickerCool from "public/assets/mina/sticker_cool.png";

import Link from "next/link";
import Button from "src/components/ui/Button";
import GallerySuspense from "./gallery/gallerySuspense";
import GallerySkeleton from "./gallery/gallerySkeleton";
import FanartRules from "./rules";
import Download from "src/icons/Download";
import Discord from "src/icons/Discord";

export async function generateMetadata() {
	const t = await getTranslations("MINA");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ p: string; nsfw: string; artist: string }>;
}) {
	const t = await getTranslations("MINA");
	const { p = "1", nsfw, artist = "undefined" } = await searchParams;
	return (
		<>
			<Title
				title={t("Head.title")}
				description={t("Head.description")}
				creditName="sunnexo"
				creditLink="https://sunnexo.moe"
			>
				<div className="h-full bg-[#80d5c5] flex items-end justify-end">
					<FadingImage
						src="https://cms.pprmint.de/uploads/sunnexo_1a_774524ebbf.png"
						alt=""
						width={1280}
						height={1280}
						unoptimized
						className="h-2/3 md:h-3/4 lg:h-full w-auto md:mr-12 lg:mr-24 xl:mr-32"
					/>
				</div>
			</Title>
			<main>
				<section id="lore" className="w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
					<div className="w-full md:grid grid-cols-2 border-x border-white/5 light:border-black/5">
						<div className="border-r border-neutral-50/5 pt-12 lg:pt-20 xl:pt-40 md:pr-12">
							<h2>
								{t("Content.About.heading")}
								<span className="text-green">.</span>
							</h2>
							<p>{t("Content.About.text1")}</p>
							<p>{t("Content.About.text2")}</p>
						</div>
						<div className="pt-3 md:pt-[6.25rem] lg:pt-[8.75rem] xl:pt-[13.75rem] pb-12 lg:pb-20 xl:pb-40 md:pr-12">
							<p>{t("Content.About.text3")}</p>
							<p>{t("Content.About.text4")}</p>
							<p>{t("Content.About.text5")}</p>
							<p>
								{t.rich("Content.About.text6", {
									Link: (chunks) => (
										<Link href="https://twitter.com/wxsonz" className="text-link-external">
											{chunks}
										</Link>
									),
								})}
							</p>
						</div>
					</div>
				</section>
				<section id="design" className="w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
					<Ref />
					<div className="w-full border-x border-neutral-50/5 flex flex-col lg:flex-row lg:justify-between gap-6 pt-6 px-3 md:px-6 xl:px-0">
						<p>
							{t.rich("Content.Reference.credit", {
								Link: (chunks) => (
									<Link href="https://twitter.com/neko__draws" className="text-link-external">
										{chunks}
									</Link>
								),
							})}
						</p>
						<div className="flex flex-col lg:items-end">
							<p className="mb-3">{t("Content.Reference.Download.text")}</p>
							<Link
								href="https://static.pprmint.de/download/Mina/Mina_ref_sheet_(by_nekomimi).png"
								target="_blank"
								download
							>
								<Button tabIndex={-1}>
									{t("Content.Reference.Download.button")}
									<Download />
								</Button>
							</Link>
						</div>
					</div>
				</section>
				<section
					id="gallery"
					className="pt-20 md:pt-32 xl:pt-40 mb-20 md:mb-32 xl:mb-40 max-w-7xl mx-auto md:px-3 xl:px-9"
				>
					<Suspense fallback={<GallerySkeleton />}>
						<GallerySuspense p={parseInt(p)} artist={artist} nsfw={nsfw} />
					</Suspense>
				</section>
				<FanartRules />
				<section className="relative flex items-end justify-center my-20 md:my-32 xl:my-40 xl:pt-10 max-w-screen-3xl mx-auto px-6 md:px-9 min-h-[500px] overflow-x-clip">
					<div className="absolute inset-0 -z-10">
						<FadingImage
							hideSpinner
							src={Stickers}
							alt="Discord sticker menu, showing a few Mina stickers."
							className="absolute w-5/6 sm:w-2/3 md:w-7/12 lg:w-1/2 max-w-2xl h-auto bottom-1/4 md:bottom-px left-1/2 -translate-x-1/2"
						/>
						<FadingImage
							hideSpinner
							src={StickerSeyana}
							alt=""
							className="absolute w-1/4 md:w-1/5 lg:w-2/12 max-w-72 h-auto top-[30%] left-[-4%] md:left-[4%] xl:left-[10%] animate-float-rotate-l drop-shadow-2xl dark:drop-shadow-[0px_4px_20px_#111]"
							style={{ animationDelay: "0s" }}
						/>
						<FadingImage
							hideSpinner
							src={StickerCool}
							alt=""
							className="absolute w-1/4 md:w-1/5 lg:w-2/12 max-w-72 h-auto top-[6%] lg:top-0 left-[15%] md:left-[12%] xl:left-[20%] animate-float-rotate-r drop-shadow-2xl dark:drop-shadow-[0px_4px_20px_#111]"
							style={{ animationDelay: "0.4s" }}
						/>
						<FadingImage
							hideSpinner
							src={StickerStare}
							alt=""
							className="absolute w-1/4 md:w-1/5 lg:w-2/12 max-w-72 h-auto top-[8%] lg:top-0 right-[15%] md:right-[12%] xl:right-[20%] animate-float-rotate-l drop-shadow-2xl dark:drop-shadow-[0px_4px_20px_#111]"
							style={{ animationDelay: "0.8s" }}
						/>
						<FadingImage
							hideSpinner
							src={StickerWhat}
							alt=""
							className="absolute w-1/4 md:w-1/5 lg:w-2/12 max-w-72 h-auto top-[25%] right-[-4%] md:right-[4%] xl:right-[10%] animate-float-rotate-r drop-shadow-2xl dark:drop-shadow-[0px_4px_20px_#111]"
							style={{ animationDelay: "1.2s" }}
						/>
						<div
							style={{
								maskImage:
									"linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 80%, rgba(0,0,0,1) 100%)",
								maskRepeat: "space",
								backgroundRepeat: "repeat",
							}}
							className="absolute inset-0 bottom-0 h-full backdrop-blur-md pointer-events-none"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-neutral-950" />
					</div>
					<div className="flex items-center flex-col pt-96 pb-12 text-center text-balance dark:drop-shadow-[0px_2px_8px_#111]">
						<h2>
							{t("Content.Discord.heading")}
							<span className="text-green">.</span>
						</h2>
						<p className="pb-6">{t("Content.Discord.text")}</p>
						<Link href="https://discord.gg/nTbPhkvrXp" target="_blank" rel="noopener noreferrer">
							<Button color="green">
								<Discord />
								{t("Content.Discord.button")}
							</Button>
						</Link>
					</div>
				</section>
			</main>
		</>
	);
}
