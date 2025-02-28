"use client";

import { useTranslations } from "next-intl";
import FadingImage from "src/components/ui/FadingImage";
import Text from "src/icons/Text";
import Palette from "src/icons/Palette";
import Computer from "src/icons/Computer";
import Cursor from "src/icons/Cursor";
import ArrowRight from "src/icons/ArrowRight";
import Globe from "src/icons/Globe";
import Link from "next/link";

import AutselliaImage from "./autsellia/twitter-image.png";
import AppiconsImage from "./appicons/twitter-image.png";
import IconsImage from "./icons/twitter-image.png";
import MintbitImage from "./mintbit/twitter-image.png";
import MintcraftImage from "./mintcraft/twitter-image.png";
import MintsansImage from "./mintsans/twitter-image.png";
import MinttrianglesImage from "./minttriangles/twitter-image.png";
import MinasansImage from "./minasans/twitter-image.png";
import TentativeImage from "./tentative/twitter-image.png";
import YtdgImage from "./ytdg/twitter-image.png";
import { useState } from "react";

const ProjectsList = [
	{
		name: "minasans",
		tags: ["font"],
		image: MinasansImage,
	},
	{
		name: "autsellia",
		tags: ["website"],
		image: AutselliaImage,
	},
	{
		name: "minttriangles",
		tags: ["font"],
		image: MinttrianglesImage,
	},
	{
		name: "icons",
		tags: ["design"],
		image: IconsImage,
	},
	{
		name: "tentative",
		tags: ["design", "website"],
		image: TentativeImage,
	},
	{
		name: "mintbit",
		tags: ["font"],
		image: MintbitImage,
	},
	{
		name: "ytdg",
		tags: ["software"],
		image: YtdgImage,
	},
	{
		name: "mintcraft",
		tags: ["customization"],
		image: MintcraftImage,
	},
	{
		name: "appicons",
		tags: ["customization"],
		image: AppiconsImage,
	},
	{
		name: "mintsans",
		tags: ["font"],
		image: MintsansImage,
	},
];

const Tags = [
	{
		name: "font",
		icon: <Text />,
	},
	{
		name: "design",
		icon: <Cursor />,
	},
	{
		name: "website",
		icon: <Globe />,
	},
	{
		name: "software",
		icon: <Computer />,
	},
	{
		name: "customization",
		icon: <Palette />,
	},
];

export default function Grid() {
	const t = useTranslations("");
	const [filter, setFilter] = useState("");
	return (
		<section>
			<div className="border border-black/5 dark:border-white/5">
				<div className="grid grid-cols-2 sm:grid-cols-3 md:flex flex-row lg:w-max md:border-r border-black/5 dark:border-white/5">
					{Tags.map((tag) => (
						<button
							key={tag.name}
							onClick={() => setFilter(filter == tag.name ? "" : tag.name)}
							className={`flex gap-3 items-center justify-center w-full md:w-40 h-9 ${
								filter == tag.name
									? "font-semibold text-white dark:text-neutral-950 bg-neutral-950 dark:bg-white hover:bg-neutral-900 dark:hover:bg-neutral-50 active:bg-neutral-800 dark:active:bg-neutral-100"
									: "hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-950 dark:hover:text-white"
							} active:shadow-inner duration-100`}
						>
							{tag.icon}
							{t(`PROJECTS.Tag.${tag.name}`)}
						</button>
					))}
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-r border-b border-black/5 dark:border-white/5">
				{ProjectsList.map((project) => (
					<Link
						key={project.name}
						href={`/projects/${project.name}`}
						className={`group relative overflow-clip aspect-[1.914/1] ${
							!project.tags.includes(filter) &&
							filter != "" &&
							"opacity-25 hover:opacity-100 saturate-0 hover:saturate-100"
						} border-l last:border-r border-b border-black/5 dark:border-white/5 duration-200`}
					>
						<FadingImage src={project.image} alt="" fill className="object-cover" />
						<div className="absolute inset-0 backdrop-blur-md bg-neutral-950/75 group-active:bg-neutral-950/85 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:shadow-inner duration-200 group-active:duration-75">
							<div className="absolute inset-0 p-6 translate-y-6 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-hover:translate-y-0 group-focus:translate-y-0 duration-200 group-hover:duration-400 group-focus:duration-400 ease-in-quad group-hover:ease-out-quint group-focus:ease-out-quint group-hover:delay-100 group-focus:delay-150">
								<h3 className="text-white md:text-2xl xl:text-3xl">
									{t(`${project.name.toUpperCase()}.Head.title`)}
									<span className="text-green">.</span>
								</h3>
								<p className="pb-6 text-white/75">
									{t(`${project.name.toUpperCase()}.Head.description`)}
								</p>
							</div>
							<ArrowRight className="absolute bottom-6 right-12 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-hover:right-6 fill-green stroke-green stroke-1 size-7 duration-200 group-hover:duration-400 group-focus:duration-400 ease-in-quad group-hover:ease-out-quint group-focus:ease-out-quint group-hover:delay-100 group-focus:delay-150" />
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
