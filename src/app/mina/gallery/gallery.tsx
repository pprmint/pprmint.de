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
	useEffect(() => {
		if (init && galleryRef.current) {
			scrollTo({ top: galleryRef.current?.getBoundingClientRect().top + scrollY - 200 });
		}
		setInit(true);
	}, [artworks]);

	return (
		<div
			ref={galleryRef}
			className="group mb-10 grid md:gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
		>
			{artworks.artworks.data.map((art, index) => (
				<Dialog.Root key={art.id} onOpenChange={handleClose}>
					<Dialog.Trigger asChild>
						<button
							className="group/button relative overflow-clip md:rounded-lg hover:rounded-lg focus-visible:rounded-lg bg-neutral-950
    							odd:origin-left even:origin-right
    							md:odd:origin-center md:even:origin-center
    							md:[&:nth-child(3n+1)]:origin-left md:[&:nth-child(3n)]:origin-right
    							lg:[&:nth-child(3n+1)]:origin-center lg:[&:nth-child(3n)]:origin-center
    							lg:[&:nth-child(4n+1)]:origin-left lg:[&:nth-child(4n)]:origin-right
    							xl:[&:nth-child(4n+1)]:origin-center xl:[&:nth-child(4n)]:origin-center
    							xl:[&:nth-child(5n+1)]:origin-left xl:[&:nth-child(5n)]:origin-right
									[.group:hover_&:not(:hover)]:opacity-75
    							hover:scale-[1.03] focus-visible:scale-[1.03] active:scale-[1.015] hover:z-10 focus-visible:z-10 justify outline outline-1 -outline-offset-1 outline-neutral-50/10 hover:bg-white dark:hover:bg-neutral-900 hover:shadow-lg focus-visible:shadow-xl duration-250 ease-out-quart active:duration-75 cursor-pointer aspect-square"
						>
							<FadingImage
								src={`https://static.pprmint.de${
									art.artwork[0].formats.small ? art.artwork[0].formats.small.url : art.artwork[0].url
								}`}
								width={art.artwork[0].width}
								height={art.artwork[0].height}
								alt=""
								style={{ transition: "opacity 0.5s", transitionDelay: `opacity ${index * 0.05}s` }}
								className={`h-full min-w-full object-cover ${art.focus} group-focus-visible/button:animate-pulse`}
							/>
							{art.nsfw && (
								<div className="absolute inset-0 flex items-center justify-center backdrop-blur-lg group-focus-visible/button:backdrop-blur-sm bg-neutral-950/75 group-focus-visible/button:bg-transparent group-hover/button:opacity-0 duration-300 ease-out-quint pointer-events-none">
									<EyeDisabled className="size-[30px] fill-neutral-50 opacity-50" />
								</div>
							)}
						</button>
					</Dialog.Trigger>
					<Dialog.Portal>
						<Dialog.Overlay className="bg-neutral-950 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-90" />
						<Dialog.Content
							className={`text-neutral-50 fixed inset-0 z-100 h-screen max-h-svh w-screen max-w-max data-[state=open]:animate-scale-up data-[state=closed]:animate-scale-down origin-center duration-200 focus-visible:outline-none`}
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
								<div className="absolute flex justify-between items-center top-0 pl-6 pr-4 h-16 bg-gradient-to-b from-neutral-950/75 to-neutral-950/50 backdrop-blur-lg inset-x-0">
									<div className="flex items-center flex-grow gap-3 text-xl ">
										<Dialog.Title asChild>
											<p>
												<span className="text-neutral-50/70">
													{t("Content.Artworks.drawnBy")}
												</span>
												{art.artist.name}
												{art.heart && <span className="text-red"> ♥</span>}
											</p>
										</Dialog.Title>
										{art.artist.creditUrl && (
											<Link
												href={art.artist.creditUrl!}
												target="_blank"
												rel="noopener noreferrer"
												className="rounded-full"
											>
												<button
													tabIndex={-1}
													className=" p-2.5 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl"
												>
													{art.artist.creditUrl!.startsWith("https://twitter.com/") ? (
														<Twitter />
													) : art.artist.creditUrl!.startsWith(
															"https://www.instagram.com/"
													  ) ? (
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
									<div className="absolute flex flex-row items-center justify-center bottom-0 px-6 h-16 bg-gradient-to-t from-neutral-950/75 to-neutral-950/50 backdrop-blur-lg inset-x-0">
										{art.artwork.map((variant, index) => (
											<button
												key={index}
												className={`group h-full ${
													index === selectedVariant ? "w-16" : "w-9"
												} px-2 duration-200 ease-out-quint`}
												onClick={() => setSelectedVariant(index)}
											>
												<div
													className={`h-2 ${
														index === selectedVariant
															? "bg-neutral-50"
															: "bg-neutral-50/20 group-hover:bg-neutral-50/50"
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
