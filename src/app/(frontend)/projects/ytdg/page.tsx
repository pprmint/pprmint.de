import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import Title from "@/components/layout/Title";
import Hero from "/public/assets/ytdg/hero.png";
import FadingImage from "@/components/ui/FadingImage";
import Button from "@/components/ui/Button";

import IsometricScreenshot from "/public/assets/ytdg/screenshot_dark_iso.webp";
import Check from "@/icons/Check";
import ExternalLink from "@/icons/ExternalLink";

export async function generateMetadata() {
    const t = await getTranslations("YTDG");
    return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
    const t = useTranslations();
    return (
		<>
			<Title title={t("YTDG.Head.title")} description={t("YTDG.Head.description")}>
				<FadingImage src={Hero} alt="" fill className="object-cover" quality={90} />
			</Title>
			<main className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
				<section className="relative flex items-center pb-48 xl:pb-0 border-x border-black/5">
					<div className="py-20 md:py-32 xl:py-40 w-full z-10">
						<div className="w-full max-w-xl 2xl:max-w-3xl">
							<h2>{t("YTDG.Content.About.heading")}</h2>
							<p>{t("YTDG.Content.About.text1")}</p>
							<p>
								{t.rich("YTDG.Content.About.text2", {
									Link: (chunks) => (
										<Link
											href="https://github.com/yt-dlp/yt-dlp"
											className="text-link-external"
											target="_blank"
											rel="noopener noreferrer"
										>
											{chunks}
										</Link>
									),
								})}
							</p>
							<p>{t("YTDG.Content.About.text3")}</p>
							<p>{t("YTDG.Content.About.text4")}</p>
						</div>
					</div>
					<Image
						src={IsometricScreenshot}
						title="inabakumori - Relayouter"
						alt=""
						className="absolute bottom-0 right-0 object-contain opacity-50 max-h-full w-5/6 md:w-2/3 lg:w-1/2 p-6 md:p-12"
						quality={90}
					/>
				</section>
				<section className="border-x border-black/5 dark:border-white/5">
					<h2>{t("YTDG.Content.Roadmap.heading")}<span className="text-violet">.</span></h2>
					<div className="flex flex-col pl-3 md:pl-6">
						<div className="flex gap-3 md:gap-6">
							<div className="flex flex-col">
								<Check className="size-6 bg-violet-500 text-neutral-950 rounded-full p-1" />
								<div className="w-1 grow bg-violet-500 ml-2.5" />
							</div>
							<p className="pb-3">{t("YTDG.Content.Roadmap.savingSettings")}</p>
						</div>
						<div className="flex gap-3 md:gap-6">
							<div className="flex flex-col">
								<Check className="size-6 bg-violet-500 text-neutral-950 rounded-full p-1" />
								<div className="w-1 grow bg-black/5 dark:bg-white/5 ml-2.5" />
							</div>
							<p className="pb-3">{t("YTDG.Content.Roadmap.tempFolder")}</p>
						</div>
						<div className="flex gap-3 md:gap-6">
							<div className="flex flex-col">
								<div className="size-6 bg-black/5 dark:bg-white/5 rounded-full p-1" />
								<div className="w-1 grow bg-black/5 dark:bg-white/5 ml-2.5" />
							</div>
							<p className="pb-3">{t("YTDG.Content.Roadmap.autoUpdater")}</p>
						</div>
						<div className="flex gap-3 md:gap-6">
							<div className="flex flex-col">
								<div className="size-6 bg-black/5 dark:bg-white/5 rounded-full p-1" />
								<div className="w-1 grow bg-black/5 dark:bg-white/5 ml-2.5" />
							</div>
							<p className="pb-3">{t("YTDG.Content.Roadmap.translations")}</p>
						</div>
						<div className="flex gap-3 md:gap-6">
							<div className="flex flex-col">
								<div className="size-6 bg-black/5 dark:bg-white/5 rounded-full p-1" />
								<div className="w-1 grow bg-black/5 dark:bg-white/5 ml-2.5" />
							</div>
							<p className="pb-3">{t("YTDG.Content.Roadmap.fullSupport")}</p>
						</div>
						<div className="flex gap-3 md:gap-6">
							<div className="flex flex-col">
								<div className="size-6 bg-black/5 dark:bg-white/5 rounded-full p-1" />
							</div>
							<p className="pb-3">{t("YTDG.Content.Roadmap.youTellMe")}</p>
						</div>
					</div>
				</section>
				<section className="pt-20 md:pt-32 xl:pt-40 border-x border-black/5 dark:border-white/5 text-center">
					<h2>{t("YTDG.Content.Download.heading")}<span className="text-violet">.</span></h2>
					<p>{t("YTDG.Content.Download.text")}</p>
					<br />
					<div className="flex justify-center">
						<Link
							href="https://github.com/pprmint/yt-dlp-GUI/releases/latest"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button color="violet" design="filled">
								<ExternalLink />
								{t("COMMON.download")}
							</Button>
						</Link>
					</div>
				</section>
			</main>
		</>
	);
}
