"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import Button from "src/components/ui/Button";
import X from "src/icons/X";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";

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

	return (
		<Toast.Provider>
			<div className="py-20 md:py-32 xl:py-40 border-x border-black/5 dark:border-white/5">
				<div
					className={`relative grid grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-16 ${
						glyphsOpen ? "max-h-[999vh]" : "max-h-2/3-screen"
					} border-y border-black/5 dark:border-white/5 duration-500 ease-in-expo overflow-hidden`}
				>
					<AnimatePresence>
						{!glyphsOpen && (
							<m.div
								initial={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="absolute flex items-center justify-center bottom-0 left-px right-px z-10 bg-gradient-to-t from-white dark:from-neutral-950 pb-6 pt-12"
							>
								<Button design="filled" color="neutral" onClick={() => setGlyphsOpen(true)}>
									{t("MINTBIT.Content.AllGlyphs.showAll")}
								</Button>
							</m.div>
						)}
					</AnimatePresence>
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
							className="aspect-square flex items-center justify-center font-mintbit text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl text-neutral-950 dark:text-white hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10 duration-100 active:duration-75 cursor-pointer select-none"
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
				</div>
			</div>
			<Toast.Root
				className="flex gap-6 items-center p-3 rounded-xl shadow-lg shadow-neutral-950/50 backdrop-blur-xl bg-gradient-to-b from-neutral-800/75 to-neutral-900/90 border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 data-[state=open]:animate-toast-slide-in data-[state=closed]:animate-fade-out-scale-down data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-toast-slide-out"
				open={toastOpen}
				onOpenChange={setToastOpen}
				duration={3000}
			>
				<Toast.Title className="text-white pt-0.5 pl-3 text-3xl font-mintbit leading-none">{currentGlyph}</Toast.Title>
				<Toast.Description>{t("COMMON.copied")}</Toast.Description>
				<Toast.Close className="inline-flex items-center justify-center size-6 hover:bg-neutral-50/10 active:bg-neutral-50/5 rounded-full duration-100 active:duration-75">
					<X className="fill-neutral-50" />
				</Toast.Close>
			</Toast.Root>
			<Toast.Viewport className="[--viewport-padding:_24px] fixed bottom-0 right-0 p-[var(--viewport-padding)] flex flex-col w-max z-60 outline-none" />
		</Toast.Provider>
	);
}
