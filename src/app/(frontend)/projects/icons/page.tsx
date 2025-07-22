import Title from "@/components/layout/Title";
import Main from "./main";

import HeroImage from "/public/assets/icons/title.webp";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
	const t = await getTranslations("ICONS");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
	const t = useTranslations("ICONS");
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<Image src={HeroImage} alt="" fill className="object-cover object-bottom-right" />
			</Title>
			<main className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
				<Main />
			</main>
		</>
	);
}
