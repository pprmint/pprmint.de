"use client";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

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

export default function OldPalette() {
	const t = useTranslations("COMMON");
	return (
		<div className="dark flex flex-col lg:flex-row w-full border border-black/5 dark:border-white/5">
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
							} duration-100 ease-in-out-custom cursor-pointer active:shadow-inner active:opacity-90 active:duration-75`}
							onClick={() => {
								navigator.clipboard.writeText((shade as string).substring(1));
								toast(t("copied"), {
									description: shade as string,
									icon: (
										<div
											className="border border-black/5 dark:border-white/5 size-5 rounded-full"
											style={{ backgroundColor: shade as string }}
										/>
									),
								});
							}}
						>
							<span
								className={
									shadeIndex == 5
										? "text-4xl font-light font-stretch-expanded"
										: "opacity-0 group-hover:opacity-100 duration-150 font-stretch-expanded"
								}
							>
								{shade as string}
							</span>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
