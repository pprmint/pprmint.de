import config from "@payload-config";
import { getPayload, Where } from "payload";
import Gallery from "./gallery";
import Pagination from "@/components/gallery/Pagination";
import OutOfBounds from "@/components/gallery/OutOfBounds";
import { getLocale } from "next-intl/server";
import Filters from "./filters";

export default async function GallerySuspense({ p, camera }: { p: number; camera?: string }) {
	const locale = (await getLocale()) as "en" | "de" | "all" | undefined;
	const payload = await getPayload({ config });

	// Data for dropdowns.
	const cameras = await payload.find({
		collection: "cameras",
		pagination: false,
		limit: undefined,
		sort: "slug",
	});

	// Filters.
	let filters: Where[] = [];

	if (camera) {
		filters.push({
			"camera.slug": {
				equals: camera,
			},
		});
	}

	const photos = await payload.find({
		collection: "photos",
		page: p,
		locale: locale,
		limit: 20,
		sort: "-date",
		where: filters.length > 0 ? { and: filters } : undefined,
	});

	return (
		<>
			<Filters cameras={cameras} camera={camera} />
			{photos.docs.length === 0 ? <OutOfBounds /> : <Gallery photos={photos} page={p} />}
			<Pagination page={p} pageCount={photos.totalPages} />
		</>
	);
}
