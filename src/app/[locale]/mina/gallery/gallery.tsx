"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { useState } from "react";
import FadingImage from "src/components/ui/FadingImage";
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
	return (
		<div className="group mb-10 grid md:gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{artworks.artworks.data.map((art) => (
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
    							hover:scale-[1.03] focus-visible:scale-[1.03] active:scale-[1.015] hover:z-10 focus-visible:z-10 justify ring-1 ring-inset ring-neutral-50/10 hover:shadow-2xl hover:shadow-neutral-950/50 focus-visible:shadow-2xl duration-250 ease-out-quart active:duration-75 cursor-pointer aspect-square"
						>
							<FadingImage
								src={`https://static.pprmint.de${art.attributes.artwork.data[0].attributes.url}`}
								width={art.attributes.artwork.data[0].attributes.width}
								height={art.attributes.artwork.data[0].attributes.height}
								alt=""
								className={`h-full min-w-full object-cover ${art.attributes.focus} [.group:hover_&:not(:hover)]:opacity-50 active:opacity-75 duration-250 active:duration-75 ease-out-quint group-focus-visible/button:animate-pulse`}
								unoptimized={art.attributes.artwork.data[0].attributes.url.includes(".gif")}
							/>
							{art.attributes.nsfw && (
								<div className="absolute inset-0 backdrop-blur-lg group-focus-visible/button:backdrop-blur-sm bg-neutral-950/75 group-focus-visible/button:bg-transparent group-hover/button:opacity-0 duration-300 ease-out-quint pointer-events-none">
									<EyeDisabled className="p-2.5 fill-neutral-50 opacity-75 ri-eye-off-line absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
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
											src={`https://static.pprmint.de${art.attributes.artwork.data[selectedVariant]?.attributes.url}`}
											width={art.attributes.artwork.data[selectedVariant]?.attributes.width}
											height={art.attributes.artwork.data[selectedVariant]?.attributes.height}
											alt=""
											className={`max-h-svh w-auto mx-auto py-16 ${
												art.attributes.pixelart && "pixelated"
											}`}
											unoptimized
										/>
									</div>
								</TransformComponent>
								<div className="absolute flex justify-between items-center top-0 pl-6 pr-4 h-16 bg-gradient-to-b from-neutral-950/75 to-neutral-950/50 backdrop-blur-lg inset-x-0">
									<div className="flex items-center flex-grow gap-3 text-xl font-display">
										<Dialog.Title asChild>
											<p>
												<span className="text-neutral-50/70">{t("Content.Artworks.drawnBy")}</span>
												{art.attributes.artist.data.attributes.name}
												{art.attributes.heart && <span className="text-red"> ♥</span>}
											</p>
										</Dialog.Title>
										{art.attributes.artist.data.attributes.creditUrl && (
											<Link
												href={art.attributes.artist.data.attributes.creditUrl!}
												target="_blank"
												rel="noopener noreferrer"
												className="rounded-full"
											>
												<button
													tabIndex={-1}
													className=" p-2.5 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl"
												>
													{art.attributes.artist.data.attributes.creditUrl!.startsWith(
														"https://twitter.com/"
													) ? (
														<Twitter />
													) : art.attributes.artist.data.attributes.creditUrl!.startsWith(
															"https://www.instagram.com/"
													  ) ? (
														<Instagram />
													) : art.attributes.artist.data.attributes.creditUrl!.startsWith(
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
								{art.attributes.artwork.data.length >= 2 && (
									<div className="absolute flex flex-row items-center justify-center bottom-0 px-6 h-16 bg-gradient-to-t from-neutral-950/75 to-neutral-950/50 backdrop-blur-lg inset-x-0">
										{art.attributes.artwork.data.map((variant, index) => (
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
