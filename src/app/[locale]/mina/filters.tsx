"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { usePathname, useRouter } from "src/navigation";
import NsfwDialog from "./nsfwDialog";
import { Filter } from "lucide-react";
import { easings, useTransition, a } from "@react-spring/web";
import Checkbox from "src/components/ui/Checkbox";
import { Dialog } from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

function Filters(props: { nsfw?: string; artist?: string }) {
	const t = useTranslations("MINA");
	const searchParams = useSearchParams();
	const nsfw = props.nsfw == "show" ? true : false;
	const [visible, setVisible] = useState(false);
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
			<div className="flex gap-3 items-center mb-3 w-fit bg-transparent border border-neutral-900 rounded-lg overflow-hidden">
				<button
					className={`h-10 px-4 rounded-r-lg text-neutral-50 bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-900 disabled:text-neutral-800 disabled:bg-transparent duration-100`}
					onClick={() => setVisible(!visible)}
				>
					<span className="flex gap-3 items-center">
						<Filter size={16} />
						Filters
					</span>
				</button>
				{visible && (
					<div className="flex gap-3 items-center mr-3">
						<Checkbox id="nsfw" checked={nsfw} onCheckedChange={handleNsfw} />
						<label htmlFor="nsfw">{t("Content.NSFW.checkbox")}</label>
					</div>
				)}
			</div>
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
