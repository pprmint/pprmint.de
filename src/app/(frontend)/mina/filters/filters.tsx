"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NsfwDialog from "./nsfwDialog";
import Checkbox from "@/components/ui/Checkbox";
import { Dialog } from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { useTranslations } from "next-intl";
import type { Artist, Outfit } from "@/payload-types";

import Check from "@/icons/Check";
import ChevronDown from "@/icons/ChevronDown";
import ChevronUp from "@/icons/ChevronUp";
import X from "@/icons/X";
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
	const artistFilterActive = props.artist && props.artists.docs.some((a) => a.slug === props.artist);

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
	const outfitFilterActive = props.outfit && props.outfits.docs.some((a) => a.slug === props.outfit);

	function SelectItem(props: React.PropsWithChildren<{ value: string }>) {
		return (
			<Select.Item
				value={props.value}
				className="group relative flex items-center gap-3 pr-2 pl-2 h-7 leading-none select-none outline-hidden data-disabled:text-black/25 dark:data-disabled:text-white/25 data-disabled:pointer-events-none data-highlighted:text-neutral-950 dark:data-highlighted:text-white data-[state=checked]:text-neutral-950 dark:data-[state=checked]:text-white data-highlighted:bg-black/10 dark:data-highlighted:bg-white/10 active:opacity-75 duration-100 cursor-pointer focus-visible:outline-hidden"
			>
				<Select.ItemText className="grow">{props.children}</Select.ItemText>
				<Select.ItemIndicator className="ml-auto">
					<Check />
				</Select.ItemIndicator>
			</Select.Item>
		);
	}

	return (
		<>
			<div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:flex items-center grow">
				<div className="w-full xl:w-48 gap-3 sm:border-r border-black/5 dark:border-white/5">
					<Select.Root value={props.artist} onValueChange={handleSelectArtist}>
						<div className="flex w-full">
							<Select.Trigger
								className="group flex items-center justify-between px-3 h-9 w-full hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-950 dark:hover:text-white active:shadow-inner duration-100"
								aria-label={t("Content.Artworks.Filters.artist")}
							>
								<Select.Value aria-label={props.artist}>
									{artistFilterActive
										? props.artists.docs.find((artist) => artist.slug === props.artist)?.name
										: t("Content.Artworks.Filters.artist")}
								</Select.Value>
								<Select.Icon className="ml-auto">
									<ChevronDown />
								</Select.Icon>
							</Select.Trigger>
							{artistFilterActive && (
								<button
									onClick={handleClearArtist}
									className="h-9 px-2.5 hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10 hover:text-neutral-950 dark:hover:text-white duration-100"
								>
									<X />
								</button>
							)}
						</div>
						<Select.Portal>
							<Select.Content className="z-99999 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/5 shadow-lg data-[state=open]:animate-fade-in">
								<Select.ScrollUpButton className="absolute z-9999 top-0 left-0 right-0 flex justify-center bg-linear-to-b from-white/50 dark:from-neutral-900/50 text-neutral-950 dark:text-white rounded-t-md">
									<ChevronUp />
								</Select.ScrollUpButton>
								<Select.Viewport className="p-1">
									<Select.Group>
										{props.artists.docs.map((artist) => (
											<SelectItem key={artist.id} value={artist.slug}>
												{artist.name}
											</SelectItem>
										))}
									</Select.Group>
								</Select.Viewport>
								<Select.ScrollDownButton className="absolute z-9999 bottom-0 left-0 right-0 flex justify-center bg-linear-to-t from-white/50 dark:from-neutral-900/50 text-neutral-950 dark:text-white rounded-b-md">
									<ChevronDown />
								</Select.ScrollDownButton>
							</Select.Content>
						</Select.Portal>
					</Select.Root>
				</div>
				<div className="w-full xl:w-64 gap-3 lg:border-r border-black/5 dark:border-white/5">
					<Select.Root value={props.outfit} onValueChange={handleSelectOutfit}>
						<div className="flex w-full">
							<Select.Trigger
								className="group flex items-center justify-between px-3 h-9 w-full hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-950 dark:hover:text-white active:shadow-inner duration-100"
								aria-label={t("Content.Artworks.Filters.outfit")}
							>
								<Select.Value aria-label={props.outfit}>
									{outfitFilterActive
										? props.outfits.docs.find((outfit) => outfit.slug === props.outfit)?.name
										: t("Content.Artworks.Filters.outfit")}
								</Select.Value>
								<Select.Icon className="ml-auto">
									<ChevronDown />
								</Select.Icon>
							</Select.Trigger>
							{outfitFilterActive && (
								<button
									onClick={handleClearOutfit}
									className="h-9 px-2.5 hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10 hover:text-neutral-950 dark:hover:text-white duration-100"
								>
									<X />
								</button>
							)}
						</div>
						<Select.Portal>
							<Select.Content className="z-99999 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/5 shadow-lg data-[state=open]:animate-fade-in">
								<Select.ScrollUpButton className="absolute z-9999 top-0 left-0 right-0 flex justify-center bg-linear-to-b from-white/75 dark:from-neutral-950/75 text-neutral-950 dark:text-white">
									<ChevronUp />
								</Select.ScrollUpButton>
								<Select.Viewport className="p-1">
									<Select.Group>
										{props.outfits.docs.map((outfit) => (
											<SelectItem key={outfit.id} value={outfit.slug}>
												{outfit.name}
											</SelectItem>
										))}
									</Select.Group>
								</Select.Viewport>
								<Select.ScrollDownButton className="absolute z-9999 bottom-0 left-0 right-0 flex justify-center bg-linear-to-t from-white/75 dark:from-neutral-950/75 text-neutral-950 dark:text-white">
									<ChevronDown />
								</Select.ScrollDownButton>
							</Select.Content>
						</Select.Portal>
					</Select.Root>
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
