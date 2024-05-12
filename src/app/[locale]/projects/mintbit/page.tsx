import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "src/navigation";
import Glyphs from "./glyphs";
import Tester from "./tester";

import Title from "src/components/layout/Title";
import TitleBackground from "public/assets/mintbit/title.svg";
import FadingImage from "src/components/ui/FadingImage";
import Button from "src/components/ui/Button";
import Download from "src/icons/Download";

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "MINTBIT" });
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
	const t = useTranslations();
	return (
		<>
			<Title title={t("MINTBIT.Head.title")} description={t("MINTBIT.Head.description")}>
				<FadingImage src={TitleBackground} alt="" fill className="object-cover" />
			</Title>
			<main>
				<Glyphs />
				<section className="my-20 md:my-32 xl:my-40 px-6 md:px-9 py-5">
					<h2 className="max-w-7xl mx-auto">
						{t("MINTBIT.Content.Tester.heading")}
						<span className="text-green">.</span>
					</h2>
					<Tester />
				</section>
				<section className="my-20 md:my-32 xl:my-40 max-w-7xl mx-auto px-6 md:px-9 py-5">
					<h2>{t("MINTBIT.Content.Download.heading")}</h2>
					<p>{t("MINTBIT.Content.Download.text")}</p>
					<br />
					<Link href="https://static.pprmint.art/download/Mintbit/Mintbit_1.1.zip">
						<Button color="green" tabIndex={-1}>
							<Download />
							{t("COMMON.download")}
						</Button>
					</Link>
				</section>
			</main>
		</>
	);
}
