"use client";
import { MouseEventHandler, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { a, useSpring } from "@react-spring/web";

export default function FadingImage({
	src,
	alt,
	onClick,
	width,
	height,
	imageClassName,
	containerClassName,
	quality,
	fill,
	priority,
}: {
	src: string | StaticImageData;
	alt: string;
	onClick?: MouseEventHandler;
	width?: number;
	height?: number;
	imageClassName?: string;
	containerClassName?: string;
	quality?: number;
	fill?: boolean;
	priority?: boolean;
}) {
	const [loaded, setLoaded] = useState(false);

	const fadeIn = useSpring({
		from: { opacity: 0 },
		to: { opacity: loaded ? 1 : 0 },
	});

	return (
		<a.div onClick={onClick} style={fadeIn} className={containerClassName}>
			<Image
				src={src}
				alt={alt}
				fill={fill}
				priority={priority}
				width={width}
				height={height}
				quality={quality}
				onLoad={() => setLoaded(true)}
				className={imageClassName}
			/>
		</a.div>
	);
}
