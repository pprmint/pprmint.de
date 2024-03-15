import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import Title from "src/components/layout/Title";
import Palette from "./palette";
import Button from "src/components/ui/Button";
import { FileJson, SwatchBook } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "PALETTE" });
	return {
		title: `${t("Head.title")}.`,
		description: t("Head.description"),
	};
}

export default function PrivacyPolicy() {
	const t = useTranslations("PALETTE");
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")} />
			<main>
				<section className="my-20 max-w-7xl mx-auto px-6 lg:px-9">
					<h2>
						{t("Content.Usage.heading")}
						<span className="text-green">.</span>
					</h2>
					<p>{t("Content.Usage.text1")}</p>
					<p>{t("Content.Usage.text2")}</p>
					<div className="flex gap-3 pt-6">
						<Link
							href="https://github.com/pprmint/pprmint.art/blob/main/tailwind.config.js#L7"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button tabIndex={-1}>
								<FileJson size={16} />
								{t('Content.Usage.tailwind')}
							</Button>
						</Link>
						<Link href="https://static.pprmint.art/download/pprmint.2024.afpalette" download>
							<Button tabIndex={-1}>
								<SwatchBook size={16} />
								{t('Content.Usage.affinity')}
							</Button>
						</Link>
					</div>
				</section>
				<Palette />
			</main>
		</>
	);
}
