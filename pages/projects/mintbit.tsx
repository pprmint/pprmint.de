import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import * as Slider from "@radix-ui/react-slider";
import * as Toast from "@radix-ui/react-toast";
import * as Toolbar from "@radix-ui/react-toolbar";
import { useTransition, config, a } from "@react-spring/web";

import Head from "components/Head";
import Button from "components/Button";
import FadingImage from "components/FadingImage";

import Title from "components/Title";

import TitleBackground from "public/assets/mintbit/title.svg";

const Glyphs = [
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
];

export default function Mintbit() {
	const { t } = useTranslation();

	const [glyphsOpen, setGlyphsOpen] = useState(false);
	const [textAlignment, setTextAlignment] = useState("text-center");
	const [tracking, setTracking] = useState([0]);
	const [fontSize, setFontSize] = useState([1.5]);
	function resetFont() {
		setTextAlignment("text-center");
		setTracking([0]);
		setFontSize([1.5]);
	}

	// Toast
	const [open, setOpen] = useState(false);
	const timerRef = useRef(0);
	const [currentGlyph, setCurrentGlyph] = useState("");

	useEffect(() => {
		return () => clearTimeout(timerRef.current);
	}, []);

	const showAllGlyphsButtonTransition = useTransition(glyphsOpen, {
		from: { opacity: 1 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
        config: config.stiff,
	});

	return (
		<>
			<Head
				title={t("MINTBIT:Head.title")}
				description={t("MINTBIT:Head.description")}
				image="https://pprmint.art/assets/mintbit/embed.png"
			/>
			<Title title={t("MINTBIT:Head.title")} description={t("MINTBIT:Head.description")}>
				<FadingImage src={TitleBackground} alt="" fill imageClassName="object-cover" />
			</Title>
			<main>
				<Toast.Provider swipeDirection="right">
					<section
						className={`relative grid grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-16 py-16 ${
							glyphsOpen ? "max-h-[999vh]" : "max-h-2/3-screen"
						} duration-500 ease-in-expo overflow-hidden`}
					>
						{showAllGlyphsButtonTransition((style, item) =>
							!item ? (
								<a.div
									style={style}
									className="absolute flex items-center justify-center bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-neutral-950 py-6"
								>
									<Button onClick={() => setGlyphsOpen(true)}>{t("MINTBIT:Content.AllGlyphs.showAll")}</Button>
								</a.div>
							) : null
						)}
						{Glyphs.map((glyph, index) => (
							<div
								className="aspect-square flex items-center justify-center font-mintbit text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl text-white hover:bg-neutral-900 hover:scale-125 active:scale-110 hover:rounded-md border border-neutral-900 hover:border-neutral-800 hover:shadow-xl hover:shadow-neutral-950/50 duration-200 active:duration-50 ease-out-quint cursor-pointer"
								key={index}
								onClick={() => {
									navigator.clipboard.writeText(glyph);
									setOpen(false);
									window.clearTimeout(timerRef.current);
									timerRef.current = window.setTimeout(() => {
										setCurrentGlyph(glyph);
										setOpen(true);
									}, 100);
								}}
							>
								{glyph}
							</div>
						))}
					</section>
					<Toast.Root
						className="flex gap-6 items-center p-3 pl-6 rounded-xl shadow-lg shadow-neutral-950/50 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 data-[state=open]:animate-toast-slide-in data-[state=closed]:animate-fade-out-scale-down data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-toast-slide-out"
						open={open}
						onOpenChange={setOpen}
					>
						<Toast.Title className="text-neutral-50 text-3xl font-mintbit leading-none">
							{currentGlyph}
						</Toast.Title>
						<Toast.Description>{t("COMMON:copied")}</Toast.Description>
						<Toast.Close className="hover:bg-neutral-50/10 active:bg-neutral-50/5 rounded-full duration-100">
							<i className="ri-close-line text-neutral-50 p-1" />
						</Toast.Close>
					</Toast.Root>
					<Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 p-[var(--viewport-padding)] flex flex-col w-max z-50 outline-none" />
					<div className="my-16 px-6 md:px-9 py-5">
						<h2 className="max-w-7xl mx-auto">
							{t("MINTBIT:Content.Tester.heading")}
						</h2>
						<Toolbar.Root className="max-w-7xl mx-auto flex flex-wrap gap-6 bg-neutral-900 border border-neutral-800 rounded-xl p-4 mb-5">
							<div className="flex w-full md:w-auto gap-6">
								<div className="flex flex-col">
									<Toolbar.ToggleGroup
										type="single"
										defaultValue="center"
										value={textAlignment}
										onValueChange={(textAlignment) => {
											if (textAlignment) setTextAlignment(textAlignment);
										}}
										aria-label={t("MINTBIT:Content.Tester.alignment")}
										className="h-9 rounded-md w-max"
									>
										<Toolbar.ToggleItem
											className="h-9 w-9 border-y border-l rounded-l-md hover:text-neutral-50 hover:bg-neutral-800 data-[state=on]:bg-green border-neutral-800 data-[state=on]:border-green data-[state=on]:text-neutral-950 duration-100"
											value="text-left"
											aria-label="Left aligned"
										>
											<i className="ri-align-left" />
										</Toolbar.ToggleItem>
										<Toolbar.ToggleItem
											className="h-9 w-9 border hover:text-neutral-50 hover:bg-neutral-800 data-[state=on]:bg-green border-neutral-800 data-[state=on]:border-green data-[state=on]:text-neutral-950 duration-100"
											value="text-center"
											aria-label="Center aligned"
										>
											<i className="ri-align-center" />
										</Toolbar.ToggleItem>
										<Toolbar.ToggleItem
											className="h-9 w-9 border-y border-r rounded-r-md hover:text-neutral-50 hover:bg-neutral-800 data-[state=on]:bg-green border-neutral-800 data-[state=on]:border-green data-[state=on]:text-neutral-950 duration-100"
											value="text-right"
											aria-label="Right aligned"
										>
											<i className="ri-align-right" />
										</Toolbar.ToggleItem>
									</Toolbar.ToggleGroup>
									<sub className="pt-3 pb-2">{t("MINTBIT:Content.Tester.alignment")}</sub>
								</div>
							</div>
							<div className="flex grow flex-col sm:flex-row gap-6">
								<div className="flex flex-col w-full sm:w-1/2">
									<Slider.Root
										className="group relative flex items-center select-none touch-none w-full h-9 self-center"
										value={fontSize}
										onValueChange={setFontSize}
										min={0.5}
										max={10}
										step={0.05}
										aria-label={t("MINTBIT:Content.Tester.size")}
									>
										<Slider.Track className="relative grow rounded-full bg-green-800 group-hover:bg-green-700 h-[2px] duration-100">
											<Slider.Range className="absolute bg-green-700 rounded-full h-full" />
										</Slider.Track>
										<Slider.Thumb className="block w-1 h-4 group-hover:h-6 focus-visible:h-6 bg-green ring-2 ring-neutral-900 rounded-full outline-none duration-100" />
									</Slider.Root>
									<sub className="pt-3 pb-2">{t("MINTBIT:Content.Tester.size")}</sub>
								</div>
								<div className="flex flex-col w-full sm:w-1/2">
									<Slider.Root
										className="group relative flex items-center select-none touch-none w-full h-9 self-center"
										value={tracking}
										onValueChange={setTracking}
										min={-0.25}
										max={1.5}
										step={0.01}
										aria-label={t("MINTBIT:Content.Tester.spacing")}
									>
										<Slider.Track className="relative grow rounded-full bg-green-800 group-hover:bg-green-700 h-[2px] duration-100">
											<Slider.Range className="absolute bg-green-700 rounded-full h-full" />
										</Slider.Track>
										<Slider.Thumb className="block w-1 h-4 group-hover:h-6 focus-visible:h-6 bg-green ring-2 ring-neutral-900 rounded-full outline-none duration-100" />
									</Slider.Root>
									<sub className="pt-3 pb-2">{t("MINTBIT:Content.Tester.spacing")}</sub>
								</div>
								<div className="flex flex-col">
									<button
										aria-label={t("MINTBIT:Content.Tester.reset")}
										className="group h-9 w-9 text-neutral hover:bg-red active:bg-red-600 hover:text-neutral-950 duration-100 rounded-md"
										onClick={resetFont}
									>
										<i className="ri-loop-left-line" />
									</button>
								</div>
							</div>
						</Toolbar.Root>
						<textarea
							className={`flex w-full p-3 md:p-6 font-mintbit text-neutral placeholder:text-neutral focus:text-neutral-50 bg-transparent focus:outline-none focus-visible:outline-none rounded-md min-h-[200px] h-1/2-screen ${textAlignment}`}
							placeholder={t("MINTBIT:Content.Tester.pangram")}
							style={{
								fontSize: `${fontSize}em`,
								letterSpacing: `${tracking}em`,
							}}
						/>
                        <hr className="border-green w-1/4 mx-auto" />
					</div>
					<div className="my-16 max-w-7xl mx-auto px-6 md:px-9 py-5">
						<h2>
							{t("MINTBIT:Content.Download.heading")}
						</h2>
						<p>{t("MINTBIT:Content.Download.text")}</p>
						<br />
						<Link href="https://static.pprmint.art/download/Mintbit/Mintbit_1.1.zip">
							<Button color="green">
								{t("COMMON:download")}
								<i className="ri-download-line" />
							</Button>
						</Link>
					</div>
				</Toast.Provider>
			</main>
		</>
	);
}
