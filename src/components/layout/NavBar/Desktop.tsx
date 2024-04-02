"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link, locales, usePathname } from "src/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";

import { Pages, Works } from "./Links";
import Copyright from "./Copyright";
import { JSXElementConstructor, ReactElement, ReactNodeArray } from "react";

const Caret = (
	<ChevronDown
		size={16}
		strokeWidth={3}
		className="group-data-[state='open']/root:translate-y-0.5 duration-250 ease-out ml-auto"
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
		"group/root flex items-center gap-3 h-10 px-4 text-neutral-50/80 hover:text-neutral-50 data-[state='open']:text-neutral-50 data-[state='open']:backdrop-blur-md duration-250 font-medium rounded-lg";
	const NavMenuContent =
		"absolute top-0 left-0 p-3 duration-250 data-[motion='from-start']:animate-enter-from-l data-[motion='from-end']:animate-enter-from-r data-[motion='to-start']:animate-exit-to-l data-[motion='to-end']:animate-exit-to-r";
	const NavMenuViewport =
		"relative origin-top-left w-[--radix-navigation-menu-viewport-width] overflow-hidden backdrop-blur-xl bg-gradient-to-b from-[#282828bb] to-[#222222aa] border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 text-neutral rounded-xl shadow-[0_6px_22px_#11111166] h-[--radix-navigation-menu-viewport-height] duration-250 ease-out data-[state='open']:animate-enter-from-t data-[state='closed']:animate-exit-to-t";

	return (
		<>
			<NavigationMenu.Root className="relative flex justify-center" delayDuration={0}>
				<NavigationMenu.List className="flex py-3 pr-6">
					<NavigationMenu.Item>
						<NavigationMenu.Trigger className={NavMenuTrigger}>
							<span className="inline-flex items-center gap-3 drop-shadow-[0px_2px_12px_#111a]">
								{t("Path.General.title")}
								{Caret}
							</span>
						</NavigationMenu.Trigger>

						<NavigationMenu.Content className={`${NavMenuContent} w-[500px] lg:w-[600px]`}>
							<ul className="grid gap-1 grid-flow-row grid-cols-2">
								{Pages.map((Page) => (
									<li key={Page.link}>
										<NavigationMenu.Link
											asChild
											className={`group block px-3 py-2.5 rounded-lg hover:bg-neutral-50/10 active:shadow-inner duration-250 ease-out active:duration-75 ${
												pathname === Page.link &&
												"bg-gradient-to-b from-neutral-950/30 to-neutral-950/15 shadow-inner pointer-events-none"
											}`}
										>
											<Link href={Page.link}>
												<span className="text-neutral-50 font-display font-semibold text-xl pb-0.5">
													{t(`Path.General.${Page.strings}.title`)}
												</span>
												<p className="ListItemText">{t(`Path.General.${Page.strings}.description`)}</p>
											</Link>
										</NavigationMenu.Link>
									</li>
								))}
							</ul>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Item>
						<NavigationMenu.Trigger className={NavMenuTrigger}>
							<span className="inline-flex items-center gap-3 drop-shadow-[0px_2px_12px_#111a]">
								{t("Path.Works.title")}
								{Caret}
							</span>
						</NavigationMenu.Trigger>

						<NavigationMenu.Content className={`${NavMenuContent} w-[500px] lg:w-[600px]`}>
							<ul className="grid gap-1 grid-cols-2 grid-flow-row">
								{Works.map((Work) => (
									<li key={Work.link}>
										<NavigationMenu.Link
											asChild
											className={`group block px-3 py-2.5 rounded-lg hover:bg-neutral-50/10 active:shadow-inner duration-250 ease-out active:duration-75 ${
												pathname === Work.link &&
												"bg-gradient-to-b from-neutral-950/30 to-neutral-950/15 shadow-inner pointer-events-none"
											}`}
										>
											<Link href={Work.link}>
												<span className="text-neutral-50 font-display font-semibold text-xl pb-0.5">
													{t(`Path.Works.${Work.strings}.title`)}
												</span>
												<p className="ListItemText">{t(`Path.Works.${Work.strings}.description`)}</p>
											</Link>
										</NavigationMenu.Link>
									</li>
								))}
							</ul>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
					<NavigationMenu.Item>
						<NavigationMenu.Trigger className={NavMenuTrigger}>
							<span className="inline-flex items-center gap-3 drop-shadow-[0px_2px_12px_#111a]">
								{t("Path.Other.title")}
								{Caret}
							</span>
						</NavigationMenu.Trigger>
						<NavigationMenu.Content className={`${NavMenuContent} w-[400px] lg:w-[500px]`}>
							<ul className="grid gap-1 grid-flow-row">
								<li>
									<NavigationMenu.Link
										asChild
										className={`group block px-3 py-2.5 rounded-lg hover:bg-neutral-50/10 active:shadow-inner duration-250 ease-out active:duration-75 ${
											pathname === "/privacy" &&
											"bg-gradient-to-b from-neutral-950/30 to-neutral-950/15 shadow-inner pointer-events-none"
										}`}
									>
										<Link href="/privacy">
											<span className="text-neutral-50 font-display font-semibold text-xl pb-0.5">
												{t("Path.Other.Privacy.title")}
											</span>
											<p className="ListItemText">
												{t.rich("Path.Other.Privacy.description", {
													s: (chunks) => <span className="text-xs opacity-20">{chunks}</span>,
												})}
											</p>
										</Link>
									</NavigationMenu.Link>
								</li>
								<li>
									<NavigationMenu.Link
										asChild
										className="group block px-3 py-2.5 rounded-lg hover:bg-neutral-50/10 active:shadow-inner duration-250 ease-out active:duration-75"
									>
										<Link href="https://potato.pprmint.art">
											<span className="text-neutral-50 font-display font-semibold text-xl pb-0.5">
												{t("Path.Other.Potato.title")}
											</span>
											<p className="ListItemText">{t("Path.Other.Potato.description")}</p>
										</Link>
									</NavigationMenu.Link>
								</li>
								<li>
									<NavigationMenu.Link
										asChild
										className="group block px-3 py-2.5 rounded-lg hover:bg-neutral-50/10 active:shadow-inner duration-250 ease-out active:duration-75"
									>
										<Link href={pathname} locale={otherLocale} scroll={false}>
											<span className="text-neutral-50 font-display font-semibold text-xl pb-0.5">
												{t("Path.Other.SwitchLocale.title")}
											</span>
											<p className="ListItemText">{t("Path.Other.SwitchLocale.description")}</p>
										</Link>
									</NavigationMenu.Link>
								</li>
							</ul>
							<Copyright className="pl-3 pt-1 items-center" />
						</NavigationMenu.Content>
					</NavigationMenu.Item>
					<NavigationMenu.Indicator className="flex items-end justify-center h-3 top-12 -z-10 duration-250 ease-out data-[state='visible']:animate-fade-in data-[state='hidden']:animate-fade-out">
						<div className="relative bg-neutral-900/75 shadow-inner -top-2 w-full h-10 rounded-lg duration-250" />
					</NavigationMenu.Indicator>
				</NavigationMenu.List>
				<div className="absolute flex justify-center top-[63px] right-6" style={{ perspective: 2000 }}>
					<NavigationMenu.Viewport className={NavMenuViewport} />
				</div>
			</NavigationMenu.Root>
		</>
	);
}
