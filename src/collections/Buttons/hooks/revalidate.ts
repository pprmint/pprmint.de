import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { revalidatePath } from "next/cache";

import type { Button } from "@/payload-types";

export const revalidateButtonChange: CollectionAfterChangeHook<Button> = ({ doc, req: { payload } }) => {
	payload.logger.info("Root layout.");
	revalidatePath('/', 'layout')
	return doc;
};

export const revalidateButtonDelete: CollectionAfterDeleteHook<Button> = ({ doc, req: { payload } }) => {
	payload.logger.info("Root layout.");
	revalidatePath('/', 'layout')
	return doc;
};
