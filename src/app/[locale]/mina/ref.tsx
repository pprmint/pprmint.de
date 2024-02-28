"use client";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import * as Accordion from "@radix-ui/react-accordion";
import * as Toast from "@radix-ui/react-toast";
import FadingImage from "src/components/FadingImage";

import TransparentMina from "public/assets/mina/mina.webp";
import { Link } from "src/navigation";

function ColorPickerToast(props: {
	color: string;
	open: boolean;
	onOpenChange: ((open: boolean) => void) | undefined;
}) {
	const t = useTranslations("COMMON");
	return (
		<Toast.Provider swipeDirection="right">
			<Toast.Root
				className="flex gap-6 items-center p-3 rounded-xl shadow-lg shadow-neutral-950/50 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 data-[state=open]:animate-toast-slide-in data-[state=closed]:animate-fade-out-scale-down data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-toast-slide-out"
				open={props.open}
				onOpenChange={props.onOpenChange}
			>
				<div
					className="w-[30px] h-[30px] rounded-full border border-neutral-50/10"
					style={{ backgroundColor: props.color }}
				/>
				<Toast.Description>{t("copied")}</Toast.Description>
				<Toast.Close className="hover:bg-neutral-50/10 active:bg-neutral-50/5 rounded-full duration-100 active:duration-75">
					<i className="ri-close-line text-neutral-50 p-1" />
				</Toast.Close>
			</Toast.Root>
			<Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 p-[var(--viewport-padding)] flex flex-col w-max z-50 outline-none" />
		</Toast.Provider>
	);
}

