import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";

import TitleBackground from "public/assets/mintbit/title.svg";
import Glyphs from "./glyphs";
import Tester from "./tester";
import { Link } from "src/navigation";
import Button from "src/components/ui/Button";
import { Download } from "lucide-react";

export async function generateMetadata({ locale }: { locale: string }) {
	const t = await getTranslations({ locale, namespace: "MINTBIT" });
	return {
		title: `${t("Head.title")}.`,
		description: t("Head.description"),
	};
}

export default function Page() {
	const t = useTranslations();

	return (
		<>
			<Title title={t("MINTBIT.Head.title")} description={t("MINTBIT.Head.description")}>
				<FadingImage src={TitleBackground} alt="" fill className="object-cover" />
			</Title>
			<main>
				<Glyphs />
				<section className="my-20 px-6 md:px-9 py-5">
					<h2 className="max-w-7xl mx-auto">
						{t("MINTBIT.Content.Tester.heading")}
						<span className="text-green">.</span>
					</h2>
					<Tester />
				</section>
				<section className="my-20 max-w-7xl mx-auto px-6 md:px-9 py-5">
					<h2>{t("MINTBIT.Content.Download.heading")}</h2>
					<p>{t("MINTBIT.Content.Download.text")}</p>
					<br />
					<Link href="https://static.pprmint.art/download/Mintbit/Mintbit_1.1.zip">
						<Button color="green">
							<Download size={16} />
							{t("COMMON.download")}
						</Button>
					</Link>
				</section>
			</main>
		</>
	);
}
