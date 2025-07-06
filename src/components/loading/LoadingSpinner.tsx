import { Transition } from "motion/react";
import * as m from "motion/react-m";

export default function LoadingSpinner() {
	const transition: Transition<any> = {
		duration: 1.5,
		ease: [0.4, 0, 0, 1],
		times: [0, 0.5, 1],
		repeat: Infinity,
	};

	return (
		<div className="relative size-8">
			<m.div
				animate={{
					x: ["0%", "100%", "100%", "0%", "0%"],
					y: ["0%", "0%", "100%", "100%", "0%"],
					skewX: [0, -6, 0, 0, 0, -6, 0, 0, 0],
					skewY: [0, 0, 0, 6, 0, 0, 0, 6, 0],
				}}
				transition={transition}
				className="absolute size-4 bg-green"
			/>
			<m.div
				animate={{
					x: ["100%", "0%", "0%", "100%", "100%"],
					y: ["100%", "100%", "0%", "0%", "100%"],
					skewX: [0, -6, 0, 0, 0, -6, 0, 0, 0],
					skewY: [0, 0, 0, 6, 0, 0, 0, 6, 0],
				}}
				transition={transition}
				className="absolute translate-x-full translate-y-full size-4 bg-green"
			/>
		</div>
	);
}
