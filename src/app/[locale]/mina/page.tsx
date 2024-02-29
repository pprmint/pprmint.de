import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import Title from "src/components/Title";
import FadingImage from "src/components/FadingImage";
import { MinaArtworks } from "src/types/mina-artwork";

import Ref from "./ref";

import HeroMina from "public/assets/mina/hero.webp";
import Gallery from "./gallery";

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		p?: string;
	};
}) {
	const t = await getTranslations("MINA");
	const currentPage = Number(searchParams?.p) || 1;
	const Artworks: MinaArtworks = await getData(currentPage);
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<FadingImage src={HeroMina} alt="Original Mina artwork by wxsonz." fill className="object-cover" quality={90} />
			</Title>
			<main>
				<Ref />
				<Suspense>
					<Gallery artworks={Artworks} page={currentPage} />
				</Suspense>
			</main>
		</>
	);
}

async function getData(page: number) {
	const res = await fetch(
		`${process.env.STRAPI_API_URL}/mina-artworks?pagination[page]=${Number(
			page
		)}&pagination[pageSize]=20&populate=artwork&sort=creationDate:desc`,
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
