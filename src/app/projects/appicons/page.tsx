import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import Selector from "./icons";

import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";

import TitleBackground from "public/assets/appicons/title.svg";

export async function generateMetadata() {
	const t = await getTranslations("APPICONS");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default async function Page() {
	const t = await getTranslations("APPICONS");
	const locale = await getLocale();
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<div className="absolute inset-0 bg-neutral-950" />
				<FadingImage src={TitleBackground} alt="" fill className="object-cover" />
				<div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent" />
			</Title>
			<main className="max-w-8xl mx-auto px-6 md:px-9 xl:px-20">
				<section className="pt-20 md:pt-32 xl:pt-40 border-x border-black/5 dark:border-white/5">
					<h2>{t("Content.Intro.title")}</h2>
					<p className="mb-3">
						{t.rich("Content.Intro.text1", {
							i: (chunks) => <i>{chunks}</i>,
						})}
					</p>
					<p className="mb-3">
						{t.rich("Content.Intro.text2", {
							a: (chunks) => (
								<Link
									href={`https://learn.microsoft.com/${
										locale === "de" ? "de-de" : "en-us"
									}/windows/apps/design/style/iconography/app-icon-design`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-link-external"
								>
									{chunks}
								</Link>
							),
						})}
					</p>
					<p>{t("Content.Intro.text3")}</p>
				</section>
				<section className="pt-20 md:pt-32 xl:pt-40 border-x border-black/5 dark:border-white/5">
					<Selector />
				</section>
			</main>
		</>
	);
}
