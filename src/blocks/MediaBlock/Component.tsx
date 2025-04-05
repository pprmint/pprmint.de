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
	staticImage?: StaticImageData;
	disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = (props) => {
	const {
		className,
		enableGutter = true,
		imgClassName,
		media,
		staticImage,
	} = props;

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
			{(media || staticImage) && (
				<Media
					imgClassName={cn(imgClassName)}
					resource={media}
					src={staticImage}
				/>
			)}
		</div>
	);
};
