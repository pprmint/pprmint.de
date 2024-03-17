import { Link } from "src/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Selector from "./icons";

import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";

import TitleBackground from "/public/assets/appicons/title.svg";

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "APPICONS" });
	return {
		title: `${t("Head.title")} • pprmint.art`,
		description: t("Head.description"),
	};
}

type Props = {
	params: { locale: string };
};

export default function Page({ params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const t = useTranslations("APPICONS");
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<FadingImage src={TitleBackground} alt="" fill className="object-cover bg-neutral-950" />
			</Title>
			<main className="max-w-7xl mx-auto px-6 md:px-9">
				<section className="my-20">
					<h2>{t("Content.Intro.title")}</h2>
					<p>
						{t.rich("Content.Intro.text1", {
							i: (chunks) => <i>{chunks}</i>,
						})}
					</p>
					<p>
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
				<section>
					<Selector />
				</section>
			</main>
		</>
	);
}
