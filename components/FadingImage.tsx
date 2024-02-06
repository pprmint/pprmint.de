"use client";
import { MouseEventHandler, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { a, useSpring } from "@react-spring/web";

export default function FadingImage({
	src,
	alt,
	width,
	height,
	className,
	quality,
	fill,
	priority,
}: {
	src: string | StaticImageData;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
	quality?: number;
	fill?: boolean;
	priority?: boolean;
}) {
	const [loaded, setLoaded] = useState(false);

	return (
		<Image
			src={src}
			alt={alt}
			fill={fill}
			priority={priority}
			width={width}
			height={height}
			quality={quality}
			onLoad={() => setLoaded(true)}
			className={`${loaded ? "opacity-100" : "opacity-0"} duration-500 ${className}`}
		/>
	);
}
