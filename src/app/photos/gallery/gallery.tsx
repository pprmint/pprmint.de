"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations, useFormatter } from "next-intl";
import Image from "next/image";
import FadingImage from "src/components/ui/FadingImage";
import CameraAperture from "src/icons/CameraAperture";
import CameraIso from "src/icons/CameraIso";
import CameraShutterSpeed from "src/icons/CameraShutterSpeed";
import CameraFocalLength from "src/icons/CameraFocalLength";
import Error from "src/icons/Error";
import { Photos } from "src/types/photo";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useEffect, useRef, useState } from "react";
import Tooltip from "src/components/ui/Tooltip";

export default function Gallery(photos: { photos: Photos }) {
	const t = useTranslations("PHOTOS");
	const format = useFormatter();

	const galleryRef = useRef<HTMLDivElement>(null);
	const [init, setInit] = useState(false);
	useEffect(() => {
		if (init && galleryRef.current) {
			scrollTo({ top: galleryRef.current?.getBoundingClientRect().top + scrollY - 105 });
		}
		setInit(true);
	}, [photos]);

	return (
		<div
			ref={galleryRef}
			className="group mb-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 md:p-2 border-y border-black/5 dark:border-white/5 md:gap-2"
		>
			{photos.photos.data.map((photo) => (
				<Dialog.Root key={photo.id}>
					<Dialog.Trigger asChild>
						<button
							className="group/button overflow-clip bg-white dark:bg-neutral-950
								[.group:hover_&:not(:hover)]:opacity-60
								outline outline-1 -outline-offset-1 outline-neutral-50/5
								hover:z-10 focus-visible:z-10 scale-100 hover:scale-[1.025] active:scale-[0.975] hover:bg-white dark:hover:bg-neutral-900 hover:shadow-lg active:shadow-none focus-visible:shadow-xl duration-250 ease-out-quart active:duration-75 cursor-pointer aspect-video"
						>
							<div className="scale-[1.025] group-hover/button:scale-100 group-active/button:scale-[1.05] size-full relative duration-250 group-active/button:duration-75 ease-out-quart">
								<FadingImage
									src={`https://static.pprmint.de${photo.photo.formats.small.url}`}
									width={photo.photo.formats.small.width}
									height={photo.photo.formats.small.height}
									alt=""
									className={`h-full min-w-full object-cover group-focus-visible/button:animate-pulse`}
									unoptimized={photo.photo.url.includes(".gif")}
								/>
							</div>
						</button>
					</Dialog.Trigger>
					<Dialog.Portal>
						<Dialog.Overlay className="bg-neutral-950 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-90" />
						<Dialog.Content
							className={`text-neutral-50 fixed inset-0 z-100 max-h-svh w-screen data-[state=open]:animate-scale-up data-[state=closed]:animate-scale-down origin-center duration-200 focus-visible:outline-none`}
						>
							<TransformWrapper disablePadding>
								<TransformComponent>
									<div className="flex items-center justify-center w-screen h-screen max-h-svh">
										<FadingImage
											src={`https://static.pprmint.de${photo.photo?.url}`}
											width={photo.photo?.width}
											height={photo.photo?.height}
											alt=""
											className="max-h-svh w-auto mx-auto py-16 drop-shadow-2xl dark:drop-shadow-none"
											unoptimized
										/>
									</div>
								</TransformComponent>
								<div className="absolute flex justify-between items-center top-0 pl-6 pr-4 h-16 inset-x-0">
									<Dialog.Title asChild>
										<p className=" text-xl">
											{format.dateTime(new Date(photo.dateTime), {
												day: "numeric",
												month: "long",
												year: "numeric",
											})}
											,{" "}
											{format.dateTime(new Date(photo.dateTime), {
												hour: "numeric",
												minute: "2-digit",
											})}
										</p>
									</Dialog.Title>
									<Dialog.Close asChild>
										<button className="p-2.5 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl">
											<Error />
										</button>
									</Dialog.Close>
								</div>
								<div className="absolute flex flex-col md:flex-row gap-2 items-center justify-end pb-3 md:pb-0 bottom-0 px-6 h-20 md:h-16 inset-x-0">
									<div className="flex items-center md:flex-grow gap-3 md:gap-6 mx-auto">
										{photo.camera.logo ? (
											<Image
												src={`https://static.pprmint.de${photo.camera.logo.url}`}
												width={photo.camera.logo.width}
												height={photo.camera.logo.height}
												alt={photo.camera.name}
												unoptimized
												className="invert h-4 md:h-6 w-auto"
											/>
										) : (
											<p className="font-medium text-lg">{photo.camera.name}</p>
										)}
										{photo.lens && <p className="hidden sm:block text-sm text-white/70">{photo.lens.name}</p>}
									</div>
									<div className="flex gap-3 md:gap-6 select-none mx-auto text-white/70">
										{photo.iso && (
											<Tooltip text={t("Content.Camera.iso")} side="top">
												<div className="flex gap-1 items-center">
													<CameraIso />
													<span className="font-mono text-sm">{photo.iso}</span>
												</div>
											</Tooltip>
										)}
										{photo.aperture && (
											<Tooltip text={t("Content.Camera.aperture")} side="top">
												<div className="flex gap-1 items-center">
													<CameraAperture />
													<span className="font-mono text-sm">
														<i>f</i>/{photo.aperture}
													</span>
												</div>
											</Tooltip>
										)}
										{photo.shutter && (
											<Tooltip text={t("Content.Camera.shutterSpeed")} side="top">
												<div className="flex gap-1 items-center">
													<CameraShutterSpeed />
													<span className="font-mono text-sm">{photo.shutter}s</span>
												</div>
											</Tooltip>
										)}
										{photo.focalLength && (
											<Tooltip
												text={t.rich("Content.Camera.focalLength", {
													small: (chunks) => <span className="text-xs">{chunks}</span>,
												})}
												side="top"
											>
												<div className="flex gap-1 items-center">
													<CameraFocalLength />
													<span className="font-mono text-sm">{photo.focalLength}mm</span>
												</div>
											</Tooltip>
										)}
									</div>
								</div>
							</TransformWrapper>
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
			))}
		</div>
	);
}
