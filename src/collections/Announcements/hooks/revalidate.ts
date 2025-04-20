import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { revalidatePath } from "next/cache";

import type { Announcement } from "@/payload-types";

export const revalidateChange: CollectionAfterChangeHook<Announcement> = ({ doc, req: { payload } }) => {
	payload.logger.info("Revalidating announcements on /");
	revalidatePath("/");
	return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Announcement> = ({ doc, req: { payload } }) => {
	payload.logger.info("Revalidating announcements on /");
	revalidatePath("/");
	return doc;
};
