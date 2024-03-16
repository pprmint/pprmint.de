"use client";
import { useState, useEffect, ChangeEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useTransition, a, config, easings } from "@react-spring/web";
import { useLocale, useTranslations } from "next-intl";
import { useMediaQuery } from "react-responsive";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { Icons } from "./icons";

import Title from "src/components/layout/Title";
import Button from "src/components/ui/Button";
import FadingImage from "src/components/ui/FadingImage";

import TitleBackground from "/public/assets/appicons/title.svg";
import { Link, useRouter } from "src/navigation";

export default function AppIcons() {
	const t = useTranslations("APPICONS");

	const isDesktop = useMediaQuery({ minWidth: 768 });

	const [dialogOpen, setDialogOpen] = useState(false);
	const transitions = useTransition(dialogOpen, {
		from: { opacity: 0, x: "-50%", y: "-40%" },
		enter: { opacity: 1, x: "-50%", y: "-50%" },
		leave: { opacity: 0, x: "-50%", y: "-40%" },
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
				mass: 0.8,
				tension: 130,
				friction: 14,
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
		const t = useTranslations("APPICONS");
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
											{t("Content.Dialog.title")}
										</h1>
										<Dialog.Close>
											<i className="ri-close-line text-xl text-neutral-50 rounded-full w-9 h-9 mx-1 hover:bg-neutral-800 duration-100" />
										</Dialog.Close>
									</div>
									<div className="px-6">
										<p>{t("Content.Dialog.text1")}</p>
										<p>{t("Content.Dialog.text2")}</p>
									</div>
									<div className="flex flex-row flex-wrap gap-3 pt-6 px-6">
										<Link href="https://ko-fi.com/pprmint" target="_blank" rel="noopener noreferrer">
											<Button color="green" onClick={() => setDialogOpen(false)}>
												{t("Content.Dialog.openKofi")}
												<i className="ri-cup-line" />
											</Button>
										</Link>
										<Button outlined color="green" onClick={() => setDialogOpen(false)}>
											{t("Content.Dialog.noThanks")}
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
			<Title title={t("Head.title")} description={t("Head.description")}>
				<FadingImage src={TitleBackground} alt="" fill className="object-cover bg-neutral-950" />
			</Title>
			<PityDialog />
			<main className="max-w-7xl mx-auto px-6 md:px-9">
				<section className="my-20">
					<h2>{t("Content.Intro.title")}</h2>
					<p>
						{t.rich("Content.Intro.text1", {
							i: (chunks) => <i>{chunks}</i>,
						})}
					</p>
					<p>
						{t.rich("Content.Intro.text2", {
							a: (chunks) => (
								<Link
									href={`https://learn.microsoft.com/${
										useLocale() === "de" ? "de-de" : "en-us"
									}/windows/apps/design/style/iconography/app-icon-design`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-link-external"
								>
									{chunks}
								</Link>
							),
						})}
					</p>
					<p>{t("Content.Intro.text3")}</p>
				</section>
				<div className="relative">
					<div
						onClick={() => setSearch("")}
						className={`absolute flex right-0 w-10 h-full items-center justify-center text-neutral-50 rounded-r-md ${
							filteredIcons.length === 0
								? "hover:bg-red-800 cursor-pointer"
								: search && "hover:bg-neutral-900 cursor-pointer"
						} duration-100`}
					>
						{search ? <i className="ri-close-line" /> : <i className="ri-search-line" />}
					</div>
					<input
						type="text"
						value={search}
						onChange={handleSearchChange}
						placeholder={t("Content.search")}
						className={`w-full rounded-md outline focus:outline ${
							filteredIcons.length === 0
								? "outline-2 text-red outline-red-800 focus:outline-red bg-neutral-950"
								: "outline-1 text-neutral-50 placeholder:text-neutral outline-neutral-900 focus:outline-green bg-transparent hover:bg-neutral-900"
						} focus:bg-transparent px-3 py-2 duration-100`}
					/>
				</div>
				<section className="my-9">
					<div className="w-full justify-center">
						{filteredIcons.length === 0 ? (
							<div className="flex flex-col w-full items-center">
								<i className="ri-close-line text-red text-8xl" />
								<h3>{t("Content.noResults")}</h3>
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
										<FadingImage
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
									{t("Content.Panel.iconsSelected", { count: selectedIcons.length })}
								</p>
							</div>
							{isDesktop ? (
								<div className="flex gap-6 items-center">
									<p className="cursor-pointer text-link" onClick={() => setSelectedIcons([])}>
										{t("Content.Panel.deselectAll")}
									</p>
									<Button onClick={handleDownloadSelectedIcons} disabled={loading}>
										{t("Content.Panel.downloadSelected")}
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
