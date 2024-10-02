import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Title from "src/components/layout/Title";
import Grid from "./grid";

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "PROJECTS" });
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
	const t = useTranslations("");
	return (
		<>
			<Title title={t("PROJECTS.Head.title")} description={t("PROJECTS.Head.description")} />
			<main className="max-w-7xl mx-auto px-6 md:px-9">
				<Grid />
			</main>
		</>
	);
}
