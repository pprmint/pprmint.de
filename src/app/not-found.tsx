"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import * as m from "motion/react-client";

import DetectiveMina from "public/assets/404/mina_chibi.webp";
import { useEffect, useState } from "react";
import ArrowRight from "src/icons/ArrowRight";

export default function NotFound() {
	const t = useTranslations("404");
	const [coords, setCoords] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleWindowMouseMove = (e: MouseEvent) => {
			setCoords({
				x: e.clientX / document.documentElement.clientWidth,
				y: e.clientY / document.documentElement.clientHeight,
			});
		};
		window.addEventListener("mousemove", handleWindowMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleWindowMouseMove);
		};
	}, []);

	return (
		<main className="relative w-screen xl:h-screen overflow-clip">
			<div className="absolute inset-0 bottom-[10vh] -z-10">
				<div
					aria-hidden
					className="absolute flex items-center justify-center size-full font-expanded text-[52vw] text-transparent bg-clip-text opacity-[0.075] duration-300"
					style={{
						fontWeight: 400 + (800 - 400) * coords.y,
						fontVariationSettings: `'slnt' ${0 + (-12 - 0) * coords.x}`,
					}}
				>
					<m.div
						className="bg-clip-text"
						style={{ backgroundImage: "url(/assets/noise.webp)", backgroundSize: "150px" }}
						initial={{ y: 60, opacity: 0 }}
						animate={{
							y: 0,
							opacity: 1,
							transition: { type: "spring", bounce: 0.5, duration: 2, delay: 1.0 },
						}}
					>
						4
					</m.div>
					<m.div
						className="bg-clip-text"
						style={{ backgroundImage: "url(/assets/noise.webp)", backgroundSize: "150px" }}
						initial={{ y: 60, opacity: 0 }}
						animate={{
							y: 0,
							opacity: 1,
							transition: { type: "spring", bounce: 0.5, duration: 2, delay: 1.1 },
						}}
					>
						0
					</m.div>
					<m.div
						className="bg-clip-text"
						style={{ backgroundImage: "url(/assets/noise.webp)", backgroundSize: "150px" }}
						initial={{ y: 60, opacity: 0 }}
						animate={{
							y: 0,
							opacity: 1,
							transition: { type: "spring", bounce: 0.5, duration: 2, delay: 1.2 },
						}}
					>
						4
					</m.div>
				</div>
			</div>
			<div className="w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
				<div className="h-screen w-full grid xl:grid-cols-2 border-x border-neutral-50/5">
					<div className="order-2 xl:order-1 relative size-full flex flex-col xl:justify-center border-t xl:border-t-0 xl:border-r border-neutral-50/5 bg-neutral-950/50">
						<div className="grow xl:grow-0 py-6 xl:py-0">
							<h1 className="relative pb-1 md:pb-3 font-serif">
								<m.div
									initial={{ opacity: 0, filter: "blur(5px)", y: 20 }}
									animate={{
										opacity: 1,
										filter: "blur(0px)",
										y: 0,
										transition: {
											type: "spring",
											bounce: 0,
											duration: 1,
											delay: 0.25,
										},
									}}
								>
									{t("Content.title")}
									<span className="text-green">.</span>
								</m.div>
							</h1>
							<m.p
								initial={{ opacity: 0, y: 40 }}
								animate={{
									opacity: 1,
									y: 0,
									transition: {
										type: "spring",
										bounce: 0,
										delay: 1,
										duration: 1,
									},
								}}
								className="text-xl md:text-2xl xl:text-3xl lg:text-balance"
							>
								{t("Content.info")}
							</m.p>
							<m.div
								initial={{ opacity: 0, y: 40 }}
								animate={{
									opacity: 1,
									y: 0,
									transition: {
										type: "spring",
										bounce: 0,
										delay: 1.2,
										duration: 1,
									},
								}}
								className="mt-6 h-12 border-y border-neutral-50/5"
							>
								<Link
									href="/"
									className="flex gap-3 items-center text-lg hover:text-neutral-950 hover:font-bold group size-full hover:px-4 hover:bg-neutral-50 active:bg-neutral-100 hover:shadow-md active:shadow-inner duration-200 ease-out-expo active:duration-75"
								>
									<span>{t("Content.returnHome")}</span>
									<div className="relative size-5 overflow-clip duration-0">
										<ArrowRight
											width={20}
											height={20}
											className="absolute group-hover:translate-x-full"
										/>
										<ArrowRight
											width={20}
											height={20}
											className="text-neutral-950 stroke-current stroke-[1.5px] absolute -translate-x-full group-hover:translate-x-0 group-hover:duration-300 ease-out-quint"
										/>
									</div>
								</Link>
							</m.div>
						</div>
						<m.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { delay: 1, duration: 1 } }}
							className="md:absolute py-6 bottom-0 left-0 right-0 text-xs text-center"
						>
							{t.rich("Content.credit", {
								Link: (chunks) => (
									<Link
										href="https://twitter.com/DIVAOFDESPAlR"
										target="_blank"
										className="text-link-external"
									>
										{chunks}
									</Link>
								),
							})}
						</m.p>
					</div>
					<m.div
						initial={{ opacity: 0, y: 40 }}
						animate={{
							opacity: 1,
							y: 0,
							transition: {
								type: "spring",
								bounce: 0,
								duration: 1,
								delay: 0.25,
							},
						}}
						className="order-1 xl:order-2 xl:h-screen inline-flex items-center justify-center"
					>
						<Image
							src={DetectiveMina}
							alt="Detective Mina chibi art, drawn by Layer."
							className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/2"
							priority
						/>
					</m.div>
				</div>
			</div>
		</main>
	);
}
