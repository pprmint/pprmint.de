import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";
import { MinaArtworks } from "src/types/mina-artwork";

import Ref from "./ref";

import HeroMina from "public/assets/mina/hero.webp";
import Gallery from "./gallery";
import GallerySkeleton from "./gallerySkeleton";
import Filters from "./filters";
import Pagination from "src/components/gallery/Pagination";

import OutOfBounds from "./outOfBounds";

type Props = {
	params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "MINA" });
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
		nsfw?: string;
		artist?: string;
	};
}) {
	const t = await getTranslations("MINA");
	const currentPage = Number(searchParams?.p) || 1;
	const nsfw = String(searchParams?.nsfw) || "show";
	const artist = String(searchParams?.artist) || "";
	const Artworks: MinaArtworks = await getData(currentPage, nsfw);
	const pageCount = Artworks.meta.pagination.pageCount;
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<FadingImage src={HeroMina} alt="Original Mina artwork by wxsonz." fill className="object-cover" quality={90} />
			</Title>
			<main>
				<Ref />
				{currentPage > pageCount ? (
					<div className="relative">
						<GallerySkeleton />
						<OutOfBounds />
					</div>
				) : (
					<Suspense fallback={<GallerySkeleton />}>
						<Gallery artworks={Artworks} />
					</Suspense>
				)}
				<Pagination page={currentPage} pageCount={pageCount} />
			</main>
		</>
	);
}

async function getData(page: number, nsfw: string) {
	const res = await fetch(
		`${process.env.STRAPI_API_URL}/mina-artworks?pagination[page]=${Number(page)}&pagination[pageSize]=20&${
			nsfw != "show" && `filters[nsfw][$ne]=true`
		}&populate=artwork&sort=creationDate:desc`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
			},
			next: { revalidate: 1800 },
		}
	);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	return res.json();
}
