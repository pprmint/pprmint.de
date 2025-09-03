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
			"#ffeff0",
			"#ffd2d4",
			"#ffb4ba",
			"#ff96a1",
			"#ff7688",
			"#f57",
			"#d8465b",
			"#9c3744",
			"#6b2b32",
			"#3e1d21",
			"#1b1212",
		],
	},
	{
		name: "yellow",
		shades: [
			"#fff7ef",
			"#ffe5cc",
			"#ffd4ac",
			"#ffc590",
			"#ffb472",
			"#fa5",
			"#c68247",
			"#8f5f37",
			"#5f4228",
			"#3c2b1d",
			"#1a1510",
		],
	},
	{
		name: "green",
		shades: [
			"#edfaf2",
			"#c6eed7",
			"#a0e1bd",
			"#7ad5a5",
			"#50c88e",
			"#0b7",
			"#17925f",
			"#1b6b47",
			"#1a4b34",
			"#162e22",
			"#0f1713",
		],
	},
	{
		name: "blue",
		shades: [
			"#edf9fc",
			"#caecf6",
			"#a6e0ef",
			"#82d4ea",
			"#55c7e3",
			"#0bd",
			"#1991aa",
			"#1d6c7e",
			"#1c4b56",
			"#182d32",
			"#101617",
		],
	},
	{
		name: "violet",
		shades: [
			"#f9f3ff",
			"#eeddff",
			"#e2c7ff",
			"#d8b2ff",
			"#c99cff",
			"#b8f",
			"#916bc4",
			"#6c5190",
			"#4a395f",
			"#2e2538",
			"#161318",
		],
	},
	{
		name: "neutral",
		shades: ["#eee", "#ddd", "#ccc", "#bbb", "#999", "#777", "#555", "#444", "#333", "#222", "#111"],
	},
];

export default function Palette() {
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
							} duration-100 ease-in-out-custom cursor-pointer active:opacity-90 active:duration-75`}
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
