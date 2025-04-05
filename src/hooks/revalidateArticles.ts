import { getPayload, type GlobalAfterChangeHook } from "payload";
import configPromise from "@payload-config";

import { revalidatePath, revalidateTag } from "next/cache";

async function getArticles() {
	const payload = await getPayload({ config: configPromise });
	const articles = await payload.find({
		collection: "articles",
		pagination: false,
		limit: 100,
	});

	return articles;
}

export const revalidateArticles: GlobalAfterChangeHook = async () => {
	// Revalidate all articles.
	const articles = await getArticles();
	if (articles.docs) {
		for (const page of articles.docs) {
			if (page._status === "published") {
				const path = `/articles/${page.slug}`;
				console.info(`Revalidating page at path: ${path}`);
				revalidatePath(path);
			}
		}
	}

	// Revalidate the sitemap for articles and galleries.
	console.info("Revalidating sitemap for articles.");
	revalidateTag("articles-sitemap");
};
