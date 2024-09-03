"use client";
import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";
import ArrowRight from "src/icons/ArrowRight";
import ArrowLeft from "src/icons/ArrowLeft";
import { useTransition, config, easings, a } from "@react-spring/web";
import { useState } from "react";

export default function GallerySelector() {
	const [current, setCurrent] = useState("");
	const viewTransition = useTransition(current, {
		from: {
			x: current === "" ? 150 : -150,
			opacity: 0,
		},
		enter: {
			x: 0,
			opacity: 1,
			config: {
				duration: 750,
				easing: easings.easeOutExpo,
			},
		},
		leave: {
			x: current === "" ? -50 : 50,
			opacity: 0,
			config: {
				duration: 200,
				easing: easings.easeInCubic,
			},
		},
		exitBeforeEnter: true,
	});
	return viewTransition((style, item) =>
		item === "graphics" ? (
			<a.div style={{ ...style }}>
				<Title noDelay title="Graphics" description="Vector graphics and 3D renders." />
				<button
					onClick={() => setCurrent("")}
					className="group absolute top-32 left-12 inline-flex z-10 text-lg text-neutral-50 hover:text-neutral-950 border-2 border-neutral-50 hover:bg-neutral-50 active:border-neutral-200 active:bg-neutral-200 rounded-full p-1 duration-100"
				>
					<ArrowLeft className="size-[30px] stroke-0 group-hover:stroke-1 stroke-current duration-100" />
				</button>
			</a.div>
		) : item === "photos" ? (
			<a.div style={{ ...style }}>
				<Title noDelay title="Photos" description="Taken on vacations and strolls outside." accentColor="text-red" />
				<button
					onClick={() => setCurrent("")}
					className="group absolute top-32 left-12 inline-flex z-10 text-lg text-neutral-50 hover:text-neutral-950 border-2 border-neutral-50 hover:bg-neutral-50 active:border-neutral-200 active:bg-neutral-200 rounded-full p-1 duration-100"
				>
					<ArrowLeft className="size-[30px] stroke-0 group-hover:stroke-1 stroke-current duration-100" />
				</button>
			</a.div>
		) : item === "projects" ? (
			<a.div style={{ ...style }}>
				<Title noDelay title="Projects" description="Other things I've worked on." accentColor="text-yellow" />
				<button
					onClick={() => setCurrent("")}
					className="group absolute top-32 left-12 inline-flex z-10 text-lg text-neutral-50 hover:text-neutral-950 border-2 border-neutral-50 hover:bg-neutral-50 active:border-neutral-200 active:bg-neutral-200 rounded-full p-1 duration-100"
				>
					<ArrowLeft className="size-[30px] stroke-0 group-hover:stroke-1 stroke-current duration-100" />
				</button>
			</a.div>
		) : (
			<a.div style={{ ...style }} className="flex flex-col min-h-screen">
				<button className="group relative grow overflow-clip" onClick={() => setCurrent("graphics")}>
					<FadingImage
						src="https://cms.pprmint.de/uploads/Inverted_Exit_Hole_3758e3ddbd.png"
						alt=""
						fill
						className="object-cover saturate-0 group-hover:saturate-100 group-hover:scale-105 duration-400 ease-in-out-custom"
					/>
					<ArrowRight className="absolute h-full w-max top-0 right-3 opacity-0 group-hover:opacity-100 -translate-x-1/2 group-hover:translate-x-0 p-20 fill-neutral-50 stroke-1 stroke-neutral-50 duration-400 ease-in-out-custom drop-shadow-2xl" />
					<div className="absolute inset-0 flex items-center p-6 md:p-9 lg:p-20 bg-gradient-to-r from-neutral-950">
						<h1 className="mt-4">
							Graphics<span className="text-green">.</span>
						</h1>
					</div>
				</button>
				<button className="group relative grow overflow-clip" onClick={() => setCurrent("photos")}>
					<FadingImage
						src="https://cms.pprmint.de/uploads/DSC_00277_42c3e63529.jpg"
						alt=""
						fill
						className="object-cover saturate-0 group-hover:saturate-100 group-hover:scale-105 duration-400 ease-in-out-custom"
					/>
					<ArrowRight className="absolute h-full w-max top-0 right-3 opacity-0 group-hover:opacity-100 -translate-x-1/2 group-hover:translate-x-0 p-20 fill-neutral-50 stroke-1 stroke-neutral-50 duration-400 ease-in-out-custom drop-shadow-2xl" />
					<div className="absolute inset-0 flex items-center p-6 md:p-9 lg:p-20 bg-gradient-to-r from-neutral-950">
						<h1 className="mt-4">
							Photos<span className="text-red">.</span>
						</h1>
					</div>
				</button>
				<button className="group relative grow overflow-clip" onClick={() => setCurrent("projects")}>
					<FadingImage
						src="https://cms.pprmint.de/uploads/Mintcraft_3_D_788687b08d.png"
						alt=""
						fill
						className="object-cover saturate-0 group-hover:saturate-100 group-hover:scale-105 duration-400 ease-in-out-custom"
					/>
					<ArrowRight className="absolute h-full w-max top-0 right-3 opacity-0 group-hover:opacity-100 -translate-x-1/2 group-hover:translate-x-0 p-20 fill-neutral-50 stroke-1 stroke-neutral-50 duration-400 ease-in-out-custom drop-shadow-2xl" />
					<div className="absolute inset-0 flex items-center p-6 md:p-9 lg:p-20 bg-gradient-to-r from-neutral-950">
						<h1 className="mt-4">
							Projects<span className="text-yellow">.</span>
						</h1>
					</div>
				</button>
			</a.div>
		)
	);
}
