"use client";
import { useState, ChangeEvent } from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import * as m from "motion/react-m";

import AcrobatIcon from "@public/assets/appicons/Acrobat.png";
import AeroIcon from "@public/assets/appicons/Aero.png";
import AfterEffectsIcon from "@public/assets/appicons/AfterEffects.png";
import AnimateIcon from "@public/assets/appicons/Animate.png";
import AuditionIcon from "@public/assets/appicons/Audition.png";
import CharacterAnimatorIcon from "@public/assets/appicons/CharacterAnimator.png";
import CreativeCloudClientIcon from "@public/assets/appicons/CreativeCloudClient.png";
import DreamweaverIcon from "@public/assets/appicons/Dreamweaver.png";
import FrescoIcon from "@public/assets/appicons/Fresco.png";
import IllustratorIcon from "@public/assets/appicons/Illustrator.png";
import InCopyIcon from "@public/assets/appicons/InCopy.png";
import InDesignIcon from "@public/assets/appicons/InDesign.png";
import LightroomIcon from "@public/assets/appicons/Lightroom.png";
import LightroomClassicIcon from "@public/assets/appicons/LightroomClassic.png";
import MediaEncoderIcon from "@public/assets/appicons/MediaEncoder.png";
import MediaEncoderAltIcon from "@public/assets/appicons/MediaEncoderAlt.png";
import PhotoshopIcon from "@public/assets/appicons/Photoshop.png";
import PremiereProIcon from "@public/assets/appicons/PremierePro.png";
import ScanIcon from "@public/assets/appicons/Scan.png";
import XDIcon from "@public/assets/appicons/XD.png";
import AffinityDesignerIcon from "@public/assets/appicons/AffinityDesigner.png";
import AffinityPhotoIcon from "@public/assets/appicons/AffinityPhoto.png";
import AffinityPublisherIcon from "@public/assets/appicons/AffinityPublisher.png";
import AffinityDesignerAltIcon from "@public/assets/appicons/AffinityDesignerAlt.png";
import AffinityPhotoAltIcon from "@public/assets/appicons/AffinityPhotoAlt.png";
import AffinityPublisherAltIcon from "@public/assets/appicons/AffinityPublisherAlt.png";
import AsepriteIcon from "@public/assets/appicons/Aseprite.png";
import AsepriteAltIcon from "@public/assets/appicons/AsepriteAlt.png";
import BlenderIcon from "@public/assets/appicons/Blender.png";
import Cinema4DIcon from "@public/assets/appicons/Cinema4D.png";
import ClipStudioIcon from "@public/assets/appicons/ClipStudio.png";
import ClipStudioPaintIcon from "@public/assets/appicons/ClipStudioPaint.png";
import Live2DCubismIcon from "@public/assets/appicons/Live2DCubism.png";
import GraphicsGaleIcon from "@public/assets/appicons/GraphicsGale.png";
import AbletonLiveIntroIcon from "@public/assets/appicons/AbletonLiveIntro.png";
import AbletonLiveIntroAltIcon from "@public/assets/appicons/AbletonLiveIntroAlt.png";
import AbletonLiveStandardIcon from "@public/assets/appicons/AbletonLiveStandard.png";
import AbletonLiveStandardAltIcon from "@public/assets/appicons/AbletonLiveStandardAlt.png";
import AbletonLiveSuiteIcon from "@public/assets/appicons/AbletonLiveSuite.png";
import AbletonLiveSuiteAltIcon from "@public/assets/appicons/AbletonLiveSuiteAlt.png";
import AbletonLiveLiteIcon from "@public/assets/appicons/AbletonLiveLite.png";
import AbletonLiveLiteAltIcon from "@public/assets/appicons/AbletonLiveLiteAlt.png";
import AbletonLiveBetaIcon from "@public/assets/appicons/AbletonLiveBeta.png";
import AbletonLiveBetaAltIcon from "@public/assets/appicons/AbletonLiveBetaAlt.png";
import FLStudioIcon from "@public/assets/appicons/FLStudio.png";
import ReaperIcon from "@public/assets/appicons/Reaper.png";
import LeagueIcon from "@public/assets/appicons/League.png";
import MinecraftIcon from "@public/assets/appicons/Minecraft.png";
import PrismLauncherIcon from "@public/assets/appicons/PrismLauncher.png";
import SteamIcon from "@public/assets/appicons/Steam.png";
import DiscordIcon from "@public/assets/appicons/Discord.png";
import AegisubIcon from "@public/assets/appicons/Aegisub.png";
import AudacityIcon from "@public/assets/appicons/Audacity.png";
import DaVinciResolveIcon from "@public/assets/appicons/DaVinciResolve.png";
import FileZillaIcon from "@public/assets/appicons/FileZilla.png";
import GimpIcon from "@public/assets/appicons/GIMP.png";
import KritaIcon from "@public/assets/appicons/Krita.png";
import OBSIcon from "@public/assets/appicons/OBS.png";
import OBSAltIcon from "@public/assets/appicons/OBSAlt.png";
import qBittorrentIcon from "@public/assets/appicons/qBittorrent.png";
import SpotifyIcon from "@public/assets/appicons/Spotify.png";
import TixatiIcon from "@public/assets/appicons/Tixati.png";
import { useTranslations } from "next-intl";
import FadingImage from "@/components/ui/FadingImage";
import Button from "@/components/ui/Button";
import Search from "@/icons/Search";
import X from "@/icons/X";
import Download from "@/icons/Download";
import { AnimatePresence, delay, LayoutGroup } from "motion/react";

