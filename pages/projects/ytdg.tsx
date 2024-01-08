import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

import Head from "components/Head";
import Title from "components/Title";
import Button from "components/Button";

import Hero from "public/assets/ytdg/hero.png";

export default function YtDlpGui() {
	const { t } = useTranslation();
	return (
		<>
			<Head title={t("YTDG:Head.title")} description={t("YTDG:Head.description")} color="#9955ee" />
			<Title title={t("YTDG:Head.title")} description={t("YTDG:Head.description")} accentColor="text-violet">
				<Image src={Hero} alt="" fill className="object-cover" quality={90} />
			</Title>
			<main>
				<section className="max-w-7xl mx-auto px-6 md:px-9 py-5">
					<h2>{t("YTDG:Content.Download.heading")}</h2>
					<p>{t("YTDG:Content.Download.text")}</p>
					<br />
					<div className="flex">
						<Link href="https://github.com/pprmint/yt-dlp-GUI/releases" target="_blank" rel="noopener noreferrer">
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
