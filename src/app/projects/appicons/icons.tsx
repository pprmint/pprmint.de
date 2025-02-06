"use client";
import { useState, ChangeEvent } from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import * as m from "motion/react-m";

import AcrobatIcon from "../../../../public/assets/appicons/Acrobat.png";
import AeroIcon from "../../../../public/assets/appicons/Aero.png";
import AfterEffectsIcon from "../../../../public/assets/appicons/AfterEffects.png";
import AnimateIcon from "../../../../public/assets/appicons/Animate.png";
import AuditionIcon from "../../../../public/assets/appicons/Audition.png";
import CharacterAnimatorIcon from "../../../../public/assets/appicons/CharacterAnimator.png";
import CreativeCloudClientIcon from "../../../../public/assets/appicons/CreativeCloudClient.png";
import DreamweaverIcon from "../../../../public/assets/appicons/Dreamweaver.png";
import FrescoIcon from "../../../../public/assets/appicons/Fresco.png";
import IllustratorIcon from "../../../../public/assets/appicons/Illustrator.png";
import InCopyIcon from "../../../../public/assets/appicons/InCopy.png";
import InDesignIcon from "../../../../public/assets/appicons/InDesign.png";
import LightroomIcon from "../../../../public/assets/appicons/Lightroom.png";
import LightroomClassicIcon from "../../../../public/assets/appicons/LightroomClassic.png";
import MediaEncoderIcon from "../../../../public/assets/appicons/MediaEncoder.png";
import MediaEncoderAltIcon from "../../../../public/assets/appicons/MediaEncoderAlt.png";
import PhotoshopIcon from "../../../../public/assets/appicons/Photoshop.png";
import PremiereProIcon from "../../../../public/assets/appicons/PremierePro.png";
import ScanIcon from "../../../../public/assets/appicons/Scan.png";
import XDIcon from "../../../../public/assets/appicons/XD.png";
import AffinityDesignerIcon from "../../../../public/assets/appicons/AffinityDesigner.png";
import AffinityPhotoIcon from "../../../../public/assets/appicons/AffinityPhoto.png";
import AffinityPublisherIcon from "../../../../public/assets/appicons/AffinityPublisher.png";
import AffinityDesignerAltIcon from "../../../../public/assets/appicons/AffinityDesignerAlt.png";
import AffinityPhotoAltIcon from "../../../../public/assets/appicons/AffinityPhotoAlt.png";
import AffinityPublisherAltIcon from "../../../../public/assets/appicons/AffinityPublisherAlt.png";
import AsepriteIcon from "../../../../public/assets/appicons/Aseprite.png";
import AsepriteAltIcon from "../../../../public/assets/appicons/AsepriteAlt.png";
import BlenderIcon from "../../../../public/assets/appicons/Blender.png";
import Cinema4DIcon from "../../../../public/assets/appicons/Cinema4D.png";
import ClipStudioIcon from "../../../../public/assets/appicons/ClipStudio.png";
import ClipStudioPaintIcon from "../../../../public/assets/appicons/ClipStudioPaint.png";
import Live2DCubismIcon from "../../../../public/assets/appicons/Live2DCubism.png";
import GraphicsGaleIcon from "../../../../public/assets/appicons/GraphicsGale.png";
import AbletonLiveIntroIcon from "../../../../public/assets/appicons/AbletonLiveIntro.png";
import AbletonLiveIntroAltIcon from "../../../../public/assets/appicons/AbletonLiveIntroAlt.png";
import AbletonLiveStandardIcon from "../../../../public/assets/appicons/AbletonLiveStandard.png";
import AbletonLiveStandardAltIcon from "../../../../public/assets/appicons/AbletonLiveStandardAlt.png";
import AbletonLiveSuiteIcon from "../../../../public/assets/appicons/AbletonLiveSuite.png";
import AbletonLiveSuiteAltIcon from "../../../../public/assets/appicons/AbletonLiveSuiteAlt.png";
import AbletonLiveLiteIcon from "../../../../public/assets/appicons/AbletonLiveLite.png";
import AbletonLiveLiteAltIcon from "../../../../public/assets/appicons/AbletonLiveLiteAlt.png";
import AbletonLiveBetaIcon from "../../../../public/assets/appicons/AbletonLiveBeta.png";
import AbletonLiveBetaAltIcon from "../../../../public/assets/appicons/AbletonLiveBetaAlt.png";
import FLStudioIcon from "../../../../public/assets/appicons/FLStudio.png";
import ReaperIcon from "../../../../public/assets/appicons/Reaper.png";
import LeagueIcon from "../../../../public/assets/appicons/League.png";
import MinecraftIcon from "../../../../public/assets/appicons/Minecraft.png";
import PrismLauncherIcon from "../../../../public/assets/appicons/PrismLauncher.png";
import SteamIcon from "../../../../public/assets/appicons/Steam.png";
import DiscordIcon from "../../../../public/assets/appicons/Discord.png";
import AegisubIcon from "../../../../public/assets/appicons/Aegisub.png";
import AudacityIcon from "../../../../public/assets/appicons/Audacity.png";
import DaVinciResolveIcon from "../../../../public/assets/appicons/DaVinciResolve.png";
import FileZillaIcon from "../../../../public/assets/appicons/FileZilla.png";
import GimpIcon from "../../../../public/assets/appicons/GIMP.png";
import KritaIcon from "../../../../public/assets/appicons/Krita.png";
import OBSIcon from "../../../../public/assets/appicons/OBS.png";
import OBSAltIcon from "../../../../public/assets/appicons/OBSAlt.png";
import qBittorrentIcon from "../../../../public/assets/appicons/qBittorrent.png";
import SpotifyIcon from "../../../../public/assets/appicons/Spotify.png";
import TixatiIcon from "../../../../public/assets/appicons/Tixati.png";
import { useTranslations } from "next-intl";
import FadingImage from "src/components/ui/FadingImage";
import Button from "src/components/ui/Button";
import Search from "src/icons/Search";
import X from "src/icons/X";
import Download from "src/icons/Download";
import { AnimatePresence } from "motion/react";

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

