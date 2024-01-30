import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useTransition, a, easings } from "@react-spring/web";
import * as Tooltip from "@radix-ui/react-tooltip";

import LoadingCircle from "./LoadingCircle";
import Work from "types/work";

interface FlyoutProps {
	works: Work[];
	selectedWork: number;
	onClose: () => void;
}

export default function StrapiLightbox(props: FlyoutProps) {
	const { works, selectedWork, onClose } = props;

	const { t } = useTranslation();
	const [currentWork, setCurrentWork] = useState(selectedWork);
	const [loading, setLoading] = useState(true);

	const [transitionDirection, setTransitionDirection] = useState<"left" | "right">("left");

	const imageTransition = useTransition(works[currentWork], {
		key: currentWork,
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

	const captionTransition = useTransition(works[currentWork], {
		key: currentWork,
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

	const handlePrevious = useCallback(() => {
		setTransitionDirection("right");
		setCurrentWork((prevIndex) => (prevIndex === 0 ? works.length - 1 : prevIndex - 1));
	}, [works]);

	const handleNext = useCallback(() => {
		setTransitionDirection("left");
		setCurrentWork((prevIndex) => (prevIndex === works.length - 1 ? 0 : prevIndex + 1));
	}, [works]);

	const handleImage = (index: number) => {
		if (index !== currentWork) {
			setTransitionDirection(index > currentWork ? "left" : "right");
			setCurrentWork(index);
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
	}, [handlePrevious, handleNext, onClose, works]);

	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<div className="fixed flex items-center justify-center bg-neutral-950/75 backdrop-blur-md z-50 inset-0">
					<Tooltip.Trigger asChild>
						<button
							className="group fixed z-50 top-3 md:top-5 right-3 md:right-5 text-neutral-50 w-10 h-10 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl"
							onClick={onClose}
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
								{`${image.attributes.title}`}
							</a.h3>
						</>
					))}
					<div className="fixed w-screen max-w-max z-50 bottom-2.5 overflow-x-auto">
						<div className="flex flex-nowrap items-center justify-center h-14 my-0.5 w-max px-2.5 ">
							{works.map((work, index) => (
								<div
									key={index}
									onClick={() => handleImage(index)}
									className={`relative mx-1 rounded-full ${
										currentWork === index
											? "bg-neutral-50 w-6 h-3"
											: "bg-transparent w-2 hover:w-3 hover:h-3 hover:mx-0.5"
									} h-2 border-2 border-neutral-50 cursor-pointer duration-200 overflow-hidden`}
								></div>
							))}
						</div>
					</div>
					<div className="fixed z-40 py-20 md:p-20 h-screen w-screen">
						{imageTransition((style, work) => (
							<a.div
								key={work.id}
								style={style}
								className="flex items-center justify-center w-full h-full drop-shadow-xl"
							>
								{loading && (
									<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
										<LoadingCircle />
									</div>
								)}
								<div onClick={onClose} className="absolute top-0 left-0 w-full h-full" />
								<Image
									src={`https://static.pprmint.art${work.attributes.cover.data.attributes.url}`}
									alt={work.attributes.title}
									width={work.attributes.cover.data.attributes.width}
									height={work.attributes.cover.data.attributes.height}
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
