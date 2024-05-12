import Title from "src/components/layout/Title";
import Cards from "./cards";

import HeroImage from "public/assets/icons/title.svg";
import Image from "next/image";
import Kofi from "src/icons/Kofi";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Button from "src/components/ui/Button";
import ExternalLink from "src/icons/ExternalLink";

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "ICONS" });
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

type Props = {
	params: { locale: string };
};

export default function Page({ params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const t = useTranslations("ICONS");
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<Image src={HeroImage} alt="" fill className="object-cover origin-bottom" />
			</Title>
			<main className="max-w-7xl mx-auto px-6 md:px-9">
				<section className="my-20" id="icons">
					<Cards />
				</section>
				<section className="flex flex-col lg:flex-row items-center justify-center gap-9 my-20 md:my-32 xl:my-40 max-w-7xl mx-auto px-6 md:px-9">
					<div>
						<Kofi className="size-24 fill-neutral-50" />
					</div>
					<div>
						<h2>
							{t("Content.Disclaimer.heading")}
							<span className="text-green">.</span>
						</h2>
						<p>{t("Content.Disclaimer.text1")}</p>
						<p className="pb-6">{t("Content.Disclaimer.text2")}</p>
						<Link href="https://ko-fi.com/pprmint" target="_blank" rel="noopener noreferrer">
							<Button>{t("Content.Disclaimer.button")}<ExternalLink /></Button>
						</Link>
					</div>
				</section>
			</main>
		</>
	);
}
