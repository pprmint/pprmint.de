import Image from "next/image";
import { Link } from "src/navigation";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Check, ExternalLink } from "lucide-react";

import Title from "src/components/layout/Title";
import Hero from "public/assets/ytdg/hero.png";
import FadingImage from "src/components/ui/FadingImage";
import Button from "src/components/ui/Button";

import IsometricScreenshot from "public/assets/ytdg/screenshot_dark_iso.webp";

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "YTDG" });
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page({ params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const t = useTranslations();
	return (
		<>
			<Title title={t("YTDG.Head.title")} description={t("YTDG.Head.description")} accentColor="text-violet">
				<FadingImage src={Hero} alt="" fill className="object-cover" quality={90} />
			</Title>
			<main>
				<section className="relative flex items-center lg:min-h-2/3-screen pb-48 xl:pb-0">
					<div className="my-24 w-full max-w-7xl mx-auto px-6 md:px-9 z-10">
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
						className="absolute bottom-0 right-0 object-contain opacity-50 2xl:opacity-30 max-h-full w-5/6 md:w-2/3 p-6 lg:p-12"
						quality={90}
					/>
				</section>
				<section className="my-24 max-w-7xl mx-auto px-6 md:px-9">
					<h2>{t("YTDG.Content.Roadmap.heading")}</h2>
					<div className="flex flex-col">
						<div className="flex gap-6">
							<div className="flex flex-col">
								<Check
									strokeWidth={3}
									className="size-6 bg-gradient-to-b from-violet-500 to-violet-600 text-neutral-950 rounded-full p-1"
								/>
								<div className="w-1 flex-grow bg-gradient-to-b from-violet-600 to-violet-500 ml-2.5" />
							</div>
							<p className="pb-3">{t("YTDG.Content.Roadmap.savingSettings")}</p>
						</div>
						<div className="flex gap-6">
							<div className="flex flex-col">
								<Check
									strokeWidth={3}
									className="size-6 bg-gradient-to-b from-violet-500 to-violet-600 text-neutral-950 rounded-full p-1"
								/>
								<div className="w-1 flex-grow bg-neutral-900 ml-2.5" />
							</div>
							<p className="pb-3">{t("YTDG.Content.Roadmap.tempFolder")}</p>
						</div>
						<div className="flex gap-6">
							<div className="flex flex-col">
								<div className="size-6 bg-neutral-900 rounded-full p-1" />
								<div className="w-1 flex-grow bg-neutral-900 ml-2.5" />
							</div>
							<p className="pb-3">{t("YTDG.Content.Roadmap.autoUpdater")}</p>
						</div>
						<div className="flex gap-6">
							<div className="flex flex-col">
								<div className="size-6 bg-neutral-900 rounded-full p-1" />
								<div className="w-1 flex-grow bg-neutral-900 ml-2.5" />
							</div>
							<p className="pb-3">{t("YTDG.Content.Roadmap.translations")}</p>
						</div>
						<div className="flex gap-6">
							<div className="flex flex-col">
								<div className="size-6 bg-neutral-900 rounded-full p-1" />
								<div className="w-1 flex-grow bg-neutral-900 ml-2.5" />
							</div>
							<p className="pb-3">{t("YTDG.Content.Roadmap.fullSupport")}</p>
						</div>
						<div className="flex gap-6">
							<div className="flex flex-col">
								<div className="size-6 bg-neutral-900 rounded-full p-1" />
							</div>
							<p className="pb-3">{t("YTDG.Content.Roadmap.youTellMe")}</p>
						</div>
					</div>
				</section>
				<section className="my-24 max-w-7xl mx-auto px-6 md:px-9">
					<h2>{t("YTDG.Content.Download.heading")}</h2>
					<p>{t("YTDG.Content.Download.text")}</p>
					<br />
					<div className="flex">
						<Link
							href="https://github.com/pprmint/yt-dlp-GUI/releases/latest"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button color="violet">
								{t("COMMON.download")}
								<ExternalLink size={16} strokeWidth={3} />
							</Button>
						</Link>
					</div>
				</section>
			</main>
		</>
	);
}
