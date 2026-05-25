import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Glyphs from "./glyphs";

import Title from "@/components/layout/Title";
import TitleBackground from "@public/assets/mintbit/title.svg";
import FadingImage from "@/components/ui/FadingImage";
import Button from "@/components/ui/Button";
import Download from "@/icons/Download";
import FontTester from "../FontTester";
import { MintBit } from "@public/fonts/Mintbit/MintBit";

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
				<section className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
					<Glyphs />
				</section>
				<section className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="pb-20 md:pb-32 xl:pb-40 text-center border-x border-black/5 dark:border-white/5">
						<h2 className="mb-6">
							{t("MINTBIT.Content.Tester.heading")}
							<span className="text-green">.</span>
						</h2>
						<FontTester
							styles={[{ tag: "wght", steps: [400] }]}
							font={MintBit}
							pangram="FAQ om Schweiz: Klöv du trång pjäxby?"
						/>
					</div>
				</section>
				<section className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="text-center border-x border-black/5 dark:border-white/5">
						<h2>{t("MINTBIT.Content.Download.heading")}</h2>
						<p>{t("MINTBIT.Content.Download.text")}</p>
						<br />
						<div className="flex border-y border-black/5 dark:border-white/5 justify-center">
						<Link className="flex w-max mx-auto" href="/api/download/file/mintbit_1.1.zip" target="_blank">
							<Button design="transparent" color="green" tabIndex={-1} size="large" noInitialPadding>
								<Download />
								{t("COMMON.download")}
							</Button>
						</Link>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
