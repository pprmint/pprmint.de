import Image from "next/image";
import { useTranslations } from "next-intl";

import Title from "src/components/layout/Title";

import RedLight from "public/assets/commissions/red.webp";
import YellowLight from "public/assets/commissions/yellow.webp";
import GreenLight from "public/assets/commissions/green.webp";
import Services from "./services";
import { Info } from "lucide-react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "COMMISSIONS" });
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page({ params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const t = useTranslations("COMMISSIONS");
	// Status for commissions
	// 0 = closed (red)
	// 1 = limited (yellow)
	// 2 = open (green)
	const Status = 0;
	const HeroImages = [RedLight, YellowLight, GreenLight];
	const Colors = ["red", "yellow", "green"];
	const TextColors = ["text-red", "text-yellow", "text-green"];
	return (
		<>
			<Title
				title={t("Head.title")}
				description={t(`Content.Status.${Colors[Status]}`)}
				accentColor={TextColors[Status]}
			>
				<Image src={HeroImages[Status]} alt="" fill className="object-cover" quality={90} />
			</Title>
			<main className="max-w-7xl mx-auto px-6 md:px-9">
				<section className="my-20 md:my-32 xl:my-40">
					<h2>{t("Content.Offers.heading")}</h2>
					<p className="pb-6 inline-flex items-center gap-3">
						<Info size={16} />
						{t("Content.Offers.priceInfo")}
					</p>
					<Services/>
				</section>
				<section className="my-20 md:my-32 xl:my-40">
					<h2>{t("Content.Terms.heading")}</h2>
					<h3>{t("Content.Terms.Disclaimer.heading")}</h3>
					<p>{t("Content.Terms.Disclaimer.termsAgree")}</p>
					<p>{t("Content.Terms.Disclaimer.acknowledgement")}</p>
					<p>{t("Content.Terms.Disclaimer.rightToWithdraw")}</p>
				</section>
			</main>
		</>
	);
}
