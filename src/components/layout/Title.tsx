"use client";
import * as React from "react";
import { useSpring, a } from "@react-spring/web";
import { ArrowDown } from "lucide-react";

export default function Title(
	props: React.PropsWithChildren<{
		title: string;
		description: string;
		accentColor?: string;
	}>
) {
	const { accentColor = "text-green" } = props;
	const fadeIn = useSpring({
		from: { opacity: 0, scale: 1.05 },
		to: { opacity: 0.75, scale: 1 },
		delay: 250,
	});
	const Title = props.title.split("");
	return (
		<div className="relative w-screen h-screen max-h-svh overflow-hidden">
			<a.div className="absolute w-full h-full" style={{ ...fadeIn }}>
				<div className="absolute w-full h-full">{props.children}</div>
			</a.div>
			<div className="absolute w-full h-full bg-gradient-to-t from-neutral-950 via-transparent" />
			<div className="absolute bottom-0 flex w-full gap-3 p-6 md:p-12 items-end">
				<div className="flex-grow">
					<h1 className="relative font-display font-semibold text-neutral-50 text-4xl md:text-5xl lg:text-6xl xl:text-8xl pb-1 md:pb-3">
						{Title.map((character, index) => (
							<span
								key={index}
								className="animate-title-fade-in"
								style={{ animationDelay: `${index / 50 + 0.25}s`, animationFillMode: "backwards" }}
							>
								{character}
							</span>
						))}
						<span
							className={`animate-title-fade-in ${accentColor}`}
							style={{ animationDelay: `${Title.length * 0.02 + 0.27}s`, animationFillMode: "backwards" }}
						>
							.
						</span>
					</h1>
					<p
						className="animate-title-fade-in text-neutral text-xl md:text-2xl xl:text-3xl"
						style={{ animationDelay: "0.25s", animationFillMode: "backwards" }}
					>
						{props.description}
					</p>
				</div>
				<ArrowDown size={32} className={`${accentColor} animate-arrow-fade-down opacity-0`} />
			</div>
		</div>
	);
}
