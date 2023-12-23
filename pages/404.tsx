import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { useSpring, a, config } from "@react-spring/web";
import Trans from "next-translate/Trans";
import { MouseParallaxChild, MouseParallaxContainer } from "react-parallax-mouse";

import Head from "components/Head";
import Button from "components/Button";

import DetectiveMina from "public/assets/404/mina_chibi.webp";

export default function NotFound() {
	const { t } = useTranslation();

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

	return (
		<>
			<Head title={t("404:Head.title")} description={t("404:Content.info")} color="#ff7722" />
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
						className="text-orange-700 font-display-mono font-light blur-sm lg:blur-lg w-full text-center -skew-y-6"
						style={{ fontSize: "50vw", ...fadeIn }}
					>
						{countUp.val.to((val) => Math.floor(val))}
					</a.div>
				</MouseParallaxChild>
				<div className="absolute flex items-center justify-center top-0 left-0 w-screen h-screen">
					<a.div
						style={{ ...ripple }}
						className="bg-orange-800 aspect-square h-screen md:h-auto md:w-screen rounded-full"
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
					className="z-10 flex flex-col md:flex-row-reverse justify-center items-center gap-3 md:gap-6 w-full max-w-7xl h-full mx-auto px-6 md:px-9"
					style={{ ...inFromBottom }}
				>
					<Image src={DetectiveMina} alt="Detective Mina chibi art, drawn by Layer." className="w-40 md:w-72 lg:w-80" />
					<div className="flex flex-col items-center md:items-start md:flex-grow text-center md:text-left h-max">
						<h1>
							{t("404:Content.title")}
							<span className="text-orange">.</span>
						</h1>
						<p className="md:text-lg pb-6">{t("404:Content.info")}</p>
						<Link href="/" className="w-fit">
							<Button color="orange">
								{t("404:Content.returnHome")}
								<i className="ri-home-2-line" />
							</Button>
						</Link>
					</div>
				</a.div>
			</MouseParallaxContainer>
			<p className="absolute pt-6 bottom-3 md:bottom-5 left-0 right-0 text-xs text-center">
				<Trans
					i18nKey="404:Content.credit"
					components={{
						Link: <Link href="https://twitter.com/108sketches" target="_blank" className="text-link-external" />,
					}}
				/>
			</p>
		</>
	);
}
