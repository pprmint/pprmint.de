import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

export default function IndeterminateLoader({ loading }: { loading: boolean }) {
	return (
		<AnimatePresence>
			{loading && (
				<m.div
					animate={{
						left: ["0%", "0%", "100%"],
						right: ["100%", "-10%"],
						transition: {
							duration: 1,
							ease: "easeOut",
							repeat: Infinity,
							repeatDelay: 0.2,
						},
					}}
					exit={{
						left: "110%",
						right: "-20%",
						transition: {
							ease: "easeOut",
							duration: 0.3,
						},
					}}
					className="fixed top-0 z-100 inset-x-0 h-1 bg-green"
				/>
			)}
		</AnimatePresence>
	);
}
