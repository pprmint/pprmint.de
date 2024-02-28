import { MinaArtworks } from "src/types/mina-artwork";

export default async function Gallery() {
	const page = 1;
	const Artworks: MinaArtworks = await getData(1);
}

async function getData(page: number) {
	const res = await fetch(
		`${process.env.STRAPI_API_URL}/mina-artworks?pagination[pageSize]=20&populate=artwork&sort=creationDate:desc`,
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
