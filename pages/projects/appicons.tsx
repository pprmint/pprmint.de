import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Dialog from "@radix-ui/react-dialog";
import { useTransition, a, config, easings } from "@react-spring/web";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import { useMediaQuery } from "react-responsive";
import JSZip from "jszip";
import FileSaver from "file-saver";

import Head from "components/Head";
import Title from "components/Title";
import Button from "components/Button";

import TitleBackground from "/public/assets/appicons/title.svg";

import AcrobatIcon from "/public/assets/appicons/Acrobat.png";
import AeroIcon from "/public/assets/appicons/Aero.png";
import AfterEffectsIcon from "/public/assets/appicons/AfterEffects.png";
import AnimateIcon from "/public/assets/appicons/Animate.png";
import AuditionIcon from "/public/assets/appicons/Audition.png";
import CharacterAnimatorIcon from "/public/assets/appicons/CharacterAnimator.png";
import CreativeCloudClientIcon from "/public/assets/appicons/CreativeCloudClient.png";
import DreamweaverIcon from "/public/assets/appicons/Dreamweaver.png";
import FrescoIcon from "/public/assets/appicons/Fresco.png";
import IllustratorIcon from "/public/assets/appicons/Illustrator.png";
import InCopyIcon from "/public/assets/appicons/InCopy.png";
import InDesignIcon from "/public/assets/appicons/InDesign.png";
import LightroomIcon from "/public/assets/appicons/Lightroom.png";
import LightroomClassicIcon from "/public/assets/appicons/LightroomClassic.png";
import MediaEncoderIcon from "/public/assets/appicons/MediaEncoder.png";
import MediaEncoderAltIcon from "/public/assets/appicons/MediaEncoderAlt.png";
import PhotoshopIcon from "/public/assets/appicons/Photoshop.png";
import PremiereProIcon from "/public/assets/appicons/PremierePro.png";
import ScanIcon from "/public/assets/appicons/Scan.png";
import XDIcon from "/public/assets/appicons/XD.png";
import AffinityDesignerIcon from "/public/assets/appicons/AffinityDesigner.png";
import AffinityPhotoIcon from "/public/assets/appicons/AffinityPhoto.png";
import AffinityPublisherIcon from "/public/assets/appicons/AffinityPublisher.png";
import AffinityDesignerAltIcon from "/public/assets/appicons/AffinityDesignerAlt.png";
import AffinityPhotoAltIcon from "/public/assets/appicons/AffinityPhotoAlt.png";
import AffinityPublisherAltIcon from "/public/assets/appicons/AffinityPublisherAlt.png";
import AsepriteIcon from "/public/assets/appicons/Aseprite.png";
import AsepriteAltIcon from "/public/assets/appicons/AsepriteAlt.png";
import BlenderIcon from "/public/assets/appicons/Blender.png";
import Cinema4DIcon from "/public/assets/appicons/Cinema4D.png";
import ClipStudioIcon from "/public/assets/appicons/ClipStudio.png";
import ClipStudioPaintIcon from "/public/assets/appicons/ClipStudioPaint.png";
import Live2DCubismIcon from "/public/assets/appicons/Live2DCubism.png";
import GraphicsGaleIcon from "/public/assets/appicons/GraphicsGale.png";
import AbletonLiveIntroIcon from "/public/assets/appicons/AbletonLiveIntro.png";
import AbletonLiveIntroAltIcon from "/public/assets/appicons/AbletonLiveIntroAlt.png";
import AbletonLiveStandardIcon from "/public/assets/appicons/AbletonLiveStandard.png";
import AbletonLiveStandardAltIcon from "/public/assets/appicons/AbletonLiveStandardAlt.png";
import AbletonLiveSuiteIcon from "/public/assets/appicons/AbletonLiveSuite.png";
import AbletonLiveSuiteAltIcon from "/public/assets/appicons/AbletonLiveSuiteAlt.png";
import AbletonLiveLiteIcon from "/public/assets/appicons/AbletonLiveLite.png";
import AbletonLiveLiteAltIcon from "/public/assets/appicons/AbletonLiveLiteAlt.png";
import AbletonLiveBetaIcon from "/public/assets/appicons/AbletonLiveBeta.png";
import AbletonLiveBetaAltIcon from "/public/assets/appicons/AbletonLiveBetaAlt.png";
import FLStudioIcon from "/public/assets/appicons/FLStudio.png";
import ReaperIcon from "/public/assets/appicons/Reaper.png";
import LeagueIcon from "/public/assets/appicons/League.png";
import MinecraftIcon from "/public/assets/appicons/Minecraft.png";
import PrismLauncherIcon from "/public/assets/appicons/PrismLauncher.png";
import SteamIcon from "/public/assets/appicons/Steam.png";
import DiscordIcon from "/public/assets/appicons/Discord.png";
import AegisubIcon from "/public/assets/appicons/Aegisub.png";
import AudacityIcon from "/public/assets/appicons/Audacity.png";
import DaVinciResolveIcon from "/public/assets/appicons/DaVinciResolve.png";
import FileZillaIcon from "/public/assets/appicons/FileZilla.png";
import GimpIcon from "/public/assets/appicons/GIMP.png";
import KritaIcon from "/public/assets/appicons/Krita.png";
import OBSIcon from "/public/assets/appicons/OBS.png";
import OBSAltIcon from "/public/assets/appicons/OBSAlt.png";
import qBittorrentIcon from "/public/assets/appicons/qBittorrent.png";
import SpotifyIcon from "/public/assets/appicons/Spotify.png";
import TixatiIcon from "/public/assets/appicons/Tixati.png";

