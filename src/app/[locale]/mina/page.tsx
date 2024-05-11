import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";

import Ref from "./ref";

import TitleMina from "public/assets/mina/title.webp";
import Stickers from "public/assets/mina/stickers.svg";
import StickerSeyana from "public/assets/mina/sticker_seyana.webp";
import StickerStare from "public/assets/mina/sticker_stare.webp";
import StickerWhat from "public/assets/mina/sticker_what.webp";
import StickerYippie from "public/assets/mina/sticker_yippie.webp";

import { Link } from "src/navigation";
import Button from "src/components/ui/Button";
import GallerySuspense from "./gallery/gallerySuspense";
import { useTranslations } from "next-intl";
import GallerySkeleton from "./gallery/gallerySkeleton";
import FanartRules from "./rules";
import Download from "src/icons/Download";
import Discord from "src/icons/Discord";
import Twitter from "src/icons/Twitter";

type Props = {
	params: { locale: string };
	searchParams?: {
		p?: string;
		nsfw?: string;
		artist?: string;
	};
};

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "MINA" });
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page({ searchParams, params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const t = useTranslations("MINA");
	const currentPage = Number(searchParams?.p) || 1;
	const nsfw = String(searchParams?.nsfw) || "hide";
	const artist = String(searchParams?.artist) || "undefined";
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<div className="relative w-screen h-screen max-h-svh">
					<p
						className="absolute right-0 top-1/2 -translate-y-1/2 z-100 px-1 py-2 rounded-l-md text-xs text-neutral-50 bg-neutral-950/75 backdrop-blur-md"
						style={{ writingMode: "vertical-rl" }}
					>
						<Twitter className="inline fill-blue rotate-90" /> @108sketches
					</p>
					<FadingImage src={TitleMina} alt="" fill className="object-cover object-top" quality={90} />
				</div>
			</Title>
			<main>
				<section
					id="gallery"
					className="mb-20 md:mb-28 xl:mb-32 pt-20 md:pt-28 xl:pt-32 max-w-7xl mx-auto px-3 xl:px-9"
				>
					<Suspense fallback={<GallerySkeleton />}>
						<GallerySuspense p={currentPage} artist={artist} nsfw={nsfw} />
					</Suspense>
				</section>
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
				<section id="design" className="my-20 md:my-32 xl:my-40 max-w-7xl mx-auto px-3 xl:px-9">
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
								href="https://static.pprmint.art/download/Mina/Mina_ref_sheet_(by_nekomimi).png"
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
				<FanartRules />
				<section className="relative flex items-end justify-center overflow-clip my-20 md:my-32 xl:my-40 max-w-screen-3xl mx-auto px-6 md:px-9 min-h-[500px]">
					<div className="absolute inset-0 -z-10 overflow-clip">
						<FadingImage
							src={Stickers}
							alt="Discord sticker menu, showing a few Mina stickers."
							className="absolute w-4/5 md:w-1/2 xl:w-1/3 h-auto top-0 left-1/2 -translate-x-1/2"
						/>
						<FadingImage
							src={StickerSeyana}
							alt=""
							className="hidden md:block absolute w-2/12 max-w-72 h-auto top-[30%] left-[4%] rotate-3"
						/>
						<FadingImage
							src={StickerWhat}
							alt=""
							className="hidden md:block absolute w-2/12 max-w-72 h-auto top-[6%] left-[12%] xl:left-[18%] -rotate-6"
						/>
						<FadingImage
							src={StickerStare}
							alt=""
							className="hidden md:block absolute w-2/12 max-w-72 h-auto top-[8%] right-[12%] xl:right-[18%] rotate-6"
						/>
						<FadingImage
							src={StickerYippie}
							alt=""
							className="hidden md:block absolute w-2/12 max-w-72 h-auto top-[25%] right-[4%] -rotate-3"
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
