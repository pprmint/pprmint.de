import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Glyphs from "./glyphs";
import Tester from "./tester";

import Title from "src/components/layout/Title";
import TitleBackground from "public/assets/mintbit/title.svg";
import FadingImage from "src/components/ui/FadingImage";
import Button from "src/components/ui/Button";
import Download from "src/icons/Download";

export async function generateMetadata() {
	const t = await getTranslations("MINTBIT");
	return {
		title: t("Head.title"),
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
				<section className="px-6 md:px-9 lg:px-12 xl:px-20">
					<Glyphs />
				</section>
				<section className="px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="pb-20 md:pb-32 xl:pb-40 text-center border-x border-black/5 dark:border-white/5">
						<h2 className="mb-6">
							{t("MINTBIT.Content.Tester.heading")}
							<span className="text-green">.</span>
						</h2>
						<Tester />
					</div>
				</section>
				<section className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="text-center border-x border-black/5 dark:border-white/5">
						<h2>{t("MINTBIT.Content.Download.heading")}</h2>
						<p>{t("MINTBIT.Content.Download.text")}</p>
						<br />
						<Link className="flex w-max mx-auto" href="https://static.pprmint.de/download/Mintbit/Mintbit_1.1.zip">
							<Button color="green" design="filled" tabIndex={-1}>
								<Download />
								{t("COMMON.download")}
							</Button>
						</Link>
					</div>
				</section>
			</main>
		</>
	);
}
