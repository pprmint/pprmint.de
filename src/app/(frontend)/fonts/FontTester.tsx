"use client";
import Select from "@/components/ui/Select";
import Slider from "@/components/ui/Slider";
import Checkbox from "@/components/ui/Checkbox";
import TextItalic from "@/icons/TextItalic";
import TextItalicGerman from "@/icons/TextItalicGerman";
import { useLocale, useTranslations } from "next-intl";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { useState } from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import * as Collapsible from "@radix-ui/react-collapsible";
import TextAlignLeft from "@/icons/TextAlignLeft";
import TextAlignCenter from "@/icons/TextAlignCenter";
import TextAlignRight from "@/icons/TextAlignRight";
import Button from "@/components/ui/Button";
import ChevronDown from "@/icons/ChevronDown";

export default function FontTester(props: {
	font: NextFontWithVariable;
	variable?: boolean;
	styles: {
		tag: string;
		steps: number[];
		initial?: number;
	}[];
	hasItalic?: boolean;
	pangram:
		| string
		| {
				en: string;
				de: string;
		  };
	features?: string[];
	stylisticSets?: {
		tag: string;
		label: {
			en: string;
			de: string;
		};
	}[];
	characterVariants?: {
		tag: string;
		label: {
			en: string;
			de: string;
		};
	}[];
}) {
	const t = useTranslations("FONT");
	const locale = useLocale() as "en" | "de";

	const [textAlignment, setTextAlignment] = useState("text-center");
	const [fontSize, setFontSize] = useState([2.5]);
	const [italic, setItalic] = useState(false);

	const [values, setValues] = useState(props.styles.map((style) => style.initial ?? style.steps[0]));
	function updateStyle(index: number, value: number) {
		setValues((prev) => prev.map((v, i) => (i === index ? value : v)));
	}

	const hasFeatures = props.features || props.stylisticSets || props.characterVariants;
	const [showFeatures, setShowFeatures] = useState(true);

	const [enabledFeatures, setEnabledFeatures] = useState<string[]>([]);
	function toggleFeature(feature: string) {
		setEnabledFeatures((prev) => (prev.includes(feature) ? prev.filter((v) => v !== feature) : [...prev, feature]));
	}

	return (
		<section className="2xl:flex">
			<div className="2xl:order-1 w-full h-max">
				<Toolbar.Root className="w-full lg:flex border-y border-black/5 dark:border-white/5">
					{props.variable
						? props.styles.map((style, i) => (
								<div
									className="w-full lg:border-r border-b lg:border-b-0 border-black/5 dark:border-white/5"
									key={style.tag}
								>
									<Slider
										label={t(`Axis.${style.tag}`)}
										value={[values[i]]}
										onValueChange={([sliderIndex]) => {
											updateStyle(i, sliderIndex);
										}}
										step={1}
										min={style.steps[0]}
										max={style.steps[style.steps.length - 1]}
									/>
								</div>
							))
						: props.styles.reduce((total, style) => {
								return total * style.steps.length;
							}, 1) > 1 &&
							props.styles.map((style, i) => (
								<>
									<div
										key={style.tag}
										className="w-full lg:w-72 lg:border-r border-b lg:border-b-0 border-black/5 dark:border-white/5"
									>
										<Select
											label={t(`Axis.${style.tag}`)}
											selected={{
												value: String(values[props.styles.findIndex((i) => i.tag === style.tag)]),
												label: t(`Weight.${values[props.styles.findIndex((i) => i.tag === style.tag)]}`),
											}}
											options={style.steps.map((step) => ({
												value: String(step),
												label: t(`Weight.${step}`),
											}))}
											onValueChange={(value) => {
												updateStyle(i, parseInt(value));
											}}
										/>
									</div>
								</>
							))}
					<div className="w-full lg:border-r border-b lg:border-b-0 border-black/5 dark:border-white/5">
						<Slider
							label={t("size")}
							value={fontSize}
							unit="rem"
							onValueChange={(value) => setFontSize(value)}
							step={0.1}
							min={0.5}
							max={15}
						/>
					</div>
					<div className="w-full lg:w-max flex items-center border-black/5 dark:border-white/5">
						{props.hasItalic && (
							<div className="border-r border-black/5 dark:border-white/5">
								<Button design={italic ? "filled" : "transparent"} onClick={() => setItalic(!italic)}>
									{locale === "de" ? <TextItalicGerman className="mx-auto" /> : <TextItalic className="mx-auto" />}
									{t("Style.italic")}
								</Button>
							</div>
						)}
						<Toolbar.ToggleGroup
							type="single"
							defaultValue="center"
							value={textAlignment}
							onValueChange={(textAlignment) => {
								if (textAlignment) setTextAlignment(textAlignment);
							}}
							aria-label={t("Alignment.label")}
							className={`flex grow lg:w-max`}
						>
							{[
								{
									value: "text-left",
									ariaLabel: t("Alignment.left"),
									icon: <TextAlignLeft />,
								},
								{
									value: "text-center",
									ariaLabel: t("Alignment.center"),
									icon: <TextAlignCenter />,
								},
								{
									value: "text-right",
									ariaLabel: t("Alignment.right"),
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
				</Toolbar.Root>
				<textarea
					className={`flex w-full p-3 md:p-6 text-neutral-950 dark:text-white placeholder:text-neutral-950 dark:placeholder:text-white focus:placeholder:text-black/10 dark:focus:placeholder:text-white/10 bg-transparent focus:outline-hidden focus-visible:outline-hidden min-h-50 h-100 border-b border-black/5 dark:border-white/5 ${textAlignment}`}
					placeholder={typeof props.pangram === "string" ? props.pangram : props.pangram[locale ?? "en"]}
					style={{
						fontFamily: props.font.style.fontFamily,
						fontStyle: italic ? "italic" : "normal",
						...(props.variable
							? { fontVariationSettings: props.styles.map((style, i) => `'${style.tag}' ${values[i]}`).join(", ") }
							: { fontWeight: `${values[props.styles.findIndex((i) => i.tag === "wght")]}` }),
						fontSize: `${fontSize}rem`,
						fontVariantLigatures: "none",
						fontFeatureSettings:
							enabledFeatures.length > 0 ? `${enabledFeatures.map((feature) => `"${feature}"`).join(", ")}` : "normal",
					}}
				/>
			</div>
			{hasFeatures && (
				<div className="2xl:order-0 grow w-full 2xl:w-max 2xl:max-w-md">
					<Collapsible.Root
						open={showFeatures}
						onOpenChange={setShowFeatures}
						className="relative size-full 2xl:data-[state=open]:w-md 2xl:data-[state=closed]:w-9.25 overflow-hidden border-b 2xl:border-t 2xl:border-r border-black/5 dark:border-white/5"
						style={{
							transition: "height 0.3s cubic-bezier(0.5, 0, 0.17, 1), width 0.3s cubic-bezier(0.5, 0, 0.17, 1)",
						}}
					>
						<Collapsible.Content className="data-[state=open]:pb-6 2xl:absolute 2xl:inset-y-0 2xl:inset-x-0 2xl:w-102.75 overflow-hidden 2xl:overflow-auto px-6 data-[state=open]:animate-collapsible-vertical-open data-[state=closed]:animate-collapsible-vertical-close 2xl:data-[state=open]:animate-none 2xl:data-[state=closed]:animate-collapsible-stub">
							{props.features && (
								<>
									<p className="mt-5 text-neutral-950 dark:text-white text-xl text-left">{t("Features.label")}</p>
									{props.features?.map((feature) => (
										<div key={feature} className="mt-3 flex gap-3 text-left leading-4.5 items-center">
											<Checkbox
												id={feature}
												border
												checked={enabledFeatures.includes(feature)}
												onCheckedChange={() => toggleFeature(feature)}
											/>
											<label htmlFor={feature}>
												{t(`Features.${feature}`)}
												<span className="ml-2 text-xs opacity-50">{feature}</span>
											</label>
										</div>
									))}
								</>
							)}
							{props.stylisticSets && (
								<>
									<p className="mt-5 text-neutral-950 dark:text-white text-xl text-left">{t("stylisticSets")}</p>
									{props.stylisticSets?.map((stylisticSet) => (
										<div key={stylisticSet.tag} className="mt-3 flex gap-3 text-left leading-4.5 items-center">
											<Checkbox
												id={stylisticSet.tag}
												border
												checked={enabledFeatures.includes(stylisticSet.tag)}
												onCheckedChange={() => toggleFeature(stylisticSet.tag)}
											/>
											<label htmlFor={stylisticSet.tag}>
												{stylisticSet.label[locale]}
												<span className="ml-2 text-xs opacity-50">{stylisticSet.tag}</span>
											</label>
										</div>
									))}
								</>
							)}
							{props.characterVariants && (
								<>
									<p className="mt-5 text-neutral-950 dark:text-white text-xl text-left">{t("characterVariants")}</p>
									{props.characterVariants?.map((characterVariant) => (
										<div key={characterVariant.tag} className="mt-3 flex gap-3 text-left leading-4.5 items-center">
											<Checkbox
												id={characterVariant.tag}
												border
												checked={enabledFeatures.includes(characterVariant.tag)}
												onCheckedChange={() => toggleFeature(characterVariant.tag)}
											/>
											<label htmlFor={characterVariant.tag}>
												{characterVariant.label[locale]}
												<span className="ml-2 text-xs opacity-50">{characterVariant.tag}</span>
											</label>
										</div>
									))}
								</>
							)}
						</Collapsible.Content>
						<Collapsible.Trigger
							onClick={() => setShowFeatures(!showFeatures)}
							className="group relative w-full h-7.5 2xl:h-full 2xl:absolute 2xl:right-0 2xl:top-0 2xl:w-9 bg-white dark:bg-neutral-950"
						>
							<div className="absolute inset-0 h-9 2xl:h-full flex items-center justify-center group-hover:bg-black/5 dark:group-hover:bg-white/5 duration-100">
								<ChevronDown className="group-data-[state=open]:rotate-180 2xl:group-data-[state=open]:rotate-90 2xl:group-data-[state=closed]:-rotate-90" />
							</div>
						</Collapsible.Trigger>
					</Collapsible.Root>
				</div>
			)}
		</section>
	);
}
