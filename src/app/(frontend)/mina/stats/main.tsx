import * as Dialog from "@radix-ui/react-dialog";
import config from "@payload-config";
import { getPayload } from "payload";
import AnimatedCounter from "./counter";
import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";
import GraphTrendUp from "@/icons/GraphTrendUp";
import Error from "@/icons/Error";
import CumulativeChart from "./cumulativeChart";

export default async function Stats() {
	const t = await getTranslations("MINA");

	const payload = await getPayload({ config });
	const allDocs = await payload.find({
		collection: "mina",
		pagination: false,
		limit: undefined,
		select: {
			id: true,
			normalizedDate: true,
			artist: true,
			pixelart: true,
			wholesome: true,
			nsfw: true,
			outfit: true,
			commissionPrice: true,
		},
		sort: "normalizedDate",
	});

	const artists = await payload.find({
		collection: "artists",
		select: {
			id: true,
			name: true,
			artworks: true,
		},
		joins: {
			artworks: {
				count: true,
			},
		},
		pagination: false,
		sort: "slug",
	});

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button>
					<GraphTrendUp />
					{t("Content.Artworks.Statistics.title")}
				</Button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-white/90 dark:bg-neutral-950/90 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-100" />
				<Dialog.Content className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-svh sm:max-h-4/5-screen overflow-y-auto overflow-x-hidden md:h-max w-screen sm:w-[93vw] max-w-6xl bg-white dark:bg-neutral-950 outline outline-1 outline-black/5 dark:outline-white/5 data-[state=open]:animate-dialog-enter data-[state=closed]:animate-dialog-exit origin-center shadow-2xl">
					<Dialog.Title className="sr-only">{t("Content.Artworks.Statistics.title")}</Dialog.Title>
					<Dialog.Close asChild>
						<button
							className="absolute top-0 right-0 inline-flex p-3 items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10 hover:text-neutral-950 dark:hover:text-white duration-100 active:duration-75"
							aria-label="Close"
						>
							<Error />
						</button>
					</Dialog.Close>
					<div className="grid grid-rows-3 sm:grid-rows-2 xl:grid-rows-1 sm:grid-cols-2 xl:grid-cols-3 w-full gap-y-6 my-6 md:my-12">
						<div className="text-center">
							<h3>{t("Content.Artworks.Statistics.total")}</h3>
							<div className="font-mono text-6xl md:text-7xl font-thin font-stretch-expanded text-neutral-950 dark:text-white">
								<AnimatedCounter duration={600} target={allDocs.docs.length} />
							</div>
						</div>
						<div className="text-center">
							<h3>{t("Content.Artworks.Statistics.commissioned")}</h3>
							<div className="font-mono text-6xl md:text-7xl font-thin font-stretch-expanded text-neutral-950 dark:text-white">
								<AnimatedCounter
									duration={600}
									target={allDocs.docs.filter((doc) => doc.commissionPrice).length}
								/>
							</div>
						</div>
						<div className="text-center sm:col-span-2 xl:col-span-1">
							<h3>{t("Content.Artworks.Statistics.averagePrice")}</h3>
							<div className="font-mono text-6xl md:text-7xl font-thin font-stretch-expanded text-neutral-950 dark:text-white">
								<AnimatedCounter
									duration={600}
									unit="€"
									digits={3}
									target={
										allDocs.docs.reduce(
											(sum, doc) => (doc.commissionPrice ? sum + doc.commissionPrice : sum),
											0
										) / allDocs.docs.filter((doc) => doc.commissionPrice).length
									}
								/>
							</div>
						</div>
					</div>
					<div className="w-full h-max aspect-video md:aspect-[2.5/1] mb-6">
						<CumulativeChart allDocs={allDocs} />
					</div>
					<table className="w-full max-w-96 mx-auto">
						<thead>
							<tr className="bg-black/5 dark:bg-white/5">
								<th className="px-2 py-1 text-neutral-950 dark:text-white text-left">
									{t("Content.Artworks.Filters.artist")}
								</th>
								<th className="px-2 py-1 text-neutral-950 dark:text-white text-right">
									{t("Content.Artworks.Statistics.artworkCount")}
								</th>
							</tr>
						</thead>
						<tbody>
							{artists.docs
								.sort((a, b) => (b.artworks?.totalDocs || 0) - (a.artworks?.totalDocs || 0))
								.map((artist, _) => (
									<tr key={artist.id} className="odd:bg-black/[0.025] dark:odd:bg-white/[0.025]">
										<td className="px-2 py-1 text-left">{artist.name}</td>
										<td className="px-2 py-1 text-right">{artist.artworks?.totalDocs}</td>
									</tr>
								))}
						</tbody>
					</table>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
