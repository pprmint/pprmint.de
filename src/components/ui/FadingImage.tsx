"use client";
import { MouseEventHandler, useState } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";
import { a, useSpring } from "@react-spring/web";

interface FadingImageProps extends ImageProps {
	className?: string;
}

export default function FadingImage({ className, ...rest }: FadingImageProps) {
	const [loaded, setLoaded] = useState(false);
	return (
		<Image
			onLoad={() => setLoaded(true)}
			className={`${loaded ? "opacity-100" : "opacity-0"} duration-500 ${className}`}
			draggable={false}
			{...rest}
		/>
	);
}
