"use client";
import { useTranslations } from "next-intl";
import * as m from "motion/react-client";
import Link from "next/link";

const Buttons = [
	{
		link: "/graphics",
		text: "Content.Hero.Graphics.heading",
		matrix: [
			1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1,
			0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1,
			0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0,
			1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		],
	},
	{
		link: "/photos",
		text: "Content.Hero.Photos.heading",
		matrix: [
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0,
			1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
			1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
			0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		],
	},
	{
		link: "/projects",
		text: "Content.Hero.Projects.heading",
		matrix: [
			1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
			1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0,
			0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
			0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
		],
	},
	{
		link: "/contact",
		text: "Content.Hero.Contact.heading",
		matrix: [
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0,
			0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		],
	},
];

export default function HomeTitle() {
	const t = useTranslations("HOME");
	return (
		<section className="relative w-screen h-screen overflow-clip">
			<div className="w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
				<div className="h-screen w-full grid grid-cols-2 border-x border-white/5 light:border-black/5">
					<div className="relative size-full flex flex-col gap-6 justify-center col-span-2 lg:col-span-1 xl:border-r border-white/5 light:border-black/5">
						<div>
							<h1 className="relative pb-1 md:pb-3">
								{t("Head.title")
									.split("")
									.map((character, index) => (
										<span
											key={index}
											className="animate-title-fade-in"
											style={{
												animationDelay: `${index / 20 + 0.25}s`,
												animationFillMode: "backwards",
												animationDuration: "1s",
											}}
										>
											{character}
										</span>
									))}
								<span
									className="animate-title-fade-in text-green"
									style={{
										animationDelay: `${t("Head.title").length / 20 + 0.25}s`,
										animationFillMode: "backwards",
										animationDuration: "1s",
									}}
								>
									.
								</span>
							</h1>
							<p
								className="animate-title-fade-in font-narrow text-xl md:text-2xl xl:text-3xl"
								style={{
									animationDelay: "0.75s",
									animationFillMode: "backwards",
									animationDuration: "1s",
								}}
							>
								{t("Head.description")}
							</p>
						</div>
						<div className="grid grid-cols-2 sm:grid-cols-4 divide-x border-y divide-white/5 light:divide-black/5 border-white/5 light:border-black/5">
							{Buttons.map((button, index) => (
								<Link href={button.link} key={index}>
									<m.button
										tabIndex={-1}
										initial={{ opacity: 0, filter: "blur(5px)" }}
										animate={{
											opacity: 1,
											filter: "blur(0px)",
											transition: { duration: 1, delay: 0.85 + index / 10 },
										}}
										className="group relative w-full aspect-video"
									>
										<div className="flex items-center justify-center group-hover:shadow-lg group-active:shadow-sm size-full duration-200 active:duration-50">
											<span className="text-neutral-50 group-hover:opacity-0 group-hover:tracking-widest uppercase font-mono font-bold duration-200">
												{t(button.text)}
											</span>
										</div>
										<div className="absolute group-hover:grid grid-cols-16 inset-0 duration-200 drop-shadow-md group-active:drop-shadow-none">
											{button.matrix.map((dot, index) => (
												<div
													key={index}
													className={`bg-neutral-50/10 scale-[0.2] rounded-full ${
														dot === 1 &&
														"group-hover:bg-neutral-50 group-hover:scale-[1.05] group-hover:rounded-none"
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
					<div className="size-full col-span-2 lg:col-span-1" style={{ perspective: 1000 }}></div>
				</div>
			</div>
			<m.div
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					transition: { duration: 1, delay: 1 },
				}}
				className="absolute -z-10 inset-0"
			>
				<video
					src="https://static.pprmint.de/uploads/wavy_ff6ca718a6.webm"
					className="absolute inset-0 object-fill w-full h-full opacity-20 light:invert light:mix-blend-hard-light"
					loop
					autoPlay
					muted
					playsInline
				/>
			</m.div>
			<div
				style={{ background: "url(/assets/noise.png)" }}
				className="absolute inset-0 opacity-20 mix-blend-multiply light:mix-blend-screen light:opacity-50 -z-10"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-25% via-transparent -z-10" />
		</section>
	);
}
