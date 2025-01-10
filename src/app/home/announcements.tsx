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
		<section className="relative w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto overflow-clip">
			<h2 className="absolute bottom-12 lg:bottom-24 left-0 text-[10rem] lg:text-[21rem] text-neutral-50/5 -z-10 italic">{t("Content.News.heading")}</h2>
			<AnimatePresence mode="wait">
				<m.div
					key={data.data[current].id}
					className="grid grid-cols-2 border-x border-neutral-50/5 items-center py-20 lg:py-0"
				>
					<div className="flex col-span-2 lg:col-span-1 flex-col justify-center lg:border-r border-neutral-50/5 h-full w-full lg:py-40 backdrop-blur bg-neutral-950/25">
						<div className="pt-4 border-y border-neutral-50/5">
							<m.h2
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { duration: 0.3 } }}
								exit={{
									opacity: 0,
									transition: { duration: 0.1, ease: "linear" },
								}}
							>
								{data.data[current].title}
							</m.h2>
						</div>
						<m.p
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
						<div className="flex h-12 border-t lg:border-b border-neutral-50/5">
							<m.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.2 } }}
								exit={{
									opacity: 0,
									transition: { duration: 0.1, ease: "linear" },
								}}
								className="flex grow"
							>
								{data.data[current].link ? (
									data.data[current].link.startsWith("/") ? (
										<Link
											href={data.data[current].link}
											className="group size-full font-mono hover:bg-neutral-50"
										>
											<div className="inline-flex h-full items-center gap-3 group-hover:px-4 duration-200 ease-out">
												<span className="group-hover:text-neutral-950">
													{data.data[current].linkText}
												</span>
												<div className="relative size-5 overflow-clip group-hover:text-neutral-950">
													<ArrowRight
														width={20}
														height={20}
														className="absolute group-hover:translate-x-full group-hover:duration-300 ease-out-quint"
													/>
													<ArrowRight
														width={20}
														height={20}
														className="absolute -translate-x-full group-hover:translate-x-0 group-hover:duration-300 ease-out-quint"
													/>
												</div>
											</div>
										</Link>
									) : (
										<Link
											href={data.data[current].link}
											target="_blank"
											rel="noopener noreferrer"
											className="group size-full font-mono hover:bg-neutral-50"
										>
											<div className="inline-flex h-full items-center gap-3 group-hover:px-4 duration-200 ease-out">
												<span className="group-hover:text-neutral-950">
													{data.data[current].linkText}
												</span>
												<div className="relative size-5 overflow-clip group-hover:text-neutral-950">
													<ArrowUpRight
														width={20}
														height={20}
														className="absolute group-hover:translate-x-full group-hover:-translate-y-full group-hover:duration-300 ease-out-quint"
													/>
													<ArrowUpRight
														width={20}
														height={20}
														className="absolute -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 group-hover:duration-300 ease-out-quint"
													/>
												</div>
											</div>
										</Link>
									)
								) : null}
							</m.div>
							<div className="relative flex ml-auto border-l border-neutral-50/5 divide-x divide-neutral-50/5">
								<button
									className="relative group w-12 h-full text-neutral-50 hover:text-neutral-950 disabled:text-neutral-500 hover:bg-neutral-50 disabled:pointer-events-none overflow-hidden"
									onClick={handleNext}
								>
									<m.div
										initial={{ x: "100%" }}
										exit={{
											x: direction > 0 ? "0%" : "100%",
											transition: { type: "spring", duration: 0.2, bounce: 0 },
										}}
										className="absolute top-0 inset-0 flex items-center justify-center"
									>
										<ChevronLeft />
									</m.div>
									<m.div
										exit={{
											x: direction > 0 ? "-100%" : "0%",
											transition: { type: "spring", duration: 0.2, bounce: 0 },
										}}
										className="absolute top-0 inset-0 flex items-center justify-center"
									>
										<ChevronLeft />
									</m.div>
								</button>
								<button
									className="relative group w-12 h-full text-neutral-50 hover:text-neutral-950 disabled:text-neutral-500 hover:bg-neutral-50 disabled:pointer-events-none overflow-hidden"
									onClick={handlePrevious}
								>
									<m.div
										initial={{ x: "-100%" }}
										exit={{
											x: direction < 0 ? "0%" : "-100%",
											transition: { type: "spring", duration: 0.2, bounce: 0 },
										}}
										className="absolute top-0 inset-0 flex items-center justify-center"
									>
										<ChevronRight />
									</m.div>
									<m.div
										exit={{
											x: direction < 0 ? "100%" : "0%",
											transition: { type: "spring", duration: 0.2, bounce: 0 },
										}}
										className="absolute top-0 inset-0 flex items-center justify-center"
									>
										<ChevronRight />
									</m.div>
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
					<div className="col-span-2 lg:col-span-1 relative lg:h-full lg:py-40 backdrop-blur bg-neutral-950/25 lg:backdrop-blur-none lg:bg-transparent">
						<div className="bg-neutral-950/25 border-y border-neutral-50/5">
							<m.div
								initial={{
									clipPath:
										direction < 0
											? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
											: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
								}}
								animate={{
									clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
									transition: { type: "spring", duration: 0.5, bounce: 0 },
								}}
								exit={{
									clipPath:
										direction < 0
											? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
											: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
									transition: { ease: "easeIn", duration: 0.2 },
								}}
							>
								<m.div
									initial={{
										x: direction < 0 ? -40 : 40,
									}}
									animate={{
										x: 0,
										transition: { type: "spring", duration: 0.5, bounce: 0 },
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
						</div>
					</div>
				</m.div>
			</AnimatePresence>
		</section>
	);
}
