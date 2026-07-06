"use client";
import * as m from "motion/react-m";
import { Fragment, PropsWithChildren, ReactNode, Ref, useEffect } from "react";
import { useNavbar } from "./navigation/NavBarContext";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Title(
	props: PropsWithChildren<{
		title: string;
		description: string | ReactNode;
		credits?: {
			name: string;
			link?: string;
		}[];
		noAccents?: boolean;
		blackText?: boolean;
		ref?: Ref<HTMLDivElement>;
	}>,
) {
	const t = useTranslations("COMMON");
	const { setDefaultColor, setNoAccents } = useNavbar();
	useEffect(() => {
		setDefaultColor(props.blackText ? "black" : props.children ? "white" : undefined);
		setNoAccents(!!props.noAccents);
		return () => setDefaultColor();
	}, [props.children, props.noAccents, setDefaultColor, setNoAccents]);
	return (
		<div
			ref={props.ref}
			className={`relative w-full ${props.children ? "dark xl:h-[700px] pb-px" : ""} overflow-hidden text-balance`}
		>
			{props.children && <div className="absolute -z-10 inset-0">{props.children}</div>}
			{props.children && <div className="absolute bottom-0 inset-x-0 h-px bg-current/5" />}
			<div className="w-full h-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
				<div
					className={`h-full w-full border-x ${props.blackText ? "text-neutral-950" : "text-white"} ${props.children ? "border-current/5" : "border-black/5 dark:border-white/5"}`}
				>
					<div className="relative size-full flex flex-col gap-6 xl:justify-center col-span-2 md:col-span-1 pt-18 pb-32 md:py-28 lg:py-32 xl:py-40">
						<div className={props.children && !props.blackText ? "drop-shadow-md" : ""}>
							<m.h1
								className={`relative pb-1 md:pb-2 lg:pb-3 font-serif ${props.children ? "text-inherit" : ""}`}
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
								<span className={props.noAccents ? "text-inherit" : "text-green"}>.</span>
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
								className={`text-xl md:text-2xl xl:text-3xl ${props.blackText ? "text-neutral-950/75" : "text-white/75"} ${props.children ? "max-w-60" : ""} sm:max-w-none`}
							>
								{props.description}
							</m.p>
						</div>
						{props.children && props.credits && (
							<div className="bg-current/5 backdrop-blur-sm absolute bottom-0 left-0 text-xs px-2 py-1">
								{t("artDrawnBy")}
								{props.credits.map((artist, index) => (
									<Fragment key={index}>
										{artist.link ? (
											<Link
												href={artist.link}
												target="_blank"
												rel="noopener noreferrer"
												className="text-link text-current decoration-current/50 hover:decoration-current"
											>
												{artist.name}
											</Link>
										) : (
											<span>{artist.name}</span>
										)}
										{index !== props.credits!.length - 1 && (index < props.credits!.length - 2 ? ", " : " & ")}
									</Fragment>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
