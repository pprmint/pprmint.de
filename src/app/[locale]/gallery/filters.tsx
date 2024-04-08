"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { usePathname, useRouter } from "src/navigation";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useTranslations } from "next-intl";

// eslint-disable-next-line jsx-a11y/alt-text
import { Box, Film, Filter, Image, Square } from "lucide-react";

export default function Filters(props: { type: string; dimension: string }) {
	const t = useTranslations("GALLERY");
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
		<>
			<Collapsible.Root
				open={filtersOpen}
				onOpenChange={setFiltersOpen}
				className="sm:flex items-center mb-3 w-full sm:w-fit mx-auto bg-transparent border data-[state=closed]:border-neutral-900 data-[state=open]:border-neutral-800 rounded-lg overflow-hidden duration-100"
			>
				<Collapsible.Trigger asChild>
					<button
						className="h-9 w-full sm:w-max px-4 text-neutral-50 hover:bg-neutral-900 data-[state=open]:bg-neutral-900 data-[state=open]:hover:bg-neutral-800 active:shadow-inner active:opacity-75 disabled:text-neutral-800 disabled:bg-transparent duration-100 focus-visible:bg-neutral-900"
						onClick={() => setFiltersOpen(!filtersOpen)}
					>
						<span className="flex gap-3 items-center justify-center">
							<Filter size={16} className={`${filtersActive ? "fill-neutral-50" : "fill-transparent"} duration-100`} />
							{t("Content.Filters.button")}
						</span>
					</button>
				</Collapsible.Trigger>
				<Collapsible.Content className="data-[state=open]:animate-collapsible-vertical-open sm:data-[state=open]:animate-collapsible-horizontal-open data-[state=closed]:animate-collapsible-vertical-close sm:data-[state=closed]:animate-collapsible-horizontal-close whitespace-nowrap overflow-clip">
					<div className="flex flex-col sm:flex-row items-center w-full sm:w-max">
						<div className="grid grid-cols-2 w-full sm:w-64 border-y sm:border-y-0 sm:border-x border-neutral-800">
							<button
								onClick={() => handleSelectDimension("2d")}
								className={`flex gap-3 items-center justify-center w-full h-9 ${
									props.dimension == "2d"
										? "font-semibold text-neutral-50 bg-neutral-900 hover:bg-neutral-800"
										: "hover:bg-neutral-900 hover:text-neutral-50"
								} active:shadow-inner active:opacity-75 duration-100`}
							>
								<Square
									size={16}
									className={`${
										props.dimension == "2d" ? "fill-neutral-600 stroke-neutral-50" : "fill-transparent"
									} duration-100`}
								/>
								2D
							</button>
							<button
								onClick={() => handleSelectDimension("3d")}
								className={`flex gap-3 items-center justify-center w-full h-9 ${
									props.dimension == "3d"
										? "font-semibold text-neutral-50 bg-neutral-900 hover:bg-neutral-800"
										: "hover:bg-neutral-900 hover:text-neutral-50"
								} active:shadow-inner active:opacity-75 duration-100`}
							>
								<Box
									size={16}
									className={`${
										props.dimension == "3d" ? "fill-neutral-600 stroke-neutral-50" : "fill-transparent"
									} duration-100`}
								/>
								3D
							</button>
						</div>
						<div className="grid grid-cols-2 w-full sm:w-64">
							<button
								onClick={() => handleSelectType("static")}
								className={`flex gap-3 items-center justify-center w-full h-9 ${
									props.type == "static"
										? "font-semibold text-neutral-50 bg-neutral-900 hover:bg-neutral-800"
										: "hover:bg-neutral-900 hover:text-neutral-50"
								} active:shadow-inner active:opacity-75 duration-100`}
							>
								{/* eslint-disable-next-line jsx-a11y/alt-text */}
								<Image
									size={16}
									className={`${
										props.type == "static" ? "fill-neutral-600 stroke-neutral-50" : "fill-transparent"
									} duration-100`}
								/>
								{t("Content.Filters.Type.static")}
							</button>
							<button
								onClick={() => handleSelectType("animated")}
								className={`flex gap-3 items-center justify-center w-full h-9 ${
									props.type == "animated"
										? "font-semibold text-neutral-50 bg-neutral-900 hover:bg-neutral-800"
										: "hover:bg-neutral-900 hover:text-neutral-50"
								} active:shadow-inner active:opacity-75 duration-100`}
							>
								<Film
									size={16}
									className={`${
										props.type == "animated" ? "fill-neutral-600 stroke-neutral-50" : "fill-transparent"
									} duration-100`}
								/>
								{t("Content.Filters.Type.animated")}
							</button>
						</div>
					</div>
				</Collapsible.Content>
			</Collapsible.Root>
		</>
	);
}
