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
						backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><path d="M0 10V0h10a2 2 0 0 0 4 0h10v10a2 2 0 0 0 0 4v10H14a2 2 0 0 0-4 0H0V14a2 2 0 0 0 0-4Z" style="fill:%23111"/></svg>')`,
						backgroundRepeat: "repeat",
					}}
				/>
				<a.div
					className="absolute z-10 flex w-screen h-screen justify-center items-center flex-col px-6 md:px-9"
					style={{ ...inFromBottom }}
				>
					<NoSSR>
						<h1 className="font-display-mono text-red pb-6 text-center">
							{errors[Wagenreihung]}
						</h1>
					</NoSSR>
					<p className="text-neutral-50 md:text-lg pb-6">
						{t("404:Content.info")}
					</p>
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
