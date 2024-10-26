import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense, use } from "react";

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
import { useTranslations } from "next-intl";
import GallerySkeleton from "./gallery/gallerySkeleton";
import FanartRules from "./rules";
import Download from "src/icons/Download";
import Discord from "src/icons/Discord";
import Instagram from "src/icons/Instagram";
import ArtCreditButton from "src/components/ui/ArtCreditButton";

type Props = {
	params: Promise<{ locale: string }>;
	searchParams?: Promise<{
		p?: string;
		nsfw?: string;
		artist?: string;
	}>;
};

export async function generateMetadata(props: Props) {
	const params = await props.params;

	const { locale } = params;

	const t = await getTranslations({ locale, namespace: "MINA" });
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ p: string; nsfw: string; artist: string | undefined }>;
}) {
	const t = await getTranslations("MINA");
	const { p, nsfw, artist } = await searchParams;
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<FadingImage
					src="https://cms.pprmint.de/uploads/nano_2_261f0fd248.webp"
					alt=""
					fill
					className="object-cover object-[50%_65%]"
					quality={90}
				/>
			</Title>
			<ArtCreditButton link="https://www.instagram.com/nogonagon">
				<Instagram />
				@nogonagon
			</ArtCreditButton>
			<main>
				<section id="lore" className="my-20 md:my-32 xl:my-40 max-w-7xl mx-auto px-6 md:px-9">
					<h2>
						{t("Content.About.heading")}
						<span className="text-green">.</span>
					</h2>
					<p>{t("Content.About.text1")}</p>
					<p>{t("Content.About.text2")}</p>
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
				</section>
				<section id="design" className="mt-20 md:mt-32 xl:mt-40 max-w-7xl mx-auto px-3 xl:px-9">
					<Ref />
					<div className="flex flex-col lg:flex-row lg:justify-between gap-6 mt-6 px-3 md:px-6 xl:px-0">
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
							src={Stickers}
							alt="Discord sticker menu, showing a few Mina stickers."
							className="absolute w-5/6 sm:w-2/3 md:w-7/12 lg:w-1/2 max-w-2xl h-auto bottom-1/4 md:bottom-px left-1/2 -translate-x-1/2"
						/>
						<FadingImage
							src={StickerSeyana}
							alt=""
							className="absolute w-1/4 md:w-1/5 lg:w-2/12 max-w-72 h-auto top-[30%] left-[-4%] md:left-[4%] xl:left-[10%] animate-float-rotate-l drop-shadow-[0px_4px_20px_#111]"
							style={{ animationDelay: "0s" }}
						/>
						<FadingImage
							src={StickerCool}
							alt=""
							className="absolute w-1/4 md:w-1/5 lg:w-2/12 max-w-72 h-auto top-[6%] lg:top-0 left-[15%] md:left-[12%] xl:left-[20%] animate-float-rotate-r drop-shadow-[0px_4px_20px_#111]"
							style={{ animationDelay: "0.4s" }}
						/>
						<FadingImage
							src={StickerStare}
							alt=""
							className="absolute w-1/4 md:w-1/5 lg:w-2/12 max-w-72 h-auto top-[8%] lg:top-0 right-[15%] md:right-[12%] xl:right-[20%] animate-float-rotate-l drop-shadow-[0px_4px_20px_#111]"
							style={{ animationDelay: "0.8s" }}
						/>
						<FadingImage
							src={StickerWhat}
							alt=""
							className="absolute w-1/4 md:w-1/5 lg:w-2/12 max-w-72 h-auto top-[25%] right-[-4%] md:right-[4%] xl:right-[10%] animate-float-rotate-r drop-shadow-[0px_4px_20px_#111]"
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
					<div className="flex items-center flex-col pt-96 pb-12 text-center text-balance drop-shadow-[0px_2px_8px_#111]">
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
