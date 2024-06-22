"use client";

import { easings, useTransition, a } from "@react-spring/web";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import ChevronLeft from "src/icons/ChevronLeft";
import ChevronRight from "src/icons/ChevronRight";

export default function Carousel({ images, className }: { images: StaticImageData[]; className?: string }) {
	const [current, setCurrent] = useState(0);
	const [transitionDirection, setTransitionDirection] = useState<"left" | "right">("left");
	const imageTransition = useTransition(current, {
		key: current,
		from: {
			opacity: 0,
			x: transitionDirection === "right" ? -40 : 40,
		},
		enter: {
			opacity: 1,
			x: 0,
			config: { duration: 500, easing: easings.easeOutCirc },
		},
		leave: {
			opacity: 0,
			x: transitionDirection === "right" ? 40 : -40,
			config: {
				duration: 150,
				easing: easings.easeInCubic,
			},
		},
		exitBeforeEnter: true,
	});

	const handlePrevious = () => {
		setTransitionDirection("right");
		setCurrent((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
	};

	const handleNext = () => {
		setTransitionDirection("left");
		setCurrent((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
	};

	const handleImage = (index: number) => {
		if (index !== current) {
			setTransitionDirection(index > current ? "left" : "right");
			setCurrent(index);
		}
	};

	return (
		<div className={`group/container relative overflow-clip ${className}`}>
			<button
				onClick={handlePrevious}
				className="group opacity-0 group-hover/container:opacity-100 absolute inline-flex items-center justify-center z-10 top-1/2 -translate-y-1/2 p-2 left-3 backdrop-blur-md bg-neutral-950/75 hover:bg-neutral-900/75 active:bg-neutral-950/75 rounded-full duration-200 active:duration-75"
			>
				<ChevronLeft className="fill-neutral-50 size-5 group-active:-translate-x-1 duration-100" />
			</button>
			<button
				onClick={handleNext}
				className="group opacity-0 group-hover/container:opacity-100 absolute inline-flex items-center justify-center z-10 top-1/2 -translate-y-1/2 p-2 right-3 backdrop-blur-md bg-neutral-950/75 hover:bg-neutral-900/75 active:bg-neutral-950/75 rounded-full duration-200 active:duration-75"
			>
				<ChevronRight className="fill-neutral-50 size-5 group-active:translate-x-1 duration-100" />
			</button>
			<div className="absolute z-10 flex items-center justify-center gap-2 -bottom-14 group-hover/container:bottom-0 inset-x-0 bg-gradient-to-t from-neutral-950/50 h-14 duration-300 ease-out">
				{images.map((_, index) => (
					<button
						onClick={() => handleImage(index)}
						key={index}
						className={`size-3 rounded-full ${
							current === index ? "bg-neutral-50" : "bg-neutral-950/25 hover:bg-neutral-50/50"
						} shadow-md duration-100`}
					/>
				))}
			</div>
			{imageTransition((styles, image) => (
				<a.div
					key={image}
					style={styles}
					className="flex items-center justify-center w-full h-full drop-shadow-xl"
				>
					<Image src={images[image]} alt="" className="relative h-fit max-h-full w-auto" />
				</a.div>
			))}
		</div>
	);
}
