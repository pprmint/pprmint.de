import { Photos } from "src/types/photo";
import Gallery from "./gallery";
import Pagination from "src/components/gallery/Pagination";
import OutOfBounds from "src/components/gallery/OutOfBounds";

export default async function GallerySuspense({ p }: { p: number }) {
	const Photos: Photos = await getPhotos(p);
	return (
		<>
			{Photos.data.length === 0 ? <OutOfBounds /> : <Gallery photos={Photos} />}
			<Pagination page={p} pageCount={Photos.meta.pagination.pageCount} />
		</>
	);
}

async function getPhotos(page: number) {
	const res = await fetch(
		`${
			process.env.STRAPI_API_URL
		}/photos?sort[0]=dateTime:desc&populate[photo][fields][0]=url&populate[photo][fields][1]=width&populate[photo][fields][2]=height&populate[camera][fields][0]=name&populate[camera][populate][logo][fields][0]=url&populate[camera][populate][logo][fields][1]=width&populate[camera][populate][logo][fields][2]=height&populate[lens][fields][0]=name&fields[0]=dateTime&fields[1]=iso&fields[2]=focalLength&fields[3]=aperture&fields[4]=shutter&pagination[pageSize]=20&pagination[page]=${Number(
			page
		)}`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
			},
			next: { revalidate: 0 },
		}
	);
	if (!res.ok) {
		throw new Error("Failed to fetch Photos.");
	}
	return res.json();
}
