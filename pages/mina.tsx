import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import FocusTrap from "focus-trap-react";
import * as Portal from "@radix-ui/react-portal";
import * as Dialog from "@radix-ui/react-dialog";
import * as Accordion from "@radix-ui/react-accordion";
import * as Toast from "@radix-ui/react-toast";
import * as Switch from "@radix-ui/react-switch";
import { useTransition, config, a, easings } from "@react-spring/web";

import MinaArtwork, { MinaArtworks } from "types/mina-artwork";
import Head from "components/Head";
import Title from "components/Title";
import Button from "components/Button";
import StrapiLightbox from "components/StrapiLightbox";
import FadingImage from "components/FadingImage";

import HeroMina from "public/assets/mina/hero.webp";
import TransparentMina from "public/assets/mina/mina.webp";
import HehMina from "public/assets/mina/heh-upscaled.png";

export default function Mina({ Artworks }: { Artworks: MinaArtworks }) {
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
				imageClassName={`${highlighted === "" ? "brightness-100" : "brightness-75"} duration-200`}
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
		from: { opacity: 0, y: 40 },
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
									className="bg-neutral-950/80 backdrop-blur-xl"
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
										<p>
											<Trans
												i18nKey="MINA:Content.NSFW.Dialog.text3"
												components={{
													b: <b />,
												}}
											/>
										</p>
										<p className="text-neutral text-xs italic">{t("MINA:Content.NSFW.Dialog.hint")}</p>
									</div>
									<div className="flex flex-col md:flex-row items-center gap-3 pt-6 px-6">
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
										</Button>
										<Button onClick={() => setDialogOpen(false)}>{t("MINA:Content.NSFW.Dialog.nevermind")}</Button>
									</div>
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

	// Abort mission.
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === " ") {
				setShowNsfw(false);
				localStorage.removeItem("horny");
				handleLightboxClose;
			}
		};
		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	const filteredArtworks = showNsfw ? Artworks.data : Artworks.data.filter((art: MinaArtwork) => !art.attributes.nsfw);

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
			<div className="relative flex flex-col gap-0.5 w-28 h-44 text-neutral-50 font-display-mono font-light text-[8.75rem]">
				<div className="absolute z-10 left-0 top-1/2 -translate-y-1/2 w-1.5 h-9 bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-950 rounded-full border-2 border-neutral-950" />
				<div className="relative top-0 left-0 w-full h-1/2 bg-gradient-to-b from-neutral-700 to-neutral-800 border-t border-neutral-600 rounded-t-lg overflow-hidden">
					<span className="leading-tight absolute top-0 left-0 w-full text-center">{props.digit}</span>
				</div>
				<div className="relative bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-neutral-900 to-neutral-900 border-t border-neutral-700 rounded-b-lg overflow-hidden">
					<span aria-hidden className="leading-tight absolute bottom-0 left-0 w-full text-center">{props.digit}</span>
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
				image="https://pprmint.art/assets/mina/embed_gold.png"
			/>
			<Title title={t("MINA:Head.title")} description={t("MINA:Head.description")}>
				<FadingImage src={HeroMina} alt="Original Mina artwork by wxsonz." fill imageClassName="object-cover" quality={90} />
			</Title>
			<main>
				<Toast.Provider swipeDirection="right">
					<section className="my-12 max-w-7xl mx-auto px-6 md:px-9">
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
														navigator.clipboard.writeText(hex);
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
					<section className="my-12 max-w-7xl mx-auto px-6 md:px-9 text-center">
						<h2>{t("MINA:Content.Artworks.drawnPastWeek")}</h2>
						<div className="flex w-max mx-auto gap-2 text-neutral-50 font-display-mono font-light text-[8.75rem]">
							<FlipCharacter digit={weekCountDigit1} />
							<FlipCharacter digit={weekCountDigit2} />
						</div>
					</section>
					<section className="my-12">
						<div className="py-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-2 px-2">
							{filteredArtworks.map((art: MinaArtwork, index: number) => (
								<button
									key={art.id}
									onClick={() => handleLightboxOpen(index)}
									className="aspect-square relative group overflow-hidden rounded-lg hover:contrast-[80%] active:contrast-100 hover:scale-[102%] active:scale-100 duration-200 active:duration-75 hover:shadow-xl hover:z-10 cursor-zoom-in"
								>
									<FadingImage
										src={`https://static.pprmint.art${art.attributes.artwork.data.attributes.url}`}
										width={art.attributes.artwork.data.attributes.width}
										height={art.attributes.artwork.data.attributes.height}
										alt=""
                                        containerClassName="h-full min-w-full object-cover bg-neutral-50/10"
										imageClassName={`h-full min-w-full object-cover ${art.attributes.focus} ${
											art.attributes.nsfw &&
											"blur-lg group-hover:blur-none opacity-50 group-hover:opacity-100 duration-200"
										}`}
									/>
									{art.attributes.nsfw && (
										<i className="text-neutral-50/75 ri-eye-off-line absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl group-hover:opacity-0 duration-200" />
									)}
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
								<StrapiLightbox
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
