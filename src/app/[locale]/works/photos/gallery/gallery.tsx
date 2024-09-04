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
import { Photos } from "src/types/photo";

export default function Gallery(photos: { photos: Photos }) {
	const t = useTranslations("PHOTOS");
	const [selectedVariant, setSelectedVariant] = useState(0);

	// Reset to 0 after the lightbox is closed.
	function handleClose() {
		setTimeout(() => {
			setSelectedVariant(0);
		}, 200);
	}
	return (
		<div className="group mb-10 grid md:gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{photos.photos.data.map((photo) => (
				<Dialog.Root key={photo.id} onOpenChange={handleClose}>
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
    							hover:scale-[1.03] focus-visible:scale-[1.03] active:scale-[1.015] hover:z-10 focus-visible:z-10 justify ring-1 ring-inset ring-neutral-50/10 hover:shadow-2xl hover:shadow-neutral-950/50 focus-visible:shadow-2xl duration-250 ease-out-quphoto active:duration-75 cursor-pointer aspect-[3/2]"
						>
							<FadingImage
								src={`https://static.pprmint.de${photo.attributes.photo.data.attributes.url}`}
								width={photo.attributes.photo.data.attributes.width}
								height={photo.attributes.photo.data.attributes.height}
								alt=""
								className={`h-full min-w-full object-cover [.group:hover_&:not(:hover)]:opacity-50 active:opacity-75 duration-250 active:duration-75 ease-out-quint group-focus-visible/button:animate-pulse`}
								unoptimized={photo.attributes.photo.data.attributes.url.includes(".gif")}
							/>
						</button>
					</Dialog.Trigger>
					<Dialog.Portal>
						<Dialog.Overlay className="bg-neutral-950 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-90" />
						<Dialog.Content
							className={`fixed z-100 flex flex-col gap-12 items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-svh w-screen max-w-max data-[state=open]:animate-scale-up data-[state=closed]:animate-scale-down origin-top-left overflow-clip duration-200 focus-visible:outline-none`}
						>
							<FadingImage
								src={`https://static.pprmint.de${photo.attributes.photo.data?.attributes.url}`}
								width={photo.attributes.photo.data?.attributes.width}
								height={photo.attributes.photo.data?.attributes.height}
								alt=""
								className="max-h-svh max-w-[90vw] w-auto py-16"
								unoptimized
							/>
							<div className="absolute flex items-center top-4 inset-x-0">
								<div className="flex items-center flex-grow gap-3 text-xl font-display">
									<Dialog.Title asChild>
										<p>
											<span className="font-semibold text-neutral-50">{photo.attributes.dateTime}</span>
										</p>
									</Dialog.Title>
									<Dialog.Close asChild>
										<button className="text-neutral-50 p-2.5 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl">
											<Error />
										</button>
									</Dialog.Close>
								</div>
							</div>
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
			))}
		</div>
	);
}
