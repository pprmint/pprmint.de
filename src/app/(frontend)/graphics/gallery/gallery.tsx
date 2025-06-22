"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { PaginatedDocs } from "payload";
import { Graphic } from "@/payload-types";
import { Media } from "@/components/Media";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-client";

export default function GalleryGrid({ graphics, page }: { graphics: PaginatedDocs<Graphic>; page: number }) {
	const galleryRef = useRef<HTMLDivElement>(null);
	const initRef = useRef(false);

	useEffect(() => {
		if (initRef.current && galleryRef.current) {
			scrollTo({ top: galleryRef.current?.getBoundingClientRect().top + scrollY - 168 });
		} else {
			initRef.current = true;
		}
	}, [page]);

	return (
		<div
			ref={galleryRef}
			className="group grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-2 border-y border-black/5 dark:border-white/5 md:gap-2"
		>
			<AnimatePresence mode="popLayout">
				{graphics.docs.map((graphic, index) => (
					<m.div
						key={graphic.id}
						layout
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
							transition: { delay: 0.25 + index / 100 },
						}}
						exit={{
							opacity: 0,
						}}
						transition={{ type: "spring", bounce: 0, duration: 0.4 }}
						className="relative w-full aspect-video"
					>
						<Link
							style={{
								backgroundImage:
									'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M2%202V1H0V0h1v2z%22%20fill%3D%22%238881%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E")',
								backgroundSize: "10%",
							}}
							key={graphic.id}
							href={`/graphics/${graphic.slug}`}
							className="group/button absolute inset-0 overflow-clip bg-white dark:bg-neutral-950
						  outline outline-1 -outline-offset-1 outline-neutral-50/5
						  hover:z-10 focus-visible:z-10 scale-100 hover:scale-[1.025] active:scale-[0.975] hover:bg-white dark:hover:bg-neutral-900 hover:shadow-lg active:shadow-none focus-visible:shadow-xl duration-250 ease-out-quart active:duration-75 cursor-pointer aspect-video"
						>
							<div className="scale-[1.025] group-hover/button:scale-100 group-active/button:scale-[1.05] size-full relative duration-250 group-active/button:duration-75 ease-out-quart">
								{typeof graphic.thumbnail === "object" && (
									<Media
										resource={graphic.thumbnail}
										size="sd"
										imgClassName="object-cover group-focus-visible/button:animate-pulse"
										fill
									/>
								)}
							</div>
						</Link>
					</m.div>
				))}
			</AnimatePresence>
		</div>
	);
}
