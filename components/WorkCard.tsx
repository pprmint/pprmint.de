import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useSpring, a, easings } from "@react-spring/web";
import * as Tooltip from "@radix-ui/react-tooltip";

import Work from "types/work";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import VideoPlayer from "./VideoPlayer";
import FadingImage from "./FadingImage";

interface FlyoutProps {
	work: Work;
	onClose: () => void;
}

export default function WorkCard(props: FlyoutProps) {
	const cardAnimation = useSpring({
		from: {
			opacity: 0,
			y: 40,
		},
		to: {
			opacity: 1,
			y: 0,
			config: { duration: 750, easing: easings.easeOutExpo },
		},
		delay: 100,
	});

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				props.onClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [props.onClose]);

	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<div className="fixed flex items-center justify-center bg-neutral-950/75 z-50 inset-0">
					<div className="absolute z-40 md:p-24 h-screen w-screen overflow-auto">
						<div onClick={props.onClose} className="fixed inset-0" />
						<a.div
							style={cardAnimation}
							className="flex max-w-8xl mx-auto drop-shadow-xl overflow-auto border border-neutral-950 md:rounded-xl shadow-xl shadow-neutral-950/50"
						>
							<div className="w-full h-max md:max-h-none bg-neutral-950 md:border border-neutral-900 md:rounded-xl md:overflow-hidden">
								<div className="relative overflow-hidden h-80 md:h-1/3-screen">
									<button
										className="group fixed md:absolute z-50 top-3 md:top-5 right-3 md:right-5 text-neutral-50 w-10 h-10 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl"
										onClick={props.onClose}
									>
										<i className="ri-close-line" />
									</button>
									<Image
										src={`https://static.pprmint.art${props.work.attributes.cover.data.attributes.formats.thumbnail.url}`}
										alt={props.work.attributes.title}
										fill
										className={`object-cover ${props.work.attributes.coverFocus} h-full min-w-full contrast-[0.87] blur-lg`}
									/>
									<div
										className="absolute inset-0"
										style={{
											backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24"><path d="M0 10V0h10a2 2 0 0 0 4 0h10v10a2 2 0 0 0 0 4v10H14a2 2 0 0 0-4 0H0V14a2 2 0 0 0 0-4Z" style="fill:%23111"/></svg>')`,
											backgroundRepeat: "repeat",
											backgroundPosition: "top",
										}}
									/>
									<div className="absolute inset-0 flex items-end justify-start px-6 lg:px-9 pb-3 bg-gradient-to-t from-neutral-950 to-neutral-950/75">
										<h1>
											{props.work.attributes.title}
											<span className="text-green">.</span>
										</h1>
									</div>
								</div>
								<div className="px-6 lg:px-9 prose-a:text-link-external">
									<Markdown remarkPlugins={[remarkGfm]}>{props.work.attributes.text}</Markdown>
								</div>
								<hr className="m-6 lg:m-9 border-neutral-900" />
								{props.work.attributes.gallery.data.map((media) =>
									media.attributes.mime.startsWith("image/") ? (
										<FadingImage
											key={media.id.toString()}
											src={`https://static.pprmint.art${media.attributes.url}`}
											alt={media.attributes.alternativeText}
											width={media.attributes.width}
											height={media.attributes.height}
											quality={90}
											className="w-full h-auto animate-skeleton-pulse"
										/>
									) : (
										media.attributes.mime.startsWith("video") && (
											<video
												controls
												key={media.id.toString()}
												src={`https://static.pprmint.art${media.attributes.url}`}
											/>
										)
									)
								)}
							</div>
						</a.div>
					</div>
				</div>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
}
