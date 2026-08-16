"use client";
import { Fragment, MouseEventHandler } from "react";
import { Mina } from "@/payload-types";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import * as ContextMenu from "@radix-ui/react-context-menu";
import saveAs from "file-saver";

import ExternalLink from "@/icons/ExternalLink";
import Copy from "@/icons/Copy";
import FloppyDisk from "@/icons/FloppyDisk";
import Filter from "@/icons/Filter";
import Bluesky from "@/icons/Bluesky";
import YouTube from "@/icons/YouTube";
import Twitter from "@/icons/Twitter";
import Globe from "@/icons/Globe";
import Instagram from "@/icons/Instagram";
import Link from "next/link";
import { useGalleryTransition } from "@/components/gallery/GalleryTransitionContext";

export default function ContextMenuPortal({
	artwork,
	index,
	closeDialog,
}: {
	artwork: Mina;
	index: number;
	closeDialog?: () => void;
}) {
	const t = useTranslations("MINA");

	// Search params.
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	const { startTransition } = useGalleryTransition();

	// Context menu stuff.
	function ContextMenuItem(
		props: React.PropsWithChildren<{
			action?: MouseEventHandler<HTMLDivElement>;
		}>,
	) {
		return (
			<ContextMenu.Item
				className="group relative flex items-center gap-2.5 pr-2 pl-2 h-7 leading-none select-none outline-none focus:outline-none data-disabled:text-black/25 dark:data-disabled:text-white/25 data-disabled:pointer-events-none data-highlighted:text-neutral-950 dark:data-highlighted:text-white data-[state=checked]:text-neutral-950 dark:data-[state=checked]:text-white data-highlighted:bg-black/10 dark:data-highlighted:bg-white/10 active:opacity-75 duration-75 data-highlighted:duration-0 cursor-pointer focus-visible:outline-hidden"
				onClick={props.action}
			>
				{props.children}
			</ContextMenu.Item>
		);
	}
	// Show artwork by same artist.
	function selectArtist(artist: string) {
		closeDialog?.();
		const params = new URLSearchParams(searchParams);
		params.set("artist", artist);
		params.delete("p"); // Otherwise you may end up on a page with no results.
		startTransition(() => {
			replace(`${pathname}?${params.toString()}`, { scroll: false });
		});

		const gallerySection = document.getElementById("gallery");
		if (gallerySection) {
			scrollTo({
				top: gallerySection.getBoundingClientRect().top + scrollY - 140,
				// behavior: "smooth",
			});
		}
	}
	// Show same outift.
	function selectOutfit(outfit: string) {
		closeDialog?.();
		const params = new URLSearchParams(searchParams);
		params.set("outfit", outfit);
		params.delete("p"); // Otherwise you may end up on a page with no results.
		startTransition(() => {
			replace(`${pathname}?${params.toString()}`, { scroll: false });
		});

		const gallerySection = document.getElementById("gallery");
		if (gallerySection) {
			scrollTo({
				top: gallerySection.getBoundingClientRect().top + scrollY - 140,
				// behavior: "smooth",
			});
		}
	}

	return (
		<ContextMenu.Portal>
			<ContextMenu.Content className="text-sm p-1 min-w-64 z-99999 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/5 shadow-xl data-[state=open]:animate-scale-up data-[state=closed]:animate-scale-down origin-(--radix-context-menu-content-transform-origin)">
				<ContextMenu.Group>
					<ContextMenu.Label className="text-xs text-neutral-950/50 dark:text-white/50 ml-2 mt-1 mb-0.5">
						{t("Content.Artworks.ContextMenu.Artwork.label")}
					</ContextMenu.Label>
					{typeof artwork.images[index].image === "object" && artwork.images[index].image.url && (
						<Link href={artwork.images[index].image.url} target="_blank" rel="noopener noreferrer">
							<ContextMenuItem>
								<ExternalLink />
								{t("Content.Artworks.ContextMenu.Artwork.openInNewTab")}
							</ContextMenuItem>
						</Link>
					)}
					<ContextMenuItem
						action={() =>
							navigator.clipboard.writeText(
								`${process.env.NEXT_PUBLIC_SERVER_URL}${
									typeof artwork.images[index].image === "object" && artwork.images[index].image.url
								}`,
							)
						}
					>
						<Copy />
						{t("Content.Artworks.ContextMenu.Artwork.copyImageUrl")}
					</ContextMenuItem>
					<ContextMenuItem
						action={() =>
							saveAs(
								(typeof artwork.images[index].image === "object" && artwork.images[index].image.url) || "",
								(typeof artwork.images[index].image === "object" && artwork.images[index].image.filename) || "",
							)
						}
					>
						<FloppyDisk />
						{t("Content.Artworks.ContextMenu.Artwork.saveImage")}
					</ContextMenuItem>
					{(() => {
						const outfit = artwork.outfit; // I hate you, TypeScript.
						if (outfit && typeof outfit !== "string") {
							return (
								<ContextMenuItem
									action={() => {
										selectOutfit(outfit.slug);
									}}
								>
									<Filter />
									{t("Content.Artworks.ContextMenu.Artwork.showAllWithOutfit")}
								</ContextMenuItem>
							);
						}
						return null;
					})()}
				</ContextMenu.Group>
				<ContextMenu.Group>
					{artwork.artists.map(
						(artist, i) =>
							typeof artist === "object" && (
								<Fragment key={artist.id}>
									<ContextMenu.Label className="text-xs text-neutral-950/50 dark:text-white/50 ml-2 mt-1.5 mb-0.5">
										{artist.name}
									</ContextMenu.Label>
									<ContextMenuItem
										key={i}
										action={() => {
											selectArtist((typeof artist === "object" && artist.slug) || "");
										}}
									>
										<Filter />
										{t("Content.Artworks.ContextMenu.Artist.showAllByArtist", {
											artist: (typeof artist === "object" && artist.name) || "",
										})}
									</ContextMenuItem>
									{artist.creditLinks?.map((link) => (
										<Link key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
											<ContextMenuItem>
												{link.service === "Bluesky" ? (
													<Bluesky />
												) : link.service === "YouTube" ? (
													<YouTube />
												) : link.service === "Twitter" ? (
													<Twitter />
												) : link.service === "Instagram" ? (
													<Instagram />
												) : (
													<Globe />
												)}
												{link.service === "Website"
													? t("Content.Artworks.ContextMenu.Artist.visitWebsite", {
															site: new URL(link.url).hostname,
														})
													: t("Content.Artworks.ContextMenu.Artist.visitProfile", {
															site: link.service,
														})}
											</ContextMenuItem>
										</Link>
									))}
								</Fragment>
							),
					)}
				</ContextMenu.Group>
			</ContextMenu.Content>
		</ContextMenu.Portal>
	);
}
