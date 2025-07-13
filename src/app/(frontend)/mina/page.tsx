import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import Title from "@/components/layout/Title";
import FadingImage from "@/components/ui/FadingImage";

import Ref from "./ref";

import Stickers from "/public/assets/mina/stickers.svg";
import StickerSeyana from "/public/assets/mina/sticker_seyana.webp";
import StickerStare from "/public/assets/mina/sticker_stare.webp";
import StickerWhat from "/public/assets/mina/sticker_what.webp";
import StickerCool from "/public/assets/mina/sticker_cool.png";

import Link from "next/link";
import Button from "@/components/ui/Button";
import GallerySuspense from "./gallery/gallerySuspense";
import GallerySkeleton from "./gallery/gallerySkeleton";
import Download from "@/icons/Download";
import Discord from "@/icons/Discord";
import WarningCircle from "@/icons/WarningCircle";
import OutfitRowSuspense from "./outfitRow/outfitRowSuspense";

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
	searchParams: Promise<{ p: string; nsfw: string; refs: string; artist: string; outfit: string }>;
}) {
	const t = await getTranslations("MINA");
	const { p = "1", nsfw, refs, artist = "undefined", outfit = "undefined" } = await searchParams;
	return (
		<>
			<Title
				title={t("Head.title")}
				description={t("Head.description")}
				creditName="wasonz"
				creditLink="https://x.com/wxsonz"
			>
				<div className="relative h-full bg-neutral-950">
					<div className="absolute bg-gradient-to-bl from-blue-900 via-[#151515] to-[#151515] w-full max-w-8xl inset-y-0 pt-9 md:pt-0 px-9 md:px-12 lg:px-24 xl:px-32 left-1/2 -translate-x-1/2">
						<div
							style={{ background: "url(/assets/noise.png)" }}
							className="absolute inset-0 opacity-20 mix-blend-multiply"
						/>
						<FadingImage
							src="/api/artwork/file/wxz_original_transparent-1.webp"
							alt=""
							width={2000}
							height={3783}
							className="relative sm:absolute sm:right-16 h-full w-auto sm:w-[40%] xl:w-2/3 sm:h-auto max-w-5xl ml-auto"
						/>
					</div>
				</div>
			</Title>
			<main>
				<section id="lore" className="w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
					<div className="w-full md:grid grid-cols-2 border-x border-black/5 dark:border-white/5">
						<div className="md:border-r border-black/5 dark:border-white/5 py-12 lg:py-20 xl:py-40 md:pr-12">
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
				<section id="gallery" className="w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
					<Suspense fallback={<GallerySkeleton />}>
						<GallerySuspense p={parseInt(p)} artist={artist} outfit={outfit} nsfw={nsfw} refs={refs} />
					</Suspense>
				</section>
				<section id="outfits" className="w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
					<Suspense>
						<OutfitRowSuspense />
					</Suspense>
				</section>
				<section id="rules" className="w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
					<div className="w-full border-x border-black/5 dark:border-white/5 py-12 lg:py-20 xl:py-40">
						<h2>
							{t("Content.Fanart.heading")}
							<span className="text-green">.</span>
						</h2>
						<p>{t("Content.Fanart.text1")}</p>
						<p>{t("Content.Fanart.text2")}</p>
						<p>{t("Content.Fanart.text3")}</p>
						<div className="px-1 py-0.5 max-w-max bg-black/5 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-950 text-transparent hover:text-red-800 dark:hover:text-red-200 duration-100 select-none hover:select-text">
							{t("Content.Fanart.text4")}
						</div>
						<p className="text-xs text-neutral-950/25 dark:text-white/25 pt-1">
							{t("Content.Fanart.text5")}
						</p>
					</div>
				</section>
				<section id="design" className="w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
					<div className="w-full md:flex items-center gap-3 px-3 py-2.5 border-x bg-yellow-50 dark:bg-yellow-950 border-yellow-100 dark:border-yellow-900 text-neutral-950 dark:text-white">
						<div className="my-1 text-yellow">
							<WarningCircle />
						</div>
						<div>
							<p className="text-sm md:text-base">{t("Content.Reference.outdated")}</p>
						</div>
					</div>
					<Ref />
					<div className="w-full border-x border-black/5 dark:border-white/5 flex flex-col lg:flex-row lg:justify-between gap-6 pt-6 pb-32">
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
								href="/api/download/file/mina_ref_sheet_by_nekomimi.png"
								target="_blank"
								download
								className="w-fit"
							>
								<Button tabIndex={-1} design="semi-transparent">
									{t("Content.Reference.Download.button")}
									<Download />
								</Button>
							</Link>
						</div>
					</div>
				</section>
				<section className="relative flex items-end justify-center max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20 min-h-[400px] overflow-clip">
					<div className="absolute inset-0 mt-10">
						<FadingImage
							hideSpinner
							src={Stickers}
							alt="Discord sticker menu, showing a few Mina stickers."
							className="absolute w-5/6 sm:w-2/3 md:w-7/12 lg:w-1/2 max-w-2xl h-auto top-0 left-1/2 -translate-x-1/2"
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
						<div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-950" />
					</div>
					<div className="relative z-10 border-x border-black/5 dark:border-white/5 w-full max-w-8xl mx-auto flex items-center flex-col pt-96 pb-12 text-center text-balance dark:drop-shadow-[0px_2px_8px_#111]">
						<h2>
							{t("Content.Discord.heading")}
							<span className="text-green">.</span>
						</h2>
						<p className="pb-6">{t("Content.Discord.text")}</p>
						<Link href="https://discord.gg/nTbPhkvrXp" target="_blank" rel="noopener noreferrer">
							<Button color="green" design="filled">
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
