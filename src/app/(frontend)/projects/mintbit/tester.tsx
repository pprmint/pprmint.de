"use client";
import * as Toolbar from "@radix-ui/react-toolbar";
import * as Slider from "@radix-ui/react-slider";
import { useTranslations } from "next-intl";
import { useState } from "react";
import TextAlignLeft from "@/icons/TextAlignLeft";
import TextAlignCenter from "@/icons/TextAlignCenter";
import TextAlignRight from "@/icons/TextAlignRight";
import RotateCcw from "@/icons/RotateCcw";
import Button from "@/components/ui/Button";

export default function Tester() {
	const t = useTranslations();
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
			<Toolbar.Root className="w-full md:flex border-t border-black/5 dark:border-white/5">
				<Toolbar.ToggleGroup
					type="single"
					defaultValue="center"
					value={textAlignment}
					onValueChange={(textAlignment) => {
						if (textAlignment) setTextAlignment(textAlignment);
					}}
					aria-label={t("FONTTESTER.alignment")}
					className="w-full md:w-max md:border-r border-b border-black/5 dark:border-white/5"
				>
					{[
						{ value: "text-left", ariaLabel: "Left aligned", icon: <TextAlignLeft /> },
						{ value: "text-center", ariaLabel: "Center aligned", icon: <TextAlignCenter /> },
						{ value: "text-right", ariaLabel: "Right aligned", icon: <TextAlignRight /> },
					].map((alignment) => (
						<Toolbar.ToggleItem
							key={alignment.value}
							className="inline-flex items-center justify-center size-9 data-[state=off]:text-neutral-950 dark:data-[state=off]:text-white data-[state=on]:text-white dark:data-[state=on]:text-neutral-950 data-[state=off]:hover:bg-black/5 dark:data-[state=off]:hover:bg-white/5 data-[state=off]:active:bg-black/10 data-[state=off]:dark:active:bg-white/10 data-[state=on]:bg-neutral-950 dark:data-[state=on]:bg-white duration-100"
							value={alignment.value}
							aria-label={alignment.ariaLabel}
						>
							{alignment.icon}
						</Toolbar.ToggleItem>
					))}
				</Toolbar.ToggleGroup>
				<div className="flex grow flex-col sm:flex-row">
					<div className="flex flex-col w-full sm:w-1/2 border-b border-black/5 dark:border-white/5">
						<Slider.Root
							className="group relative flex items-center select-none touch-none w-full h-9 self-center border-r border-black/5 dark:border-white/5"
							value={fontSize}
							onValueChange={setFontSize}
							min={0.5}
							max={10}
							step={0.05}
							aria-label={t("FONTTESTER.size")}
						>
							<div
								aria-hidden
								className="absolute inset-0 flex justify-between items-center px-3 pointer-events-none"
							>
								<span className="font-stretch-condensed">{t("FONTTESTER.size")}</span>
								<span className="text-neutral-950 dark:text-white font-stretch-condensed">
									{fontSize}em
								</span>
							</div>
							<Slider.Track className="relative grow h-9">
								<Slider.Range className="absolute bg-gradient-to-l from-black/5 dark:from-white/5 h-9" />
							</Slider.Track>
							<Slider.Thumb className="block h-9 w-px group-hover:w-1 active:w-4 bg-neutral-950 dark:bg-white outline-none focus-visible:outline-none duration-100" />
						</Slider.Root>
					</div>
					<div className="flex flex-col w-full sm:w-1/2 border-b border-black/5 dark:border-white/5">
						<Slider.Root
							className="group relative flex items-center select-none touch-none w-full h-9 self-center border-r border-black/5 dark:border-white/5"
							value={tracking}
							onValueChange={setTracking}
							min={-0.25}
							max={1.5}
							step={0.01}
							aria-label={t("FONTTESTER.tracking")}
						>
							<div
								aria-hidden
								className="absolute inset-0 flex justify-between items-center px-3 pointer-events-none"
							>
								<span className="font-stretch-condensed">{t("FONTTESTER.tracking")}</span>
								<span className="text-neutral-950 dark:text-white font-stretch-condensed">
									{tracking}em
								</span>
							</div>
							<Slider.Track className="relative grow h-9">
								<Slider.Range className="absolute bg-gradient-to-l from-black/5 dark:from-white/5 h-9" />
							</Slider.Track>
							<Slider.Thumb className="block h-9 w-px group-hover:w-1 active:w-4 bg-neutral-950 dark:bg-white outline-none focus-visible:outline-none duration-100" />
						</Slider.Root>
					</div>
					<div className="border-b border-black/5 dark:border-white/5 inline-flex justify-center">
						<Button
							design="transparent"
							aria-label={t("FONTTESTER.reset")}
							onClick={resetFont}
						>
							<RotateCcw className="group-hover:rotate-[-360deg] group-hover:duration-300" />
							{t("FONTTESTER.reset")}
						</Button>
					</div>
				</div>
			</Toolbar.Root>
			<textarea
				className={`flex w-full p-3 md:p-6 font-mintbit text-neutral-950 dark:text-white placeholder:text-neutral-950 dark:placeholder:text-white focus:placeholder:text-black/10 dark:focus:placeholder:text-white/10 bg-transparent focus:outline-none focus-visible:outline-none min-h-[200px] h-1/2-screen border-b border-black/5 dark:border-white/5 ${textAlignment}`}
				placeholder={t("MINTBIT.Content.Tester.pangram")}
				style={{
					fontSize: `${fontSize}em`,
					letterSpacing: `${tracking}em`,
				}}
			/>
		</>
	);
}
