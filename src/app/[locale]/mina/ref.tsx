"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "src/navigation";
import { useTranslations } from "next-intl";
import * as Dialog from "@radix-ui/react-dialog";
import * as Toast from "@radix-ui/react-toast";
import FadingImage from "src/components/ui/FadingImage";
import { config, useTransition, a } from "@react-spring/web";

import ReferenceFront from "public/assets/mina/ref/front.webp";
import ReferenceBack from "public/assets/mina/ref/back.webp";
import ReferenceHand from "public/assets/mina/ref/hand.webp";
import ReferenceShoes from "public/assets/mina/ref/shoes.webp";
import ReferenceHairbowFront from "public/assets/mina/ref/head_front.svg";
import ReferenceHairbowBack from "public/assets/mina/ref/head_back.svg";

import { X } from "lucide-react";

function ColorPickerToast(props: {
	color: string;
	open: boolean;
	onOpenChange: ((open: boolean) => void) | undefined;
}) {
	const t = useTranslations("COMMON");
	return (
		<Toast.Provider swipeDirection="right" duration={3000}>
			<Toast.Root
				className="flex gap-6 items-center p-3 rounded-xl shadow-lg shadow-neutral-950/50 backdrop-blur-xl bg-gradient-to-b from-neutral-800/75 to-neutral-900/90 border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 data-[state=open]:animate-toast-slide-in data-[state=closed]:animate-fade-out-scale-down data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-toast-slide-out"
				open={props.open}
				onOpenChange={props.onOpenChange}
			>
				<div
					className="w-[30px] h-[30px] rounded-full border border-neutral-50/10"
					style={{ backgroundColor: props.color }}
				/>
				<Toast.Description>{t("copied")}</Toast.Description>
				<Toast.Close className="inline-flex items-center justify-center size-6 hover:bg-neutral-50/10 active:bg-neutral-50/5 rounded-full duration-100 active:duration-75">
					<X size={16} className="stroke-neutral-50" />
				</Toast.Close>
			</Toast.Root>
			<Toast.Viewport className="[--viewport-padding:_24px] fixed bottom-0 right-0 p-[var(--viewport-padding)] flex flex-col w-max z-[9999] outline-none" />
		</Toast.Provider>
	);
}

function CyclingFrontBackRef() {
	const [showBack, setShowBack] = useState(false);
	useEffect(() => {
		const interval = setInterval(() => {
			setShowBack(!showBack);
		}, 5000);
		return () => clearInterval(interval);
	}, [showBack]);

	const cycleTransition = useTransition(showBack, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: config.stiff,
		exitBeforeEnter: true,
	});

	return cycleTransition((styles, item) =>
		item ? (
			<a.div className="h-full w-fit object-contain" style={styles}>
				<FadingImage
					src={ReferenceBack}
					alt="Drawing of a hand with a rectangular ring, spanning across the ring and middle finger."
					className="h-full max-h-2/3-screen lg:max-h-[90vh] object-contain"
				/>
			</a.div>
		) : (
			<a.div className="h-full w-fit object-contain" style={styles}>
				<FadingImage
					src={ReferenceFront}
					alt="Drawing of a hand with a rectangular ring, spanning across the ring and middle finger."
					className="h-full max-h-2/3-screen lg:max-h-[90vh] object-contain"
				/>
			</a.div>
		)
	);
}

