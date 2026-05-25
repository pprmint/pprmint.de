"use client";
import { useTranslations } from "next-intl";
import FadingImage from "@/components/ui/FadingImage";
import Palette from "@/icons/Palette";
import Computer from "@/icons/Computer";
import Cursor from "@/icons/Cursor";
import ArrowRight from "@/icons/ArrowRight";
import Globe from "@/icons/Globe";
import Link from "next/link";

import PomifuriImage from "./pomifuri/twitter-image.png";
import AutselliaImage from "./autsellia/twitter-image.png";
import AppiconsImage from "./appicons/twitter-image.png";
import IconsImage from "./icons/twitter-image.png";
import MintcraftImage from "./mintcraft/twitter-image.png";
import TentativeImage from "./tentative/twitter-image.png";
import YtdgImage from "./ytdg/twitter-image.png";
import { useState } from "react";
import Button from "@/components/ui/Button";

const ProjectsList = [
	{
		name: "pomifuri",
		tags: ["website"],
		image: PomifuriImage,
		link: "https://pomi.moe",
	},
	{
		name: "autsellia",
		tags: ["website"],
		image: AutselliaImage,
		link: "https://autsellia.com",
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
		link: "https://tentative.name",
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
];

const Tags = [
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
				<div className="grid grid-cols-2 xl:grid-cols-4 lg:w-200 md:border-r border-black/5 dark:border-white/5">
					{Tags.map((tag) => (
						<Button
							key={tag.name}
							onClick={() => setFilter(filter == tag.name ? "" : tag.name)}
							design={filter == tag.name ? "filled" : "transparent"}
							size="grow"
							align="center"
						>
							{tag.icon}
							{t(`PROJECTS.Tag.${tag.name}`)}
						</Button>
					))}
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-r border-b border-black/5 dark:border-white/5">
				{ProjectsList.map((project) => (
					<Link
						key={project.name}
						href={project.link ? project.link : `/projects/${project.name}`}
						target={project.link ? "_blank" : "_self"}
						className={`group relative overflow-clip aspect-[1.914/1] ${
							!project.tags.includes(filter) &&
							filter != "" &&
							"opacity-25 hover:opacity-100 saturate-0 hover:saturate-100"
						} border-l last:border-r border-b border-black/5 dark:border-white/5 duration-200`}
					>
						<FadingImage src={project.image} alt="" fill className="object-cover" />
						<div className="absolute inset-0 backdrop-blur-md bg-neutral-950/75 group-active:bg-neutral-950/85 opacity-0 group-hover:opacity-100 group-focus:opacity-100 duration-200 group-active:duration-75">
							<div className="absolute inset-0 p-6 translate-y-6 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-hover:translate-y-0 group-focus:translate-y-0 duration-200 group-hover:duration-400 group-focus:duration-400 ease-in-quad group-hover:ease-out-quint group-focus:ease-out-quint group-hover:delay-100 group-focus:delay-150">
								<h3 className="text-white md:text-2xl xl:text-3xl">
									{t(`${project.name.toUpperCase()}.Head.title`)}
									<span className="text-green">.</span>
								</h3>
								<p className="pb-6 text-white/75">
									{t(`${project.name.toUpperCase()}.Head.description`)}
								</p>
							</div>
							<ArrowRight className="absolute bottom-6 right-12 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-hover:right-6 group-focus:right-6 fill-green stroke-green stroke-1 size-7 duration-200 group-hover:duration-400 group-focus:duration-400 ease-in-quad group-hover:ease-out-quint group-focus:ease-out-quint group-hover:delay-100 group-focus:delay-150" />
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