const Icons = [
	{
		name: "Adobe Creative Cloud Client",
		image: CreativeCloudClientIcon,
		file: "W11_Creative_Cloud_Client.ico",
	},
	{
		name: "Adobe Acrobat",
		image: AcrobatIcon,
		file: "W11_Acrobat.ico",
	},
	{
		name: "Adobe Scan",
		image: ScanIcon,
		file: "W11_Scan.ico",
	},
	{
		name: "Adobe Aero",
		image: AeroIcon,
		file: "W11_Aero.ico",
	},
	{
		name: "Adobe Animate",
		image: AnimateIcon,
		file: "W11_Animate.ico",
	},
	{
		name: "Adobe After Effects",
		image: AfterEffectsIcon,
		file: "W11_After_Effects.ico",
	},
	{
		name: "Adobe Audition",
		image: AuditionIcon,
		file: "W11_Audition.ico",
	},
	{
		name: "Adobe Character Animator",
		image: CharacterAnimatorIcon,
		file: "W11_Character_Animator.ico",
	},
	{
		name: "Adobe Dreamweaver",
		image: DreamweaverIcon,
		file: "W11_Dreamweaver.ico",
	},
	{
		name: "Adobe Fresco",
		image: FrescoIcon,
		file: "W11_Fresco.ico",
	},
	{
		name: "Adobe Illustrator",
		image: IllustratorIcon,
		file: "W11_Illustrator.ico",
	},
	{
		name: "Adobe InCopy",
		image: InCopyIcon,
		file: "W11_InCopy.ico",
	},
	{
		name: "Adobe InDesign",
		image: InDesignIcon,
		file: "W11_InDesign.ico",
	},
	{
		name: "Adobe Lightroom",
		image: LightroomIcon,
		file: "W11_Lightroom.ico",
	},
	{
		name: "Adobe Lightroom Classic",
		image: LightroomClassicIcon,
		file: "W11_Lightroom_Classic.ico",
	},
	{
		name: "Adobe Media Encoder",
		image: MediaEncoderIcon,
		file: "W11_Media_Encoder.ico",
	},
	{
		name: "Adobe Media Encoder (Alt)",
		image: MediaEncoderAltIcon,
		file: "W11_Media_Encoder_(alt).ico",
	},
	{
		name: "Adobe Photoshop",
		image: PhotoshopIcon,
		file: "W11_Photoshop.ico",
	},
	{
		name: "Adobe Premiere Pro",
		image: PremiereProIcon,
		file: "W11_Premiere_Pro.ico",
	},
	{
		name: "Adobe XD",
		image: XDIcon,
		file: "W11_XD.ico",
	},
	{
		name: "Affinity Designer",
		image: AffinityDesignerIcon,
		file: "W11_Designer.ico",
	},
	{
		name: "Affinity Photo",
		image: AffinityPhotoIcon,
		file: "W11_Photo.ico",
	},
	{
		name: "Affinity Publisher",
		image: AffinityPublisherIcon,
		file: "W11_Publisher.ico",
	},
	{
		name: "Affinity Designer (alt)",
		image: AffinityDesignerAltIcon,
		file: "W11_Designer_(alt).ico",
	},
	{
		name: "Affinity Photo (alt)",
		image: AffinityPhotoAltIcon,
		file: "W11_Photo_(alt).ico",
	},
	{
		name: "Affinity Publisher (alt)",
		image: AffinityPublisherAltIcon,
		file: "W11_Publisher_(alt).ico",
	},
	{
		name: "Aseprite",
		image: AsepriteIcon,
		file: "W11_Aseprite.ico",
	},
	{
		name: "Aseprite (alt)",
		image: AsepriteAltIcon,
		file: "W11_Aseprite_(alt).ico",
	},
	{
		name: "Blender",
		image: BlenderIcon,
		file: "W11_Blender.ico",
	},
	{
		name: "Cinema 4D",
		image: Cinema4DIcon,
		file: "W11_Cinema_4D.ico",
	},
	{
		name: "Clip Studio",
		image: ClipStudioIcon,
		file: "W11_Clip_Studio.ico",
	},
	{
		name: "Clip Studio Paint",
		image: ClipStudioPaintIcon,
		file: "W11_Clip_Studio_Paint.ico",
	},
	{
		name: "GIMP",
		image: GimpIcon,
		file: "W11_GIMP.ico",
	},
	{
		name: "GraphicsGale",
		image: GraphicsGaleIcon,
		file: "W11_GraphicsGale.ico",
	},
	{
		name: "Krita",
		image: KritaIcon,
		file: "W11_Krita.ico",
	},
	{
		name: "Live2D Cubism",
		image: Live2DCubismIcon,
		file: "W11_Live2D_Cubism.ico",
	},
	{
		name: "League of Legends",
		image: LeagueIcon,
		file: "W11_League.ico",
	},
	{
		name: "Minecraft",
		image: MinecraftIcon,
		file: "W11_Minecraft_grass.ico",
	},
	{
		name: "Prism Launcher",
		image: PrismLauncherIcon,
		file: "W11_Prism_Launcher.ico",
	},
	{
		name: "Steam",
		image: SteamIcon,
		file: "W11_Steam.ico",
	},
	{
		name: "Discord",
		image: DiscordIcon,
		file: "W11_Discord.ico",
	},
	{
		name: "FL Studio",
		image: FLStudioIcon,
		file: "W11_FL_Studio.ico",
	},
	{
		name: "Reaper",
		image: ReaperIcon,
		file: "W11_Reaper.ico",
	},
	{
		name: "Ableton Live Intro",
		image: AbletonLiveIntroIcon,
		file: "W11_Ableton_Live_Intro.ico",
	},
	{
		name: "Ableton Live Intro (alt)",
		image: AbletonLiveIntroAltIcon,
		file: "W11_Ableton_Live_Intro_(alt).ico",
	},
	{
		name: "Ableton Live Standard",
		image: AbletonLiveStandardIcon,
		file: "W11_Ableton_Live_Standard.ico",
	},
	{
		name: "Ableton Live Standard (alt)",
		image: AbletonLiveStandardAltIcon,
		file: "W11_Ableton_Live_Standard_(alt).ico",
	},
	{
		name: "Ableton Live Suite",
		image: AbletonLiveSuiteIcon,
		file: "W11_Ableton_Live_Suite.ico",
	},
	{
		name: "Ableton Live Suite (alt)",
		image: AbletonLiveSuiteAltIcon,
		file: "W11_Ableton_Live_Suite_(alt).ico",
	},
	{
		name: "Ableton Live Lite",
		image: AbletonLiveLiteIcon,
		file: "W11_Ableton_Live_Lite.ico",
	},
	{
		name: "Ableton Live Lite (alt)",
		image: AbletonLiveLiteAltIcon,
		file: "W11_Ableton_Live_Lite_(alt).ico",
	},
	{
		name: "Ableton Live Beta",
		image: AbletonLiveBetaIcon,
		file: "W11_Ableton_Live_Beta.ico",
	},
	{
		name: "Ableton Live Beta (alt)",
		image: AbletonLiveBetaAltIcon,
		file: "W11_Ableton_Live_Beta_(alt).ico",
	},
	{
		name: "Aegisub",
		image: AegisubIcon,
		file: "W11_Aegisub.ico",
	},
	{
		name: "Audacity",
		image: AudacityIcon,
		file: "W11_Audacity.ico",
	},
	{
		name: "DaVinci Resolve",
		image: DaVinciResolveIcon,
		file: "W11_Resolve.ico",
	},
	{
		name: "FileZilla",
		image: FileZillaIcon,
		file: "W11_FileZilla.ico",
	},
	{
		name: "OBS",
		image: OBSIcon,
		file: "W11_OBS.ico",
	},
	{
		name: "OBS (Alt)",
		image: OBSAltIcon,
		file: "W11_OBS_(alt).ico",
	},
	{
		name: "qBittorrent",
		image: qBittorrentIcon,
		file: "W11_qBittorrent.ico",
	},
	{
		name: "Spotify",
		image: SpotifyIcon,
		file: "W11_Spotify.ico",
	},
	{
		name: "Tixati",
		image: TixatiIcon,
		file: "W11_Tixati.ico",
	},
];

