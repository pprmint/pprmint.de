"use client";
import { useSpring, a } from "@react-spring/web";
import { PropsWithChildren, ReactNode } from "react";

export default function Title(
	props: PropsWithChildren<{
		title: string;
		description: string | ReactNode;
		accentColor?: string;
		noDelay?: boolean;
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
		<div
			className={`relative w-screen ${
				props.children ? "h-screen max-h-svh" : "h-60 md:h-80 xl:h-96 mb-20 md:mb-32 xl:mb-40 text-center"
			} overflow-hidden text-balance`}
		>
			{props.children && (
				<>
					<a.div className="absolute w-full h-full" style={{ ...fadeIn }}>
						<div className="absolute w-full h-full">{props.children}</div>
					</a.div>
					<div className="absolute w-full h-full bg-gradient-to-t from-neutral-950 via-transparent" />
				</>
			)}
			<div className="absolute bottom-0 flex w-full gap-3 p-6 md:p-12 items-end">
				<div className="flex-grow">
					<h1 className="relative font-display text-neutral-50 text-4xl md:text-5xl lg:text-6xl xl:text-8xl pb-1 md:pb-3">
						{Title.map((character, index) => (
							<span
								key={index}
								className="animate-title-fade-in"
								style={{
									animationDelay: `${index / 50 + 0.25}s`,
									animationFillMode: "backwards",
								}}
							>
								{character}
							</span>
						))}
						<span
							className={`animate-title-fade-in ${accentColor}`}
							style={{
								animationDelay: `${Title.length * 0.02 + 0.27}s`,
								animationFillMode: "backwards",
							}}
						>
							.
						</span>
					</h1>
					<div
						className="animate-title-fade-in text-neutral text-xl md:text-2xl xl:text-3xl"
						style={{ animationDelay: props.noDelay ? "0.05s" : "0.25s", animationFillMode: "backwards" }}
					>
						{props.description}
					</div>
				</div>
			</div>
		</div>
	);
}
