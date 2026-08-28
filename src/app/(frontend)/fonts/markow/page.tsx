import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

import Title from "@/components/layout/Title";
import Button from "@/components/ui/Button";
import Download from "@/icons/Download";
import FontTester from "../FontTester";
import { MNMarkow } from "@public/fonts/MNMarkow/MNMarkow";
import Codeberg from "@/icons/Codeberg";

export async function generateMetadata() {
	const t = await getTranslations("MARKOW");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
	const t = useTranslations();
	return (
		<>
			<Title title={t("MARKOW.Head.title")} titleFont={MNMarkow} description={t("MARKOW.Head.description")}>
				<div className="absolute inset-0 bg-[#282c58]" />
			</Title>
			<main>
				<section className="max-w-8xl mx-auto sm:px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="py-20 md:py-32 xl:py-40 text-center border-x border-black/5 dark:border-white/5">
						<div className="px-6 xl:px-9 mb-6">
							<h2>
								{t("MARKOW.Content.Tester.heading")}
								<span className="text-green">.</span>
							</h2>
							<p>{t("MARKOW.Content.Tester.text")}</p>
						</div>
						<FontTester
							styles={[{ tag: "wght", steps: [400] }]}
							stylisticSets={[
								{
									tag: "ss01",
									label: {
										de: "Kurvige Unterlängen",
										en: "Curvy descenders",
									},
								},
								{
									tag: "ss02",
									label: {
										de: "DIN-ähnliche Pfeile",
										en: "DIN-like arrows",
									},
								},
							]}
							features={["calt"]}
							font={MNMarkow}
							pangram="RE1 → S Charlottenburg Bhf (Berlin), Abfahrt 06:22 Uhr."
						/>
					</div>
				</section>
				<section className="max-w-8xl mx-auto sm:px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="text-center border-x border-black/5 dark:border-white/5">
						<div className="px-6 xl:px-9">
							<h2>
								{t("MARKOW.Content.Download.heading")}
								<span className="text-green">.</span>
							</h2>
							<p>{t("MARKOW.Content.Download.text")}</p>
							<br />
						</div>
						<div className="flex justify-center border-y border-black/5 dark:border-white/5 divide-x divide-black/5 dark:divide-white/5">
							<Link href="/api/download/file/MNMarkow-Regular_(0.001).zip" target="_blank">
								<Button design="transparent" color="green" tabIndex={-1} size="large">
									<Download />
									{t("COMMON.download")}
								</Button>
							</Link>
							<Link href="https://codeberg.org/pprmint/MN-Markow" target="_blank">
								<Button design="transparent" color="blue" tabIndex={-1} size="large">
									<Codeberg />
									{t("MARKOW.Content.Download.codeberg")}
								</Button>
							</Link>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
