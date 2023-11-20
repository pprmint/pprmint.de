import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useTransition, a, easings, config } from "@react-spring/web";
import * as Tooltip from "@radix-ui/react-tooltip";

import LoadingCircle from "./LoadingCircle";

interface Image {
	caption: string;
	src: string;
	width: number;
	height: number;
	link?: string;
	linkExternal?: boolean;
	linkText?: string;
	linkColor?: string;
	linkIcon?: string;
	secondaryLink?: string;
	secondaryLinkExternal?: boolean;
	secondaryLinkText?: string;
	secondaryLinkColor?: string;
	secondaryLinkIcon?: string;
	noDownload?: boolean;
}

interface LightboxProps {
	images: Image[];
	selectedImage: number;
	aspectRatio: "video" | "square";
	onClose: () => void;
}

export default function Lightbox(props: LightboxProps) {
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
							<a.h1
								style={style}
								className="fixed flex flex-wrap w-10/12 items-center gap-3 md:gap-4 z-50 left-5 md:left-6 top-3 md:top-5 text-2xl md:text-3xl text-neutral-50 font-display font-medium md:text-center"
							>
								{image.caption}
								<div className="flex gap-3 md:gap-4">
									{image.link && (
										<Link
											href={image.link}
											target="_blank"
											rel="noopener noreferrer"
											className="rounded-full"
										>
											<button
												tabIndex={-1}
												className="text-neutral-50 w-10 h-10 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl"
											>
												<i className={image.linkIcon} />
											</button>
										</Link>
									)}
									{image.secondaryLink && (
										<Link
											href={image.secondaryLink}
											target="_blank"
											rel="noopener noreferrer"
											className="rounded-full"
										>
											<button
												tabIndex={-1}
												className="text-neutral-50 w-10 h-10 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl"
											>
												<i
													className={
														image.secondaryLinkIcon ? image.secondaryLinkIcon : "ri-external-link-line"
													}
												/>
											</button>
										</Link>
									)}
									{!image.noDownload && (
										<Link href={image.src} target="_blank" rel="noopener noreferrer" className="rounded-full">
											<button
												tabIndex={-1}
												className="text-neutral-50 w-10 h-10 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl"
											>
												<i className="ri-external-link-line" />
											</button>
										</Link>
									)}
								</div>
							</a.h1>
						</>
					))}

					<div className="fixed w-screen max-w-max z-50 bottom-2.5 overflow-x-auto">
						<div className="flex flex-nowrap items-center justify-center gap-2 h-14 my-0.5 w-max px-2.5 border border-neutral-50/10 ring-1 ring-neutral-950/75 bg-neutral-50/10 rounded-xl mx-3">
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
										src={image.src}
										alt=""
										fill
										sizes="10vw"
										quality={10}
										className="object-cover bg-neutral-50/20"
										onLoadingComplete={() => setLoading(false)}
									/>
								</div>
							))}
						</div>
					</div>
					<div className="fixed z-40 py-20 md:p-20 h-screen w-screen">
						{imageTransition((style, image) => (
							<a.div
								key={image.caption}
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
									src={image.src}
									alt={image.caption}
									width={image.width}
									height={image.height}
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
