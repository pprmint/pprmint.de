import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

import Head from "src/components/Head";
import Title from "src/components/Title";
import Button from "src/components/Button";

import Hero from "public/assets/ytdg/hero.png";
import IsometricScreenshot from "public/assets/ytdg/screenshot_dark_iso.webp";
import Trans from "next-translate/Trans";

export default function YtDlpGui() {
	const { t } = useTranslation();
	return (
		<>
			<Head
				title={t("YTDG:Head.title")}
				description={t("YTDG:Head.description")}
				color="#9955ee"
				image="https://pprmint.art/assets/ytdg/OG.png"
			/>
			<Title title={t("YTDG:Head.title")} description={t("YTDG:Head.description")} accentColor="text-violet">
				<Image src={Hero} alt="" fill className="object-cover" quality={90} />
			</Title>
			<main>
				<section className="relative flex items-center lg:min-h-2/3-screen pb-48 xl:pb-0">
					<div className="my-24 w-full max-w-7xl mx-auto px-6 md:px-9 z-10">
						<div className="w-full max-w-xl 2xl:max-w-3xl">
							<h2>{t("YTDG:Content.About.heading")}</h2>
							<p>{t("YTDG:Content.About.text1")}</p>
							<p>
								<Trans
									i18nKey="YTDG:Content.About.text2"
									components={{
										Link: (
											<Link
												href="https://github.com/yt-dlp/yt-dlp"
												className="text-link-external"
												target="_blank"
												rel="noopener noreferrer"
											/>
										),
									}}
								/>
							</p>
							<p>{t("YTDG:Content.About.text3")}</p>
							<p>{t("YTDG:Content.About.text4")}</p>
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
                    <h2>{t("YTDG:Content.Roadmap.heading")}</h2>
                    <ul className="list-disc list-inside">
                        <li>{t("YTDG:Content.Roadmap.savingSettings")}</li>
                        <li>{t("YTDG:Content.Roadmap.tempFolder")}</li>
                        <li>{t("YTDG:Content.Roadmap.autoUpdater")}</li>
                        <li>{t("YTDG:Content.Roadmap.translations")}</li>
                        <li>{t("YTDG:Content.Roadmap.fullSupport")}</li>
                        <li>{t("YTDG:Content.Roadmap.youTellMe")}</li>
                    </ul>
                </section>
				<section className="my-24 max-w-7xl mx-auto px-6 md:px-9">
					<h2>{t("YTDG:Content.Download.heading")}</h2>
					<p>{t("YTDG:Content.Download.text")}</p>
					<br />
					<div className="flex">
						<Link
							href="https://github.com/pprmint/yt-dlp-GUI/releases/latest"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button color="violet">
								{t("COMMON:download")}
								<i className="ri-external-link-line" />
							</Button>
						</Link>
					</div>
				</section>
			</main>
		</>
	);
}
