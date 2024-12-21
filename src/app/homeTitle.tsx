"use client";
import { useTranslations } from "next-intl";
import FadingImage from "src/components/ui/FadingImage";
import DotDark from "public/assets/dot_dark.webp";
import DotLight from "public/assets/dot_light.webp";
import { useTheme } from "next-themes";
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
	const { theme } = useTheme();
	return (
		<section className="relative w-screen h-screen overflow-clip">
			<div className="w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
				<div className="h-screen w-full grid grid-cols-2 border-x border-white/5 light:border-black/5">
					<div className="relative size-full flex flex-col gap-6 justify-center col-span-2 xl:col-span-1 xl:border-r border-white/5 light:border-black/5 backdrop-blur shadow-2xl shadow-neutral-950/50 light:shadow-black/5">
						<div className="drop-shadow-md">
							<h1 className="relative font-display font-thin text-neutral-50 text-5xl lg:text-6xl xl:text-8xl pb-1 md:pb-3">
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
								className="animate-fade-in font-condensed text-neutral text-xl md:text-2xl xl:text-3xl"
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
										initial={{ opacity: 0 }}
										animate={{ opacity: 1, transition: { duration: 1, delay: 0.5 + index / 10 } }}
										className="group relative w-full aspect-video bg-neutral-950/50"
									>
										<div className="flex items-center justify-center group-hover:shadow-lg group-active:shadow-sm size-full duration-200 active:duration-50">
											<span className="text-neutral-50 group-hover:opacity-0 group-hover:tracking-widest  uppercase font-mono font-bold duration-200">
												{t(button.text)}
											</span>
										</div>
										<div className="absolute group-hover:grid grid-cols-16 inset-0 duration-200 drop-shadow-md group-active:drop-shadow-none">
											{button.matrix.map((dot, index) => (
												<div
													key={index}
													className={`bg-neutral-50/10 scale-[0.2] rounded-full ${
														dot === 1 && "group-hover:bg-neutral-50 group-hover:scale-100 group-hover:rounded-none"
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
				</div>
			</div>
			<div className="absolute -z-20 inset-0">
				<m.div
					initial={{ opacity: 0, scale: 1.5, x: "40%", y: "-100%", rotate: -60 }}
					animate={{
						opacity: 1,
						scale: 1,
						x: "20%",
						y: "-65%",
						rotate: -40,
					}}
					transition={{ type: "spring", duration: 5, bounce: 0, delay: 1.5 }}
					className={`absolute w-[1100px] lg:w-[1700px] aspect-square top-0 right-0 ${
						theme === "light" ? "mix-blend-darken" : "mix-blend-lighten"
					}`}
				>
					<FadingImage hideSpinner src={theme === "light" ? DotLight : DotDark} alt="" unoptimized fill />
				</m.div>
				<m.div
					initial={{ opacity: 0, scale: 1.5, x: "70%", y: "65%", rotate: -60 }}
					animate={{
						opacity: 1,
						scale: 1,
						x: "45%",
						y: "60%",
						rotate: -40,
					}}
					transition={{ type: "spring", duration: 5, bounce: 0, delay: 1.5 }}
					className={`absolute w-[1000px] lg:w-[1200px] aspect-square bottom-0 right-0 ${
						theme === "light" ? "mix-blend-darken" : "mix-blend-lighten"
					}`}
				>
					<FadingImage hideSpinner src={theme === "light" ? DotLight : DotDark} alt="" unoptimized fill />
				</m.div>
			</div>
			<div className="absolute -z-10 inset-0 bg-gradient-to-t from-neutral-950 via-transparent" />
		</section>
	);
}
