import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import Title from "@/components/layout/Title";
import Palette from "./palette";
import OldPalette from "./oldPalette";
import Button from "@/components/ui/Button";
import Link from "next/link";
import SwatchBook from "@/icons/SwatchBook";
import ExternalLink from "@/icons/ExternalLink";

export async function generateMetadata() {
    const t = await getTranslations("PALETTE");
    return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
    const t = useTranslations("PALETTE");
    return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<div className="relative w-full h-full overflow-clip bg-neutral-950">
					<div className="absolute top-1/2 inset-x-0 -translate-y-1/2">
						<div className="w-full h-1/6-screen skew-y-12 bg-green" />
						<div className="w-full h-1/6-screen -skew-y-12 border-y-2 border-yellow" />
						<div className="w-full h-1/6-screen skew-y-12 border-y-2 border-red" />
						<div className="w-full h-1/6-screen -skew-y-12 border-y-2 border-violet" />
						<div className="w-full h-1/6-screen skew-y-12 border-y-2 border-blue" />
					</div>
					<div className="absolute inset-0 bg-linear-to-r from-neutral-950/75 via-transparent"/>
				</div>
			</Title>
			<main className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
				<section className="py-20 md:py-32 xl:py-40 border-x border-black/5 dark:border-white/5">
					<h2>
						{t("Content.Current.heading")}
						<span className="text-green">.</span>
					</h2>
					<p>{t("Content.Current.text1")}</p>
					<p>{t("Content.Current.text2")}</p>
					<div className="flex flex-wrap gap-3 pt-6">
						<Link
							href="https://github.com/pprmint/pprmint.de/blob/main/tailwind.config.js#L7"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button design="semi-transparent" tabIndex={-1}>
								<ExternalLink />
								{t("Content.Current.tailwind")}
							</Button>
						</Link>
					</div>
				</section>
				<Palette />
				<section className="py-20 md:py-32 xl:py-40 border-x border-black/5 dark:border-white/5">
					<h2>
						{t("Content.Old.heading")}
						<span className="text-green">.</span>
					</h2>
					<p>{t("Content.Old.text1")}</p>
					<p>{t("Content.Old.text2")}</p>
					<div className="flex flex-wrap gap-3 pt-6">
						<Link href="/api/download/file/pprmint.2024.afpalette" download target="_blank">
							<Button design="semi-transparent" tabIndex={-1}>
								<SwatchBook />
								{t("Content.Old.affinity")}
							</Button>
						</Link>
					</div>
				</section>
				<OldPalette />
			</main>
		</>
	);
}
