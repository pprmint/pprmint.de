"use client";
import * as Toast from "@radix-ui/react-toast";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import X from "src/icons/X";

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
			"#fce3e7",
			"#fdcdcf",
			"#fea9ab",
			"#fe8687",
			"#ff6465",
			"#f44",
			"#df333a",
			"#b5262b",
			"#8e1a1d",
			"#640d0e",
			"#3b0000",
		],
	},
	{
		name: "orange",
		shades: [
			"#ffece0",
			"#ffdac1",
			"#ffc397",
			"#ffab6c",
			"#ff9443",
			"#f71",
			"#e36311",
			"#bc4e0e",
			"#95380a",
			"#6d2207",
			"#430f04",
		],
	},
	{
		name: "yellow",
		shades: [
			"#fff4d6",
			"#ffeab1",
			"#ffe18e",
			"#ffd767",
			"#ffce44",
			"#fb0",
			"#e59801",
			"#bc7801",
			"#935802",
			"#703d03",
			"#441f02",
		],
	},
	{
		name: "lime",
		shades: [
			"#f0fadb",
			"#dff0be",
			"#cfe89d",
			"#bfe17c",
			"#afd95c",
			"#9c3",
			"#82ad2b",
			"#688a23",
			"#4f6a1b",
			"#394c13",
			"#1f290b",
		],
	},
	{
		name: "green",
		shades: [
			"#e4f7e5",
			"#c4ebc8",
			"#a6dfae",
			"#88d493",
			"#6ac977",
			"#4b5",
			"#3da447",
			"#32863a",
			"#27682d",
			"#1c4a21",
			"#112c14",
		],
	},
	{
		name: "cyan",
		shades: [
			"#c7f9ff",
			"#acf3ff",
			"#8febff",
			"#70e2ff",
			"#50d9ff",
			"#2cf",
			"#1fb5e3",
			"#1894bc",
			"#106f90",
			"#084c65",
			"#062835",
		],
	},
	{
		name: "blue",
		shades: [
			"#c7f0ff",
			"#a4e1ff",
			"#88d2ff",
			"#68c0ff",
			"#4db1ff",
			"#29f",
			"#1f83e9",
			"#196bc0",
			"#135395",
			"#0d3b6a",
			"#00213d",
		],
	},
	{
		name: "violet",
		shades: [
			"#f0e2ff",
			"#e1cafb",
			"#d3b6f8",
			"#c6a1f5",
			"#b88df1",
			"#a7e",
			"#9363ce",
			"#784caa",
			"#5c3586",
			"#411e62",
			"#220c3f",
		],
	},
	{
		name: "pink",
		shades: [
			"#ffdeff",
			"#fcc6f5",
			"#f8afeb",
			"#f597e1",
			"#f180d7",
			"#e6c",
			"#d654b5",
			"#af3f93",
			"#882a70",
			"#62154e",
			"#3c002c",
		],
	},
	{
		name: "neutral",
		shades: ["#eee", "#ddd", "#ccc", "#bbb", "#999", "#777", "#555", "#444", "#333", "#222", "#111"],
	},
];

export default function Palette() {
	const t = useTranslations("COMMON");

	// Toasts for copying palette colors.
	const [toastOpen, setToastOpen] = useState(false);
	const timerRef = useRef(0);
	const [currentColor, setCurrentColor] = useState("");

	return (
		<Toast.Provider>
			<div className="dark flex flex-col lg:flex-row w-full pb-20">
				{Colors.map((color, colorIndex) => (
					<div
						key={colorIndex}
						className="grid grid-cols-4 grid-rows-3 lg:grid-rows-11 lg:grid-cols-1 lg:h-[700px] w-full"
					>
						{color.shades.map((shade, shadeIndex) => (
							<div
								key={colorIndex + shadeIndex}
								style={{ backgroundColor: shade as string }}
								className={`group flex items-center justify-center h-16 -mono ${
									shadeIndex == 5 ? "col-span-2 lg:col-span-1" : "col-span-1"
								} ${
									shadeIndex > 5 ? "text-white" : "text-neutral-950"
								} hover:scale-110 hover:shadow-xl hover:rounded-md duration-100 ease-in-out-custom active:scale-105 cursor-pointer active:duration-75`}
								onClick={() => {
									navigator.clipboard.writeText((shade as string).substring(1));
									setToastOpen(false);
									window.clearTimeout(timerRef.current);
									timerRef.current = window.setTimeout(() => {
										setCurrentColor(shade as string);
										setToastOpen(true);
									}, 100);
								}}
							>
								<span
									className={shadeIndex == 5 ? "text-4xl font-light font-stretch-expanded" : "opacity-0 group-hover:opacity-100 duration-150 font-stretch-expanded"}
								>
									{shade as string}
								</span>
							</div>
						))}
					</div>
				))}
			</div>
			<Toast.Root
				className="flex gap-6 items-center p-3 rounded-xl shadow-lg shadow-neutral-950/50 backdrop-blur-xl bg-gradient-to-b from-neutral-800/75 to-neutral-900/90 border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 data-[state=open]:animate-toast-slide-in data-[state=closed]:animate-fade-out-scale-down data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-toast-slide-out"
				open={toastOpen}
				onOpenChange={setToastOpen}
                duration={3000}
			>
				<div className="size-8 rounded-full border border-neutral-50/10" style={{ backgroundColor: currentColor }} />
				<Toast.Description>{t("copied")}</Toast.Description>
				<Toast.Close className="inline-flex items-center justify-center size-6 hover:bg-neutral-50/10 active:bg-neutral-50/5 rounded-full duration-100 active:duration-75">
					<X className="fill-neutral-50" />
				</Toast.Close>
			</Toast.Root>
			<Toast.Viewport className="[--viewport-padding:_24px] fixed bottom-0 right-0 p-[var(--viewport-padding)] flex flex-col w-max z-60 outline-none" />
		</Toast.Provider>
	);
}
