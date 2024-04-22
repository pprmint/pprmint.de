"use client";
import * as Toolbar from "@radix-ui/react-toolbar";
import * as Slider from "@radix-ui/react-slider";
import { useTranslations } from "next-intl";
import { useState } from "react";
import TextAlignLeft from "src/icons/TextAlignLeft";
import TextAlignCenter from "src/icons/TextAlignCenter";
import TextAlignRight from "src/icons/TextAlignRight";
import RotateCcw from "src/icons/RotateCcw";

export default function Tester() {
	const t = useTranslations("MINTBIT");
	const [textAlignment, setTextAlignment] = useState("text-center");
	const [tracking, setTracking] = useState([0]);
	const [fontSize, setFontSize] = useState([1.5]);
	function resetFont() {
		setTextAlignment("text-center");
		setTracking([0]);
		setFontSize([1.5]);
	}
	return (
		<>
			<Toolbar.Root className="max-w-7xl mx-auto flex flex-wrap gap-6 border border-neutral-900 rounded-xl p-4 mb-5">
				<div className="flex w-full md:w-auto gap-6">
					<div className="flex flex-col">
						<Toolbar.ToggleGroup
							type="single"
							defaultValue="center"
							value={textAlignment}
							onValueChange={(textAlignment) => {
								if (textAlignment) setTextAlignment(textAlignment);
							}}
							aria-label={t("Content.Tester.alignment")}
							className="h-9 rounded-md w-max"
						>
							<Toolbar.ToggleItem
								className="size-9 border-y border-l rounded-l-md hover:text-neutral-50 hover:bg-neutral-900 data-[state=on]:hover:bg-green-400 data-[state=on]:bg-green border-neutral-900 data-[state=on]:border-green data-[state=on]:hover:border-green-400 data-[state=on]:text-green-950 active:shadow-inner active:opacity-75 duration-100"
								value="text-left"
								aria-label="Left aligned"
							>
								<TextAlignLeft className="mx-auto" />
							</Toolbar.ToggleItem>
							<Toolbar.ToggleItem
								className="size-9 border hover:text-neutral-50 hover:bg-neutral-900 data-[state=on]:hover:bg-green-400 data-[state=on]:bg-green border-neutral-900 data-[state=on]:border-green data-[state=on]:hover:border-green-400 data-[state=on]:text-green-950 active:shadow-inner active:opacity-75 duration-100"
								value="text-center"
								aria-label="Center aligned"
							>
								<TextAlignCenter className="mx-auto" />
							</Toolbar.ToggleItem>
							<Toolbar.ToggleItem
								className="size-9 border-y border-r rounded-r-md hover:text-neutral-50 hover:bg-neutral-900 data-[state=on]:hover:bg-green-400 data-[state=on]:bg-green border-neutral-900 data-[state=on]:border-green data-[state=on]:hover:border-green-400 data-[state=on]:text-green-950 active:shadow-inner active:opacity-75 duration-100"
								value="text-right"
								aria-label="Right aligned"
							>
								<TextAlignRight className="mx-auto" />
							</Toolbar.ToggleItem>
						</Toolbar.ToggleGroup>
						<sub className="pt-3 pb-2">{t("Content.Tester.alignment")}</sub>
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
							aria-label={t("Content.Tester.size")}
						>
							<Slider.Track className="relative grow rounded-full bg-neutral-900 group-hover:bg-green-700 h-px duration-100">
								<Slider.Range className="absolute bg-green-700 rounded-full h-1 -translate-y-0.5" />
							</Slider.Track>
							<Slider.Thumb className="block size-3 group-hover:size-4 focus-visible:size-4 bg-green ring-2 ring-neutral-950 rounded-full outline-none duration-100" />
						</Slider.Root>
						<sub className="pt-3 pb-2">{t("Content.Tester.size")}</sub>
					</div>
					<div className="flex flex-col w-full sm:w-1/2">
						<Slider.Root
							className="group relative flex items-center select-none touch-none w-full h-9 self-center"
							value={tracking}
							onValueChange={setTracking}
							min={-0.25}
							max={1.5}
							step={0.01}
							aria-label={t("Content.Tester.spacing")}
						>
							<Slider.Track className="relative grow rounded-full bg-neutral-900 group-hover:bg-green-700 h-px duration-100">
								<Slider.Range className="absolute bg-green-700 rounded-full h-1 -translate-y-0.5" />
							</Slider.Track>
							<Slider.Thumb className="block size-3 group-hover:size-4 focus-visible:size-4 bg-green ring-2 ring-neutral-950 rounded-full outline-none duration-100" />
						</Slider.Root>
						<sub className="pt-3 pb-2">{t("Content.Tester.spacing")}</sub>
					</div>
					<div className="flex flex-col">
						<button
							aria-label={t("Content.Tester.reset")}
							className="group text-center size-9 border-l-neutral-900 hover:border-red text-neutral hover:bg-red active:shadow-inner active:opacity-75 hover:text-neutral-950 duration-100 rounded-md"
							onClick={resetFont}
						>
							<RotateCcw className="mx-auto" />
						</button>
					</div>
				</div>
			</Toolbar.Root>
			<textarea
				className={`flex w-full p-3 md:p-6 font-mintbit text-neutral placeholder:text-neutral focus:text-neutral-50 bg-transparent focus:outline-none focus-visible:outline-none rounded-md min-h-[200px] h-1/2-screen ${textAlignment}`}
				placeholder={t("Content.Tester.pangram")}
				style={{
					fontSize: `${fontSize}em`,
					letterSpacing: `${tracking}em`,
				}}
			/>
			<hr className="border-green w-1/4 mx-auto" />
		</>
	);
}
