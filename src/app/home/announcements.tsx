"use client";
import Link from "next/link";
import { useState } from "react";
import FadingImage from "src/components/ui/FadingImage";
import ArrowRight from "src/icons/ArrowRight";
import ArrowUpRight from "src/icons/ArrowUpRight";
import ChevronDown from "src/icons/ChevronDown";
import ChevronUp from "src/icons/ChevronUp";
import { Announcements as AnnouncementsType } from "src/types/announcement";
import * as m from "motion/react-client";
import { AnimatePresence } from "motion/react";

export default function Announcements({ data }: { data: AnnouncementsType }) {
	const [current, setCurrent] = useState(0);
	const [direction, setDirection] = useState(1);

	const handleNext = () => {
		setDirection(1);
		setCurrent((prev) => prev - 1);
	};

	const handlePrevious = () => {
		setDirection(-1);
		setCurrent((prev) => prev + 1);
	};

	return (
		<section className="w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
			<AnimatePresence mode="wait">
				<m.div
					key={data.data[current].id}
					className="grid grid-cols-2 border-x border-neutral-50/5 items-center"
				>
					<div className="flex col-span-2 lg:col-span-1 flex-col justify-center border-r border-neutral-50/5 h-full w-full lg:py-20 backdrop-blur bg-neutral-950/25">
						<div className="pt-4 border-y border-neutral-50/5">
							<m.h2
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { duration: 0.2 } }}
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
							animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.05 } }}
							exit={{
								opacity: 0,
								transition: { duration: 0.1, ease: "linear" },
							}}
							className="lg:pr-3 my-3 grow xl:text-xl 2xl:text-2xl"
						>
							{data.data[current].description}
						</m.p>
						<div className="flex h-12 border-y border-neutral-50/5">
							<m.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.1 } }}
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
							<div className="flex ml-auto border-l border-neutral-50/5 divide-x divide-neutral-50/5">
								<button
									disabled={current === 0}
									className="group flex items-center justify-center w-12 text-neutral-50 hover:text-neutral-950 disabled:text-neutral-500 hover:bg-neutral-50 disabled:pointer-events-none"
									onClick={handleNext}
								>
									<ChevronUp />
								</button>
								<button
									disabled={current === data.data.length - 1}
									className="group flex items-center justify-center w-12 text-neutral-50 hover:text-neutral-950 disabled:text-neutral-500 hover:bg-neutral-50 disabled:pointer-events-none"
									onClick={handlePrevious}
								>
									<ChevronDown />
								</button>
							</div>
						</div>
					</div>
					<m.div
						initial={{ y: direction > 0 ? -20 : 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1, transition: { type: "spring", bounce: 0, duration: 0.5 } }}
						exit={{
							opacity: 0,
							transition: { duration: 0.1, ease: "linear" },
						}}
						className="col-span-2 lg:col-span-1 relative lg:h-full lg:py-20 backdrop-blur bg-neutral-950/25 lg:backdrop-blur-none lg:bg-transparent"
					>
						<div className="bg-neutral-950/25 border-y border-neutral-50/5">
							<FadingImage
								src={`https://static.pprmint.de${data.data[current].media.url}`}
								alt={data.data[current].media.alternativeText || ""}
								quality={90}
								width={data.data[current].media.width}
								height={data.data[current].media.height}
								className="w-full"
							/>
						</div>
					</m.div>
				</m.div>
			</AnimatePresence>
		</section>
	);
}
