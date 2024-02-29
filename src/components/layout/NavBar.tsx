"use client";
import { useState, useEffect } from "react";
import { Link, usePathname, locales } from "src/navigation";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import useTranslation from "next-translate/useTranslation";
import { useTransition, a, easings } from "@react-spring/web";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Portal from "@radix-ui/react-portal";

import Wordmark from "public/assets/wordmark.svg";

// Array of available links
const Pages = [
	{
		link: "/",
		strings: "Home",
	},
	{
		link: "/mina",
		strings: "Mina",
	},
	{
		link: "/contact",
		strings: "Contact",
	},
];
const Projects = [
	{
		link: "/gallery",
		strings: "Gallery",
	},
	{
		link: "/projects/ytdg",
		strings: "YtDlpGui",
	},
	{
		link: "/projects/mintcraft",
		strings: "Mintcraft",
	},
	{
		link: "/projects/mintbit",
		strings: "Mintbit",
	},
	{
		link: "/projects/mintsans",
		strings: "Mintsans",
	},
	{
		link: "/projects/appicons",
		strings: "AppIcons",
	},
];

const Caret = (
	<i
		className="ri-arrow-down-s-line inline text-neutral-50/80 group-data-[state='open']/root:rotate-180 group-hover/root:text-neutral-50 group-data-[state='open']/root:text-neutral-50 duration-250 ease-out ml-auto"
		aria-hidden
	/>
);

function DesktopNavigation() {
	const t = useTranslations("NAVIGATION");

	const pathname = usePathname();
	const locale = useLocale();
	const otherLocale = locales?.find((cur) => cur !== locale);

	// Styles
	const NavMenuTrigger =
		"group/root flex items-center gap-3 h-10 px-4 text-neutral-50/80 hover:text-neutral-50 data-[state='open']:text-neutral-50 duration-250 font-medium rounded-lg";
	const NavMenuContent =
		"absolute top-0 left-0 p-3 duration-250 data-[motion='from-start']:animate-enter-from-l data-[motion='from-end']:animate-enter-from-r data-[motion='to-start']:animate-exit-to-l data-[motion='to-end']:animate-exit-to-r";
	const NavMenuViewport =
		"relative origin-top-left w-[--radix-navigation-menu-viewport-width] overflow-hidden backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 text-neutral rounded-xl shadow-[0_6px_22px_#11111166] h-[--radix-navigation-menu-viewport-height] duration-250 ease-out data-[state='open']:animate-enter-from-t data-[state='closed']:animate-exit-to-t";

	function MenuItem(
		props: React.PropsWithChildren<{
			href: string;
			title: string;
			description: string;
			locale?: string;
			disableHighlight?: boolean;
			scroll?: boolean;
		}>
	) {
		const highlight = !props.disableHighlight && props.href === pathname && "pointer-events-none";
		return (
			<li>
				<NavigationMenu.Link
					asChild
					className={`block p-3 rounded-lg hover:bg-neutral-50/10 duration-250 ease-out active:opacity-75 active:duration-75 ${highlight}`}
				>
					<Link href={props.href} locale={props.locale as "en" | "de" | undefined} scroll={props.scroll}>
						<span className="text-neutral-50 font-display font-semibold text-xl pb-0.5">
							{!props.disableHighlight && props.href === pathname && (
								<i className="ri-arrow-right-s-line font-normal text-green mr-1.5" />
							)}
							{props.title}
						</span>
						<p className="ListItemText">{props.description}</p>
					</Link>
				</NavigationMenu.Link>
			</li>
		);
	}

	return (
		<>
			<NavigationMenu.Root className="relative flex justify-center" delayDuration={0}>
				<NavigationMenu.List className="flex py-3 pr-6">
					<NavigationMenu.Item>
						<NavigationMenu.Trigger className={NavMenuTrigger}>
							{t("Path.General.title")}
							{Caret}
						</NavigationMenu.Trigger>

						<NavigationMenu.Content className={`${NavMenuContent} w-[500px] lg:w-[600px]`}>
							<ul className="grid grid-flow-row grid-cols-2">
								{Pages.map((Page) => (
									<MenuItem
										key={Page.link}
										href={Page.link}
										title={t(`Path.General.${Page.strings}.title`)}
										description={t(`Path.General.${Page.strings}.description`)}
									/>
								))}
							</ul>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Item>
						<NavigationMenu.Trigger className={NavMenuTrigger}>
							{t("Path.Projects.title")}
							{Caret}
						</NavigationMenu.Trigger>

						<NavigationMenu.Content className={`${NavMenuContent} w-[500px] lg:w-[600px]`}>
							<ul className="grid grid-cols-2 grid-flow-row">
								{Projects.map((Project) => (
									<MenuItem
										key={Project.link}
										href={Project.link}
										title={t(`Path.Projects.${Project.strings}.title`)}
										description={t(`Path.Projects.${Project.strings}.description`)}
									/>
								))}
							</ul>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Item>
						<NavigationMenu.Trigger className={NavMenuTrigger}>
							{t("Path.Other.title")}
							{Caret}
						</NavigationMenu.Trigger>

						<NavigationMenu.Content className={`${NavMenuContent} w-[400px] lg:w-[500px]`}>
							<ul className="grid grid-flow-row">
								<MenuItem
									title={t("Path.Other.Privacy.title")}
									description={t("Path.Other.Privacy.description")}
									href="/privacy"
								/>
								<MenuItem
									title={t("Path.Other.SwitchLocale.title")}
									description={t("Path.Other.SwitchLocale.description")}
									href={pathname}
									locale={otherLocale}
									disableHighlight
									scroll={false}
								/>
							</ul>
							<Footer className="pl-3 pt-1 items-center" />
						</NavigationMenu.Content>
					</NavigationMenu.Item>
					<NavigationMenu.Indicator className="flex items-end justify-center h-3 top-12 -z-10 transition-transform duration-250 ease-out data-[state='visible']:animate-fade-in data-[state='hidden']:animate-fade-out">
						<div className="relative bg-neutral-50/10 -top-2 w-full h-10 rounded-lg" />
					</NavigationMenu.Indicator>
				</NavigationMenu.List>
				<div className="absolute flex justify-center top-[63px] right-6" style={{ perspective: 2000 }}>
					<NavigationMenu.Viewport className={NavMenuViewport} />
				</div>
			</NavigationMenu.Root>
		</>
	);
}