const Icons = [
	{
		name: "Adobe Creative Cloud Client",
		image: CreativeCloudClientIcon,
		link: "/Adobe/Creative_Cloud_Client.ico",
	},
	{
		name: "Adobe Acrobat",
		image: AcrobatIcon,
		link: "/Adobe/Acrobat.ico",
	},
	{
		name: "Adobe Scan",
		image: ScanIcon,
		link: "/Adobe/Scan.ico",
	},
	{
		name: "Adobe Aero",
		image: AeroIcon,
		link: "/Adobe/Aero.ico",
	},
	{
		name: "Adobe Animate",
		image: AnimateIcon,
		link: "/Adobe/Animate.ico",
	},
	{
		name: "Adobe After Effects",
		image: AfterEffectsIcon,
		link: "/Adobe/After_Effects.ico",
	},
	{
		name: "Adobe Audition",
		image: AuditionIcon,
		link: "/Adobe/Audition.ico",
	},
	{
		name: "Adobe Character Animator",
		image: CharacterAnimatorIcon,
		link: "/Adobe/Character_Animator.ico",
	},
	{
		name: "Adobe Dreamweaver",
		image: DreamweaverIcon,
		link: "/Adobe/Dreamweaver.ico",
	},
	{
		name: "Adobe Fresco",
		image: FrescoIcon,
		link: "/Adobe/Fresco.ico",
	},
	{
		name: "Adobe Illustrator",
		image: IllustratorIcon,
		link: "/Adobe/Illustrator.ico",
	},
	{
		name: "Adobe InCopy",
		image: InCopyIcon,
		link: "/Adobe/InCopy.ico",
	},
	{
		name: "Adobe InDesign",
		image: InDesignIcon,
		link: "/Adobe/InDesign.ico",
	},
	{
		name: "Adobe Lightroom",
		image: LightroomIcon,
		link: "/Adobe/Lightroom.ico",
	},
	{
		name: "Adobe Lightroom Classic",
		image: LightroomClassicIcon,
		link: "/Adobe/Lightroom_Classic.ico",
	},
	{
		name: "Adobe Media Encoder",
		image: MediaEncoderIcon,
		link: "/Adobe/Media_Encoder.ico",
	},
	{
		name: "Adobe Media Encoder (Alt)",
		image: MediaEncoderAltIcon,
		link: "/Adobe/Media_Encoder_(alt).ico",
	},
	{
		name: "Adobe Photoshop",
		image: PhotoshopIcon,
		link: "/Adobe/Photoshop.ico",
	},
	{
		name: "Adobe Premiere Pro",
		image: PremiereProIcon,
		link: "/Adobe/Premiere_Pro.ico",
	},
	{
		name: "Adobe XD",
		image: XDIcon,
		link: "/Adobe/XD.ico",
	},
	{
		name: "Affinity Designer",
		image: AffinityDesignerIcon,
		link: "/Affinity/Designer.ico",
	},
	{
		name: "Affinity Photo",
		image: AffinityPhotoIcon,
		link: "/Affinity/Photo.ico",
	},
	{
		name: "Affinity Publisher",
		image: AffinityPublisherIcon,
		link: "/Affinity/Publisher.ico",
	},
	{
		name: "Affinity Designer (alt)",
		image: AffinityDesignerAltIcon,
		link: "/Affinity/Designer_(alt).ico",
	},
	{
		name: "Affinity Photo (alt)",
		image: AffinityPhotoAltIcon,
		link: "/Affinity/Photo_(alt).ico",
	},
	{
		name: "Affinity Publisher (alt)",
		image: AffinityPublisherAltIcon,
		link: "/Affinity/Publisher_(alt).ico",
	},
	{
		name: "Aseprite",
		image: AsepriteIcon,
		link: "/Art/Aseprite.ico",
	},
	{
		name: "Aseprite (alt)",
		image: AsepriteAltIcon,
		link: "/Art/Aseprite_(alt).ico",
	},
	{
		name: "Blender",
		image: BlenderIcon,
		link: "/Art/Blender.ico",
	},
	{
		name: "Cinema 4D",
		image: Cinema4DIcon,
		link: "/Art/Cinema_4D.ico",
	},
	{
		name: "Clip Studio",
		image: ClipStudioIcon,
		link: "/Art/Clip_Studio.ico",
	},
	{
		name: "Clip Studio Paint",
		image: ClipStudioPaintIcon,
		link: "/Art/Clip_Studio_Paint.ico",
	},
	{
		name: "GIMP",
		image: GimpIcon,
		link: "/Art/GIMP.ico",
	},
	{
		name: "GraphicsGale",
		image: GraphicsGaleIcon,
		link: "/Art/GraphicsGale.ico",
	},
	{
		name: "Krita",
		image: KritaIcon,
		link: "/Art/Krita.ico",
	},
	{
		name: "Live2D Cubism",
		image: Live2DCubismIcon,
		link: "/Art/Live2D_Cubism.ico",
	},
	{
		name: "League of Legends",
		image: LeagueIcon,
		link: "/Games/League.ico",
	},
	{
		name: "Minecraft",
		image: MinecraftIcon,
		link: "/Games/Minecraft_grass.ico",
	},
	{
		name: "Prism Launcher",
		image: PrismLauncherIcon,
		link: "/Games/Prism_Launcher.ico",
	},
	{
		name: "Steam",
		image: SteamIcon,
		link: "/Games/Steam.ico",
	},
	{
		name: "Discord",
		image: DiscordIcon,
		link: "/Chat/Discord.ico",
	},
	{
		name: "FL Studio",
		image: FLStudioIcon,
		link: "/DAWs/FL_Studio.ico",
	},
	{
		name: "Reaper",
		image: ReaperIcon,
		link: "/DAWs/Reaper.ico",
	},
	{
		name: "Ableton Live Intro",
		image: AbletonLiveIntroIcon,
		link: "/DAWs/Ableton_Live_Intro.ico",
	},
	{
		name: "Ableton Live Intro (alt)",
		image: AbletonLiveIntroAltIcon,
		link: "/DAWs/Ableton_Live_Intro_(alt).ico",
	},
	{
		name: "Ableton Live Standard",
		image: AbletonLiveStandardIcon,
		link: "/DAWs/Ableton_Live_Standard.ico",
	},
	{
		name: "Ableton Live Standard (alt)",
		image: AbletonLiveStandardAltIcon,
		link: "/DAWs/Ableton_Live_Standard_(alt).ico",
	},
	{
		name: "Ableton Live Suite",
		image: AbletonLiveSuiteIcon,
		link: "/DAWs/Ableton_Live_Suite.ico",
	},
	{
		name: "Ableton Live Suite (alt)",
		image: AbletonLiveSuiteAltIcon,
		link: "/DAWs/Ableton_Live_Suite_(alt).ico",
	},
	{
		name: "Ableton Live Lite",
		image: AbletonLiveLiteIcon,
		link: "/DAWs/Ableton_Live_Lite.ico",
	},
	{
		name: "Ableton Live Lite (alt)",
		image: AbletonLiveLiteAltIcon,
		link: "/DAWs/Ableton_Live_Lite_(alt).ico",
	},
	{
		name: "Ableton Live Beta",
		image: AbletonLiveBetaIcon,
		link: "/DAWs/Ableton_Live_Beta.ico",
	},
	{
		name: "Ableton Live Beta (alt)",
		image: AbletonLiveBetaAltIcon,
		link: "/DAWs/Ableton_Live_Beta_(alt).ico",
	},
	{
		name: "Aegisub",
		image: AegisubIcon,
		link: "/Various/Aegisub.ico",
	},
	{
		name: "Audacity",
		image: AudacityIcon,
		link: "/Various/Audacity.ico",
	},
	{
		name: "DaVinci Resolve",
		image: DaVinciResolveIcon,
		link: "/Various/Resolve.ico",
	},
	{
		name: "FileZilla",
		image: FileZillaIcon,
		link: "/Various/FileZilla.ico",
	},
	{
		name: "OBS",
		image: OBSIcon,
		link: "/Various/OBS.ico",
	},
	{
		name: "OBS (Alt)",
		image: OBSAltIcon,
		link: "/Various/OBS_(alt).ico",
	},
	{
		name: "qBittorrent",
		image: qBittorrentIcon,
		link: "/Various/qBittorrent.ico",
	},
	{
		name: "Spotify",
		image: SpotifyIcon,
		link: "/Various/Spotify.ico",
	},
	{
		name: "Tixati",
		image: TixatiIcon,
		link: "/Various/Tixati.ico",
	},
];

