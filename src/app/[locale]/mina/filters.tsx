"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { usePathname, useRouter } from "src/navigation";
import NsfwDialog from "./nsfwDialog";

export default function Filters({
	searchParams,
}: {
	searchParams?: {
		p?: string;
		nsfw?: string;
		artist?: string;
	};
}) {
    const pathname = usePathname();
	const { replace } = useRouter();
	function handleNsfw() {
		const params = new URLSearchParams(searchParams);
		const seenNsfwDialog = localStorage.getItem("confirmedNsfwDialog");
        const nsfw = String(searchParams?.nsfw) || "show";
		if (!nsfw) {
			if (!seenNsfwDialog) {
				setDialogOpen(true);
			} else {
				localStorage.setItem("horny", "came back for more, eh?");
				params.set("nsfw", "show");
			}
		} else {
			localStorage.removeItem("horny");
			params.delete("nsfw");
		}
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<div className="flex gap-2 justify-center w-full">
				<button
					className={`size-10 rounded-full text-lg text-neutral-50 hover:bg-neutral-800 active:bg-neutral-900 disabled:text-neutral-800 disabled:bg-transparent duration-100`}
					onClick={() => handleNsfw()}
				>
					<i className="ri-arrow-left-s-line" />
				</button>
			</div>
			<NsfwDialog open={dialogOpen} />
		</>
	);
}
