"use client";
import { useTranslations } from "next-intl";
import * as m from "motion/react-m";
import Link from "next/link";
import FadingImage from "src/components/ui/FadingImage";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { useNavbar } from "src/components/layout/navigation/NavBarContext";

const Links = [
	{
		link: "/graphics",
		text: "Content.Hero.graphics",
		matrix: [
			1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1,
			0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1,
			0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0,
			1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		],
		images: [
			"https://cms.pprmint.de/uploads/Mesh_Edit_778967f6fe.webp",
			"https://cms.pprmint.de/uploads/Solar_System_2_f133addf64.png",
		],
	},
	{
		link: "/photos",
		text: "Content.Hero.photos",
		matrix: [
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0,
			1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
			1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
			0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		],
		images: [
			"https://cms.pprmint.de/uploads/P1070217_09b3fc1981.webp",
			"https://cms.pprmint.de/uploads/DSC_00275_0b8fa85e3b.webp",
		],
	},
	{
		link: "/projects",
		text: "Content.Hero.projects",
		matrix: [
			1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
			1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0,
			0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
			0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
		],
		images: [
			"https://cms.pprmint.de/uploads/pomi_moe_cdd8f9992e.png",
			"https://cms.pprmint.de/uploads/autsellia_com_582c948c0d.png",
		],
	},
	{
		link: "/contact",
		text: "Content.Hero.contact",
		matrix: [
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0,
			0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		],
		images: ["/assets/home/letter.png", "/assets/home/pen.png"],
	},
];

