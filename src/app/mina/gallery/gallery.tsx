"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import FadingImage from "src/components/ui/FadingImage";
import Error from "src/icons/Error";
import EyeDisabled from "src/icons/EyeDisabled";
import Globe from "src/icons/Globe";
import Instagram from "src/icons/Instagram";
import Twitter from "src/icons/Twitter";
import YouTube from "src/icons/YouTube";
import Link from "next/link";
import { MinaArtworks } from "src/types/mina-artwork";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function Gallery(artworks: { artworks: MinaArtworks }) {
	const t = useTranslations("MINA");
	const [selectedVariant, setSelectedVariant] = useState(0);

	// Reset to 0 after the lightbox is closed.
	function handleClose() {
		setTimeout(() => {
			setSelectedVariant(0);
		}, 200);
	}

	const galleryRef = useRef<HTMLDivElement>(null);
	const [init, setInit] = useState(false);
	// useEffect(() => {
	// 	if (init && galleryRef.current) {
	// 		scrollTo({ top: galleryRef.current?.getBoundingClientRect().top + scrollY - 200 });
	// 	}
	// 	setInit(true);
	// }, [artworks]);

	return (
		<div ref={galleryRef} className="group mb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 md:p-2 border-y border-black/5 dark:border-white/5 md:gap-2">
			{artworks.artworks.data.map((art, index) => (
				<Dialog.Root key={art.id} onOpenChange={handleClose}>
					<Dialog.Trigger asChild>
						<button
							className="group/button overflow-clip bg-white dark:bg-neutral-950
									[.group:hover_&:not(:hover)]:opacity-60
									outline -outline-offset-1 outline-neutral-50/5
    							hover:z-10 focus-visible:z-10 scale-100 hover:scale-[1.025] active:scale-[0.975] hover:bg-white dark:hover:bg-neutral-900 hover:shadow-lg active:shadow-none focus-visible:shadow-xl duration-250 ease-out-quart active:duration-75 aspect-square"
						>
							<div className="scale-[1.025] group-hover/button:scale-100 group-active/button:scale-[1.05] size-full relative duration-250 group-active/button:duration-75 ease-out-quart">
								<FadingImage
									src={`https://static.pprmint.de${art.artwork[0].formats.small ? art.artwork[0].formats.small.url : art.artwork[0].url}`}
									width={art.artwork[0].width}
									height={art.artwork[0].height}
									alt=""
									hideSpinner
									style={{ transition: "opacity 0.5s", transitionDelay: `opacity ${index * 0.05}s` }}
									className={`size-full object-cover ${art.focus} group-focus-visible/button:animate-pulse`}
								/>
							</div>
							{art.nsfw && (
								<div className="absolute inset-0 flex items-center justify-center backdrop-blur-lg group-focus-visible/button:backdrop-blur-xs bg-neutral-950/75 group-focus-visible/button:bg-transparent group-hover/button:opacity-0 duration-300 ease-out-quint pointer-events-none">
									<EyeDisabled className="size-[30px] fill-neutral-50 opacity-50" />
								</div>
							)}
						</button>
					</Dialog.Trigger>
					<Dialog.Portal>
						<Dialog.Overlay className="bg-neutral-950/90 backdrop-blur-xl data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-90" />
						<Dialog.Content
							className={`text-white fixed inset-0 z-100 h-screen max-h-svh w-screen max-w-max data-[state=open]:animate-scale-up data-[state=closed]:animate-scale-down origin-center duration-200 focus-visible:outline-hidden`}
						>
							<TransformWrapper disablePadding>
								<TransformComponent>
									<div className="flex items-center justify-center w-screen h-screen max-h-svh">
										<FadingImage
											src={`https://static.pprmint.de${art.artwork[selectedVariant]?.url}`}
											width={art.artwork[selectedVariant]?.width}
											height={art.artwork[selectedVariant]?.height}
											alt=""
											className={`max-h-svh w-auto mx-auto py-16 ${art.pixelart && "pixelated"} drop-shadow-2xl dark:drop-shadow-none`}
											unoptimized
										/>
									</div>
								</TransformComponent>
								<div className="absolute flex justify-between items-center top-0 pl-6 pr-4 h-16 bg-linear-to-b from-neutral-950/75 inset-x-0">
									<div className="flex items-center grow gap-3 text-xl ">
										<Dialog.Title asChild>
											<p>
												<span className="text-white/70">{t("Content.Artworks.drawnBy")}</span>
												{art.artist.name}
												{art.heart && <span className="text-red"> ♥</span>}
											</p>
										</Dialog.Title>
										{art.artist.creditUrl && (
											<Link href={art.artist.creditUrl!} target="_blank" rel="noopener noreferrer" className="rounded-full">
												<button tabIndex={-1} className=" p-2.5 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl">
													{art.artist.creditUrl!.startsWith("https://twitter.com/") ? (
														<Twitter />
													) : art.artist.creditUrl!.startsWith("https://www.instagram.com/") ? (
														<Instagram />
													) : art.artist.creditUrl!.startsWith("https://www.youtube.com/") ? (
														<YouTube />
													) : (
														<Globe />
													)}
												</button>
											</Link>
										)}
									</div>
									<Dialog.Close asChild>
										<button className="p-2.5 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl">
											<Error />
										</button>
									</Dialog.Close>
								</div>
								{art.artwork.length >= 2 && (
									<div className="absolute flex flex-row items-center justify-center bottom-0 px-6 h-16 bg-linear-to-t from-neutral-950/75 inset-x-0">
										{art.artwork.map((variant, index) => (
											<button
												key={index}
												className={`group h-full ${index === selectedVariant ? "w-16" : "w-9"} px-2 duration-200 ease-out-quint`}
												onClick={() => setSelectedVariant(index)}
											>
												<div
													className={`h-2 ${
														index === selectedVariant ? "bg-neutral-50" : "bg-neutral-50/20 group-hover:bg-neutral-50/50"
													} rounded-full duration-200 ease-out-quint`}
												/>
											</button>
										))}
									</div>
								)}
							</TransformWrapper>
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
			))}
		</div>
	);
}
