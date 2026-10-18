"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import FadingImage from "@/components/ui/FadingImage";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import type { Mina } from "@/payload-types";
import * as Dialog from "@radix-ui/react-dialog";
import * as ContextMenu from "@radix-ui/react-context-menu";

import * as m from "motion/react-client";
import { AnimatePresence, eachAxis, Variants } from "motion/react";
import EyeDisabled from "@/icons/EyeDisabled";
import Link from "next/link";
import { PaginatedDocs } from "payload";
import { Media } from "@/components/Media";
import ContextMenuPortal from "./contextMenuPortal";
import { useGalleryTransition } from "@/components/gallery/GalleryTransitionContext";
import IndeterminateLoader from "@/components/loading/IndeterminateLoader";

export default function Gallery({ artworks, page }: { artworks: PaginatedDocs<Mina>; page: number }) {
	const t = useTranslations("MINA");
	const { pending } = useGalleryTransition();

	// Lightbox states.
	const [open, setOpen] = useState(false);
	const [direction, setDirection] = useState(0);
	const [xOffset, setXOffset] = useState(0);
	const [selectedArtwork, setSelectedArtwork] = useState(0);
	const [selectedVariant, setSelectedVariant] = useState(0);
	const [scale, setScale] = useState(1);

	function handleSelectArtwork({ id, offset }: { id: number; offset?: number }) {
		if (offset) {
			setXOffset(offset);
		} else {
			setXOffset(0);
		}
		setDirection(id > selectedArtwork ? 1 : -1);
		requestAnimationFrame(() => {
			setSelectedArtwork(id);
			setSelectedVariant(0);
		});
	}
	// Reset to 0 after the lightbox is closed.
	function reset(e: Event) {
		e.preventDefault();
		document.getElementById(`mina-${selectedArtwork.toString()}`)?.focus();
		setTimeout(() => {
			setSelectedArtwork(0);
			setSelectedVariant(0);
			setDirection(0);
			setXOffset(0);
			setScale(1);
		}, 200);
	}

	// Ref for gallery size to smoothly animate and scroll to.
	const galleryRef = useRef<HTMLDivElement>(null);
	const initRef = useRef(false);
	useEffect(() => {
		if (initRef.current && galleryRef.current) {
			scrollTo({
				top: galleryRef.current?.getBoundingClientRect().top + scrollY - 140,
			});
		} else {
			initRef.current = true;
		}
	}, [page]);

	// Image transitions.
	const variants: Variants = {
		enter: (direction: number) => {
			return {
				x: direction < 0 ? -120 : direction > 0 ? 120 : 0,
				scale: direction === 0 ? 0.9 : 1,
			};
		},
		center: {
			x: 0,
			scale: 1,
			opacity: 1,
			transition: {
				x: {
					type: "spring",
					duration: 0.5,
					bounce: 0,
				},
				scale: {
					type: "spring",
					duration: 0.6,
					bounce: 0,
				},
			},
		},
		exit: (direction: number) => {
			return {
				x: direction < 0 ? 120 + xOffset : -120 + xOffset,
				opacity: 0,
				transition: {
					x: {
						ease: "easeIn",
						duration: 0.15,
					},
					opacity: {
						ease: "linear",
						duration: 0.15,
					},
				},
			};
		},
	};

	// Sick of typing this over and over.
	const artists = artworks.docs[selectedArtwork].artists.filter((artist) => typeof artist === "object");
	const featuring = artworks.docs[selectedArtwork].featuring?.filter((character) => typeof character === "object");

	// Arrow keys for cycling through images.
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (scale === 1) {
				if (event.key === "ArrowLeft") {
					handleSelectArtwork({
						id: (selectedArtwork - 1 + artworks.docs.length) % artworks.docs.length,
					});
				} else if (event.key === "ArrowRight") {
					handleSelectArtwork({
						id: (selectedArtwork + 1) % artworks.docs.length,
					});
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [selectedArtwork, scale]);

	return (
		<>
			<IndeterminateLoader loading={pending} />
			<div
				ref={galleryRef}
				className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 p-1 border-y border-black/5 dark:border-white/5 ${pending && "opacity-50 saturate-0 pointer-events-none duration-200"}`}
			>
				<AnimatePresence mode="popLayout">
					<Dialog.Root open={open} onOpenChange={setOpen}>
						{artworks.docs.map((artwork, index) => (
							<ContextMenu.Root key={artwork.id}>
								<ContextMenu.Trigger asChild>
									<Dialog.Trigger asChild>
										<button
											id={`mina-${index.toString()}`}
											onClick={() => setSelectedArtwork(index)}
											className="group relative w-full aspect-square bg-white dark:bg-neutral-950 outline -outline-offset-4 hover:outline-offset-0 outline-white/5 focus-visible:z-10 hover:bg-white dark:hover:bg-neutral-900 sm:hover:shadow-xl hover:z-10 active:shadow-none focus-visible:shadow-xl duration-150 ease-out-quart active:duration-50 cursor-pointer focus-visible:animate-pulse"
										>
											<div
												className="absolute inset-1 group-hover:inset-0 group-active:inset-1 duration-150 ease-out-quart active:duration-50 overflow-clip"
												style={{
													backgroundImage:
														'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M2%202V1H0V0h1v2z%22%20fill%3D%22%238881%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E")',
													backgroundSize: "10%",
												}}
											>
												<div className="absolute -inset-1 group-hover:inset-0 group-active:-inset-1 duration-150 group-active:duration-50 ease-out-quart">
													<Media
														resource={artwork.poster ? artwork.poster : artwork.images[0].image}
														size="sd"
														className="relative size-full"
														imgClassName="size-full object-cover"
														unoptimized={!artwork.poster && artwork.unoptimized}
													/>
												</div>
											</div>
											{artwork.nsfw && (
												<div className="absolute inset-1 group-hover:inset-0 flex items-center justify-center text-neutral-950 dark:text-white backdrop-blur-md group-focus-visible:backdrop-blur-md bg-white/75 dark:bg-neutral-950/75 group-focus-visible:bg-transparent group-hover:opacity-0 duration-150 ease-out-quint pointer-events-none">
													<EyeDisabled className="size-7.5 opacity-50" />
												</div>
											)}
										</button>
									</Dialog.Trigger>
								</ContextMenu.Trigger>
								<ContextMenuPortal artwork={artwork} index={0} />
							</ContextMenu.Root>
						))}
						<Dialog.Portal>
							<Dialog.Overlay className="bg-black data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out fixed inset-0 z-90" />
							<Dialog.Content asChild onCloseAutoFocus={reset}>
								<div
									className={`text-white/70 fixed inset-0 z-100 h-screen max-h-svh w-screen data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out focus-visible:outline-hidden`}
								>
									<Dialog.Description className="sr-only">
										{t("Content.Artworks.drawnBy")}
										{typeof artworks.docs[selectedArtwork].artists[0] === "object" &&
											artworks.docs[selectedArtwork].artists[0].name}
									</Dialog.Description>
									<ContextMenu.Root>
										<ContextMenu.Trigger>
											<AnimatePresence mode="popLayout">
												<m.div
													key={artworks.docs[selectedArtwork].id}
													custom={direction}
													variants={variants}
													initial="enter"
													animate="center"
													exit="exit"
													drag={scale > 1 ? false : "x"}
													dragConstraints={{ left: 0, right: 0 }}
													dragElastic={1}
													onDragEnd={(_, { offset, velocity }) => {
														const swipeConfidenceThreshold = 10000;
														const swipePower = (offset: number, velocity: number) => {
															return Math.abs(offset) * velocity;
														};
														setXOffset(offset.x);

														const swipe = swipePower(offset.x, velocity.x);
														if (swipe < -swipeConfidenceThreshold) {
															if (selectedArtwork < artworks.docs.length - 1) {
																handleSelectArtwork({
																	id: selectedArtwork + 1,
																	offset: offset.x,
																});
															}
														} else if (swipe > swipeConfidenceThreshold) {
															if (selectedArtwork > 0) {
																handleSelectArtwork({
																	id: selectedArtwork - 1,
																	offset: offset.x,
																});
															}
														}
													}}
												>
													<TransformWrapper
														disablePadding
														onTransform={(e) => setScale(e.state.scale)}
														doubleClick={{ mode: "toggle" }}
													>
														<TransformComponent>
															<div
																className="flex items-center justify-center w-screen h-screen max-h-svh"
																style={{ perspective: 1000 }}
															>
																{typeof artworks.docs[selectedArtwork].images[selectedVariant].image === "object" && (
																	<FadingImage
																		src={artworks.docs[selectedArtwork].images[selectedVariant].image.url || ""}
																		width={artworks.docs[selectedArtwork].images[selectedVariant].image.width || 0}
																		height={artworks.docs[selectedArtwork].images[selectedVariant].image.height || 0}
																		alt={artworks.docs[selectedArtwork].images[selectedVariant].image.alt || ""}
																		className={`max-h-svh w-auto mx-auto py-16 ${
																			artworks.docs[selectedArtwork].style === "pixelart" && "pixelated"
																		}`}
																		unoptimized
																	/>
																)}
															</div>
														</TransformComponent>
													</TransformWrapper>
												</m.div>
											</AnimatePresence>
										</ContextMenu.Trigger>
										<ContextMenuPortal
											artwork={artworks.docs[selectedArtwork]}
											index={selectedVariant}
											closeDialog={() => setOpen(false)}
										/>
									</ContextMenu.Root>
									<div className="absolute top-0 pl-5 pr-16 inset-x-0 bg-linear-to-b from-black/60">
										<div className="relative h-14 inline-flex flex-col justify-center w-full">
											<AnimatePresence>
												{artists && (
													<m.div
														key={artists.map((artist) => artist.name).join(",")}
														initial={{ opacity: 0 }}
														animate={{
															opacity: 1,
															transition: { duration: 0.2 },
														}}
														exit={{
															opacity: 0,
															transition: { duration: 0.2 },
														}}
														className={`absolute left-0 ${artworks.docs[selectedArtwork].featuring ? "top-2" : "top-4"} w-full`}
														style={{ transition: "top 0.2s" }}
													>
														<Dialog.Title asChild>
															<span className="text-xl">
																<span>{t("Content.Artworks.drawnBy")} </span>
																{artists.map((artist, index) => (
																	<Fragment key={artist.id}>
																		{artist.creditLinks?.[0] ? (
																			<Link
																				href={artist.creditLinks[0].url}
																				target="_blank"
																				rel="noopener noreferrer"
																				className="text-link text-white decoration-white/50"
																			>
																				{artist.name}
																			</Link>
																		) : (
																			<span>{artist.name}</span>
																		)}

																		{index !== artists.length - 1 && (index < artists.length - 2 ? ", " : " & ")}
																	</Fragment>
																))}
																{artworks.docs[selectedArtwork].wholesome && <span className="text-red"> ♥</span>}
															</span>
														</Dialog.Title>
													</m.div>
												)}
											</AnimatePresence>
											<AnimatePresence>
												{featuring && (
													<m.p
														initial={{ opacity: 0 }}
														animate={{
															opacity: 1,
															transition: { duration: 0.2 },
														}}
														exit={{
															opacity: 0,
															transition: { duration: 0.2 },
														}}
														className="text-xs absolute left-0 top-9 w-full"
													>
														{t("Content.Artworks.featuring")}{" "}
														{featuring
															.filter((character) => typeof character === "object")
															.map((character, index, array) => (
																<Fragment key={character.id}>
																	{character.link ? (
																		<Link
																			href={character.link}
																			target="_blank"
																			rel="noopener norefererrer"
																			className="text-white"
																		>
																			{character.name}
																		</Link>
																	) : (
																		<span>{character.name}</span>
																	)}
																	{index !== array.length - 1 &&
																		(index < array.length - 2 ? <span>, </span> : <span> & </span>)}
																</Fragment>
															))}
													</m.p>
												)}
											</AnimatePresence>
										</div>
										<Dialog.Close asChild>
											<button className="absolute top-2.5 right-3 p-3 rounded-full hover:bg-white/5 duration-100">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={19}
													height={19}
													viewBox="0 0 19 19"
													fill="none"
													stroke="#fff"
													strokeWidth={1}
													strokeLinecap="butt"
												>
													<path d="M3 3 16 16" />
													<path d="M3 16 16 3" />
												</svg>
											</button>
										</Dialog.Close>
									</div>
									<AnimatePresence>
										{scale === 1 && artworks.docs[selectedArtwork].images.length >= 2 && (
											<m.div
												initial={{ opacity: 0 }}
												animate={{
													opacity: 1,
												}}
												exit={{ opacity: 0 }}
												className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-row items-center justify-center h-12"
											>
												{artworks.docs[selectedArtwork].images.map((_, index) => (
													<button
														key={index}
														className={`group h-full ${
															index === selectedVariant ? "w-16" : "w-8"
														} px-2 duration-200 ease-out-quint`}
														onClick={() => setSelectedVariant(index)}
													>
														<div
															className={`${
																index === selectedVariant
																	? "bg-white h-0.75 duration-200"
																	: "bg-white/20 group-hover:bg-white/50 h-0.75"
															} ease-out-quint`}
														/>
													</button>
												))}
											</m.div>
										)}
									</AnimatePresence>
								</div>
							</Dialog.Content>
						</Dialog.Portal>
					</Dialog.Root>
				</AnimatePresence>
			</div>
		</>
	);
}