export default function HomeTitle() {
	const t = useTranslations("HOME");
	const [hovered, setHovered] = useState(-1);
	const { setNoAccents } = useNavbar();
	useEffect(() => {
		setNoAccents(false);
	});
	return (
		<section className="relative w-screen h-screen overflow-clip">
			<div className="absolute -z-10 inset-0 bg-white dark:bg-neutral-950">
				<video
					src="https://static.pprmint.de/uploads/wavy_ff6ca718a6.webm"
					className="absolute inset-0 object-fill w-full h-full opacity-20 invert dark:invert-0 mix-blend-hard-light dark:mix-blend-normal"
					loop
					autoPlay
					muted
					playsInline
				/>
				<div
					style={{ background: "url(/assets/noise.png)" }}
					className="absolute inset-0 opacity-50 dark:opacity-20 dark:mix-blend-multiply mix-blend-screen"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-950 via-30% via-transparent" />
				<m.div
					initial={{ opacity: 1 }}
					animate={{
						opacity: 0,
						transition: { duration: 1, delay: 1 },
					}}
					className="absolute inset-0 bg-white dark:bg-neutral-950"
				/>
			</div>
			<div className="w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
				<div className="h-screen w-full md:grid grid-cols-2 border-x border-black/5 dark:border-white/5">
					<div className="relative size-full flex flex-col gap-6 justify-center col-span-2 md:col-span-1 xl:border-r border-black/5 dark:border-white/5">
						<div>
							<h1 className="relative pb-1 md:pb-3 font-serif" aria-label={t("Content.Hero.title")}>
								{String(t("Content.Hero.title") + ".")
									.split("")
									.map((character, index) => (
										<m.div
											aria-hidden
											key={index}
											initial={{ opacity: 0, filter: "blur(5px)", y: 20 }}
											animate={{
												opacity: 1,
												filter: "blur(0px)",
												y: 0,
												transition: {
													type: "spring",
													bounce: 0,
													delay: index / 50 + 0.25,
													duration: 1,
												},
											}}
											className={`inline-block ${character === "." && "text-green"}`}
										>
											{character.replace(" ", "\xa0")}
										</m.div>
									))}
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
								className="text-xl md:text-2xl xl:text-3xl"
							>
								{t("Content.Hero.description")}
							</m.p>
						</div>
						<div onMouseLeave={() => setHovered(-1)} className="grid grid-cols-2 xl:grid-cols-4">
							{Links.map((button, index) => (
								<Link
									href={button.link}
									key={index}
									onMouseEnter={() => setHovered(index)}
									className="group"
								>
									<m.button
										tabIndex={-1}
										initial={{ opacity: 0, y: 40 }}
										animate={{
											opacity: 1,
											y: 0,
											transition: {
												type: "spring",
												bounce: 0,
												duration: 1,
												delay: 1 + (index + 1) / 10,
											},
										}}
										className="flex items-center justify-center relative w-full aspect-video border-y odd:border-r border-black/5 dark:border-white/5 even:border-r-0 group-last:border-r-0"
									>
										<span className="text-neutral-950 dark:text-white group-hover:opacity-0 group-hover:tracking-widest uppercase font-stretch-expanded font-light duration-200">
											{t(button.text)}
										</span>
										<div className="absolute group-hover:grid grid-cols-16 inset-0 duration-200 drop-shadow-md group-active:drop-shadow-none">
											{button.matrix.map((dot, index) => (
												<div
													key={index}
													className={`bg-neutral-50/10 scale-[0.2] rounded-full ${
														dot === 1 &&
														"group-hover:bg-neutral-950 dark:group-hover:bg-neutral-50 group-hover:scale-[1.05] group-hover:rounded-none"
													} duration-100`}
													style={{ transitionDelay: `${index * 0.002}s` }}
												/>
											))}
										</div>
									</m.button>
								</Link>
							))}
						</div>
					</div>
					<div className="hidden md:block relative size-full col-span-2 md:col-span-1">
						<AnimatePresence mode="wait">
							{Links[hovered] && (
								<m.div
									key={Links[hovered].text}
									initial={{ y: "-40%" }}
									animate={{
										y: "-50%",
										transition: {
											type: "spring",
											bounce: 0,
											duration: 0.8,
										},
									}}
									className="absolute top-1/2 left-1/2"
									style={{ writingMode: "vertical-lr" }}
								>
									{t(Links[hovered].text)
										.split("")
										.map((character, index) => (
											<m.span
												key={index}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1, transition: { delay: 0.03 * index } }}
												exit={{ opacity: 0, transition: { duration: 0.15 } }}
												className="font-serif font-stretch-ultra-condensed text-[15rem] xl:text-[20rem] font-thin text-black/5 dark:text-white/5"
												aria-hidden
											>
												{character}
											</m.span>
										))}
								</m.div>
							)}
						</AnimatePresence>
						<AnimatePresence mode="wait">
							{Links[hovered] && (
								<m.div
									key={Links[hovered].link}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0, transition: { duration: 0.15 } }}
									className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-3/4 h-auto"
									style={{ perspective: 2000 }}
								>
									{Links[hovered].images.map((image, index) => (
										<m.div
											key={Links[hovered].images[index]}
											initial={{
												x: index * -70,
												y: (index + 1) * -100 + 60,
												z: index * 20,
												rotateX: 6,
												rotateY: -6,
												rotateZ: 6 + index * -2,
												opacity: 0,
												filter: `blur(${(Links[hovered].images.length - 1 - index) * 2 + 4}px)`,
											}}
											animate={{
												x: index * -100,
												y: (index + 1) * -100,
												z: index * 20,
												rotateX: 12,
												rotateY: -12,
												rotateZ: 6 + index * -2,
												opacity: 1,
												filter: `blur(${(Links[hovered].images.length - 1 - index) * 2}px)`,
												transition: {
													type: "spring",
													bounce: 0,
													duration: 0.8,
													delay: index * 0.2,
												},
											}}
											exit={{
												x: index * -90,
												y: (index + 1) * -90,
												z: index * 10,
												filter: `blur(${(Links[hovered].images.length - 1 - index) * 2 + 4}px)`,
												transition: { duration: 0.15 },
											}}
											className="absolute"
										>
											<FadingImage
												src={image}
												width={1920}
												height={1080}
												alt=""
												className="drop-shadow-xl"
												hideSpinner
											/>
										</m.div>
									))}
								</m.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</section>
	);
}
