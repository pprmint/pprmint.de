"use client";

import { useTranslations } from "next-intl";
import FadingImage from "src/components/ui/FadingImage";
import Text from "src/icons/Text";
import Palette from "src/icons/Palette";
import Computer from "src/icons/Computer";
import Cursor from "src/icons/Cursor";
import ArrowRight from "src/icons/ArrowRight";
import Globe from "src/icons/Globe";
import { Link } from "src/navigation";

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
		<section className="my-20 md:my-32 xl:my-40">
			<div className="flex gap-3 pb-6 flex-wrap">
				{Tags.map((tag, _) => (
					<button
						key={tag.name}
						onClick={() => setFilter(filter == tag.name ? "" : tag.name)}
						className={`flex gap-1.5 items-center px-3 py-1 text-sm border ${
							filter == tag.name
								? "border-green hover:border-green-400 active:border-green bg-green hover:bg-green-400 active:bg-green text-neutral-950"
								: "hover:bg-neutral-900 border-neutral-900"
						} active:shadow-inner active:opacity-75 rounded-full duration-100 active:duration-75`}
					>
						{tag.icon}
						{t(`PROJECTS.Tag.${tag.name}`)}
					</button>
				))}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
				{ProjectsList.map((project) => (
					<Link
						key={project.name}
						href={`/projects/${project.name}`}
						className={`group relative rounded-lg border border-neutral-900 overflow-clip aspect-[1.914/1] ${
							!project.tags.includes(filter) &&
							filter != "" &&
							"opacity-25 hover:opacity-100 saturate-0 hover:saturate-100"
						} active:scale-[0.98] active:opacity-75 duration-200 active:duration-75`}
					>
						<FadingImage src={project.image} alt="" fill className="object-cover" />
						<div className="absolute flex gap-3 top-[6%] left-[3.3%] p-2 rounded-full bg-neutral-900">
							{project.tags.map((tag, _) =>
								tag == "font" ? (
									<Text />
								) : tag == "design" ? (
									<Cursor />
								) : tag == "website" ? (
									<Globe />
								) : tag == "software" ? (
									<Computer />
								) : (
									<Palette />
								)
							)}
						</div>
						<div className="absolute inset-0 backdrop-blur-md bg-neutral-950/75 opacity-0 group-hover:opacity-100 group-focus:opacity-100 duration-200">
							<div className="absolute inset-0 p-6 translate-y-6 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-hover:translate-y-0 group-focus:translate-y-0 duration-200 group-hover:duration-400 group-focus:duration-400 ease-in-quad group-hover:ease-out-quint group-focus:ease-out-quint group-hover:delay-100 group-focus:delay-150">
								<h3>
									{t(`${project.name.toUpperCase()}.Head.title`)}
									<span className="text-green">.</span>
								</h3>
								<p className="pb-6">{t(`${project.name.toUpperCase()}.Head.description`)}</p>
							</div>
							<ArrowRight className="absolute bottom-6 right-12 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-hover:right-6 fill-green stroke-green stroke-1 size-7 duration-200 group-hover:duration-400 group-focus:duration-400 ease-in-quad group-hover:ease-out-quint group-focus:ease-out-quint group-hover:delay-100 group-focus:delay-150" />
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
