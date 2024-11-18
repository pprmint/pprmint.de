"use client";
import { useState } from "react";
import X from "src/icons/X";
import TriangleTopLeftBottomRight from "src/icons/TriangleTopLeftBottomRight";
import Lock from "src/icons/Lock";
import Download from "src/icons/Download";
import Jiggy from "src/icons/Jiggy";
import Menu from "src/icons/Menu";
import Bookmark from "src/icons/Bookmark";

import OldWebsite1 from "public/assets/tentative/website1.png";
import OldWebsite2 from "public/assets/tentative/website2.png";
import OldWebsite3 from "public/assets/tentative/website3.png";
import Image from "next/image";
import Add from "src/icons/Add";
import ChevronLeft from "src/icons/ChevronLeft";
import RotateCw from "src/icons/RotateCw";
import ChevronRight from "src/icons/ChevronRight";

const Tabs = [
	{
		name: "Tentative (Dec. 2022)",
		favicon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				<path d="M0 0h16v16H0z" fill="#4c1d95" />
				<path d="M7 13h4v-2H9V9h2V7H9V3H7v4H5v2h2v4Z" fill="#ddd6fe" />
			</svg>
		),
		image: OldWebsite1,
	},
	{
		name: "Tentative (Jan. 2023)",
		favicon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
				<defs>
					<linearGradient
						id="j.a"
						x1="0"
						x2="1"
						y1="0"
						y2="0"
						gradientTransform="rotate(-90 457 95) scale(62.6)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" style={{ stopColor: "#d3b4ed" }} />
						<stop offset="1" style={{ stopColor: "#be93e4" }} />
					</linearGradient>
				</defs>
				<path d="M0 0h400v400H0z" fill="#793aaf" />
				<path d="M347 489h82v-25l-31 1v-34l-31 6-3 29-17 1v22Z" fill="#e3ccf4" transform="matrix(1.5 0 0 1.5 -379 -555)" />
				<path
					d="M363 489v47c0 35 15 46 38 46 12 0 22-4 29-6l-2-24-13 1c-14 0-17-7-17-19v-36l-35-9Z"
					fill="url(#j.a)"
					transform="matrix(1.5 0 0 1.5 -379 -555)"
				/>
			</svg>
		),
		image: OldWebsite2,
	},
	{
		name: "Tentative (Mar. 2023)",
		favicon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
				<defs>
					<linearGradient
						id="m.a"
						x1="0"
						x2="1"
						y1="0"
						y2="0"
						gradientTransform="rotate(-90 457 95) scale(62.6)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" style={{ stopColor: "#e5dfd0" }} />
						<stop offset="1" style={{ stopColor: "#dad1bd" }} />
					</linearGradient>
				</defs>
				<path d="M0 0h400v400H0z" fill="#b8a383" />
				<path d="M347 489h82v-25l-31 1v-34l-31 6-3 29-17 1v22Z" fill="#eeeadd" transform="matrix(1.5 0 0 1.5 -379 -555)" />
				<path
					d="M363 489v47c0 35 15 46 38 46 12 0 22-4 29-6l-2-24-13 1c-14 0-17-7-17-19v-36l-35-9Z"
					fill="url(#m.a)"
					transform="matrix(1.5 0 0 1.5 -379 -555)"
				/>
			</svg>
		),
		image: OldWebsite3,
	},
];

export default function BrowserWindow() {
	const [tab, setTab] = useState(0);
	return (
		<div className="border border-black/10 dark:ring-black/50 outline outline-1 outline-white/10 -outline-offset-2 rounded-xl overflow-clip my-9 text-sm shadow-2xl">
			<div className="bg-elevate">
				<div className="flex items-center gap-1">
					<div className="group flex gap-2 p-3">
						<button className="bg-red active:bg-red-700 rounded-full duration-50">
							<X className="opacity-0 group-hover:opacity-100 duration-100 fill-red-900" />
						</button>
						<button className="bg-yellow active:bg-yellow-700 rounded-full duration-50">
							<div className="w-[7px] mx-1 h-px opacity-0 group-hover:opacity-100 duration-100 bg-yellow-900" />
						</button>
						<button className="bg-green active:bg-green-700 rounded-full duration-50">
							<TriangleTopLeftBottomRight className="opacity-0 group-hover:opacity-100 duration-100 fill-green-900 p-0.5" />
						</button>
					</div>
					<div className="inline-flex items-center gap-3 px-3 bg-neutral-800 light:bg-neutral-900 py-0.5 flex-grow rounded-md">
						<Lock />
						<p className="flex-grow py-0.5">
							<span className="opacity-50">https://</span>
							tentative.name
						</p>
						<Bookmark />
					</div>
					<div className="hidden sm:flex gap-3 px-3">
						<Download />
						<Jiggy />
						<Menu />
					</div>
				</div>
				<div className="flex bg-neutral-950 light:bg-neutral-900">
					{Tabs.map((item, index) => (
						<button
							className={`py-1.5 flex items-center justify-center grow gap-2 ${index === tab && "bg-elevate"}`}
							onClick={() => setTab(index)}
						>
							<div className="size-4">{item.favicon}</div>
							{item.name}
						</button>
					))}
					<div className="inline-flex items-center justify-center px-2">
						<Add />
					</div>
				</div>
			</div>
			<Image src={Tabs[tab].image} alt="" className="aspect-video w-full" />
		</div>
	);
}
