"use client";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition, a, easings } from "@react-spring/web";
import * as Portal from "@radix-ui/react-portal";
import { Link, locales, usePathname } from "src/navigation";
import Copyright from "./Socials";

import { Pages, Projects } from "./Links";
import ChevronRight from "src/icons/ChevronRight";

export default function MobileNavigation() {
	const t = useTranslations("NAVIGATION");

	// Opening and closing logic
	const [navOpen, setNavOpen] = useState(false);
	const transitions = useTransition(navOpen, {
		from: { opacity: 0, y: -20 },
		enter: {
			opacity: 1,
			y: 0,
			config: {
				duration: 400,
				easing: easings.easeOutExpo,
			},
		},
		leave: {
			opacity: 0,
			y: -20,
			config: {
				duration: 300,
				easing: easings.easeInCubic,
			},
		},
	});
	const handleOpen = () => {
		setNavOpen(true);
		document.body.classList.add("overflow-hidden");
	};
	const handleClose = () => {
		setNavOpen(false);
		document.body.classList.remove("overflow-hidden");
	};
	const toggleOpen = navOpen ? handleClose : handleOpen;
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	// Language switch
	const pathname = usePathname();
	const locale = useLocale();
	const otherLocale = locales?.find((cur) => cur !== locale);

	return (
		<>
			<button
				className="relative m-3 text-neutral-50 text-xl size-[39px] rounded-full hover:bg-neutral-50/10 duration-100"
				onClick={toggleOpen}
			>
				<svg
					width="39"
					height="39"
					xmlns="http://www.w3.org/2000/svg"
					className="absolute left-0 top-0 stroke-neutral-50 stroke-1 fill-none"
					strokeLinecap="butt"
				>
					<path
						d={navOpen ? "M12.5,12.5 19.5,19.5 26.5,12.5" : "M12,12.5 19.5,12.5 27,12.5"}
						className="duration-400 ease-out-quint"
					/>
					<path
						d={navOpen ? "M19.5,19.5 19.5,19.5" : "M12,19.5 27,19.5"}
						className="duration-400 ease-out-quint"
					/>
					<path
						d={navOpen ? "M12.5,26.5 19.5,19.5 26.5,26.5" : "M12,26.5 19.5,26.5 27,26.5"}
						className="duration-400 ease-out-quint"
					/>
				</svg>
			</button>
			{transitions((styles, item) =>
				item ? (
					<Portal.Root>
						<a.div
							className="fixed inset-0 bg-neutral-950 z-80"
							style={{
								opacity: styles.opacity,
							}}
						>
							{/* Main container */}
							<a.div className="px-3 w-full h-full pb-3 pt-20 overflow-auto z-80" style={styles}>
								<div className="my-9">
									<p className="pl-3 font-display text-neutral-50 font-semibold text-2xl">{t("Path.General.title")}</p>
									<ul>
										{Pages.map((Page) => (
											<Link className="group" key={Page.link} href={Page.link} onClick={handleClose}>
												<li
													className={`flex items-center ${
														Page.link === pathname
															? "text-neutral-50"
															: "hover:text-neutral-50 group-hover:bg-neutral-50/10 group-active:opacity-75"
													} px-3 py-1.5 w-full duration-100 rounded-[17px]`}
												>
													{Page.link === pathname && <ChevronRight className="inline fill-green mr-1.5" />}
													{t(`Path.General.${Page.strings}.title`)}
												</li>
											</Link>
										))}
									</ul>
								</div>
								<div className="my-9">
									<p className="pl-3 font-display text-neutral-50 font-semibold text-2xl">{t("Path.Works.title")}</p>
									<ul>
										<Link className="group" href="/gallery" onClick={handleClose}>
											<li
												className={`flex items-center ${
													"/gallery" === pathname
														? "text-neutral-50"
														: "hover:text-neutral-50 group-hover:bg-neutral-50/10 group-active:opacity-75"
												} px-3 py-1.5 w-full duration-100 rounded-[17px]`}
											>
												{"/gallery" === pathname && <ChevronRight className="inline fill-green mr-1.5" />}
												<div className="flex flex-col">
													<span>{t(`Path.Works.Gallery.title`)}</span>
													<span className="text-xs opacity-50">{t(`Path.Works.Gallery.description`)}</span>
												</div>
											</li>
										</Link>
										{Projects.map((Project) => (
											<Link className="group" key={Project.link} href={Project.link} onClick={handleClose}>
												<li
													className={`flex items-center ${
														Project.link === pathname
															? "text-neutral-50"
															: "hover:text-neutral-50 group-hover:bg-neutral-50/10 group-active:opacity-75"
													} px-3 py-1.5 w-full duration-100 rounded-[17px]`}
												>
													{Project.link === pathname && <ChevronRight className="inline fill-green mr-1.5" />}
													<div className="flex flex-col">
														<span>{t(`Path.Works.Projects.${Project.strings}.title`)}</span>
														<span className="text-xs opacity-50">{t(`Path.Works.Projects.${Project.strings}.description`)}</span>
													</div>
												</li>
											</Link>
										))}
											<Link className="group" href="/projects" onClick={handleClose}>
												<li
													className={`flex items-center ${
														"/projects" === pathname
															? "text-neutral-50"
															: "hover:text-neutral-50 group-hover:bg-neutral-50/10 group-active:opacity-75"
													} px-3 py-1.5 w-full duration-100 rounded-[17px]`}
												>
													{"/projects" === pathname && <ChevronRight className="inline fill-green mr-1.5" />}
													<div className="flex flex-col">
														<span>{t("Path.Works.Projects.More.title")}</span>
													</div>
												</li>
											</Link>
									</ul>
								</div>
								<div className="my-9">
									<p className="pl-3 font-display text-neutral-50 font-semibold text-2xl">{t("Path.Other.title")}</p>
									<ul>
										<Link className="group" href="/privacy" onClick={handleClose}>
											<li
												className={`flex items-center ${
													"/privacy" === pathname
														? "text-neutral-50"
														: "hover:text-neutral-50 group-hover:bg-neutral-50/10 group-active:opacity-75"
												} px-3 py-1.5 w-full duration-100 rounded-[17px]`}
											>
												{"/privacy" === pathname && <ChevronRight className="inline fill-green mr-1.5" />}
												{t("Path.Other.Privacy.title")}
											</li>
										</Link>
										<Link className="group" href={`https://potato.pprmint.art${pathname}`}>
											<li
												className={`flex items-center ${
													"/privacy" === pathname
														? "text-neutral-50"
														: "hover:text-neutral-50 group-hover:bg-neutral-50/10 group-active:opacity-75"
												} px-3 py-1.5 w-full duration-100 rounded-[17px]`}
											>
												<div className="flex flex-col">
													<span>{t("Path.Other.Potato.title")}</span>
													<span className="text-xs opacity-50">{t("Path.Other.Potato.description")}</span>
												</div>
											</li>
										</Link>
										<Link className="group" href={pathname} locale={otherLocale} scroll={false} onClick={handleClose}>
											<li className="flex items-center hover:text-neutral-50 group-hover:bg-neutral-50/10 group-active:opacity-75 px-3 py-1.5 w-full duration-100 rounded-[17px]">
												<div className="flex flex-col">
													<span>{t("Path.Other.SwitchLocale.title")}</span>
													<span className="text-xs opacity-50">{t("Path.Other.SwitchLocale.description")}</span>
												</div>
											</li>
										</Link>
									</ul>
								</div>
								<Copyright className="pl-3 items-center" />
							</a.div>
						</a.div>
					</Portal.Root>
				) : null
			)}
		</>
	);
}
