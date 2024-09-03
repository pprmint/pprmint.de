import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

import Title from "src/components/layout/Title";

import GallerySkeleton from "./gallery/gallerySkeleton";
import GallerySuspense from "./gallery/gallerySuspense";

import { Link } from "src/navigation";
import WarningOctagon from "src/icons/WarningOctagon";

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "GRAPHICS" });
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

type Props = {
	params: { locale: string };

	searchParams?: {
		p?: string;
		type?: string;
		dimension?: string;
	};
};

export default async function Page({ searchParams, params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const t = await getTranslations("GRAPHICS");
	const currentPage = Number(searchParams?.p) || 1;
	const type = String(searchParams?.type) || "undefined";
	const dimension = String(searchParams?.dimension) || "undefined";
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")} noDelay />
			<main>
				<section className="flex flex-col lg:flex-row items-center justify-center gap-9 my-20 md:my-32 xl:my-40 max-w-7xl mx-auto px-6 md:px-9">
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
				<section className="my-20 md:my-32 xl:my-40">
					<Suspense fallback={<GallerySkeleton />}>
						<GallerySuspense locale={locale} p={currentPage} type={type} dimension={dimension} />
					</Suspense>
				</section>
			</main>
		</>
	);
}
