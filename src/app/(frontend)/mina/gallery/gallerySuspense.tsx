import config from "@payload-config";
import { getPayload } from "payload";
import type { Where } from "payload";
import Filters from "../filters/filters";
import Gallery from "./gallery";
import Pagination from "@/components/gallery/Pagination";
import OutOfBounds from "@/components/gallery/OutOfBounds";
import { getLocale, getTranslations } from "next-intl/server";
import Stats from "../stats/main";

export default async function GallerySuspense({ p, nsfw, artist }: { p: number; nsfw: string; artist?: string }) {
	const t = await getTranslations("MINA");
	const locale = (await getLocale()) as "en" | "de" | "all" | undefined;
	const payload = await getPayload({ config });
	const artists = await payload.find({
		collection: "artists",
		select: {
			id: true,
			name: true,
		},
		pagination: false,
		limit: undefined,
	});

	let filters: Where[] = [];

	if (nsfw !== "show") {
		filters.push({
			nsfw: {
				equals: false,
			},
		});
	}

	if (artist !== "undefined") {
		filters.push({
			"artist.name": {
				equals: artist,
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
		<div className="border-x border-black/5 dark:border-white/5 pt-12 lg:pt-20 xl:pt-40">
			{artworks !== null && (
				<>
					<div className="sm:flex w-full border-t border-black/5 dark:border-white/5">
						<Filters nsfw={nsfw} artist={artist} artists={artists} />
						<div className="hidden md:flex text-sm items-center px-3">
							{t("Content.Artworks.showingArtworks", {
								shown: artworks.totalDocs,
								total: allArtworks.totalDocs,
							})}
						</div>
						<div className="border-y sm:border-y-0 sm:border-l border-black/5 dark:border-white/5">
							<Stats />
						</div>
					</div>
					{artworks.docs.length == 0 ? <OutOfBounds /> : <Gallery artworks={artworks} page={p} />}
					<Pagination page={p} pageCount={artworks.totalPages} />
				</>
			)}
		</div>
	);
}
