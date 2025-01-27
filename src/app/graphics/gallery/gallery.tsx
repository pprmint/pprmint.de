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
		<div ref={galleryRef} className="group mb-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
			{works.works.data.map((work) => (
				<Link
					key={work.id}
					href={`/graphics/${work.documentId}`}
					className="group/button relative overflow-clip hover:rounded-lg focus-visible:rounded-lg bg-neutral-950
						odd:origin-left even:origin-right
						lg:odd:origin-center lg:even:origin-center
						lg:[&:nth-child(3n+1)]:origin-left lg:[&:nth-child(3n)]:origin-right
						xl:[&:nth-child(3n+1)]:origin-center xl:[&:nth-child(3n)]:origin-center
						xl:[&:nth-child(4n+1)]:origin-left xl:[&:nth-child(4n)]:origin-right
						3xl:[&:nth-child(4n+1)]:origin-center 3xl:[&:nth-child(4n)]:origin-center
						3xl:[&:nth-child(5n+1)]:origin-left 3xl:[&:nth-child(5n)]:origin-right
						[.group:hover_&:not(:hover)]:opacity-75
						hover:scale-[1.02] focus-visible:scale-[1.02] active:scale-[1.01] hover:z-10 focus-visible:z-10 justify hover:ring-1 ring-neutral-50/10 hover:shadow-lg focus-visible:shadow-xl duration-250 ease-out-quint active:duration-75 cursor-pointer aspect-video"
				>
					<FadingImage
						src={`https://static.pprmint.de${
							work.cover.formats.medium !== undefined ? work.cover.formats.medium.url : work.cover.url
						}`}
						width={work.cover.formats.medium ? work.cover.formats.medium.width : work.cover.width}
						height={work.cover.formats.medium ? work.cover.formats.medium.height : work.cover.height}
						alt=""
						className={`h-full min-w-full object-cover ${work.coverFocus} group-focus-visible/button:animate-pulse`}
					/>
				</Link>
			))}
		</div>
	);
}
