import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import Marquee from "react-fast-marquee";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useTransition, a, easings } from "@react-spring/web";

import Head from "components/Head";
import Button from "components/Button";
import Title from "components/Title";
import FadingImage from "components/FadingImage";

// Container screenshots (German)
import TSurvivalDE from "/public/assets/mintcraft/de/survival.png";
import TAdvancementsDE from "/public/assets/mintcraft/de/advancements.png";
import TAnvilDE from "/public/assets/mintcraft/de/anvil.png";
import TBeaconDE from "/public/assets/mintcraft/de/beacon.png";
import TCraftingDE from "/public/assets/mintcraft/de/crafting.png";
import TCreativeDE from "/public/assets/mintcraft/de/creative.png";
import TEnchantingDE from "/public/assets/mintcraft/de/enchanting.png";
import TFurnaceDE from "/public/assets/mintcraft/de/furnace.png";
// Container screenshots (English)
import TSurvivalEN from "/public/assets/mintcraft/en/survival.png";
import TAdvancementsEN from "/public/assets/mintcraft/en/advancements.png";
import TAnvilEN from "/public/assets/mintcraft/en/anvil.png";
import TBeaconEN from "/public/assets/mintcraft/en/beacon.png";
import TCraftingEN from "/public/assets/mintcraft/en/crafting.png";
import TCreativeEN from "/public/assets/mintcraft/en/creative.png";
import TEnchantingEN from "/public/assets/mintcraft/en/enchanting.png";
import TFurnaceEN from "/public/assets/mintcraft/en/furnace.png";
import Trans from "next-translate/Trans";

interface Pack {
	name: string;
	packVersion: string;
	type?: string;
}

interface Version {
	version: string;
	packs: Pack[];
}

// Available downloads for each game version.
// Skip <type> prop for standalone pack.
// "Full" for FullSauce / complete pack with all add-ons integrated.
// "Add-on" for... well, an add-on.
const Versions: Version[] = [
	{
		version: "1.20",
		packs: [
			{
				name: "Mintcraft",
				packVersion: "1.7.1",
				type: "Complete",
			},
			{
				name: "Mintcraft",
				packVersion: "1.7.1",
			},
			{
				name: "MintBit",
				packVersion: "1.2",
				type: "Add-on",
			},
			{
				name: "Sounds",
				packVersion: "1.1",
				type: "Add-on",
			},
		],
	},
	{
		version: "1.19",
		packs: [
			{
				name: "Mintcraft",
				packVersion: "1.6.2",
				type: "Full",
			},
			{
				name: "Mintcraft",
				packVersion: "1.6.2",
			},
			{
				name: "MintBit",
				packVersion: "1.1",
				type: "Add-on",
			},
			{
				name: "Sounds",
				packVersion: "1.1",
				type: "Add-on",
			},
		],
	},
	{
		version: "1.18",
		packs: [
			{
				name: "Mintcraft",
				packVersion: "1.5",
			},
			{
				name: "MintBit",
				packVersion: "1.0",
				type: "Add-on",
			},
			{
				name: "Sounds",
				packVersion: "1.1",
				type: "Add-on",
			},
		],
	},
	{
		version: "1.17",
		packs: [
			{
				name: "Mintcraft",
				packVersion: "1.3",
			},
			{
				name: "MintBit",
				packVersion: "1.0",
				type: "Add-on",
			},
			{
				name: "Sounds",
				packVersion: "1.0",
				type: "Add-on",
			},
		],
	},
	{
		version: "1.16",
		packs: [
			{
				name: "Mintcraft",
				packVersion: "1.1",
			},
			{
				name: "MintBit",
				packVersion: "1.0",
				type: "Add-on",
			},
			{
				name: "Sounds",
				packVersion: "1.0",
				type: "Add-on",
			},
		],
	},
];

