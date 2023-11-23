import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import dynamic from "next/dynamic";
import Trans from "next-translate/Trans";
import FocusTrap from "focus-trap-react";
import * as Portal from "@radix-ui/react-portal";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import * as Toast from "@radix-ui/react-toast";
import * as Switch from "@radix-ui/react-switch";
import { useTransition, config, a, easings } from "@react-spring/web";

import Head from "components/Head";
import Title from "components/Title";
import Button from "components/Button";
import Lightbox from "components/Lightbox";

import HeroMina from "public/assets/mina/hero.webp";
import TransparentMina from "public/assets/mina/mina.webp";

export default function Mina() {
	const { t } = useTranslation();
	const [selectedImage, setSelectedImage] = useState(0);
	const [highlighted, setHighlighted] = useState("");
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const handleLightboxOpen = (id: number) => {
		setSelectedImage(id);
		document.body.classList.add("overflow-hidden");
		setLightboxOpen(true);
	};
	const handleLightboxClose = () => {
		document.body.classList.remove("overflow-hidden");
		setLightboxOpen(false);
	};

	const transitions = useTransition(lightboxOpen, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: config.stiff,
	});

	const Artworks = [
        {
			src: "https://static.pprmint.art/mina/aikoyori_3.webp",
			width: 1920,
			height: 1080,
			position: "object-center",
			caption: `${t("MINA:Content.Artworks.artworkBy")} Aikoyori`,
			link: "https://aikoyori.xyz",
			linkExternal: true,
			linkText: t("COMMON:visitWebsite"),
			linkIcon: "ri-global-line",
			noDownload: true,
		},
		{
			src: "https://static.pprmint.art/mina/layer_3.webp",
			width: 1500,
			height: 1900,
			position: "object-top",
			caption: `${t("MINA:Content.Artworks.artworkBy")} 108sketches`,
			link: "https://twitter.com/108sketches",
			linkExternal: true,
			linkText: t("COMMON:visitProfile"),
			linkIcon: "ri-user-line",
			noDownload: true,
		},
		{
			src: "https://static.pprmint.art/mina/nekomimi_2.webp",
			width: 1414,
			height: 2000,
			position: "object-top",
			caption: `${t("MINA:Content.Artworks.artworkBy")} Nekomimi`,
			link: "https://twitter.com/nekomimiwubs",
			linkExternal: true,
			linkText: t("COMMON:visitProfile"),
			linkIcon: "ri-user-line",
			noDownload: true,
		},
		{
			src: "https://static.pprmint.art/mina/wxz_2.webp",
			width: 1561,
			height: 2000,
			position: "object-top",
			caption: `${t("MINA:Content.Artworks.artworkBy")} wxsonz`,
			link: "https://twitter.com/wxsonz",
			linkExternal: true,
			linkText: t("COMMON:visitProfile"),
			linkIcon: "ri-user-line",
			noDownload: true,
			secondaryLink: "https://twitter.com/wxsonz/status/1699421416557269175",
			secondaryLinkExternal: true,
			secondaryLinkText: t("COMMON:viewOriginal"),
			secondaryLinkIcon: "ri-external-link-line",
		},
		{
			src: "https://static.pprmint.art/mina/sunnexo_1.webp",
			width: 1024,
			height: 1024,
			position: "object-center",
			caption: `${t("MINA:Content.Artworks.artworkBy")} Sunnexo`,
			link: "https://sunnexo.moe",
			linkExternal: true,
			linkText: t("COMMON:visitWebsite"),
			linkIcon: "ri-user-line",
			noDownload: true,
			pixelated: true,
		},
		{
			src: "https://static.pprmint.art/mina/aikoyori_2.webp",
			width: 902,
			height: 902,
			position: "object-right",
			caption: `${t("MINA:Content.Artworks.artworkBy")} Aikoyori`,
			link: "https://aikoyori.xyz",
			linkExternal: true,
			linkText: t("COMMON:visitWebsite"),
			linkIcon: "ri-global-line",
			noDownload: true,
		},
		{
			src: "https://static.pprmint.art/mina/layer_2.webp",
			width: 2000,
			height: 1577,
			position: "object-right",
			caption: `${t("MINA:Content.Artworks.artworkBy")} 108sketches`,
			link: "https://twitter.com/108sketches",
			linkExternal: true,
			linkText: t("COMMON:visitProfile"),
			linkIcon: "ri-user-line",
			noDownload: true,
		},
		{
			src: "https://static.pprmint.art/mina/autsellia_5.webp",
			width: 639,
			height: 479,
			position: "object-left",
			caption: `${t("MINA:Content.Artworks.artworkBy")} Autsellia`,
			link: "https://twitter.com/autsellia",
			linkExternal: true,
			linkText: t("COMMON:visitProfile"),
			linkIcon: "ri-user-line",
			noDownload: true,
			secondaryLink: "https://twitter.com/autsellia/status/1686807119100522496",
			secondaryLinkExternal: true,
			secondaryLinkText: t("COMMON:viewOriginal"),
			secondaryLinkIcon: "ri-external-link-line",
		},
		{
			src: "https://static.pprmint.art/mina/autsellia_4.webp",
			width: 698,
			height: 808,
			position: "object-center",
			caption: `${t("MINA:Content.Artworks.artworkBy")} Autsellia`,
			link: "https://twitter.com/autsellia",
			linkExternal: true,
			linkText: t("COMMON:visitProfile"),
			linkIcon: "ri-user-line",
			noDownload: true,
			secondaryLink: "https://twitter.com/autsellia/status/1688222449593122816",
			secondaryLinkExternal: true,
			secondaryLinkText: t("COMMON:viewOriginal"),
			secondaryLinkIcon: "ri-external-link-line",
            nsfw: true,
		},
		{
			src: "https://static.pprmint.art/mina/aikoyori_1.webp",
			width: 1280,
			height: 970,
			position: "object-right",
			caption: `${t("MINA:Content.Artworks.artworkBy")} Aikoyori`,
			link: "https://aikoyori.xyz",
			linkExternal: true,
			linkText: t("COMMON:visitWebsite"),
			linkIcon: "ri-global-line",
			noDownload: true,
		},
		{
			src: "https://static.pprmint.art/mina/autsellia_3.webp",
			width: 512,
			height: 512,
			position: "object-top",
			caption: `${t("MINA:Content.Artworks.artworkBy")} Autsellia`,
			link: "https://twitter.com/autsellia",
			linkExternal: true,
			linkText: t("COMMON:visitProfile"),
			linkIcon: "ri-user-line",
			noDownload: true,
			secondaryLink: "https://www.differentstrokes.xyz/view/1685337476@7564374",
			secondaryLinkExternal: true,
			secondaryLinkText: t("COMMON:viewOriginal"),
			secondaryLinkIcon: "ri-external-link-line",
			pixelated: true,
		},
		{
			src: "https://static.pprmint.art/mina/layer_1.webp",
			width: 1203,
			height: 2000,
			position: "object-top",
			caption: `${t("MINA:Content.Artworks.artworkBy")} 108sketches`,
			link: "https://twitter.com/108sketches",
			linkExternal: true,
			linkText: t("COMMON:visitProfile"),
			linkIcon: "ri-user-line",
			noDownload: true,
		},
		{
			src: "https://static.pprmint.art/mina/nekomimi_1.webp",
			width: 2000,
			height: 2000,
			position: "object-top",
			caption: `${t("MINA:Content.Artworks.artworkBy")} Nekomimi`,
			link: "https://twitter.com/nekomimiwubs",
			linkExternal: true,
			linkText: t("COMMON:visitProfile"),
			linkIcon: "ri-user-line",
			noDownload: true,
		},
		{
			src: "https://static.pprmint.art/mina/autsellia_2.webp",
			width: 1380,
			height: 2000,
			position: "object-top",
			caption: `${t("MINA:Content.Artworks.artworkBy")} Autsellia`,
			link: "https://twitter.com/autsellia",
			linkExternal: true,
			linkText: t("COMMON:visitProfile"),
			linkIcon: "ri-user-line",
			noDownload: true,
		},
		{
			src: "https://static.pprmint.art/mina/autsellia_1.webp",
			width: 546,
			height: 784,
			position: "object-top",
			caption: `${t("MINA:Content.Artworks.artworkBy")} Autsellia`,
			link: "https://twitter.com/autsellia",
			linkExternal: true,
			linkText: t("COMMON:visitProfile"),
			linkIcon: "ri-user-line",
			noDownload: true,
		},
		{
			src: "https://static.pprmint.art/mina/wxz_1.webp",
			width: 1380,
			height: 2000,
			position: "object-top",
			caption: `${t("MINA:Content.Artworks.artworkBy")} wxsonz`,
			link: "https://twitter.com/wxsonz",
			linkExternal: true,
			linkText: t("COMMON:visitProfile"),
			linkIcon: "ri-user-line",
			noDownload: true,
			secondaryLink: "https://twitter.com/wxsonz/status/1573463483122753536",
			secondaryLinkExternal: true,
			secondaryLinkText: t("COMMON:viewOriginal"),
			secondaryLinkIcon: "ri-external-link-line",
		},
	];

	const MinaDesignPoints = (
		<div className="relative max-w-xs lg:max-w-none mx-auto">
			<div className="absolute w-full h-full z-10">
				<div
					className={`absolute border-4 border-green drop-shadow-md w-[40%] aspect-square rounded-full top-[3%] right-[7%] ${
						highlighted === "band"
							? "backdrop-brightness-[140%] scale-100 sopacity-100"
							: "scale-50 opacity-0"
					} duration-250 ease-out origin-center`}
				/>
				<div
					className={`absolute border-4 border-green drop-shadow-md w-[20%] aspect-square rounded-full top-[7%] left-[32%] ${
						highlighted === "ahoge"
							? "backdrop-brightness-[140%] scale-100 sopacity-100"
							: "scale-50 opacity-0"
					} duration-250 ease-out origin-center`}
				/>
				<div
					className={`absolute border-4 border-green drop-shadow-md w-[19%] aspect-square rounded-full top-[44%] left-[14%] ${
						highlighted === "accessories"
							? "backdrop-brightness-[140%] scale-100 sopacity-100"
							: "scale-50 opacity-0"
					} duration-250 ease-out origin-center`}
				/>
				<div
					className={`absolute border-4 border-green drop-shadow-md w-[19%] aspect-square rounded-full top-[43.5%] right-[29%] ${
						highlighted === "accessories"
							? "backdrop-brightness-[140%] scale-100 sopacity-100"
							: "scale-50 opacity-0"
					} duration-250 ease-out origin-center`}
				/>
				<div
					className={`absolute border-4 border-green drop-shadow-md w-[8%] aspect-square rounded-full top-[33.6%] right-[24.5%] ${
						highlighted === "accessories"
							? "backdrop-brightness-[140%] scale-100 sopacity-100"
							: "scale-50 opacity-0"
					} duration-250 ease-out origin-center`}
				/>
				<div
					className={`absolute border-4 border-green drop-shadow-md w-[15%] aspect-square rounded-full top-[59.7%] right-[33%] ${
						highlighted === "leaf"
							? "backdrop-brightness-[140%] scale-100 sopacity-100"
							: "scale-50 opacity-0"
					} duration-250 ease-out origin-center`}
				/>
			</div>
			<Image
				src={TransparentMina}
				alt=""
				className={`${highlighted === "" ? "brightness-100" : "brightness-75"} duration-200`}
			/>
		</div>
	);

	// Toast
	const [open, setOpen] = useState(false);
	const timerRef = useRef(0);
	const [currentColor, setCurrentColor] = useState("");

	// NSFW switch
	const [showNsfw, setShowNsfw] = useState(false);
	useEffect(() => {
        let horny = localStorage.getItem("horny");
		if (horny) {
			setShowNsfw(true);
		}
	}, []);
	const [dialogOpen, setDialogOpen] = useState(false);
	const dialogTransitions = useTransition(dialogOpen, {
		from: { opacity: 0, x: "-50%", y: "-40%" },
		enter: {
			opacity: 1,
			x: "-50%",
			y: "-50%",
			config: {
				easing: easings.easeOutExpo,
				duration: 500,
			},
		},
		leave: {
			opacity: 0,
			x: "-50%",
			y: "-40%",
			config: {
				easing: easings.easeInQuint,
				duration: 400,
			},
		},
	});

	function HornyDialog() {
		const { t } = useTranslation();
		return (
			<Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
				{dialogTransitions((styles, item) =>
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
											{t("MINA:Content.NSFW.Dialog.title")}
										</h1>
										<Dialog.Close className=" rounded-full w-9 h-9 mx-1 hover:bg-neutral-800 duration-100">
											<i className="ri-close-line text-xl text-neutral-50" />
										</Dialog.Close>
									</div>
									<div className="px-6">
										<p>{t("MINA:Content.NSFW.Dialog.text1")}</p>
										<p>{t("MINA:Content.NSFW.Dialog.text2")}</p>
									</div>
									<div className="flex flex-row flex-wrap gap-3 pt-6 px-6">
										<Button
											color="green"
											onClick={() => {
												setShowNsfw(true);
												localStorage.setItem("confirmedHornyDialog", "interestingly, yes");
												localStorage.setItem("horny", "understandably so");
												setDialogOpen(false);
											}}
										>
											{t("MINA:Content.NSFW.Dialog.admitSins")}
											<i className="ri-pulse-line" />
										</Button>
										<Button outlined color="green" onClick={() => setDialogOpen(false)}>
											{t("MINA:Content.NSFW.Dialog.nevermind")}
											<i className="ri-zzz-line" />
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

	const toggleNsfw = () => {
        const seenHornyDialog = localStorage.getItem("confirmedHornyDialog");
		if (!showNsfw) {
			if (!seenHornyDialog) {
				setDialogOpen(true);
			} else {
				localStorage.setItem("horny", "understandably so");
				setShowNsfw(true);
			}
		} else {
			localStorage.removeItem("horny");
			setShowNsfw(false);
		}
	};

    const filteredArtworks = showNsfw ? Artworks : Artworks.filter(artwork => !artwork.nsfw);

	return (
		<>
			<Head
				title={t("MINA:Head.title")}
				description={t("MINA:Head.description")}
				image="https://pprmint.art/assets/mina/embed_gold.png"
			/>
			<Title title={t("MINA:Head.title")} description={t("MINA:Head.description")}>
				<Image
					src={HeroMina}
					alt="Original Mina artwork by wxsonz."
					fill
					className="object-cover"
					quality={90}
				/>
			</Title>
			<main>
				<Toast.Provider swipeDirection="right">
					<section className="my-12 max-w-7xl mx-auto px-6 md:px-9">
						<div className="lg:grid grid-cols-2 lg:grid-cols-3 gap-6">
							{MinaDesignPoints}
							<Accordion.Root type="single" defaultValue="lore" className="lg:col-span-2">
								<Accordion.Item value="lore">
									<Accordion.Trigger className="text-left font-display w-full data-[state=closed]:pt-6 data-[state=open]:py-6 font-semibold text-neutral-50 text-2xl data-[state=open]:text-3xl md:text-3xl data-[state=open]:md:text-4xl duration-400 in-out-custom">
										{t("MINA:Content.About.heading")}
									</Accordion.Trigger>
									<Accordion.Content className="data-[state=closed]:animate-accordion-slide-up data-[state=open]:animate-accordion-slide-down overflow-hidden">
										<p>
											{t("MINA:Content.About.text1", { birthyear: `${new Date().getFullYear() - 2004}` })}
										</p>
										<p>{t("MINA:Content.About.text2")}</p>
										<p>{t("MINA:Content.About.text3")}</p>
										<Trans
											i18nKey="MINA:Content.About.text4"
											components={{
												Link: (
													<Link
														href="https://twitter.com/wxsonz"
														target="_blank"
														rel="noopener noreferrer"
														className="text-blue decoration-2 decoration-dotted hover:decoration-solid underline decoration-blue-800 hover:decoration-blue duration-100"
													/>
												),
											}}
										/>
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value="design">
									<Accordion.Trigger className="text-left font-display w-full data-[state=closed]:pt-6 data-[state=open]:py-6 font-semibold text-neutral-50 text-2xl data-[state=open]:text-3xl md:text-3xl data-[state=open]:md:text-4xl duration-400 in-out-custom">
										{t("MINA:Content.Design.heading")}
									</Accordion.Trigger>
									<Accordion.Content className="data-[state=closed]:animate-accordion-slide-up data-[state=open]:animate-accordion-slide-down overflow-hidden">
										<div className="grid sm:grid-cols-2 gap-3" onMouseLeave={() => setHighlighted("")}>
											<div
												onMouseEnter={() => setHighlighted("band")}
												className={`${
													highlighted === "band" ? "bg-neutral-800" : "bg-neutral-900"
												} rounded-md p-5 duration-100 cursor-default`}
											>
												<h4 className="font-display font-semibold text-neutral-50 text-xl md:text-2xl pb-1">
													{t("MINA:Content.Design.HairBand.heading")}
												</h4>
												<p>{t("MINA:Content.Design.HairBand.text")}</p>
											</div>
											<div
												onMouseEnter={() => setHighlighted("ahoge")}
												className={`${
													highlighted === "ahoge" ? "bg-neutral-800" : "bg-neutral-900"
												} rounded-md p-5 duration-100 cursor-default`}
											>
												<h4 className="font-display font-semibold text-neutral-50 text-xl md:text-2xl pb-1">
													{t("MINA:Content.Design.Ahoge.heading")}
												</h4>
												<p>{t("MINA:Content.Design.Ahoge.text")}</p>
											</div>
											<div
												onMouseEnter={() => setHighlighted("accessories")}
												className={`${
													highlighted === "accessories" ? "bg-neutral-800" : "bg-neutral-900"
												} rounded-md p-5 duration-100 cursor-default`}
											>
												<h4 className="font-display font-semibold text-neutral-50 text-xl md:text-2xl pb-1">
													{t("MINA:Content.Design.Accessories.heading")}
												</h4>
												<p>{t("MINA:Content.Design.Accessories.text")}</p>
											</div>
											<div
												onMouseEnter={() => setHighlighted("leaf")}
												className={`${
													highlighted === "leaf" ? "bg-neutral-800" : "bg-neutral-900"
												} rounded-md p-5 duration-100 cursor-default`}
											>
												<h4 className="font-display font-semibold text-neutral-50 text-xl md:text-2xl pb-1">
													{t("MINA:Content.Design.LeafDesign.heading")}
												</h4>
												<p>{t("MINA:Content.Design.LeafDesign.text")}</p>
											</div>
										</div>
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value="colors">
									<Accordion.Trigger className="text-left font-display w-full data-[state=closed]:pt-6 data-[state=open]:py-6 font-semibold text-neutral-50 text-2xl data-[state=open]:text-3xl md:text-3xl data-[state=open]:md:text-4xl duration-400 in-out-custom">
										{t("MINA:Content.Colors.heading")}
									</Accordion.Trigger>
									<Accordion.Content className="data-[state=closed]:animate-accordion-slide-up data-[state=open]:animate-accordion-slide-down overflow-hidden">
										<div className="flex -space-x-2 pb-3">
											<div
												className="group grid items-center text-center bg-green-300 active:bg-green-500 text-neutral-950 border-2 border-neutral-950 w-10 hover:w-24 h-10 rounded-full duration-150 ease-out overflow-hidden cursor-pointer"
												onClick={() => {
													navigator.clipboard.writeText("#5ae39c");
													setOpen(false);
													window.clearTimeout(timerRef.current);
													timerRef.current = window.setTimeout(() => {
														setCurrentColor("#5ae39c");
														setOpen(true);
													}, 100);
												}}
											>
												<span className="selection:bg-neutral-50 font-mono opacity-0 group-hover:opacity-100 duration-150 tracking-tighter">
													#5ae39c
												</span>
											</div>
											<div
												className="group grid items-center text-center bg-green active:bg-green-700 text-neutral-950 border-2 border-neutral-950 w-10 hover:w-24 h-10 rounded-full duration-150 ease-out overflow-hidden cursor-pointer"
												onClick={() => {
													navigator.clipboard.writeText("#00cc66");
													setOpen(false);
													window.clearTimeout(timerRef.current);
													timerRef.current = window.setTimeout(() => {
														setCurrentColor("#00cc66");
														setOpen(true);
													}, 100);
												}}
											>
												<span className="selection:bg-neutral-50 font-mono opacity-0 group-hover:opacity-100 duration-150 tracking-tighter">
													#00cc66
												</span>
											</div>
											<div
												className="group grid items-center text-center bg-green-700 active:bg-green-800 text-neutral-50 border-2 border-neutral-950 w-10 hover:w-24 h-10 rounded-full duration-150 ease-out overflow-hidden cursor-pointer"
												onClick={() => {
													navigator.clipboard.writeText("#048541");
													setOpen(false);
													window.clearTimeout(timerRef.current);
													timerRef.current = window.setTimeout(() => {
														setCurrentColor("#048541");
														setOpen(true);
													}, 100);
												}}
											>
												<span className="selection:bg-neutral-50 font-mono opacity-0 group-hover:opacity-100 duration-150 tracking-tighter">
													#048541
												</span>
											</div>
											<div
												className="group grid items-center text-center bg-cyan active:bg-cyan-700 text-neutral-950 border-2 border-neutral-950 w-10 hover:w-24 h-10 rounded-full duration-150 ease-out overflow-hidden cursor-pointer"
												onClick={() => {
													navigator.clipboard.writeText("#44ccdd");
													setOpen(false);
													window.clearTimeout(timerRef.current);
													timerRef.current = window.setTimeout(() => {
														setCurrentColor("#44ccdd");
														setOpen(true);
													}, 100);
												}}
											>
												<span className="selection:bg-neutral-50 font-mono opacity-0 group-hover:opacity-100 duration-150 tracking-tighter">
													#44ccdd
												</span>
											</div>
											<div
												className="group grid items-center text-center bg-blue active:bg-blue-700 text-neutral-950 border-2 border-neutral-950 w-10 hover:w-24 h-10 rounded-full duration-150 ease-out overflow-hidden cursor-pointer"
												onClick={() => {
													navigator.clipboard.writeText("#4499ee");
													setOpen(false);
													window.clearTimeout(timerRef.current);
													timerRef.current = window.setTimeout(() => {
														setCurrentColor("#4499ee");
														setOpen(true);
													}, 100);
												}}
											>
												<span className="selection:bg-neutral-50 font-mono opacity-0 group-hover:opacity-100 duration-150 tracking-tighter">
													#4499ee
												</span>
											</div>
											<div
												className="group grid items-center text-center bg-neutral-900 active:bg-neutral-950 text-neutral-50 border-2 border-neutral-950 w-10 hover:w-24 h-10 rounded-full duration-150 ease-out overflow-hidden cursor-pointer"
												onClick={() => {
													navigator.clipboard.writeText("#222222");
													setOpen(false);
													window.clearTimeout(timerRef.current);
													timerRef.current = window.setTimeout(() => {
														setCurrentColor("#222222");
														setOpen(true);
													}, 100);
												}}
											>
												<span className="selection:bg-neutral-50 font-mono opacity-0 group-hover:opacity-100 duration-150 tracking-tighter">
													#222222
												</span>
											</div>
											<div
												className="group grid items-center text-center bg-neutral-800 active:bg-neutral-900 text-neutral-50 border-2 border-neutral-950 w-10 hover:w-24 h-10 rounded-full duration-150 ease-out overflow-hidden cursor-pointer"
												onClick={() => {
													navigator.clipboard.writeText("#333333");
													setOpen(false);
													window.clearTimeout(timerRef.current);
													timerRef.current = window.setTimeout(() => {
														setCurrentColor("#333333");
														setOpen(true);
													}, 100);
												}}
											>
												<span className="selection:bg-neutral-50 font-mono opacity-0 group-hover:opacity-100 duration-150 tracking-tighter">
													#333333
												</span>
											</div>
											<div
												className="group grid items-center text-center bg-orange-50 active:bg-orange-200 text-neutral-950 border-2 border-neutral-950 w-10 hover:w-24 h-10 rounded-full duration-150 ease-out overflow-hidden cursor-pointer"
												onClick={() => {
													navigator.clipboard.writeText("#ffeee4");
													setOpen(false);
													window.clearTimeout(timerRef.current);
													timerRef.current = window.setTimeout(() => {
														setCurrentColor("#ffeee4");
														setOpen(true);
													}, 100);
												}}
											>
												<span className="selection:bg-neutral-50 font-mono opacity-0 group-hover:opacity-100 duration-150 tracking-tighter whitespace-nowrap">
													pale af
												</span>
											</div>
										</div>
										<p>{t("MINA:Content.Colors.text1")}</p>
										<p>{t("MINA:Content.Colors.text2")}</p>
									</Accordion.Content>
									<Toast.Root
										className="flex gap-6 items-center p-3 rounded-xl shadow-lg shadow-neutral-950/50 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border-neutral-50/10 ring-1 ring-neutral-950/75 border data-[state=open]:animate-toast-slide-in data-[state=closed]:animate-fade-out-scale-down data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-toast-slide-out"
										open={open}
										onOpenChange={setOpen}
									>
										<div
											className="w-[30px] h-[30px] rounded-full border border-neutral-50/10"
											style={{ backgroundColor: currentColor }}
										/>
										<Toast.Description>{t("COMMON:copied")}</Toast.Description>
										<Toast.Close>
											<i className="ri-close-line text-neutral-50 hover:bg-neutral-50/10 active:bg-neutral-50/5 p-1 rounded-full duration-100" />
										</Toast.Close>
									</Toast.Root>
									<Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 p-[var(--viewport-padding)] flex flex-col w-max z-50 outline-none" />
								</Accordion.Item>
								<Accordion.Item value="fanart">
									<Accordion.Trigger className="text-left font-display w-full data-[state=closed]:pt-6 data-[state=open]:py-6 font-semibold text-neutral-50 text-2xl data-[state=open]:text-3xl md:text-3xl data-[state=open]:md:text-4xl duration-400 in-out-custom">
										{t("MINA:Content.Fanart.heading")}
									</Accordion.Trigger>
									<Accordion.Content className="data-[state=closed]:animate-accordion-slide-up data-[state=open]:animate-accordion-slide-down overflow-hidden">
										<p>{t("MINA:Content.Fanart.text1")}</p>
										<p>{t("MINA:Content.Fanart.text2")}</p>
										<p>
											<Trans
												i18nKey="MINA:Content.Fanart.text3"
												components={{
													Link: (
														<Link
															href="/contact"
															className="text-neutral-50 underline decoration-2 decoration-dotted hover:decoration-solid decoration-neutral-50/75 hover:decoration-neutral-50 duration-100"
														/>
													),
												}}
											/>
										</p>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion.Root>
						</div>
					</section>
					<section className="my-12">
						<div className="py-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-2 px-2">
							{filteredArtworks.map((Artwork, index) => (
								<button
									key={Artwork.src}
									onClick={() => handleLightboxOpen(index)}
									className="aspect-square relative group overflow-hidden rounded-lg hover:contrast-[80%] active:contrast-100 hover:scale-[102%] active:scale-100 duration-200 active:duration-75 hover:shadow-xl hover:z-10 cursor-zoom-in"
								>
									<Image
										src={Artwork.src}
										fill
										alt=""
										sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, (max-width: 1920px) 25vw, 20vw"
										className={`h-full object-cover bg-neutral-50/10 ${Artwork.position}`}
									/>
								</button>
							))}
						</div>
					</section>
					<section className="flex items-center justify-center my-12 max-w-7xl mx-auto px-6 md:px-9">
						<label className="Label" htmlFor="light-theme" style={{ paddingRight: 15 }}>
							{t("MINA:Content.NSFW.switch")}
						</label>
						<Switch.Root
							className="group relative w-14 h-8 rounded-full bg-neutral-800  data-[state='checked']:bg-green duration-200 ease-out"
							id="light-theme"
							onClick={toggleNsfw}
							checked={showNsfw}
						>
							<Switch.Thumb className="flex items-center justify-center w-6 h-6 group-active:w-8 data-[state='checked']:group-active:translate-x-5 rounded-full bg-gradient-to-b from-neutral-50 to-neutral-100 translate-x-1 data-[state='checked']:translate-x-7 shadow-md duration-200 ease-out">
								<div className="h-2.5 w-2.5 rounded-full group-data-[state='checked']:w-0 ring-2 group-data-[state='checked']:ring-1 ring-neutral-700 group-data-[state='checked']:ring-green-700 duration-200 ease-out" />
							</Switch.Thumb>
						</Switch.Root>
					</section>
				</Toast.Provider>
			</main>
			<HornyDialog />
			{transitions((styles, item) =>
				item ? (
					<FocusTrap>
						<Portal.Root className="fixed z-50">
							<a.div style={styles}>
								<Lightbox
									images={filteredArtworks}
									aspectRatio="square"
									selectedImage={selectedImage}
									onClose={() => handleLightboxClose()}
								/>
							</a.div>
						</Portal.Root>
					</FocusTrap>
				) : null
			)}
		</>
	);
}