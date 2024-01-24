import { useState, useRef } from "react";
import useTranslation from "next-translate/useTranslation";
import * as Toast from "@radix-ui/react-toast";

import Head from "components/Head";

interface Shade {
	[index: number]: string;
}

interface Color {
	name: string;
	shades: Shade[];
}

const Colors: Color[] = [
	{
		name: "red",
		shades: [
			"#fde9ec",
			"#fec8ca",
			"#fea6a7",
			"#ff8585",
			"#ff6665",
			"#f44",
			"#d43838",
			"#ae2e2e",
			"#822222",
			"#591717",
			"#2e0b0b",
		],
	},
	{
		name: "orange",
		shades: [
			"#ffeee4",
			"#ffd7be",
			"#ffbf97",
			"#ffa871",
			"#ff8f4a",
			"#f71",
			"#e06100",
			"#b85000",
			"#8f3e00",
			"#662c00",
			"#3d1600",
		],
	},
	{
		name: "yellow",
		shades: [
			"#fff4d6",
			"#ffe9ad",
			"#ffde85",
			"#ffd35c",
			"#ffc933",
			"#fb0",
			"#dfa000",
			"#c08600",
			"#a16d00",
			"#774900",
			"#371e00",
		],
	},
	{
		name: "lime",
		shades: [
			"#eff7de",
			"#deefbe",
			"#cee79d",
			"#bede7c",
			"#add65c",
			"#9c3",
			"#87b42d",
			"#6e9325",
			"#56721d",
			"#3d5214",
			"#1f290b",
		],
	},
	{
		name: "green",
		shades: [
			"#d6ffe9",
			"#aef6d0",
			"#84ecb6",
			"#5ae39c",
			"#30d982",
			"#0c6",
			"#00b85c",
			"#008f47",
			"#006633",
			"#005229",
			"#002914",
		],
	},
	{
		name: "cyan",
		shades: [
			"#def7ff",
			"#c2f1ff",
			"#adecff",
			"#85e2ff",
			"#5cd9ff",
			"#2cf",
			"#00bcf5",
			"#009ccc",
			"#007da3",
			"#005e7a",
			"#002f3d",
		],
	},
	{
		name: "blue",
		shades: [
			"#def0ff",
			"#bde1ff",
			"#99d1ff",
			"#70bcff",
			"#47a9ff",
			"#29f",
			"#0083f5",
			"#006dcc",
			"#0057a3",
			"#00417a",
			"#00213d",
		],
	},
	{
		name: "violet",
		shades: [
			"#f4ecfd",
			"#e9dafb",
			"#d3b5f8",
			"#bd90f4",
			"#a76af0",
			"#95e",
			"#8844dc",
			"#7332c8",
			"#6520b4",
			"#4D158E",
			"#25074a",
		],
	},
	{
		name: "pink",
		shades: [
			"#fdedf7",
			"#fbdaee",
			"#f9c8e6",
			"#f5a3d6",
			"#f17ec5",
			"#e6b",
			"#dc56ab",
			"#c74299",
			"#a42d7e",
			"#7f1b65",
			"#470034",
		],
	},
	{
		name: "neutral",
		shades: ["#eee", "#ddd", "#ccc", "#bbb", "#999", "#777", "#555", "#444", "#333", "#222", "#111"],
	},
];

export default function Palette() {
	const { t } = useTranslation();

	const [open, setOpen] = useState(false);
	const timerRef = useRef(0);
	const [currentColor, setCurrentColor] = useState("");

	return (
		<>
			<Head title={t("PALETTE:Head.title")} description={t("PALETTE:Head.description")} />;
			<main className="mx-auto pt-36">
				<Toast.Provider>
					<div className="grid grid-cols-10 pb-20">
						{Colors.map((color, index) => (
							<div className="h-[700px]">
								{color.shades.map((shade, index) => (
									<div
										style={{ backgroundColor: shade as string }}
										className={`group flex items-center justify-center h-16 font-display-mono ${
											index > 5 ? "text-neutral-50" : "text-neutral-950"
										} hover:scale-110 hover:shadow-xl hover:rounded-md duration-100 ease-in-out-custom active:scale-105 cursor-pointer active:duration-75`}
										onClick={() => {
											navigator.clipboard.writeText(shade as string);
											setOpen(false);
											window.clearTimeout(timerRef.current);
											timerRef.current = window.setTimeout(() => {
												setCurrentColor(shade as string);
												setOpen(true);
											}, 100);
										}}
									>
										<span
											className={index == 5 ? "text-4xl font-light" : "opacity-0 group-hover:opacity-100 duration-150"}
										>
											{shade as string}
										</span>
									</div>
								))}
							</div>
						))}
					</div>
					<Toast.Root
						className="flex gap-6 items-center p-3 rounded-xl shadow-lg shadow-neutral-950/50 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 data-[state=open]:animate-toast-slide-in data-[state=closed]:animate-fade-out-scale-down data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-toast-slide-out"
						open={open}
						onOpenChange={setOpen}
					>
						<div
							className="w-[30px] h-[30px] rounded-full border border-neutral-50/10"
							style={{ backgroundColor: currentColor }}
						/>
						<Toast.Description>{t("COMMON:copied")}</Toast.Description>
						<Toast.Close className="hover:bg-neutral-50/10 active:bg-neutral-50/5 rounded-full duration-100 active:duration-75">
							<i className="ri-close-line text-neutral-50 p-1" />
						</Toast.Close>
					</Toast.Root>
					<Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 p-[var(--viewport-padding)] flex flex-col w-max z-50 outline-none" />
				</Toast.Provider>
			</main>
		</>
	);
}
