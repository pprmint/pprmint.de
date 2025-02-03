"use client";
import { useEffect, useRef, useState } from "react";
import FadingImage from "src/components/ui/FadingImage";
import Link from "next/link";
import { Works } from "src/types/work";

export default function GalleryGrid(works: { works: Works }) {
	const galleryRef = useRef<HTMLDivElement>(null);
	const [init, setInit] = useState(false);
	useEffect(() => {
		if (init && galleryRef.current) {
			scrollTo({ top: galleryRef.current?.getBoundingClientRect().top + scrollY - 168 });
		}
		setInit(true);
	}, [works]);

	return (
		<div ref={galleryRef} className="group mb-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 md:p-2 border-y border-black/5 dark:border-white/5 md:gap-2">
			{works.works.data.map((work) => (
				<Link
					key={work.id}
					href={`/graphics/${work.documentId}`}
					className="group/button overflow-clip bg-white dark:bg-neutral-950
						[.group:hover_&:not(:hover)]:opacity-60
						outline outline-1 -outline-offset-1 outline-neutral-50/5
						hover:z-10 focus-visible:z-10 scale-100 hover:scale-[1.025] active:scale-[0.975] hover:bg-white dark:hover:bg-neutral-900 hover:shadow-lg active:shadow-none focus-visible:shadow-xl duration-250 ease-out-quart active:duration-75 cursor-pointer aspect-video"
				>
					<div className="scale-[1.025] group-hover/button:scale-100 group-active/button:scale-[1.05] size-full relative duration-250 group-active/button:duration-75 ease-out-quart">
						<FadingImage
							src={`https://static.pprmint.de${work.cover.formats.medium !== undefined ? work.cover.formats.medium.url : work.cover.url}`}
							width={work.cover.formats.medium ? work.cover.formats.medium.width : work.cover.width}
							height={work.cover.formats.medium ? work.cover.formats.medium.height : work.cover.height}
							alt=""
							className={`h-full min-w-full object-cover ${work.coverFocus} group-focus-visible/button:animate-pulse`}
						/>
					</div>
				</Link>
			))}
		</div>
	);
}
