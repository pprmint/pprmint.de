"use client";
import React, { Fragment, ReactNode, useState } from "react";
import { useConfig } from "@payloadcms/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import QuestionCircle from "@/icons/QuestionCircle";
import Home from "@/icons/Home";
import Logout from "@/icons/Logout";

const HiddenItems = [
	"payload-locked-documents",
	"payload-preferences",
	"payload-migrations",
];

interface NavItem {
	slug?: string;
	label: string;
	icon?: string | ReactNode;
	link: string;
	parent?: string;
	children?: NavItem[];
}

function Nav() {
	const {
		config: { collections, globals },
	} = useConfig();

	const pathname = usePathname();
	const isActive = (href: string) => {
		if (href === "/admin") {
			return pathname === "/admin";
		}
		return pathname.startsWith(href);
	};

	function GroupCollections(items: NavItem[]) {
		const rootItems = items.filter((item) => !item.parent);
		const childItems = items.filter((item) => item.parent);

		return rootItems.map((rootItem) => ({
			...rootItem,
			children: childItems.filter((child) => child.parent === rootItem.slug),
		}));
	}

	const Collections = GroupCollections(
		collections
			.filter((collection) => !HiddenItems.includes(collection.slug))
			.map((item) => ({
				slug: item.slug,
				label: `${item.labels.plural ? item.labels.plural : item.slug}`,
				icon: item.admin.custom.icon,
				link: "/admin/collections/" + item.slug,
				parent: item.admin.custom.parent,
			})),
	);

	const Globals = globals
		.filter((global) => !HiddenItems.includes(global.slug))
		.map((item) => ({
			slug: item.slug,
			label: `${item.label ? item.label : item.slug}`,
			icon: item.admin.custom.icon,
			link: "/admin/globals/" + item.slug,
		}));

	function NavLink(props: NavItem) {
		return (
			<Link
				href={props.link}
				className={`group flex gap-4 items-center ${!props.parent ? `border-0 ${props.link === "/admin" ? "border-y" : "border-t"} border-solid border-[var(--theme-elevation-100)] h-12 px-4` : "h-9 pl-[59px] pr-4 text-sm"} text-[var(--theme-text)] no-underline ${isActive(props.link) ? "bg-[var(--theme-elevation-100)] font-bold" : "hover:bg-[var(--theme-elevation-50)]"}`}
			>
				{!props.parent && (
					<div
						className={`size-[27px] rounded-full ${isActive(props.link) ? "bg-[var(--theme-text)] text-[var(--theme-bg)]" : "text-[var(--theme-text)] bg-[var(--theme-elevation-50)] group-hover:bg-[var(--theme-elevation-100)]"}`}
					>
						<div className="size-[27px] inline-flex items-center justify-center">
							{typeof props.icon === "string" ? (
								<div
									className="inline-flex items-center justify-center"
									dangerouslySetInnerHTML={{
										__html: props.icon ? props.icon : <QuestionCircle />,
									}}
								/>
							) : (
								props.icon
							)}
						</div>
					</div>
				)}
				{props.label}
			</Link>
		);
	}

	function NavSection({ title, items }: { title: string; items: NavItem[] }) {
		return (
			<div className="border-0 border-b border-solid border-[var(--theme-elevation-100)]">
				<div className="text-[var(--theme-elevation-400)] px-4 mb-2">
					<span className="text-xs">{title}</span>
				</div>
				<div>
					{items.map((item) => (
						<Fragment key={item.slug}>
							<NavLink {...item} />
							{item.children?.map((child) => (
								<NavLink key={child.slug} {...child} parent={child.parent} />
							))}
						</Fragment>
					))}
				</div>
			</div>
		);
	}

	return (
		<nav className="w-screen md:w-[var(--nav-width)] h-screen max-h-svh flex flex-col border-0 border-r border-solid border-[var(--theme-elevation-100)] sticky top-0 bottom-0 overflow-auto">
			<div className="relative h-14">
				<Link
					href="/"
					target="_blank"
					className="group block relative w-24 h-14 overflow-clip ml-auto mr-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 972 800"
						className="absolute top-1 group-hover:top-0.5 group-active:top-1 w-full h-auto fill-[var(--theme-elevation-100)] group-hover:fill-[var(--theme-elevation-200)] duration-300 active:duration-75 ease-in-out-custom"
					>
						<path d="M89 680c4 28-29 47-29 47 21-27 19-71 15-102-3-23-31-50-17-119 3-16 8-30 12-42-15 18-35 27-61 34 32-12 63-37 75-67 10-25 17-64 46-96-10 5-32 12-44 13 15-1 63-45 76-60 51-64 110-98 193-98 39 0 27 5 39 4 7 0 15-7 46-7 21 0 28 10 52 28 22 17 51 39 73 68-8-22-16-52-16-91C549 84 643 7 643 7c-4 32 27 141 20 179-9 58-33 101-52 122 7 0 14 3 20 10-1-16 10-40 74-64 88-32 103-40 112-54-4 20-49 42-62 67 79-8 144 50 144 50-5-2-12-2-22 0 35 18 86 69 86 112 0 23-8 38-8 38s6-13 2-38c-3-16-10-34-26-52 11 24 15 50 15 75 0 71-20 100-85 156 54-73 69-150 22-199 0 0 36 43 9 74-25 29-46 41-60 58-22 28-30 56-38 96-4-42 3-81 11-98 12-24 13-54 10-76-6 45-80 79-102 76 25 3 81-54 81-77 0-22-31-64-78-50-34 10-56 5-64-8 0 8-4 13-10 15-5 1-10 1-14-1a505 505 0 0 1 6 24c7 28 21 102 61 151-13-7-26-18-44-41 0 60-17 88-29 123a91 91 0 0 1-67 62c-14 3-50 2-89-19l12-8s-27 2-41-8l14-15c-19-4-58-29-62-33 79 2 111-49 122-81-24 15-52 25-74 4 20 4 57-11 77-56 2-7-34-67-49-66-31 2-68-7-87-34-20-30-21-29-21-29s0 16 15 39c-29-8-25-79-25-79s-23 63 15 121c-9-5-16-11-22-18 0 8 2 18 11 28-58 6-83-106-81-123-6 11-6 36-6 61-10-22-13-52-6-92-15 17-34 103-34 108-2-12-3-28 0-53-14 20-24 48-29 87-6 53 21 96 52 110-29 0-49-31-49-31 6 50 19 81 48 96 0 0-16 12-35 10 0 0 23 29 66 54-18 0-47-23-47-23 10 15 30 25 30 25-58 22-86-31-86-31s7 31 54 54c0 0-26 3-61-12 7 11 20 20 41 27-98 52-118-64-119-70Zm506-392c-8-53-2-114 20-183 0 0-31 33-35 91-2 36 5 57 15 92Z" />
						<path d="M358 194c-5-10-18-33-62-29-52 4-92 44-108 104-17 60 6 94 6 94s-16-32 11-98c26-65 58-84 93-90 31-5 35 12 40 21 6 12 26 8 20-2Z" />
					</svg>
				</Link>
			</div>
			<div className="mb-auto flex flex-col gap-5">
				<NavLink slug="" link="/admin" icon={<Home />} label="Dashboard" />
				<NavSection title="Collections" items={Collections} />
				{Globals.length > 0 && <NavSection title="Globals" items={Globals} />}
			</div>
			<div className="h-12 mt-2">
				<NavLink
					slug=""
					link="/admin/logout"
					icon={<Logout />}
					label="Logout"
				/>
			</div>
		</nav>
	);
}

export default dynamic(() => Promise.resolve(Nav), {
	ssr: false,
});
