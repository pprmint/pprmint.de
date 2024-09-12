"use client";
import { useState } from "react";
import { Link } from "src/navigation";
import { useTransition, a } from "@react-spring/web";
import { useTranslations } from "next-intl";

import FadingImage from "src/components/ui/FadingImage";
import ArrowRight from "src/icons/ArrowRight";

export default function ThreeThingies() {
	const t = useTranslations("HOME");
	const [focused, setFocused] = useState("");

	const imageTransition = useTransition(focused, {
		from: {
			opacity: 0,
		},
		enter: {
			opacity: 1,
		},
		leave: {
			opacity: 0,
		},
	});
	return (
		<section
			className="relative grid grid-rows-3 min-h-screen w-screen overflow-clip"
			onMouseLeave={() => setFocused("")}
		>
			<Link
				onFocus={() => setFocused("graphics")}
				onMouseEnter={() => setFocused("graphics")}
				href="/graphics"
				className="z-20 group relative flex p-6 md:p-9 xl:px-16 size-full lg:items-center bg-neutral-950/90 hover:bg-neutral-950/75 active:bg-neutral-950/85 focus-visible:bg-neutral-950/75 duration-300 active:duration-75"
			>
				<div className="md:translate-y-4 lg:group-hover:translate-y-0 lg:group-focus-visible:translate-y-0 duration-500 ease-out-quint">
					<h1>
						{t("Content.TheThreeThingies.Graphics.heading")}
						<span className="text-green">.</span>
					</h1>
					<div className="lg:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 text-balance lg:w-full duration-300">
						<p>{t("Content.TheThreeThingies.Graphics.text")}</p>
					</div>
				</div>
				<ArrowRight className="absolute h-1/2 lg:h-full w-max bottom-0 right-3 opacity-0 group-hover:opacity-100 -translate-x-1/2 group-hover:translate-x-0 p-9 lg:p-20 fill-neutral-50 stroke-0 group-hover:stroke-1 stroke-neutral-50 duration-200 group-hover:duration-400 ease-in group-hover:ease-out-quint drop-shadow-2xl" />
			</Link>
			<Link
				onFocus={() => setFocused("photos")}
				onMouseEnter={() => setFocused("photos")}
				href="/photos"
				className="z-20 group relative flex p-6 md:p-9 xl:px-16 size-full lg:items-center bg-neutral-950/90 hover:bg-neutral-950/75 active:bg-neutral-950/85 focus-visible:bg-neutral-950/75 duration-300 active:duration-75"
			>
				<div className="md:translate-y-4 lg:group-hover:translate-y-0 lg:group-focus-visible:translate-y-0 duration-500 ease-out-quint">
					<h1>
						{t("Content.TheThreeThingies.Photos.heading")}
						<span className="text-red">.</span>
					</h1>
					<div className="lg:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 text-balance lg:w-full duration-300">
						<p>{t("Content.TheThreeThingies.Photos.text")}</p>
					</div>
				</div>
				<ArrowRight className="absolute h-1/2 lg:h-full w-max bottom-0 right-3 opacity-0 group-hover:opacity-100 -translate-x-1/2 group-hover:translate-x-0 p-9 lg:p-20 fill-neutral-50 stroke-0 group-hover:stroke-1 stroke-neutral-50 duration-200 group-hover:duration-400 ease-in group-hover:ease-out-quint drop-shadow-2xl" />
			</Link>
			<Link
				onFocus={() => setFocused("projects")}
				onMouseEnter={() => setFocused("projects")}
				href="/projects"
				className="z-20 group relative flex p-6 md:p-9 xl:px-16 size-full lg:items-center bg-neutral-950/90 hover:bg-neutral-950/75 active:bg-neutral-950/85 focus-visible:bg-neutral-950/75 duration-300 active:duration-75"
			>
				<div className="md:translate-y-4 lg:group-hover:translate-y-0 lg:group-focus-visible:translate-y-0 duration-500 ease-out-quint">
					<h1>
						{t("Content.TheThreeThingies.Projects.heading")}
						<span className="text-blue">.</span>
					</h1>
					<div className="lg:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 text-balance lg:w-full duration-300">
						<p>{t("Content.TheThreeThingies.Projects.text")}</p>
					</div>
				</div>
				<ArrowRight className="absolute h-1/2 lg:h-full w-max bottom-0 right-3 opacity-0 group-hover:opacity-100 -translate-x-1/2 group-hover:translate-x-0 p-9 lg:p-20 fill-neutral-50 stroke-0 group-hover:stroke-1 stroke-neutral-50 duration-200 group-hover:duration-400 ease-in group-hover:ease-out-quint drop-shadow-2xl" />
			</Link>
			<div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950" />
			<div className="absolute inset-0 z-0">
				{imageTransition((style, item) =>
					item ? (
						item == "graphics" ? (
							<a.div style={style}>
								<FadingImage
									src="https://cms.pprmint.de/uploads/Inverted_Exit_Hole_3758e3ddbd.png"
									fill
									className="object-cover"
									alt=""
								/>
							</a.div>
						) : item == "photos" ? (
							<a.div style={style}>
								<FadingImage
									src="https://cms.pprmint.de/uploads/DSC_00277_abd6347464.webp"
									fill
									className="object-cover"
									alt=""
								/>
							</a.div>
						) : item == "projects" ? (
							<a.div style={style}>
								<FadingImage
									src="https://cms.pprmint.de/uploads/DSC_00439_42db6e3811.webp"
									fill
									className="object-cover"
									alt=""
								/>
							</a.div>
						) : null
					) : null
				)}
			</div>
		</section>
	);
}
