"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { usePathname, useRouter } from "src/navigation";
import { easings, useTransition, a } from "@react-spring/web";
import NsfwDialog from "./nsfwDialog";
import Checkbox from "src/components/ui/Checkbox";
import { Dialog } from "@radix-ui/react-dialog";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Select from "@radix-ui/react-select";
import { useTranslations } from "next-intl";

import { Check, ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { Artists } from "src/types/artist";

function Filters(props: { nsfw?: string; artist?: string; artists: Artists }) {
	const t = useTranslations("MINA");
	const searchParams = useSearchParams();
	const nsfw = props.nsfw == "show" ? true : false;
	const [filtersOpen, setFiltersOpen] = useState(false);
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
				className="group relative flex items-center gap-3 pr-2 pl-2 data-[highlighted]:pl-3 h-8 rounded-sm leading-none select-none outline-none data-[disabled]:text-neutral data-[disabled]:pointer-events-none data-[highlighted]:text-neutral-50 data-[state=checked]:text-neutral-50 data-[highlighted]:bg-neutral-50/10 active:opacity-75 duration-100 cursor-pointer focus-visible:outline-none"
			>
				<Select.ItemText className="flex-grow">{props.children}</Select.ItemText>
				<Select.ItemIndicator className="ml-auto">
					<Check size={16} />
				</Select.ItemIndicator>
			</Select.Item>
		);
	}

	const nsfwActive = props.nsfw == "show";
	const artistFilterActive = props.artist ? props.artists.data.some((a) => a.attributes.name === props.artist) : false;

	return (
		<>
			<Collapsible.Root
				open={filtersOpen}
				onOpenChange={setFiltersOpen}
				className="sm:flex items-center mb-3 w-full sm:w-fit bg-transparent border data-[state=closed]:border-neutral-900 data-[state=open]:border-neutral-800 rounded-lg overflow-hidden duration-100"
			>
				<Collapsible.Trigger asChild>
					<button
						className="h-9 w-full sm:w-max px-4 text-neutral-50 hover:bg-neutral-900 data-[state=open]:bg-neutral-900 data-[state=open]:hover:bg-neutral-800 active:shadow-inner active:opacity-75 disabled:text-neutral-800 disabled:bg-transparent duration-100 focus-visible:bg-neutral-900"
						onClick={() => setFiltersOpen(!filtersOpen)}
					>
						<span className="flex gap-3 items-center justify-center font-medium">
							<Filter
								size={16}
								className={`${nsfwActive || artistFilterActive ? "fill-neutral-50" : "fill-transparent"} duration-100`}
							/>
							{t("Content.Artworks.Filters.button")}
						</span>
					</button>
				</Collapsible.Trigger>
				<Collapsible.Content className="data-[state=open]:animate-collapsible-vertical-open sm:data-[state=open]:animate-collapsible-horizontal-open data-[state=closed]:animate-collapsible-vertical-close sm:data-[state=closed]:animate-collapsible-horizontal-close whitespace-nowrap overflow-clip">
					<div className="flex items-center border-t sm:border-t-0 border-neutral-800">
						<div className="flex items-center gap-3 h-9 px-3 border-x border-neutral-800">
							<Checkbox id="nsfw" checked={nsfw} onCheckedChange={handleNsfw} />
							<label htmlFor="nsfw">{t("Content.NSFW.checkbox")}</label>
						</div>
						<div className="w-full sm:w-48 gap-3">
							<Select.Root value={props.artist} onValueChange={handleSelectArtist}>
								<div className="flex w-full">
									<Select.Trigger
										className={`group flex items-center justify-between px-3 h-9 w-full ${
											props.artist != "undefined" && "rounded-r-none"
										} hover:bg-neutral-800 hover:text-neutral-50 active:shadow-inner duration-100`}
										aria-label="Artist"
									>
										<Select.Value aria-label={props.artist}>
											{artistFilterActive ? props.artist : t("Content.Artworks.Filters.artist")}
										</Select.Value>
										<Select.Icon className="ml-auto group-hover:translate-y-0.5 duration-100">
											<ChevronDown size={16} />
										</Select.Icon>
									</Select.Trigger>
									{artistFilterActive && (
										<button
											onClick={handleClearArtist}
											className="h-9 px-2.5 hover:bg-neutral-800 hover:text-neutral-50 active:shadow-inner active:opacity-75 duration-100"
										>
											<X size={16} />
										</button>
									)}
								</div>
								<Select.Portal>
									<Select.Content className="z-50 text-neutral p-1 backdrop-blur-xl bg-gradient-to-b from-neutral-900/75 to-neutral-900/75 border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 shadow-xl shadow-neutral-950/50 rounded-lg data-[state=open]:animate-select-open">
										<Select.ScrollUpButton className="absolute z-50 top-0 left-0 right-0 flex justify-center bg-gradient-to-b from-neutral-900/50 text-neutral-50 rounded-t-md">
											<ChevronUp size={16} />
										</Select.ScrollUpButton>
										<Select.Viewport className="p-1">
											<Select.Group>
												{props.artists.data
													.sort((a, b) =>
														a.attributes.name.localeCompare(b.attributes.name, undefined, { sensitivity: "base" })
													)
													.map((artist) => (
														<SelectItem key={artist.id} value={artist.attributes.name}>
															{artist.attributes.name}
														</SelectItem>
													))}
											</Select.Group>
										</Select.Viewport>
										<Select.ScrollDownButton className="absolute z-50 bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-neutral-900/50 text-neutral-50 rounded-b-md">
											<ChevronDown size={16} />
										</Select.ScrollDownButton>
									</Select.Content>
								</Select.Portal>
							</Select.Root>
						</div>
					</div>
				</Collapsible.Content>
			</Collapsible.Root>
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				{dialogTransitions((styles, item) =>
					item ? (
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
