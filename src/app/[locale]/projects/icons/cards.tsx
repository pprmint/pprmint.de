"use client";
import { useState, useRef, PropsWithChildren, ChangeEvent, Fragment } from "react";
import ReactDOMServer from "react-dom/server";
import * as Toast from "@radix-ui/react-toast";
import * as Tooltip from "@radix-ui/react-tooltip";
import Checkbox from "src/components/ui/Checkbox";
import { useTranslations } from "next-intl";

import { Category, Icon, Icons } from "./icons";
import X from "src/icons/X";
import { useTransition, a, config } from "@react-spring/web";
import FadingImage from "src/components/ui/FadingImage";

import JiggyGif from "public/assets/icons/Jiggy.gif";
import Search from "src/icons/Search";
import Button from "src/components/ui/Button";
import Download from "src/icons/Download";
import Text from "src/icons/Text";
import Zip from "src/icons/Zip";
import { Link } from "src/navigation";

export default function Cards() {
	const t = useTranslations("");
	const [search, setSearch] = useState("");
	const searchRef = useRef<HTMLInputElement>(null);
	const handleClear = () => {
		if (searchRef.current) {
			searchRef.current.value = "";
			setSearch(""); // Optionally clear the state if needed
		}
	};
	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTimeout(() => {
			setSearch(event.target.value);
		}, 500);
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
				<span className="text-neutral-50 font-medium">{match}</span>
				{afterMatch}
			</>
		);
	}

	const [large, setLarge] = useState(false);

	// Toasts for copying icons.
	const [toastOpen, setToastOpen] = useState(false);
	const timerRef = useRef(0);
	const [current, setCurrent] = useState({ category: 0, icon: 0 });

	// The funny.
	const [showJiggy, setShowJiggy] = useState(false);
	const [jiggies, setJiggies] = useState(0);

	const JiggyTransition = useTransition(showJiggy, {
		from: {
			y: 200,
		},
		enter: {
			y: 0,
		},
		leave: {
			y: 200,
		},
		config: config.stiff,
		delay: 2000,
	});

	function Icon(props: PropsWithChildren<{ categoryIndex: number; iconIndex: number }>) {
		return (
			<Tooltip.Root disableHoverableContent>
				<Tooltip.Trigger asChild>
					<button
						aria-label={"Icon: " + Icons[props.categoryIndex].icons[props.iconIndex].names[0]}
						className={`inline-flex items-center justify-center mx-auto ${
							large ? "size-11" : "size-9"
						} hover:bg-neutral-900 duration-100 *:duration-100 active:duration-75 active:scale-95 active:opacity-75 rounded-full ${
							large && "*:size-[30px]"
						}`}
						onClick={() => {
							navigator.clipboard.writeText(
								ReactDOMServer.renderToString(Icons[props.categoryIndex].icons[props.iconIndex].icon)
							);
							setToastOpen(false);
							window.clearTimeout(timerRef.current);
							timerRef.current = window.setTimeout(() => {
								setCurrent({ category: props.categoryIndex, icon: props.iconIndex });
								setToastOpen(true);
							}, 100);
							if (Icons[props.categoryIndex].icons[props.iconIndex].names.includes("Jiggy")) {
								handleJiggy();
							}
						}}
					>
						{props.children}
					</button>
				</Tooltip.Trigger>
				<Tooltip.Content
					className="data-[state=delayed-open]:animate-tooltip-enter-bottom data-[state=instant-open]:animate-tooltip-enter-bottom
						data-[state=closed]:animate-tooltip-exit-bottom
						select-none rounded-full border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm leading-none shadow-xl shadow-neutral-950/50"
					side="top"
					sideOffset={6}
				>
					{Icons[props.categoryIndex].icons[props.iconIndex].names[0]}
					<Tooltip.Arrow className="fill-neutral-700" />
				</Tooltip.Content>
			</Tooltip.Root>
		);
	}

	function handleJiggy() {
		let gotJiggy = localStorage.getItem("gotJiggy");
		if (!gotJiggy) {
			localStorage.setItem("gotJiggy", "Guah-huh!");
			let sound = new Audio("/assets/icons/collect_jiggy.mp3");
			sound.play();
			setShowJiggy(true);
			setTimeout(() => {
				setJiggies(jiggies + 1);
			}, 3000);
			setTimeout(() => {
				setShowJiggy(false);
			}, 3000);
		}
	}

	return (
		<Tooltip.Provider>
			<Toast.Provider>
				<Toast.Root
					className="flex gap-6 items-center p-3 rounded-xl shadow-lg shadow-neutral-950/50 backdrop-blur-xl bg-gradient-to-b from-neutral-800/75 to-neutral-900/90 border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 data-[state=open]:animate-toast-slide-in data-[state=closed]:animate-fade-out-scale-down data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-toast-slide-out"
					open={toastOpen}
					onOpenChange={setToastOpen}
					duration={3000}
				>
					<div className="*:size-[30px] *:fill-neutral-50">
						{Icons[current.category].icons[current.icon].icon}
					</div>
					<Toast.Description>
						{t(
							Icons[current.category].icons[current.icon].names.includes("Twitter but worse")
								? "COMMON.yikes"
								: "COMMON.copied"
						)}
					</Toast.Description>
					<Toast.Close className="inline-flex items-center justify-center size-6 hover:bg-neutral-50/10 active:bg-neutral-50/5 rounded-full duration-100 active:duration-75">
						<X className="fill-neutral-50" />
					</Toast.Close>
				</Toast.Root>
				<Toast.Viewport className="[--viewport-padding:_24px] fixed bottom-0 right-0 p-[var(--viewport-padding)] flex flex-col w-max z-60 outline-none" />
				<div className="md:flex items-center gap-3 mb-6">
					<div className="inline-flex whitespace-nowrap gap-3 flex-grow mb-3 md:mb-0">
						<Checkbox checked={large} onCheckedChange={() => setLarge(!large)} id="large" />
						<label htmlFor="large">{t("ICONS.Content.largeIcons")}</label>
					</div>
					<div className="flex gap-3 flex-wrap">
						<Link href="https://static.pprmint.art/download/minticons/MintIcons.zip" download>
							<Button>
								<Zip />
								{t("ICONS.Content.Download.svgs")}
							</Button>
						</Link>
						<Link href="https://static.pprmint.art/download/minticons/MintIcons1.1.otf" download>
							<Button>
								<Text />
								{t("ICONS.Content.Download.font")}
							</Button>
						</Link>
					</div>
				</div>
				<div className="relative w-full mb-6">
					<div
						onClick={handleClear}
						className={`absolute flex right-0 w-10 h-full items-center justify-center text-neutral-50 rounded-tr-lg ${
							filteredIcons.length === 0
								? "hover:bg-red-800 cursor-pointer"
								: search && "hover:bg-neutral-900 cursor-pointer"
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
						className={`w-full bg-neutral-950 focus:bg-neutral-950 border outline-none focus:outline-none border-neutral-900 hover:border-neutral-800 focus:hover:border-neutral-900 hover:bg-neutral-900 text-neutral-50 placeholder:text-neutral rounded-lg ${
							search !== "" && "rounded-b-none"
						} px-3 py-2 duration-100`}
					/>
					{search !== "" ? (
						<div className="absolute top-[41px] p-1 w-full max-h-80 left-0 bg-neutral-950 border border-neutral-900 rounded-lg rounded-t-none shadow-xl shadow-neutral-950 overflow-auto">
							{filteredIcons.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
									{filteredIcons.map((icon, index) => (
										<button
											key={index}
											className="inline-flex gap-3 px-2 py-1 min-h-9 items-center text-left hover:bg-neutral-50/10 rounded-md duration-100 active:opacity-75 active:duration-75"
											onClick={() => {
												navigator.clipboard.writeText(ReactDOMServer.renderToString(icon.icon));
												if (icon.names.includes("Jiggy")) {
													handleJiggy();
												}
											}}
										>
											<div className={large ? "*:size-[30px]" : ""}>{icon.icon}</div>
											<div className="leading-none text-sm">
												{highlightMatches(icon.names[0], search)}
												<div className="leading-none flex gap-x-1 text-[0.6rem] text-neutral-500 flex-wrap">
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
				<div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6`}>
					{Icons.map((category, catIndex) => (
						<div key={catIndex} className="py-6 rounded-lg border border-neutral-900">
							<h2 className="pb-6 px-6 text-center">
								{t(`ICONS.Content.Category.${category.category}`)}
							</h2>
							<div
								className={`grid grid-cols-8 ${large ? "px-1 xl:px-3" : "px-2 md:px-3 gap-1 md:gap-2"}`}
							>
								{category.icons.map((icon, icnIndex) => (
									<Icon key={icnIndex} categoryIndex={catIndex} iconIndex={icnIndex}>
										{icon.icon}
									</Icon>
								))}
							</div>
						</div>
					))}
				</div>
				{JiggyTransition((style, item) =>
					item ? (
						<a.div
							style={style}
							className="fixed flex items-center justify-center gap-6 z-100 bottom-0 inset-x-0 py-6"
						>
							<FadingImage src={JiggyGif} alt="A jiggy!" className="size-32" />
							<span className="bg-clip-text bg-gradient-to-b from-orange-100 to-orange text-8xl font-bold font-mono text-transparent">
								{jiggies}
							</span>
						</a.div>
					) : null
				)}
			</Toast.Provider>
		</Tooltip.Provider>
	);
}
