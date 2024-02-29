import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useSwipeable } from "react-swipeable";
import { useTransition, a, easings } from "@react-spring/web";
import * as Tooltip from "@radix-ui/react-tooltip";

import MinaArtwork from "src/types/mina-artwork";
import FadingImage from "../ui/FadingImage";

interface LightboxProps {
	images: MinaArtwork[];
	selectedImage: number;
	aspectRatio: "video" | "square";
	onClose: () => void;
}

export default function MinaLightbox(props: LightboxProps) {
	const { images, selectedImage, onClose } = props;

	const { t } = useTranslation();
	const [currentImage, setCurrentImage] = useState(selectedImage);

	const [transitionDirection, setTransitionDirection] = useState<"left" | "right">("left");

	const imageTransition = useTransition(images[currentImage], {
		key: currentImage,
		from: {
			x: transitionDirection === "right" ? -80 : 80,
			opacity: 1,
			clipPath:
				transitionDirection === "right"
					? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
					: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
		},
		enter: {
			x: 0,
			opacity: 1,
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
		},
		leave: {
			x: transitionDirection === "right" ? 160 : -160,
			opacity: 0,
			clipPath:
				transitionDirection === "right"
					? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
					: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
		},
		config: {
			mass: 1.5,
			tension: 200,
			friction: 30,
			clamp: true,
		},
	});

	const captionTransition = useTransition(images[currentImage], {
		key: currentImage,
		from: {
			opacity: 0,
			x: transitionDirection === "right" ? -30 : 30,
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
				duration: 100,
				easing: easings.easeInSine,
			},
		},
		exitBeforeEnter: true,
	});

	const handlePrevious = useCallback(() => {
		setTransitionDirection("right");
		setCurrentImage((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
	}, [images]);

	const handleNext = useCallback(() => {
		setTransitionDirection("left");
		setCurrentImage((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
	}, [images]);

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
				onClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [handlePrevious, handleNext, onClose, images]);

	// Swipey.
	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => handleNext(),
		onSwipedRight: () => handlePrevious(),
		trackMouse: true,
	});

	return (
		<div className="fixed flex items-center justify-center bg-neutral-950/90 z-50 inset-0">
			<button
				className="group fixed z-50 top-3 md:top-5 right-3 md:right-5 text-neutral-50 w-10 h-10 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl"
				onClick={onClose}
			>
				<i className="ri-close-line" />
			</button>
			<button
				className="hidden lg:block group fixed z-50 top-1/2 left-3 md:left-5 -translate-y-1/2 text-neutral-50 drop-shadow-[0_0_6px_#111a] w-10 h-10 rounded-full bg-neutral-950/10 hover:bg-neutral-950/20 md:bg-neutral-50/10 md:hover:bg-neutral-50/20 duration-100 text-xl"
				onClick={handlePrevious}
			>
				<i className="ri-arrow-left-line group-active:mr-2 duration-200 group-active:duration-100 ease-in-out" />
			</button>
			<button
				className="hidden lg:block group fixed z-50 top-1/2 right-3 md:right-5 -translate-y-1/2 text-neutral-50 drop-shadow-[0_0_6px_#111a] w-10 h-10 rounded-full bg-neutral-950/10 hover:bg-neutral-950/20 md:bg-neutral-50/10 md:hover:bg-neutral-50/20 duration-100 text-xl"
				onClick={handleNext}
			>
				<i className="ri-arrow-right-line group-active:ml-2 duration-200 group-active:duration-100 ease-in-out-cubic" />
			</button>
			{captionTransition(
				(style, image) =>
					image && (
						<>
							<a.h3
								style={style}
								className="fixed flex flex-wrap w-10/12 items-center gap-3 md:gap-4 z-50 left-5 md:left-6 top-3 md:top-5 md:text-center"
							>
								{`${t("MINA:Content.Artworks.drawnBy")} ${image.attributes.artist} ${
									image.attributes.heart ? "<3" : ""
								}`}
								{image.attributes.creditUrl && (
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
												) : image.attributes.creditUrl.startsWith("https://www.instagram.com/") ? (
													<i className="ri-instagram-line" />
												) : image.attributes.creditUrl.startsWith("https://www.youtube.com/") ? (
													<i className="ri-youtube-line" />
												) : (
													<i className="ri-global-line" />
												)}
											</button>
										</Link>
									</div>
								)}
							</a.h3>
						</>
					)
			)}

			<div className="fixed w-screen z-50 bottom-0 left-0 right-0 h-[86px] items-center overflow-clip bg-gradient-to-t from-neutral-950/50">
				<div
					className="flex gap-1 w-max h-full items-center duration-400 ease-out-cubic"
					style={{ transform: `translateX(calc((50vw - 32px) - (52px * ${currentImage})))` }}
				>
					{images.map(
						(image, index) =>
							image && (
								<div
									key={index}
									onClick={() => handleImage(index)}
									className={`group relative ${
										currentImage === index
											? "w-16 h-16 saturate-100 rounded-md"
											: "w-12 h-12 opacity-50 hover:opacity-100 saturate-0 hover:saturate-50 rounded-md"
									} cursor-pointer duration-200 overflow-hidden`}
								>
									<Image
										src={`https://static.pprmint.art${image.attributes.artwork.data.attributes.formats.thumbnail.url}`}
										alt=""
										width={image.attributes.artwork.data.attributes.formats.thumbnail.width}
										height={image.attributes.artwork.data.attributes.formats.thumbnail.height}
										className={`h-full object-cover ${image.attributes.focus} bg-neutral-50/20 ${
											image.attributes.nsfw && currentImage != index && "blur-sm group-hover:blur-none"
										} duration-200`}
									/>
									{image.attributes.nsfw && (
										<i className="text-neutral-50/75 ri-eye-off-line absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl group-hover:opacity-0 duration-200" />
									)}
								</div>
							)
					)}
				</div>
			</div>
			<div className="fixed z-40 py-20 md:p-20 h-screen w-screen" {...swipeHandlers}>
				{imageTransition(
					(style, image) =>
						image && (
							<a.div
								key={image.id}
								style={style}
								className="absolute inset-x-0 inset-y-20 lg:inset-x-20 lg:inset-y-[86px] flex items-center justify-center"
							>
								<div onClick={onClose} className="absolute top-0 left-0 w-full h-full" />
								<FadingImage
									src={`https://static.pprmint.art${image.attributes.artwork.data.attributes.url}`}
									quality={100}
									alt={`${t("MINA:Content.Artworks.drawnBy")} ${image.attributes.artist}`}
									width={image.attributes.artwork.data.attributes.width}
									height={image.attributes.artwork.data.attributes.height}
									className="relative h-fit max-h-full w-auto"
								/>
							</a.div>
						)
				)}
			</div>
		</div>
	);
}
