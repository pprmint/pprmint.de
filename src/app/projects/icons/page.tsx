import Title from "src/components/layout/Title";
import Cards from "./cards";

import HeroImage from "public/assets/icons/title.webp";
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
				<Image src={HeroImage} alt="" fill className="object-cover object-right-bottom" />
			</Title>
			<main className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
				<section className="py-12 md:py-20 xl:py-40 border-x border-black/5 dark:border-white/5" id="icons">
					<Cards />
				</section>
			</main>
		</>
	);
}
