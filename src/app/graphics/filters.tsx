"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useTranslations } from "next-intl";
import Filter from "src/icons/Filter";
import Stop from "src/icons/Stop";
import Photo from "src/icons/Photo";
import Video from "src/icons/Video";
import Cube from "src/icons/Cube";
import FilterFilled from "src/icons/FilterFilled";

export default function Filters(props: { type: string; dimension: string }) {
	const t = useTranslations("GRAPHICS");
	const searchParams = useSearchParams();
	const [filtersOpen, setFiltersOpen] = useState(false);
	const pathname = usePathname();
	const { replace } = useRouter();

	function handleSelectDimension(dimension: string) {
		const params = new URLSearchParams(searchParams);
		if (props.dimension == dimension) {
			params.delete("dimension");
		} else {
			params.set("dimension", dimension);
		}
		params.delete("p"); // Otherwise you may end up on a page with no results.
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	}
	function handleSelectType(type: string) {
		const params = new URLSearchParams(searchParams);
		if (props.type == type) {
			params.delete("type");
		} else {
			params.set("type", type);
		}
		params.delete("p"); // Otherwise you may end up on a page with no results.
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	const filtersActive =
		(props.dimension && (props.dimension === "2d" || props.dimension === "3d") && props.type) ||
		props.type === "static" ||
		props.type === "animated";

	return (
		<div className="flex flex-col sm:flex-row items-center w-full border-t border-black/5 dark:border-white/5">
			<div className="grid grid-cols-2 w-full sm:w-64 border-b sm:border-b-0 sm:border-r border-black/5 dark:border-white/5">
				<button
					onClick={() => handleSelectDimension("2d")}
					className={`flex gap-3 items-center justify-center w-full h-9 ${
						props.dimension == "2d"
							? "font-semibold text-neutral-950 dark:text-white bg-black/5 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10"
							: "hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-950 dark:hover:text-white"
					} active:shadow-inner active:opacity-75 duration-100`}
				>
					<Stop className={`${props.dimension == "2d" ? "fill-neutral-950 dark:fill-white" : "fill-current"} duration-100`} />
					2D
				</button>
				<button
					onClick={() => handleSelectDimension("3d")}
					className={`flex gap-3 items-center justify-center w-full h-9 ${
						props.dimension == "3d"
							? "font-semibold text-neutral-950 dark:text-white bg-black/5 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10"
							: "hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-950 dark:hover:text-white"
					} active:shadow-inner active:opacity-75 duration-100`}
				>
					<Cube className={`${props.dimension == "3d" ? "fill-neutral-950 dark:fill-white" : "fill-current"} duration-100`} />
					3D
				</button>
			</div>
			<div className="grid grid-cols-2 w-full sm:w-64 sm:border-r border-black/5 dark:border-white/5">
				<button
					onClick={() => handleSelectType("static")}
					className={`flex gap-3 items-center justify-center w-full h-9 ${
						props.type == "static"
							? "font-semibold text-neutral-950 dark:text-white bg-black/5 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10"
							: "hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-950 dark:hover:text-white"
					} active:shadow-inner active:opacity-75 duration-100`}
				>
					<Photo className={`${props.type == "static" ? "fill-neutral-950 dark:fill-white" : "fill-current"} duration-100`} />
					{t("Content.Filters.Type.static")}
				</button>
				<button
					onClick={() => handleSelectType("animated")}
					className={`flex gap-3 items-center justify-center w-full h-9 ${
						props.type == "animated"
							? "font-semibold text-neutral-950 dark:text-white bg-black/5 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10"
							: "hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-950 dark:hover:text-white"
					} active:shadow-inner active:opacity-75 duration-100`}
				>
					<Video className={`${props.type == "animated" ? "fill-neutral-950 dark:fill-white" : "fill-current"} duration-100`} />
					{t("Content.Filters.Type.animated")}
				</button>
			</div>
		</div>
	);
}
