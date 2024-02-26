import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import FocusTrap from "focus-trap-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import * as Portal from "@radix-ui/react-portal";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import * as Toast from "@radix-ui/react-toast";
import * as Switch from "@radix-ui/react-switch";
import * as Select from "@radix-ui/react-select";
import { useTransition, useSpring, config, a, easings } from "@react-spring/web";

import MinaArtwork, { MinaArtworks } from "types/mina-artwork";
import Head from "src/components/Head";
import Title from "src/components/Title";
import Button from "src/components/Button";
import MinaLightbox from "src/components/MinaLightbox";
import FadingImage from "src/components/FadingImage";

import HeroMina from "public/assets/mina/hero.webp";
import TransparentMina from "public/assets/mina/mina.webp";
import HehMina from "public/assets/mina/heh-upscaled.png";
import MinaWhat from "public/assets/mina/minawhat.png";

export default function Mina({ Artworks }: { Artworks: MinaArtworks }) {
	const { t } = useTranslation();

	const [selectedImage, setSelectedImage] = useState(0);
	const [highlighted, setHighlighted] = useState("");
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const handleLightboxOpen = (id: number) => {
		setSelectedImage(id);
		setLightboxOpen(true);
		document.body.classList.add("overflow-hidden");
	};
	const handleLightboxClose = () => {
		setLightboxOpen(false);
		setTimeout(() => {
			document.body.classList.remove("overflow-hidden");
		}, 450);
	};

	const transitions = useTransition(lightboxOpen, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: config.stiff,
	});

	const MinaDesignPoints = (
		<div className="relative max-w-xs lg:max-w-none mx-auto">
			<div className="absolute w-full h-full z-10">
				<div
					className={`absolute border-4 border-green drop-shadow-md w-[40%] aspect-square rounded-full top-[3%] right-[7%] ${
						highlighted === "band" ? "backdrop-brightness-[140%] scale-100 sopacity-100" : "scale-50 opacity-0"
					} duration-250 ease-out origin-center`}
				/>
				<div
					className={`absolute border-4 border-green drop-shadow-md w-[20%] aspect-square rounded-full top-[7%] left-[32%] ${
						highlighted === "ahoge" ? "backdrop-brightness-[140%] scale-100 sopacity-100" : "scale-50 opacity-0"
					} duration-250 ease-out origin-center`}
				/>
				<div
					className={`absolute border-4 border-green drop-shadow-md w-[19%] aspect-square rounded-full top-[44%] left-[14%] ${
						highlighted === "accessories" ? "backdrop-brightness-[140%] scale-100 sopacity-100" : "scale-50 opacity-0"
					} duration-250 ease-out origin-center`}
				/>
				<div
					className={`absolute border-4 border-green drop-shadow-md w-[19%] aspect-square rounded-full top-[43.5%] right-[29%] ${
						highlighted === "accessories" ? "backdrop-brightness-[140%] scale-100 sopacity-100" : "scale-50 opacity-0"
					} duration-250 ease-out origin-center`}
				/>
				<div
					className={`absolute border-4 border-green drop-shadow-md w-[8%] aspect-square rounded-full top-[33.6%] right-[24.5%] ${
						highlighted === "accessories" ? "backdrop-brightness-[140%] scale-100 sopacity-100" : "scale-50 opacity-0"
					} duration-250 ease-out origin-center`}
				/>
				<div
					className={`absolute border-4 border-green drop-shadow-md w-[15%] aspect-square rounded-full top-[59.7%] right-[33%] ${
						highlighted === "leaf" ? "backdrop-brightness-[140%] scale-100 sopacity-100" : "scale-50 opacity-0"
					} duration-250 ease-out origin-center`}
				/>
			</div>
			<FadingImage
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
		from: { opacity: 0, y: 60 },
		enter: {
			opacity: 1,
			y: 0,
			config: {
				easing: easings.easeOutExpo,
				duration: 500,
			},
		},
		leave: {
			opacity: 0,
			y: 40,
			config: {
				easing: easings.easeInCirc,
				duration: 250,
			},
		},
	});

	function NsfwDialog() {
		const { t } = useTranslation();

		const [timer, setTimer] = useState(0);

		useEffect(() => {
			const interval = setInterval(() => {
				setTimer((prevTimer) => (prevTimer >= 10 ? 10 : prevTimer + 0.1));
			}, 100);

			return () => clearInterval(interval);
		}, []);

		const progressCircle = useSpring({
			from: { val: 44 },
			to: {
				val: 0,
			},
			config: {
				duration: 10000,
				easing: easings.easeInOutQuad,
			},
		});

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
									className="bg-neutral-950/90"
								/>
							</Dialog.Overlay>
							<Dialog.Content
								forceMount
								asChild
								className="fixed z-50 inset-0 flex flex-col items-center md:justify-center px-6 py-9 max-h-screen overflow-auto"
							>
								<a.div style={styles}>
									<Dialog.Close className="group fixed z-50 top-3 md:top-5 right-3 md:right-5 text-neutral-50 w-10 h-10 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl">
										<i className="ri-close-line text-xl text-neutral-50" />
									</Dialog.Close>
									<div className="flex flex-col lg:flex-row items-center pb-6 gap-6 lg:gap-12 max-w-4xl">
										<Image
											src={HehMina}
											alt="A smirking Mina."
											className="h-32 lg:h-36 w-auto rounded-full border-neutral-50"
										/>
										<h1 className="text-neutral-50 font-display text-center md:text-left text-2xl md:text-3xl lg:text-5xl font-medium flex-grow">
											{t("MINA:Content.NSFW.Dialog.title")}
										</h1>
									</div>
									<div className="text-center text-neutral-50 max-w-3xl">
										<p>{t("MINA:Content.NSFW.Dialog.text1")}</p>
										<p>{t("MINA:Content.NSFW.Dialog.text2")}</p>
										<p className="font-bold text-red">{t("MINA:Content.NSFW.Dialog.text3")}</p>
									</div>
									<div className="flex flex-col md:flex-row items-center gap-3 pt-6 px-6">
										<Button
											color="green"
											onClick={() => {
												setShowNsfw(true);
												localStorage.setItem("confirmedNsfwDialog", "interestingly, yes");
												localStorage.setItem("horny", "looks like it");
												setDialogOpen(false);
											}}
											disabled={timer < 10}
										>
											<svg height={16} width={16} className="-rotate-90">
												<a.circle
													cx={8}
													cy={8}
													r={7}
													strokeWidth={2}
													className="stroke-neutral-950 fill-none"
													strokeDasharray={44}
													strokeDashoffset={progressCircle.val}
													strokeLinecap="butt" // hehe butt
												/>
											</svg>
											{t("MINA:Content.NSFW.Dialog.admitSins")}
										</Button>
										<Button onClick={() => setDialogOpen(false)}>{t("MINA:Content.NSFW.Dialog.nevermind")}</Button>
									</div>
									<p
										className={`text-neutral text-xs italic max-w-xl text-center pt-6 ${
											timer < 10 ? "opacity-0 select-none" : "opacity-100"
										} duration-250`}
									>
										{t("MINA:Content.NSFW.Dialog.hint")}
									</p>
									<p className="lg:absolute pt-6 bottom-3 md:bottom-5 left-0 right-0 text-xs text-center">
										<Trans
											i18nKey="MINA:Content.NSFW.Dialog.credit"
											components={{
												Link: <Link href="https://twitter.com/wxsonz" target="_blank" className="text-link-external" />,
											}}
										/>
									</p>
								</a.div>
							</Dialog.Content>
						</>
					) : null
				)}
			</Dialog.Root>
		);
	}

	const toggleNsfw = () => {
		const seenNsfwDialog = localStorage.getItem("confirmedNsfwDialog");
		if (!showNsfw) {
			if (!seenNsfwDialog) {
				setDialogOpen(true);
			} else {
				localStorage.setItem("horny", "came back for more, eh?");
				setShowNsfw(true);
			}
		} else {
			localStorage.removeItem("horny");
			setShowNsfw(false);
		}
	};

	// Abort mission.
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === " ") {
				setLightboxOpen(false);
				setShowNsfw(false);
				localStorage.removeItem("horny");
			}
		};
		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [showNsfw]);

	// For dropdowns.
	function SelectItem(props: React.PropsWithChildren<{ value: string }>) {
		return (
			<Select.Item
				value={props.value}
				className="group relative flex items-center gap-3 pr-2 pl-2 data-[highlighted]:pl-3 h-8 rounded-sm leading-none select-none outline-none data-[disabled]:text-neutral data-[disabled]:pointer-events-none data-[highlighted]:text-neutral-50 data-[state=checked]:text-neutral-50 data-[highlighted]:bg-neutral-50/10 active:opacity-75 duration-100 cursor-pointer focus-visible:outline-none"
			>
				<Select.ItemText className="flex-grow">{props.children}</Select.ItemText>
				<Select.ItemIndicator className="ml-auto">
					<i className="ri-check-line" />
				</Select.ItemIndicator>
			</Select.Item>
		);
	}

	// Filter by artist.
	const [filteredArtist, setFilteredArtist] = useState("");
	const artistList = Array.from(new Set(Artworks.data.map((art: MinaArtwork) => art.attributes.artist)));

	// Filter by year.
	const [filteredYear, setFilteredYear] = useState("");
	const yearList = Array.from({ length: new Date().getFullYear() - 2022 + 1 }, (_, index) =>
		(new Date().getFullYear() - index).toString()
	);

	const filteredArtworks = Artworks.data
		.filter((art: MinaArtwork) => (showNsfw ? true : !art.attributes.nsfw))
		.filter((art: MinaArtwork) => (filteredArtist != "" ? art.attributes.artist == filteredArtist : true))
		.filter((art: MinaArtwork) => (filteredYear != "" ? art.attributes.creationDate.startsWith(filteredYear) : true));

	const allTimeCount = Artworks.data.length;
	const allTimeCountDigit1 = Math.floor(allTimeCount / 10);
	const allTimeCountDigit2 = allTimeCount % 10;

	const weekCount = Artworks.data.filter((art: MinaArtwork) => {
		const creationDate = new Date(art.attributes.creationDate);
		const oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

		return creationDate > oneWeekAgo;
	}).length;
	const weekCountDigit1 = Math.floor(weekCount / 10);
	const weekCountDigit2 = weekCount % 10;

	function FlipCharacter(props: { digit: number }) {
		return (
			<div className="relative flex flex-col gap-0.5 w-24 h-36 md:w-28 md:h-44 font-display-mono font-light text-[7.15rem] md:text-[8.75rem]">
				<div className="absolute z-10 left-0 top-1/2 -translate-y-1/2 w-1.5 h-9 bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-950 rounded-full border-2 border-neutral-950" />
				<div className="relative top-0 left-0 w-full h-1/2 bg-gradient-to-b from-neutral-700 to-neutral-800 border-t border-neutral-600 rounded-t-lg overflow-hidden">
					<span className="text-neutral-50 leading-tight absolute top-0 left-0 w-full text-center">{props.digit}</span>
				</div>
				<div className="relative bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-neutral-900 to-neutral-900 border-t border-neutral-700 rounded-b-lg overflow-hidden">
					<span aria-hidden className="text-neutral-200 leading-tight absolute bottom-0 left-0 w-full text-center">
						{props.digit}
					</span>
				</div>
				<div className="absolute z-10 right-0 top-1/2 -translate-y-1/2 w-1.5 h-9 bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-950 rounded-full border-2 border-neutral-950" />
			</div>
		);
	}

	return (
		<>
			<Head
				title={t("MINA:Head.title")}
				description={t("MINA:Head.description")}
				image="https://pprmint.art/assets/mina/embed.png"
			/>
			<Title title={t("MINA:Head.title")} description={t("MINA:Head.description")}>
				<FadingImage src={HeroMina} alt="Original Mina artwork by wxsonz." fill className="object-cover" quality={90} />
			</Title>
			<main>
				<Toast.Provider swipeDirection="right">
					<section id="design" className="my-20 max-w-7xl mx-auto px-6 md:px-9">
						<div className="lg:grid grid-cols-2 lg:grid-cols-3 gap-6">
							{MinaDesignPoints}
							<Accordion.Root
								type="single"
								defaultValue="lore"
								className="lg:col-span-2 divide-y-2 divide-neutral-900 border-b-2 border-neutral-900 h-max"
							>
								<Accordion.Item value="lore">
									<Accordion.Trigger className="group/trigger flex gap-3 text-left font-display w-full data-[state=closed]:py-3 data-[state=open]:py-6 font-semibold data-[state=closed]:hover:bg-neutral-900 data-[state=closed]:active:bg-transparent text-neutral-50 text-2xl data-[state=open]:text-3xl md:text-3xl data-[state=open]:md:text-4xl duration-400 data-[state=closed]:active:duration-200 ease-in-out-custom data-[state=open]:pointer-events-none">
										<i className="ri-arrow-down-s-line group-data-[state=open]/trigger:rotate-180 duration-400 ease-in-out-custom" />
										{t("MINA:Content.About.heading")}
									</Accordion.Trigger>
									<Accordion.Content className="data-[state=closed]:animate-accordion-slide-up data-[state=open]:animate-accordion-slide-down duration-400 ease-in-out-custom overflow-hidden">
										<p>{t("MINA:Content.About.text1", { birthyear: `${new Date().getFullYear() - 2004}` })}</p>
										<p>{t("MINA:Content.About.text2")}</p>
										<p>{t("MINA:Content.About.text3")}</p>
										<p>{t("MINA:Content.About.text4")}</p>
										<p>{t("MINA:Content.About.text5")}</p>
										<p>
											<Trans
												i18nKey="MINA:Content.About.text6"
												components={{
													Link: (
														<Link
															href="https://twitter.com/wxsonz"
															target="_blank"
															rel="noopener noreferrer"
															className="text-link-external"
														/>
													),
												}}
											/>
										</p>
										<div className="h-9" />
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value="design">
									<Accordion.Trigger className="group/trigger flex gap-3 text-left font-display w-full data-[state=closed]:py-3 data-[state=open]:py-6 font-semibold data-[state=closed]:hover:bg-neutral-900 data-[state=closed]:active:bg-transparent text-neutral-50 text-2xl data-[state=open]:text-3xl md:text-3xl data-[state=open]:md:text-4xl duration-400 data-[state=closed]:active:duration-200 ease-in-out-custom data-[state=open]:pointer-events-none">
										<i className="ri-arrow-down-s-line group-data-[state=open]/trigger:rotate-180 duration-400 ease-in-out-custom" />
										{t("MINA:Content.Design.heading")}
									</Accordion.Trigger>
									<Accordion.Content className="data-[state=closed]:animate-accordion-slide-up data-[state=open]:animate-accordion-slide-down duration-400 ease-in-out-custom overflow-hidden">
										<div className="grid sm:grid-cols-2 gap-3" onMouseLeave={() => setHighlighted("")}>
											<div
												onMouseEnter={() => setHighlighted("band")}
												className={`${
													highlighted === "band" ? "bg-neutral-800" : "bg-neutral-900"
												} rounded-lg p-5 duration-100 cursor-default`}
											>
												<h4>{t("MINA:Content.Design.HairBand.heading")}</h4>
												<p>{t("MINA:Content.Design.HairBand.text")}</p>
											</div>
											<div
												onMouseEnter={() => setHighlighted("ahoge")}
												className={`${
													highlighted === "ahoge" ? "bg-neutral-800" : "bg-neutral-900"
												} rounded-lg p-5 duration-100 cursor-default`}
											>
												<h4>{t("MINA:Content.Design.Ahoge.heading")}</h4>
												<p>{t("MINA:Content.Design.Ahoge.text")}</p>
											</div>
											<div
												onMouseEnter={() => setHighlighted("accessories")}
												className={`${
													highlighted === "accessories" ? "bg-neutral-800" : "bg-neutral-900"
												} rounded-lg p-5 duration-100 cursor-default`}
											>
												<h4>{t("MINA:Content.Design.Accessories.heading")}</h4>
												<p>{t("MINA:Content.Design.Accessories.text")}</p>
											</div>
											<div
												onMouseEnter={() => setHighlighted("leaf")}
												className={`${
													highlighted === "leaf" ? "bg-neutral-800" : "bg-neutral-900"
												} rounded-lg p-5 duration-100 cursor-default`}
											>
												<h4>{t("MINA:Content.Design.LeafDesign.heading")}</h4>
												<p>{t("MINA:Content.Design.LeafDesign.text")}</p>
											</div>
										</div>
										<div className="h-9" />
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value="colors">
									<Accordion.Trigger className="group/trigger flex gap-3 text-left font-display w-full data-[state=closed]:py-3 data-[state=open]:py-6 font-semibold data-[state=closed]:hover:bg-neutral-900 data-[state=closed]:active:bg-transparent text-neutral-50 text-2xl data-[state=open]:text-3xl md:text-3xl data-[state=open]:md:text-4xl duration-400 data-[state=closed]:active:duration-200 ease-in-out-custom data-[state=open]:pointer-events-none">
										<i className="ri-arrow-down-s-line group-data-[state=open]/trigger:rotate-180 duration-400 ease-in-out-custom" />
										{t("MINA:Content.Colors.heading")}
									</Accordion.Trigger>
									<Accordion.Content className="data-[state=closed]:animate-accordion-slide-up data-[state=open]:animate-accordion-slide-down duration-400 ease-in-out-custom overflow-hidden">
										<div className="flex -space-x-2 pb-3">
											{[
												["#5ae39c", "text-neutral-950"],
												["#00cc66", "text-neutral-950"],
												["#048541", "text-neutral-950"],
												["#44ccdd", "text-neutral-950"],
												["#4499ee", "text-neutral-950"],
												["#222222", "text-neutral-50"],
												["#333333", "text-neutral-50"],
												["#ffeee4", "text-neutral-950"],
											].map(([hex, text]) => (
												<div
													key={hex}
													className={`group grid items-center text-center active:scale-95 ${text} hover:z-10 border-2 border-neutral-950 w-10 hover:w-24 h-10 rounded-full duration-150 ease-out overflow-hidden cursor-pointer`}
													style={{ backgroundColor: hex }}
													onClick={() => {
														navigator.clipboard.writeText(hex.substring(1));
														setOpen(false);
														window.clearTimeout(timerRef.current);
														timerRef.current = window.setTimeout(() => {
															setCurrentColor(hex);
															setOpen(true);
														}, 100);
													}}
												>
													<span className="selection:bg-neutral-50 font-mono opacity-0 group-hover:opacity-100 duration-150 tracking-tighter whitespace-nowrap">
														{hex == "#ffeee4" ? "pale af" : hex}
													</span>
												</div>
											))}
										</div>
										<p>{t("MINA:Content.Colors.text1")}</p>
										<p>{t("MINA:Content.Colors.text2")}</p>
										<div className="h-9" />
									</Accordion.Content>
									<Toast.Root
										className="flex gap-6 items-center p-3 rounded-xl shadow-lg shadow-neutral-950/50 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 data-[state=open]:animate-toast-slide-in data-[state=closed]:animate-fade-out-scale-down data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-toast-slide-out"
										open={open}
										onOpenChange={setOpen}
									>
										<div
											className="w-[30px] h-[30px] rounded-full border border-neutral-50/10"
											style={{ backgroundColor: currentColor }}
										/>
										<Toast.Description>{t("COMMON:copied")}</Toast.Description>
										<Toast.Close className="hover:bg-neutral-50/10 active:bg-neutral-50/5 rounded-full duration-100 active:duration-75">
											<i className="ri-close-line text-neutral-50 p-1" />
										</Toast.Close>
									</Toast.Root>
									<Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 p-[var(--viewport-padding)] flex flex-col w-max z-50 outline-none" />
								</Accordion.Item>
								<Accordion.Item value="fanart">
									<Accordion.Trigger className="group/trigger flex gap-3 text-left font-display w-full data-[state=closed]:py-3 data-[state=open]:py-6 font-semibold data-[state=closed]:hover:bg-neutral-900 data-[state=closed]:active:bg-transparent text-neutral-50 text-2xl data-[state=open]:text-3xl md:text-3xl data-[state=open]:md:text-4xl duration-400 data-[state=closed]:active:duration-200 ease-in-out-custom data-[state=open]:pointer-events-none">
										<i className="ri-arrow-down-s-line group-data-[state=open]/trigger:rotate-180 duration-400 ease-in-out-custom" />
										{t("MINA:Content.Fanart.heading")}
									</Accordion.Trigger>
									<Accordion.Content className="data-[state=closed]:animate-accordion-slide-up data-[state=open]:animate-accordion-slide-down duration-400 ease-in-out-custom overflow-hidden">
										<p>{t("MINA:Content.Fanart.text1")}</p>
										<p>{t("MINA:Content.Fanart.text2")}</p>
										<p>
											<Trans
												i18nKey="MINA:Content.Fanart.text3"
												components={{
													Link: <Link href="/contact" className="text-link" />,
												}}
											/>
										</p>
										<div className="h-9" />
									</Accordion.Content>
								</Accordion.Item>
							</Accordion.Root>
						</div>
					</section>
					<section
						id="count"
						className="flex flex-col md:flex-row gap-12 my-20 max-w-7xl mx-auto px-6 md:px-9 text-center"
					>
						<div className="w-full">
							<h3 className="pb-6">{t("MINA:Content.Artworks.last7Days")}</h3>
							<div className="flex w-max mx-auto gap-2 text-neutral-50 font-display-mono font-light text-[8.75rem]">
								<FlipCharacter digit={weekCountDigit1} />
								<FlipCharacter digit={weekCountDigit2} />
							</div>
						</div>
						<div className="w-full">
							<h3 className="pb-6">{t("MINA:Content.Artworks.alltime")}</h3>
							<div className="flex w-max mx-auto gap-2 text-neutral-50 font-display-mono font-light text-[8.75rem]">
								<FlipCharacter digit={allTimeCountDigit1} />
								<FlipCharacter digit={allTimeCountDigit2} />
							</div>
						</div>
					</section>
					<section id="gallery" className="my-20 px-2">
						<div className="max-w-lg mx-auto items-center p-2 bg-neutral-900 rounded-lg">
							<div className="flex w-full gap-2">
								<Select.Root value={filteredArtist} onValueChange={setFilteredArtist}>
									<div className="flex w-full">
										<Select.Trigger
											className={`group flex items-center justify-between rounded-md leading-none px-3 h-9 w-full border border-neutral-800 ${
												filteredArtist != "" && "rounded-r-none"
											} hover:bg-neutral-800 hover:text-neutral-50 duration-100`}
											aria-label="Artist"
										>
											<Select.Value
												aria-label={filteredArtist}
												placeholder={t("MINA:Content.Artworks.Filters.artist")}
											/>
											<Select.Icon className="ml-auto group-hover:translate-y-0.5 duration-100">
												<i className="ri-arrow-down-s-line" />
											</Select.Icon>
										</Select.Trigger>
										{filteredArtist != "" && (
											<button
												onClick={() => setFilteredArtist("")}
												className="h-9 border border-l-0 border-neutral-800 px-2.5 rounded-r-md hover:bg-neutral-800 hover:text-neutral-50 duration-100"
											>
												<i className="ri-close-line" />
											</button>
										)}
									</div>
									<Select.Portal>
										<Select.Content className="z-50 text-neutral p-1 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 shadow-xl shadow-neutral-950/50 rounded-lg data-[state=open]:animate-select-open">
											<Select.ScrollUpButton className="absolute z-50 top-0 left-0 right-0 flex justify-center bg-gradient-to-b from-neutral-900/50 text-neutral-50 rounded-t-md">
												<i className="ri-arrow-up-s-line" />
											</Select.ScrollUpButton>
											<Select.Viewport className="p-1">
												<Select.Group>
													{artistList
														.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
														.map((artist) => (
															<SelectItem key={artist} value={artist}>
																{artist}
															</SelectItem>
														))}
												</Select.Group>
											</Select.Viewport>
											<Select.ScrollDownButton className="absolute z-50 bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-neutral-900/50 text-neutral-50 rounded-b-md">
												<i className="ri-arrow-down-s-line" />
											</Select.ScrollDownButton>
										</Select.Content>
									</Select.Portal>
								</Select.Root>
								<Select.Root value={filteredYear} onValueChange={setFilteredYear}>
									<div className="flex w-full">
										<Select.Trigger
											className={`group flex items-center justify-between rounded-md leading-none px-3 h-9 w-full border border-neutral-800 ${
												filteredYear != "" && "rounded-r-none"
											} hover:bg-neutral-800 hover:text-neutral-50 duration-100`}
											aria-label="Year"
										>
											<Select.Value aria-label={filteredYear} placeholder={t("MINA:Content.Artworks.Filters.year")} />
											<Select.Icon className="ml-auto group-hover:translate-y-0.5 duration-100">
												<i className="ri-arrow-down-s-line" />
											</Select.Icon>
										</Select.Trigger>
										{filteredYear != "" && (
											<button
												onClick={() => setFilteredYear("")}
												className="h-9 border border-l-0 border-neutral-800 px-2.5 rounded-r-md hover:bg-neutral-800 hover:text-neutral-50 duration-100"
											>
												<i className="ri-close-line" />
											</button>
										)}
									</div>
									<Select.Portal>
										<Select.Content className="z-50 text-neutral p-1 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 shadow-xl shadow-neutral-950/50 rounded-lg data-[state=open]:animate-select-open">
											<Select.ScrollUpButton className="absolute z-50 top-0 left-0 right-0 flex justify-center bg-gradient-to-b from-neutral-900/50 text-neutral-50 rounded-t-md">
												<i className="ri-arrow-up-s-line" />
											</Select.ScrollUpButton>
											<Select.Viewport className="p-1">
												<Select.Group>
													{yearList.map((year) => (
														<SelectItem key={year} value={year}>
															{year}
														</SelectItem>
													))}
												</Select.Group>
											</Select.Viewport>
											<Select.ScrollDownButton className="absolute z-50 bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-neutral-900/50 text-neutral-50 rounded-b-md">
												<i className="ri-arrow-down-s-line" />
											</Select.ScrollDownButton>
										</Select.Content>
									</Select.Portal>
								</Select.Root>
							</div>
						</div>
						{filteredArtworks.length > 0 ? (
							<>
								<h3 className="text-center pt-6">
									{t("MINA:Content.Artworks.showingArtworks", { count: filteredArtworks.length })}
								</h3>
								<ResponsiveMasonry columnsCountBreakPoints={{ 0: 2, 767: 3, 1279: 4, 1920: 5 }}>
									<Masonry gutter="8px" className="pt-6">
										{filteredArtworks.map((art: MinaArtwork, index: number) => (
											<button
												key={art.id}
												onClick={() => handleLightboxOpen(index)}
												className="relative group overflow-hidden rounded-lg hover:contrast-[80%] active:contrast-100 hover:scale-[102%] active:scale-100 duration-200 active:duration-75 hover:shadow-xl hover:z-10 cursor-pointer"
											>
												<FadingImage
													src={`https://static.pprmint.art${art.attributes.artwork.data.attributes.url}`}
													width={art.attributes.artwork.data.attributes.width}
													height={art.attributes.artwork.data.attributes.height}
													alt=""
													className={`h-full min-w-full object-cover bg-neutral-900 ${
														art.attributes.nsfw &&
														"blur-lg group-hover:blur-none opacity-50 group-hover:opacity-100 duration-200"
													}`}
												/>
												{art.attributes.nsfw && (
													<i className="text-neutral-50/75 ri-eye-off-line absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl group-hover:opacity-0 duration-200" />
												)}
											</button>
										))}
									</Masonry>
								</ResponsiveMasonry>
							</>
						) : (
							<div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
								<Image src={MinaWhat} alt="" className="w-full max-w-64 h-auto my-12" />
								<h2>
									{t("COMMON:noResults")}
									<span className="text-green">.</span>
								</h2>
								<p>{t("COMMON:tryDifferent")}</p>
							</div>
						)}
					</section>
					<section id="neuron" className="flex items-center justify-center my-20 max-w-7xl mx-auto px-6 md:px-9">
						<label className="Label" htmlFor="light-theme" style={{ paddingRight: 15 }}>
							{t("MINA:Content.NSFW.switch")}
						</label>
						<Switch.Root
							className="group relative w-14 h-8 rounded-full bg-neutral-900 data-[state='unchecked']:hover:bg-neutral-800 data-[state='checked']:bg-green duration-200 ease-out"
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
			<NsfwDialog />
			{transitions((styles, item) =>
				item ? (
					<FocusTrap>
						<Portal.Root className="fixed z-50">
							<a.div style={styles}>
								<MinaLightbox
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

export async function getStaticProps() {
	const res = await fetch(
		`${process.env.STRAPI_API_URL}/mina-artworks?pagination[pageSize]=50&populate=artwork&sort=creationDate:desc`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
			},
		}
	);
	const Artworks: MinaArtworks = await res.json();
	return {
		props: {
			Artworks,
		},
		revalidate: 30,
	};
}
