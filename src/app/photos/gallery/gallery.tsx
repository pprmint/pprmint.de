"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations, useFormatter } from "next-intl";
import Image from "next/image";
import FadingImage from "src/components/ui/FadingImage";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Photos } from "src/types/photo";
import * as Dialog from "@radix-ui/react-dialog";
import Tooltip from "src/components/ui/Tooltip";
import CameraAperture from "src/icons/CameraAperture";
import CameraIso from "src/icons/CameraIso";
import CameraShutterSpeed from "src/icons/CameraShutterSpeed";
import CameraFocalLength from "src/icons/CameraFocalLength";
import Error from "src/icons/Error";

import * as m from "motion/react-client";
import { AnimatePresence } from "motion/react";

export default function Gallery({ photos, page }: { photos: Photos; page: number }) {
	const t = useTranslations("PHOTOS");
	const format = useFormatter();
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
		setTimeout(() => {
			setSelectedPhoto(id);
		}, 1);
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
		<div
			ref={galleryRef}
			className="group grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:p-2 border-y border-black/5 dark:border-white/5 sm:gap-2"
		>
			{photos.data.map((photo, index) => (
				<Dialog.Root key={photo.id}>
					<Dialog.Trigger asChild>
						<button
							onClick={() => setSelectedPhoto(index)}
							className="group/button overflow-clip bg-white dark:bg-neutral-950
								sm:[.group:hover_&:not(:hover)]:opacity-60
								outline outline-1 -outline-offset-1 outline-neutral-50/5
								focus-visible:z-10 scale-100 sm:hover:scale-[1.025] sm:active:scale-[0.975] hover:bg-white dark:hover:bg-neutral-900 sm:hover:shadow-lg active:shadow-none focus-visible:shadow-xl duration-250 ease-out-quart active:duration-75 cursor-pointer aspect-video"
						>
							<div className="scale-[1.025] sm:group-hover/button:scale-100 group-active/button:scale-100 sm:group-active/button:scale-[1.05] size-full relative duration-250 group-active/button:duration-75 ease-out-quart">
								<FadingImage
									src={`https://static.pprmint.de${photo.photo.formats.small.url}`}
									width={photo.photo.formats.small.width}
									height={photo.photo.formats.small.height}
									alt=""
									className="h-full min-w-full object-cover group-focus-visible/button:animate-pulse"
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
									{photos.data[selectedPhoto].photo.alternativeText ||
										photos.data[selectedPhoto].dateTime}
								</Dialog.Description>
								<TransformWrapper disablePadding onTransformed={(e) => setScale(e.state.scale)}>
									<TransformComponent>
										<div className="flex items-center justify-center w-screen h-screen max-h-svh">
											<AnimatePresence mode="popLayout">
												<m.div
													key={photos.data[selectedPhoto].id}
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
														const swipePower = (offset: number, velocity: number) => {
															return Math.abs(offset) * velocity;
														};
														setXOffset(offset.x);

														const swipe = swipePower(offset.x, velocity.x);
														if (swipe < -swipeConfidenceThreshold) {
															if (selectedPhoto < photos.data.length - 1) {
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
														src={`https://static.pprmint.de${photos.data[selectedPhoto].photo.url}`}
														width={photos.data[selectedPhoto].photo.width}
														height={photos.data[selectedPhoto].photo.height}
														alt={photos.data[selectedPhoto].photo.alternativeText || ""}
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
													key={photos.data[selectedPhoto].id}
													initial={{ opacity: 0 }}
													animate={{ opacity: 1, transition: { duration: 0.2 } }}
													exit={{ opacity: 0, transition: { duration: 0.2 } }}
													className="flex md:items-center flex-grow flex-col md:flex-row gap-3 md:gap-6"
												>
													<div className="flex items-center gap-3">
														<div>
															{photos.data[selectedPhoto].camera.logo ? (
																<Image
																	src={`https://static.pprmint.de${photos.data[selectedPhoto].camera.logo.url}`}
																	width={photos.data[selectedPhoto].camera.logo.width}
																	height={
																		photos.data[selectedPhoto].camera.logo.height
																	}
																	alt={photos.data[selectedPhoto].camera.name}
																	unoptimized
																	className="invert h-4 md:h-6 w-auto"
																/>
															) : (
																<p className="font-medium text-lg">
																	{photos.data[selectedPhoto].camera.name}
																</p>
															)}
														</div>
														<div className="flex flex-col items-start justify-start">
															<Dialog.Title asChild>
																<span className="text-sm" style={{ lineHeight: 1 }}>
																	{format.dateTime(
																		new Date(photos.data[selectedPhoto].dateTime),
																		{
																			day: "numeric",
																			month: "long",
																			year: "numeric",
																		}
																	)}
																	,{" "}
																	{format.dateTime(
																		new Date(photos.data[selectedPhoto].dateTime),
																		{
																			hour: "numeric",
																			minute: "2-digit",
																		}
																	)}
																</span>
															</Dialog.Title>
															{photos.data[selectedPhoto].lens && (
																<span
																	className="text-sm text-white/70"
																	style={{ lineHeight: 1 }}
																>
																	{photos.data[selectedPhoto].lens.name}
																</span>
															)}
														</div>
													</div>
													<div className="dark flex gap-3 md:gap-6 select-none text-white/70">
														{photos.data[selectedPhoto].iso && (
															<Tooltip text={t("Content.Camera.iso")} side="top">
																<div className="flex gap-1 items-center">
																	<CameraIso />
																	<span className="text-sm">
																		{photos.data[selectedPhoto].iso}
																	</span>
																</div>
															</Tooltip>
														)}
														{photos.data[selectedPhoto].aperture && (
															<Tooltip text={t("Content.Camera.aperture")} side="top">
																<div className="flex gap-1 items-center">
																	<CameraAperture />
																	<span className="text-sm">
																		<i>f</i>/{photos.data[selectedPhoto].aperture}
																	</span>
																</div>
															</Tooltip>
														)}
														{photos.data[selectedPhoto].shutter && (
															<Tooltip text={t("Content.Camera.shutterSpeed")} side="top">
																<div className="flex gap-1 items-center">
																	<CameraShutterSpeed />
																	<span className="text-sm">
																		{photos.data[selectedPhoto].shutter}s
																	</span>
																</div>
															</Tooltip>
														)}
														{photos.data[selectedPhoto].focalLength && (
															<Tooltip
																text={t.rich("Content.Camera.focalLength", {
																	small: (chunks) => (
																		<span className="text-xs">{chunks}</span>
																	),
																})}
																side="top"
															>
																<div className="flex gap-1 items-center">
																	<CameraFocalLength />
																	<span className="text-sm">
																		{photos.data[selectedPhoto].focalLength}mm
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
												style={{ left: `calc(50% - ${selectedPhoto * 48}px - 32px` }}
											>
												{photos.data.map((photo, index) => (
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
															src={`https://static.pprmint.de${photo.photo.formats.thumbnail.url}`}
															width={photo.photo.formats.thumbnail.width}
															height={photo.photo.formats.thumbnail.height}
															alt={photo.photo.alternativeText || ""}
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
			))}
		</div>
	);
}
