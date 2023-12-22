import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import * as Select from "@radix-ui/react-select";
import { useTransition, a, easings } from "@react-spring/web";
import JSZip from "jszip";
import FileSaver from "file-saver";

import Head from "components/Head";
import Button from "components/Button";
import Title from "components/Title";

interface Version {
	version: string;
	addOns: string[];
	mods: string[];
}

// Available downloads for each game version.
// Skip <type> prop for standalone pack.
// "Full" for FullSauce / complete pack with all add-ons integrated.
// "Add-on" for... well, an add-on.
const Versions: Version[] = [
	{
		version: "1.20 - 1.20.1",
		addOns: ["MintBit", "Sounds"],
		mods: [],
	},
	{
		version: "1.19.4",
		addOns: ["MintBit", "Sounds"],
		mods: [],
	},
	{
		version: "1.19.3",
		addOns: ["MintBit", "Sounds"],
		mods: [],
	},
	{
		version: "1.19 - 1.19.2",
		addOns: ["MintBit", "Sounds"],
		mods: [],
	},
	{
		version: "1.18",
		addOns: ["MintBit", "Sounds"],
		mods: [],
	},
	{
		version: "1.17",
		addOns: ["MintBit", "Sounds"],
		mods: [],
	},
	{
		version: "1.16",
		addOns: ["MintBit", "Sounds"],
		mods: [],
	},
];

export default function Mintcraft() {
	const { t } = useTranslation();
	const { locale } = useRouter();

	const [gameVersion, setGameVersion] = useState(Versions[0].version);

	const transition = useTransition(gameVersion, {
		from: { opacity: 0, y: 20, scale: 1 },
		enter: { opacity: 1, y: 0, scale: 1, config: { easing: easings.easeOutExpo } },
		leave: { opacity: 0, scale: 0.95, config: { easing: easings.easeInCubic, duration: 170 } },
		trail: 50,
		exitBeforeEnter: true,
	});

	const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const handleAddOnSelect = (addOn: string) => {
		setSelectedAddOns((prevSelectedAddOns) => {
			// Check if the icon is already selected, if yes, remove it from the list.
			const isAddOnSelected = prevSelectedAddOns.some((selectedAddOn) => selectedAddOn === addOn);
			if (isAddOnSelected) {
				return prevSelectedAddOns.filter((selectedAddOn) => selectedAddOn !== addOn);
			} else {
				// If the icon is not selected, add it to the list.
				return [...prevSelectedAddOns, addOn];
			}
		});
	};

	return (
		<>
			<Head
				title={t("MINTCRAFT:Head.title")}
				description={t("MINTCRAFT:Head.description")}
				favicon="mintcraft"
				image="https://pprmint.art/assets/mintcraft/OG.jpg"
				color="#ffaa22"
			/>
			<Title title={t("MINTCRAFT:Head.title")} description={t("MINTCRAFT:Head.description")} accentColor="text-yellow">
				<div className="w-full h-full flex items-center justify-center">(insert mintcraft logo here)</div>
			</Title>
			<main className="max-w-7xl mx-auto px-6 md:px-9">
				<section className="my-16">
					<h2>
						Good today and welcome to a(n) alpha/beta page.
					</h2>
					<p>
						With more add-ons and mod support planned for Mintcraft, the current download section just isn't gonna cut
						it anymore. Soon™ you'll be able to pick and choose which add-ons you want and download everything as a
						single ZIP file, similar to how the{" "}
						<Link
							href="/projects/appicons"
							className="text-neutral-50 underline underline-offset-4 decoration-dotted hover:decoration-solid decoration-neutral hover:decoration-neutral-50 duration-100"
						>
							App Icons
						</Link>{" "}
						page works.
					</p>
					<p>
						If you somehow managed to end up here by mistake, go to the current{" "}
						<Link
							href="/projects/mintcraft"
							className="text-neutral-50 underline underline-offset-4 decoration-dotted hover:decoration-solid decoration-neutral hover:decoration-neutral-50 duration-100"
						>
							Mintcraft
						</Link>{" "}
						page if you want to download it.
					</p>
				</section>
				<section className="my-16">
					<div className="flex flex-col sm:flex-row gap-6 pb-6">
						<h2 className="flex-grow">
							{t("MINTCRAFT:Content.Download.commonTitle", { version: gameVersion })}
						</h2>
						<Select.Root value={gameVersion} onValueChange={setGameVersion}>
							<Select.Trigger
								className="flex justify-between sm:w-40 h-max rounded-md outline focus:outline outline-1 focus:outline-2 text-neutral-50 outline-neutral-800 focus:outline-yellow bg-neutral-900 hover:bg-neutral-800 focus:bg-transparent px-3 py-2 duration-100"
								aria-label="Game version"
							>
								<Select.Value aria-label={gameVersion} />
								<Select.Icon>
									<i className="ri-arrow-down-s-line" />
								</Select.Icon>
							</Select.Trigger>
							<Select.Portal>
								<Select.Content className="overflow-hidden bg-neutral-800 rounded-lg shadow-lg">
									<Select.Viewport className="p-2">
										<Select.Group>
											{Versions.map((version) => (
												<Select.Item
													key={version.version}
													value={version.version}
													className="flex text-neutral-50 items-center cursor-pointer rounded-md px-2 focus:pl-4 py-2 select-none focus:bg-yellow focus:text-neutral-950 duration-100 outline-none focus:outline-none"
												>
													<Select.ItemText className="flex-grow">{version.version}</Select.ItemText>
													<Select.ItemIndicator className="ml-auto">
														<i className="ri-check-line" />
													</Select.ItemIndicator>
												</Select.Item>
											))}
										</Select.Group>
									</Select.Viewport>
								</Select.Content>
							</Select.Portal>
						</Select.Root>
					</div>
					{transition((styles, version) => (
						<a.div style={styles} key={version}>
							{Versions.find((v) => v.version === version)?.addOns.map((addOn) => (
								<Button key={addOn} onClick={() => handleAddOnSelect(addOn)}>{addOn}</Button>
							))}
						</a.div>
					))}
					{selectedAddOns}
				</section>
			</main>
		</>
	);
}
