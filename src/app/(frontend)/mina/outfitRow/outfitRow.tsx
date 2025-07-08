"use client";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import * as m from "motion/react-m";
import { useTranslations } from "next-intl";
import * as Dialog from "@radix-ui/react-dialog";
import FadingImage from "@/components/ui/FadingImage";

import Error from "@/icons/Error";
import { PaginatedDocs } from "payload";
import { Artwork, Mina, Outfit } from "@/payload-types";
import { Media } from "@/components/Media";
import { AnimatePresence } from "motion/react";
import Button from "@/components/ui/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function OutfitRow({ outfits }: { outfits: PaginatedDocs<Outfit> }) {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	function CyclingFrontBackRef({
		referenceFront,
		referenceBack,
	}: {
		referenceFront: string | Artwork;
		referenceBack: string | Artwork;
	}) {
		const [showBack, setShowBack] = useState(false);
		useEffect(() => {
			const interval = setInterval(() => {
				setShowBack(!showBack);
			}, 7000);
			return () => clearInterval(interval);
		}, [showBack]);

		return (
			<div>
				<AnimatePresence mode="wait">
					{showBack ? (
						<m.div
							key="mina.back"
							className="h-full w-4/5 object-contain mx-auto"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<Media
								resource={referenceBack}
								alt={(typeof referenceBack === "object" && referenceBack.alt) || ""}
								className="size-full object-contain"
							/>
						</m.div>
					) : (
						<m.div
							key="mina.front"
							className="h-full w-4/5 object-contain mx-auto"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<Media
								resource={referenceFront}
								alt={(typeof referenceFront === "object" && referenceFront.alt) || ""}
								className="size-full object-contain"
							/>
						</m.div>
					)}
				</AnimatePresence>
				<div className="relative h-px mt-9 overflow-clip bg-black/5 dark:bg-white/5">
					<AnimatePresence mode="wait">
						<m.div
							key={showBack ? "true" : "false"}
							className="absolute inset-0 bg-neutral-950 dark:bg-white"
							initial={{ width: "0%" }}
							animate={{ width: "100%", transition: { duration: 6.5, delay: 0.25, ease: "easeInOut" } }}
							exit={{ opacity: 0 }}
						/>
					</AnimatePresence>
				</div>
			</div>
		);
	}

	function handleSelectOutfit(outfit: string) {
		const params = new URLSearchParams(searchParams);
		params.set("outfit", outfit);
		params.delete("p"); // Otherwise you may end up on a page with no results.
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	// Detail cards.
	function InfoDialog({
		title,
		slug,
		description,
		referenceFront,
		referenceBack,
		col,
	}: {
		title: string;
		slug: string;
		description: string;
		referenceFront: string | Artwork;
		referenceBack: string | Artwork;
		col?: boolean;
	}) {
		return (
			<Dialog.Portal>
				<Dialog.Overlay className="bg-white/90 dark:bg-neutral-950/90 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-100" />
				<Dialog.Content
					className={`fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-svh md:h-auto w-screen max-w-6xl max-h-screen bg-white dark:bg-neutral-950 md:outline outline-1 outline-black/5 dark:outline-white/5 data-[state=open]:animate-dialog-enter data-[state=closed]:animate-dialog-exit origin-center shadow-2xl ${
						!col && "md:grid grid-cols-2 items-center"
					} overflow-auto`}
				>
					<div
						className={`flex gap-6 p-9 items-center justify-center ${
							!col && "md:border-r border-black/5 dark:border-white/5"
						}`}
					>
						<CyclingFrontBackRef referenceFront={referenceFront} referenceBack={referenceBack} />
					</div>
					<div className="p-6 md:p-9">
						<Dialog.Title asChild>
							<h2>
								{title}
								<span className="text-green">.</span>
							</h2>
						</Dialog.Title>
						<Dialog.Description>{description}</Dialog.Description>
						<Dialog.Close asChild className="mt-9">
							<Button design="semi-transparent" onClick={() => handleSelectOutfit(slug)}>
								Show artworks featuring this outfit
							</Button>
						</Dialog.Close>
					</div>
					<Dialog.Close asChild>
						<button
							className="absolute top-0 right-0 inline-flex p-3 items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10 hover:text-neutral-950 dark:hover:text-white duration-100 active:duration-75"
							aria-label="Close"
						>
							<Error />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		);
	}

	return (
		<>
			<div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 md:max-h-[800px]">
				{outfits.docs.map((outfit, _) => (
					<Dialog.Root key={outfit.id}>
						<Dialog.Trigger asChild>
							<button
								id={outfit.name}
								className="group relative row-span-2 duration-200 active:duration-75 active:p-2"
							>
								<div className="size-full flex items-center justify-center group-hover:bg-black/5 dark:group-hover:bg-white/5 duration-200 group-active:duration-75 p-3 group-active:p-1">
									<Media
										resource={outfit.referenceFront}
										size="hd"
										className="relative size-full"
										imgClassName="size-full object-contain group-focus-visible/button:animate-pulse"
									/>
								</div>
							</button>
						</Dialog.Trigger>
						<InfoDialog
							title={outfit.name}
							slug={outfit.slug}
							description={outfit.description}
							// ! because in the suspense we're already only fetching
							// outfits that have both front and back reference images.
							referenceFront={outfit.referenceFront!}
							referenceBack={outfit.referenceBack!}
						/>
					</Dialog.Root>
				))}
			</div>
		</>
	);
}
