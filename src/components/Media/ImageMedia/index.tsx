"use client";

import type { StaticImageData } from "next/image";

import { cn } from "@/utilities/cn";
import React from "react";

import type { Props as MediaProps } from "../types";

import FadingImage from "@/components/ui/FadingImage";
import { getClientSideURL } from "@/utilities/getURL";
import BrokenImage from "@/icons/BrokenImage";

export const ImageMedia: React.FC<MediaProps> = (props) => {
	const {
		alt: altFromProps,
		fill,
		imgClassName,
		priority,
		resource,
		size,
		src: srcFromProps,
		loading: loadingFromProps,
	} = props;

	let width: number | undefined;
	let height: number | undefined;
	let alt = altFromProps;
	let src: StaticImageData | string = srcFromProps || "";

	if (!src && resource && typeof resource === "object") {
		const { alt: altFromResource, height: fullHeight, url, width: fullWidth, sizes, updatedAt } = resource;

		alt = altFromResource || "";

		const selectedSize = size && sizes?.[size as keyof typeof sizes];
		const imageUrl = selectedSize?.url || url;
		width = selectedSize?.width || fullWidth!;
		height = selectedSize?.height || fullHeight!;

		const cacheTag = updatedAt;
		if (imageUrl) {
			// Used to include getClientSideURL() but since Next.js is now pissy about private IP resolution I can't be bothered to come up with a better fix.
			src = `${imageUrl}?${cacheTag}`;
		}
	}

	const loading = loadingFromProps || (!priority ? "lazy" : undefined);

	if (src === "") {
		return (
			<div className="flex gap-3 items-center justify-center aspect-video outline-1 outline-dashed outline-black/5 dark:outline-white/5 -outline-offset-8">
				<BrokenImage />
				{alt}
			</div>
		);
	} else {
		return (
			<FadingImage
				suppressHydrationWarning
				hideSpinner
				alt={alt || ""}
				className={cn(imgClassName)}
				fill={fill}
				height={!fill ? height : undefined}
				priority={priority}
				quality={100}
				loading={loading}
				src={src}
				width={!fill ? width : undefined}
				focalX={(resource && typeof resource === "object" && resource.focalX) || 50}
				focalY={(resource && typeof resource === "object" && resource.focalY) || 50}
			/>
		);
	}
};
