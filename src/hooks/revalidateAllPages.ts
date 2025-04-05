import { getPayload, type GlobalAfterChangeHook } from "payload";
import configPromise from "@payload-config";
import type { Page } from "@/payload-types";

import { revalidatePath, revalidateTag } from "next/cache";

async function getPages() {
	const payload = await getPayload({ config: configPromise });
	const pages = await payload.find({
		collection: "pages",
		pagination: false,
		limit: 100,
	});

	return pages;
}

export const revalidateAllPages: GlobalAfterChangeHook = async () => {
	// Revalidate all pages.
	const pages = await getPages();
	if (pages.docs) {
		for (const page of pages.docs) {
			if (page._status === "published") {
				const path = page.slug === "home" ? "/" : `/${page.slug}`;
				console.info(`Revalidating page at path: ${path}`);
				revalidatePath(path);
			}
		}
	}

	// Revalidate all galleries.
	const galleries = await getGalleries();
	if (galleries.docs) {
		for (const gallery of galleries.docs) {
			if (gallery._status === "published") {
				const galleryPath = `/gallery/${gallery.slug}`;
				console.info(`Revalidating gallery at path: ${galleryPath}`);
				revalidatePath(galleryPath);
			}
		}
	}

	// Revalidate the sitemap for pages and galleries.
	console.info("Revalidating sitemap for pages and galleries.");
	revalidateTag("pages-sitemap");
	revalidateTag("galleries-sitemap");
};
