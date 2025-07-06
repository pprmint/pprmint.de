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
import Error from "@/icons/Error";

import * as m from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { Media } from "@/components/Media";

export default function Gallery({ photos, page }: { photos: PaginatedDocs<Photo>; page: number }) {
	const t = useTranslations("PHOTOS");
	const format = useFormatter();
	const [direction, setDirection] = useState(0);
	const [xOffset, setXOffset] = useState(0);
	const [selectedPhoto, setSelectedPhoto] = useState(0);
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
	}, [photos.docs.length]);

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
			scrollTo({ top: galleryRef.current?.getBoundingClientRect().top + scrollY - 105 });
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
				className="group grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-1 sm:p-2 border-y border-black/5 dark:border-white/5 gap-1 sm:gap-2"
			>
				<AnimatePresence mode="popLayout">
					{photos.docs.map((photo, index) => (
						<m.div
							key={photo.id}
							layout
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
								transition: { delay: 0.25 + index / 100 },
							}}
							exit={{
								opacity: 0,
							}}
							transition={{ type: "spring", bounce: 0, duration: 0.4 }}
							className="relative w-full aspect-[3/2]"
						>
							<Dialog.Root key={photo.id}>
								<Dialog.Trigger asChild>
									<button
										style={{
											backgroundImage:
												'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M2%202V1H0V0h1v2z%22%20fill%3D%22%238881%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E")',
											backgroundSize: "10%",
										}}
										onClick={() => setSelectedPhoto(index)}
										className="group/button absolute inset-0 overflow-clip bg-white dark:bg-neutral-950
								outline outline-1 -outline-offset-1 outline-neutral-50/5
								focus-visible:z-10 scale-100 sm:hover:scale-[1.025] sm:active:scale-[0.975] hover:bg-white dark:hover:bg-neutral-900 sm:hover:shadow-lg active:shadow-none focus-visible:shadow-xl duration-250 ease-out-quart active:duration-75 cursor-pointer"
									>
										<div className="scale-[1.025] sm:group-hover/button:scale-100 group-active/button:scale-100 sm:group-active/button:scale-[1.05] size-full relative duration-250 group-active/button:duration-75 ease-out-quart">
											<Media
												resource={photo}
												size="sd"
												className="relative size-full"
												imgClassName="size-full object-cover group-focus-visible/button:animate-pulse"
											/>
										</div>
									</button>
								</Dialog.Trigger>
								<Dialog.Portal>
									<Dialog.Overlay className="bg-neutral-950/90 backdrop-blur-xl data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-90" />
									<Dialog.Content asChild onCloseAutoFocus={reset}>
										<div
											className={`text-white fixed inset-0 z-100 h-screen max-h-svh w-screen data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out focus-visible:outline-none`}
										>
											<Dialog.Description className="sr-only">
												{photos.docs[selectedPhoto].alt || photos.docs[selectedPhoto].date}
											</Dialog.Description>
											<TransformWrapper
												disablePadding
												onTransformed={(e) => setScale(e.state.scale)}
											>
												<TransformComponent>
													<div className="flex items-center justify-center w-screen h-screen max-h-svh">
														<AnimatePresence mode="popLayout">
															<m.div
																key={photos.docs[selectedPhoto].id}
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
																onDragEnd={(e, { offset, velocity }) => {
																	const swipeConfidenceThreshold = 10000;
																	const swipePower = (
																		offset: number,
																		velocity: number
																	) => {
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
																<FadingImage
																	src={photos.docs[selectedPhoto].url || ""}
																	width={photos.docs[selectedPhoto].width || 0}
																	height={photos.docs[selectedPhoto].height || 0}
																	alt={photos.docs[selectedPhoto].alt || ""}
																	className="max-h-svh w-auto mx-auto py-16"
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
														className="absolute flex justify-between items-start top-0 pl-6 pr-4 pt-4 min-h-16 inset-x-0"
													>
														<AnimatePresence mode="wait">
															<m.div
																key={photos.docs[selectedPhoto].id}
																initial={{ opacity: 0 }}
																animate={{ opacity: 1, transition: { duration: 0.2 } }}
																exit={{ opacity: 0, transition: { duration: 0.2 } }}
																className="flex md:items-center flex-grow flex-col md:flex-row gap-3 md:gap-6"
															>
																<div className="flex items-center gap-3">
																	{typeof photos.docs[selectedPhoto].camera ===
																		"object" &&
																	photos.docs[selectedPhoto].camera.svgLogo ? (
																		<div
																			className="h-4 *:h-4 md:h-6 *:md:h-6 w-auto *:w-auto"
																			dangerouslySetInnerHTML={{
																				__html: photos.docs[selectedPhoto]
																					.camera.svgLogo,
																			}}
																		/>
																	) : (
																		<div className="font-medium text-lg">
																			{typeof photos.docs[selectedPhoto]
																				.camera === "object" &&
																				photos.docs[selectedPhoto].camera.name}
																		</div>
																	)}
																	<div>
																		<Dialog.Title asChild>
																			<div
																				className="text-sm"
																				style={{ lineHeight: 1 }}
																			>
																				{format.dateTime(
																					new Date(
																						photos.docs[selectedPhoto].date
																					),
																					{
																						day: "numeric",
																						month: "long",
																						year: "numeric",
																					}
																				)}
																				,{" "}
																				{format.dateTime(
																					new Date(
																						photos.docs[selectedPhoto].date
																					),
																					{
																						hour: "numeric",
																						minute: "2-digit",
																					}
																				)}
																			</div>
																		</Dialog.Title>
																		{photos.docs[selectedPhoto].lens && (
																			<div
																				className="text-xs text-white/70 mt-0.5"
																				style={{ lineHeight: 1 }}
																			>
																				{typeof photos.docs[selectedPhoto]
																					.lens === "object" &&
																					photos.docs[selectedPhoto].lens
																						.name}
																			</div>
																		)}
																	</div>
																</div>
																<div className="dark flex gap-3 md:gap-6 select-none text-white/70">
																	{photos.docs[selectedPhoto].iso && (
																		<Tooltip
																			text={t("Content.Camera.iso")}
																			side="top"
																		>
																			<div className="flex gap-1 items-center">
																				<CameraIso />
																				<span className="text-sm">
																					{photos.docs[selectedPhoto].iso}
																				</span>
																			</div>
																		</Tooltip>
																	)}
																	{photos.docs[selectedPhoto].aperture && (
																		<Tooltip
																			text={t("Content.Camera.aperture")}
																			side="top"
																		>
																			<div className="flex gap-1 items-center">
																				<CameraAperture />
																				<span className="text-sm">
																					<i>f</i>/
																					{
																						photos.docs[selectedPhoto]
																							.aperture
																					}
																				</span>
																			</div>
																		</Tooltip>
																	)}
																	{photos.docs[selectedPhoto].shutterSpeed && (
																		<Tooltip
																			text={t("Content.Camera.shutterSpeed")}
																			side="top"
																		>
																			<div className="flex gap-1 items-center">
																				<CameraShutterSpeed />
																				<span className="text-sm">
																					{
																						photos.docs[selectedPhoto]
																							.shutterSpeed
																					}
																					s
																				</span>
																			</div>
																		</Tooltip>
																	)}
																	{photos.docs[selectedPhoto].focalLength && (
																		<Tooltip
																			text={t.rich("Content.Camera.focalLength", {
																				small: (chunks) => (
																					<span className="text-xs">
																						{chunks}
																					</span>
																				),
																			})}
																			side="top"
																		>
																			<div className="flex gap-1 items-center">
																				<CameraFocalLength />
																				<span className="text-sm">
																					{
																						photos.docs[selectedPhoto]
																							.focalLength
																					}
																					mm
																				</span>
																			</div>
																		</Tooltip>
																	)}
																</div>
															</m.div>
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
															className={`absolute inset-0 flex w-max items-center gap-2 ${
																direction !== 0 && "duration-500"
															} ease-out-quart`}
															style={{
																left: `calc(50% - ${selectedPhoto * 48}px - 32px`,
															}}
														>
															{photos.docs.map((photo, index) => (
																<button
																	key={index}
																	onClick={() => handleSelectPhoto({ id: index })}
																	className={`relative ${
																		selectedPhoto === index
																			? "h-12 w-16"
																			: "h-10 w-10 saturate-0 hover:saturate-100 opacity-50 hover:opacity-100"
																	} duration-300 ease-out-quart overflow-clip`}
																>
																	<Image
																		src={
																			photo.sizes?.thumbnail?.url ||
																			photo.url ||
																			""
																		}
																		width={
																			photo.sizes?.thumbnail?.width ||
																			photo.width ||
																			0
																		}
																		height={
																			photo.sizes?.thumbnail?.height ||
																			photo.height ||
																			0
																		}
																		alt={photo.alt || ""}
																		className="absolute top-0 inset-x-0 h-full object-cover"
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
					className="w-full group grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-1 sm:p-2 gap-1 sm:gap-2"
				>
					{[...Array(photos.docs.length)].map((_, index) => (
						<div key={index} className="w-full aspect-[3/2]" />
					))}
				</div>
			</div>
		</>
	);
}
