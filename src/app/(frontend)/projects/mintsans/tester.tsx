"use client";
import * as Toolbar from "@radix-ui/react-toolbar";
import * as Slider from "@radix-ui/react-slider";
import * as Select from "@radix-ui/react-select";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Check from "@/icons/Check";
import ChevronDown from "@/icons/ChevronDown";
import ChevronUp from "@/icons/ChevronUp";
import TextAlignLeft from "@/icons/TextAlignLeft";
import TextAlignCenter from "@/icons/TextAlignCenter";
import TextAlignRight from "@/icons/TextAlignRight";
import RotateCcw from "@/icons/RotateCcw";
import Button from "@/components/ui/Button";

export default function Tester() {
	// For dropdowns.
	function SelectItem(props: React.PropsWithChildren<{ value: string }>) {
		return (
			<Select.Item
				value={props.value}
				className="group relative flex items-center gap-3 pr-2 pl-2 h-7 leading-none select-none outline-hidden data-disabled:text-black/25 dark:data-disabled:text-white/25 data-disabled:pointer-events-none data-highlighted:text-neutral-950 dark:data-highlighted:text-white data-[state=checked]:text-neutral-950 dark:data-[state=checked]:text-white data-highlighted:bg-black/10 dark:data-highlighted:bg-white/10 active:opacity-75 duration-100 cursor-pointer focus-visible:outline-hidden"
			>
				<Select.ItemText className="grow">{props.children}</Select.ItemText>
				<Select.ItemIndicator className="ml-auto">
					<Check />
				</Select.ItemIndicator>
			</Select.Item>
		);
	}

	const t = useTranslations();
	const [weight, setWeight] = useState("400");
	const [textAlignment, setTextAlignment] = useState("text-center");
	const [tracking, setTracking] = useState([0]);
	const [fontSize, setFontSize] = useState([1.5]);
	function resetFont() {
		setWeight("400");
		setTextAlignment("text-center");
		setTracking([0]);
		setFontSize([1.5]);
	}
	return (
		<>
			<Toolbar.Root className="w-full md:flex border-t border-black/5 dark:border-white/5">
				<div className="flex w-full md:w-auto">
					<div className="grow md:grow-0 md:w-40 border-b border-r border-black/5 dark:border-white/5">
						<Select.Root value={weight} onValueChange={setWeight}>
							<Select.Trigger
								className="group flex items-center justify-between px-3 h-9 w-full hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-950 dark:hover:text-white active:shadow-inner duration-100"
								aria-label={t("FONTTESTER.Weight.label")}
							>
								<Select.Value aria-label={weight} />
								<Select.Icon className="ml-auto group-hover:translate-y-0.5 duration-100">
									<ChevronDown />
								</Select.Icon>
							</Select.Trigger>
							<Select.Portal>
								<Select.Content className="z-50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/5 shadow-lg data-[state=open]:animate-fade-in">
									<Select.ScrollUpButton className="absolute z-50 top-0 left-0 right-0 flex justify-center bg-linear-to-b from-white/50 dark:from-neutral-900/50 text-neutral-950 dark:text-white rounded-t-md">
										<ChevronUp />
									</Select.ScrollUpButton>
									<Select.Viewport className="p-1">
										<Select.Group>
											<SelectItem value="200">{t("FONTTESTER.Weight.extralight")}</SelectItem>
											<SelectItem value="400">{t("FONTTESTER.Weight.regular")}</SelectItem>
											<SelectItem value="700">{t("FONTTESTER.Weight.bold")}</SelectItem>
										</Select.Group>
									</Select.Viewport>
									<Select.ScrollDownButton className="absolute z-50 bottom-0 left-0 right-0 flex justify-center bg-linear-to-t from-white/50 dark:from-neutral-900/50 text-neutral-950 dark:text-white rounded-b-md">
										<ChevronDown />
									</Select.ScrollDownButton>
								</Select.Content>
							</Select.Portal>
						</Select.Root>
					</div>
					<Toolbar.ToggleGroup
						type="single"
						defaultValue="center"
						value={textAlignment}
						onValueChange={(textAlignment) => {
							if (textAlignment) setTextAlignment(textAlignment);
						}}
						aria-label={t("FONTTESTER.alignment")}
						className="w-max md:border-r border-b border-black/5 dark:border-white/5"
					>
						{[
							{ value: "text-left", ariaLabel: "Left aligned", icon: <TextAlignLeft /> },
							{ value: "text-center", ariaLabel: "Center aligned", icon: <TextAlignCenter /> },
							{ value: "text-right", ariaLabel: "Right aligned", icon: <TextAlignRight /> },
						].map((alignment) => (
							<Toolbar.ToggleItem
								key={alignment.value}
								className="inline-flex items-center justify-center size-9 data-[state=off]:text-neutral-950 dark:data-[state=off]:text-white data-[state=on]:text-white dark:data-[state=on]:text-neutral-950 data-[state=off]:hover:bg-black/5 dark:data-[state=off]:hover:bg-white/5 data-[state=off]:active:bg-black/10 dark:data-[state=off]:active:bg-white/10 data-[state=on]:bg-neutral-950 dark:data-[state=on]:bg-white duration-100"
								value={alignment.value}
								aria-label={alignment.ariaLabel}
							>
								{alignment.icon}
							</Toolbar.ToggleItem>
						))}
					</Toolbar.ToggleGroup>
				</div>
				<div className="flex flex-col w-full md:w-1/2 border-b border-black/5 dark:border-white/5">
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
							<Slider.Range className="absolute bg-linear-to-l from-black/5 dark:from-white/5 h-9" />
						</Slider.Track>
						<Slider.Thumb className="block h-9 w-px group-hover:w-1 active:w-1 bg-neutral-950 dark:bg-white outline-hidden focus-visible:outline-hidden duration-100" />
					</Slider.Root>
				</div>
				<div className="flex flex-col w-full md:w-1/2 border-b border-black/5 dark:border-white/5">
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
							<Slider.Range className="absolute bg-linear-to-l from-black/5 dark:from-white/5 h-9" />
						</Slider.Track>
						<Slider.Thumb className="block h-9 w-px group-hover:w-1 active:w-1 bg-neutral-950 dark:bg-white outline-hidden focus-visible:outline-hidden duration-100" />
					</Slider.Root>
				</div>
				<div className="w-full md:w-max border-b border-black/5 dark:border-white/5 inline-flex justify-center">
					<Button design="transparent" aria-label={t("FONTTESTER.reset")} onClick={resetFont}>
						<RotateCcw className="group-hover:rotate-[-360deg] group-hover:duration-300" />
						{t("FONTTESTER.reset")}
					</Button>
				</div>
			</Toolbar.Root>
			<textarea
				className={`flex w-full p-3 md:p-6 font-mintsans text-neutral-950 dark:text-white placeholder:text-neutral-950 dark:placeholder:text-white focus:placeholder:text-black/10 dark:focus:placeholder:text-white/10 bg-transparent focus:outline-hidden focus-visible:outline-hidden min-h-[200px] h-1/2-screen border-b border-black/5 dark:border-white/5 ${textAlignment}`}
				placeholder={t("MINTSANS.Content.Tester.pangram")}
				style={{
					fontWeight: weight,
					fontSize: `${fontSize as unknown as number}em`,
					letterSpacing: `${tracking as unknown as number}em`,
				}}
			/>
		</>
	);
}
