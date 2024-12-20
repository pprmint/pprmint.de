"use client";
import { Fragment, useState } from "react";
import Image, { ImageProps } from "next/image";
import Spinner from "../loading/Glow";

interface FadingImageProps extends ImageProps {
	className?: string;
	hideSpinner?: boolean;
}

export default function FadingImage({ className, hideSpinner, ...rest }: FadingImageProps) {
	const [loaded, setLoaded] = useState(false);
	return (
		<Fragment>
			{!hideSpinner && !loaded && (
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<Spinner />
				</div>
			)}
			<Image
				onLoad={() => setLoaded(true)}
				className={`${loaded ? "opacity-100" : "opacity-0"} ${className}`}
				style={{ transition: "opacity 0.5s" }}
				draggable={false}
				{...rest}
			/>
		</Fragment>
	);
}