function MobileNavigation() {
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
	const handleClose = async () => {
		await new Promise((r) => setTimeout(r, 100));
		setNavOpen(false);
		await new Promise((r) => setTimeout(r, 100));
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

	function ListItem(
		props: React.PropsWithChildren<{
			href: string;
			title: string;
			locale?: string;
			disableHighlight?: boolean;
		}>
	) {
		const highlight = !props.disableHighlight && props.href === pathname && "text-neutral-50";
		return (
			<Link href={props.href} locale={props.locale as "en" | "de" | undefined} onClick={handleClose}>
				<li
					className={`hover:text-neutral-50 hover:bg-neutral-50/10 active:opacity-75 px-3 py-1.5 w-full duration-100 rounded-full ${highlight}`}
				>
					{!props.disableHighlight && props.href === pathname && (
						<i className="ri-arrow-right-s-line font-normal text-green mr-1.5" />
					)}
					{props.title}
				</li>
			</Link>
		);
	}

	return (
		<>
			<button
				className="fixed top-3 right-3 text-neutral-50 text-xl w-10 h-10 rounded-full z-50 hover:bg-neutral-50/10 duration-100"
				onClick={toggleOpen}
			>
				<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" className="absolute left-0 top-0">
					<path
						d={navOpen ? "M14,14 20,20 26,14" : "M12,14 20,14 28,14"}
						fill="transparent"
						stroke="#eee"
						strokeWidth="2"
						className="duration-400 ease-out-quint"
					/>
					<path
						d={navOpen ? "M20,20 20,20" : "M12,20 28,20"}
						fill="transparent"
						stroke="#eee"
						strokeWidth="2"
						className="duration-400 ease-out-quint"
					/>
					<path
						d={navOpen ? "M14,26 20,20 26,26" : "M12,26 20,26 28,26"}
						fill="transparent"
						stroke="#eee"
						strokeWidth="2"
						className="duration-400 ease-out-quint"
					/>
				</svg>
			</button>
			{transitions((styles, item) =>
				item ? (
					<Portal.Root>
						<a.div
							className="fixed top-0 left-0 bg-neutral-950 w-screen h-screen z-40 pt-16"
							style={{
								opacity: styles.opacity,
							}}
						>
							{/* Main container */}
							<a.div className="px-3 w-full h-full py-6 overflow-auto text-neutral-500" style={styles}>
								<div className="pb-6">
									<p className="pl-3 pb-1 font-display text-neutral-50 font-semibold text-2xl">
										{t("Path.General.title")}
									</p>
									<ul>
										{Pages.map((Page) => (
											<ListItem
												key={Page.link}
												title={t(`Path.General.${Page.strings}.title`)}
												href={Page.link}
											/>
										))}
									</ul>
								</div>
								<div className="pb-6">
									<p className="pl-3 pb-1 font-display text-neutral-50 font-semibold text-2xl">
										{t("Path.Projects.title")}
									</p>
									<ul>
										{Projects.map((Project) => (
											<ListItem
												key={Project.link}
												title={t(`Path.Projects.${Project.strings}.title`)}
												href={Project.link}
											/>
										))}
									</ul>
								</div>
								<div className="pb-6">
									<p className="pl-3 pb-1 font-display text-neutral-50 font-semibold text-2xl">
										{t("Path.Other.title")}
									</p>
									<ul>
										<ListItem href="/privacy" title={t("Path.Other.Privacy.title")} />
										<ListItem
											href={pathname}
											locale={otherLocale}
											title={t("Path.Other.SwitchLocale.title")}
											disableHighlight
										/>
									</ul>
								</div>
								<Footer className="pl-3" />
							</a.div>
						</a.div>
					</Portal.Root>
				) : null
			)}
		</>
	);
}

function Footer(props: { className?: string }) {
	const t = useTranslations("NAVIGATION");
	return (
		<div className={`flex flex-row ${props.className}`}>
			<div className="text-neutral text-xs">
				<p className="leading-4">
					{t("madeWith")}
					<i className="ri-heart-line mx-1 text-red" />
					{t("and")}
					<Link
						href="https://github.com/pprmint/pprmint.art/blob/main/package.json"
						target="_blank"
						rel="noopener noreferrer"
					>
						<i className="ri-cup-line mx-1 text-yellow" />
					</Link>
					<br />
					{"© "}
					{new Date().getFullYear()} pprmint.
				</p>
			</div>
			<div className="flex text-neutral-50 md:text-xl ml-auto">
				<Link
					href="https://twitter.com/npprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-250 ease-out active:opacity-75 active:duration-75"
				>
					<i className="ri-twitter-line" />
				</Link>
				<Link
					href="https://youtube.com/@pprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-250 ease-out active:opacity-75 active:duration-75"
				>
					<i className="ri-youtube-line" />
				</Link>
				<Link
					href="https://github.com/pprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-250 ease-out active:opacity-75 active:duration-75"
				>
					<i className="ri-github-line" />
				</Link>
				<Link
					href="https://ko-fi.com/pprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-250 ease-out active:opacity-75 active:duration-75"
				>
					<i className="ri-cup-line" />
				</Link>
			</div>
		</div>
	);
}

// Container for it all
export default function NavBar() {
	// Hide navbar background on scroll
	const [navBackground, setNavBackground] = useState(true);
	const hideNavBackground = () => {
		if (window.scrollY >= 1) {
			setNavBackground(false);
		} else {
			setNavBackground(true);
		}
	};
	useEffect(() => {
		hideNavBackground();
		window.addEventListener("scroll", hideNavBackground);
	});

	return (
		<div
			className={`z-50 fixed w-full h-16 flex items-start ${
				!navBackground && "shadow-[0_6px_22px_#11111166]"
			} duration-300`}
		>
			<div
				className={`absolute z-0 inset-0 border-b ${
					navBackground
						? "ease-out border-transparent"
						: "linear border-neutral-50/10 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[91.5%]"
				} duration-300`}
			/>
			<Link href="/" className="z-50 pl-3 md:pl-6 my-auto mr-auto">
				<Image src={Wordmark} alt="pprmint. logo" className="h-9 w-[184px] mt-1" />
			</Link>
			<div className="hidden z-50 md:flex">
				<DesktopNavigation />
			</div>
			<div className="block z-50 md:hidden">
				<MobileNavigation />
			</div>
		</div>
	);
}
