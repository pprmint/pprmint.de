"use client";
import Link from "next/link";
import { useState } from "react";
import FadingImage from "@/components/ui/FadingImage";
import ArrowRight from "@/icons/ArrowRight";
import ArrowUpRight from "@/icons/ArrowUpRight";
import ChevronRight from "@/icons/ChevronRight";
import ChevronLeft from "@/icons/ChevronLeft";
import { PaginatedDocs } from "payload";
import type { Announcement } from "@/payload-types";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import RichText from "@/components/richText";

export default function Announcements({ data }: { data: PaginatedDocs<Announcement> }) {
	const t = useTranslations("HOME");
	const [current, setCurrent] = useState(0);
	const [direction, setDirection] = useState(1);

	const handleNext = () => {
		setDirection(1);
		setTimeout(() => {
			setCurrent((prev) => (prev - 1 + data.docs.length) % data.docs.length);
		}, 1);
	};

	const handlePrevious = () => {
		setDirection(-1);
		setTimeout(() => {
			setCurrent((prev) => (prev + 1) % data.docs.length);
		}, 1);
	};

	return (
		<section className="relative w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto overflow-x-clip">
			<h2 className="absolute top-12 lg:top-auto lg:-bottom-12 left-0 text-[10rem] lg:text-[20rem] text-black/5 dark:text-white/5 -z-10 font-serif font-extralight font-stretch-extra-condensed italic tracking-tight">
				{t("Content.News.heading")}
			</h2>
			<div className="grid grid-cols-2 border-x border-black/5 dark:border-white/5 items-center pt-20 lg:pt-0">
				<div className="order-2 lg:order-1 flex col-span-2 lg:col-span-1 flex-col justify-center lg:border-r border-black/5 dark:border-white/5 h-full w-full lg:pt-40 lg:backdrop-blur-sm bg-white/25 dark:bg-neutral-950/25">
					<div className="md:grow">
						<AnimatePresence mode="wait">
							<m.div
								layout
								key={data.docs[current].id}
								className="pt-3 lg:border-t border-black/5 dark:border-white/5"
							>
								<m.h3
									initial={{ opacity: 0 }}
									animate={{ opacity: 1, transition: { duration: 0.3 } }}
									exit={{
										opacity: 0,
										transition: { duration: 0.1, ease: "linear" },
									}}
									className="text-3xl md:text-4xl lg:text-5xl"
								>
									{data.docs[current].title}
								</m.h3>
							</m.div>
						</AnimatePresence>
						<AnimatePresence mode="wait">
							<m.div
								key={data.docs[current].id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
								exit={{
									opacity: 0,
									transition: { duration: 0.1, ease: "linear" },
								}}
							>
								<RichText
									className="lg:pr-3 my-3 grow xl:text-xl 2xl:text-2xl"
									data={data.docs[current].text}
								/>
							</m.div>
						</AnimatePresence>
					</div>
					<div className="flex h-12 border-y border-black/5 dark:border-white/5">
						<AnimatePresence mode="wait">
							<m.div
								key={data.docs[current].id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.2 } }}
								exit={{
									opacity: 0,
									transition: { duration: 0.1, ease: "linear" },
								}}
								className="flex grow"
							>
								{data.docs[current].link && (
									<Link
										href={data.docs[current].link}
										target={data.docs[current].link.startsWith("/") ? "_self" : "_blank"}
										rel="noopener noreferrer"
										className="w-full"
									>
										<Button size="full" noInitialPadding>
											<span>{data.docs[current].linkText}</span>
											{data.docs[current].link.startsWith("/") ? (
												<div className="relative size-5 overflow-clip duration-0">
													<ArrowRight
														width={20}
														height={20}
														className="absolute group-hover:translate-x-full"
													/>
													<ArrowRight
														width={20}
														height={20}
														className="text-white dark:text-neutral-950 stroke-current stroke-[1.5px] absolute -translate-x-full group-hover:translate-x-0 group-hover:duration-300 ease-out-quint"
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
														className="text-white dark:text-neutral-950 stroke-current stroke-[1.5px] absolute -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 group-hover:duration-300 ease-out-quint"
													/>
												</div>
											)}
										</Button>
									</Link>
								)}
							</m.div>
						</AnimatePresence>
						<div className="relative flex w-24 ml-auto border-l border-black/5 dark:border-white/5 divide-x divide-neutral-50/5">
							<Button size="full" onClick={handleNext}>
								<AnimatePresence mode="wait">
									<m.div key={data.docs[current].id}>
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
							</Button>
							<Button size="full" onClick={handlePrevious}>
								<AnimatePresence mode="wait">
									<m.div key={data.docs[current].id}>
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
							</Button>
							<m.div
								className="absolute -bottom-px bg-neutral-950 dark:bg-white h-px"
								style={{
									width: `${100 / data.docs.length}%`,
									left: `${current * (100 / data.docs.length)}%`,
								}}
								animate={{
									left: `${current * (100 / data.docs.length)}%`,
									transition: { type: "spring", duration: 0.2, bounce: 0 },
								}}
								exit={{
									left:
										direction < 0
											? `${((current + 1) % data.docs.length) * (100 / data.docs.length)}%`
											: `${
													((current - 1 + data.docs.length) % data.docs.length) *
													(100 / data.docs.length)
											  }%`,
									transition: { type: "spring", duration: 0.2, bounce: 0 },
								}}
							/>
						</div>
					</div>
				</div>
				<div className="order-1 lg:order-2 col-span-2 lg:col-span-1 relative lg:h-full lg:pt-40 backdrop-blur-sm bg-neutral-950/25 lg:backdrop-blur-none lg:bg-transparent">
					<div className="aspect-video border-y border-black/5 dark:border-white/5 overflow-clip">
						<AnimatePresence>
							<m.div
								key={data.docs[current].id}
								initial={{
									position: "relative",
									clipPath:
										direction < 0
											? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
											: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
								}}
								animate={{
									position: "relative",
									clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
									transition: { type: "spring", duration: 0.5, bounce: 0, delay: 0.05 },
								}}
								exit={{
									position: "absolute",
									clipPath:
										direction < 0
											? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
											: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
									opacity: 0,
									transition: { ease: "easeIn", duration: 0.2 },
								}}
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
									{typeof data.docs[current] === "object" && data.docs[current].sizes && (
										<FadingImage
											src={data.docs[current].sizes?.fhd?.url || ""}
											alt={data.docs[current].alt || ""}
											quality={90}
											width={data.docs[current].sizes?.fhd?.width || 0}
											height={data.docs[current].sizes?.fhd?.height || 0}
											className="w-full"
										/>
									)}
								</m.div>
							</m.div>
						</AnimatePresence>
					</div>
				</div>
			</div>
		</section>
	);
}
