"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations, useFormatter } from "next-intl";
import Image from "next/image";
import FadingImage from "src/components/ui/FadingImage";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MinaArtworks } from "src/types/mina-artwork";
import * as Dialog from "@radix-ui/react-dialog";
import Error from "src/icons/Error";

import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import EyeDisabled from "src/icons/EyeDisabled";
import Link from "next/link";
import Bluesky from "src/icons/Bluesky";
import Twitter from "src/icons/Twitter";
import Instagram from "src/icons/Instagram";
import YouTube from "src/icons/YouTube";
import Globe from "src/icons/Globe";

export default function Gallery({ artworks, page }: { artworks: MinaArtworks; page: number }) {
	const t = useTranslations("MINA");
	const [direction, setDirection] = useState(0);
	const [selectedArtwork, setSelectedArtwork] = useState(0);
	const [selectedVariant, setSelectedVariant] = useState(0);
	const [scale, setScale] = useState(1);

	function handleSelectArtwork(id: number) {
		setDirection(id > selectedArtwork ? 1 : -1);
		setTimeout(() => {
			setSelectedArtwork(id);
			setSelectedVariant(0);
		}, 1);
	}
	// Reset to 0 after the lightbox is closed.
	function reset() {
		setTimeout(() => {
			setSelectedArtwork(0);
			setSelectedVariant(0);
			setDirection(0);
			setScale(1);
		}, 200);
	}

	const galleryRef = useRef<HTMLDivElement>(null);
	const initRef = useRef(false);
	useEffect(() => {
		if (initRef.current && galleryRef.current) {
			scrollTo({ top: galleryRef.current?.getBoundingClientRect().top + scrollY - 140 });
		} else {
			initRef.current = true;
		}
	}, [page]);

	return (
		<div
			ref={galleryRef}
			className="group grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 sm:p-2 border-y border-black/5 dark:border-white/5 sm:gap-2"
		>
			{artworks.data.map((artwork, index) => (
				<Dialog.Root key={artwork.id}>
					<Dialog.Trigger asChild>
						<button
							style={{
								backgroundImage:
									'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M2%202V1H0V0h1v2z%22%20fill%3D%22%238881%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E")',
								backgroundSize: "10%",
							}}
							onClick={() => setSelectedArtwork(index)}
							className="group/button overflow-clip bg-white dark:bg-neutral-950
								sm:[.group:hover_&:not(:hover)]:opacity-60
								outline outline-1 -outline-offset-1 outline-neutral-50/5
								focus-visible:z-10 scale-100 sm:hover:scale-[1.025] sm:active:scale-[0.975] hover:bg-white dark:hover:bg-neutral-900 sm:hover:shadow-lg active:shadow-none focus-visible:shadow-xl duration-250 ease-out-quart active:duration-75 cursor-pointer aspect-square"
						>
							<div className="scale-[1.025] sm:group-hover/button:scale-100 group-active/button:scale-100 sm:group-active/button:scale-[1.05] size-full relative duration-250 group-active/button:duration-75 ease-out-quart">
								<FadingImage
									src={`https://static.pprmint.de${artwork.artwork[0].formats.small ? artwork.artwork[0].formats.small.url : artwork.artwork[0].url}`}
									width={
										artwork.artwork[0].formats.small
											? artwork.artwork[0].formats.small.width
											: artwork.artwork[0].width
									}
									height={
										artwork.artwork[0].formats.small
											? artwork.artwork[0].formats.small.height
											: artwork.artwork[0].height
									}
									alt=""
									className="h-full min-w-full object-cover group-focus-visible/button:animate-pulse"
								/>
							</div>
							{artwork.nsfw && (
								<div className="absolute inset-0 flex items-center justify-center backdrop-blur-lg group-focus-visible/button:backdrop-blur-sm bg-neutral-950/75 group-focus-visible/button:bg-transparent group-hover/button:opacity-0 duration-300 ease-out-quint pointer-events-none">
									<EyeDisabled className="size-[30px] fill-neutral-50 opacity-50" />
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
									{artworks.data[selectedArtwork].artist.name}
								</Dialog.Description>
								<TransformWrapper disablePadding onTransformed={(e) => setScale(e.state.scale)}>
									<TransformComponent>
										<div className="flex items-center justify-center w-screen h-screen max-h-svh">
											<AnimatePresence>
												<m.div
													key={artworks.data[selectedArtwork].id}
													initial={{
														position: "relative",
														x: direction < 0 ? -120 : direction > 0 ? 120 : 0,
														clipPath:
															direction < 0
																? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
																: direction > 0
																	? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
																	: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
													}}
													animate={{
														x: 0,
														position: "relative",
														clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
														transition: {
															type: "spring",
															duration: 0.5,
															bounce: 0,
															delay: 0.05,
														},
													}}
													exit={{
														position: "absolute",
														x: direction < 0 ? 60 : -60,
														clipPath:
															direction < 0
																? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
																: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
														opacity: 0,
														transition: { ease: "easeIn", duration: 0.2 },
													}}
												>
													<FadingImage
														src={`https://static.pprmint.de${artworks.data[selectedArtwork].artwork[selectedVariant].url}`}
														width={
															artworks.data[selectedArtwork].artwork[selectedVariant]
																.width
														}
														height={
															artworks.data[selectedArtwork].artwork[selectedVariant]
																.height
														}
														alt={
															artworks.data[selectedArtwork].artwork[selectedVariant]
																.alternativeText || ""
														}
														className={`max-h-svh w-auto mx-auto py-16 ${artworks.data[selectedArtwork].pixelart && "pixelated"}`}
														unoptimized
													/>
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
												transition: { duration: 0.4, type: "spring", bounce: 0 },
											}}
											exit={{ y: -48, opacity: 0 }}
											className="absolute flex justify-between items-center top-0 pl-6 pr-4 pt-4 inset-x-0"
										>
											<AnimatePresence mode="wait">
												<m.div
													key={artworks.data[selectedArtwork].artist.name}
													initial={{ opacity: 0 }}
													animate={{ opacity: 1, transition: { duration: 0.2 } }}
													exit={{ opacity: 0, transition: { duration: 0.2 } }}
													className="flex items-center flex-grow gap-3 text-xl"
												>
													<Dialog.Title asChild>
														<p>
															<span className="text-white/70">
																{t("Content.Artworks.drawnBy")}
															</span>
															{artworks.data[selectedArtwork].artist.name}
															{artworks.data[selectedArtwork].heart && (
																<span className="text-red"> ♥</span>
															)}
														</p>
													</Dialog.Title>
													{artworks.data[selectedArtwork].artist.creditUrl && (
														<Link
															href={artworks.data[selectedArtwork].artist.creditUrl!}
															target="_blank"
															rel="noopener noreferrer"
															className="rounded-full"
														>
															<button
																tabIndex={-1}
																className=" p-2.5 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl"
															>
																{artworks.data[
																	selectedArtwork
																].artist.creditUrl!.startsWith("https://bsky.app/") ? (
																	<Bluesky />
																) : artworks.data[
																	selectedArtwork
																].artist.creditUrl!.startsWith(
																	"https://twitter.com/"
																) ? (
																	<Twitter />
																) : artworks.data[
																	selectedArtwork
																].artist.creditUrl!.startsWith(
																	"https://www.instagram.com/"
																) ? (
																	<Instagram />
																) : artworks.data[
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
											</AnimatePresence>
											<AnimatePresence mode="wait">
												{artworks.data[selectedArtwork].artwork.length >= 2 && (
													<m.div
														key={artworks.data[selectedArtwork].id}
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														exit={{ opacity: 0 }}
														className="flex flex-row items-center justify-center px-6 h-9 inset-x-0"
													>
														{artworks.data[selectedArtwork].artwork.map(
															(variant, index) => (
																<button
																	key={index}
																	className={`group h-full ${index === selectedVariant ? "w-9" : "w-5"} px-1.5 duration-200 ease-out-quint`}
																	onClick={() => setSelectedVariant(index)}
																>
																	<div
																		className={`h-2 ${index === selectedVariant
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
												transition: { duration: 0.4, type: "spring", bounce: 0 },
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
												className={`absolute inset-0 flex w-max items-center gap-2 ${direction !== 0 && "duration-500"} ease-out-quart`}
												style={{ left: `calc(50% - ${selectedArtwork * 48}px - 32px` }}
											>
												{artworks.data.map((artwork, index) => (
													<button
														key={index}
														onClick={() => handleSelectArtwork(index)}
														className={`relative ${selectedArtwork === index ? "h-12 w-16" : "h-10 w-10 saturate-0 hover:saturate-100 opacity-50 hover:opacity-100"} duration-300 ease-out-quart overflow-clip`}
													>
														<Image
															src={`https://static.pprmint.de${artwork.artwork[0].formats.thumbnail.url}`}
															fill
															alt={artwork.artwork[0].alternativeText || ""}
															className={`object-cover ${artwork.focus} ${artwork.nsfw && selectedArtwork !== index && "blur-sm hover:blur-0"}`}
														/>
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
			))}
		</div>
	);
}
