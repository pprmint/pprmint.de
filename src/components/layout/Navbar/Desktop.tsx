"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link, locales, usePathname } from "src/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import { Pages, Projects } from "./Links";
import Copyright from "./Copyright";
import { JSXElementConstructor, ReactElement, ReactNodeArray } from "react";

const Caret = (
	<i
		className="ri-arrow-down-s-line inline text-neutral-50/80 group-data-[state='open']/root:rotate-180 group-hover/root:text-neutral-50 group-data-[state='open']/root:text-neutral-50 duration-250 ease-out ml-auto"
		aria-hidden
	/>
);

export default function DesktopNavigation() {
	const t = useTranslations("NAVIGATION");

	const pathname = usePathname();
	const locale = useLocale();
	const otherLocale = locales?.find((cur) => cur !== locale);

	// Styles
	const NavMenuTrigger =
		"group/root flex items-center gap-3 h-10 px-4 text-neutral-50/80 hover:text-neutral-50 data-[state='open']:text-neutral-50 duration-250 font-medium rounded-lg drop-shadow-md";
	const NavMenuContent =
		"absolute top-0 left-0 p-3 duration-250 data-[motion='from-start']:animate-enter-from-l data-[motion='from-end']:animate-enter-from-r data-[motion='to-start']:animate-exit-to-l data-[motion='to-end']:animate-exit-to-r";
	const NavMenuViewport =
		"relative origin-top-left w-[--radix-navigation-menu-viewport-width] overflow-hidden backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 text-neutral rounded-xl shadow-[0_6px_22px_#11111166] h-[--radix-navigation-menu-viewport-height] duration-250 ease-out data-[state='open']:animate-enter-from-t data-[state='closed']:animate-exit-to-t";

	function MenuItem(
		props: React.PropsWithChildren<{
			href: string;
			title: string;
			description: string | ReactElement<any, string | JSXElementConstructor<any>> | ReactNodeArray;
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
									description={t.rich("Path.Other.Privacy.description", {
										s: (chunks) => <span className="text-xs opacity-20">{chunks}</span>,
									})}
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
							<Copyright className="pl-3 pt-1 items-center" />
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
