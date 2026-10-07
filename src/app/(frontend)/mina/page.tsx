import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import FadingImage from "@/components/ui/FadingImage";

import Ref from "./ref";

import Link from "next/link";
import Button from "@/components/ui/Button";
import GallerySuspense from "./gallery/gallerySuspense";
import GallerySkeleton from "./gallery/gallerySkeleton";
import Download from "@/icons/Download";
import Discord from "@/icons/Discord";
import WarningCircle from "@/icons/WarningCircle";
import OutfitRowSuspense from "./outfitRow/outfitRowSuspense";
import OutfitRowSkeleton from "./outfitRow/outfitRowSkeleton";
import MinaTitle from "./minaTitle";
import Marquee from "react-fast-marquee";
import { GalleryTransitionProvider } from "@/components/gallery/GalleryTransitionContext";

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
	searchParams: Promise<{
		p: string;
		nsfw: string;
		refs: string;
		artist: string;
		outfit: string;
	}>;
}) {
	const t = await getTranslations("MINA");
	const { p = "1", nsfw, refs, artist = "undefined", outfit = "undefined" } = await searchParams;
	return (
		<>
			<MinaTitle />
			<main>
				<section id="lore" className="w-full max-w-8xl sm:px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
					<div className="w-full lg:grid grid-cols-2 sm:sm:border-x border-black/5 dark:border-white/5">
						<div className="md:border-r border-black/5 dark:border-white/5 pt-9 md:pt-20 xl:py-40 px-6 lg:px-9">
							<h2>
								{t("Content.About.heading")}
								<span className="text-green">.</span>
							</h2>
							<p>{t("Content.About.text1")}</p>
							<p>{t("Content.About.text2")}</p>
						</div>
						<div className="pt-3 lg:pt-35 xl:pt-55 pb-20 lg:pb-32 xl:pb-40 px-6 lg:px-9">
							<p>{t("Content.About.text3")}</p>
							<p>{t("Content.About.text4")}</p>
							<p>{t("Content.About.text5")}</p>
							<p>
								{t.rich("Content.About.text6", {
									Link: (chunks) => (
										<Link
											href="https://www.instagram.com/mattzurix/"
											className="text-link-external"
											target="_blank"
											rel="noopener noreferrer"
										>
											{chunks}
										</Link>
									),
								})}
							</p>
						</div>
					</div>
				</section>
				<GalleryTransitionProvider>
					<section id="gallery" className="w-full max-w-8xl sm:px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
						<Suspense fallback={<GallerySkeleton />}>
							<GallerySuspense p={parseInt(p)} artist={artist} outfit={outfit} nsfw={nsfw} refs={refs} />
						</Suspense>
					</section>
				</GalleryTransitionProvider>
				<section id="outfits" className="w-full max-w-8xl sm:px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
					<Suspense fallback={<OutfitRowSkeleton />}>
						<OutfitRowSuspense />
					</Suspense>
				</section>
				<section id="rules" className="w-full max-w-8xl sm:px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
					<div className="w-full sm:border-x border-black/5 dark:border-white/5 py-20 lg:py-32 xl:py-40 px-6 xl:px-9 xl:text-center xl:text-balance">
						<h2>
							{t("Content.Fanart.heading")}
							<span className="text-green">.</span>
						</h2>
						<p>{t("Content.Fanart.text1")}</p>
						<p>{t("Content.Fanart.text2")}</p>
						<p>{t("Content.Fanart.text3")}</p>
						<div className="px-1 py-0.5 max-w-max xl:mx-auto bg-black/5 dark:bg-white/5 hover:bg-red-50 dark:hover:bg-red-950 text-transparent hover:text-red-800 dark:hover:text-red-200 duration-100 select-none hover:select-text">
							{t("Content.Fanart.text4")}
						</div>
						<p className="text-xs text-neutral-950/25 dark:text-white/25 pt-1">{t("Content.Fanart.text5")}</p>
					</div>
				</section>
				<section id="design" className="w-full max-w-8xl sm:px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
					<div className="w-full md:flex items-center gap-3 px-3 py-2.5 border-x bg-yellow-50 dark:bg-yellow-950 border-yellow-100 dark:border-yellow-900 text-neutral-950 dark:text-white">
						<div className="my-1 text-yellow">
							<WarningCircle />
						</div>
						<div>
							<p className="text-sm md:text-base">{t("Content.Reference.outdated")}</p>
						</div>
					</div>
					<Ref />
					<div className="w-full sm:border-x border-black/5 dark:border-white/5 flex flex-col lg:flex-row lg:justify-between gap-6 p-6 pb-32">
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
							<Link href="/api/download/file/mina_ref_sheet_by_nekomimi.png" target="_blank" download className="w-fit">
								<Button tabIndex={-1} design="semi-transparent">
									{t("Content.Reference.Download.button")}
									<Download />
								</Button>
							</Link>
						</div>
					</div>
				</section>
				<section className="max-w-8xl mx-auto sm:px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="relative z-10 sm:border-x border-black/5 dark:border-white/5 w-full max-w-8xl mx-auto pb-12 text-center text-balance">
						<h2>
							{t("Content.Discord.heading")}
							<span className="text-green">.</span>
						</h2>
						<p className="xl:text-xl 2xl:text-2xl">{t("Content.Discord.text")}</p>
						<div
							className="relative"
							style={{
								maskImage:
									"linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
								maskRepeat: "space",
							}}
						>
							<Marquee
								style={{
									width: "100%",
									height: "192px",
								}}
								speed={50}
								gradient={false}
							>
								{[
									{
										src: "/api/artwork/file/layer_7357caa912.webp",
										width: 450,
										height: 450,
									},
									{
										src: "/api/artwork/file/kozu_ac03f294d7.webp",
										width: 860,
										height: 860,
									},
									{
										src: "/api/artwork/file/layer_59e6aeea93.webp",
										width: 2665,
										height: 2667,
									},
									{
										src: "/api/artwork/file/kozu_44b2ad049f.webp",
										width: 1149,
										height: 1153,
									},
									{
										src: "/api/artwork/file/layer_f77e8aee0a.webp",
										width: 517,
										height: 495,
									},
									{
										src: "/api/artwork/file/kozu_7a45be345b.png",
										width: 500,
										height: 500,
									},
									{
										src: "/api/artwork/file/kozu_462be95092.webp",
										width: 878,
										height: 878,
									},
									{
										src: "/api/artwork/file/layer_0f92700373.webp",
										width: 475,
										height: 510,
									},
									{
										src: "/api/artwork/file/kozu_4e6dbeb579.webp",
										width: 353,
										height: 353,
									},
									{
										src: "/api/artwork/file/layer_aadda267e1.webp",
										width: 681,
										height: 611,
									},
									{
										src: "/api/artwork/file/mofu_a349bda49e.png",
										width: 1032,
										height: 1160,
									},
									{
										src: "/api/artwork/file/kozu_5a422adf3c.webp",
										width: 926,
										height: 926,
									},
								].map((sticker) => (
									<FadingImage
										key={sticker.src}
										hideSpinner
										src={sticker.src}
										width={sticker.width}
										height={sticker.height}
										alt=""
										className="h-38 w-auto mx-3"
									/>
								))}
							</Marquee>
						</div>
						<div className="w-full border-y border-black/5 dark:border-white/5">
							<div className="flex justify-center">
								<Link href="/mina">
									<Button noInitialPadding size="large" color="green">
										<Discord />
										{t("Content.Discord.button")}
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
