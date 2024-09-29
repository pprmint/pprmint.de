"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Link } from "src/navigation";
import { Works } from "src/types/work";

export default function GalleryGrid(works: { works: Works }) {
	const t = useTranslations("GRAPHICS");

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
					className="group/button relative overflow-clip bg-neutral-950 hover:contrast-75 active:contrast-100 active:opacity-75 duration-200 active:duration-75 cursor-pointer aspect-video"
				>
					<Image
						src={`https://static.pprmint.de${
							work.cover.formats.medium !== undefined ? work.cover.formats.medium.url : work.cover.url
						}`}
						width={work.cover.formats.medium ? work.cover.formats.medium.width : work.cover.width}
						height={work.cover.formats.medium ? work.cover.formats.medium.height : work.cover.height}
						alt=""
						className={`h-full min-w-full object-cover ${work.coverFocus} active:opacity-75 duration-250 active:duration-75 ease-out-quint group-focus-visible/button:animate-pulse`}
					/>
				</Link>
			))}
		</div>
	);
}
