import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";
import { MinaArtworks } from "src/types/mina-artwork";

import Gallery from "./gallery";
import GallerySkeleton from "./gallerySkeleton";
import Filters from "./filters";
import Pagination from "src/components/gallery/Pagination";

import OutOfBounds from "src/components/gallery/OutOfBounds";
import { Artists } from "src/types/artist";
import { Link } from "src/navigation";
import Button from "src/components/ui/Button";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { Works } from "src/types/work";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "GALLERY" });
	return {
		title: `${t("Head.title")}.`,
		description: t("Head.description"),
	};
}

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		p?: string;
		type?: string;
		dimension?: string;
	};
}) {
	const t = await getTranslations("GALLERY");
	const currentPage = Number(searchParams?.p) || 1;
	const type = String(searchParams?.type) || "undefined";
	const dimension = String(searchParams?.dimension) || "undefined";
	const Works: Works = await getWorks(currentPage, type, dimension);
	const pageCount = Works.meta.pagination.pageCount;
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<FadingImage
					src={`https://static.pprmint.art${Works.data[0].attributes.cover.data.attributes.url}`}
					alt=""
					fill
					className="object-cover"
					quality={90}
				/>
			</Title>
			<main>
				<section className="mx-auto px-2">
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
			</main>
		</>
	);
}

async function getWorks(page: number, type: string, dimension: string) {
	const res = await fetch(
		`${process.env.STRAPI_API_URL}/works?pagination[page]=${Number(page)}&pagination[pageSize]=20&${
			type != "undefined" ? `filters[type][$ne]=${type}&` : ""
		}${dimension != "undefined" ? `filters[dimension][$eq]=${dimension}&` : ""}populate=*&sort=creationDate:desc`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
			},
			next: { revalidate: 1800 },
		}
	);
	if (!res.ok) {
		throw new Error("Failed to fetch works.");
	}
	return res.json();
}
