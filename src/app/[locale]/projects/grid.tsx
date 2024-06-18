"use client";

import { useTranslations } from "next-intl";
import FadingImage from "src/components/ui/FadingImage";
import Text from "src/icons/Text";
import Palette from "src/icons/Palette";
import Computer from "src/icons/Computer";
import Cursor from "src/icons/Cursor";
import { Link } from "src/navigation";
import ArrowRight from "src/icons/ArrowRight";

import AppiconsImage from "./appicons/twitter-image.png";
import IconsImage from "./icons/twitter-image.png";
import MintbitImage from "./mintbit/twitter-image.png";
import MintcraftImage from "./mintcraft/twitter-image.png";
import MintsansImage from "./mintsans/twitter-image.png";
import MinttrianglesImage from "./minttriangles/twitter-image.png";
import MinasansImage from "./minasans/twitter-image.png";
import YtdgImage from "./ytdg/twitter-image.png";
import { useState } from "react";

const ProjectsList = [
	{
		name: "minasans",
		tag: "font",
		image: MinasansImage,
	},
	{
		name: "minttriangles",
		tag: "font",
		image: MinttrianglesImage,
	},
	{
		name: "icons",
		tag: "design",
		image: IconsImage,
	},
	{
		name: "mintbit",
		tag: "font",
		image: MintbitImage,
	},
	{
		name: "ytdg",
		tag: "software",
		image: YtdgImage,
	},
	{
		name: "mintcraft",
		tag: "customization",
		image: MintcraftImage,
	},
	{
		name: "appicons",
		tag: "customization",
		image: AppiconsImage,
	},
	{
		name: "mintsans",
		tag: "font",
		image: MintsansImage,
	},
];

export default function Grid() {
	const t = useTranslations("");
	const [filter, setFilter] = useState("");
	return (
		<section className="my-20 md:my-32 xl:my-40">
			<div className="flex gap-3 pb-6 flex-wrap">
				<button
					onClick={() => setFilter(filter == "font" ? "" : "font")}
					className={`flex gap-1.5 items-center px-3 py-1 text-sm border ${
						filter == "font"
							? "border-green hover:border-green-400 active:border-green bg-green hover:bg-green-400 active:bg-green text-neutral-950"
							: "hover:bg-neutral-900 border-neutral-900"
					} active:shadow-inner active:opacity-75 rounded-full duration-100 active:duration-75`}
				>
					<Text />
					{t(`PROJECTS.Tag.font`)}
				</button>
				<button
					onClick={() => setFilter(filter == "design" ? "" : "design")}
					className={`flex gap-1.5 items-center px-3 py-1 text-sm border ${
						filter == "design"
							? "border-green hover:border-green-400 active:border-green bg-green hover:bg-green-400 active:bg-green text-neutral-950"
							: "hover:bg-neutral-900 border-neutral-900"
					} active:shadow-inner active:opacity-75 rounded-full duration-100 active:duration-75`}
				>
					<Cursor />
					{t(`PROJECTS.Tag.design`)}
				</button>
				<button
					onClick={() => setFilter(filter == "software" ? "" : "software")}
					className={`flex gap-1.5 items-center px-3 py-1 text-sm border ${
						filter == "software"
							? "border-green hover:border-green-400 active:border-green bg-green hover:bg-green-400 active:bg-green text-neutral-950"
							: "hover:bg-neutral-900 border-neutral-900"
					} active:shadow-inner active:opacity-75 rounded-full duration-100 active:duration-75`}
				>
					<Computer />
					{t(`PROJECTS.Tag.software`)}
				</button>
				<button
					onClick={() => setFilter(filter == "customization" ? "" : "customization")}
					className={`flex gap-1.5 items-center px-3 py-1 text-sm border ${
						filter == "customization"
							? "border-green hover:border-green-400 active:border-green bg-green hover:bg-green-400 active:bg-green text-neutral-950"
							: "hover:bg-neutral-900 border-neutral-900"
					} active:shadow-inner active:opacity-75 rounded-full duration-100 active:duration-75`}
				>
					<Palette />
					{t(`PROJECTS.Tag.customization`)}
				</button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
				{ProjectsList.map((project) => (
					<Link
						key={project.name}
						href={`/projects/${project.name}`}
						className={`group relative rounded-lg border border-neutral-900 overflow-clip aspect-[1.914/1] ${
							filter != project.tag &&
							filter != "" &&
							"opacity-25 hover:opacity-100 saturate-0 hover:saturate-100"
						} active:scale-[0.98] active:opacity-75 duration-200 active:duration-75`}
					>
						<FadingImage src={project.image} alt="" fill className="object-cover" />
						<div className="absolute top-[6%] left-[3.3%] p-2 rounded-full bg-neutral-900">
							{project.tag == "font" ? (
								<Text />
							) : project.tag == "design" ? (
								<Cursor />
							) : project.tag == "software" ? (
								<Computer />
							) : (
								<Palette />
							)}
						</div>
						<div className="absolute inset-0 backdrop-blur-md bg-neutral-950/75 opacity-0 group-hover:opacity-100 group-focus:opacity-100 duration-200">
							<div className="absolute inset-0 p-6 translate-y-6 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-hover:translate-y-0 group-focus:translate-y-0 duration-200 group-hover:duration-400 group-focus:duration-400 ease-in-quad group-hover:ease-out-quint group-focus:ease-out-quint group-hover:delay-100 group-focus:delay-150">
								<h3 className="group/link inline-flex items-center gap-2">
									{t(`${project.name.toUpperCase()}.Head.title`)}
									<ArrowRight className="fill-green stroke-green stroke-1 size-7" />
								</h3>
								<p className="pb-6">{t(`${project.name.toUpperCase()}.Head.description`)}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
