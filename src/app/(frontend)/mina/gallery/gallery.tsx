"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import FadingImage from "@/components/ui/FadingImage";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import type { Mina } from "@/payload-types";
import * as Dialog from "@radix-ui/react-dialog";
import Error from "@/icons/Error";

import * as m from "motion/react-client";
import { AnimatePresence } from "motion/react";
import EyeDisabled from "@/icons/EyeDisabled";
import Link from "next/link";
import Bluesky from "@/icons/Bluesky";
import Twitter from "@/icons/Twitter";
import Instagram from "@/icons/Instagram";
import YouTube from "@/icons/YouTube";
import Globe from "@/icons/Globe";
import { PaginatedDocs } from "payload";
import { Media } from "@/components/Media";

export default function Gallery({ artworks, page }: { artworks: PaginatedDocs<Mina>; page: number }) {
	const t = useTranslations("MINA");
	const [direction, setDirection] = useState(0);
	const [xOffset, setXOffset] = useState(0);
	const [selectedArtwork, setSelectedArtwork] = useState(0);
	const [selectedVariant, setSelectedVariant] = useState(0);
	const [scale, setScale] = useState(1);

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
								<Dialog.Trigger asChild>
									<button
										style={{
											backgroundImage:
												'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M2%202V1H0V0h1v2z%22%20fill%3D%22%238881%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E")',
											backgroundSize: "10%",
										}}
										onClick={() => setSelectedArtwork(index)}
										className="group/button absolute inset-0 overflow-clip bg-white dark:bg-neutral-950
										outline outline-1 -outline-offset-1 outline-neutral-50/5
										focus-visible:z-10 scale-100 sm:hover:scale-[1.025] sm:active:scale-[0.975] hover:bg-white dark:hover:bg-neutral-900 sm:hover:shadow-xl hover:z-10 active:shadow-none focus-visible:shadow-xl duration-250 ease-out-quart active:duration-75 cursor-pointer"
									>
										<div className="scale-[1.025] sm:group-hover/button:scale-100 group-active/button:scale-100 sm:group-active/button:scale-[1.05] size-full relative duration-250 group-active/button:duration-75 ease-out-quart">
											<Media
												resource={artwork.images[0].image}
												size="sd"
												className="relative size-full"
												imgClassName="size-full object-cover group-focus-visible/button:animate-pulse"
												unoptimized={artwork.unoptimized}
											/>
										</div>
										{artwork.nsfw && (
											<div className="absolute inset-0 flex items-center justify-center text-neutral-950 dark:text-white backdrop-blur group-focus-visible/button:backdrop-blur bg-neutral-50/75 dark:bg-neutral-950/75 group-focus-visible/button:bg-transparent group-hover/button:opacity-0 duration-300 ease-out-quint pointer-events-none">
												<EyeDisabled className="size-[30px] opacity-50" />
											</div>
										)}
									</button>
								</Dialog.Trigger>
								<Dialog.Portal>
									<Dialog.Overlay className="bg-neutral-950/90 backdrop-blur-xl data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-90" />
									<Dialog.Content asChild onCloseAutoFocus={reset}>
										<div
											className={`text-white fixed inset-0 z-100 h-screen max-h-svh w-screen data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out focus-visible:outline-none`}
										>
											<Dialog.Description className="sr-only">
												{t("Content.Artworks.drawnBy")}
												{typeof artworks.docs[selectedArtwork].artist !== "string" &&
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
																].image !== "string" && (
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
														className="absolute flex justify-between items-center top-0 pl-6 pr-4 pt-4 inset-x-0"
													>
														<AnimatePresence mode="wait">
															{typeof artworks.docs[selectedArtwork].artist !==
																"string" && (
																<m.div
																	key={artworks.docs[selectedArtwork].artist.name}
																	initial={{ opacity: 0 }}
																	animate={{
																		opacity: 1,
																		transition: { duration: 0.2 },
																	}}
																	exit={{ opacity: 0, transition: { duration: 0.2 } }}
																	className="flex items-center flex-grow gap-3 text-xl"
																>
																	<Dialog.Title asChild>
																		<p>
																			<span className="text-white/70">
																				{t("Content.Artworks.drawnBy")}
																			</span>
																			{artworks.docs[selectedArtwork].artist.name}
																			{artworks.docs[selectedArtwork]
																				.wholesome && (
																				<span className="text-red"> ♥</span>
																			)}
																		</p>
																	</Dialog.Title>
																	{artworks.docs[selectedArtwork].artist
																		.creditUrl && (
																		<Link
																			href={
																				artworks.docs[selectedArtwork].artist
																					.creditUrl!
																			}
																			target="_blank"
																			rel="noopener noreferrer"
																			className="rounded-full"
																		>
																			<button
																				tabIndex={-1}
																				className=" p-2.5 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl"
																			>
																				{artworks.docs[
																					selectedArtwork
																				].artist.creditUrl!.startsWith(
																					"https://bsky.app/"
																				) ? (
																					<Bluesky />
																				) : artworks.docs[
																						selectedArtwork
																				  ].artist.creditUrl!.startsWith(
																						"https://x.com/"
																				  ) ? (
																					<Twitter />
																				) : artworks.docs[
																						selectedArtwork
																				  ].artist.creditUrl!.startsWith(
																						"https://twitter.com/"
																				  ) ? (
																					<Twitter />
																				) : artworks.docs[
																						selectedArtwork
																				  ].artist.creditUrl!.startsWith(
																						"https://www.instagram.com/"
																				  ) ? (
																					<Instagram />
																				) : artworks.docs[
																						selectedArtwork
																				  ].artist.creditUrl!.startsWith(
																						"https://www.youtube.com/"
																				  ) ? (
																					<YouTube />
																				) : (
																					<Globe />
																				)}
																			</button>
																		</Link>
																	)}
																</m.div>
															)}
														</AnimatePresence>
														<AnimatePresence mode="wait">
															{artworks.docs[selectedArtwork].images.length >= 2 && (
																<m.div
																	key={artworks.docs[selectedArtwork].id}
																	initial={{ opacity: 0 }}
																	animate={{ opacity: 1 }}
																	exit={{ opacity: 0 }}
																	className="flex flex-row items-center justify-center px-6 h-9 inset-x-0"
																>
																	{artworks.docs[selectedArtwork].images.map(
																		(_, index) => (
																			<button
																				key={index}
																				className={`group h-full ${
																					index === selectedVariant
																						? "w-9"
																						: "w-5"
																				} px-1.5 duration-200 ease-out-quint`}
																				onClick={() =>
																					setSelectedVariant(index)
																				}
																			>
																				<div
																					className={`h-2 ${
																						index === selectedVariant
																							? "bg-neutral-50"
																							: "bg-neutral-50/20 group-hover:bg-neutral-50/50"
																					} rounded-full duration-200 ease-out-quint`}
																				/>
																			</button>
																		)
																	)}
																</m.div>
															)}
														</AnimatePresence>
														<Dialog.Close asChild>
															<button className="p-2.5 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl">
																<Error />
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
																	onClick={() => handleSelectArtwork({ id: index })}
																	className={`relative ${
																		selectedArtwork === index
																			? "h-12 w-16"
																			: "h-10 w-10 saturate-0 hover:saturate-100 opacity-50 hover:opacity-100"
																	} duration-300 ease-out-quart overflow-clip`}
																>
																	{typeof artwork.images[0].image !== "string" && (
																		<Image
																			src={
																				artwork.images[0].image.sizes?.thumbnail
																					?.url ||
																				artwork.images[0].image.url ||
																				""
																			}
																			width={
																				artwork.images[0].image.sizes?.thumbnail
																					?.width || 0
																			}
																			height={
																				artwork.images[0].image.sizes?.thumbnail
																					?.height || 0
																			}
																			alt={artwork.images[0].image.alt || ""}
																			className={`absolute top-0 inset-x-0 h-full object-cover ${
																				artwork.nsfw &&
																				selectedArtwork !== index &&
																				"blur-[2px] hover:blur-0"
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
							</Dialog.Root>
						</m.div>
					))}
				</AnimatePresence>
			</m.div>
			<div
				id="galleryHeightRef"
				className="fixed w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 -top-full -left-full pointer-events-none"
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
