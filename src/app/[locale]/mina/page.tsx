import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
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

import OutOfBounds from "../../../components/gallery/OutOfBounds";
import { Artists } from "src/types/artist";
import { Link } from "src/navigation";
import Button from "src/components/ui/Button";
import { Download } from "lucide-react";

type Props = {
	params: { locale: string };

	searchParams?: {
		p?: string;
		nsfw?: string;
		artist?: string;
	};
};

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "MINA" });
	return {
		title: `${t("Head.title")} • pprmint.art`,
		description: t("Head.description"),
	};
}

export default async function Page({ searchParams, params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const t = await getTranslations("MINA");
	const currentPage = Number(searchParams?.p) || 1;
	const nsfw = String(searchParams?.nsfw) || "hide";
	const artist = String(searchParams?.artist) || "undefined";
	const Artists: Artists = await getArtists();
	const Artworks: MinaArtworks = await getArtworks(currentPage, nsfw, artist, Artists);
	const pageCount = Artworks.meta.pagination.pageCount;
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<FadingImage src={HeroMina} alt="" fill className="object-cover" quality={90} />
			</Title>
			<main>
				<section id="lore" className="my-20 max-w-7xl mx-auto px-6 md:px-9">
					<h2>
						{t("Content.About.heading")}
						<span className="text-green">.</span>
					</h2>
					<p>{t("Content.About.text1")}</p>
					<p>{t("Content.About.text2")}</p>
					<p>{t("Content.About.text3")}</p>
					<p>{t("Content.About.text4")}</p>
					<p>{t("Content.About.text5")}</p>
					<p>
						{t.rich("Content.About.text6", {
							Link: (chunks) => (
								<Link href="https://twitter.com/wxsonz" className="text-link-external">
									{chunks}
								</Link>
							),
						})}
					</p>
				</section>
				<section id="design" className="my-20 max-w-7xl mx-auto px-3 xl:px-9">
					<Ref />
					<div className="flex flex-col lg:flex-row lg:justify-between gap-6 mt-6 px-3 md:px-6 xl:px-0">
						<p>
							{t.rich("Content.Reference.credit", {
								Link: (chunks) => (
									<Link href="https://twitter.com/nekomimiwubs" className="text-link-external">
										{chunks}
									</Link>
								),
							})}
						</p>
						<div className="flex flex-col lg:items-end">
							<p className="mb-3">{t("Content.Reference.Download.text")}</p>
							<Link
								href="https://static.pprmint.art/download/Mina/Mina_ref_sheet_(by_nekomimi).png"
								target="_blank"
								download
							>
								<Button tabIndex={-1}>
									<Download size={16} />
									{t("Content.Reference.Download.button")}
								</Button>
							</Link>
						</div>
					</div>
				</section>
				<section className="max-w-7xl mx-auto px-3 xl:px-9">
					<Filters nsfw={nsfw} artist={artist} artists={Artists} />
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
				</section>
				<section className="my-20 max-w-7xl mx-auto px-6 md:px-9">
					<h2>
						{t("Content.Fanart.heading")}
						<span className="text-green">.</span>
					</h2>
					<p>{t("Content.Fanart.text1")}</p>
					<p>{t("Content.Fanart.text2")}</p>
					<p>
						{t.rich("Content.Fanart.text3", {
							spoiler: (chunks) => <span className="inline px-1 py-0.5 bg-neutral-900 text-transparent hover:text-neutral rounded-md duration-100 select-none hover:select-text">{chunks}</span>,
						})}
					</p>
					<p>{t("Content.Fanart.text4")}</p>
				</section>
			</main>
		</>
	);
}

async function getArtworks(page: number, nsfw: string, artist: string, artists: Artists) {
	let nsfwFilter = "";
	let artistFilter = "";

	if (nsfw !== "show") {
		nsfwFilter = `filters[nsfw][$ne]=true&`;
	}

	if (artist !== "undefined") {
		const matchingArtist = artists.data.find((a) => a.attributes.name === artist);
		if (matchingArtist) {
			artistFilter = `filters[artist][name][$eq]=${matchingArtist.attributes.name}&`;
		}
	}

	const res = await fetch(
		`${process.env.STRAPI_API_URL}/mina-artworks?pagination[page]=${Number(
			page
		)}&pagination[pageSize]=20&${nsfwFilter}${artistFilter}populate=artwork&populate=artist&sort=creationDate:desc`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
			},
			next: { revalidate: 60 },
		}
	);
	if (!res.ok) {
		throw new Error("Failed to fetch artworks.");
	}
	return res.json();
}

async function getArtists() {
	const res = await fetch(`${process.env.STRAPI_API_URL}/artists`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
		},
		next: { revalidate: 60 },
	});
	if (!res.ok) {
		throw new Error("Failed to fetch artists.");
	}
	return res.json();
}
