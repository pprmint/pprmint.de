import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";

import HomePageScreenshot from "public/assets/autsellia/homepage.webp";

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "AUTSELLIA" });
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
	const t = useTranslations("AUTSELLIA");
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<FadingImage src={HomePageScreenshot} alt="" fill className="object-cover object-top" />
			</Title>
			<main className="max-w-7xl mx-auto px-6 md:px-9">soon™</main>
		</>
	);
}
