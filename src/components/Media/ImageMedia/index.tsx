"use client";

import type { StaticImageData } from "next/image";

import { cn } from "@/utilities/cn";
import React from "react";

import type { Props as MediaProps } from "../types";

import { cssVariables } from "@/cssVariables";
import FadingImage from "@/components/ui/FadingImage";
import { getClientSideURL } from "@/utilities/getURL";
import BrokenImage from "@/icons/BrokenImage";

const { breakpoints } = cssVariables;

export const ImageMedia: React.FC<MediaProps> = (props) => {
	const {
		alt: altFromProps,
		fill,
		pictureClassName,
		imgClassName,
		priority,
		resource,
		size: sizeFromProps,
		src: srcFromProps,
		loading: loadingFromProps,
	} = props;

	let width: number | undefined;
	let height: number | undefined;
	let alt = altFromProps;
	let src: StaticImageData | string = srcFromProps || "";

	if (!src && resource && typeof resource === "object") {
		const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource;

		width = fullWidth!;
		height = fullHeight!;
		alt = altFromResource || "";

		const cacheTag = resource.updatedAt;

		src = `${getClientSideURL()}${url}?${cacheTag}`;
	}

	const loading = loadingFromProps || (!priority ? "lazy" : undefined);

	// NOTE: this is used by the browser to determine which image to download at different screen sizes
	const sizes = sizeFromProps
		? sizeFromProps
		: Object.entries(breakpoints)
				.map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
				.join(", ");

	if (src === "") {
		return (
			<div className="flex gap-3 items-center justify-center aspect-video outline-1 outline-dashed outline-black/5 dark:outline-white/5 -outline-offset-8">
				<BrokenImage />
				{alt}
			</div>
		);
	} else {
		return (
			<picture className={cn(pictureClassName)}>
				<FadingImage
					hideSpinner
					alt={alt || ""}
					className={cn(imgClassName)}
					fill={fill}
					height={!fill ? height : undefined}
					priority={priority}
					quality={100}
					loading={loading}
					sizes={sizes}
					src={src}
					width={!fill ? width : undefined}
				/>
			</picture>
		);
	}
};
