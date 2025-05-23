import Image from "next/image";
import { getTranslations } from "next-intl/server";

import Title from "@/components/layout/Title";

import RedLight from "/public/assets/commissions/red.webp";
import YellowLight from "/public/assets/commissions/yellow.webp";
import GreenLight from "/public/assets/commissions/green.webp";
import Services from "./overview";
import Commission from "@/types/commission";
import InfoCircle from "@/icons/InfoCircle";

export async function generateMetadata() {
    const t = await getTranslations("COMMISSIONS");
    return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default async function Page() {
    const CommissionData: Commission = await getData();
    const Data = CommissionData.data;
    const t = await getTranslations("COMMISSIONS");
    return (
		<>
			<Title
				title={t("Head.title")}
				description={t(`Content.Status.${Data.status}`)}
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
						<InfoCircle />
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
