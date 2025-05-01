import config from "@payload-config";
import { getPayload } from "payload";
import type { Where } from "payload";
import Filters from "../filters";
import Pagination from "@/components/gallery/Pagination";
import OutOfBounds from "@/components/gallery/OutOfBounds";
import Gallery from "./gallery";

export default async function GallerySuspense({
	locale,
	p,
	dimension,
	type,
}: {
	locale: "en" | "de" | "all" | undefined;
	p: number;
	dimension: string;
	type: string;
}) {
	const payload = await getPayload({ config });

	let filters: Where[] = [];

	if (dimension !== "") {
		filters.push({
			dimension: {
				equals: dimension,
			},
		});
	}

	if (type !== "") {
		filters.push({
			type: {
				contains: type,
			},
		});
	}

	const graphics = await payload.find({
		collection: "graphics",
		draft: false,
		limit: 20,
		overrideAccess: false,
		locale: locale,
		pagination: true,
		page: p,
		where: filters.length > 0 ? { and: filters } : undefined,
	});

	return (
		<>
			<Filters type={type} dimension={dimension} />
			{graphics.docs.length == 0 ? <OutOfBounds /> : <Gallery graphics={graphics} page={p} />}
			<Pagination page={p} pageCount={graphics.totalPages} />
		</>
	);
}
