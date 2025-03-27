import { Artists } from "@/types/artist";
import { MinaArtworks } from "@/types/mina-artwork";
import Filters from "../filters/filters";
import Gallery from "./gallery";
import Pagination from "@/components/gallery/Pagination";
import OutOfBounds from "@/components/gallery/OutOfBounds";

export default async function GallerySuspense({ p, nsfw, artist }: { p: number; nsfw: string; artist?: string }) {
	const Artists: Artists = await getArtists();
	const Artworks: MinaArtworks = await getArtworks(p, nsfw, Artists, artist);
	return (
		<div className="border-x border-black/5 dark:border-white/5 pt-12 lg:pt-20 xl:pt-40">
			{Artworks !== null && (
				<>
					<Filters nsfw={nsfw} artist={artist} artists={Artists} />
					{Artworks.data.length == 0 ? <OutOfBounds /> : <Gallery artworks={Artworks} page={p} />}
					<Pagination page={p} pageCount={Artworks.meta.pagination.pageCount} />
				</>
			)}
		</div>
	);
}

async function getArtworks(page: number, nsfw: string, artists: Artists, artist?: string) {
	let nsfwFilter = "";
	let artistFilter = "";

	if (nsfw !== "show") {
		nsfwFilter = `filters[nsfw][$ne]=true&`;
	}

	if (artist && artists.data.find((a) => a.name === artist)) {
		artistFilter = `filters[artist][name][$eq]=${artist}&`;
	}

	const res = await fetch(
		`${process.env.STRAPI_API_URL}/mina-artworks?pagination[page]=${Number(
			page
		)}&pagination[pageSize]=28&${nsfwFilter}${artistFilter}populate=artwork&populate=artist&sort=creationDate:desc`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
			},
			next: { revalidate: 0 },
		}
	);
	if (!res.ok) {
		return null;
	}
	return res.json();
}

async function getArtists() {
	const res = await fetch(`${process.env.STRAPI_API_URL}/artists`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
		},
		next: { revalidate: 0 },
	});
	if (!res.ok) {
		return null;
	}
	return res.json();
}
