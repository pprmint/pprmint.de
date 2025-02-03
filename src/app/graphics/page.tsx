import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";

import Title from "src/components/layout/Title";

import GallerySkeleton from "./gallery/gallerySkeleton";
import GallerySuspense from "./gallery/gallerySuspense";

import Link from "next/link";
import WarningOctagon from "src/icons/WarningOctagon";

export async function generateMetadata() {
	const t = await getTranslations("GRAPHICS");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ p?: string; type?: string; dimension?: string }>;
}) {
	const { p = "1", type = "", dimension = "" } = await searchParams;
	const t = await getTranslations("GRAPHICS");
	const locale = await getLocale();
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")} />
			<main className="w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
				<section className="pb-20 md:pb-32 xl:pb-40 border-x border-black/5 dark:border-white/5">
					<Suspense fallback={<GallerySkeleton />}>
						<GallerySuspense locale={locale} p={parseInt(p)} type={type} dimension={dimension} />
					</Suspense>
				</section>
				<section className="flex flex-col lg:flex-row items-center justify-center gap-9 px-6 md:px-9 border-x border-black/5 dark:border-white/5">
					<div>
						<WarningOctagon className="size-24 fill-red" />
					</div>
					<div>
						<h2>
							{t("Content.Disclaimer.heading")}
							<span className="text-red">.</span>
						</h2>
						<p>{t("Content.Disclaimer.text1")}</p>
						<p>
							{t.rich("Content.Disclaimer.text2", {
								b: (chunks) => <b>{chunks}</b>,
							})}
						</p>
						<p>
							{t.rich("Content.Disclaimer.text3", {
								Link: (chunks) => (
									<Link href="/contact" className="text-link">
										{chunks}
									</Link>
								),
							})}
						</p>
					</div>
				</section>
			</main>
		</>
	);
}
