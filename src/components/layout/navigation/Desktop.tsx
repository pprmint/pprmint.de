"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Pages, Projects } from "./Links";
import Copyright from "./Socials";
import ChevronDown from "src/icons/ChevronDown";
import { usePathname } from "next/navigation";

const Caret = (
	<ChevronDown className="group-data-[state='open']/root:translate-y-0.5 duration-100 ease-out ml-auto" aria-hidden />
);

export default function DesktopNavigation() {
	const t = useTranslations("NAVIGATION");
	const pathname = usePathname();
	// Styles
	const NavMenuTrigger =
		"group/root flex items-center gap-3 h-16 px-4 opacity-80 data-[state='open']:opacity-100 duration-100 rounded-lg animate-nav-enter";
	const NavMenuContent =
		"absolute top-0 left-0 p-3 duration-250 data-[motion='from-start']:animate-enter-from-l data-[motion='from-end']:animate-enter-from-r data-[motion='to-start']:animate-exit-to-l data-[motion='to-end']:animate-exit-to-r";
	return (
		<>
			<NavigationMenu.Root className="relative flex justify-center items-center" delayDuration={0}>
				<NavigationMenu.List className="flex">
					<NavigationMenu.Item>
						<NavigationMenu.Trigger className={NavMenuTrigger} style={{ animationDelay: ".25s" }}>
							<span className="inline-flex items-center gap-3">
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
											className={`group block px-3 py-2.5 rounded-lg hover:bg-neutral-50/5 active:scale-[0.98] active:opacity-75 duration-150 ease-out active:duration-75 ${
												pathname === Page.link &&
												"bg-neutral-50/10 pointer-events-none"
											}`}
										>
											<Link href={Page.link}>
												<span className="text-neutral-50  text-xl pb-0.5">
													{t(`Path.General.${Page.strings}.title`)}
												</span>
												<p className="ListItemText">
													{t(`Path.General.${Page.strings}.description`)}
												</p>
											</Link>
										</NavigationMenu.Link>
									</li>
								))}
							</ul>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
					<NavigationMenu.Item>
						<NavigationMenu.Trigger className={NavMenuTrigger} style={{ animationDelay: ".3s" }}>
							<span className="inline-flex items-center gap-3">
								{t("Path.Work.title")}
								{Caret}
							</span>
						</NavigationMenu.Trigger>
						<NavigationMenu.Content className={`${NavMenuContent} w-[500px] lg:w-[600px]`}>
							<ul className="grid gap-1 grid-cols-2 grid-flow-row">
								<li>
									<NavigationMenu.Link
										asChild
										className={`group block px-3 py-2.5 rounded-lg hover:bg-neutral-50/5 active:scale-[0.98] active:opacity-75 duration-150 ease-out active:duration-75 ${
											pathname === "/graphics" &&
											"bg-neutral-50/10 pointer-events-none"
										}`}
									>
										<Link href="/graphics">
											<span className="text-neutral-50  text-xl pb-0.5">
												{t(`Path.Work.Graphics.title`)}
											</span>
											<p className="ListItemText">{t(`Path.Work.Graphics.description`)}</p>
										</Link>
									</NavigationMenu.Link>
								</li>
								<li>
									<NavigationMenu.Link
										asChild
										className={`group block px-3 py-2.5 rounded-lg hover:bg-neutral-50/5 active:scale-[0.98] active:opacity-75 duration-150 ease-out active:duration-75 ${
											pathname === "/photos" &&
											"bg-neutral-50/10 pointer-events-none"
										}`}
									>
										<Link href="/photos">
											<span className="text-neutral-50  text-xl pb-0.5">
												{t(`Path.Work.Photos.title`)}
											</span>
											<p className="ListItemText">{t(`Path.Work.Photos.description`)}</p>
										</Link>
									</NavigationMenu.Link>
								</li>
								<hr className="col-span-2 border-neutral-50/10 my-1 mx-3" />
								{Projects.map((Project) => (
									<li key={Project.link}>
										<NavigationMenu.Link
											asChild
											className={`group block px-3 py-2.5 rounded-lg hover:bg-neutral-50/5 active:scale-[0.98] active:opacity-75 duration-150 ease-out active:duration-75 ${
												pathname === Project.link &&
												"bg-neutral-50/10 pointer-events-none"
											}`}
										>
											<Link href={Project.link}>
												<span className="text-neutral-50  text-xl pb-0.5">
													{t(`Path.Work.Projects.${Project.strings}.title`)}
												</span>
												<p className="ListItemText">
													{t(`Path.Work.Projects.${Project.strings}.description`)}
												</p>
											</Link>
										</NavigationMenu.Link>
									</li>
								))}
								<li className="col-span-2">
									<NavigationMenu.Link
										asChild
										className={`group block px-3 py-2.5 text-center rounded-lg hover:bg-neutral-50/5 active:scale-[0.98] active:opacity-75 duration-150 ease-out active:duration-75 ${
											pathname === "/projects" &&
											"bg-neutral-50/10 pointer-events-none"
										}`}
									>
										<Link href="/projects">
											<span className="text-neutral-50  pb-0.5">
												{t("Path.Work.Projects.More.title")}
											</span>
										</Link>
									</NavigationMenu.Link>
								</li>
							</ul>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
					<NavigationMenu.Item>
						<NavigationMenu.Trigger className={NavMenuTrigger} style={{ animationDelay: ".35s" }}>
							<span className="inline-flex items-center gap-3">
								{t("Path.Other.title")}
								{Caret}
							</span>
						</NavigationMenu.Trigger>
						<NavigationMenu.Content className={`${NavMenuContent} w-[500px] lg:w-[600px]`}>
							<ul className="grid gap-1 grid-flow-row grid-cols-2">
								<li>
									<NavigationMenu.Link
										asChild
										className={`group block px-3 py-2.5 rounded-lg hover:bg-neutral-50/5 active:scale-[0.98] active:opacity-75 duration-150 ease-out active:duration-75 ${
											pathname === "/privacy" &&
											"bg-neutral-50/10 pointer-events-none"
										}`}
									>
										<Link href="/privacy">
											<span className="text-neutral-50  text-xl pb-0.5">
												{t("Path.Other.Privacy.title")}
											</span>
											<p className="ListItemText">
												{t.rich("Path.Other.Privacy.description", {
													s: (chunks) => (
														<>
															<br />
															<span className="text-xs opacity-20">{chunks}</span>
														</>
													),
												})}
											</p>
										</Link>
									</NavigationMenu.Link>
								</li>
								<li>
									<NavigationMenu.Link
										asChild
										className={`group block px-3 py-2.5 rounded-lg hover:bg-neutral-50/5 active:scale-[0.98] active:opacity-75 duration-150 ease-out active:duration-75 ${
											pathname === "/ai" &&
											"bg-neutral-50/10 pointer-events-none"
										}`}
									>
										<Link href="/ai">
											<span className="text-neutral-50  text-xl pb-0.5">
												{t("Path.Other.AI.title")}
											</span>
											<p className="ListItemText">{t("Path.Other.AI.description")}</p>
										</Link>
									</NavigationMenu.Link>
								</li>
								<li>
									<NavigationMenu.Link
										asChild
										className="group block px-3 py-2.5 rounded-lg hover:bg-neutral-50/5 active:scale-[0.98] active:opacity-75 duration-150 ease-out active:duration-75"
									>
										<Link href={`https://potato.pprmint.de${pathname}`}>
											<span className="text-neutral-50  text-xl pb-0.5">
												{t("Path.Other.Potato.title")}
											</span>
											<p className="ListItemText">{t("Path.Other.Potato.description")}</p>
										</Link>
									</NavigationMenu.Link>
								</li>
							</ul>
							<Copyright className="pl-3 pt-1 items-center justify-between" />
						</NavigationMenu.Content>
					</NavigationMenu.Item>
					<NavigationMenu.Indicator className="flex items-end justify-center h-2 top-11 -z-10 duration-250 ease-out data-[state='visible']:animate-fade-in data-[state='hidden']:animate-fade-out">
						<div className="relative bg-neutral-50/10 w-full h-10 rounded-lg duration-250" />
					</NavigationMenu.Indicator>
				</NavigationMenu.List>
				<div className="absolute flex justify-center top-[59px] left-1/2 -translate-x-1/2" style={{ perspective: 2000 }}>
					<NavigationMenu.Viewport className="relative top-1 origin-top-left w-(--radix-navigation-menu-viewport-width) overflow-hidden backdrop-blur-xl bg-linear-to-b from-white/90 dark:from-neutral-900/90 to-white/80 dark:to-neutral-900/75 ring-1 ring-black/10 dark:ring-black/50 outline outline outline-white/10 -outline-offset-1 text-neutral rounded-2xl shadow-xl h-(--radix-navigation-menu-viewport-height) duration-250 ease-out data-[state='open']:animate-enter-from-t data-[state='closed']:animate-exit-to-t" />
				</div>
			</NavigationMenu.Root>
		</>
	);
}
