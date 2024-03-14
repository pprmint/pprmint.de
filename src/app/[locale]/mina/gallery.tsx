"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { useState } from "react";
import FadingImage from "src/components/ui/FadingImage";
import { Link } from "src/navigation";
import MinaArtwork, { MinaArtworks } from "src/types/mina-artwork";

export default function Gallery(artworks: { artworks: MinaArtworks }) {
	const t = useTranslations("MINA");
	const [selected, setSelected] = useState(0);
	const selectedArtwork = artworks.artworks.data[selected > artworks.artworks.data.length ? 0 : selected];
	return (
		<Dialog.Root>
			<div className="mb-10 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{artworks.artworks.data.map((art: MinaArtwork, index: number) => (
					<Dialog.Trigger asChild key={art.id}>
						<button
							className="relative group overflow-hidden rounded-lg hover:contrast-75 active:contrast-100 active:opacity-75 duration-200 active:duration-75 cursor-pointer aspect-square focus-visible:animate-pulse"
							onClick={() => setSelected(index)}
						>
							<FadingImage
								src={`https://static.pprmint.art${art.attributes.artwork.data.attributes.url}`}
								width={art.attributes.artwork.data.attributes.width}
								height={art.attributes.artwork.data.attributes.height}
								alt=""
								className={`h-full min-w-full object-cover ${art.attributes.focus} bg-neutral-900 ${
									art.attributes.nsfw && "blur-lg group-hover:blur-none opacity-50 group-hover:opacity-100 duration-200"
								}`}
								unoptimized={art.attributes.artwork.data.attributes.url.includes(".gif")}
							/>
							{art.attributes.nsfw && (
								<i className="text-neutral-50/75 ri-eye-off-line absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl group-hover:opacity-0 duration-200" />
							)}
						</button>
					</Dialog.Trigger>
				))}
			</div>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-neutral-950 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-50" />
				<Dialog.Content
					className={`group fixed z-60 flex flex-col gap-12 items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90svh] w-screen max-w-max border border-transparent hover:border-neutral-900 data-[state=open]:animate-scale-up data-[state=closed]:animate-scale-down origin-top-left overflow-clip duration-200 focus-visible:outline-none`}
				>
					<FadingImage
						src={`https://static.pprmint.art${selectedArtwork.attributes.artwork.data.attributes.url}`}
						width={selectedArtwork.attributes.artwork.data.attributes.width}
						height={selectedArtwork.attributes.artwork.data.attributes.height}
						alt=""
						className="relative h-fit max-h-[90svh] max-w-[90vw] w-fit"
						unoptimized={selectedArtwork.attributes.artwork.data.attributes.url.includes(".gif")}
					/>
					<Dialog.Title asChild>
						<div className="absolute flex items-center bottom-0 inset-x-0 h-16 translate-y-full group-hover:translate-y-0 px-6 backdrop-blur-md bg-gradient-to-t from-neutral-950/90 to-neutral-950/75 duration-250 group-hover:duration-500 ease-in-cubic group-hover:ease-out-quint">
							<p className="flex-grow">
								{t("Content.Artworks.drawnBy")}
								<span className="font-medium text-neutral-50">
									{selectedArtwork.attributes.artist.data.attributes.name}
								</span>
                                {selectedArtwork.attributes.heart && (
                                    <span className="text-red"> ♥</span>
                                )}
							</p>
							{selectedArtwork.attributes.artist.data.attributes.creditUrl && (
								<Link
									href={selectedArtwork.attributes.artist.data.attributes.creditUrl!}
									target="_blank"
									rel="noopener noreferrer"
									className="rounded-full"
								>
									<button
										tabIndex={-1}
										className="text-neutral-50 size-9 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl"
									>
										{selectedArtwork.attributes.artist.data.attributes.creditUrl!.startsWith(
											"https://twitter.com/"
										) ? (
											<i className="ri-twitter-line" />
										) : selectedArtwork.attributes.artist.data.attributes.creditUrl!.startsWith(
												"https://www.instagram.com/"
										  ) ? (
											<i className="ri-instagram-line" />
										) : selectedArtwork.attributes.artist.data.attributes.creditUrl!.startsWith(
												"https://www.youtube.com/"
										  ) ? (
											<i className="ri-youtube-line" />
										) : (
											<i className="ri-global-line" />
										)}
									</button>
								</Link>
							)}
						</div>
					</Dialog.Title>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
