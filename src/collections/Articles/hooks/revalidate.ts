import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { revalidatePath, revalidateTag } from "next/cache";

import type { Article } from "@/payload-types";

export const revalidatePage: CollectionAfterChangeHook<Article> = ({ doc, previousDoc, req: { payload, context } }) => {
	if (!context.disableRevalidate) {
		if (doc._status === "published") {
			const path = `/articles/${doc.slug}`;

			payload.logger.info(`Revalidating page at path: ${path}`);

			revalidatePath(path);
			revalidateTag("pages-sitemap");
		}

		// If the page was previously published, we need to revalidate the old path
		if (previousDoc?._status === "published" && doc._status !== "published") {
			const oldPath = `/articles/${previousDoc.slug}`;

			payload.logger.info(`Revalidating old page at path: ${oldPath}`);

			revalidatePath(oldPath);
			revalidateTag("pages-sitemap");
		}
	}
	return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Article> = ({ doc, req: { context } }) => {
	if (!context.disableRevalidate) {
		const path = `/articles/${doc?.slug}`;
		revalidatePath(path);
		revalidateTag("pages-sitemap");
	}

	return doc;
};
