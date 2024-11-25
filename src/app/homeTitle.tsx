"use client";
import { useSpring, a, easings } from "@react-spring/web";
import { useTranslations } from "next-intl";
import FadingImage from "src/components/ui/FadingImage";
import DotDark from "public/assets/dot_dark.webp";
import DotLight from "public/assets/dot_light.webp";
import { useTheme } from "next-themes";
import NoSSR from "src/components/NoSSR";

export default function HomeTitle() {
	const t = useTranslations("HOME");
	const { theme } = useTheme();
	const circleTop = useSpring({
		from: { opacity: 0, scale: 1.5, x: "-55%", y: "-60%", rotate: -60 },
		to: { opacity: 1, scale: 1, x: "-50%", y: "-55%", rotate: -70 },
		config: {
			duration: 5000,
			easing: easings.easeOutCubic,
		},
		delay: 500,
	});
	const circleBottom = useSpring({
		from: { opacity: 0, scale: 1.5, x: "50%", y: "60%", rotate: -40 },
		to: { opacity: 1, scale: 1, x: "40%", y: "70%", rotate: -50 },
		config: {
			duration: 5000,
			easing: easings.easeOutCubic,
		},
		delay: 500,
	});
	return (
		<section className="relative w-screen h-screen overflow-clip">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-9">
				<h1 className="relative font-display font-bold text-neutral-50 text-4xl md:text-5xl lg:text-6xl xl:text-8xl pb-1 md:pb-3">
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
							animationDelay: `${t("Head.title").length * 0.02 + 0.25}s`,
							animationFillMode: "backwards",
							animationDuration: "1s",
						}}
					>
						.
					</span>
				</h1>
				<p
					className="animate-fade-in text-neutral text-xl md:text-2xl xl:text-3xl"
					style={{ animationDelay: "0.5s", animationFillMode: "backwards", animationDuration: "1s" }}
				>
					{t("Head.description")}
				</p>
			</div>
			<div className="absolute inset-0">
				<NoSSR>
					{/* @ts-expect-error */}
					<a.div
						style={{ ...circleTop }}
						className={`absolute w-screen aspect-square top-0 left-0 ${
							theme === "light" ? "mix-blend-darken" : "mix-blend-lighten"
						}`}
					>
						<FadingImage src={theme === "light" ? DotLight : DotDark} alt="" unoptimized fill />
					</a.div>
					{/* @ts-expect-error */}
					<a.div
						style={{ ...circleBottom }}
						className={`absolute w-screen aspect-square bottom-0 right-0 ${
							theme === "light" ? "mix-blend-darken" : "mix-blend-lighten"
						}`}
					>
						<FadingImage src={theme === "light" ? DotLight : DotDark} alt="" unoptimized fill />
					</a.div>
				</NoSSR>
			</div>
			<div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent" />
		</section>
	);
}
