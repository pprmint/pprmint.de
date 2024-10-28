"use client";
import { useEffect, useState } from "react";
import { useTransition, a, easings } from "@react-spring/web";
import ChevronUp from "src/icons/ChevronUp";

export default function ScrollToTopButton() {
	// Show button on scroll.
	const [show, setShow] = useState(false);
	function showButton() {
		if (window.scrollY >= 100) {
			setShow(true);
		} else {
			setShow(false);
		}
	}
	useEffect(() => {
		showButton();
		window.addEventListener("scroll", showButton);
	});

	function handleScroll() {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}

	const ButtonTransition = useTransition(show, {
		from: {
			scale: 0,
		},
		enter: {
			scale: 1,
			y: 0,
			config: {
				tension: 200,
				friction: 25,
				clamp: true,
			},
		},
		leave: {
			y: 100,
			config: {
				duration: 300,
				easing: easings.easeInCubic,
			},
		},
	});

	return ButtonTransition((styles, item) =>
		item ? (
			// @ts-expect-error
			<a.button
				style={styles}
				onClick={handleScroll}
				className="group fixed bottom-6 right-6 z-50 size-12 flex items-center justify-center text-neutral-50 bg-neutral-950/75 hover:bg-elevate/75 active:bg-neutral-800/75 ring-1 ring-black/10 dark:ring-black/50 border border-white/10 rounded-full backdrop-blur-xl shadow-lg active:shadow-none duration-100"
			>
				<ChevronUp width={20} height={20} />
			</a.button>
		) : null
	);
}
