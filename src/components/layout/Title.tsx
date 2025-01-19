"use client";
import * as m from "motion/react-client";
import { PropsWithChildren, ReactNode, useEffect } from "react";
import { useNavbar } from "./navigation/NavBarContext";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Title(
	props: PropsWithChildren<{
		title: string;
		description: string | ReactNode;
		accentColor?: string;
		noDelay?: boolean;
		creditName?: string;
		creditLink?: string;
	}>
) {
	const t = useTranslations("COMMON");
	const { setShowNavbarGradient } = useNavbar();
	useEffect(() => {
		setShowNavbarGradient(!!props.children);
		return () => setShowNavbarGradient(false);
	}, [props.children, setShowNavbarGradient]);
	return (
		<div
			className={`relative w-screen ${
				props.children ? "h-1/2-screen min-h-max xl:h-2/3-screen" : "h-max"
			} overflow-hidden text-balance`}
		>
			{props.children && (
				<m.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { duration: 0.3, delay: 0.2 },
					}}
					className="absolute -z-10 inset-0"
				>
					<div className="absolute w-full h-full">{props.children}</div>
				</m.div>
			)}
			<div className="w-full h-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
				<div className="h-full w-full md:grid grid-cols-2 border-x border-white/5 light:border-black/5">
					<div className="relative size-full flex flex-col gap-6 xl:justify-center col-span-2 md:col-span-1 xl:border-r border-white/5 light:border-black/5 py-20 lg:py-32">
						<div className={props.children ? "drop-shadow-md" : ""}>
							<h1
								className={`relative pb-1 md:pb-3 font-serif ${props.children && "light:text-neutral-950"}`}
								aria-label={props.title}
							>
								{String(props.title)
									.split(/(\s+)/)
									.map((word, index, array) => (
										<m.div
											aria-hidden
											key={index}
											initial={{ opacity: 0, filter: "blur(5px)", y: 20 }}
											animate={{
												opacity: 1,
												filter: "blur(0px)",
												y: 0,
												transition: {
													type: "spring",
													bounce: 0,
													delay: index / 40 + (props.children ? 0.5 : 0.25),
													duration: 0.75,
												},
											}}
											className="inline-block"
										>
											{word.replace(" ", "\xa0")}
											{index + 1 === array.length && <span className="text-green">.</span>}
										</m.div>
									))}
							</h1>
							<m.p
								initial={{ opacity: 0, y: 40 }}
								animate={{
									opacity: 1,
									y: 0,
									transition: {
										type: "spring",
										bounce: 0,
										duration: 0.75,
										delay: props.children ? 0.6 : 0.35,
									},
								}}
								className={`text-xl md:text-2xl xl:text-3xl ${props.children && "light:text-neutral-950/75"}`}
							>
								{props.description}
							</m.p>
						</div>
						{props.children && props.creditName ? (
							props.creditLink ? (
								<Link
									href={props.creditLink}
									target="_blank"
									rel="noopener noreferrer"
									className="absolute bottom-0 border-t border-r border-neutral-50/5"
								>
									<button className="inline-flex p-0.5 items-center gap-1 text-xs md:text-sm hover:px-3 py-2 font-medium hover:font-bold text-neutral-50 light:text-neutral-950 hover:text-neutral-950 disabled:text-neutral-500 hover:bg-neutral-50 active:bg-neutral-100 drop-shadow-md active:drop-shadow-none duration-100 active:duration-75 active:shadow-inner overflow-hidden">
										{t("artDrawnBy")}
										{props.creditName}
									</button>
								</Link>
							) : (
								<div className="absolute bottom-0 border-t border-r border-neutral-50/5">
									{t("artDrawnBy")}
									{props.creditName}
								</div>
							)
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}
