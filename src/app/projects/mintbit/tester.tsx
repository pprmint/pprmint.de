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
			<Toolbar.Root className="w-full flex border-y border-black/5 dark:border-white/5">
				<Toolbar.ToggleGroup
					type="single"
					defaultValue="center"
					value={textAlignment}
					onValueChange={(textAlignment) => {
						if (textAlignment) setTextAlignment(textAlignment);
					}}
					aria-label={t("Content.Tester.alignment")}
					className="w-max"
				>
					{[
						{ value: "text-left", ariaLabel: "Left aligned", icon: <TextAlignLeft /> },
						{ value: "text-center", ariaLabel: "Center aligned", icon: <TextAlignCenter /> },
						{ value: "text-right", ariaLabel: "Right aligned", icon: <TextAlignRight /> },
					].map((alignment) => (
						<Toolbar.ToggleItem
							key={alignment.value}
							className="inline-flex items-center justify-center size-9 data-[state=off]:text-neutral-950 dark:data-[state=off]:text-white data-[state=on]:text-white dark:data-[state=on]:text-neutral-950 data-[state=off]:hover:bg-black/5 dark:data-[state=off]:bg-white/5 active:bg-black/10 dark:active:bg-white/10 data-[state=on]:bg-neutral-950 dark:data-[state=on]:bg-white duration-100"
							value={alignment.value}
							aria-label={alignment.ariaLabel}
						>
							{alignment.icon}
						</Toolbar.ToggleItem>
					))}
				</Toolbar.ToggleGroup>
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
				className={`flex w-full p-3 md:p-6 font-mintbit text-neutral-950 dark:text-white placeholder:text-neutral bg-transparent focus:outline-none focus-visible:outline-none rounded-md min-h-[200px] h-1/2-screen border-b border-black/5 dark:border-white/5 ${textAlignment}`}
				placeholder={t("Content.Tester.pangram")}
				style={{
					fontSize: `${fontSize}em`,
					letterSpacing: `${tracking}em`,
				}}
			/>
		</>
	);
}
