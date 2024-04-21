"use client";
import { useState } from "react";
import { Link } from "src/navigation";
import { useTransition, a } from "@react-spring/web";
import { useTranslations } from "next-intl";

import FadingImage from "src/components/ui/FadingImage";
import ArrowRight from "src/icons/ArrowRight";
import ArrowUpRight from "src/icons/ArrowUpRight";

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
			className="relative grid grid-rows-3 lg:grid-rows-1 lg:grid-cols-3 min-h-screen w-screen overflow-clip"
			onMouseLeave={() => setFocused("")}
		>
			<Link
				onFocus={() => setFocused("vectors")}
				onMouseEnter={() => setFocused("vectors")}
				href="/gallery?dimension=2d"
				className="z-20 group relative flex p-6 md:p-9 pb-20 size-full lg:items-center lg:justify-center bg-neutral-950/90 hover:bg-neutral-950/75 active:hover:bg-neutral-950/90 focus-visible:bg-neutral-950/75 backdrop-blur-lg hover:backdrop-blur-none focus-visible:backdrop-blur-none duration-300 active:duration-75"
			>
				<div className="lg:text-center lg:translate-y-1/3 lg:group-hover:translate-y-0 lg:group-focus-visible:translate-y-0 duration-500 ease-out-quint xl:h-64 2xl:h-52">
					<h1 className="lg:text-center">
						{t("Content.TheThreeThingies.Vectors.heading")}
						<span className="text-green">.</span>
					</h1>
					<div className="lg:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 text-balance lg:w-full duration-300">
						<p>{t("Content.TheThreeThingies.Vectors.text1")}</p>
						<p>{t("Content.TheThreeThingies.Vectors.text2")}</p>
					</div>
				</div>
				<div className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 absolute lg:inset-x-0 flex items-center lg:justify-center gap-3 md:gap-6 bottom-6 md:bottom-9 right-6 md:right-9 translate-x-9 md:translate-x-12 lg:translate-x-6 group-hover:translate-x-0 group-focus-visible:translate-x-0 duration-300 ease-out-quint">
					<p className="font-medium text-neutral-50 text-lg md:text-xl lg:text-2xl">{t("Content.TheThreeThingies.moreOnGallery")}</p>
					<ArrowRight className="size-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 text-green -translate-x-12 lg:-translate-x-14 group-hover:translate-x-0 group-focus-visible:translate-x-0 duration-300 ease-out-quint" />
				</div>
			</Link>
			<Link
				onFocus={() => setFocused("polygons")}
				onMouseEnter={() => setFocused("polygons")}
				href="/gallery?dimension=3d"
				className="z-20 group relative flex p-6 md:p-9 pb-20 size-full lg:items-center lg:justify-center bg-neutral-950/90 hover:bg-neutral-950/75 active:hover:bg-neutral-950/90 focus-visible:bg-neutral-950/75 backdrop-blur-lg hover:backdrop-blur-none focus-visible:backdrop-blur-none duration-300 active:duration-75"
			>
				<div className="lg:text-center lg:translate-y-1/3 lg:group-hover:translate-y-0 lg:group-focus-visible:translate-y-0 duration-500 ease-out-quint xl:h-64 2xl:h-52">
					<h1 className="lg:text-center">
						{t("Content.TheThreeThingies.Polygons.heading")}
						<span className="text-blue">.</span>
					</h1>
					<div className="lg:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 text-balance lg:w-full duration-300">
						<p>{t("Content.TheThreeThingies.Polygons.text1")}</p>
						<p>{t("Content.TheThreeThingies.Polygons.text2")}</p>
					</div>
				</div>
				<div className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 absolute lg:inset-x-0 flex items-center lg:justify-center gap-3 md:gap-6 bottom-6 md:bottom-9 right-6 md:right-9 translate-x-9 md:translate-x-12 lg:translate-x-6 group-hover:translate-x-0 group-focus-visible:translate-x-0 duration-300 ease-out-quint">
					<p className="font-medium text-neutral-50 text-lg md:text-xl lg:text-2xl">{t("Content.TheThreeThingies.moreOnGallery")}</p>
					<ArrowRight className="size-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 text-blue -translate-x-12 lg:-translate-x-14 group-hover:translate-x-0 group-focus-visible:translate-x-0 duration-300 ease-out-quint" />
				</div>
			</Link>
			<Link
				onFocus={() => setFocused("code")}
				onMouseEnter={() => setFocused("code")}
				href="https://github.com/pprmint"
				target="_blank"
				rel="noopener noreferrer"
				className="z-20 group relative flex p-6 md:p-9 pb-20 size-full lg:items-center lg:justify-center bg-neutral-950/90 hover:bg-neutral-950/75 active:hover:bg-neutral-950/90 focus-visible:bg-neutral-950/75 backdrop-blur-lg hover:backdrop-blur-none focus-visible:backdrop-blur-none duration-300 active:duration-75"
			>
				<div className="lg:text-center lg:translate-y-1/3 lg:group-hover:translate-y-0 lg:group-focus-visible:translate-y-0 duration-500 ease-out-quint xl:h-64 2xl:h-52">
					<h1 className="lg:text-center">
						{t("Content.TheThreeThingies.Code.heading")}
						<span className="text-red">.</span>
					</h1>
					<div className="lg:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 text-balance lg:w-full duration-300">
						<p>{t.rich("Content.TheThreeThingies.Code.text1", { i: (chunks) => <i>{chunks}</i> })}</p>
						<p>{t("Content.TheThreeThingies.Code.text2")}</p>
					</div>
				</div>
				<div className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 absolute lg:inset-x-0 flex items-center lg:justify-center gap-3 md:gap-6 bottom-6 md:bottom-9 right-6 md:right-9 translate-x-9 md:translate-x-12 lg:translate-x-9 group-hover:translate-x-0 group-focus-visible:translate-x-0 duration-300 ease-out-quint">
					<p className="font-medium text-neutral-50 text-lg md:text-xl lg:text-2xl">{t("Content.TheThreeThingies.moreOnGitHub")}</p>
					<ArrowUpRight className="size-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 text-red -translate-x-12 lg:-translate-x-14 group-hover:translate-x-0 group-focus-visible:translate-x-0 translate-y-3 group-hover:-translate-y-0  duration-300 ease-out-quint" />
				</div>
			</Link>
			<div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950" />
			<div className="absolute inset-0 z-0 saturate-0">
				{imageTransition((style, item) =>
					item ? (
						item == "vectors" ? (
							<a.div style={style}>
								<FadingImage
									src="https://static.pprmint.art/uploads/dark2_80a3e41e9f.png"
									fill
									className="object-cover"
									alt=""
								/>
							</a.div>
						) : item == "polygons" ? (
							<a.div style={style}>
								<FadingImage
									src="https://static.pprmint.art/uploads/Crystal_Cave_light_c60ed75104.png"
									fill
									className="object-cover"
									alt=""
								/>
							</a.div>
						) : item == "code" ? (
							<a.div style={style}>
								<FadingImage
									src="https://static.pprmint.art/uploads/Zoompaper_aecb0eee13.png"
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
