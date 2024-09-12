"use client";
import { Link } from "src/navigation";
import { useTranslations } from "next-intl";

import Image from "next/image";
import ArrowRight from "src/icons/ArrowRight";
import ArrowUpRight from "src/icons/ArrowUpRight";

export default function ThreeThingies() {
	const t = useTranslations("HOME");
	return (
		<section
			className="relative grid grid-rows-3 min-h-screen w-screen overflow-clip"
		>
			<Link
				href="/graphics"
				className="z-20 group relative flex p-6 md:p-9 xl:px-16 size-full lg:items-center bg-neutral-950/90 hover:bg-neutral-950/75 active:bg-neutral-950/85 focus-visible:bg-neutral-950/75 backdrop-saturate-0 hover:backdrop-saturate-100 duration-300 active:duration-75"
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
				<Image
					src="https://cms.pprmint.de/uploads/Inverted_Exit_Hole_3758e3ddbd.png"
					fill
					className="object-cover absolute -z-10 saturate-0 group-hover:saturate-100 opacity-10 group-hover:opacity-25 duration-200"
					alt=""
				/>
				<ArrowRight className="absolute h-1/2 lg:h-full w-max bottom-0 right-3 opacity-0 group-hover:opacity-100 -translate-x-1/2 group-hover:translate-x-0 p-9 lg:p-20 fill-neutral-50 stroke-0 group-hover:stroke-1 stroke-neutral-50 duration-200 group-hover:duration-400 ease-in group-hover:ease-out-quint drop-shadow-2xl" />
			</Link>
			<Link
				href="/photos"
				className="z-20 group relative flex p-6 md:p-9 xl:px-16 size-full lg:items-center bg-neutral-950/90 hover:bg-neutral-950/75 active:bg-neutral-950/85 focus-visible:bg-neutral-950/75 backdrop-saturate-0 hover:backdrop-saturate-100 duration-300 active:duration-75"
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
				<Image
					src="https://cms.pprmint.de/uploads/DSC_00277_abd6347464.webp"
					fill
					className="object-cover absolute -z-10 saturate-0 group-hover:saturate-100 opacity-10 group-hover:opacity-25 duration-200"
					alt=""
				/>
				<ArrowRight className="absolute h-1/2 lg:h-full w-max bottom-0 right-3 opacity-0 group-hover:opacity-100 -translate-x-1/2 group-hover:translate-x-0 p-9 lg:p-20 fill-neutral-50 stroke-0 group-hover:stroke-1 stroke-neutral-50 duration-200 group-hover:duration-400 ease-in group-hover:ease-out-quint drop-shadow-2xl" />
			</Link>
			<Link
				href="/projects"
				className="z-20 group relative flex p-6 md:p-9 xl:px-16 size-full lg:items-center bg-neutral-950/90 hover:bg-neutral-950/75 active:bg-neutral-950/85 focus-visible:bg-neutral-950/75 backdrop-saturate-0 hover:backdrop-saturate-100 duration-300 active:duration-75"
			>
				<div className="md:translate-y-4 lg:group-hover:translate-y-0 lg:group-focus-visible:translate-y-0 duration-500 ease-out-quint">
					<h1>
						{t("Content.TheThreeThingies.Projects.heading")}
						<span className="text-yellow">.</span>
					</h1>
					<div className="lg:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 text-balance lg:w-full duration-300">
						<p>{t("Content.TheThreeThingies.Projects.text")}</p>
					</div>
				</div>
				<Image
					src="https://cms.pprmint.de/uploads/Mintcraft_3_D_788687b08d.png"
					fill
					className="object-cover absolute -z-10 saturate-0 group-hover:saturate-100 opacity-10 group-hover:opacity-25 duration-200"
					alt=""
				/>
				<ArrowRight className="absolute h-1/2 lg:h-full w-max bottom-0 right-3 opacity-0 group-hover:opacity-100 -translate-x-1/2 group-hover:translate-x-0 p-9 lg:p-20 fill-neutral-50 stroke-0 group-hover:stroke-1 stroke-neutral-50 duration-200 group-hover:duration-400 ease-in group-hover:ease-out-quint drop-shadow-2xl" />
			</Link>
		</section>
	);
}
