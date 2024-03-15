"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { usePathname, useRouter } from "src/navigation";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Select from "@radix-ui/react-select";
import { useTranslations } from "next-intl";

import { Check, ChevronDown, ChevronUp, Filter, X } from "lucide-react";

function Filters(props: { type?: string; dimension?: string }) {
	const t = useTranslations("GALLERY");
	const searchParams = useSearchParams();
	const [filtersOpen, setFiltersOpen] = useState(false);
	const pathname = usePathname();
	const { replace } = useRouter();

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

	return (
		<>
			<Collapsible.Root
				open={filtersOpen}
				onOpenChange={setFiltersOpen}
				className="flex items-center mb-3 w-fit bg-transparent border border-neutral-900 rounded-lg overflow-hidden duration-100"
			>
				<Collapsible.Trigger asChild>
					<button
						className="h-9 px-4 text-neutral-50 hover:bg-neutral-900 data-[state=open]:bg-neutral-900 data-[state=open]:hover:bg-neutral-800 active:shadow-inner active:opacity-75 disabled:text-neutral-800 disabled:bg-transparent duration-100 focus-visible:bg-neutral-900"
						onClick={() => setFiltersOpen(!filtersOpen)}
					>
						<span className="flex gap-3 items-center font-medium">
							<Filter
								size={16}
								className={`${
									props.type || props.dimension != "undefined" ? "fill-neutral-50" : "fill-transparent"
								} duration-100`}
							/>
							{t("Content.Filters.button")}
						</span>
					</button>
				</Collapsible.Trigger>
				<Collapsible.Content className="data-[state=open]:animate-collapsible-open data-[state=closed]:animate-collapsible-close whitespace-nowrap overflow-clip">
					<div className="flex items-center divide-x divide-neutral-900">
						<div className="flex items-center gap-3 mx-3">
							
						</div>
					</div>
				</Collapsible.Content>
			</Collapsible.Root>
		</>
	);
}

export default dynamic(() => Promise.resolve(Filters), {
	ssr: false,
});