export default function RefSheet() {
	const t = useTranslations("MINA");

	// Toasts for copying palette colors.
	const [toastOpen, setToastOpen] = useState(false);
	const timerRef = useRef(0);
	const [currentColor, setCurrentColor] = useState("");

	function ColorSwatch({ color }: { color: string }) {
		function handleClick() {
			navigator.clipboard.writeText(color.substring(1));
			setToastOpen(false);
			window.clearTimeout(timerRef.current);
			timerRef.current = window.setTimeout(() => {
				setCurrentColor(color);
				setToastOpen(true);
			}, 100);
		}
		return (
			<div
				className="w-full h-12 active:shadow-inner active:opacity-75 duration-100 ease-out cursor-pointer"
				style={{ backgroundColor: color }}
				onClick={handleClick}
			/>
		);
	}

	// Detail cards.
	function InfoDialog({
		title,
		description,
		reference,
		col,
	}: {
		title: string;
		description: ReactNode;
		reference: ReactNode;
		col?: boolean;
	}) {
		return (
			<Dialog.Portal>
				<Dialog.Overlay className="bg-neutral-950/90 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-50" />
				<Dialog.Content
					className={`fixed inset-0 lg:inset-auto overflow-auto lg:overflow-clip z-[9999] flex flex-col ${
						!col && "lg:flex-row"
					} gap-12 items-center lg:top-1/2 lg:left-1/2 max-h-svh lg:max-h-[90vh] w-screen max-w-5xl lg:-translate-x-1/2 lg:-translate-y-1/2 p-6 md:p-9 bg-neutral-950 border border-neutral-900 ring-1 ring-neutral-950 shadow-xl shadow-neutral-950/50 rounded-xl data-[state=open]:animate-scale-up data-[state=closed]:animate-scale-down focus:outline-none origin-center lg:origin-top-left`}
				>
					{reference}
					<div>
						<Dialog.Title asChild>
							<h2>
								{title}
								<span className="text-green">.</span>
							</h2>
						</Dialog.Title>
						<Dialog.Description asChild>{description}</Dialog.Description>
					</div>
					<Dialog.Close asChild>
						<button
							className="absolute inline-flex items-center justify-center top-3 md:top-5 right-3 md:right-5 size-10 rounded-full text-neutral-50 hover:bg-neutral-900 active:bg-neutral-800 duration-100"
							aria-label="Close"
						>
							<X />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		);
	}

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-4 md:grid-rows-3 xl:grid-rows-2 grid-flow-dense gap-3 md:max-h-[800px]">
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<div
							id="hand"
							className="flex items-center justify-center hover:bg-neutral-900 border border-neutral-900 duration-200 active:duration-100 active:opacity-75 active:shadow-inner rounded-xl p-6 cursor-pointer"
						>
							<FadingImage
								src={ReferenceHand}
								className="w-auto max-h-full object-contain"
								alt="Drawing of a hand with a rectangular ring, spanning across the ring and middle finger."
							/>
						</div>
					</Dialog.Trigger>
					<InfoDialog
						title={t("Content.Reference.Rings.heading")}
						description={
							<>
								<p>{t("Content.Reference.Rings.text1")}</p>
								<p>{t("Content.Reference.Rings.text2")}</p>
								<p>{t("Content.Reference.Rings.text3")}</p>
							</>
						}
						reference={
							<FadingImage
								src={ReferenceHand}
								alt="Drawing of a hand with a rectangular ring, spanning across the ring and middle finger."
								className="max-h-2/3-screen w-auto lg:w-full lg:max-h-[90vh] object-contain"
							/>
						}
					/>
				</Dialog.Root>
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<div
							id="front"
							className="flex items-center justify-center hover:bg-neutral-900 border border-neutral-900 duration-100 active:opacity-75 active:shadow-inner rounded-xl row-span-2 p-3 cursor-pointer"
						>
							<FadingImage
								src={ReferenceFront}
								className="w-auto max-h-full object-contain"
								alt="Full-body drawing of Mina doing a peace sign, front perspective."
								priority
							/>
						</div>
					</Dialog.Trigger>
					<Dialog.Trigger asChild>
						<div
							id="back"
							className="flex items-center justify-center hover:bg-neutral-900 border border-neutral-900 duration-100 active:opacity-75 active:shadow-inner rounded-xl row-span-2 p-3 cursor-pointer"
						>
							<FadingImage
								src={ReferenceBack}
								className="w-auto max-h-full object-contain"
								alt="Full-body drawing of Mina doing a peace sign, back perspective."
								priority
							/>
						</div>
					</Dialog.Trigger>
					<InfoDialog
						title={t("Content.Reference.Outfit.heading")}
						description={
							<>
								<p>{t("Content.Reference.Outfit.text1")}</p>
								<p>{t("Content.Reference.Outfit.text2")}</p>
								<p>{t("Content.Reference.Outfit.text3")}</p>
								<p>{t("Content.Reference.Outfit.text4")}</p>
								<p>{t("Content.Reference.Outfit.text5")}</p>
							</>
						}
						reference={<CyclingFrontBackRef />}
					/>
				</Dialog.Root>
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<div
							id="hairbow"
							className="flex md:col-span-2 xl:col-span-1 items-center justify-center gap-6 hover:bg-neutral-900 border border-neutral-900 duration-100 active:opacity-75 active:shadow-inner rounded-xl p-6 cursor-pointer"
						>
							<FadingImage
								src={ReferenceHairbowBack}
								className="w-auto max-h-full object-contain"
								alt="Outline of Mina's head, viewed from the back."
								priority
							/>
							<FadingImage
								src={ReferenceHairbowFront}
								className="w-auto max-h-full object-containm hidden md:block xl:hidden"
								alt="Outline of Mina's head, viewed from the front."
								priority
							/>
						</div>
					</Dialog.Trigger>
					<InfoDialog
						col
						title={t("Content.Reference.Hairbow.heading")}
						description={
							<>
								<p>{t("Content.Reference.Hairbow.text1")}</p>
								<p>{t("Content.Reference.Hairbow.text2")}</p>
							</>
						}
						reference={
							<div className="flex flex-col items-center md:flex-row w-full lg:w-3/4 max-h-2/3-screen">
								<FadingImage
									src={ReferenceHairbowFront}
									alt="Drawing of a hand with a rectangular ring, spanning across the ring and middle finger."
									className="h-1/2 md:h-auto md:w-1/2"
								/>
								<FadingImage
									src={ReferenceHairbowBack}
									alt="Drawing of a hand with a rectangular ring, spanning across the ring and middle finger."
									className="h-1/2 md:h-auto md:w-1/2"
								/>
							</div>
						}
					/>
				</Dialog.Root>
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<div
							id="shoe"
							className="flex items-center justify-center hover:bg-neutral-900 border border-neutral-900 duration-100 active:opacity-75 active:shadow-inner rounded-xl p-6 cursor-pointer"
						>
							<FadingImage
								src={ReferenceShoes}
								className="w-auto max-h-full object-contain"
								alt="Full-body drawing of Mina doing a peace sign, front perspective."
							/>
						</div>
					</Dialog.Trigger>
					<InfoDialog
						title={t("Content.Reference.Shoes.heading")}
						description={
							<>
								<p>{t("Content.Reference.Shoes.text1")}</p>
								<p>{t("Content.Reference.Shoes.text2")}</p>
							</>
						}
						reference={
							<FadingImage
								src={ReferenceShoes}
								alt="Drawing of a hand with a rectangular ring, spanning across the ring and middle finger."
								className="max-h-2/3-screen w-auto lg:w-full lg:max-h-[90vh] object-contain"
							/>
						}
					/>
				</Dialog.Root>
				<div id="colorpalette" className="flex flex-col justify-between p-6 border border-neutral-900 rounded-xl">
					<ColorPickerToast color={currentColor} open={toastOpen} onOpenChange={setToastOpen} />
					<div className="flex flex-col">
						<div className="grid grid-cols-4">
							<ColorSwatch color="#63e4a3" />
							<ColorSwatch color="#22ccff" />
							<ColorSwatch color="#111111" />
							<ColorSwatch color="#ffeee4" />
						</div>
						<div className="grid grid-cols-4">
							<ColorSwatch color="#00cc66" />
							<ColorSwatch color="#4499ee" />
							<ColorSwatch color="#222222" />
						</div>
						<div className="grid grid-cols-4">
							<ColorSwatch color="#008b45" />
							<ColorSwatch color="#196bc0" />
							<ColorSwatch color="#333333" />
						</div>
					</div>
					<p className="text-xs text-center">
						{t.rich("Content.Reference.Color.text", {
							Link: (chunks) => (
								<Link href="/palette" className="text-link">
									{chunks}
								</Link>
							),
						})}
					</p>
				</div>
			</div>
		</>
	);
}
