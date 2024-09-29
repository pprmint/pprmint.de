"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Error from "src/icons/Error";
import EyeDisabled from "src/icons/EyeDisabled";
import Globe from "src/icons/Globe";
import Instagram from "src/icons/Instagram";
import Twitter from "src/icons/Twitter";
import YouTube from "src/icons/YouTube";
import { Link } from "src/navigation";
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
			className="mb-10 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
		>
			{artworks.artworks.data.map((art, index) => (
				<Dialog.Root key={art.id} onOpenChange={handleClose}>
					<Dialog.Trigger asChild>
						<button className="relative group overflow-hidden rounded-lg hover:contrast-75 active:contrast-100 active:opacity-75 duration-200 active:duration-75 cursor-pointer aspect-square focus-visible:animate-pulse">
							<Image
								src={`https://static.pprmint.de${
									art.artwork[0].formats.small
										? art.artwork[0].formats.small.url
										: art.artwork[0].url
								}`}
								width={art.artwork[0].width}
								height={art.artwork[0].height}
								alt=""
								className={`h-full min-w-full object-cover ${art.focus} active:opacity-75 duration-250 active:duration-75 ease-out-quint group-focus-visible/button:animate-pulse ${art.nsfw && "blur-md opacity-50 group-hover:blur-none group-hover:opacity-100"}`}
							/>
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
										<Image
											src={`https://static.pprmint.de${art.artwork[selectedVariant]?.url}`}
											width={art.artwork[selectedVariant]?.width}
											height={art.artwork[selectedVariant]?.height}
											alt=""
											className={`max-h-svh w-auto mx-auto py-16 ${art.pixelart && "pixelated"}`}
											unoptimized
										/>
									</div>
								</TransformComponent>
								<div className="absolute flex justify-between items-center top-0 pl-6 pr-4 h-16 bg-gradient-to-b from-neutral-950/90 to-neutral-950/75 inset-x-0">
									<div className="flex items-center flex-grow gap-3 text-xl font-display">
										<Dialog.Title asChild>
											<p>
												<span className="text-neutral-50/70">{t("Content.Artworks.drawnBy")}</span>
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
													) : art.artist.creditUrl!.startsWith(
															"https://www.youtube.com/"
													  ) ? (
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
									<div className="absolute flex flex-row items-center justify-center bottom-0 px-6 h-16 bg-gradient-to-t from-neutral-950/90 to-neutral-950/75 inset-x-0">
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
