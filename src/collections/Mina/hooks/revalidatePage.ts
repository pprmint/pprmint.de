import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { revalidatePath, revalidateTag } from "next/cache";

import type { Mina } from "@/payload-types";

export const revalidateArtChange: CollectionAfterChangeHook<Mina> = ({ doc, req: { payload } }) => {
	payload.logger.info("Revalidating art on / and /mina");
	revalidatePath("/mina");
	revalidatePath("/");
	return doc;
};

export const revalidateArtDelete: CollectionAfterDeleteHook<Mina> = ({ doc, req: { payload } }) => {
	payload.logger.info("Revalidating art on / and /mina");
	revalidatePath("/mina");
	revalidatePath("/");
	return doc;
};
