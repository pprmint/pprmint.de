import type { StaticImageData } from "next/image";

import { cn } from "@/utilities/cn";
import React from "react";

import type { MediaBlock as MediaBlockProps } from "@/payload-types";

import { Media } from "@/components/Media";

type Props = MediaBlockProps & {
	breakout?: boolean;
	captionClassName?: string;
	className?: string;
	enableGutter?: boolean;
	imgClassName?: string;
	videoClassName?: string;
	staticImage?: StaticImageData;
	disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = (props) => {
	const { className, enableGutter = true, imgClassName, videoClassName, media, staticImage } = props;

	return (
		<div
			className={cn(
				"mx-auto",
				{
					container: enableGutter,
				},
				className
			)}
		>
			{media && typeof media === "object" && media.mimeType?.includes("video") ? (
				<Media videoClassName={cn(videoClassName)} resource={media} controls={true} />
			) : (
				(media || staticImage) && <Media imgClassName={cn(imgClassName)} resource={media} src={staticImage} />
			)}
		</div>
	);
};
