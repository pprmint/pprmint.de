import config from "@payload-config";
import { getPayload } from "payload";
import Filters from "../filters/filters";
import Gallery from "./gallery";
import Pagination from "@/components/gallery/Pagination";
import OutOfBounds from "@/components/gallery/OutOfBounds";

export default async function GallerySuspense({ p, nsfw, artist }: { p: number; nsfw: string; artist?: string }) {
	const payload = await getPayload({ config });
	const artists = await payload.find({
		collection: "artists",
	});
	const artworks = await payload.find({
		collection: "mina",
		page: p,
		where: {
			nsfw: {
				equals: false,
			},
		},
	});
	return (
		<div className="border-x border-black/5 dark:border-white/5 pt-12 lg:pt-20 xl:pt-40">
			{artworks !== null && (
				<>
					<Filters nsfw={nsfw} artist={artist} artists={artists} />
					{artworks.docs.length == 0 ? <OutOfBounds /> : <Gallery artworks={artworks} page={p} />}
					<Pagination page={p} pageCount={artworks.totalPages} />
				</>
			)}
		</div>
	);
}
