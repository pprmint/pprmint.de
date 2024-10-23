import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";

import HomePageScreenshot from "public/assets/autsellia/homepage.webp";

export async function generateMetadata(props: Props) {
    const params = await props.params;

    const {
        locale
    } = params;

    const t = await getTranslations({ locale, namespace: "AUTSELLIA" });
    return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

type Props = {
	params: Promise<{ locale: string }>;
};

export default function Page(props: Props) {
    const params = use(props.params);

    const {
        locale
    } = params;

    setRequestLocale(locale);
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
