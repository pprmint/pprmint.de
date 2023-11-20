import * as React from "react";
import { useSpring, a } from "@react-spring/web";

export default function Title(
	props: React.PropsWithChildren<{
		title: string;
		description: string;
		accentColor?: string;
	}>
) {
	const { accentColor = "text-green" } = props;
	const inFromBottom = useSpring({
		from: {
			y: 100,
			clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
			opacity: 0,
		},
		to: {
			y: 0,
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			opacity: 1,
		},
		delay: 100,
	});
	const fadeIn = useSpring({
		from: { opacity: 0 },
		to: { opacity: 0.75 },
		delay: 250,
	});
	return (
		<div className="relative w-screen h-screen overflow-hidden">
			<a.div className="absolute w-screen h-screen" style={{ ...fadeIn }}>
				<div className="absolute w-screen h-screen">{props.children}</div>
			</a.div>
			<div className="absolute w-screen h-screen bg-gradient-to-t from-neutral-950" />
			<a.div
				style={{ ...inFromBottom }}
				className="absolute flex w-screen h-screen p-6 md:p-12 flex-col md:flex-row"
			>
				<div className="my-auto md:mt-auto md:mb-0 md:mr-auto">
					<h1 className="font-display font-semibold text-neutral-50 text-4xl md:text-5xl lg:text-6xl xl:text-8xl pb-1 md:pb-3">
						{props.title}
						<span className={accentColor}>.</span>
					</h1>
					<h2 className="text-neutral text-xl md:text-2xl xl:text-3xl">{props.description}</h2>
				</div>
				<i
					className={`ri-arrow-down-line text-3xl ${accentColor} self-center md:self-end animate-arrow-fade-down opacity-0`}
				/>
			</a.div>
		</div>
	);
}
