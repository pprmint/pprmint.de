"use client";
import { SiInstagram, SiTwitter, SiYoutube } from "@icons-pack/react-simple-icons";
import * as Dialog from "@radix-ui/react-dialog";
import { useTransition, a, config, easings } from "@react-spring/web";
import { EyeOff, Globe, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import FadingImage from "src/components/ui/FadingImage";
import { Link } from "src/navigation";
import MinaArtwork, { MinaArtworks } from "src/types/mina-artwork";

export default function Gallery(artworks: { artworks: MinaArtworks }) {
	const t = useTranslations("MINA");
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(0);
	const selectedArtwork = artworks.artworks.data[selected > artworks.artworks.data.length ? 0 : selected];
	const [selectedVariant, setSelectedVariant] = useState(0);

	// Reset to 0 after the lightbox is closed.
	// Avoids errors when navigating between pages if a variant was selected.
	useEffect(() => {
		!open &&
			setTimeout(() => {
				setSelected(0);
				setSelectedVariant(0);
			}, 200);
	}, [open]);
	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<div className="mb-10 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{artworks.artworks.data.map((art: MinaArtwork, index) => (
					<Dialog.Trigger asChild key={art.id}>
						<button
							className="relative group overflow-hidden rounded-lg hover:contrast-75 active:contrast-100 active:opacity-75 duration-200 active:duration-75 cursor-pointer aspect-square focus-visible:animate-pulse"
							onClick={() => setSelected(index)}
						>
							<FadingImage
								src={`https://static.pprmint.art${art.attributes.artwork.data[0].attributes.url}`}
								width={art.attributes.artwork.data[0].attributes.width}
								height={art.attributes.artwork.data[0].attributes.height}
								alt=""
								className={`h-full min-w-full object-cover ${art.attributes.focus} bg-neutral-900 ${
									art.attributes.nsfw && "blur-lg group-hover:blur-none opacity-50 group-hover:opacity-100 duration-200"
								}`}
								unoptimized={art.attributes.artwork.data[0].attributes.url.includes(".gif")}
							/>
							{art.attributes.nsfw && (
								<EyeOff
									size={36}
									className="stroke-neutral-50 opacity-75 ri-eye-off-line absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-0 duration-200"
								/>
							)}
						</button>
					</Dialog.Trigger>
				))}
			</div>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-neutral-950 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-50" />
				<Dialog.Content
					className={`fixed z-60 flex flex-col gap-12 items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-svh w-screen max-w-max data-[state=open]:animate-scale-up data-[state=closed]:animate-scale-down origin-top-left overflow-clip duration-200 focus-visible:outline-none`}
				>
					<FadingImage
						src={`https://static.pprmint.art${selectedArtwork.attributes.artwork.data[selectedVariant].attributes.url}`}
						width={selectedArtwork.attributes.artwork.data[selectedVariant].attributes.width}
						height={selectedArtwork.attributes.artwork.data[selectedVariant].attributes.height}
						alt=""
						className="max-h-svh max-w-[90vw] w-auto py-16"
						unoptimized
					/>
					<div className="absolute flex items-center top-0 inset-x-0 h-16 text-xl font-display">
						<div className="flex items-center flex-grow gap-3">
							<Dialog.Title asChild>
								<p>
									{t("Content.Artworks.drawnBy")}
									<span className="font-semibold text-neutral-50">
										{selectedArtwork.attributes.artist.data.attributes.name}
									</span>
									{selectedArtwork.attributes.heart && <span className="text-red"> ♥</span>}
								</p>
							</Dialog.Title>
							{selectedArtwork.attributes.artist.data.attributes.creditUrl && (
								<Link
									href={selectedArtwork.attributes.artist.data.attributes.creditUrl!}
									target="_blank"
									rel="noopener noreferrer"
									className="rounded-full"
								>
									<button
										tabIndex={-1}
										className="text-neutral-50 inline-flex items-center justify-center size-9 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl"
									>
										{selectedArtwork.attributes.artist.data.attributes.creditUrl!.startsWith("https://twitter.com/") ? (
											<SiTwitter size={16} />
										) : selectedArtwork.attributes.artist.data.attributes.creditUrl!.startsWith(
												"https://www.instagram.com/"
										  ) ? (
											<SiInstagram size={16} />
										) : selectedArtwork.attributes.artist.data.attributes.creditUrl!.startsWith(
												"https://www.youtube.com/"
										  ) ? (
											<SiYoutube size={16} />
										) : (
											<Globe size={16} />
										)}
									</button>
								</Link>
							)}
						</div>
						<Dialog.Close asChild>
							<button className="text-neutral-50 inline-flex items-center justify-center size-9 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl">
								<X />
							</button>
						</Dialog.Close>
					</div>
					{selectedArtwork.attributes.artwork.data.length >= 2 && (
						<div className="absolute flex items-center justify-center bottom-0 inset-x-0 h-16">
							{selectedArtwork.attributes.artwork.data.map((variant, index) => (
								<button
									key={index}
									className={`group h-full ${
										index == selectedVariant ? "w-16" : "w-9"
									} px-2 duration-200 ease-out-quint`}
									onClick={() => setSelectedVariant(index)}
								>
									<div
										className={`h-2 ${
											index == selectedVariant ? "bg-neutral-50" : "bg-neutral-800 group-hover:bg-neutral-700"
										} rounded-full duration-200 ease-out-quint`}
									/>
								</button>
							))}
						</div>
					)}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
