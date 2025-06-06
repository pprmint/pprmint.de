import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Title from "@/components/layout/Title";
import Grid from "./grid";

export async function generateMetadata() {
    const t = await getTranslations("PROJECTS");
    return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
    const t = useTranslations("");
    return (
		<>
			<Title title={t("PROJECTS.Head.title")} description={t("PROJECTS.Head.description")} />
			<main className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
				<Grid />
			</main>
		</>
	);
}
