import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Title from "src/components/layout/Title";
import Link from "next/link";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props) {
    const params = await props.params;

    const {
        locale
    } = params;

    const t = await getTranslations({ locale, namespace: "AI" });
    return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page(props: Props) {
    const params = use(props.params);

    const {
        locale
    } = params;

    setRequestLocale(locale);
    const t = useTranslations("AI");
    return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")} accentColor="text-red" />
			<main>
				<section className="max-w-7xl mx-auto my-20 md:my-32 xl:my-40 px-6 md:px-9">
					<h2>
						{t("Content.Intro.heading")}
						<span className="text-red">.</span>
					</h2>
					<p>{t("Content.Intro.text1")}</p>
					<p>{t("Content.Intro.text2")}</p>
					<p>{t("Content.Intro.text3")}</p>
					<p className="font-bold">{t("Content.Intro.text4")}</p>
				</section>
				<section className="max-w-7xl mx-auto my-20 md:my-32 xl:my-40 px-6 md:px-9">
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
				<section className="max-w-7xl mx-auto my-20 md:my-32 xl:my-40 p-6 md:p-9 bg-gradient-to-b from-red-950 rounded-xl border-2 border-red">
					<h2>
						{t("Content.Disallow.heading")}
						<span className="text-red">.</span>
					</h2>
					<p className="text-red-100">{t("Content.Disallow.text")}</p>
				</section>
				<section className="max-w-7xl mx-auto my-20 md:my-32 xl:my-40 px-6 md:px-9">
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
