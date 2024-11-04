"use client";
import { config, useTransition, a } from "@react-spring/web";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import Button from "src/components/ui/Button";
import X from "src/icons/X";

export default function Glyphs() {
	const t = useTranslations();

	// Toasts for copying glyphs.
	const [toastOpen, setToastOpen] = useState(false);
	const timerRef = useRef(0);
	const [currentGlyph, setCurrentGlyph] = useState("");

	useEffect(() => {
		return () => clearTimeout(timerRef.current);
	}, []);

	const [glyphsOpen, setGlyphsOpen] = useState(false);
	const showAllGlyphsButtonTransition = useTransition(glyphsOpen, {
		from: { opacity: 1 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: config.stiff,
	});

	return (
		<Toast.Provider>
			<section
				className={`relative grid grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-16 py-20 ${
					glyphsOpen ? "max-h-[999vh]" : "max-h-2/3-screen"
				} duration-500 ease-in-expo overflow-hidden`}
			>
				{showAllGlyphsButtonTransition((style, item) =>
					!item ? (
						// @ts-expect-error
						<a.div
							style={style}
							className="absolute flex items-center justify-center bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-neutral-950 py-6"
						>
							<Button onClick={() => setGlyphsOpen(true)}>{t("MINTBIT.Content.AllGlyphs.showAll")}</Button>
						</a.div>
					) : null
				)}
				{[
					"!",
					'"',
					"#",
					"$",
					"%",
					"&",
					"'",
					"(",
					")",
					"*",
					"+",
					",",
					"-",
					".",
					"/",
					"0",
					"1",
					"2",
					"3",
					"4",
					"5",
					"6",
					"7",
					"8",
					"9",
					":",
					";",
					"<",
					"=",
					">",
					"?",
					"@",
					"A",
					"B",
					"C",
					"D",
					"E",
					"F",
					"G",
					"H",
					"I",
					"J",
					"K",
					"L",
					"M",
					"N",
					"O",
					"P",
					"Q",
					"R",
					"S",
					"T",
					"U",
					"V",
					"W",
					"X",
					"Y",
					"Z",
					"[",
					"\\",
					"]",
					"^",
					"_",
					"`",
					"a",
					"b",
					"c",
					"d",
					"e",
					"f",
					"g",
					"h",
					"i",
					"j",
					"k",
					"l",
					"m",
					"n",
					"o",
					"p",
					"q",
					"r",
					"s",
					"t",
					"u",
					"v",
					"w",
					"x",
					"y",
					"z",
					"{",
					"|",
					"}",
					"~",
					"€",
					"‚",
					"ƒ",
					"„",
					"…",
					"†",
					"‡",
					"ˆ",
					"‰",
					"Š",
					"‹",
					"Œ",
					"Ž",
					"‘",
					"’",
					"“",
					"”",
					"•",
					"–",
					"—",
					"˜",
					"™",
					"š",
					"›",
					"œ",
					"ž",
					"Ÿ",
					"¡",
					"¢",
					"£",
					"¤",
					"¥",
					"¦",
					"§",
					"¨",
					"©",
					"ª",
					"«",
					"¬",
					"®",
					"¯",
					"°",
					"±",
					"²",
					"³",
					"´",
					"µ",
					"¶",
					"·",
					"¸",
					"¹",
					"º",
					"»",
					"¼",
					"½",
					"¾",
					"¿",
					"À",
					"Á",
					"Â",
					"Ã",
					"Ä",
					"Å",
					"Æ",
					"Ç",
					"È",
					"É",
					"Ê",
					"Ë",
					"Ì",
					"Í",
					"Î",
					"Ï",
					"Ð",
					"Ñ",
					"Ò",
					"Ó",
					"Ô",
					"Õ",
					"Ö",
					"×",
					"Ø",
					"Ù",
					"Ú",
					"Û",
					"Ü",
					"Ý",
					"Þ",
					"ß",
					"à",
					"á",
					"â",
					"ã",
					"ä",
					"å",
					"æ",
					"ç",
					"è",
					"é",
					"ê",
					"ë",
					"ì",
					"í",
					"î",
					"ï",
					"ð",
					"ñ",
					"ò",
					"ó",
					"ô",
					"õ",
					"ö",
					"÷",
					"ø",
					"ù",
					"ú",
					"û",
					"ü",
					"ý",
					"þ",
					"ÿ",
				].map((glyph, index) => (
					<div
						className="aspect-square flex items-center justify-center font-mintbit text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl text-white hover:bg-neutral-900 hover:scale-110 active:scale-105 active:opacity-75 hover:rounded-md hover:ring-1 ring-neutral-800 hover:shadow-xl hover:shadow-neutral-950/50 duration-200 active:duration-75 ease-out-quint cursor-pointer select-none"
						key={index}
						onClick={() => {
							navigator.clipboard.writeText(glyph);
							setToastOpen(false);
							window.clearTimeout(timerRef.current);
							timerRef.current = window.setTimeout(() => {
								setCurrentGlyph(glyph);
								setToastOpen(true);
							}, 100);
						}}
					>
						{glyph}
					</div>
				))}
			</section>
			<Toast.Root
				className="flex gap-6 items-center p-3 rounded-xl shadow-lg bg-elevate ring-1 ring-black/10 dark:ring-black/50 outline outline-1 outline-white/10 -outline-offset-1 data-[state=open]:animate-toast-slide-in data-[state=closed]:animate-fade-out-scale-down data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-toast-slide-out"
				open={toastOpen}
				onOpenChange={setToastOpen}
				duration={3000}
			>
				<Toast.Title className="text-neutral-50 pt-0.5 pl-3 text-3xl font-mintbit leading-none">{currentGlyph}</Toast.Title>
				<Toast.Description>{t("COMMON.copied")}</Toast.Description>
				<Toast.Close className="inline-flex items-center justify-center size-6 hover:bg-neutral-50/10 active:bg-neutral-50/5 rounded-full duration-100 active:duration-75">
					<X className="fill-neutral-50" />
				</Toast.Close>
			</Toast.Root>
			<Toast.Viewport className="[--viewport-padding:_24px] fixed bottom-0 right-0 p-[var(--viewport-padding)] flex flex-col w-max z-60 outline-none" />
		</Toast.Provider>
	);
}
