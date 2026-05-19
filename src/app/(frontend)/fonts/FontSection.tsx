"use client";
import Select from "@/components/ui/Select";
import Slider from "@/components/ui/Slider";
import Tooltip from "@/components/ui/Tooltip";
import Pilcrow from "@/icons/Pilcrow";
import TextItalic from "@/icons/TextItalic";
import TextItalicGerman from "@/icons/TextItalicGerman";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "next-transition-router";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { PropsWithChildren, useState } from "react";

export default function FontSection(
	props: PropsWithChildren<{
		name: string;
		link: string;
		font: NextFontWithVariable;
		variable?: boolean;
		styles: {
			tag: string;
			steps: number[];
			initial?: number;
		}[];
		hasItalic?: boolean;
	}>,
) {
	const t = useTranslations("FONT");
	const locale = useLocale() as "en" | "de" | "all" | undefined;

	const [linebreak, setLinebreak] = useState(false);
	const [italic, setItalic] = useState(false);
	const [size, setSize] = useState([6]);

	const [values, setValues] = useState(props.styles.map((style) => style.initial ?? style.steps[0]));
	function updateStyle(index: number, value: number) {
		setValues((prev) => prev.map((v, i) => (i === index ? value : v)));
	}

	return (
		<section className="group border-x border-b first:border-t border-black/5 dark:border-white/5 pb-6 md:pb-9">
			<div className="flex w-full justify-between pl-6 md:pl-9 mb-3">
				<Link
					href={props.link}
					target={props.link.startsWith("https://") ? "_blank" : "_self"}
					rel={props.link.startsWith("https://") ? "noopener noreferrer" : ""}
					className="font-medium hover:text-black dark:hover:text-white duration-75 mt-5 md:mt-8"
				>
					{props.name}
				</Link>
				<div className="flex h-max opacity-0 group-hover:opacity-100 duration-75 border-b border-l border-black/5 dark:border-white/5">
					<div className="hidden md:flex">
						{props.variable
							? props.styles.map((style, i) => (
									<div
										className="w-48 lg:w-72 xl:w-84 2xl:w-100 border-r border-black/5 dark:border-white/5"
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
									<div key={style.tag} className="w-42 lg:w-58 border-r border-black/5 dark:border-white/5">
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
								))}
						<div className="w-48 lg:w-72 xl:w-84 2xl:w-100 border-r border-black/5 dark:border-white/5">
							<Slider
								label={t("size")}
								value={size}
								unit="rem"
								onValueChange={(value) => setSize(value)}
								step={0.1}
								min={0.5}
								max={15}
							/>
						</div>
					</div>
					{props.hasItalic && (
						<Tooltip text={t("Style.italic")}>
							<button
								className={`size-9 ${italic ? "bg-neutral-950 hover:bg-neutral-900 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950" : "hover:bg-black/5 dark:hover:bg-white/5 text-neutral-950 dark:text-white"} duration-75 cursor-pointer`}
								onClick={() => setItalic(!italic)}
							>
								{locale === "de" ? <TextItalicGerman className="mx-auto" /> : <TextItalic className="mx-auto" />}
							</button>
						</Tooltip>
					)}
					<Tooltip text={t("lineBreak")}>
						<button
							className={`size-9 ${linebreak ? "bg-neutral-950 hover:bg-neutral-900 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950" : "hover:bg-black/5 dark:hover:bg-white/5 text-neutral-950 dark:text-white"} duration-75 cursor-pointer`}
							onClick={() => setLinebreak(!linebreak)}
						>
							<Pilcrow className="mx-auto" />
						</button>
					</Tooltip>
				</div>
			</div>
			<div className="relative">
				<div
					className={`${props.font.className} min-h-30 px-6 md:px-9 mb-3 text-4xl md:text-6xl text-black dark:text-white outline-0 leading-tight ${linebreak ? "whitespace-normal" : "whitespace-nowrap overflow-x-auto overflow-y-hidden"}`}
					contentEditable
					suppressContentEditableWarning
					spellCheck={false}
					onChange={() => setLinebreak(!linebreak)}
					style={
						props.variable
							? {
									fontStyle: italic ? "italic" : "normal",
									fontVariationSettings: props.styles.map((style, i) => `'${style.tag}' ${values[i]}`).join(", "),
									fontSize: `${size}rem`,
								}
							: {
									fontStyle: italic ? "italic" : "normal",
									fontSize: `${size}rem`,
									fontWeight: `${values[props.styles.findIndex((i) => i.tag === "wght")]}`,
								}
					}
				>
					{props.children}
				</div>
				<div className="absolute left-0 inset-y-0 bg-linear-to-r from-white dark:from-neutral-950 w-6 md:w-9" />
				<div className="absolute right-0 inset-y-0 bg-linear-to-l from-white dark:from-neutral-950 w-6 md:w-9" />
			</div>
			<div className="flex gap-6 px-6 md:px-9 text-xs">
				<div>
					{t(`Type.${props.variable ? "variable" : "static"}`)}
					{props.variable && ` (${props.styles.map((style) => t(`Axis.${style.tag}`)).join(", ")})`}
				</div>
				<div>
					{t("styles", {
						count:
							props.styles.reduce((total, style) => {
								return total * style.steps.length;
							}, 1) * (props.hasItalic ? 2 : 1),
					})}
				</div>
			</div>
		</section>
	);
}
