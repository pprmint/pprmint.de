import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Title from "src/components/layout/Title";
import RedirectToggle from "./toggle";

export async function generateMetadata() {
    const t = await getTranslations("REDIRECT");
    return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
    const t = useTranslations("REDIRECT");
    return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")} />
			<main className="min-h-[calc(100vh_-_817px)]">
				<section className="max-w-7xl mx-auto my-20 md:my-32 xl:my-40 px-6 md:px-9">
					<h2>
						{t("Content.heading")}
						<span className="text-green">.</span>
					</h2>
					<p className="mb-9">{t("Content.text")}</p>
					<RedirectToggle />
				</section>
			</main>
		</>
	);
}
