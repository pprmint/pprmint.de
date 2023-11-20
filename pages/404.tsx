import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useTranslation from "next-translate/useTranslation";
import { useSpring, a, config } from "@react-spring/web";
import Marquee from "react-fast-marquee";

import Head from "components/Head";
import Button from "components/Button";
import NoSSR from "components/NoSSR";
import {
	MouseParallaxChild,
	MouseParallaxContainer,
} from "react-parallax-mouse";

export default function NotFound() {
	const { t } = useTranslation();
	const path = usePathname();

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
	});
	const fadeIn = useSpring({
		from: { opacity: 0 },
		to: { opacity: 0.75 },
	});
	const countUp = useSpring({
		from: { val: 100 },
		to: { val: 404 },
		config: {
			tension: 150,
			friction: 40,
		},
	});
	const ripple = useSpring({
		from: { opacity: 0.75, scale: 0 },
		to: { opacity: 0, scale: 1.5 },
		delay: 1700,
		config: {
			mass: 3,
			friction: 100,
		},
	});

	// Random text
	function DBWagenreihung(max: number) {
		return Math.floor(Math.random() * max);
	}
	const Wagenreihung = DBWagenreihung(15);
	const errors = [
		"HTTP/1.1 404 Not Found",
		`${path}: command not found`,
		"lp0 on fire",
		"Bad command or file name",
		"F0 0F C7 C8",
		"77 68 6f 6f 70 73",
		"01001100",
		"┐(￣ヘ￣;)┌",
		"JS LOAD ERROR",
		"Sorry, but our page is in another website!",
		"Please insert a disc.",
		"Whoopsies.",
		"Quick, Stanley, close your eyes!",
		<Marquee
			key={"theend"}
			speed={100}
			gradient
			gradientColor="#111"
			gradientWidth="10vw"
			style={{ overflow: "hidden" }}
		>
			HE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER T
		</Marquee>,
		"Okay, yep, it's worse.",
	];

	return (
		<>
			<Head
				title={t("404:Head.title")}
				description={t("404:Content.info")}
				color="#ff3344"
			/>
			<MouseParallaxContainer
				containerStyle={{ width: "100vw", height: "100vh" }}
				springConfig={config.gentle}
				resetOnLeave
			>
				<MouseParallaxChild
					factorX={-0.05}
					factorY={-0.05}
					style={{
						display: "flex",
						alignItems: "center",
						position: "absolute",
						width: "100%",
						height: "100vh",
					}}
				>
					<a.div
						className="text-red-700 font-display-mono font-light blur-sm lg:blur-lg w-full text-center"
						style={{ fontSize: "50vw", ...fadeIn }}
					>
						{countUp.val.to((val) => Math.floor(val))}
					</a.div>
				</MouseParallaxChild>
				<div className="absolute flex items-center justify-center top-0 left-0 w-screen h-screen">
					<a.div
						style={{ ...ripple }}
						className="bg-red-800 aspect-square h-screen md:h-auto md:w-screen rounded-full"
					/>
				</div>
				<div
					className="absolute w-full h-full top-0 left-0"
					style={{
						backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyIj48cGF0aCBkPSJNMTYgMHYxNkgwVjBoMTZaTTggNmEyIDIgMCAxIDAgLjAwMSA0LjAwMUEyIDIgMCAwIDAgOCA2WiIgc3R5bGU9ImZpbGw6IzExMSIvPjwvc3ZnPg==)",
						backgroundRepeat: "repeat",
					}}
				/>
				<a.div
					className="absolute z-10 flex w-screen h-screen justify-center items-center flex-col px-6 md:px-9"
					style={{ ...inFromBottom }}
				>
					<NoSSR>
						<h1 className="font-display-mono text-red text-2xl md:text-5xl lg:text-7xl pb-6 text-center">
							{errors[Wagenreihung]}
						</h1>
					</NoSSR>
					<h3 className="font-sans text-neutral md:text-2xl text-center pb-6">
						{t("404:Content.info")}
					</h3>
					<Link href="/" scroll={false}>
						<Button color="red">
							{t("404:Content.returnHome")}
							<i className="ri-home-2-line" />
						</Button>
					</Link>
				</a.div>
			</MouseParallaxContainer>
		</>
	);
}
