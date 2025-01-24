"use client";
import Link from "next/link";
import { useState } from "react";
import FadingImage from "src/components/ui/FadingImage";
import ArrowRight from "src/icons/ArrowRight";
import ArrowUpRight from "src/icons/ArrowUpRight";
import ChevronRight from "src/icons/ChevronRight";
import ChevronLeft from "src/icons/ChevronLeft";
import { Announcements as AnnouncementsType } from "src/types/announcement";
import * as m from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";

export default function Announcements({ data }: { data: AnnouncementsType }) {
	const t = useTranslations("HOME");
	const [current, setCurrent] = useState(0);
	const [direction, setDirection] = useState(1);

	const handleNext = () => {
		setDirection(1);
		setTimeout(() => {
			setCurrent((prev) => (prev - 1 + data.data.length) % data.data.length);
		}, 1);
	};

	const handlePrevious = () => {
		setDirection(-1);
		setTimeout(() => {
			setCurrent((prev) => (prev + 1) % data.data.length);
		}, 1);
	};

	return (
		<section className="relative w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto overflow-x-clip">
			<h2 className="absolute top-12 lg:top-auto lg:-bottom-16 left-0 text-[10rem] lg:text-[21rem] text-neutral-50/5 -z-10 font-serif font-extralight font-ultra-condensed italic">
				{t("Content.News.heading")}
			</h2>
			<div className="grid grid-cols-2 border-x border-neutral-50/5 items-center pt-20 lg:pt-0">
				<div className="order-2 lg:order-1 flex col-span-2 lg:col-span-1 flex-col justify-center lg:border-r border-neutral-50/5 h-full w-full lg:pt-40 backdrop-blur-sm bg-neutral-950/25">
					<div className="aspect-video md:aspect-auto md:grow">
						<AnimatePresence mode="wait">
							<m.div key={data.data[current].id} className="pt-2 lg:border-t border-neutral-50/5">
								<m.h3
									initial={{ opacity: 0 }}
									animate={{ opacity: 1, transition: { duration: 0.3 } }}
									exit={{
										opacity: 0,
										transition: { duration: 0.1, ease: "linear" },
									}}
									className="text-3xl md:text-4xl lg:text-5xl"
								>
									{data.data[current].title}
								</m.h3>
							</m.div>
						</AnimatePresence>
						<AnimatePresence mode="wait">
							<m.p
								key={data.data[current].id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
								exit={{
									opacity: 0,
									transition: { duration: 0.1, ease: "linear" },
								}}
								className="lg:pr-3 my-3 grow xl:text-xl 2xl:text-2xl"
							>
								{data.data[current].description}
							</m.p>
						</AnimatePresence>
					</div>
					<div className="flex h-12 border-y border-neutral-50/5">
						<AnimatePresence mode="wait">
							<m.div
								key={data.data[current].id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.2 } }}
								exit={{
									opacity: 0,
									transition: { duration: 0.1, ease: "linear" },
								}}
								className="flex grow"
							>
								{data.data[current].link && (
									<Link
										href={data.data[current].link}
										target={data.data[current].link.startsWith("/") ? "_self" : "_blank"}
										rel="noopener noreferrer"
										className="flex gap-3 items-center text-lg hover:text-neutral-950 hover:font-bold group size-full hover:px-4 hover:bg-neutral-50 active:bg-neutral-100 hover:shadow-md active:shadow-inner duration-200 ease-out-expo active:duration-75"
									>
										<span>{data.data[current].linkText}</span>
										{data.data[current].link.startsWith("/") ? (
											<div className="relative size-5 overflow-clip duration-0">
												<ArrowRight width={20} height={20} className="absolute group-hover:translate-x-full" />
												<ArrowRight
													width={20}
													height={20}
													className="text-neutral-950 stroke-current stroke-[1.5px] absolute -translate-x-full group-hover:translate-x-0 group-hover:duration-300 ease-out-quint"
												/>
											</div>
										) : (
											<div className="relative size-5 overflow-clip duration-0">
												<ArrowUpRight
													width={20}
													height={20}
													className="absolute group-hover:translate-x-full group-hover:-translate-y-full"
												/>
												<ArrowUpRight
													width={20}
													height={20}
													className="text-neutral-950 stroke-current stroke-[1.5px] absolute -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 group-hover:duration-300 ease-out-quint"
												/>
											</div>
										)}
									</Link>
								)}
							</m.div>
						</AnimatePresence>
						<div className="relative flex ml-auto border-l border-neutral-50/5 divide-x divide-neutral-50/5">
							<button
								className="relative group w-12 h-full text-neutral-50 hover:text-neutral-950 disabled:text-neutral-500 hover:bg-neutral-50 active:bg-neutral-100 hover:shadow-md duration-100 active:duration-75 active:shadow-inner overflow-hidden"
								onClick={handleNext}
							>
								<AnimatePresence mode="wait">
									<m.div key={data.data[current].link}>
										<m.div
											initial={{ x: "100%" }}
											exit={{
												x: direction > 0 ? "0%" : "100%",
												transition: { ease: "easeOut", duration: 0.2 },
											}}
											className="absolute top-0 inset-0 flex items-center justify-center"
										>
											<ChevronLeft className="group-hover:stroke-current group-hover:stroke-[1.8]" />
										</m.div>
										<m.div
											exit={{
												x: direction > 0 ? "-100%" : "0%",
												transition: { ease: "easeOut", duration: 0.2 },
											}}
											className="absolute top-0 inset-0 flex items-center justify-center"
										>
											<ChevronLeft className="group-hover:stroke-current group-hover:stroke-[1.8]" />
										</m.div>
									</m.div>
								</AnimatePresence>
							</button>
							<button
								className="relative group w-12 h-full text-neutral-50 hover:text-neutral-950 disabled:text-neutral-500 hover:bg-neutral-50 active:bg-neutral-100 hover:shadow-md duration-100 active:duration-75 active:shadow-inner overflow-hidden"
								onClick={handlePrevious}
							>
								<AnimatePresence mode="wait">
									<m.div key={data.data[current].link}>
										<m.div
											initial={{ x: "-100%" }}
											exit={{
												x: direction < 0 ? "0%" : "-100%",
												transition: { ease: "easeOut", duration: 0.2 },
											}}
											className="absolute top-0 inset-0 flex items-center justify-center"
										>
											<ChevronRight className="group-hover:stroke-current group-hover:stroke-[1.8]" />
										</m.div>
										<m.div
											exit={{
												x: direction < 0 ? "100%" : "0%",
												transition: { ease: "easeOut", duration: 0.2 },
											}}
											className="absolute top-0 inset-0 flex items-center justify-center"
										>
											<ChevronRight className="group-hover:stroke-current group-hover:stroke-[1.8]" />
										</m.div>
									</m.div>
								</AnimatePresence>
							</button>
							<m.div
								className="absolute bottom-0 lg:-bottom-px bg-neutral-50 h-px"
								style={{
									width: `${100 / data.data.length}%`,
									left: `${current * (100 / data.data.length)}%`,
								}}
								animate={{
									left: `${current * (100 / data.data.length)}%`,
									transition: { type: "spring", duration: 0.2, bounce: 0 },
								}}
								exit={{
									left:
										direction < 0
											? `${((current + 1) % data.data.length) * (100 / data.data.length)}%`
											: `${((current - 1 + data.data.length) % data.data.length) * (100 / data.data.length)}%`,
									transition: { type: "spring", duration: 0.2, bounce: 0 },
								}}
							/>
						</div>
					</div>
				</div>
				<div className="order-1 lg:order-2 col-span-2 lg:col-span-1 relative lg:h-full lg:pt-40 backdrop-blur-sm bg-neutral-950/25 lg:backdrop-blur-none lg:bg-transparent">
					<div className="bg-neutral-950/25 border-y border-neutral-50/5 aspect-video">
						<AnimatePresence>
							<m.div
								key={data.data[current].id}
								initial={{
									clipPath: direction < 0 ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
								}}
								animate={{
									clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
									transition: { type: "spring", duration: 0.5, bounce: 0, delay: 0.05 },
								}}
								exit={{
									clipPath: direction < 0 ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
									opacity: 0,
									transition: { ease: "easeIn", duration: 0.2 },
								}}
								className="absolute"
							>
								<m.div
									initial={{
										x: direction < 0 ? -40 : 40,
									}}
									animate={{
										x: 0,
										transition: { type: "spring", duration: 0.5, bounce: 0, delay: 0.05 },
									}}
									exit={{
										x: direction < 0 ? 20 : -20,
										transition: { ease: "easeIn", duration: 0.2 },
									}}
								>
									<FadingImage
										src={`https://static.pprmint.de${data.data[current].media.url}`}
										alt={data.data[current].media.alternativeText || ""}
										quality={90}
										width={data.data[current].media.width}
										height={data.data[current].media.height}
										className="w-full"
									/>
								</m.div>
							</m.div>
						</AnimatePresence>
					</div>
				</div>
			</div>
		</section>
	);
}