export default function AppIcons() {
	const { t } = useTranslation();
	const router = useRouter();

	const isDesktop = useMediaQuery({ minWidth: 768 });

	const [dialogOpen, setDialogOpen] = useState(false);
	const transitions = useTransition(dialogOpen, {
		from: { opacity: 0, x: "-50%", y: "-40%" },
		enter: { opacity: 1, x: "-50%", y: "-50%" },
		leave: { opacity: 0, x: "-50%", y: "-40%" },
		config: {
            easing: easings.easeOutExpo,
            duration: 500,
        },
	});

	const [search, setSearch] = useState("");
	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};
	const filteredIcons = Icons.filter((icon) => icon.name.toLowerCase().includes(search.toLowerCase()));

	const [selectedIcons, setSelectedIcons] = useState<{ name: string; link: string }[]>([]);
	const [prevCount, setPrevCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const handleIconSelect = (icon: { name: string; link: string }) => {
		setSelectedIcons((prevSelectedIcons) => {
			// Check if the icon is already selected, if yes, remove it from the list.
			const isIconSelected = prevSelectedIcons.some((selectedIcon) => selectedIcon.name === icon.name);
			if (isIconSelected) {
				return prevSelectedIcons.filter((selectedIcon) => selectedIcon.name !== icon.name);
			} else {
				// If the icon is not selected, add it to the list.
				return [...prevSelectedIcons, icon];
			}
		});
	};
	useEffect(() => {
		setPrevCount(selectedIcons.length);
	}, [selectedIcons]);
	const handleDownloadSelectedIcons = async () => {
		let seenPityDialog = localStorage.getItem("seenPityDialog");
		if (!seenPityDialog) {
			localStorage.setItem("seenPityDialog", "yup");
			setDialogOpen(true);
		}
		setLoading(true);
		const zip = new JSZip();
		for (const icon of selectedIcons) {
			const response = await fetch(`https://static.pprmint.art/download/AppIcons${icon.link}`);
			const blob = await response.blob();
			zip.file(`${icon.name}.ico`, blob);
		}
		zip.generateAsync({ type: "blob" }).then((blob) => {
			FileSaver.saveAs(blob, "Icons_for_takeout.zip");
		});
		setSelectedIcons([]);
		setLoading(false);
	};

	const selectedPanelTransition = useTransition(selectedIcons.length > 0, {
		from: { x: "-50%", y: 100 },
		enter: {
			x: "-50%",
			y: 0,
			config: {
				easing: easings.easeOutExpo,
				duration: 500,
			},
		},
		leave: {
			x: "-50%",
			y: 100,
			config: {
				easing: easings.easeInQuint,
				duration: 400,
			},
		},
	});
	const selectedCountTransition = useTransition(selectedIcons.length, {
		from: {
			opacity: 0,
			y: prevCount < selectedIcons.length ? 15 : -15,
		},
		enter: { opacity: 1, y: 0 },
		leave: {
			opacity: 0,
			y: prevCount < selectedIcons.length ? -15 : 15,
		},
		config: {
			easing: easings.easeOutBack,
			duration: 300,
		},
	});

	function PityDialog() {
		const { t } = useTranslation();
		return (
			<Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
				{transitions((styles, item) =>
					item ? (
						<>
							<Dialog.Overlay forceMount asChild className="fixed inset-0 z-50">
								<a.div
									style={{
										opacity: styles.opacity,
									}}
								>
									<div className="fixed inset-0 z-50 bg-neutral-950 opacity-75" />
								</a.div>
							</Dialog.Overlay>
							<Dialog.Content
								forceMount
								asChild
								className="fixed z-50 top-1/2 left-1/2 py-6 bg-neutral-900 text-neutral rounded-xl border border-neutral-800 w-full md:max-w-xl shadow-xl"
							>
								<a.div style={styles}>
									<div className="flex flex-row items-start pb-3 pl-6 pr-3">
										<h1 className="text-neutral-50 font-display text-2xl font-medium flex-grow">
											{t("APPICONS:Content.Dialog.title")}
										</h1>
										<Dialog.Close>
											<i className="ri-close-line text-xl text-neutral-50 rounded-full w-9 h-9 mx-1 hover:bg-neutral-800 duration-100" />
										</Dialog.Close>
									</div>
									<div className="px-6">
										<p>{t("APPICONS:Content.Dialog.text1")}</p>
										<p>{t("APPICONS:Content.Dialog.text2")}</p>
									</div>
									<div className="flex flex-row flex-wrap gap-3 pt-6 px-6">
										<Link href="https://ko-fi.com/pprmint" target="_blank" rel="noopener noreferrer">
											<Button color="green" onClick={() => setDialogOpen(false)}>
												{t("APPICONS:Content.Dialog.openKofi")}
												<i className="ri-cup-line" />
											</Button>
										</Link>
										<Button outlined color="green" onClick={() => setDialogOpen(false)}>
											{t("APPICONS:Content.Dialog.noThanks")}
										</Button>
									</div>
								</a.div>
							</Dialog.Content>
						</>
					) : null
				)}
			</Dialog.Root>
		);
	}

	return (
		<>
			<Head title={t("APPICONS:Head.title")} description={t("APPICONS:Head.description")} />
			<Title title={t("APPICONS:Head.title")} description={t("APPICONS:Head.description")}>
				<Image src={TitleBackground} alt="" fill className="object-cover bg-neutral-950" />
			</Title>
			<PityDialog />
			<main className="max-w-7xl mx-auto px-6 md:px-9">
				<section className="my-12">
					<h2>
						{t("APPICONS:Content.Intro.title")}
					</h2>
					<p>
						<Trans
							i18nKey="APPICONS:Content.Intro.text1"
							components={{
								i: <i />,
							}}
						/>
					</p>
					<p>
						<Trans
							i18nKey="APPICONS:Content.Intro.text2"
							components={{
								a: (
									<Link
										href={`https://learn.microsoft.com/${
											router.locale === "de" ? "de-de" : "en-us"
										}/windows/apps/design/style/iconography/app-icon-design`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-link-external"
									/>
								),
							}}
						/>
					</p>
					<p>{t("APPICONS:Content.Intro.text3")}</p>
				</section>
				<div className="relative">
					<div
						onClick={() => setSearch("")}
						className={`absolute flex right-0 w-10 h-full items-center justify-center text-neutral-50 rounded-r-md ${
							filteredIcons.length === 0
								? "hover:bg-red-800 cursor-pointer"
								: search && "hover:bg-neutral-800 cursor-pointer"
						} duration-100`}
					>
						{search ? <i className="ri-close-line" /> : <i className="ri-search-line" />}
					</div>
					<input
						type="text"
						value={search}
						onChange={handleSearchChange}
						placeholder={t("APPICONS:Content.search")}
						className={`w-full rounded-md outline focus:outline ${
							filteredIcons.length === 0
								? "outline-2 text-red outline-red-800 focus:outline-red bg-neutral-950"
								: "outline-1 text-neutral-50 outline-neutral-800 focus:outline-green bg-neutral-900 hover:bg-neutral-800"
						} focus:bg-transparent px-3 py-2 duration-100`}
					/>
				</div>
				<section className="my-9">
					<div className="w-full justify-center">
						{filteredIcons.length === 0 ? (
							<div className="flex flex-col w-full items-center">
								<i className="ri-close-line text-red text-8xl" />
								<h3>
									{t("COMMON:noResults")}
								</h3>
							</div>
						) : (
							<div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-3 md:gap-6">
								{filteredIcons.map((icon) => (
									<button
										className={`relative group border ${
											selectedIcons.some((selectedIcon) => selectedIcon.name === icon.name)
												? "bg-neutral-900 rounded-2xl p-2 sm:p-3 border-neutral-800"
												: "border-transparent"
										} duration-200 ease-out`}
										key={icon.name}
										onClick={() => handleIconSelect(icon)}
									>
										<div
											className={`absolute z-10 top-0 right-0 w-7 h-7 rounded-full text-lg text-neutral-950 bg-green shadow-lg ${
												selectedIcons.some((selectedIcon) => selectedIcon.name === icon.name)
													? "opacity-100 scale-100"
													: "opacity-0 scale-50"
											} active:backdrop-brightness-75 duration-150`}
											onClick={() => handleIconSelect(icon)}
										>
											<i className="ri-check-line" />
										</div>
										<Image
											src={icon.image}
											alt={icon.name}
											className={
												selectedIcons.some((selectedIcon) => selectedIcon.name === icon.name)
													? "opacity-50"
													: "brightness-100"
											}
										/>
									</button>
								))}
							</div>
						)}
					</div>
				</section>
				{selectedPanelTransition((styles, item) =>
					item ? (
						<a.div
							style={styles}
							className="fixed z-20 flex items-center justify-between left-1/2 bottom-0 xl:bottom-6 w-full xl:max-w-6xl pl-5 pr-3 py-3 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border-neutral-50/10 xl:ring-1 xl:ring-neutral-950/75 border-t xl:border xl:rounded-2xl shadow-[0_6px_22px_#11111166]"
						>
							<div className="flex items-center">
								{selectedCountTransition((styles, count) => (
									<a.div style={styles} className="h-9 text-neutral-50 font-bold font-mono text-3xl text-center">
										<p className="absolute text-center">{count}</p>
									</a.div>
								))}
								<p className={`text-lg ${selectedIcons.length > 9 ? "ml-14" : "ml-9"} duration-200 ease-out`}>
									{t("APPICONS:Content.iconsSelected", { count: selectedIcons.length })}
								</p>
							</div>
							{isDesktop ? (
								<div className="flex gap-6 items-center">
									<p
										className="cursor-pointer text-link"
										onClick={() => setSelectedIcons([])}
									>
										{t("COMMON:deselectAll")}
									</p>
									<Button onClick={handleDownloadSelectedIcons} disabled={loading}>
										{t("COMMON:downloadSelected")}
										<div className={loading ? "animate-spin" : ""}>
											{loading ? <i className="ri-loader-4-line" /> : <i className="ri-download-line" />}
										</div>
									</Button>
								</div>
							) : (
								<div className="flex gap-3 items-center">
									<button
										onClick={() => setSelectedIcons([])}
										className="text-neutral-50 w-9 h-9 rounded-full text-lg bg-neutral-50/10 hover:bg-neutral-50/20 duration-100"
									>
										<i className="ri-close-line" />
									</button>
									<button
										onClick={handleDownloadSelectedIcons}
										className="text-neutral-950 w-9 h-9 rounded-full text-lg bg-neutral-50 hover:bg-neutral-100 active:bg-neutral"
									>
										<div className={loading ? "animate-spin" : ""}>
											{loading ? (
												<i className="ri-loader-4-line leading-relaxed" />
											) : (
												<i className="ri-download-line" />
											)}
										</div>
									</button>
								</div>
							)}
						</a.div>
					) : null
				)}
			</main>
		</>
	);
}
