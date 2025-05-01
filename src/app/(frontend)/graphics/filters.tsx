"use client";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Stop from "@/icons/Stop";
import Photo from "@/icons/Photo";
import Video from "@/icons/Video";
import Cube from "@/icons/Cube";
import Fullscreen from "@/icons/Fullscreen";

export default function Filters(props: { type: string; dimension: string }) {
	const t = useTranslations("GRAPHICS");
	const searchParams = useSearchParams();
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

	return (
		<div className="flex flex-col sm:flex-row items-center w-full border-t border-black/5 dark:border-white/5">
			<div className="grid grid-cols-2 w-full sm:w-64 border-b sm:border-b-0 sm:border-r border-black/5 dark:border-white/5">
				<button
					onClick={() => handleSelectDimension("2d")}
					className={`flex gap-3 items-center justify-center w-full h-9 ${
						props.dimension == "2d"
							? "font-semibold text-white dark:text-neutral-950 bg-neutral-950 dark:bg-white hover:bg-neutral-900 dark:hover:bg-neutral-50 active:bg-neutral-800 dark:active:bg-neutral-100"
							: "hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-950 dark:hover:text-white"
					} active:shadow-inner duration-100`}
				>
					<Stop className="duration-100" />
					2D
				</button>
				<button
					onClick={() => handleSelectDimension("3d")}
					className={`flex gap-3 items-center justify-center w-full h-9 ${
						props.dimension == "3d"
							? "font-semibold text-white dark:text-neutral-950 bg-neutral-950 dark:bg-white hover:bg-neutral-900 dark:hover:bg-neutral-50 active:bg-neutral-800 dark:active:bg-neutral-100"
							: "hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-950 dark:hover:text-white"
					} active:shadow-inner duration-100`}
				>
					<Cube className="duration-100" />
					3D
				</button>
			</div>
			<div className="grid grid-cols-2 w-full sm:w-64 sm:border-r border-black/5 dark:border-white/5">
				<button
					onClick={() => handleSelectType("static")}
					className={`flex gap-3 items-center justify-center w-full h-9 ${
						props.type == "static"
							? "font-semibold text-white dark:text-neutral-950 bg-neutral-950 dark:bg-white hover:bg-neutral-900 dark:hover:bg-neutral-50 active:bg-neutral-800 dark:active:bg-neutral-100"
							: "hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-950 dark:hover:text-white"
					} active:shadow-inner duration-100`}
				>
					<Photo className="duration-100" />
					{t("Content.Filters.Type.static")}
				</button>
				<button
					onClick={() => handleSelectType("animated")}
					className={`flex gap-3 items-center justify-center w-full h-9 ${
						props.type == "animated"
							? "font-semibold text-white dark:text-neutral-950 bg-neutral-950 dark:bg-white hover:bg-neutral-900 dark:hover:bg-neutral-50 active:bg-neutral-800 dark:active:bg-neutral-100"
							: "hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-950 dark:hover:text-white"
					} active:shadow-inner duration-100`}
				>
					<Video className="duration-100" />
					{t("Content.Filters.Type.animated")}
				</button>
			</div>
		</div>
	);
}
