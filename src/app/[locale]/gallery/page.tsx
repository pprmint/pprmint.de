import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";

import Gallery from "./gallery";
import GallerySkeleton from "./gallerySkeleton";
import Filters from "./filters";
import Pagination from "src/components/gallery/Pagination";

import OutOfBounds from "src/components/gallery/OutOfBounds";
import { Works } from "src/types/work";
import { Link } from "src/navigation";

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "GALLERY" });
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
	const t = await getTranslations("GALLERY");
	const currentPage = Number(searchParams?.p) || 1;
	const type = String(searchParams?.type) || "undefined";
	const dimension = String(searchParams?.dimension) || "undefined";
	const Works: Works = await getWorks(locale, currentPage, dimension, type);
	const Latest: Works = await getLatest();
	const pageCount = Works.meta.pagination.pageCount;
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<FadingImage
					src={`https://static.pprmint.art${Latest.data[0].attributes.cover.data.attributes.url}`}
					alt=""
					fill
					className="object-cover"
					quality={90}
				/>
			</Title>
			<main>
				<section className="mx-auto px-3">
					<Filters type={type} dimension={dimension} />
					{currentPage > pageCount ? (
						<div className="relative">
							<GallerySkeleton />
							<OutOfBounds />
						</div>
					) : (
						<Suspense fallback={<GallerySkeleton />}>
							<Gallery works={Works} />
						</Suspense>
					)}
					<Pagination page={currentPage} pageCount={pageCount} />
				</section>
				<section className="my-20 max-w-7xl mx-auto px-6 md:px-9 xl:text-center">
					<h2>{t("Content.Disclaimer.heading")}<span className="text-green">.</span></h2>
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
				</section>
			</main>
		</>
	);
}

async function getWorks(locale: string, page: number, dimension: string, type: string) {
	let dimensionFilter = "";
	let typeFilter = "";

	if (dimension && (dimension === "2d" || dimension === "3d")) {
		dimensionFilter = `filters[dimension][$eq]=${dimension === "2d" ? "twodee" : "threedee"}&`;
	}

	if (type && (type === "static" || type === "animated")) {
		typeFilter = `filters[type][$eq]=${type}&`;
	}

	const res = await fetch(
		`${process.env.STRAPI_API_URL}/works?locale=${locale}&pagination[page]=${Number(
			page
		)}&pagination[pageSize]=20&${dimensionFilter}${typeFilter}populate=*&sort=creationDate:desc`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
			},
			next: { revalidate: 60 },
		}
	);
	if (!res.ok) {
		throw new Error("Failed to fetch works.");
	}
	return res.json();
}

async function getLatest() {
	const res = await fetch(`${process.env.STRAPI_API_URL}/works?pagination[limit]=1&populate=*&sort=creationDate:desc`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
		},
		next: { revalidate: 60 },
	});
	if (!res.ok) {
		throw new Error("Failed to fetch latest.");
	}
	return res.json();
}