export default function Selector() {
	const t = useTranslations("APPICONS");

	const [search, setSearch] = useState("");
	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};
	const filteredIcons = Icons.filter((icon) => icon.name.toLowerCase().includes(search.toLowerCase()));

	const [selectedIcons, setSelectedIcons] = useState<{ name: string; link: string }[]>([]);
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
	const handleDownloadSelectedIcons = async () => {
		setLoading(true);
		const zip = new JSZip();
		for (const icon of selectedIcons) {
			const response = await fetch(`https://static.pprmint.de/download/AppIcons${icon.link}`);
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
					<input
						type="text"
						value={search}
						onChange={handleSearchChange}
						placeholder={t("Content.search")}
						className="w-full border-b border-black/5 dark:border-white/5 bg-transparent hover:bg-black/5 dark:hover:bg-white/5 hover:focus:bg-transparent outline-none focus:outline-none text-neutral-950 dark:text-white placeholder:text-neutral px-3 py-2 duration-100"
					/>
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
											: ""
									} duration-200 ease-out`}
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
														delay: 0.1,
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
										style={{ transition: "opacity 0.2s" }}
										className={`${selectedIcons.some((selectedIcon) => selectedIcon.name === icon.name) && "opacity-25"} drop-shadow`}
									/>
								</button>
							))}
						</div>
					)}
				</div>
			</div>
			<div>
				<div className="flex justify-between border-y lg:border-t-0 border-black/5 dark:border-white/5">
					<p className="relative text-2xl mt-0.5 ml-2">
						{t.rich("Content.Panel.iconsSelected", {
							count: selectedIcons.length,
							em: (chunks) => (
								<span className="text-neutral-950 dark:text-white font-bold">{chunks}</span>
							),
						})}
					</p>
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
				<div>
					<p
						onClick={() => setSelectedIcons([])}
						className={`px-2 ${loading || selectedIcons.length === 0 ? "pointer-events-none text-neutral-950/50 dark:text-white/50" : "text-link cursor-pointer"} duration-100`}
					>
						{t("Content.Panel.deselectAll")}
					</p>
					<m.ul className="list-disc list-inside px-2">
						<AnimatePresence mode="sync">
							{selectedIcons.map((icon) => (
								<m.li
									key={icon.name}
									initial={{ y: 5, opacity: 0 }}
									animate={{
										y: 0,
										opacity: 1,
										transition: { type: "spring", duration: 0.5, bounce: 0 },
									}}
									exit={{ opacity: 0, transition: { type: "linear", duration: 0.2 } }}
									layout
								>
									{icon.name}
								</m.li>
							))}
						</AnimatePresence>
					</m.ul>
				</div>
			</div>
		</div>
	);
}
