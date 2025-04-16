import config from "@payload-config";
import { getPayload } from "payload";
import Gallery from "./gallery";
import Pagination from "@/components/gallery/Pagination";
import OutOfBounds from "@/components/gallery/OutOfBounds";
import { getLocale } from "next-intl/server";

export default async function GallerySuspense({ p }: { p: number }) {
	const locale = (await getLocale()) as "en" | "de" | "all" | undefined;
	const payload = await getPayload({ config });
	const photos = await payload.find({
		collection: "photos",
		page: p,
		locale: locale,
	});

	return (
		<>
			{photos.docs.length === 0 ? <OutOfBounds /> : <Gallery photos={photos} page={p} />}
			<Pagination page={p} pageCount={photos.totalPages} />
		</>
	);
}
