"use client";
import { useEffect, useState } from "react";
import * as m from "motion/react-m";
import { useTranslations } from "next-intl";
import * as Dialog from "@radix-ui/react-dialog";

import Error from "@/icons/Error";
import { PaginatedDocs } from "payload";
import { Artist, Artwork, Mina, Outfit } from "@/payload-types";
import { Media } from "@/components/Media";
import { AnimatePresence } from "motion/react";
import Button from "@/components/ui/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OutfitRow({ outfits }: { outfits: PaginatedDocs<Outfit> }) {
	const t = useTranslations("MINA");
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
		const [hovered, setHovered] = useState(false);
		useEffect(() => {
			if (hovered) return;

			const interval = setInterval(() => {
				setShowBack(!showBack);
			}, 7000);

			return () => clearInterval(interval);
		}, [showBack, hovered]);

		return (
			<div className="size-full" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
				<AnimatePresence mode="wait">
					<m.div
						className="size-full -mb-9"
						key={showBack ? "back" : "front"}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<Media
							resource={showBack ? referenceBack : referenceFront}
							alt={
								(typeof referenceBack === "object" && referenceBack.alt) ||
								(typeof referenceFront === "object" && referenceFront.alt) ||
								""
							}
							size="fhd"
							className="size-full p-6 pb-12"
							imgClassName="size-full object-contain"
						/>
					</m.div>
				</AnimatePresence>
				<div className="grid grid-cols-2 text-sm h-9 border-y md:border-b-0 border-black/5 dark:border-white/5">
					<div
						onClick={() => setShowBack(false)}
						className="relative group cursor-pointer flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 duration-100"
					>
						<div
							className={`${
								!showBack
									? "font-bold text-neutral-950 dark:text-white"
									: "group-hover:text-neutral-950 dark:group-hover:text-white"
							}`}
						>
							{t("Content.Outfits.front")}
						</div>
						<AnimatePresence mode="wait">
							{!hovered && (
								<m.div
									key={showBack ? "back" : "front"}
									className="absolute inset-0 bg-neutral-950/5 dark:bg-white/5"
									initial={{ width: "0%" }}
									animate={{
										width: !showBack ? "100%" : "0%",
										transition: { duration: 6.5, delay: 0.25, ease: "easeInOut" },
									}}
									exit={{ opacity: 0 }}
								/>
							)}
						</AnimatePresence>
					</div>
					<div
						onClick={() => setShowBack(true)}
						className="relative group cursor-pointer flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 duration-100"
					>
						<div
							className={`${
								showBack
									? "font-bold text-neutral-950 dark:text-white"
									: "group-hover:text-neutral-950 dark:group-hover:text-white"
							}`}
						>
							{t("Content.Outfits.back")}
						</div>
						<AnimatePresence mode="wait">
							{!hovered && (
								<m.div
									key={showBack ? "true" : "false"}
									className="absolute inset-0 bg-neutral-950/5 dark:bg-white/5"
									initial={{ width: "0%" }}
									animate={{
										width: showBack ? "100%" : "0%",
										transition: { duration: 6.5, delay: 0.25, ease: "easeInOut" },
									}}
									exit={{ opacity: 0 }}
								/>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		);
	}

	function handleSelectOutfit(outfit: string) {
		const params = new URLSearchParams(searchParams);
		params.set("outfit", outfit);
		params.delete("p"); // Otherwise you may end up on a page with no results.
		replace(`${pathname}?${params.toString()}`, { scroll: false });

		setTimeout(() => {
			const gallerySection = document.getElementById("gallery");
			if (gallerySection) {
				scrollTo({
					top: gallerySection.getBoundingClientRect().top + scrollY - 140,
					behavior: "smooth",
				});
			}
		}, 150);
	}

	function InfoDialog({
		title,
		slug,
		designer,
		description,
		referenceFront,
		referenceBack,
	}: {
		title: string;
		slug: string;
		designer: string | Artist;
		description: string;
		referenceFront: string | Artwork;
		referenceBack: string | Artwork;
	}) {
		return (
			<Dialog.Portal>
				<Dialog.Overlay className="bg-white/90 dark:bg-neutral-950/90 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-100" />
				<Dialog.Content className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-svh md:h-auto md:max-h-[80vh] w-screen max-w-6xl max-h-screen bg-white dark:bg-neutral-950 md:outline-solid outline-1 outline-black/5 dark:outline-white/5 data-[state=open]:animate-dialog-enter data-[state=closed]:animate-dialog-exit origin-center shadow-2xl md:grid grid-cols-2 items-center overflow-auto">
					<div className="relative h-full max-h-2/3-screen md:max-h-[80vh] md:border-r border-black/5 dark:border-white/5">
						<CyclingFrontBackRef referenceFront={referenceFront} referenceBack={referenceBack} />
					</div>
					<div className="p-6 md:p-9">
						<Dialog.Title asChild>
							<h2>
								{title}
								<span className="text-green">.</span>
							</h2>
						</Dialog.Title>
						{typeof designer === "object" && designer.creditLinks && designer.creditLinks.length > 0 ? (
							<p className="text-lg text-neutral-950 dark:text-white">
								{t.rich("Content.Outfits.designedBy", {
									designer: typeof designer === "object" && designer.name || "",
									Link: (chunks) => (
										<Link
											className="text-link-external"
											href={(typeof designer === "object" &&  designer.creditLinks && designer.creditLinks[0].url) || ""}
											target="_blank"
											rel="noopener noreferrer"
										>
											{chunks}
										</Link>
									),
								})}
							</p>
						) : (
							<p className="text-lg text-neutral-950 dark:text-white">
								{t.rich("Content.Outfits.designedBy", {
									designer: typeof designer === "object" && designer.name || "",
									Link: (chunks) => <span>{chunks}</span>,
								})}
							</p>
						)}
						<Dialog.Description className="mb-9">{description}</Dialog.Description>
						<Dialog.Close asChild>
							<Button design="semi-transparent" onClick={() => handleSelectOutfit(slug)}>
								{t("Content.Outfits.showArtworksFeaturingOutfit")}
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
			<div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 md:max-h-[800px] border-y border-black/5 dark:border-white/5 backdrop-blur-xs">
				{outfits.docs.map((outfit, _) => (
					<Dialog.Root key={outfit.id}>
						<Dialog.Trigger asChild>
							<button
								id={outfit.name}
								className="group relative w-full aspect-1/2 duration-200 active:duration-75 active:p-2"
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
							designer={outfit.designer}
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
