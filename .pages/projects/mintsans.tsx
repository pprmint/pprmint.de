import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import * as Toolbar from "@radix-ui/react-toolbar";
import * as Select from "@radix-ui/react-select";
import * as Slider from "@radix-ui/react-slider";

import Head from "src/components/Head";
import Button from "src/components/Button";

import Slide1 from "public/assets/mintsans/slide1.svg";
import Slide2 from "public/assets/mintsans/slide2.svg";
import Slide3 from "public/assets/mintsans/slide3.svg";
import Slide4 from "public/assets/mintsans/slide4.svg";
import Slide5 from "public/assets/mintsans/slide5.svg";
import Slide6 from "public/assets/mintsans/slide6.svg";
import Title from "src/components/Title";

export function SelectItem(props: React.PropsWithChildren<{ value: string }>) {
	return (
		<Select.Item
			value={props.value}
			className="flex text-neutral-50 items-center cursor-pointer rounded-md px-2 hover:pl-4 py-2 select-none hover:bg-green hover:text-neutral-950 duration-100"
		>
			<Select.ItemText className="flex-grow">{props.children}</Select.ItemText>
			<Select.ItemIndicator className="ml-auto">
				<i className="ri-check-line" />
			</Select.ItemIndicator>
		</Select.Item>
	);
}

export default function Mintsans() {
	const { t } = useTranslation("Projects.Mintsans");
	const [weight, setWeight] = React.useState("400");
	const [textAlignment, setTextAlignment] = React.useState("text-center");
	const [tracking, setTracking] = React.useState([0]);
	const [fontSize, setFontSize] = React.useState([1.5]);
	function resetFont() {
		setWeight("400");
		setTextAlignment("text-center");
		setTracking([0]);
		setFontSize([1.5]);
	}
	return (
		<>
			<Head title={t("MINTSANS:Head.title")} description={t("MINTSANS:Head.description")} />
			<Title title={t("MINTSANS:Head.title")} description={t("MINTSANS:Head.description")}>
				<Image src="https://static.pprmint.art/images/MintSans_V2.jpg" alt="" fill className="object-cover" />
			</Title>
			<main>
				<section className="py-5">
					<Image src={Slide1} alt="Slide 1" className="w-full" />
					<Image src={Slide2} alt="Slide 2" className="w-full" />
					<Image src={Slide3} alt="Slide 3" className="w-full" />
					<Image src={Slide4} alt="Slide 4" className="w-full" />
					<Image src={Slide5} alt="Slide 5" className="w-full" />
					<Image src={Slide6} alt="Slide 6" className="w-full" />
				</section>
				<section className="my-20 px-6 md:px-9 py-5">
                <h2 className="max-w-7xl mx-auto">{t("MINTSANS:Content.Tester.heading")}</h2>
					<Toolbar.Root className="max-w-7xl mx-auto flex flex-wrap gap-6 bg-neutral-900 border border-neutral-800 rounded-xl p-4 mb-5">
						<div className="flex w-full md:w-auto gap-6">
							<div className="flex flex-col w-full">
								<Select.Root value={weight} onValueChange={setWeight}>
									<Select.Trigger
										className="flex items-center justify-between rounded-md leading-none px-3 h-9 w-full md:w-36 border border-neutral-800 hover:bg-neutral-800 hover:text-neutral-50 duration-100"
										aria-label="Font weight"
									>
										<Select.Value aria-label={weight} />
										<Select.Icon className="ml-auto">
											<i className="ri-arrow-down-s-line" />
										</Select.Icon>
									</Select.Trigger>
									<Select.Portal>
										<Select.Content className="overflow-hidden bg-neutral-800 rounded-md shadow-lg">
											<Select.Viewport className="p-2">
												<Select.Group>
													<SelectItem value="200">{t("MINTSANS:Content.Tester.extralight")}</SelectItem>
													<SelectItem value="400">{t("MINTSANS:Content.Tester.regular")}</SelectItem>
													<SelectItem value="700">{t("MINTSANS:Content.Tester.bold")}</SelectItem>
												</Select.Group>
											</Select.Viewport>
										</Select.Content>
									</Select.Portal>
								</Select.Root>
								<sub className="pt-3 pb-2">{t("MINTSANS:Content.Tester.weight")}</sub>
							</div>
							<div className="flex flex-col">
								<Toolbar.ToggleGroup
									type="single"
									defaultValue="center"
									value={textAlignment}
									onValueChange={(textAlignment) => {
										if (textAlignment) setTextAlignment(textAlignment);
									}}
									aria-label={t("MINTSANS:Content.Tester.alignment")}
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
								<sub className="pt-3 pb-2">{t("MINTSANS:Content.Tester.alignment")}</sub>
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
									aria-label={t("MINTSANS:Content.Tester.size")}
								>
									<Slider.Track className="relative grow rounded-full bg-green-800 group-hover:bg-green-700 h-[2px] duration-100">
										<Slider.Range className="absolute bg-green-700 rounded-full h-full" />
									</Slider.Track>
									<Slider.Thumb className="block w-1 h-4 group-hover:h-6 focus-visible:h-6 bg-green ring-2 ring-neutral-900 rounded-full outline-none duration-100" />
								</Slider.Root>
								<sub className="pt-3 pb-2">{t("MINTSANS:Content.Tester.size")}</sub>
							</div>
							<div className="flex flex-col w-full sm:w-1/2">
								<Slider.Root
									className="group relative flex items-center select-none touch-none w-full h-9 self-center"
									value={tracking}
									onValueChange={setTracking}
									min={-0.25}
									max={1.5}
									step={0.01}
									aria-label={t("MINTSANS:Content.Tester.spacing")}
								>
									<Slider.Track className="relative grow rounded-full bg-green-800 group-hover:bg-green-700 h-[2px] duration-100">
										<Slider.Range className="absolute bg-green-700 rounded-full h-full" />
									</Slider.Track>
									<Slider.Thumb className="block w-1 h-4 group-hover:h-6 focus-visible:h-6 bg-green ring-2 ring-neutral-900 rounded-full outline-none duration-100" />
								</Slider.Root>
								<sub className="pt-3 pb-2">{t("MINTSANS:Content.Tester.spacing")}</sub>
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
						className={`flex w-full p-3 md:p-6 font-mintsans text-neutral placeholder:text-neutral focus:text-neutral-50 bg-transparent focus:outline-none rounded-md min-h-[200px] h-1/2-screen ${textAlignment}`}
						placeholder={t("MINTSANS:Content.Tester.pangram")}
						style={{
							fontWeight: weight,
							fontSize: `${fontSize as unknown as number}em`,
							letterSpacing: `${tracking as unknown as number}em`,
						}}
					/>
					<hr className="border-green w-1/4 mx-auto" />
				</section>
				<section className="max-w-7xl mx-auto px-6 md:px-9 py-5">
					<h2>
						{t("MINTSANS:Content.Download.heading")}
					</h2>
					<p>{t("MINTSANS:Content.Download.text")}</p>
					<br />
					<Link href="https://static.pprmint.art/download/mintsans_2.0.zip">
						<Button color="green">
							{t("COMMON:download")}
							<i className="ri-download-line" />
						</Button>
					</Link>
				</section>
			</main>
		</>
	);
}
