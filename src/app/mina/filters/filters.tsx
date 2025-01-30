"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { easings, useTransition, a } from "@react-spring/web";
import NsfwDialog from "./nsfwDialog";
import Checkbox from "src/components/ui/Checkbox";
import { Dialog } from "@radix-ui/react-dialog";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Select from "@radix-ui/react-select";
import { useTranslations } from "next-intl";

import { Artists } from "src/types/artist";
import Check from "src/icons/Check";
import Filter from "src/icons/Filter";
import FilterFilled from "src/icons/FilterFilled";
import ChevronDown from "src/icons/ChevronDown";
import ChevronUp from "src/icons/ChevronUp";
import X from "src/icons/X";

function Filters(props: { nsfw?: string; artist?: string; artists: Artists }) {
	const t = useTranslations("MINA");
	const searchParams = useSearchParams();
	const nsfw = props.nsfw === "show";
	const pathname = usePathname();
	const { replace } = useRouter();
	const seenNsfwDialog = localStorage.getItem("confirmedNsfwDialog");
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

	const [dialogOpen, setDialogOpen] = useState(false);

	const dialogTransitions = useTransition(dialogOpen, {
		from: { opacity: 0 },
		enter: {
			opacity: 1,
			config: {
				easing: easings.easeOutCubic,
				duration: 200,
			},
		},
		leave: {
			opacity: 0,
			config: {
				easing: easings.easeOutCubic,
				duration: 200,
			},
		},
	});

	// For dropdowns.
	function SelectItem(props: React.PropsWithChildren<{ value: string }>) {
		return (
			<Select.Item
				value={props.value}
				className="group relative flex items-center gap-3 pr-2 pl-2 data-[highlighted]:pl-3 h-8 rounded-sm leading-none select-none outline-none data-[disabled]:text-neutral data-[disabled]:pointer-events-none data-[highlighted]:text-neutral-950 dark:data-[highlighted]:text-white data-[state=checked]:text-neutral-950 dark:data-[state=checked]:text-white data-[highlighted]:bg-black/10 dark:data-[highlighted]:bg-white/10 active:opacity-75 duration-100 cursor-pointer focus-visible:outline-none"
			>
				<Select.ItemText className="flex-grow">{props.children}</Select.ItemText>
				<Select.ItemIndicator className="ml-auto">
					<Check />
				</Select.ItemIndicator>
			</Select.Item>
		);
	}

	const artistFilterActive = props.artist ? props.artists.data.some((a) => a.name === props.artist) : false;

	return (
		<>
			<div className="flex w-full border-t border-black/5 dark:border-white/5">
				<div className="flex items-center grow">
					<div className="flex items-center gap-3 h-9 px-3 w-max border-r border-black/5 dark:border-white/5">
						<Checkbox id="nsfw" checked={nsfw} onCheckedChange={handleNsfw} />
						<label htmlFor="nsfw">{t("Content.NSFW.checkbox")}</label>
					</div>
					<div className="w-full sm:w-48 gap-3 sm:border-r border-black/5 dark:border-white/5">
						<Select.Root value={props.artist} onValueChange={handleSelectArtist}>
							<div className="flex w-full">
								<Select.Trigger
									className={`group flex items-center justify-between px-3 h-9 w-full ${
										props.artist != "" && "rounded-r-none"
									} hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-950 dark:hover:text-white active:shadow-inner duration-100`}
									aria-label="Artist"
								>
									<Select.Value aria-label={props.artist}>
										{artistFilterActive ? props.artist : t("Content.Artworks.Filters.artist")}
									</Select.Value>
									<Select.Icon className="ml-auto group-hover:translate-y-0.5 duration-100">
										<ChevronDown />
									</Select.Icon>
								</Select.Trigger>
								{artistFilterActive && (
									<button
										onClick={handleClearArtist}
										className="h-9 px-2.5 hover:bg-neutral-900 hover:text-white active:shadow-inner active:opacity-75 duration-100"
									>
										<X />
									</button>
								)}
							</div>
							<Select.Portal>
								<Select.Content className="z-50 text-neutral p-1 backdrop-blur-xl bg-gradient-to-b from-white/90 dark:from-neutral-900/90 to-white/80 dark:to-bg-neutral-900/80 border border-white/10 ring-1 ring-black/10 dark:ring-black/50 shadow-lg rounded-lg data-[state=open]:animate-select-open">
									<Select.ScrollUpButton className="absolute z-50 top-0 left-0 right-0 flex justify-center bg-gradient-to-b from-white/50 dark:from-neutral-900/50 text-neutral-950 dark:text-white rounded-t-md">
										<ChevronUp />
									</Select.ScrollUpButton>
									<Select.Viewport className="p-1">
										<Select.Group>
											{props.artists.data
												.sort((a, b) =>
													a.name.localeCompare(b.name, undefined, {
														sensitivity: "base",
													})
												)
												.map((artist) => (
													<SelectItem key={artist.id} value={artist.name}>
														{artist.name}
													</SelectItem>
												))}
										</Select.Group>
									</Select.Viewport>
									<Select.ScrollDownButton className="absolute z-50 bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-white/50 dark:from-neutral-900/50 text-neutral-950 dark:text-white rounded-b-md">
										<ChevronDown />
									</Select.ScrollDownButton>
								</Select.Content>
							</Select.Portal>
						</Select.Root>
					</div>
				</div>
				<div className="hidden sm:flex items-center justify-end px-3 text-sm">
					Showing X of Y results.
				</div>
			</div>
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				{dialogTransitions((styles, item) =>
					item ? (
						// @ts-expect-error
						<a.div style={styles} className="fixed inset-0 z-100">
							<NsfwDialog onAccept={handleDialogAccept} />
						</a.div>
					) : null
				)}
			</Dialog>
		</>
	);
}

export default dynamic(() => Promise.resolve(Filters), {
	ssr: false,
});
