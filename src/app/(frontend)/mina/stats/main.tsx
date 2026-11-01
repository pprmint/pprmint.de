import * as Dialog from "@radix-ui/react-dialog";
import config from "@payload-config";
import { getPayload } from "payload";
import AnimatedCounter from "./counter";
import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";
import GraphTrendUp from "@/icons/GraphTrendUp";
import Error from "@/icons/Error";
import CumulativeChart from "./cumulativeChart";
import Image from "next/image";

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
				<Dialog.Content className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-svh sm:max-h-4/5-screen overflow-y-auto overflow-x-hidden md:h-max w-screen sm:w-[93vw] max-w-8xl bg-white dark:bg-neutral-950 outline-solid outline-1 outline-black/5 dark:outline-white/5 data-[state=open]:animate-dialog-enter data-[state=closed]:animate-dialog-exit origin-center shadow-2xl">
					<header className="sticky top-0 z-10 flex justify-between items-center pl-3 border-b border-black/5 dark:border-white/5 bg-white dark:bg-neutral-950">
						<Dialog.Title className="font-sans font-medium text-base pb-0">{t("Content.Artworks.Statistics.title")}</Dialog.Title>
						<Dialog.Close asChild>
							<button
								className="ml-auto inline-flex size-9 items-center justify-center text-neutral-950 dark:text-white hover:text-white dark:hover:text-neutral-950 bg-black/5 dark:bg-white/5 hover:bg-neutral-950 dark:hover:bg-white active:bg-neutral-800 dark:active:bg-neutral-100 duration-100 active:duration-75"
								aria-label="Close"
							>
								<Error />
							</button>
						</Dialog.Close>
					</header>
					<div className="xl:flex my-9">
						<div className="grow">
							<div className="grid grid-rows-3 sm:grid-rows-2 md:grid-rows-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-y-6 mb-6 md:mb-12">
								<div className="text-center">
									<div className="font-mono text-5xl md:text-6xl lg:text-7xl text-neutral-950 dark:text-white">
										<AnimatedCounter duration={600} target={allDocs.docs.length} />
									</div>
									<p className="text-lg">{t("Content.Artworks.Statistics.total")}</p>
								</div>
								<div className="text-center">
									<div className="font-mono text-5xl md:text-6xl lg:text-7xl text-neutral-950 dark:text-white">
										<AnimatedCounter duration={600} target={allDocs.docs.filter((doc) => doc.commissionPrice).length} />
									</div>
									<p className="text-lg">{t("Content.Artworks.Statistics.commissioned")}</p>
								</div>
								<div className="text-center sm:col-span-2 md:col-span-1">
									<div className="font-mono text-5xl md:text-6xl lg:text-7xl text-neutral-950 dark:text-white">
										<AnimatedCounter
											duration={600}
											unit="€"
											digits={4}
											target={allDocs.docs.reduce(
												(sum, doc) => (doc.commissionPrice ? sum + doc.commissionPrice : sum),
												0,
											)}
										/>
									</div>
									<p className="text-lg">
										{t("Content.Artworks.Statistics.totalSpent")}
										<Image
											src="/api/artwork/file/layer_14155f4b0d.webp"
											alt="ehehe"
											width={622}
											height={583}
											className="inline h-6 ml-2 w-auto"
										/>
									</p>
								</div>
							</div>
							<div className="w-full h-max aspect-video md:aspect-2.25/1 mb-6">
								<CumulativeChart allDocs={allDocs} />
							</div>
						</div>
						<table className="w-full max-w-80 mx-auto h-full xl:mr-9">
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
										<tr key={artist.id} className="odd:bg-black/2.5 dark:odd:bg-white/2.5">
											<td className="px-2 py-1 text-left">{artist.name}</td>
											<td className="px-2 py-1 text-right font-mono">{artist.artworks?.totalDocs}</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
