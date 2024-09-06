"use client";
import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";
import ArrowRight from "src/icons/ArrowRight";
import ArrowLeft from "src/icons/ArrowLeft";
import { useTransition, config, easings, a } from "@react-spring/web";
import { useState } from "react";
import { useRouter } from "src/navigation";
import { useTranslations } from "next-intl";

export default function GallerySelector() {
	const t = useTranslations();
	const router = useRouter();
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
		onDestroyed: () => router.push(`/works/${current}`),
	});
	return viewTransition((style, item) =>
		item === "" ? (
			<a.div style={{ ...style }} className="flex flex-col min-h-screen">
				<button className="group relative grow overflow-clip" onClick={() => setCurrent("graphics")}>
					<FadingImage
						src="https://cms.pprmint.de/uploads/Inverted_Exit_Hole_3758e3ddbd.png"
						alt=""
						fill
						className="object-cover saturate-0 group-hover:saturate-100 group-hover:scale-105 duration-400 ease-in-out-custom"
					/>
					<ArrowRight className="absolute h-full w-max top-0 right-3 opacity-0 group-hover:opacity-100 -translate-x-1/2 group-hover:translate-x-0 p-20 fill-neutral-50 stroke-0 group-hover:stroke-1 stroke-neutral-50 duration-400 ease-in-out-custom drop-shadow-2xl" />
					<div className="absolute inset-0 flex items-center p-6 md:p-9 lg:p-20 bg-gradient-to-r from-neutral-950">
						<h1 className="mt-4">
							{t("GRAPHICS.Head.title")}
							<span className="text-green">.</span>
						</h1>
					</div>
				</button>
				<button className="group relative grow overflow-clip" onClick={() => setCurrent("photos")}>
					<FadingImage
						src="https://cms.pprmint.de/uploads/DSC_00277_abd6347464.webp"
						alt=""
						fill
						className="object-cover saturate-0 group-hover:saturate-100 group-hover:scale-105 duration-400 ease-in-out-custom"
					/>
					<ArrowRight className="absolute h-full w-max top-0 right-3 opacity-0 group-hover:opacity-100 -translate-x-1/2 group-hover:translate-x-0 p-20 fill-neutral-50 stroke-0 group-hover:stroke-1 stroke-neutral-50 duration-400 ease-in-out-custom drop-shadow-2xl" />
					<div className="absolute inset-0 flex items-center p-6 md:p-9 lg:p-20 bg-gradient-to-r from-neutral-950">
						<h1 className="mt-4">
							{t("PHOTOS.Head.title")}
							<span className="text-red">.</span>
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
					<ArrowRight className="absolute h-full w-max top-0 right-3 opacity-0 group-hover:opacity-100 -translate-x-1/2 group-hover:translate-x-0 p-20 fill-neutral-50 stroke-0 group-hover:stroke-1 stroke-neutral-50 duration-400 ease-in-out-custom drop-shadow-2xl" />
					<div className="absolute inset-0 flex items-center p-6 md:p-9 lg:p-20 bg-gradient-to-r from-neutral-950">
						<h1 className="mt-4">
							{t("PROJECTS.Head.title")}
							<span className="text-yellow">.</span>
						</h1>
					</div>
				</button>
			</a.div>
		) : (
			<div className="h-screen" />
		)
	);
}
