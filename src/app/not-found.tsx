"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSpring, a, config, easings, useTransition } from "@react-spring/web";

import Button from "src/components/ui/Button";

import Wordmark from "public/assets/wordmark.svg";
import DetectiveMina from "public/assets/404/mina_chibi.webp";
import { useEffect, useState } from "react";
import Home from "src/icons/Home";

export default function NotFound() {
	// Animations
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
		delay: 1650,
		config: {
			easing: easings.easeOutExpo,
			duration: 1000,
		},
	});
	const fadeIn = useSpring({
		from: { opacity: 0 },
		to: { opacity: 0.75 },
		config: {
			duration: 300,
		},
	});
	const [countFinished, setCountFinished] = useState(false);
	const countUp = useSpring({
		from: { val: 100 },
		to: { val: 404 },
		config: {
			tension: 150,
			friction: 40,
		},
		onRest: () => setCountFinished(true),
	});
	const ripple = useSpring({
		from: { opacity: 0.75, scale: 0 },
		to: { opacity: 0, scale: 1.5 },
		delay: 1650,
		config: {
			mass: 3,
			friction: 100,
		},
	});

	// Cycle between front and back full-body drawing.
	const [showGerman, setShowGerman] = useState(false);
	useEffect(() => {
		const interval = setInterval(() => {
			setShowGerman(!showGerman);
		}, 10000);
		return () => clearInterval(interval);
	}, [showGerman]);

	const cycleTransition = useTransition(!showGerman, {
		from: { opacity: 0, y: 20 },
		enter: { opacity: 1, y: 0, config: { duration: 500, easing: easings.easeOutBack } },
		leave: { opacity: 0, y: -40, config: { duration: 400, easing: easings.easeInBack } },
		exitBeforeEnter: true,
	});

	return (
		<html lang="en">
			<body className="bg-neutral-950 selection:bg-green selection:text-neutral-950 text-neutral focus-visible:outline-none focus-visible:ring-2 overflow-x-hidden">
				<Link href="/" className="fixed top-0 left-0 z-50 pl-6 md:pl-9 h-16 flex items-center">
					<Image src={Wordmark} alt="pprmint. logo" className="h-auto w-[150px] mt-1" />
				</Link>
				<main className="relative w-screen h-screen overflow-clip">
					<a.div className="absolute inset-0" style={{ ...fadeIn }}>
						<a.div
							className={`absolute top-1/2 -translate-y-1/2 ${
								countFinished ? "text-neutral-800" : "text-green-800"
							} font-digits blur-sm lg:blur-lg w-full text-center -skew-y-6 duration-500`}
							style={{ fontSize: "50vw" }}
						>
							{countUp.val.to((val) => Math.floor(val))}
						</a.div>
						<div className="absolute flex items-center justify-center top-0 left-0 w-screen h-screen">
							<a.div
								style={{ ...ripple }}
								className="bg-green-800 aspect-square h-screen md:h-auto md:w-screen rounded-full"
							/>
						</div>
						<div
							className="absolute w-full h-full top-0 left-0"
							style={{
								backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><path d="M0 10V0h10a2 2 0 0 0 4 0h10v10a2 2 0 0 0 0 4v10H14a2 2 0 0 0-4 0H0V14a2 2 0 0 0 0-4Z" style="fill:%23111"/></svg>')`,
								backgroundRepeat: "repeat",
							}}
						/>
					</a.div>
					<a.div
						className="z-10 flex flex-col md:flex-row-reverse justify-center items-center gap-3 md:gap-6 w-full max-w-7xl h-full mx-auto px-6 md:px-9"
						style={{ ...inFromBottom }}
					>
						<Image
							src={DetectiveMina}
							alt="Detective Mina chibi art, drawn by Layer."
							className="w-40 md:w-72 lg:w-80"
							priority
						/>
						{cycleTransition((styles, item) =>
							item ? (
								<>
									<a.div
										style={styles}
										className="flex flex-col items-center md:items-start md:flex-grow text-center md:text-left h-max"
									>
										<div className="pb-6">
											<h1>
												She looked everywhere
												<span className="text-green">.</span>
											</h1>
											<p className="md:text-lg">
												There's no page here. Maybe it was moved or it never existed. That's how
												it is sometimes.
											</p>
										</div>
										<Link href="/" className="w-fit">
											<Button color="green">
												Go to home page
												<Home />
											</Button>
										</Link>
									</a.div>
									<a.p
										style={styles}
										className="md:absolute pt-6 bottom-3 md:bottom-5 left-0 right-0 text-xs text-center"
									>
										Detective Mina was drawn by{" "}
										<Link
											href="https://twitter.com/DIVAOFDESPAlR"
											target="_blank"
											className="text-link-external"
										>
											Layer (@DIVAOFDESPAlR)
										</Link>
										.
									</a.p>
								</>
							) : (
								<>
									<a.div
										style={styles}
										className="flex flex-col items-center md:items-start md:flex-grow text-center md:text-left h-max"
									>
										<div className="pb-6">
											<h1>
												Sie hat überall gesucht<span className="text-green">.</span>
											</h1>
											<p className="md:text-lg">
												Hier gibt es keine Seite. Vielleicht wurde sie verschoben, oder es gab
												sie nie. So ist das manchmal.
											</p>
										</div>
										<Link href="/" className="w-fit">
											<Button color="green">
												Zur Startseite
												<Home />
											</Button>
										</Link>
									</a.div>
									<a.p
										style={styles}
										className="md:absolute pt-6 bottom-3 md:bottom-5 left-0 right-0 text-xs text-center"
									>
										Detektiv Mina wurde von{" "}
										<Link
											href="https://twitter.com/DIVAOFDESPAlR"
											target="_blank"
											className="text-link-external"
										>
											Layer (@DIVAOFDESPAlR)
										</Link>{" "}
										gezeichnet.
									</a.p>
								</>
							)
						)}
					</a.div>
				</main>
			</body>
		</html>
	);
}
