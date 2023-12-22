import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useTransition, a, easings } from "@react-spring/web";
import * as Tooltip from "@radix-ui/react-tooltip";

import LoadingCircle from "./LoadingCircle";
import MinaArtwork from "types/mina-artwork";

interface LightboxProps {
	images: MinaArtwork[];
	selectedImage: number;
	aspectRatio: "video" | "square";
	onClose: () => void;
}

export default function StrapiLightbox(props: LightboxProps) {
	const { t } = useTranslation();
	const [currentImage, setCurrentImage] = useState(props.selectedImage);
	const [loading, setLoading] = useState(true);

	const [transitionDirection, setTransitionDirection] = useState<"left" | "right">("left");

	const imageTransition = useTransition(props.images[currentImage], {
		key: currentImage,
		from: {
			opacity: 0,
			x: transitionDirection === "right" ? -40 : 40,
		},
		enter: {
			opacity: 1,
			x: 0,
			config: { duration: 750, easing: easings.easeOutExpo },
		},
		leave: {
			opacity: 0,
			x: transitionDirection === "right" ? 40 : -40,
			config: {
				duration: 200,
				easing: easings.easeInCubic,
			},
		},
		exitBeforeEnter: true,
	});

	const captionTransition = useTransition(props.images[currentImage], {
		key: currentImage,
		from: {
			opacity: 0,
			x: transitionDirection === "right" ? -20 : 20,
		},
		enter: {
			opacity: 1,
			x: 0,
			config: { duration: 750, easing: easings.easeOutExpo },
		},
		leave: {
			opacity: 0,
			x: transitionDirection === "right" ? 20 : -20,
			config: {
				duration: 200,
				easing: easings.easeInCubic,
			},
		},
		exitBeforeEnter: true,
		onDestroyed: () => setLoading(true),
	});

	const handlePrevious = () => {
		setTransitionDirection("right");
		setCurrentImage((prevIndex) => (prevIndex === 0 ? props.images.length - 1 : prevIndex - 1));
	};

	const handleNext = () => {
		setTransitionDirection("left");
		setCurrentImage((prevIndex) => (prevIndex === props.images.length - 1 ? 0 : prevIndex + 1));
	};

	const handleImage = (index: number) => {
		if (index !== currentImage) {
			setTransitionDirection(index > currentImage ? "left" : "right");
			setCurrentImage(index);
		}
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				handlePrevious();
			} else if (event.key === "ArrowRight") {
				handleNext();
			} else if (event.key === "Escape") {
				props.onClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<div className="fixed flex items-center justify-center bg-neutral-950/75 backdrop-blur-md z-50 inset-0">
					<Tooltip.Trigger asChild>
						<button
							className="group fixed z-50 top-3 md:top-5 right-3 md:right-5 text-neutral-50 w-10 h-10 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl"
							onClick={props.onClose}
						>
							<i className="ri-close-line" />
						</button>
					</Tooltip.Trigger>
					<button
						className="group fixed z-50 top-1/2 left-3 md:left-5 -translate-y-1/2 text-neutral-50 w-10 h-10 rounded-full bg-neutral-950/10 hover:bg-neutral-950/20 md:bg-neutral-50/10 md:hover:bg-neutral-50/20 duration-100 text-xl"
						onClick={handlePrevious}
					>
						<i className="ri-arrow-left-line group-active:mr-2 duration-200 group-active:duration-100 ease-in-out" />
					</button>
					<button
						className="group fixed z-50 top-1/2 right-3 md:right-5 -translate-y-1/2 text-neutral-50 w-10 h-10 rounded-full bg-neutral-950/10 hover:bg-neutral-950/20 md:bg-neutral-50/10 md:hover:bg-neutral-50/20 duration-100 text-xl"
						onClick={handleNext}
					>
						<i className="ri-arrow-right-line group-active:ml-2 duration-200 group-active:duration-100 ease-in-out" />
					</button>
					{captionTransition((style, image) => (
						<>
							<a.h3
								style={style}
								className="fixed flex flex-wrap w-10/12 items-center gap-3 md:gap-4 z-50 left-5 md:left-6 top-3 md:top-5 md:text-center"
							>
								{`${t("MINA:Content.Artworks.drawnBy")} ${image.attributes.artist}`}
								<div className="flex gap-3 md:gap-4">
									<Link
										href={image.attributes.creditUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="rounded-full"
									>
										<button
											tabIndex={-1}
											className="text-neutral-50 w-10 h-10 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl"
										>
											{image.attributes.creditUrl.startsWith("https://twitter.com/") ? (
												<i className="ri-twitter-line" />
											) : (
												<i className="ri-global-line" />
											)}
										</button>
									</Link>
								</div>
							</a.h3>
						</>
					))}

					<div className="fixed w-screen max-w-max z-50 bottom-2.5 overflow-x-auto">
						<div className="flex flex-nowrap items-center justify-center gap-2 h-14 my-0.5 w-max px-2.5 border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 bg-neutral-50/10 rounded-xl mx-3">
							{props.images.map((image, index) => (
								<div
									key={index}
									onClick={() => handleImage(index)}
									className={`relative ${
										currentImage === index
											? `${props.aspectRatio === "video" ? "w-16" : "w-9"} h-9 saturate-100 rounded-md`
											: "w-8 h-8 opacity-50 hover:opacity-100 saturate-0 hover:saturate-50 rounded-sm"
									} cursor-pointer duration-200 overflow-hidden`}
								>
									<Image
										src={`https://static.pprmint.art${image.attributes.artwork.data.attributes.formats.thumbnail.url}`}
										alt=""
										width={image.attributes.artwork.data.attributes.formats.thumbnail.width}
										height={image.attributes.artwork.data.attributes.formats.thumbnail.height}
										className={`h-full object-cover ${image.attributes.focus} bg-neutral-50/20`}
										onLoad={() => setLoading(false)}
									/>
								</div>
							))}
						</div>
					</div>
					<div className="fixed z-40 py-20 md:p-20 h-screen w-screen">
						{imageTransition((style, image) => (
							<a.div
								key={image.id}
								style={style}
								className="flex items-center justify-center w-full h-full drop-shadow-xl"
							>
								{loading && (
									<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
										<LoadingCircle />
									</div>
								)}
								<div onClick={props.onClose} className="absolute top-0 left-0 w-full h-full" />
								<Image
									src={`https://static.pprmint.art${image.attributes.artwork.data.attributes.url}`}
									alt={`${t("MINA:Content.Artworks.drawnBy")} ${image.attributes.artist}`}
									width={image.attributes.artwork.data.attributes.width}
									height={image.attributes.artwork.data.attributes.height}
									className="relative h-fit max-h-full w-auto"
								/>
							</a.div>
						))}
					</div>
				</div>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
}
