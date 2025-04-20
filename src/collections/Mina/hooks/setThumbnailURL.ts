import type { CollectionBeforeChangeHook } from "payload";

export const setThumbnailURL: CollectionBeforeChangeHook = async ({ data, req }) => {
	const firstImageID = data?.images?.[0]?.image;

	if (!firstImageID) return data;

	const mediaDoc = await req.payload.findByID({
		collection: "artwork",
		id: firstImageID,
	});

	if (mediaDoc?.url) {
		return {
			...data,
			thumbnailURL: mediaDoc.sizes?.thumbnail?.url,
		};
	}

	return data;
};
