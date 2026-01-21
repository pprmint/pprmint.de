import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Title from "@/components/layout/Title";
import FadingImage from "@/components/ui/FadingImage";

import HomePageScreenshot from "@public/assets/autsellia/homepage.webp";

export async function generateMetadata() {
    const t = await getTranslations("AUTSELLIA");
    return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
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
