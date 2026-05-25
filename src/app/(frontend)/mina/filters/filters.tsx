"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NsfwDialog from "./nsfwDialog";
import Checkbox from "@/components/ui/Checkbox";
import { Dialog } from "@radix-ui/react-dialog";
import Select from "@/components/ui/Select";
import { useTranslations } from "next-intl";
import type { Artist, Outfit } from "@/payload-types";

import { PaginatedDocs } from "payload";

function Filters(props: {
	nsfw?: string;
	refs?: string;
	artist?: string;
	artists: PaginatedDocs<Artist>;
	outfit?: string;
	outfits: PaginatedDocs<Outfit>;
}) {
	const t = useTranslations("MINA");
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	// How lewd.
	const nsfw = props.nsfw === "show";
	const seenNsfwDialog = localStorage.getItem("confirmedNsfwDialog");
	const [dialogOpen, setDialogOpen] = useState(false);

	function handleDialogAccept() {
		const params = new URLSearchParams(searchParams);
		localStorage.setItem("confirmedNsfwDialog", "interestingly, yes");
		params.set("nsfw", "show");
		setDialogOpen(false);
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	function handleNsfw() {
		const params = new URLSearchParams(searchParams);
		if (nsfw) {
			params.delete("nsfw");
		} else {
			if (!seenNsfwDialog) {
				setDialogOpen(true);
			} else {
				params.set("nsfw", "show");
				setDialogOpen(false);
			}
		}
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	// How referencing.
	const refs = props.refs === "show";
	function handleRefs() {
		const params = new URLSearchParams(searchParams);
		if (refs) {
			params.delete("refs");
		} else {
			params.delete("p"); // Otherwise you may end up on a page with no results.
			params.set("refs", "show");
		}
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	// Dropdown for artist filter.
	function handleSelectArtist(artist: string) {
		const params = new URLSearchParams(searchParams);
		params.set("artist", artist);
		params.delete("p"); // Otherwise you may end up on a page with no results.
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	}
	function handleClearArtist() {
		const params = new URLSearchParams(searchParams);
		params.delete("artist");
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	}
	const artistFilterActive = Boolean(props.artist && props.artists.docs.some((a) => a.slug === props.artist));

	// Dropdown for outfit filter.
	function handleSelectOutfit(outfit: string) {
		const params = new URLSearchParams(searchParams);
		params.set("outfit", outfit);
		params.delete("p"); // Otherwise you may end up on a page with no results.
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	}
	function handleClearOutfit() {
		const params = new URLSearchParams(searchParams);
		params.delete("outfit");
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	}
	const outfitFilterActive = Boolean(props.outfit && props.outfits.docs.some((a) => a.slug === props.outfit));

	return (
		<>
			<div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:flex items-center grow">
				<div className="flex w-full xl:w-64 sm:border-r border-black/5 dark:border-white/5">
					<Select
						label={t("Content.Artworks.Filters.artist")}
						selected={{
							value: String(props.artists.docs.find((i) => i.slug === props.artist)?.slug),
							label:
								props.artists.docs.find((i) => i.slug === props.artist)?.name ?? t("Content.Artworks.Filters.artist"),
						}}
						onValueChange={handleSelectArtist}
						showClearButton={artistFilterActive}
						onClear={handleClearArtist}
						options={props.artists.docs.map((artist) => ({ value: artist.slug, label: artist.name }))}
					/>
				</div>
				<div className="flex w-full xl:w-64 lg:border-r border-black/5 dark:border-white/5">
					<Select
						label={t("Content.Artworks.Filters.outfit")}
						selected={{
							value: String(props.outfits.docs.find((i) => i.slug === props.outfit)?.slug),
							label:
								props.outfits.docs.find((i) => i.slug === props.outfit)?.name ?? t("Content.Artworks.Filters.outfit"),
						}}
						onValueChange={handleSelectOutfit}
						showClearButton={outfitFilterActive}
						onClear={handleClearOutfit}
						options={props.outfits.docs.map((outfit) => ({ value: outfit.slug, label: outfit.name }))}
					/>
				</div>
				<div className="flex items-center gap-2 h-9 pl-2 pr-3 w-full xl:w-max sm:border-t sm:border-r lg:border-t-0 border-black/5 dark:border-white/5">
					<Checkbox border id="refs" checked={refs} onCheckedChange={handleRefs} />
					<label htmlFor="refs">{t("Content.Artworks.Filters.reference")}</label>
				</div>
				<div className="flex items-center gap-2 h-9 pl-2 pr-3 w-full xl:w-max sm:border-t lg:border-t-0 xl:border-r border-black/5 dark:border-white/5">
					<Checkbox border id="nsfw" checked={nsfw} onCheckedChange={handleNsfw} />
					<label htmlFor="nsfw">{t("Content.Artworks.Filters.nsfw")}</label>
				</div>
			</div>
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<NsfwDialog onAccept={handleDialogAccept} />
			</Dialog>
		</>
	);
}

export default dynamic(() => Promise.resolve(Filters), {
	ssr: false,
});
