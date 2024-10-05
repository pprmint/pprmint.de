"use client";
import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface FadingImageProps extends ImageProps {
	className?: string;
}

export default function FadingImage({ className, ...rest }: FadingImageProps) {
	const [loaded, setLoaded] = useState(false);
	return (
		/* eslint-disable-next-line jsx-a11y/alt-text */
		<Image
			onLoad={() => setLoaded(true)}
			className={`${loaded ? "opacity-100" : "opacity-0"} ${className}`}
			style={{ transition: "opacity 0.5s" }}
			draggable={false}
			{...rest}
		/>
	);
}
