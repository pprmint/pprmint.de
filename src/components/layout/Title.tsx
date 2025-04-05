"use client";
import * as m from "motion/react-m";
import { PropsWithChildren, ReactNode, useEffect } from "react";
import { useNavbar } from "./navigation/NavBarContext";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Button from "../ui/Button";

export default function Title(
	props: PropsWithChildren<{
		title: string;
		description: string | ReactNode;
		creditName?: string;
		creditLink?: string;
		noAccents?: boolean;
	}>
) {
	const t = useTranslations("COMMON");
	const { setInverted, setNoAccents } = useNavbar();
	useEffect(() => {
		setInverted(!!props.children);
		setNoAccents(!!props.noAccents);
		return () => setInverted(false);
	}, [props.children, props.noAccents, setInverted, setNoAccents]);
	return (
		<div
			className={`relative w-full ${props.children && "dark xl:h-[700px] pb-px"} overflow-hidden text-balance`}
		>
			{props.children && <div className="absolute -z-10 inset-0">{props.children}</div>}
			{props.children && <div className="absolute bottom-0 inset-x-0 h-px bg-black/5 dark:bg-white/5"/>}
			<div className="w-full h-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
				<div className={`h-full w-full border-x ${props.children ? "border-white/5" : "border-black/5 dark:border-white/5"}`}>
					<div className="relative size-full flex flex-col gap-6 xl:justify-center col-span-2 md:col-span-1 pt-28 pb-20 md:py-28 lg:py-32 xl:py-40">
						<div className={props.children ? "drop-shadow-md" : ""}>
							<m.h1
								className={`relative pb-1 md:pb-2 lg:pb-3 font-serif ${props.children && "text-white"}`}
								initial={{ opacity: 0, filter: "blur(5px)", y: 20 }}
								animate={{
									opacity: 1,
									filter: "blur(0px)",
									y: 0,
									transition: {
										type: "spring",
										bounce: 0,
										delay: props.children ? 0.2 : 0,
										duration: 0.75,
									},
								}}
							>
								{props.title}
								<span className={props.noAccents ? "text-white" : "text-green"}>.</span>
							</m.h1>
							<m.p
								initial={{ opacity: 0, y: 40 }}
								animate={{
									opacity: 1,
									y: 0,
									transition: {
										type: "spring",
										bounce: 0,
										duration: 0.75,
										delay: props.children ? 0.25 : 0.05,
									},
								}}
								className={`text-xl md:text-2xl xl:text-3xl ${props.children && "text-white/75 max-w-60"} sm:max-w-none`}
							>
								{props.description}
							</m.p>
						</div>
						{props.children && props.creditName ? (
							props.creditLink ? (
								<Link href={props.creditLink} target="_blank" rel="noopener noreferrer" className="absolute bottom-0 text-sm">
									<Button design="semi-transparent">
										{t("artDrawnBy")}
										{props.creditName}
									</Button>
								</Link>
							) : (
								<div className="absolute bottom-0 bg-white/5">
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
