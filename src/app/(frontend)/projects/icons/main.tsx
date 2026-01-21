"use client";
import { useState, useRef, PropsWithChildren, ChangeEvent, Fragment } from "react";
import ReactDOMServer from "react-dom/server";
import Checkbox from "@/components/ui/Checkbox";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Tooltip from "@/components/ui/Tooltip";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";

import { Icon, Icons } from "./icons";

import JiggyGif from "@public/assets/icons/Jiggy.gif";
import Button from "@/components/ui/Button";
import Search from "@/icons/Search";
import X from "@/icons/X";
import Text from "@/icons/Text";
import Zip from "@/icons/Zip";
import { toast } from "sonner";

export default function Main() {
	const t = useTranslations("");
	const [search, setSearch] = useState("");
	const searchRef = useRef<HTMLInputElement>(null);
	const handleClear = () => {
		if (searchRef.current) {
			searchRef.current.value = "";
			setSearch("");
		}
	};
	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTimeout(() => {
			setSearch(event.target.value);
		}, 300);
	};
	const allIcons: Icon[] = Icons.flatMap((category) => category.icons);
	const filteredIcons = allIcons
		.filter((icon) => icon.names.some((name) => name.toLowerCase().includes(search.toLowerCase())))
		.sort((a, b) => {
			const searchLower = search.toLowerCase();

			// 1. Exact match with the first name.
			const exactMatch = (name: string) => name.toLowerCase() === searchLower;
			// 2. Partial match, but same start as the first name.
			const initialMatch = (name: string) => name.toLowerCase().startsWith(searchLower);
			// 3. Partial match with any of the following names.
			const nameMatch = (name: string) => name.toLowerCase().includes(searchLower);

			const getPriority = (icon: Icon) => {
				if (exactMatch(icon.names[0])) {
					return 1;
				} else if (initialMatch(icon.names[0])) {
					return 2;
				} else if (icon.names.slice(1).some(exactMatch)) {
					return 3;
				} else if (nameMatch(icon.names[0])) {
					return 4;
				} else {
					return 5;
				}
			};

			const aPriority = getPriority(a);
			const bPriority = getPriority(b);

			if (aPriority !== bPriority) {
				return aPriority - bPriority;
			}

			// Fallback to original order.
			return 0;
		});

	function highlightMatches(name: string, search: string) {
		const searchLower = search.toLowerCase();
		const nameLower = name.toLowerCase();
		const index = nameLower.indexOf(searchLower);
		if (index === -1) {
			return name;
		}
		const beforeMatch = name.slice(0, index);
		const match = name.slice(index, index + search.length);
		const afterMatch = name.slice(index + search.length);
		return (
			<>
				{beforeMatch}
				<span className="text-neutral-950 dark:text-white font-medium">{match}</span>
				{afterMatch}
			</>
		);
	}

	const [large, setLarge] = useState(false);

	// The funny.
	const [showJiggy, setShowJiggy] = useState(false);
	const [jiggies, setJiggies] = useState(0);

	function Icon(props: PropsWithChildren<{ categoryIndex: number; iconIndex: number }>) {
		return (
			<Tooltip text={Icons[props.categoryIndex].icons[props.iconIndex].names[0]} side="top">
				<button
					aria-label={"Icon: " + Icons[props.categoryIndex].icons[props.iconIndex].names[0]}
					className={`inline-flex items-center justify-center mx-auto w-full aspect-square hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10 duration-75 hover:duration-0 ${
						large && "*:size-[30px]"
					}`}
					onClick={() => {
						navigator.clipboard.writeText(
							ReactDOMServer.renderToString(Icons[props.categoryIndex].icons[props.iconIndex].icon)
						);
						toast(
							t(
								Icons[props.categoryIndex].icons[props.iconIndex].names.includes("Twitter but worse")
									? "COMMON.ew"
									: "COMMON.copied"
							),
							{
								description: Icons[props.categoryIndex].icons[props.iconIndex].names[0],
								icon: (
									<div className="*:size-[30px] *:fill-neutral-950 dark:*:fill-white">
										{Icons[props.categoryIndex].icons[props.iconIndex].icon}
									</div>
								),
							}
						);
						if (Icons[props.categoryIndex].icons[props.iconIndex].names.includes("Jiggy")) {
							handleJiggy();
						}
					}}
				>
					{props.children}
				</button>
			</Tooltip>
		);
	}

	function handleJiggy() {
		let gotJiggy = localStorage.getItem("gotJiggy");
		if (!gotJiggy) {
			localStorage.setItem("gotJiggy", "Guah-huh!");
			let sound = new Audio("/assets/icons/collect_jiggy.mp3");
			sound.play();
			setTimeout(() => {
				setShowJiggy(true);
			}, 2000);
			setTimeout(() => {
				setJiggies(jiggies + 1);
			}, 3000);
			setTimeout(() => {
				setShowJiggy(false);
			}, 5000);
		}
	}

	return (
		<>
			<section className="pt-12 md:pt-20 xl:pt-40 border-x border-black/5 dark:border-white/5">
				<div className="lg:flex items-center">
					<div className="relative w-full border-y md:border-r border-black/5 dark:border-white/5">
						<div
							onClick={handleClear}
							className={`absolute flex right-0 w-10 h-full items-center justify-center text-neutral-950 dark:text-white ${
								search &&
								"hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 cursor-pointer"
							} duration-100`}
						>
							{search ? <X /> : <Search />}
						</div>
						<input
							type="text"
							placeholder={t("COMMON.searchEnglish")}
							name="search"
							aria-label="name text field"
							maxLength={30}
							onChange={handleSearchChange}
							ref={searchRef}
							className="w-full bg-transparent hover:bg-black/5 dark:hover:bg-white/5 hover:focus:bg-transparent dark:hover:focus:bg-transparent outline-hidden focus:outline-hidden text-neutral-950 dark:text-white placeholder:text-neutral px-3 h-9 duration-100"
						/>
						{search !== "" ? (
							<div className="absolute top-[36px] z-10 p-1 max-h-80 -left-px -right-px bg-white dark:bg-neutral-950 border border-black/5 dark:border-white/5 shadow-xl shadow-neutral-950/5 dark:shadow-neutral-950 overflow-auto">
								{filteredIcons.length > 0 ? (
									<div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
										{filteredIcons.map((icon, index) => (
											<button
												key={index}
												className="inline-flex gap-3 px-2 py-1 min-h-9 items-center text-left hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10 duration-100 active:opacity-75 active:duration-75"
												onClick={() => {
													navigator.clipboard.writeText(
														ReactDOMServer.renderToString(icon.icon)
													);
													if (icon.names.includes("Jiggy")) {
														handleJiggy();
													}
													toast(
														t(
															icon.names.includes("Twitter but worse")
																? "COMMON.ew"
																: "COMMON.copied"
														),
														{
															description: icon.names[0],
															icon: (
																<div className="*:size-[30px] *:fill-neutral-950 dark:*:fill-white">
																	{icon.icon}
																</div>
															),
														}
													);
												}}
											>
												<div className={large ? "*:size-[30px]" : ""}>{icon.icon}</div>
												<div className="leading-none text-sm">
													{highlightMatches(icon.names[0], search)}
													<div className="leading-none flex gap-x-1 text-[0.6rem] text-neutral-950 dark:text-white flex-wrap">
														{icon.names.slice(1).map((name, index) => (
															<Fragment key={index}>
																{index > 0 && " • "}
																<span>{highlightMatches(name, search)}</span>
															</Fragment>
														))}
													</div>
												</div>
											</button>
										))}
									</div>
								) : (
									<div className="inline-flex gap-3 px-2 items-center min-h-9">
										<X className="fill-red size-6" />
										{t("COMMON.noResults")}
									</div>
								)}
							</div>
						) : null}
					</div>
					<div className="border-b lg:border-t border-black/5 dark:border-white/5">
						<div className="inline-flex items-center whitespace-nowrap gap-2 h-9 px-2 w-full">
							<Checkbox border checked={large} onCheckedChange={() => setLarge(!large)} id="large" />
							<label htmlFor="large">{t("ICONS.Content.largeIcons")}</label>
						</div>
					</div>
					<div className="flex flex-wrap md:flex-nowrap border-b lg:border-t lg:border-l border-black/5 dark:border-white/5">
						<Link href="/api/download/file/MintIcons.zip" download target="_blank">
							<Button>
								<Zip />
								{t("ICONS.Content.Download.svgs")}
							</Button>
						</Link>
						<Link href="/api/download/file/MintIcons1.1.otf" download target="_blank">
							<Button design="semi-transparent">
								<Text />
								{t("ICONS.Content.Download.font")}
							</Button>
						</Link>
					</div>
				</div>
			</section>
			<div
				className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 border-r border-black/5 dark:border-white/5 divide-x divide-black/5 dark:divide-white/5`}
			>
				{Icons.map((category, catIndex) => (
					<div key={catIndex} className="first:border-l border-b border-black/5 dark:border-white/5">
						<p className="font-stretch-condensed text-2xl md:text-3xl px-4 pt-3 pb-2 text-neutral-950 dark:text-white">
							{t(`ICONS.Content.Category.${category.category}`)}
						</p>
						<div className="grid grid-cols-8">
							{category.icons.map((icon, icnIndex) => (
								<Icon key={icnIndex} categoryIndex={catIndex} iconIndex={icnIndex}>
									{icon.icon}
								</Icon>
							))}
						</div>
					</div>
				))}
			</div>
			<AnimatePresence>
				{showJiggy && (
					<m.div
						initial={{ y: 400 }}
						animate={{ y: 0, transition: { type: "spring", duration: 0.5, bounce: 0.2 } }}
						exit={{ y: 400, transition: { duration: 0.5, ease: "anticipate" } }}
						className="fixed flex items-center justify-center gap-6 z-100 bottom-0 inset-x-0 py-6"
					>
						<Image src={JiggyGif} alt="A jiggy!" className="size-32" />
						<span className="bg-clip-text bg-linear-to-b from-yellow-100 to-yellow text-8xl font-bold font-stretch-expanded text-transparent">
							{jiggies}
						</span>
					</m.div>
				)}
			</AnimatePresence>
		</>
	);
}
