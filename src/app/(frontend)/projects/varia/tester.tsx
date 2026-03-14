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
import Checkbox from "@/components/ui/Checkbox";

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
	const [weight, setWeight] = useState([400]);
	const [textAlignment, setTextAlignment] = useState("text-center");
	const [tracking, setTracking] = useState([0]);
	const [fontSize, setFontSize] = useState([2.5]);

	const features = ["tnum", "liga"];
	const stylisticSets = Array.from({ length: 5 }, (_, i) => `ss${String(i + 1).padStart(2, "0")}`);
	const characterVariants = Array.from({ length: 26 }, (_, i) => `cv${String(i + 1).padStart(2, "0")}`);

	const [enabledFeatures, setEnabledFeatures] = useState<string[]>([]);
	function toggleFeature(feature: string) {
		setEnabledFeatures((prev) => (prev.includes(feature) ? prev.filter((v) => v !== feature) : [...prev, feature]));
	}

	function resetFont() {
		setWeight([400]);
		setTextAlignment("text-center");
		setTracking([0]);
		setFontSize([2.5]);
		setEnabledFeatures([]);
	}
	return (
		<div className="2xl:flex">
			<div className="2xl:order-1 w-full h-max">
				<Toolbar.Root className="w-full lg:flex border-t border-black/5 dark:border-white/5">
					<div className="flex w-full lg:w-auto">
						<Toolbar.ToggleGroup
							type="single"
							defaultValue="center"
							value={textAlignment}
							onValueChange={(textAlignment) => {
								if (textAlignment) setTextAlignment(textAlignment);
							}}
							aria-label={t("FONTTESTER.Alignment.label")}
							className="flex w-full lg:w-max lg:border-r border-b border-black/5 dark:border-white/5"
						>
							{[
								{
									value: "text-left",
									ariaLabel: t("FONTTESTER.Alignment.left"),
									icon: <TextAlignLeft />,
								},
								{
									value: "text-center",
									ariaLabel: t("FONTTESTER.Alignment.center"),
									icon: <TextAlignCenter />,
								},
								{
									value: "text-right",
									ariaLabel: t("FONTTESTER.Alignment.right"),
									icon: <TextAlignRight />,
								},
							].map((alignment) => (
								<Toolbar.ToggleItem
									key={alignment.value}
									className="inline-flex items-center justify-center h-9 w-full lg:w-9 gap-3 data-[state=off]:text-neutral-950 dark:data-[state=off]:text-white data-[state=on]:text-white dark:data-[state=on]:text-neutral-950 data-[state=off]:hover:bg-black/5 dark:data-[state=off]:hover:bg-white/5 data-[state=off]:active:bg-black/10 dark:data-[state=off]:active:bg-white/10 data-[state=on]:bg-neutral-950 dark:data-[state=on]:bg-white duration-100"
									value={alignment.value}
									aria-label={alignment.ariaLabel}
								>
									{alignment.icon}
									<span aria-hidden className="hidden sm:block lg:hidden">
										{alignment.ariaLabel}
									</span>
								</Toolbar.ToggleItem>
							))}
						</Toolbar.ToggleGroup>
					</div>
					<div className="flex flex-col w-full lg:w-1/2 border-b border-black/5 dark:border-white/5">
						<Slider.Root
							className="group relative flex items-center select-none touch-none w-full h-9 self-center lg:border-r border-black/5 dark:border-white/5"
							value={weight}
							onValueChange={setWeight}
							min={100}
							max={900}
							step={1}
							aria-label={t("FONTTESTER.Weight.label")}
						>
							<div
								aria-hidden
								className="absolute inset-0 flex justify-between items-center px-3 pointer-events-none"
							>
								<span>{t("FONTTESTER.Weight.label")}</span>
								<span className="text-neutral-950 dark:text-white">{weight}</span>
							</div>
							<Slider.Track className="relative grow h-9">
								<Slider.Range className="absolute bg-linear-to-l from-black/5 dark:from-white/5 h-9" />
							</Slider.Track>
							<Slider.Thumb className="block h-9 w-px group-hover:w-1 active:w-1 bg-neutral-950 dark:bg-white outline-hidden focus-visible:outline-hidden duration-100" />
						</Slider.Root>
					</div>
					<div className="flex flex-col w-full lg:w-1/2 border-b border-black/5 dark:border-white/5">
						<Slider.Root
							className="group relative flex items-center select-none touch-none w-full h-9 self-center lg:border-r border-black/5 dark:border-white/5"
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
								<span>{t("FONTTESTER.size")}</span>
								<span className="text-neutral-950 dark:text-white">{fontSize}em</span>
							</div>
							<Slider.Track className="relative grow h-9">
								<Slider.Range className="absolute bg-linear-to-l from-black/5 dark:from-white/5 h-9" />
							</Slider.Track>
							<Slider.Thumb className="block h-9 w-px group-hover:w-1 active:w-1 bg-neutral-950 dark:bg-white outline-hidden focus-visible:outline-hidden duration-100" />
						</Slider.Root>
					</div>
					<div className="flex flex-col w-full lg:w-1/2 border-b border-black/5 dark:border-white/5">
						<Slider.Root
							className="group relative flex items-center select-none touch-none w-full h-9 self-center lg:border-r border-black/5 dark:border-white/5"
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
								<span>{t("FONTTESTER.tracking")}</span>
								<span className="text-neutral-950 dark:text-white">{tracking}em</span>
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
					className={`flex w-full p-3 md:p-6 font-varia text-neutral-950 dark:text-white placeholder:text-neutral-950 dark:placeholder:text-white focus:placeholder:text-black/10 dark:focus:placeholder:text-white/10 bg-transparent focus:outline-hidden focus-visible:outline-hidden min-h-[200px] h-1/2-screen border-b border-black/5 dark:border-white/5 ${textAlignment}`}
					placeholder={t("VARIA.Content.Tester.pangram")}
					style={{
						fontWeight: weight as unknown as number,
						fontSize: `${fontSize as unknown as number}em`,
						letterSpacing: `${tracking as unknown as number}em`,
						fontVariantLigatures: "none",
						fontFeatureSettings:
							enabledFeatures.length > 0
								? `${enabledFeatures.map((feature) => `"${feature}"`).join(", ")}`
								: "normal",
					}}
				/>
			</div>
			<div className="2xl:order-0 relative grow 2xl:w-1/4 overflow-hidden">
				<div className="2xl:absolute inset-0 overflow-auto px-6 pb-6 border-b 2xl:border-t 2xl:border-r border-black/5 dark:border-white/5">
					<p className="mt-5 text-neutral-950 dark:text-white text-xl text-left">
						{t("VARIA.Content.Tester.Features.label")}
					</p>
					{features.map((feature) => (
						<div key={feature} className="mt-3 flex gap-3 text-left leading-4.5 items-center">
							<Checkbox
								id={feature}
								border
								checked={enabledFeatures.includes(feature)}
								onCheckedChange={() => toggleFeature(feature)}
							/>
							<label htmlFor={feature}>
								{t(`VARIA.Content.Tester.Features.${feature}`)}
								<span className="ml-1 text-xs opacity-50">{feature}</span>
							</label>
						</div>
					))}
					<p className="mt-5 text-neutral-950 dark:text-white text-xl text-left">
						{t("VARIA.Content.Tester.StylisticSets.label")}
					</p>
					{stylisticSets.map((stylisticSet) => (
						<div key={stylisticSet} className="mt-3 flex gap-3 text-left leading-4.5 items-center">
							<Checkbox
								id={stylisticSet}
								border
								checked={enabledFeatures.includes(stylisticSet)}
								onCheckedChange={() => toggleFeature(stylisticSet)}
							/>
							<label htmlFor={stylisticSet}>
								{t(`VARIA.Content.Tester.StylisticSets.${stylisticSet}`)}
								<span className="ml-1 text-xs opacity-50">{stylisticSet}</span>
							</label>
						</div>
					))}
					<p className="mt-5 text-neutral-950 dark:text-white text-xl text-left">
						{t("VARIA.Content.Tester.CharacterVariants.label")}
					</p>
					{characterVariants.map((characterVariant) => (
						<div key={characterVariant} className="mt-3 flex gap-3 text-left leading-4.5 items-center">
							<Checkbox
								id={characterVariant}
								border
								checked={enabledFeatures.includes(characterVariant)}
								onCheckedChange={() => toggleFeature(characterVariant)}
							/>
							<label htmlFor={characterVariant}>
								{t(`VARIA.Content.Tester.CharacterVariants.${characterVariant}`)}
								<span className="ml-1 text-xs opacity-50">{characterVariant}</span>
							</label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
