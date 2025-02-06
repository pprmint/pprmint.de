import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Title from "src/components/layout/Title";
import Link from "next/link";

export async function generateMetadata() {
    const t = await getTranslations("AI");
    return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
    const t = useTranslations("AI");
    return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")} />
			<main className="max-w-8xl px-6 md:px-9 xl:px-20">
				<section className="pb-20 md:pb-32 xl:pb-40 border-x border-black/5 dark:border-white/5">
					<h2>
						{t("Content.Intro.heading")}
						<span className="text-red">.</span>
					</h2>
					<p>{t("Content.Intro.text1")}</p>
					<p>{t("Content.Intro.text2")}</p>
					<p>{t("Content.Intro.text3")}</p>
					<p className="font-bold">{t("Content.Intro.text4")}</p>
				</section>
				<section className="pb-20 md:pb-32 xl:pb-40 border-x border-black/5 dark:border-white/5">
					<h2>
						{t("Content.Copyright.heading")}
						<span className="text-red">.</span>
					</h2>
					<p>
						{t.rich("Content.Copyright.text1", {
							gallery: (chunks) => <Link className="text-link" href="/graphics">{chunks}</Link>,
							contact: (chunks) => <Link className="text-link" href="/contact">{chunks}</Link>,
						})}
					</p>
					<p>{t("Content.Copyright.text2")}</p>
				</section>
				<section className="p-6 md:p-9 border-x border-red border-black/5 dark:border-white/5 bg-red-50 dark:bg-red-950">
					<h2>
						{t("Content.Disallow.heading")}
						<span className="text-red">.</span>
					</h2>
					<p className="text-red-700 dark:text-red-100">{t("Content.Disallow.text")}</p>
				</section>
				<section className="pt-20 md:pt-32 xl:pt-40 border-x border-black/5 dark:border-white/5">
					<h2>
						{t("Content.Ask.heading")}
						<span className="text-red">.</span>
					</h2>
					<p>{t("Content.Ask.text")}</p>
				</section>
			</main>
		</>
	);
}
