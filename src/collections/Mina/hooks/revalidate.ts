import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { revalidatePath } from "next/cache";

import type { Artwork } from "@/payload-types";

export const revalidateArtChange: CollectionAfterChangeHook<Artwork> = ({ doc, req: { payload } }) => {
	payload.logger.info("Revalidating art on / and /mina");
	revalidatePath("/mina");
	revalidatePath("/");
	return doc;
};

export const revalidateArtDelete: CollectionAfterDeleteHook<Artwork> = ({ doc, req: { payload } }) => {
	payload.logger.info("Revalidating art on / and /mina");
	revalidatePath("/mina");
	revalidatePath("/");
	return doc;
};
