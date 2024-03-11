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
import { useTranslations } from "next-intl";

import { Filter } from "lucide-react";

function Filters(props: { nsfw?: string; artist?: string }) {
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

	return (
		<>
			<Collapsible.Root
				open={filtersOpen}
				onOpenChange={setFiltersOpen}
				className="group flex items-center mb-3 w-fit bg-transparent border border-neutral-900 data-[state=open]: rounded-lg overflow-hidden duration-100"
			>
				<Collapsible.Trigger asChild>
					<button
						className="h-10 px-4 text-neutral-50 hover:bg-neutral-900 data-[state=open]:bg-neutral-900 data-[state=open]:hover:bg-neutral-800 active:shadow-inner active:opacity-75 disabled:text-neutral-800 disabled:bg-transparent duration-100"
						onClick={() => setFiltersOpen(!filtersOpen)}
					>
						<span className="flex gap-3 items-center font-medium">
							<Filter
								size={16}
								className={`${nsfw || props.artist ? "fill-neutral-50" : "fill-transparent"} duration-100`}
							/>
							{t("Content.Artworks.Filters.button")}
						</span>
					</button>
				</Collapsible.Trigger>
				<Collapsible.Content className="data-[state=open]:animate-collapsible-open data-[state=closed]:animate-collapsible-close whitespace-nowrap overflow-clip">
					<div className="flex gap-3 items-center mx-3 w-max">
						<Checkbox id="nsfw" checked={nsfw} onCheckedChange={handleNsfw} />
						<label htmlFor="nsfw">{t("Content.NSFW.checkbox")}</label>
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
