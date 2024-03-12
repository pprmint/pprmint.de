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

import { Filter } from "lucide-react";

function Filters(props: { nsfw?: string; artist?: string; artists: string[] }) {
	const t = useTranslations("MINA");
	const searchParams = useSearchParams();
	const nsfw = props.nsfw == "show" ? true : false;
	const artist = props.artist == "undefined" ? undefined : props;
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
					<i className="ri-check-line" />
				</Select.ItemIndicator>
			</Select.Item>
		);
	}

	return (
		<>
			<Collapsible.Root
				open={filtersOpen}
				onOpenChange={setFiltersOpen}
				className="flex items-center mb-3 w-fit bg-transparent border border-neutral-900 data-[state=open]: rounded-lg overflow-hidden duration-100"
			>
				<Collapsible.Trigger asChild>
					<button
						className="h-10 px-4 text-neutral-50 hover:bg-neutral-900 data-[state=open]:bg-neutral-900 data-[state=open]:hover:bg-neutral-800 active:shadow-inner active:opacity-75 disabled:text-neutral-800 disabled:bg-transparent duration-100"
						onClick={() => setFiltersOpen(!filtersOpen)}
					>
						<span className="flex gap-3 items-center font-medium">
							<Filter size={16} className={`${nsfw || artist ? "fill-neutral-50" : "fill-transparent"} duration-100`} />
							{t("Content.Artworks.Filters.button")}
						</span>
					</button>
				</Collapsible.Trigger>
				<Collapsible.Content className="data-[state=open]:animate-collapsible-open data-[state=closed]:animate-collapsible-close whitespace-nowrap overflow-clip">
					<div className="h-9 inline-flex gap-3 mx-3 w-max">
						<Checkbox id="nsfw" checked={nsfw} onCheckedChange={handleNsfw} />
						<label htmlFor="nsfw">{t("Content.NSFW.checkbox")}</label>
					</div>
					<div className="inline-flex gap-3 items-center mx-3 w-max">
						<Select.Root value={artist ? props.artist : undefined} onValueChange={handleSelectArtist}>
							<div className="flex w-48">
								<Select.Trigger
									className={`group flex items-center justify-between rounded-md leading-none px-3 h-9 w-full ${
										artist && "rounded-r-none"
									} hover:bg-neutral-800 hover:text-neutral-50 duration-100`}
									aria-label="Artist"
								>
									<Select.Value aria-label={props.artist} placeholder={t("Content.Artworks.Filters.artist")} />
									<Select.Icon className="ml-auto group-hover:translate-y-0.5 duration-100">
										<i className="ri-arrow-down-s-line" />
									</Select.Icon>
								</Select.Trigger>
								{artist && (
									<button
										onClick={handleClearArtist}
										className="h-9 px-2.5 rounded-r-md hover:bg-neutral-800 hover:text-neutral-50 duration-100"
									>
										<i className="ri-close-line" />
									</button>
								)}
							</div>
							<Select.Portal>
								<Select.Content className="z-50 text-neutral p-1 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 shadow-xl shadow-neutral-950/50 rounded-lg data-[state=open]:animate-select-open">
									<Select.ScrollUpButton className="absolute z-50 top-0 left-0 right-0 flex justify-center bg-gradient-to-b from-neutral-900/50 text-neutral-50 rounded-t-md">
										<i className="ri-arrow-up-s-line" />
									</Select.ScrollUpButton>
									<Select.Viewport className="p-1">
										<Select.Group>
											{props.artists
												.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
												.map((artist) => (
													<SelectItem key={artist} value={artist}>
														{artist}
													</SelectItem>
												))}
										</Select.Group>
									</Select.Viewport>
									<Select.ScrollDownButton className="absolute z-50 bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-neutral-900/50 text-neutral-50 rounded-b-md">
										<i className="ri-arrow-down-s-line" />
									</Select.ScrollDownButton>
								</Select.Content>
							</Select.Portal>
						</Select.Root>
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
