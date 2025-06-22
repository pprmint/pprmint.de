import config from "@payload-config";
import { getPayload } from "payload";
import type { Where } from "payload";
import Filters from "../filters/filters";
import Gallery from "./gallery";
import Pagination from "@/components/gallery/Pagination";
import OutOfBounds from "@/components/gallery/OutOfBounds";
import { getLocale, getTranslations } from "next-intl/server";
import Stats from "../stats/main";

export default async function GallerySuspense({
	p,
	nsfw,
	refs,
	artist,
	outfit,
}: {
	p: number;
	nsfw: string;
	refs: string;
	artist?: string;
	outfit?: string;
}) {
	const t = await getTranslations("MINA");
	const locale = (await getLocale()) as "en" | "de" | "all" | undefined;
	const payload = await getPayload({ config });

	// Data for dropdowns.
	const artists = await payload.find({
		collection: "artists",
		select: {
			id: true,
			name: true,
			slug: true,
		},
		pagination: false,
		limit: undefined,
		sort: "slug",
	});

	const outfits = await payload.find({
		collection: "outfits",
		select: {
			id: true,
			name: true,
			slug: true,
		},
		pagination: false,
		limit: undefined,
		locale: locale,
		sort: "slug",
	});

	// Filters.
	let filters: Where[] = [];

	// Always filter out smut unless nsfw=show in search param.
	if (nsfw !== "show") {
		filters.push({
			nsfw: {
				equals: false,
			},
		});
	}

	if (refs === "show") {
		filters.push({
			reference: {
				equals: true,
			},
		});
	}

	if (artist !== "undefined") {
		filters.push({
			"artist.slug": {
				equals: artist,
			},
		});
	}

	if (outfit !== "undefined") {
		filters.push({
			"outfit.slug": {
				equals: outfit,
			},
		});
	}

	const artworks = await payload.find({
		collection: "mina",
		page: p,
		limit: 28,
		where: filters.length > 0 ? { and: filters } : undefined,
		locale,
		sort: "-date",
	});

	const allArtworks = await payload.count({
		collection: "mina",
	});

	return (
		<div className="border-x border-black/5 dark:border-white/5">
			{artworks !== null && (
				<>
					<div className="xl:flex w-full border-t border-black/5 dark:border-white/5">
						<Filters
							nsfw={nsfw}
							refs={refs}
							artist={artist}
							artists={artists}
							outfit={outfit}
							outfits={outfits}
						/>
						<div className="flex items-center border-t xl:border-t-0 border-black/5 dark:border-white/5">
							<div className="text-sm grow px-3">
								{t("Content.Artworks.showingArtworks", {
									shown: artworks.totalDocs,
									total: allArtworks.totalDocs,
								})}
							</div>
							<div className="border-l border-black/5 dark:border-white/5">
								<Stats />
							</div>
						</div>
					</div>
					{artworks.docs.length == 0 ? <OutOfBounds /> : <Gallery artworks={artworks} page={p} />}
					<Pagination page={p} pageCount={artworks.totalPages} />
				</>
			)}
		</div>
	);
}
