import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { revalidatePath } from "next/cache";

import type { Artwork } from "@/payload-types";

export const revalidatePhotoChange: CollectionAfterChangeHook<Artwork> = ({ doc, req: { payload } }) => {
	payload.logger.info("Revalidating gallery on /photos");
	revalidatePath("/photos");
	return doc;
};

export const revalidatePhotoDelete: CollectionAfterDeleteHook<Artwork> = ({ doc, req: { payload } }) => {
	payload.logger.info("Revalidating gallery on /photos");
	revalidatePath("/photos");
	return doc;
};
