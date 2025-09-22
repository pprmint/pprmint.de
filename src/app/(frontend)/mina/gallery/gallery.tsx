"use client";
import { Fragment, MouseEventHandler, useEffect, useRef, useState } from "react";
import saveAs from "file-saver";
import { useTranslations } from "next-intl";
import Image from "next/image";
import FadingImage from "@/components/ui/FadingImage";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import type { Mina } from "@/payload-types";
import * as Dialog from "@radix-ui/react-dialog";
import * as ContextMenu from "@radix-ui/react-context-menu";

import * as m from "motion/react-client";
import { AnimatePresence } from "motion/react";
import EyeDisabled from "@/icons/EyeDisabled";
import Link from "next/link";
import { PaginatedDocs } from "payload";
import { Media } from "@/components/Media";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ExternalLink from "@/icons/ExternalLink";
import Copy from "@/icons/Copy";
import FloppyDisk from "@/icons/FloppyDisk";
import Filter from "@/icons/Filter";
import Bluesky from "@/icons/Bluesky";
import YouTube from "@/icons/YouTube";
import Twitter from "@/icons/Twitter";
import Globe from "@/icons/Globe";
import Instagram from "@/icons/Instagram";

export default function Gallery({ artworks, page }: { artworks: PaginatedDocs<Mina>; page: number }) {
	const t = useTranslations("MINA");

	// Lightbox states.
	const [direction, setDirection] = useState(0);
	const [xOffset, setXOffset] = useState(0);
	const [selectedArtwork, setSelectedArtwork] = useState(0);
	const [selectedVariant, setSelectedVariant] = useState(0);
	const [scale, setScale] = useState(1);

	// Search params.
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	// Stuff for gallery height transitions.
	const galleryHeightRef = useRef<HTMLDivElement>(null);
	const [galleryHeight, setGalleryHeight] = useState<number | "auto">("auto");
	useEffect(() => {
		const handleResize = () => {
			if (galleryHeightRef.current) {
				setGalleryHeight(galleryHeightRef.current.scrollHeight);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [artworks.docs.length]);

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
	function reset() {
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
				behavior: "smooth",
			});
		} else {
			initRef.current = true;
		}
	}, [page]);
	// Gallery size transitions.
	const variants = {
		enter: (direction: number) => {
			return {
				x: direction < 0 ? -120 : direction > 0 ? 120 : 0,
				clipPath:
					direction < 0
						? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
						: direction > 0
						? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
						: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			};
		},
		center: {
			x: 0,
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
		},
		exit: (direction: number) => {
			return {
				x: direction < 0 ? 120 + xOffset : -120 + xOffset,
				clipPath:
					direction < 0
						? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
						: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
				opacity: 0,
			};
		},
	};

	// Context menu stuff.
	function ContextMenuItem(props: React.PropsWithChildren<{ action?: MouseEventHandler<HTMLDivElement> }>) {
		return (
			<ContextMenu.Item
				className="group relative flex items-center gap-2.5 pr-2 pl-2 h-7 leading-none select-none outline-none focus:outline-none data-disabled:text-black/25 dark:data-disabled:text-white/25 data-disabled:pointer-events-none data-highlighted:text-neutral-950 dark:data-highlighted:text-white data-[state=checked]:text-neutral-950 dark:data-[state=checked]:text-white data-highlighted:bg-black/10 dark:data-highlighted:bg-white/10 active:opacity-75 duration-75 data-highlighted:duration-0 cursor-pointer focus-visible:outline-hidden"
				onClick={props.action}
			>
				{props.children}
			</ContextMenu.Item>
		);
	}
	// Show artwork by same artist.
	function selectArtist(artist: string) {
		const params = new URLSearchParams(searchParams);
		params.set("artist", artist);
		params.delete("p"); // Otherwise you may end up on a page with no results.
		replace(`${pathname}?${params.toString()}`, { scroll: false });

		const gallerySection = document.getElementById("gallery");
		if (gallerySection) {
			scrollTo({
				top: gallerySection.getBoundingClientRect().top + scrollY - 140,
				behavior: "smooth",
			});
		}
	}
	// Show same outift.
	function selectOutfit(outfit: string) {
		const params = new URLSearchParams(searchParams);
		params.set("outfit", outfit);
		params.delete("p"); // Otherwise you may end up on a page with no results.
		replace(`${pathname}?${params.toString()}`, { scroll: false });

		const gallerySection = document.getElementById("gallery");
		if (gallerySection) {
			scrollTo({
				top: gallerySection.getBoundingClientRect().top + scrollY - 140,
				behavior: "smooth",
			});
		}
	}

	return (
		<>
			<m.div
				ref={galleryRef}
				animate={{ height: galleryHeight }}
				transition={{ type: "spring", bounce: 0, duration: 0.3 }}
				className="group grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 p-1 sm:p-2 border-y border-black/5 dark:border-white/5 gap-1 sm:gap-2"
			>
				<AnimatePresence mode="popLayout">
					{artworks.docs.map((artwork, index) => (
						<m.div
							key={artwork.id}
							layout
							initial={{
								opacity: 0,
								y: 10,
							}}
							animate={{
								opacity: 1,
								y: 0,
								transition: { delay: 0.25 + index / 100, type: "spring", bounce: 0, duration: 0.4 },
							}}
							exit={{
								opacity: 0,
							}}
							transition={{ type: "spring", bounce: 0, duration: 0.4 }}
							className="relative w-full aspect-square"
						>
							<Dialog.Root>
								<ContextMenu.Root>
									<ContextMenu.Trigger>
										<Dialog.Trigger asChild>
											<button
												style={{
													backgroundImage:
														'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M2%202V1H0V0h1v2z%22%20fill%3D%22%238881%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E")',
													backgroundSize: "10%",
												}}
												onClick={() => setSelectedArtwork(index)}
												className="group/button absolute inset-0 overflow-clip bg-white dark:bg-neutral-950
													outline -outline-offset-1 outline-white/5
													focus-visible:z-10 scale-100 sm:hover:scale-[1.025] sm:active:scale-[0.975] hover:bg-white dark:hover:bg-neutral-900 sm:hover:shadow-xl hover:z-10 active:shadow-none focus-visible:shadow-xl duration-250 ease-out-quart active:duration-75 cursor-pointer focus-visible:animate-pulse"
											>
												<div className="scale-[1.025] sm:group-hover/button:scale-100 group-active/button:scale-100 sm:group-active/button:scale-[1.05] size-full relative duration-250 group-active/button:duration-75 ease-out-quart">
													<Media
														resource={artwork.images[0].image}
														size="sd"
														className="relative size-full"
														imgClassName="size-full object-cover"
														unoptimized={artwork.unoptimized}
													/>
												</div>
												{artwork.nsfw && (
													<div className="absolute inset-0 flex items-center justify-center text-neutral-950 dark:text-white backdrop-blur-md group-focus-visible/button:backdrop-blur-md bg-white/75 dark:bg-neutral-950/75 group-focus-visible/button:bg-transparent group-hover/button:opacity-0 duration-300 ease-out-quint pointer-events-none">
														<EyeDisabled className="size-[30px] opacity-50" />
													</div>
												)}
											</button>
										</Dialog.Trigger>
									</ContextMenu.Trigger>
									<Dialog.Portal>
										<Dialog.Overlay className="bg-neutral-950/90 backdrop-blur-xl data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-90" />
										<Dialog.Content asChild onCloseAutoFocus={reset}>
											<div
												className={`text-white/70 fixed inset-0 z-100 h-screen max-h-svh w-screen data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out focus-visible:outline-hidden`}
											>
												<Dialog.Description className="sr-only">
													{t("Content.Artworks.drawnBy")}
													{typeof artworks.docs[selectedArtwork].artist === "object" &&
														artworks.docs[selectedArtwork].artist.name}
												</Dialog.Description>
												<TransformWrapper
													disablePadding
													onTransformed={(e) => setScale(e.state.scale)}
												>
													<TransformComponent>
														<div className="flex items-center justify-center w-screen h-screen max-h-svh">
															<AnimatePresence mode="popLayout">
																<m.div
																	key={artworks.docs[selectedArtwork].id}
																	custom={direction}
																	variants={variants}
																	initial="enter"
																	animate="center"
																	exit="exit"
																	transition={{
																		x: {
																			type: "spring",
																			duration: 0.6,
																			bounce: 0,
																		},
																	}}
																	drag={scale > 1 ? false : "x"}
																	dragConstraints={{ left: 0, right: 0 }}
																	dragElastic={1}
																	onDragEnd={(_, { offset, velocity }) => {
																		const swipeConfidenceThreshold = 10000;
																		const swipePower = (
																			offset: number,
																			velocity: number
																		) => {
																			return Math.abs(offset) * velocity;
																		};
																		const swipe = swipePower(offset.x, velocity.x);
																		if (swipe < -swipeConfidenceThreshold) {
																			if (
																				selectedArtwork <
																				artworks.docs.length - 1
																			) {
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
																	{typeof artworks.docs[selectedArtwork].images[
																		selectedVariant
																	].image === "object" && (
																		<FadingImage
																			src={
																				artworks.docs[selectedArtwork].images[
																					selectedVariant
																				].image.url || ""
																			}
																			width={
																				artworks.docs[selectedArtwork].images[
																					selectedVariant
																				].image.width || 0
																			}
																			height={
																				artworks.docs[selectedArtwork].images[
																					selectedVariant
																				].image.height || 0
																			}
																			alt={
																				artworks.docs[selectedArtwork].images[
																					selectedVariant
																				].image.alt || ""
																			}
																			className={`max-h-svh w-auto mx-auto py-16 ${
																				artworks.docs[selectedArtwork]
																					.unoptimized && "pixelated"
																			}`}
																			unoptimized
																			priority
																		/>
																	)}
																</m.div>
															</AnimatePresence>
														</div>
													</TransformComponent>
												</TransformWrapper>
												<AnimatePresence>
													{scale === 1 && (
														<m.div
															initial={{ y: -48, opacity: 0 }}
															animate={{
																y: 0,
																opacity: 1,
																transition: {
																	duration: 0.4,
																	type: "spring",
																	bounce: 0,
																},
															}}
															exit={{ y: -48, opacity: 0 }}
															className="absolute top-0 pl-6 pr-4 inset-x-0"
														>
															<div className="h-16 inline-flex flex-col justify-center">
																<AnimatePresence mode="wait">
																	{typeof artworks.docs[selectedArtwork].artist ===
																		"object" && (
																		<m.div
																			key={
																				artworks.docs[selectedArtwork].artist
																					.name
																			}
																			initial={{ opacity: 0 }}
																			animate={{
																				opacity: 1,
																				transition: { duration: 0.2 },
																			}}
																			exit={{
																				opacity: 0,
																				transition: { duration: 0.2 },
																			}}
																		>
																			<Dialog.Title asChild>
																				<span className="text-xl">
																					<span>
																						{t("Content.Artworks.drawnBy")}
																					</span>
																					{artworks.docs[selectedArtwork]
																						.artist.creditLinks &&
																					artworks.docs[selectedArtwork]
																						.artist.creditLinks.length >
																						0 ? (
																						<Link
																							href={
																								artworks.docs[
																									selectedArtwork
																								].artist.creditLinks[0]
																									.url
																							}
																							target="_blank"
																							rel="noopener noreferrer"
																							className="text-link text-white decoration-white/50"
																						>
																							{
																								artworks.docs[
																									selectedArtwork
																								].artist.name
																							}
																						</Link>
																					) : (
																						artworks.docs[selectedArtwork]
																							.artist.name
																					)}
																					{artworks.docs[selectedArtwork]
																						.wholesome && (
																						<span className="text-red">
																							{" "}
																							♥
																						</span>
																					)}
																				</span>
																			</Dialog.Title>
																		</m.div>
																	)}
																</AnimatePresence>
																<AnimatePresence mode="wait">
																	{artworks.docs[selectedArtwork].featuring && (
																		<m.div
																			initial={{ height: 0 }}
																			animate={{
																				height: 16,
																				transition: { duration: 0.15 },
																			}}
																			exit={{
																				height: 0,
																				opacity: 0,
																				transition: { duration: 0.15 },
																			}}
																		>
																			<AnimatePresence mode="wait">
																				<m.p
																					key={selectedArtwork}
																					className="text-xs"
																					initial={{ opacity: 0 }}
																					animate={{
																						opacity: 1,
																						transition: {
																							duration: 0.2,
																							delay: 0.2,
																						},
																					}}
																					exit={{
																						opacity: 0,
																						transition: { duration: 0.1 },
																					}}
																				>
																					{t("Content.Artworks.featuring")}{" "}
																					{artworks.docs[
																						selectedArtwork
																					].featuring
																						.filter(
																							(character) =>
																								typeof character ===
																								"object"
																						)
																						.map(
																							(
																								character,
																								index,
																								array
																							) => (
																								<Fragment
																									key={character.id}
																								>
																									{character.link ? (
																										<Link
																											href={
																												character.link
																											}
																											target="_blank"
																											rel="noopener norefererrer"
																											className="text-white"
																										>
																											{
																												character.name
																											}
																										</Link>
																									) : (
																										<span>
																											{
																												character.name
																											}
																										</span>
																									)}
																									{index !==
																										array.length -
																											1 &&
																										(index <
																										array.length -
																											2 ? (
																											<span>
																												,{" "}
																											</span>
																										) : (
																											<span>
																												{" "}
																												&{" "}
																											</span>
																										))}
																								</Fragment>
																							)
																						)}
																				</m.p>
																			</AnimatePresence>
																		</m.div>
																	)}
																</AnimatePresence>
															</div>
															<AnimatePresence mode="wait">
																{artworks.docs[selectedArtwork].images.length >= 2 && (
																	<m.div
																		key={artworks.docs[selectedArtwork].id}
																		initial={{ opacity: 0 }}
																		animate={{ opacity: 1 }}
																		exit={{ opacity: 0 }}
																		className="absolute top-3.5 right-16 sm:right-1/2 sm:translate-x-1/2"
																	>
																		<div className="flex flex-row items-center justify-center h-9">
																			{artworks.docs[selectedArtwork].images.map(
																				(_, index) => (
																					<button
																						key={index}
																						className={`group h-full ${
																							index === selectedVariant
																								? "w-12"
																								: "w-6"
																						} px-1.5 duration-200 ease-out-quint`}
																						onClick={() =>
																							setSelectedVariant(index)
																						}
																					>
																						<div
																							className={`${
																								index ===
																								selectedVariant
																									? "bg-white h-[3px] duration-200"
																									: "bg-white/20 group-hover:bg-white/50 h-[3px]"
																							} ease-out-quint`}
																						/>
																					</button>
																				)
																			)}
																		</div>
																	</m.div>
																)}
															</AnimatePresence>
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
														</m.div>
													)}
												</AnimatePresence>
												<AnimatePresence>
													{scale === 1 && (
														<m.div
															initial={{ y: 48, opacity: 0 }}
															animate={{
																y: 0,
																opacity: 1,
																transition: {
																	duration: 0.4,
																	type: "spring",
																	bounce: 0,
																},
															}}
															exit={{ y: 48, opacity: 0 }}
															className="absolute bottom-2 inset-x-0 h-12"
															style={{
																maskImage:
																	"linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
																maskRepeat: "space",
															}}
														>
															<div
																className={`absolute inset-0 flex w-max items-center gap-2 ${
																	direction !== 0 && "duration-500"
																} ease-out-quart`}
																style={{
																	left: `calc(50% - ${selectedArtwork * 48}px - 32px`,
																}}
															>
																{artworks.docs.map((artwork, index) => (
																	<button
																		key={index}
																		onClick={() =>
																			handleSelectArtwork({ id: index })
																		}
																		className={`relative ${
																			selectedArtwork === index
																				? "h-12 w-16"
																				: "h-10 w-10 saturate-0 hover:saturate-100 opacity-50 hover:opacity-100"
																		} duration-300 ease-out-quart overflow-clip`}
																	>
																		{typeof artwork.images[0].image ===
																			"object" && (
																			<Image
																				src={
																					artwork.images[0].image.sizes
																						?.thumbnail?.url ||
																					artwork.images[0].image.url ||
																					""
																				}
																				width={
																					artwork.images[0].image.sizes
																						?.thumbnail?.width || 0
																				}
																				height={
																					artwork.images[0].image.sizes
																						?.thumbnail?.height || 0
																				}
																				alt={artwork.images[0].image.alt || ""}
																				className={`absolute top-0 inset-x-0 h-full object-cover ${
																					artwork.nsfw &&
																					selectedArtwork !== index &&
																					"blur-[2px] hover:blur-none"
																				}`}
																				style={{
																					objectPosition: `${artwork.images[0].image.focalX}% ${artwork.images[0].image.focalY}%`,
																				}}
																			/>
																		)}
																	</button>
																))}
															</div>
														</m.div>
													)}
												</AnimatePresence>
											</div>
										</Dialog.Content>
									</Dialog.Portal>
									<ContextMenu.Portal>
										<ContextMenu.Content className="p-1 min-w-64 z-99999 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/5 shadow-xl data-[state=open]:animate-scale-up data-[state=closed]:animate-scale-down origin-[var(--radix-context-menu-content-transform-origin)]">
											<ContextMenu.Group>
												<ContextMenu.Label className="text-xs text-neutral-950/50 dark:text-white/50 ml-2 mt-1.5">
													{t("Content.Artworks.ContextMenu.Artwork.label")}
												</ContextMenu.Label>
												{typeof artwork.images[0].image === "object" &&
													artwork.images[0].image.url && (
														<Link
															href={artwork.images[0].image.url}
															target="_blank"
															rel="noopener noreferrer"
														>
															<ContextMenuItem>
																<ExternalLink />
																{t("Content.Artworks.ContextMenu.Artwork.openInNewTab")}
															</ContextMenuItem>
														</Link>
													)}
												<ContextMenuItem
													action={() =>
														navigator.clipboard.writeText(
															`${process.env.NEXT_PUBLIC_SERVER_URL}${
																typeof artwork.images[0].image === "object" &&
																artwork.images[0].image.url
															}`
														)
													}
												>
													<Copy />
													{t("Content.Artworks.ContextMenu.Artwork.copyImageUrl")}
												</ContextMenuItem>
												<ContextMenuItem
													action={() =>
														saveAs(
															(typeof artwork.images[0].image === "object" &&
																artwork.images[0].image.url) ||
																"",
															(typeof artwork.images[0].image === "object" &&
																artwork.images[0].image.filename) ||
																""
														)
													}
												>
													<FloppyDisk />
													{t("Content.Artworks.ContextMenu.Artwork.saveImage")}
												</ContextMenuItem>
												{(() => {
													const outfit = artwork.outfit; // I hate you, TypeScript.
													if (outfit != null && typeof outfit !== "string") {
														return (
															<ContextMenuItem action={() => selectOutfit(outfit.slug)}>
																<Filter />
																{t(
																	"Content.Artworks.ContextMenu.Artwork.showAllWithOutfit"
																)}
															</ContextMenuItem>
														);
													}
													return null;
												})()}
											</ContextMenu.Group>
											<ContextMenu.Group>
												<ContextMenu.Label className="text-xs text-neutral-950/50 dark:text-white/50 ml-2 mt-1.5">
													{t("Content.Artworks.ContextMenu.Artist.label")}
												</ContextMenu.Label>
												<ContextMenuItem
													action={() =>
														selectArtist(
															(typeof artwork.artist === "object" &&
																artwork.artist.slug) ||
																""
														)
													}
												>
													<Filter />
													{t("Content.Artworks.ContextMenu.Artist.showAllByArtist", {
														artist:
															(typeof artwork.artist === "object" &&
																artwork.artist.name) ||
															"",
													})}
												</ContextMenuItem>
												{typeof artwork.artist === "object" &&
													artwork.artist.creditLinks?.map((link) => (
														<Link
															key={link.id}
															href={link.url}
															target="_blank"
															rel="noopener noreferrer"
														>
															<ContextMenuItem>
																{link.service === "Bluesky" ?
																	<Bluesky />
																	: link.service === "YouTube" ?
																		<YouTube />
																		: link.service === "Twitter" ?
																			<Twitter />
																			: link.service === "Instagram" ?
																				<Instagram />
																				: <Globe />
																}
																{link.service === "Website"
																	? t(
																			"Content.Artworks.ContextMenu.Artist.visitWebsite",
																			{
																				site: new URL(link.url).hostname,
																			}
																		)
																	: t(
																			"Content.Artworks.ContextMenu.Artist.visitProfile",
																			{
																				site: link.service,
																			}
																		)}
															</ContextMenuItem>
														</Link>
													))}
											</ContextMenu.Group>
										</ContextMenu.Content>
									</ContextMenu.Portal>
								</ContextMenu.Root>
							</Dialog.Root>
						</m.div>
					))}
				</AnimatePresence>
			</m.div>
			<div
				id="galleryHeightRef"
				className="fixed w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 -top-[200%] -left-[200%] pointer-events-none opacity-0"
			>
				<div
					ref={galleryHeightRef}
					className="w-full group grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 p-1 sm:p-2 gap-1 sm:gap-2"
				>
					{[...Array(artworks.docs.length)].map((_, index) => (
						<div key={index} className="w-full aspect-square" />
					))}
				</div>
			</div>
		</>
	);
}