export default function Mintcraft() {
	const { t } = useTranslation();
	const { locale } = useRouter();

	const [gameVersion, setGameVersion] = React.useState("1.20");

	const transition = useTransition(gameVersion, {
		from: { opacity: 0, y: 20, scale: 1 },
		enter: { opacity: 1, y: 0, scale: 1, config: { easing: easings.easeOutExpo } },
		leave: { opacity: 0, scale: 0.95, config: { easing: easings.easeInCubic, duration: 170 } },
		trail: 50,
		exitBeforeEnter: true,
	});

	function DownloadCard(props: { name: string; packVersion: string; type?: string }) {
		const { type = "Standard" } = props;
		const dlLink =
			props.type === "Add-on"
				? `https://static.pprmint.art/download/Mintcraft/${gameVersion}/${props.name}_Add-on_${props.packVersion}_(${gameVersion}).zip`
				: props.type === "Complete"
				? `https://static.pprmint.art/download/Mintcraft/${gameVersion}/${props.name}_Complete_${props.packVersion}_(${gameVersion}).zip`
				: props.type === "Full"
				? `https://static.pprmint.art/download/Mintcraft/${gameVersion}/${props.name}_${props.packVersion}_(FullSauce_${gameVersion}).zip`
				: `https://static.pprmint.art/download/Mintcraft/${gameVersion}/${props.name}_${props.packVersion}_(${gameVersion}).zip`;
		return (
			<div className="relative bg-neutral-900 rounded-lg flex flex-row overflow-hidden">
				{(props.type === "Complete" || props.type === "Full") && (
					<Tooltip.Provider>
						<Tooltip.Root delayDuration={200}>
							<Tooltip.Trigger className="absolute top-0 right-0 p-3 cursor-help text-yellow">
								<i className="ri-question-line" />
							</Tooltip.Trigger>
							<Tooltip.Portal>
								<Tooltip.Content>
									<div className="text-neutral-50 bg-neutral-800 px-4 py-1.5 rounded-full drop-shadow-lg">
										{t("MINTCRAFT:Content.Download.fullSauceInfo")}
										<Tooltip.Arrow className="fill-neutral-800" />
									</div>
								</Tooltip.Content>
							</Tooltip.Portal>
						</Tooltip.Root>
					</Tooltip.Provider>
				)}
				<Image
					src={`/assets/mintcraft/packs/${props.name}_${type}.svg`}
					width={64}
					height={64}
					alt={`${props.name} Icon`}
					className="h-44 w-44 border-r border-neutral-800"
				/>
				<div className="flex flex-col w-full h-full p-6">
					<h3>
						{props.type === "Complete"
							? `${props.name} Complete`
							: props.type === "Full"
							? `${props.name} FullSauce`
							: props.name}
					</h3>
					<p className="pb-6">Version {props.packVersion}</p>
					<Link href={dlLink} className="w-fit mt-auto ml-auto">
						<Button color="yellow">{t("COMMON:download")}</Button>
					</Link>
				</div>
			</div>
		);
	}

	function VersionSwitch() {
		return (
			<div className="flex bg-neutral-900 rounded-lg duration-100 overflow-hidden h-max">
				{Versions.map((v) => (
					<button
						key={v.version}
						onClick={() => setGameVersion(v.version)}
						className={`${
							gameVersion === v.version
								? "bg-yellow font-bold text-neutral-950"
								: "bg-transparent text-neutral-50 hover:text-yellow hover:bg-yellow-800 active:bg-yellow active:text-neutral-950 focus-visible:bg-yellow-800"
						} hover:font-bold duration-100 sm:w-16 w-full h-10`}
					>
						{v.version}
					</button>
				))}
			</div>
		);
	}

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
				<div className="bg-neutral-950" style={{ perspective: 2000 }}>
					<Marquee
						gradientColor="#111"
						style={{
							width: "120vw",
							height: "90vh",
							transform: "rotateX(20deg) rotateY(10deg) rotateZ(-15deg)",
						}}
						gradientWidth="30vw"
						speed={50}
					>
						{locale === "en" && (
							<>
								<FadingImage src={TBeaconEN} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TSurvivalEN} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TEnchantingEN} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TCreativeEN} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TCraftingEN} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TFurnaceEN} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TAdvancementsEN} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TAnvilEN} alt="" quality={90} priority className="inline-block h-auto m-6" />
							</>
						)}
						{locale === "de" && (
							<>
								<FadingImage src={TBeaconDE} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TSurvivalDE} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TEnchantingDE} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TCreativeDE} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TCraftingDE} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TFurnaceDE} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TAdvancementsDE} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TAnvilDE} alt="" quality={90} priority className="inline-block h-auto m-6" />
							</>
						)}
					</Marquee>
				</div>
			</Title>
			<main className="max-w-7xl mx-auto px-6 md:px-9">
				<section className="my-20">
					<h2>{t("MINTCRAFT:Content.Changes.heading", { version: Versions[0].packs[0].packVersion })}</h2>
					<h3>Mintcraft</h3>
					<div className="flex flex-col gap-3 mb-6">
						<div className="flex gap-3 items-center">
							<i className="ri-arrow-up-line text-neutral-50 text-xl" />
							<p>{t("MINTCRAFT:Content.Changes.Mintcraft.fixMinceraft")}</p>
						</div>
						<div className="flex gap-3 items-center">
							<i className="ri-arrow-up-line text-neutral-50 text-xl" />
							<p>{t("MINTCRAFT:Content.Changes.Mintcraft.deleteDuplicate")}</p>
						</div>
					</div>
				</section>
				<section className="my-20">
					<h2>{t("MINTCRAFT:Content.DosAndDonts.heading")}</h2>
					<p>{t("MINTCRAFT:Content.DosAndDonts.disclaimer")}</p>
					<div className="grid md:grid-cols-2 gap-6 mt-6">
						<div>
							<h3 className="text-green">{t("MINTCRAFT:Content.DosAndDonts.Do.heading")}</h3>
							<div className="flex flex-col gap-3">
								<div className="flex gap-6 items-center">
									<i className="ri-thumb-up-line text-neutral-50 text-xl" />
									<p>{t("MINTCRAFT:Content.DosAndDonts.Do.modifyPersonal")}</p>
								</div>
								<div className="flex gap-6 items-center">
									<i className="ri-thumb-up-line text-neutral-50 text-xl" />
									<p>{t("MINTCRAFT:Content.DosAndDonts.Do.mix")}</p>
								</div>
								<div className="flex gap-6 items-center">
									<i className="ri-thumb-up-line text-neutral-50 text-xl" />
									<p>{t("MINTCRAFT:Content.DosAndDonts.Do.useOnline")}</p>
								</div>
								<div className="flex gap-6 items-center">
									<i className="ri-thumb-up-line text-neutral-50 text-xl" />
									<p>{t("MINTCRAFT:Content.DosAndDonts.Do.sharePrivately")}</p>
								</div>
								<div className="flex gap-6 items-center">
									<i className="ri-thumb-up-line text-neutral-50 text-xl" />
									<p>{t("MINTCRAFT:Content.DosAndDonts.Do.useServer")}</p>
								</div>
							</div>
						</div>
						<div>
							<h3 className="text-red">{t("MINTCRAFT:Content.DosAndDonts.Dont.heading")}</h3>
							<div className="flex flex-col gap-3">
								<div className="flex gap-6 items-center">
									<i className="ri-thumb-down-line text-neutral-50 text-xl" />
									<p>{t("MINTCRAFT:Content.DosAndDonts.Dont.claim")}</p>
								</div>
								<div className="flex gap-6 items-center">
									<i className="ri-thumb-down-line text-neutral-50 text-xl" />
									<p>{t("MINTCRAFT:Content.DosAndDonts.Dont.redistribute")}</p>
								</div>
								<div className="flex gap-6 items-center">
									<i className="ri-thumb-down-line text-neutral-50 text-xl" />
									<p>{t("MINTCRAFT:Content.DosAndDonts.Dont.sell")}</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="my-20">
					<h2>{t("MINTCRAFT:Content.Credits.heading")}</h2>
					<Link
						href="https://twitter.com/AfkBlizzy"
						target="_blank"
						rel="noopener noreferrer"
						className="text-link-external"
					>
						<h3>
							Blizzy
							<i className="ri-arrow-right-up-line text-blue" />
						</h3>
					</Link>
					<p className="pb-3">{t("MINTCRAFT:Content.Credits.blizzy")}</p>
					<Link
						href="https://vanillatweaks.net"
						target="_blank"
						rel="noopener noreferrer"
						className="text-link-external"
					>
						<h3>
							Vanilla Tweaks
							<i className="ri-arrow-right-up-line text-blue" />
						</h3>
					</Link>
					<p>{t("MINTCRAFT:Content.Credits.vanillaTweaks")}</p>
				</section>
				<section className="my-20">
					<h2>{t("MINTCRAFT:Content.MayContainMistakes.heading")}</h2>
					<Trans
						i18nKey="MINTCRAFT:Content.MayContainMistakes.text"
						components={{
							Link: (
								<Link
									href="/contact"
									className="text-yellow underline decoration-2 decoration-dotted hover:decoration-solid decoration-yellow-800 hover:decoration-yellow duration-100"
								/>
							),
						}}
					/>
				</section>
				<div className="flex flex-col sm:flex-row gap-6 pb-6">
					<h2 className="flex-grow">{t("MINTCRAFT:Content.Download.commonTitle", { version: gameVersion })}</h2>
					<VersionSwitch />
				</div>
				{transition((styles, version) => (
					<a.div style={styles} key={version} className="grid grid-cols-1 xl:grid-cols-2 gap-6">
						{Versions.find((v) => v.version === version)?.packs.map((pack) => (
							<DownloadCard
								key={pack.name + pack.packVersion}
								name={pack.name}
								packVersion={pack.packVersion}
								type={pack.type}
							/>
						))}
					</a.div>
				))}
			</main>
		</>
	);
}
