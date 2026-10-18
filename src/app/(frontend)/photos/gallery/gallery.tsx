"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations, useFormatter } from "next-intl";
import Image from "next/image";
import FadingImage from "@/components/ui/FadingImage";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Photo } from "@/payload-types";
import { PaginatedDocs } from "payload";
import * as Dialog from "@radix-ui/react-dialog";
import Tooltip from "@/components/ui/Tooltip";
import CameraAperture from "@/icons/CameraAperture";
import CameraIso from "@/icons/CameraIso";
import CameraShutterSpeed from "@/icons/CameraShutterSpeed";
import CameraFocalLength from "@/icons/CameraFocalLength";

import * as m from "motion/react-client";
import { AnimatePresence, Variants } from "motion/react";
import { Media } from "@/components/Media";
import { useGalleryTransition } from "@/components/gallery/GalleryTransitionContext";
import IndeterminateLoader from "@/components/loading/IndeterminateLoader";

export default function Gallery({ photos, page }: { photos: PaginatedDocs<Photo>; page: number }) {
	const t = useTranslations("PHOTOS");
	const format = useFormatter();
	const { pending } = useGalleryTransition();
	const [direction, setDirection] = useState(0);
	const [xOffset, setXOffset] = useState(0);
	const [selectedPhoto, setSelectedPhoto] = useState(0);
	const [scale, setScale] = useState(1);

	function handleSelectPhoto({ id, offset }: { id: number; offset?: number }) {
		if (offset) {
			setXOffset(offset);
		} else {
			setXOffset(0);
		}
		setDirection(id > selectedPhoto ? 1 : -1);
		requestAnimationFrame(() => {
			setSelectedPhoto(id);
		});
	}
	// Reset to 0 after the lightbox is closed.
	function reset() {
		setTimeout(() => {
			setSelectedPhoto(0);
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
				// behavior: "smooth",
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

	// Arrow keys for cycling through images.
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (scale === 1) {
				if (event.key === "ArrowLeft") {
					handleSelectPhoto({
						id: (selectedPhoto - 1 + photos.docs.length) % photos.docs.length,
					});
				} else if (event.key === "ArrowRight") {
					handleSelectPhoto({ id: (selectedPhoto + 1) % photos.docs.length });
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [selectedPhoto, scale]);

	return (
		<>
			<IndeterminateLoader loading={pending} />
			<div
				ref={galleryRef}
				className={`grid grid-cols-2 xl:grid-cols-4 p-1 border-y border-black/5 dark:border-white/5 ${pending && "opacity-50 saturate-0 pointer-events-none duration-200"}`}
			>
				<AnimatePresence mode="popLayout">
					{photos.docs.map((photo, index) => (
						<Dialog.Root key={photo.id}>
							<Dialog.Trigger asChild>
								<button
									onClick={() => setSelectedPhoto(index)}
									className="group relative w-full aspect-3/2 bg-white dark:bg-neutral-950 outline -outline-offset-4 hover:outline-offset-0 outline-white/5 focus-visible:z-10 hover:bg-white dark:hover:bg-neutral-900 sm:hover:shadow-xl hover:z-10 active:shadow-none focus-visible:shadow-xl duration-150 ease-out-quart active:duration-50 cursor-pointer focus-visible:animate-pulse"
								>
									<div className="absolute inset-1 group-hover:inset-0 group-active:inset-1 duration-150 ease-out-quart active:duration-50 overflow-clip">
										<div className="absolute -inset-1 group-hover:inset-0 group-active:-inset-1 duration-150 group-active:duration-50 ease-out-quart">
											<Media
												resource={photo}
												size="sd"
												className="relative size-full"
												imgClassName="size-full object-cover"
											/>
										</div>
									</div>
								</button>
							</Dialog.Trigger>
							<Dialog.Portal>
								<Dialog.Overlay className="bg-black data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out fixed inset-0 z-90" />
								<Dialog.Content asChild onCloseAutoFocus={reset}>
									<div
										className={`text-white fixed inset-0 z-100 h-screen max-h-svh w-screen data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out focus-visible:outline-hidden`}
									>
										<Dialog.Description className="sr-only">
											{photos.docs[selectedPhoto].alt || photos.docs[selectedPhoto].date}
										</Dialog.Description>
										<AnimatePresence mode="popLayout">
											<m.div
												key={photos.docs[selectedPhoto].id}
												custom={direction}
												variants={variants}
												initial="enter"
												animate="center"
												exit="exit"
												drag={scale > 1 ? false : "x"}
												dragConstraints={{ left: 0, right: 0 }}
												dragElastic={1}
												onDragEnd={(e, { offset, velocity }) => {
													const swipeConfidenceThreshold = 10000;
													const swipePower = (offset: number, velocity: number) => {
														return Math.abs(offset) * velocity;
													};
													setXOffset(offset.x);

													const swipe = swipePower(offset.x, velocity.x);
													if (swipe < -swipeConfidenceThreshold) {
														if (selectedPhoto < photos.docs.length - 1) {
															handleSelectPhoto({
																id: selectedPhoto + 1,
																offset: offset.x,
															});
														}
													} else if (swipe > swipeConfidenceThreshold) {
														if (selectedPhoto > 0) {
															handleSelectPhoto({
																id: selectedPhoto - 1,
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
														<div className="flex items-center justify-center w-screen h-screen max-h-svh">
															<FadingImage
																src={photos.docs[selectedPhoto].url || ""}
																width={photos.docs[selectedPhoto].width || 0}
																height={photos.docs[selectedPhoto].height || 0}
																alt={photos.docs[selectedPhoto].alt || ""}
																className="max-h-svh w-auto mx-auto py-16"
																unoptimized
															/>
														</div>
													</TransformComponent>
												</TransformWrapper>
											</m.div>
										</AnimatePresence>
										<div className="absolute top-0 pl-5 pr-16 pt-4 inset-x-0 h-12 flex justify-between items-start w-full bg-linear-to-b from-black/60">
											<AnimatePresence>
												<m.div
													key={photos.docs[selectedPhoto].id}
													initial={{ opacity: 0 }}
													animate={{
														opacity: 1,
														transition: { duration: 0.2 },
													}}
													exit={{
														opacity: 0,
														transition: { duration: 0.2 },
													}}
													className="absolute flex md:items-center grow flex-col md:flex-row gap-3 md:gap-6"
												>
													<div className="flex items-center gap-3 h-7">
														{typeof photos.docs[selectedPhoto].camera === "object" &&
														photos.docs[selectedPhoto].camera.svgLogo ? (
															<div
																className="h-4 *:h-4 md:h-6 md:*:h-6 w-auto *:w-auto"
																dangerouslySetInnerHTML={{
																	__html: photos.docs[selectedPhoto].camera.svgLogo,
																}}
															/>
														) : (
															<div className="font-medium text-lg">
																{typeof photos.docs[selectedPhoto].camera === "object" &&
																	photos.docs[selectedPhoto].camera.name}
															</div>
														)}
														<div>
															<Dialog.Title asChild>
																<div className="text-sm" style={{ lineHeight: 1 }}>
																	{format.dateTime(new Date(photos.docs[selectedPhoto].date), {
																		day: "numeric",
																		month: "long",
																		year: "numeric",
																	})}
																	,{" "}
																	{format.dateTime(new Date(photos.docs[selectedPhoto].date), {
																		hour: "numeric",
																		minute: "2-digit",
																	})}
																</div>
															</Dialog.Title>
															{photos.docs[selectedPhoto].lens && (
																<div className="text-xs text-white/70 mt-0.5" style={{ lineHeight: 1 }}>
																	{typeof photos.docs[selectedPhoto].lens === "object" &&
																		photos.docs[selectedPhoto].lens.name}
																</div>
															)}
														</div>
													</div>
													<div className="dark flex gap-3 md:gap-6 select-none text-white/70">
														{photos.docs[selectedPhoto].iso && (
															<Tooltip text={t("Content.Camera.iso")} side="top">
																<div className="flex gap-1 items-center">
																	<CameraIso />
																	<span className="text-sm">{photos.docs[selectedPhoto].iso}</span>
																</div>
															</Tooltip>
														)}
														{photos.docs[selectedPhoto].aperture && (
															<Tooltip text={t("Content.Camera.aperture")} side="top">
																<div className="flex gap-1 items-center">
																	<CameraAperture />
																	<span className="text-sm">
																		<i>f</i>/{photos.docs[selectedPhoto].aperture}
																	</span>
																</div>
															</Tooltip>
														)}
														{photos.docs[selectedPhoto].shutterSpeed && (
															<Tooltip text={t("Content.Camera.shutterSpeed")} side="top">
																<div className="flex gap-1 items-center">
																	<CameraShutterSpeed />
																	<span className="text-sm">{photos.docs[selectedPhoto].shutterSpeed}s</span>
																</div>
															</Tooltip>
														)}
														{photos.docs[selectedPhoto].focalLength && (
															<Tooltip
																text={t.rich("Content.Camera.focalLength", {
																	small: (chunks) => <span className="text-xs">{chunks}</span>,
																})}
																side="top"
															>
																<div className="flex gap-1 items-center">
																	<CameraFocalLength />
																	<span className="text-sm">
																		{photos.docs[selectedPhoto].focalLength}
																		mm
																	</span>
																</div>
															</Tooltip>
														)}
													</div>
												</m.div>
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
										</div>
									</div>
								</Dialog.Content>
							</Dialog.Portal>
						</Dialog.Root>
					))}
				</AnimatePresence>
			</div>
		</>
	);
}
