import Image from "next/image";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import Title from "src/components/layout/Title";

import RedLight from "public/assets/commissions/red.webp";
import YellowLight from "public/assets/commissions/yellow.webp";
import GreenLight from "public/assets/commissions/green.webp";
import Services from "./overview";
import Commission from "src/types/commission";
import { Info } from "lucide-react";

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

export default async function Page({ params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const CommissionData: Commission = await getData();
	const Data = CommissionData.data.attributes;
	const t = await getTranslations("COMMISSIONS");
	return (
		<>
			<Title
				title={t("Head.title")}
				description={t(`Content.Status.${Data.status}`)}
				accentColor={Data.status == "open" ? "text-green" : Data.status == "limited" ? "text-yellow" : "text-red"}
			>
				<Image
					src={Data.status == "open" ? GreenLight : Data.status == "limited" ? YellowLight : RedLight}
					alt=""
					fill
					className="object-cover"
					quality={90}
				/>
			</Title>
			<main className="max-w-7xl mx-auto px-6 md:px-9">
				<section className="my-20 md:my-32 xl:my-40">
					<h2>{t("Content.Offers.heading")}</h2>
					<p className="pb-6 inline-flex items-center gap-3">
						<Info size={16} />
						{t("Content.Offers.priceInfo")}
					</p>
					<Services data={CommissionData} />
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

async function getData() {
	const res = await fetch(`${process.env.STRAPI_API_URL}/commission`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
		},
		next: { revalidate: 60 },
	});
	if (!res.ok) {
		throw new Error("Failed to fetch status.");
	}
	return res.json();
}