export default function RefSheet() {
	const t = useTranslations("MINA");

	const [highlighted, setHighlighted] = useState("");

	// Toast
	const [open, setOpen] = useState(false);
	const timerRef = useRef(0);
	const [currentColor, setCurrentColor] = useState("");
	function handleColorClick(color: string) {
		navigator.clipboard.writeText(color.substring(1));
		setOpen(false);
		window.clearTimeout(timerRef.current);
		timerRef.current = window.setTimeout(() => {
			setCurrentColor(color);
			setOpen(true);
		}, 100);
	}

	return (
		<section id="design" className="my-20 max-w-7xl mx-auto px-6 md:px-9">
			<div className="lg:grid grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="relative max-w-xs lg:max-w-none mx-auto">
					<div className="absolute w-full h-full z-10">
						<div
							className={`absolute border-4 border-green drop-shadow-md w-[40%] aspect-square rounded-full top-[3%] right-[7%] ${
								highlighted === "band" ? "backdrop-brightness-[140%] scale-100 sopacity-100" : "scale-50 opacity-0"
							} duration-250 ease-out origin-center`}
						/>
						<div
							className={`absolute border-4 border-green drop-shadow-md w-[20%] aspect-square rounded-full top-[7%] left-[32%] ${
								highlighted === "ahoge" ? "backdrop-brightness-[140%] scale-100 sopacity-100" : "scale-50 opacity-0"
							} duration-250 ease-out origin-center`}
						/>
						<div
							className={`absolute border-4 border-green drop-shadow-md w-[19%] aspect-square rounded-full top-[44%] left-[14%] ${
								highlighted === "accessories"
									? "backdrop-brightness-[140%] scale-100 sopacity-100"
									: "scale-50 opacity-0"
							} duration-250 ease-out origin-center`}
						/>
						<div
							className={`absolute border-4 border-green drop-shadow-md w-[19%] aspect-square rounded-full top-[43.5%] right-[29%] ${
								highlighted === "accessories"
									? "backdrop-brightness-[140%] scale-100 sopacity-100"
									: "scale-50 opacity-0"
							} duration-250 ease-out origin-center`}
						/>
						<div
							className={`absolute border-4 border-green drop-shadow-md w-[8%] aspect-square rounded-full top-[33.6%] right-[24.5%] ${
								highlighted === "accessories"
									? "backdrop-brightness-[140%] scale-100 sopacity-100"
									: "scale-50 opacity-0"
							} duration-250 ease-out origin-center`}
						/>
						<div
							className={`absolute border-4 border-green drop-shadow-md w-[15%] aspect-square rounded-full top-[59.7%] right-[33%] ${
								highlighted === "leaf" ? "backdrop-brightness-[140%] scale-100 sopacity-100" : "scale-50 opacity-0"
							} duration-250 ease-out origin-center`}
						/>
					</div>
					<FadingImage
						src={TransparentMina}
						alt=""
						className={`${highlighted === "" ? "brightness-100" : "brightness-75"} duration-200`}
					/>
				</div>
				<Accordion.Root
					type="single"
					defaultValue="lore"
					className="lg:col-span-2 divide-y-2 divide-neutral-900 border-b-2 border-neutral-900 h-max"
				>
					<Accordion.Item value="lore">
						<Accordion.Trigger className="group/trigger flex gap-3 text-left font-display w-full data-[state=closed]:py-3 data-[state=open]:py-6 font-semibold data-[state=closed]:hover:bg-neutral-900 data-[state=closed]:active:bg-transparent text-neutral-50 text-2xl data-[state=open]:text-3xl md:text-3xl data-[state=open]:md:text-4xl duration-400 data-[state=closed]:active:duration-200 ease-in-out-custom data-[state=open]:pointer-events-none">
							<i className="ri-arrow-down-s-line group-data-[state=open]/trigger:rotate-180 duration-400 ease-in-out-custom" />
							{t("Content.About.heading")}
						</Accordion.Trigger>
						<Accordion.Content className="data-[state=closed]:animate-accordion-slide-up data-[state=open]:animate-accordion-slide-down duration-400 ease-in-out-custom overflow-hidden">
							<p>{t("Content.About.text1", { birthyear: `${new Date().getFullYear() - 2004}` })}</p>
							<p>{t("Content.About.text2")}</p>
							<p>{t("Content.About.text3")}</p>
							<p>{t("Content.About.text4")}</p>
							<p>{t("Content.About.text5")}</p>
							<p>
								{t.rich("Content.About.text6", {
									Link: (chunks) => (
										<Link
											href="https://twitter.com/wxsonz"
											target="_blank"
											rel="noopener noreferrer"
											className="text-link-external"
										>
											{chunks}
										</Link>
									),
								})}
							</p>
							<div className="h-9" />
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="design">
						<Accordion.Trigger className="group/trigger flex gap-3 text-left font-display w-full data-[state=closed]:py-3 data-[state=open]:py-6 font-semibold data-[state=closed]:hover:bg-neutral-900 data-[state=closed]:active:bg-transparent text-neutral-50 text-2xl data-[state=open]:text-3xl md:text-3xl data-[state=open]:md:text-4xl duration-400 data-[state=closed]:active:duration-200 ease-in-out-custom data-[state=open]:pointer-events-none">
							<i className="ri-arrow-down-s-line group-data-[state=open]/trigger:rotate-180 duration-400 ease-in-out-custom" />
							{t("Content.Design.heading")}
						</Accordion.Trigger>
						<Accordion.Content className="data-[state=closed]:animate-accordion-slide-up data-[state=open]:animate-accordion-slide-down duration-400 ease-in-out-custom overflow-hidden">
							<div className="grid sm:grid-cols-2 gap-3" onMouseLeave={() => setHighlighted("")}>
								<div
									onMouseEnter={() => setHighlighted("band")}
									className={`${
										highlighted === "band" ? "bg-neutral-800" : "bg-neutral-900"
									} rounded-lg p-5 duration-100 cursor-default`}
								>
									<h4>{t("Content.Design.HairBand.heading")}</h4>
									<p>{t("Content.Design.HairBand.text")}</p>
								</div>
								<div
									onMouseEnter={() => setHighlighted("ahoge")}
									className={`${
										highlighted === "ahoge" ? "bg-neutral-800" : "bg-neutral-900"
									} rounded-lg p-5 duration-100 cursor-default`}
								>
									<h4>{t("Content.Design.Ahoge.heading")}</h4>
									<p>{t("Content.Design.Ahoge.text")}</p>
								</div>
								<div
									onMouseEnter={() => setHighlighted("accessories")}
									className={`${
										highlighted === "accessories" ? "bg-neutral-800" : "bg-neutral-900"
									} rounded-lg p-5 duration-100 cursor-default`}
								>
									<h4>{t("Content.Design.Accessories.heading")}</h4>
									<p>{t("Content.Design.Accessories.text")}</p>
								</div>
								<div
									onMouseEnter={() => setHighlighted("leaf")}
									className={`${
										highlighted === "leaf" ? "bg-neutral-800" : "bg-neutral-900"
									} rounded-lg p-5 duration-100 cursor-default`}
								>
									<h4>{t("Content.Design.LeafDesign.heading")}</h4>
									<p>{t("Content.Design.LeafDesign.text")}</p>
								</div>
							</div>
							<div className="h-9" />
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="colors">
						<Accordion.Trigger className="group/trigger flex gap-3 text-left font-display w-full data-[state=closed]:py-3 data-[state=open]:py-6 font-semibold data-[state=closed]:hover:bg-neutral-900 data-[state=closed]:active:bg-transparent text-neutral-50 text-2xl data-[state=open]:text-3xl md:text-3xl data-[state=open]:md:text-4xl duration-400 data-[state=closed]:active:duration-200 ease-in-out-custom data-[state=open]:pointer-events-none">
							<i className="ri-arrow-down-s-line group-data-[state=open]/trigger:rotate-180 duration-400 ease-in-out-custom" />
							{t("Content.Colors.heading")}
						</Accordion.Trigger>
						<Accordion.Content className="data-[state=closed]:animate-accordion-slide-up data-[state=open]:animate-accordion-slide-down duration-400 ease-in-out-custom overflow-hidden">
							<ColorPickerToast color={currentColor} open={open} onOpenChange={setOpen} />
							<div className="flex -space-x-2 pb-3">
								{[
									["#5ae39c", "text-neutral-950"],
									["#00cc66", "text-neutral-950"],
									["#048541", "text-neutral-950"],
									["#44ccdd", "text-neutral-950"],
									["#4499ee", "text-neutral-950"],
									["#222222", "text-neutral-50"],
									["#333333", "text-neutral-50"],
									["#ffeee4", "text-neutral-950"],
								].map(([hex, text]) => (
									<div
										key={hex}
										className={`group grid items-center text-center active:scale-95 ${text} hover:z-10 border-2 border-neutral-950 w-10 hover:w-24 h-10 rounded-full duration-150 ease-out overflow-hidden cursor-pointer`}
										style={{ backgroundColor: hex }}
										onClick={() => handleColorClick(hex)}
									>
										<span className="selection:bg-neutral-50 font-mono opacity-0 group-hover:opacity-100 duration-150 tracking-tighter whitespace-nowrap">
											{hex == "#ffeee4" ? "pale af" : hex}
										</span>
									</div>
								))}
							</div>
							<p>{t("Content.Colors.text1")}</p>
							<p>{t("Content.Colors.text2")}</p>
							<div className="h-9" />
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="fanart">
						<Accordion.Trigger className="group/trigger flex gap-3 text-left font-display w-full data-[state=closed]:py-3 data-[state=open]:py-6 font-semibold data-[state=closed]:hover:bg-neutral-900 data-[state=closed]:active:bg-transparent text-neutral-50 text-2xl data-[state=open]:text-3xl md:text-3xl data-[state=open]:md:text-4xl duration-400 data-[state=closed]:active:duration-200 ease-in-out-custom data-[state=open]:pointer-events-none">
							<i className="ri-arrow-down-s-line group-data-[state=open]/trigger:rotate-180 duration-400 ease-in-out-custom" />
							{t("Content.Fanart.heading")}
						</Accordion.Trigger>
						<Accordion.Content className="data-[state=closed]:animate-accordion-slide-up data-[state=open]:animate-accordion-slide-down duration-400 ease-in-out-custom overflow-hidden">
							<p>{t("Content.Fanart.text1")}</p>
							<p>{t("Content.Fanart.text2")}</p>
							<p>
								{t.rich("Content.Fanart.text3", {
									Link: (chunks) => (
										<Link href="/contact" className="text-lin">
											{chunks}
										</Link>
									),
								})}
							</p>
							<div className="h-9" />
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>
		</section>
	);
}