export default function Selector() {
	const t = useTranslations("APPICONS");

	const [search, setSearch] = useState("");
	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};
	const filteredIcons = Icons.filter((icon) => icon.name.toLowerCase().includes(search.toLowerCase()));

	const [selectedIcons, setSelectedIcons] = useState<{ name: string; file: string }[]>([]);
	const [loading, setLoading] = useState(false);
	const handleIconSelect = (icon: { name: string; file: string }) => {
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
	const handleDownloadSelectedIcons = async () => {
		setLoading(true);
		const zip = new JSZip();
		for (const icon of selectedIcons) {
			const response = await fetch(`/api/download/file/${icon.file}`);
			const blob = await response.blob();
			zip.file(`${icon.name}.ico`, blob);
		}
		zip.generateAsync({ type: "blob" }).then((blob) => {
			FileSaver.saveAs(blob, "Icons_for_takeout.zip");
		});
		setSelectedIcons([]);
		setLoading(false);
	};

	return (
		<div className="lg:grid grid-cols-3 border-y border-black/5 dark:border-white/5">
			<div className="col-span-2 lg:border-r border-black/5 dark:border-white/5">
				<div className="relative">
					<div
						onClick={() => setSearch("")}
						className={`absolute flex right-0 w-10 h-full items-center justify-center text-neutral-950 dark:text-white ${
							search && "hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
						} duration-100`}
					>
						{search ? <X /> : <Search />}
					</div>
					<div className="border-b border-black/5 dark:border-white/5">
						<input
							type="text"
							value={search}
							onChange={handleSearchChange}
							placeholder={t("Content.search")}
							className="w-full bg-transparent hover:bg-black/5 dark:hover:bg-white/5 hover:focus:bg-transparent outline-hidden focus:outline-hidden text-neutral-950 dark:text-white placeholder:text-neutral px-3 h-9 duration-100"
						/>
					</div>
				</div>
				<div className="w-full justify-center">
					{filteredIcons.length === 0 ? (
						<div className="flex w-full justify-center items-center py-6">
							<X className="size-12 fill-red" />
							<h3>
								{t("Content.noResults")}
								<span className="text-red">.</span>
							</h3>
						</div>
					) : (
						<div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12">
							{filteredIcons.map((icon) => (
								<button
									className={`relative group p-2 sm:p-4 ${
										selectedIcons.some((selectedIcon) => selectedIcon.name === icon.name)
											? "bg-black/5 dark:bg-white/5"
											: "hover:bg-black/5 hover:dark:bg-white/5"
									} active:bg-black/10 active:dark:bg-white/10 duration-75 hover:duration-0 ease-out`}
									key={icon.name}
									onClick={() => handleIconSelect(icon)}
								>
									{selectedIcons.some((selectedIcon) => selectedIcon.name === icon.name) && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="butt"
											strokeLinejoin="miter"
											className="absolute z-10 inset-6 stroke-neutral-950 dark:stroke-white"
										>
											<m.path
												d="M 4 12 L 9 17 L 20 6"
												initial={{ pathLength: 0 }}
												animate={{
													pathLength: 1,
													transition: {
														type: "spring",
														duration: 0.3,
														bounce: 0,
													},
												}}
											/>
										</svg>
									)}
									<FadingImage
										hideSpinner
										src={icon.image}
										alt={icon.name}
										style={{ transition: "opacity 0.2s", opacity: selectedIcons.some((selectedIcon) => selectedIcon.name === icon.name) ? 0.25 : 1 }}
										className="drop-shadow-sm"
									/>
								</button>
							))}
						</div>
					)}
				</div>
			</div>
			<div className="flex flex-col border-t lg:border-t-0 border-black/5 dark:border-white/5">
				<div className="pt-1 lg:pt-3 lg:px-4">
					<p className="relative text-2xl md:text-3xl mb-2">
						{t.rich("Content.Panel.iconsSelected", {
							count: selectedIcons.length,
							em: (chunks) => (
								<span className="text-neutral-950 dark:text-white font-bold">{chunks}</span>
							),
						})}
					</p>
					<p
						onClick={() => setSelectedIcons([])}
						className={`mb-2 ${
							loading || selectedIcons.length === 0
								? "pointer-events-none text-neutral-950/50 dark:text-white/50"
								: "text-link cursor-pointer"
						} duration-100`}
					>
						{t("Content.Panel.deselectAll")}
					</p>
					<ul className="list-disc list-inside flex flex-col">
						<AnimatePresence mode="sync">
							{selectedIcons.map((icon) => (
								<m.li
									key={icon.name}
									initial={{ y: 5, opacity: 0, height: 24 }}
									animate={{
										y: 0,
										opacity: 1,
										height: 24,
										transition: { ease: [0.22, 1, 0.36, 1], duration: 0.4 },
									}}
									exit={{
										opacity: 0,
										height: 0,
										transition: { ease: "linear", duration: 0.1, height: { delay: 0.1 } },
									}}
								>
									{icon.name}
								</m.li>
							))}
						</AnimatePresence>
					</ul>
				</div>
				<div className="mt-auto self-end">
					<Button onClick={handleDownloadSelectedIcons} disabled={loading || selectedIcons.length === 0}>
						{t("Content.Panel.downloadSelected")}
						{loading ? (
							<svg height={15} width={15} className="animate-spin">
								<circle
									cx={7.5}
									cy={7.5}
									r={6.75}
									strokeWidth={1.25}
									className="stroke-current fill-none"
									strokeDasharray={43}
									strokeDashoffset={11}
									strokeLinecap="butt" // hehe butt
								/>
							</svg>
						) : (
							<Download />
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
