"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import * as Dialog from "@radix-ui/react-dialog";
import * as Toast from "@radix-ui/react-toast";
import FadingImage from "src/components/ui/FadingImage";
import { config, useTransition, a, useSpring, easings } from "@react-spring/web";

import ReferenceFront from "public/assets/mina/ref/front.webp";
import ReferenceBack from "public/assets/mina/ref/back.webp";
import ReferenceHand from "public/assets/mina/ref/hand.webp";
import ReferenceShoes from "public/assets/mina/ref/shoes.webp";
import Error from "src/icons/Error";

export default function RefSheet() {
	const t = useTranslations("MINA");

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
				<Dialog.Overlay className="bg-neutral-950/90 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-90" />
				<Dialog.Content
					className={`fixed inset-0 overflow-auto lg:overflow-clip z-100 flex flex-col ${
						!col && "lg:flex-row"
					} gap-12 items-center top-1/2 left-1/2 h-svh lg:h-max lg:max-h-[90vh] w-screen max-w-7xl -translate-x-1/2 -translate-y-1/2 p-6 md:p-9 bg-neutral-950 lg:border border-white/10 lg:outline outline-black/10 dark:outline-black/50 shadow-2xl lg:rounded-xl data-[state=open]:animate-dialog-enter data-[state=closed]:animate-dialog-exit focus:outline-hidden origin-center`}
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
							className="absolute top-3 right-3 inline-flex p-2 items-center justify-center hover:bg-neutral-900 hover:shadow-lg hover:shadow-black/5 hover:text ring-0 ring-neutral-900 hover:ring-8 outline-0 outline-neutral-50/5 hover:outline hover:outline-offset-8-neutral-50 duration-100 active:duration-75 rounded-full"
							aria-label="Close"
						>
							<Error />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		);
	}

	function CyclingFrontBackRef({ backFirst }: { backFirst: boolean }) {
		const [showBack, setShowBack] = useState(backFirst);
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

		const progress = useSpring({
			from: { x: "-100%" },
			to: {
				x: "0%",
			},
			config: {
				duration: 4500,
				easing: easings.easeInOutSine,
			},
			delay: 500,
			loop: true,
		});

		return cycleTransition((styles, item) =>
			item ? (
				// @ts-expect-error
				<a.div className="h-full w-4/5 object-contain" style={styles}>
					<FadingImage
						src={ReferenceBack}
						alt="Drawing of a hand with a rectangular ring-3, spanning across the ring-3 and middle finger."
						className="h-full max-h-2/3-screen lg:max-h-[80vh] object-contain"
					/>
					<div className="relative h-1 mt-6 rounded-full overflow-clip bg-neutral-900">
						{/* @ts-expect-error */}
						<a.div className="absolute inset-0 rounded-full bg-neutral-50" style={progress} />
					</div>
				</a.div>
			) : (
				// @ts-expect-error
				<a.div className="h-full w-4/5 object-contain" style={styles}>
					<FadingImage
						src={ReferenceFront}
						alt="Drawing of a hand with a rectangular ring-3, spanning across the ring-3 and middle finger."
						className="h-full max-h-2/3-screen lg:max-h-[80vh] object-contain"
					/>
					<div className="relative h-1 mt-6 rounded-full overflow-clip bg-neutral-900">
						{/* @ts-expect-error */}
						<a.div className="absolute inset-0 rounded-full bg-neutral-50" style={progress} />
					</div>
				</a.div>
			)
		);
	}

	function ColorPickerToast(props: {
		color: string;
		open: boolean;
		onOpenChange: ((open: boolean) => void) | undefined;
	}) {
		const t = useTranslations("COMMON");
		return (
			<Toast.Provider swipeDirection="right" duration={3000}>
				<Toast.Root
					className="flex gap-6 items-center p-3 rounded-xl shadow-lg text-neutral-50 backdrop-blur-xl bg-linear-to-t dark:bg-linear-to-b from-neutral-800/75 to-neutral-900/90 dark:outline outline-neutral-950 ring-1 ring-inset ring-neutral-50/10 data-[state=open]:animate-toast-slide-in data-[state=closed]:animate-fade-out-scale-down data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-toast-slide-out"
					open={props.open}
					onOpenChange={props.onOpenChange}
				>
					<div
						className="w-[30px] h-[30px] rounded-full border border-neutral-50/10"
						style={{ backgroundColor: props.color }}
					/>
					<Toast.Description>{t("copied")}</Toast.Description>
					<Toast.Close className="inline-flex items-center justify-center size-6 hover:bg-neutral-50/10 active:bg-neutral-50/5 rounded-full duration-100 active:duration-75">
						<Error />
					</Toast.Close>
				</Toast.Root>
				<Toast.Viewport className="[--viewport-padding:_24px] fixed bottom-0 right-0 p-[var(--viewport-padding)] flex flex-col w-max z-9999 outline-hidden" />
			</Toast.Provider>
		);
	}

	// Toasts for copying palette colors.
	const [toastOpen, setToastOpen] = useState(false);
	const timerRef = useRef(0);
	const [currentColor, setCurrentColor] = useState("");

	function ColorSwatch({ color, height }: { color: string; height: string | number }) {
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
				className="w-full duration-100 ease-out"
				style={{ backgroundColor: color, height: height }}
				onClick={handleClick}
			/>
		);
	}

	return (
		<>
			<div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-4 md:grid-rows-3 xl:grid-rows-2 grid-flow-dense md:max-h-[900px] border-x border-white/5 light:border-black/5">
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<div
							id="hand"
							className="relative flex items-center justify-center border-t border-r border-neutral-50/5 hover:bg-neutral-900 hover:shadow-lg hover:shadow-black/5 ring-0 ring-neutral-900 hover:ring-8 outline-0 outline-neutral-50/5 hover:outline hover:outline-offset-8 outline- duration-200 active:duration-75 p-6"
						>
							<FadingImage
								src={ReferenceHand}
								className="w-auto max-h-full object-contain"
								alt="Drawing of a hand with a rectangular ring-3, spanning across the ring-3 and middle finger."
							/>
						</div>
					</Dialog.Trigger>
					<InfoDialog
						title={t("Content.Reference.Rings.heading")}
						description={
							<div>
								<p>{t("Content.Reference.Rings.text1")}</p>
								<p>{t("Content.Reference.Rings.text2")}</p>
								<p>{t("Content.Reference.Rings.text3")}</p>
							</div>
						}
						reference={
							<FadingImage
								src={ReferenceHand}
								alt="Drawing of a hand with a rectangular ring-3, spanning across the ring-3 and middle finger."
								className="max-h-1/2-screen w-auto lg:w-1/2 lg:max-h-[50vh] object-contain"
							/>
						}
					/>
				</Dialog.Root>
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<div
							id="front"
							className="relative flex items-center justify-center border-t md:border-r lg:border-b border-neutral-50/5 hover:bg-neutral-900 hover:shadow-lg hover:shadow-black/5 ring-0 ring-neutral-900 hover:ring-8 outline-0 outline-neutral-50/5 hover:outline hover:outline-offset-8 duration-200 active:duration-75 row-span-2 p-3"
						>
							<FadingImage
								src={ReferenceFront}
								className="w-auto max-h-full object-contain"
								alt="Full-body drawing of Mina doing a peace sign, front perspective."
								priority
							/>
						</div>
					</Dialog.Trigger>
					<InfoDialog
						title={t("Content.Reference.Outfit.heading")}
						description={
							<div>
								<p>{t("Content.Reference.Outfit.text1")}</p>
								<p>{t("Content.Reference.Outfit.text2")}</p>
								<p>{t("Content.Reference.Outfit.text3")}</p>
								<p>{t("Content.Reference.Outfit.text4")}</p>
								<p>{t("Content.Reference.Outfit.text5")}</p>
							</div>
						}
						reference={<CyclingFrontBackRef backFirst={false} />}
					/>
				</Dialog.Root>
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<div
							id="back"
							className="relative flex items-center justify-center border-t border-r md:border-r-0 lg:border-r lg:border-b border-neutral-50/5 hover:bg-neutral-900 hover:shadow-lg hover:shadow-black/5 ring-0 ring-neutral-900 hover:ring-8 outline-0 outline-neutral-50/5 hover:outline hover:outline-offset-8 duration-200 active:duration-75 row-span-2 p-3"
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
							<div>
								<p>{t("Content.Reference.Outfit.text1")}</p>
								<p>{t("Content.Reference.Outfit.text2")}</p>
								<p>{t("Content.Reference.Outfit.text3")}</p>
								<p>{t("Content.Reference.Outfit.text4")}</p>
								<p>{t("Content.Reference.Outfit.text5")}</p>
							</div>
						}
						reference={<CyclingFrontBackRef backFirst={true} />}
					/>
				</Dialog.Root>
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<div
							id="hairbow"
							className="relative flex md:col-span-2 xl:col-span-1 items-center justify-center border-t md:border-b lg:border-b-0 md:border-r lg:border-r-0 border-neutral-50/5 gap-6 hover:bg-neutral-900 hover:shadow-lg hover:shadow-black/5 ring-0 ring-neutral-900 hover:ring-8 outline-0 outline-neutral-50/5 hover:outline hover:outline-offset-8 duration-200 active:duration-75 p-6"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 400 434"
								className="w-auto max-h-full object-contain"
							>
								<path
									d="M69.8 338.6c14.1 11.9 23.4 15.7 35.7 25.1a79.5 79.5 0 0 1-12.6-27.3 87 87 0 0 0 20 33.4h.1a113.3 113.3 0 0 0 12.4 11.6c9.2 7.7 18.1 13.9 23.9 21.2a29 29 0 0 1 6.7 18 80 80 0 0 1 15.1-16.4l-2.2-3.7a60.6 60.6 0 0 0-4.7-6.9 117.2 117.2 0 0 1 14.7 19.2c.2-2 .7-3.7.7-3.7l1-3 1 3 2.3 5.2a87 87 0 0 0 2.7 4.7c.3-3 .8-7.1 2.1-10.6 1.3-3.4 3.4-6.2 6.6-7.3 1.3-.4 2.3-.4 3.2 0 1.3.5 2.2 1.8 2.7 3.7.9 3.4.2 8.9-.3 12.2l6.7-4.6 21.1-13.6 2.3-1.5-.6 2.7a446.1 446.1 0 0 1-3.8 15.2c4.4-5.3 9.8-10 15-13.9 11.6-8.5 22.6-13 22.6-13l6.7-2.8-5.5 4.7a28.4 28.4 0 0 0-9 14c2.9-3.1 8.3-7.7 17-11.5 6.1-2.7 14-5 23.6-6.1 12-1.3 23-9.2 32.2-19.4a129.8 129.8 0 0 0 17.1-23.6 196.6 196.6 0 0 0 13-26.2 151.8 151.8 0 0 1-21.6 42.7 137 137 0 0 0 20.4-19.7 101 101 0 0 0 20-37.7c3.5-11.7 4-21 2.9-25a458 458 0 0 0-39.1-91.9c-11.9-20.4-26-39.4-42.1-50.8a216.3 216.3 0 0 0-32.5-20c-14.8-7-20.2-5.1-24.3-5.6l.2-2c4.2.5 9.8-1.3 25 5.8 7.9 3.7 18.4 9.8 32.8 20 16.3 11.7 30.7 30.8 42.7 51.5a459 459 0 0 1 39.4 92.5 51 51 0 0 1-1.6 21c-2 8.5-5.6 18.6-11.6 28.9.2 2.5.8 18.5-6 35.4a66 66 0 0 1-22 28.8 109.5 109.5 0 0 1-36.2 16.8c-21.3 5.8-39.6 5.4-39.6 5.4h-2l1.2-1.6a67 67 0 0 1 20.6-19.5 53.9 53.9 0 0 1 5.9-2.9 74 74 0 0 0-17.6 5.2c-13.5 6-18.7 14-18.7 14l-2.1 3.2v-4s.2-4.9 3.4-10.8c.7-1.3 1.7-2.7 2.8-4.1-4.2 2.1-10.4 5.5-16.6 10.2a77 77 0 0 0-18 17.8l-3.7 5.4 1.7-6.3 3.2-12.4 1.4-5.6a1554 1554 0 0 0-27.6 18.3l-2.4 2 .7-3.1s1.5-7 1-12.1a8.9 8.9 0 0 0-.6-3c-.3-.5-.6-1-1-1.1-.5-.2-1-.2-1.7 0-2.6 1-4.2 3.3-5.3 6-1.8 4.9-2 11-2.3 13.3l-.4 2.8-1.5-2.4s-2.4-3.6-4.5-7.6l-1-2.3-.2.9a8 8 0 0 0 0 2.5l1.7 6.6-3.5-5.8-5-8.3-1.8-3c-7.5 6-12 12.4-16.5 18.7l-.4.5-.7-.2c-38.4-9-53.7-31.7-65.3-52.5-6.9-12.5-12.4-24.3-20.8-32.1l-2.4-2.1a30.4 30.4 0 0 1-10.7-22.7c-.8-12.2 3-23.5 3-23.5l2 .6s-3.8 11-3 22.8c.6 7.7 3 15.8 10 21.2a39 39 0 0 1 2.4 2.1Zm84.1 84a27 27 0 0 0-6.3-18.7c-5.7-7.2-14.5-13.3-23.6-21a137.4 137.4 0 0 1-12.3-11.5c-13.6-11.9-22.7-15.8-35-24.8 5 7 9.4 15.7 14.4 24.7 11.2 20.3 26 42.2 62.8 51.3Zm183.3-61.8c-2 2.7-4.2 5.3-6.4 7.8-9.7 10.6-21 18.8-33.5 20.2-1.1 0-2.2.2-3.2.4a66.4 66.4 0 0 0-11.9 7.7l-1.8 1.5c-4 3.3-8.4 7.6-12.2 13 5.2-.1 20-.9 36.9-5.4 11.7-3.2 24.5-8.3 35.5-16.4 10.7-7.9 17.3-18 21.3-27.9a87 87 0 0 0 6.1-31.5 96.3 96.3 0 0 1-30.8 30.6Zm-187.1-30.2a16 16 0 0 1 3 6.7c.6 2.4.5 5 .1 7.4a33.2 33.2 0 0 1-5.4 12.8c-4 6.4-8.7 10.8-8.7 10.8l-2.2 2.2.4-3c.5-3.4-.5-6.6-2.5-9.8-1.6-2.8-4-5.5-6.8-8.3-5.4-5.4-12.4-11-19.1-17a89.7 89.7 0 0 1-17.1-19.5 36.7 36.7 0 0 1-5.6-17.9h2c.2 6 2.3 11.6 5.4 16.8a88 88 0 0 0 16.7 19c6.7 6 13.8 11.6 19.2 17 3 3 5.4 5.9 7.2 8.8a18 18 0 0 1 2.8 8.2 68.7 68.7 0 0 0 10-14.1c1-2 1.8-4.1 2.3-6.3.6-2.3.8-4.6.5-7a16 16 0 0 0-2.9-7.2l-2.4-1.4c-13.1-8-25.1-16.4-27.5-41.8a1 1 0 0 1 2-.2c2.3 24.5 13.8 32.6 26.5 40.3.8.4 15.5 8.7 27.7 19.4a60.6 60.6 0 0 1 14.6 17.4c2 4.3 2.8 8.5 1.6 12.4-.8 3-2.6 5.8-5.8 8.4a81 81 0 0 0 55.6-12 103 103 0 0 0 23.2-19.5 157 157 0 0 0 18.4-24.4 154.7 154.7 0 0 1-8.8 14.8c2 1.4 5.6 2 9.9 2a73.8 73.8 0 0 0 54.5-29.6c4-5.4 6.7-11 8.6-16.6a70 70 0 0 0 3.5-18.3c1.2-20.3-5.7-37.1-5.7-37.1a94 94 0 0 0 7 37.1c-.3 7.2-1.5 15-4.4 22.5a59.7 59.7 0 0 1-7.3 13.5 75.7 75.7 0 0 1-56.2 30.5c-4.8 0-8.7-.8-11-2.3a125.3 125.3 0 0 1-13.5 15.8 101 101 0 0 1-17 13.4c-31.3 19.5-59.7 11.8-59.7 11.8l-2.2-.7 2-1.3c4.1-2.8 6.3-6 7-9.3 1.2-5.3-1.4-11-5.8-16.7a138.6 138.6 0 0 0-34.1-27.7Zm68-149c.4 4.2 4.9 9.9 10 17a157 157 0 0 1 10.7 17 63.8 63.8 0 0 1 5 15c1 6 1 12.2-.7 18.7-1.4 5.4-4 11-8.1 16.7 3.7-5.9 6-11.5 7.1-17a43.4 43.4 0 0 0 0-18 58.4 58.4 0 0 0-5-14.5l-3-5.9a191 191 0 0 0-7-11.3c-4.7-7.4-8.8-13.5-9-17.7Zm10.2-25c3.3.6 9.8 1 17.6 2.8a67 67 0 0 1 24.4 10.9 57.2 57.2 0 0 1 18.7 23.1 100 100 0 0 1 7.3 28.9c.5 5.5.6 11.4.4 17.8-.2 8-1.1 16.9-2.7 26.5a211 211 0 0 0 1.8-26.5c0-6.4-.4-12.2-1-17.6a104 104 0 0 0-7.7-28.2 58.1 58.1 0 0 0-23.9-26.8c-7-4.3-14.2-6.7-20.4-8.1-6.4-1.6-11.7-2.1-14.5-2.7Zm63.3-15a111 111 0 0 1 25.7 25.2 120.4 120.4 0 0 1 8 12.7c2 3.9 3.5 7.4 4.1 10.4-1-3.1-3-6.9-5.7-11a147.5 147.5 0 0 0-10.9-14.6L310 161a338.6 338.6 0 0 0-8.7-10.1c-3.6-3.9-7-7.1-9.7-9.2Zm-45.8-14.5a17.5 17.5 0 0 1 6.9-.8 27.5 27.5 0 0 1 11.5 3.2c2.2 1 3.6 1.9 3.6 1.9l-3.8-1-2.5-.5-3-.7-1.3-.3c-.5 0-1.1-.2-1.7-.4l-1.7-.4c-1.2-.3-2.4-.6-3.5-.7-1.6-.3-3.1-.5-4.5-.3Z"
									className="fill-neutral-800"
								/>
								<path
									d="M199.6 197a179.2 179.2 0 0 1-49.7 72c-29.2 24.8-67 37-108.3 17.5l-4.5-2.2 5 .3s4.8.2 12.7-1a63 63 0 0 1-13-1.6c-9.3-2.2-19-7.2-25.2-17.6l-1.3-2.2 2.5.8s22.9 7 43.2-8.1c13.4-10 25.5-29.6 29.4-67-4 2.8-13.7 8.4-24.3 5l-2-.6 1.8-1.2s18.9-11.2 22-28.9c1.1-6.7 3-28.3 12.1-47.4 9.3-19.3 25.9-36.1 56.4-33a49 49 0 0 1 22 8.4 82.8 82.8 0 0 1 10.9-24.9c4.5-7.5 9.3-14.1 12.3-21.2 5.8-13.7-.6-26.2-.6-26.2l-1-1.9 2 .4c4.7 1 14.2 7.5 23.3 18C238.8 50 251.4 74.2 246 101c-7.7 37.9-30 47.3-36.8 49.3 2.4 2.5 6.3 8.8 3.6 22a43.4 43.4 0 0 1-13 24.8Zm-107-11.2c-3.7 39.7-16.5 60.3-30.4 70.7a53.8 53.8 0 0 1-42.5 9A37.4 37.4 0 0 0 42.3 280C60 284.4 83 277 83 277s-15 8.4-36.4 9.5c38.8 16.5 74.4 4.4 102-19 28.7-24.4 48.8-61.1 54.9-91 12.2-59.3-21.7-90.1-47.3-92.7-29.5-3-45.4 13.3-54.3 31.9-9 18.9-11 40.2-12 46.9-2.7 14.9-16 25.5-21 29 10.7 2.2 20.1-5 21.8-6.4.5-3.1 4.7-25 12.6-43 4.8-10.7 11-20 18.5-23-7.4 3.2-13.3 12.6-17.7 23.3a212 212 0 0 0-11.5 43.3Zm84.7-3.2A48.9 48.9 0 0 1 174 195a68.4 68.4 0 0 1-12 19.2c-2 2.2-4 4-5.7 5.4a49 49 0 0 0 7.8-10.3l2.6-4.4 1.7-3 1.7-3a141.8 141.8 0 0 0 5.7-11.5 46 46 0 0 0 1.6-5Zm30.8-30.6a120.9 120.9 0 0 1-6.9 40.5c3-3.5 7.3-10.1 9.5-20.7 2.4-11.6-.6-17.4-2.6-19.8Zm-27.9-60.6a70.8 70.8 0 0 1 27.5 52.7A279 279 0 0 0 218 90.7c.5-6.7.5-13.4 0-20-.6-6.9-2-13.5-4.3-19.4a68.1 68.1 0 0 1 5.2 19.4 120.5 120.5 0 0 1 .2 29.2 179 179 0 0 1-4.3 25.6c-2.4 10.9-5 19.3-6.2 22.8 6.3-2 28-11 35.5-47.8 5.3-26-7-49.6-20.2-64.8A65.2 65.2 0 0 0 203.6 19a35.3 35.3 0 0 1-.2 26c-3 7-7.8 13.8-12.4 21.4a79.9 79.9 0 0 0-10.8 25Z"
									className="fill-neutral-400"
								/>
								<circle cx="165.4" cy="164" r="18.1" className="fill-red" />
								<path
									d="M57.3 323.4v9h-2v-20h2v9h160.5V165l-4.2 4.2-1.4-1.4 2.8-2.8h-27.7l2.8 2.8-1.4 1.4-4.2-4.2a19.1 19.1 0 1 1 0-2l4.2-4.2 1.4 1.4-2.8 2.8H215l-2.8-2.8 1.4-1.4 4.2 4.2v-17h2v175.4h160.6v-9h2v20h-2v-9H57.3Zm108.1-176.5a17.1 17.1 0 1 0 0 34.2 17.1 17.1 0 0 0 0-34.2Z"
									className="fill-neutral-50"
								/>
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 400 434"
								className="w-auto max-h-full object-containm hidden md:block xl:hidden"
							>
								<path
									d="M200.8 89.7c-7.4 7.3-8.6 15.6-8.6 15.6l-2-.3s1.4-9.8 10.4-17.8c-4.3-56.2 58.1-78 58.1-78l1.6-.7-.2 1.7c-5.5 32.8 3.8 53.5 8.7 71.8 23 6.5 34 18.2 40 32 3.2 7.3 5 15.1 6.4 23.2 1.3 7.7 2.3 15.7 3.8 23.4a96.3 96.3 0 0 0 5 18.1c1.6 3.8 3.5 7.5 5.9 11l1 1.3h-1.7s-4.5-.2-10.9-5.8a137.2 137.2 0 0 0 .6 25.2 83 83 0 0 0 12.4 37.1c10 14.8 27.8 24.3 58.8 17.1l1.8-.4-.6 1.8s-2.6 8.2-12.1 13.5a32 32 0 0 1-14.4 4.1c-3 4.1-6.9 7.9-12.6 9.6-5.8 1.7-13.5 1.5-24.6-2.6l.7-1.9c10.5 3.9 17.8 4.2 23.3 2.6 4.7-1.4 7.9-4.3 10.6-7.5-4 0-8.3-.3-13.2-1.3-4.4-.9-9.3-2.3-14.6-4.3a97 97 0 0 0 14.8 3.4c5 .8 9.5 1 13.5.6a40.8 40.8 0 0 0 15.5-4.5c6-3.4 9-8 10.3-10.5-30.9 6.5-48.8-3.4-59-18.4a84.6 84.6 0 0 1-12.7-38.2 136.6 136.6 0 0 1-.6-20.7 97.6 97.6 0 0 0-3.6 30.4c-.7-7.2-.6-13.4-.1-18.6 1-10.5 3.6-16.9 4.2-18.1a64 64 0 0 1-9.8-13 60.7 60.7 0 0 0 12 13.6 25 25 0 0 0 8.6 4.8c-2-3-3.8-6.2-5.2-9.5-2.5-6-4.2-12.1-5.4-18.5-1.6-7.7-2.5-15.7-3.9-23.5A99 99 0 0 0 307 115c-5.7-13.2-16.1-24.3-37.5-30.7 2.2 10.6-1 20-5.6 27.7a69.6 69.6 0 0 1-18.4 19.3l-1.4-.4s-4.8-10.2-8.5-25a146.8 146.8 0 0 1-4-26.6v-9.4c.3-6.9 1.4-13.9 3.4-20.6 2-6.6 4.8-12.9 8.9-18.8-3.8 6-6.3 12.5-8 19a88.4 88.4 0 0 0-2.3 29.7 138.5 138.5 0 0 0 4 26.2c3 11.8 6.5 20.6 7.8 23.5 2.8-2 11-8.5 16.8-18a35.1 35.1 0 0 0 5-27.8c-4.9-18.3-14.2-39-9.3-71.4-10.8 4.3-72.4 32-50.9 96l-1.9.7a88.8 88.8 0 0 1-4.2-18.6Z"
									className="fill-neutral-400"
								/>
								<path
									d="M37.3 374.6c-2.3-1.5-11.5-8-18.9-19.6A61.4 61.4 0 0 1 9 328.9a119 119 0 0 1 3.9-38.4c-5.8-13.2-3-28.4 2.6-41.9a149 149 0 0 1 22.4-36.2c5.8-17.2 11-30.3 16-40.8A109 109 0 0 1 70 147l3.5-3.8a104.3 104.3 0 0 1 10.5-9.2 89 89 0 0 1 6-36.7c4-8.8 10.3-14.6 19.4-15.6a46.4 46.4 0 0 1 33 8.5 75.7 75.7 0 0 1 16.3 15.5h.4a30.4 30.4 0 0 0 12.6 1c7.4-.8 9.8-1.7 13-2.2 2.2-.4 4.6-.5 9-.3 7 .3 27 5.9 47.6 21.8a130 130 0 0 1 33.9 39.8c16 29 24.6 53.9 35 71.6a57.2 57.2 0 0 0 23 24l3.5 1.8-4 .1s-10.9.5-22-9.2a231 231 0 0 1 16.7 31.9 109 109 0 0 1 8.2 28.3c1 9-1.4 16.8-5.3 23.2a66 66 0 0 1-26.8 22.6c-.5 3.3-4.3 20.6-26 34.6-13.2 8.6-33.2 16-63.4 18l-4.8.4 4.4-2s12-5.2 21-16a42.1 42.1 0 0 0 9.6-20 22.8 22.8 0 0 1-12.1 10.1l-3 1.1 2-2.4c1.6-2.4 2.8-6 3.6-10.3a105 105 0 0 0 1.5-16.8c.5-25-4.2-57.3-5.3-65.2a107.2 107.2 0 0 1-44.8-20.3 136 136 0 0 1-30.1-32.9c2.4 5.2 5.5 11.1 9 16.8a66 66 0 0 0 14.2 17.2l7.8 6-9-4.2a109 109 0 0 1-38.3-29.7 90 90 0 0 1-17-34.7 289.5 289.5 0 0 0 7.7 45.5l.5 1.6-1.7-.3c-9-1.9-20-4-29.5-8.5-4.8-2.2-9.1-5-12.6-8.7-3.2 49.3-3.9 88.5-1 110.8 3.3 26.8 9.3 37.8 9.3 37.8l1.7 3.3-3.1-2c-2.5-1.5-5.1-4.4-7.5-7.7-2.7-3.7-5.2-8-7-11.4C86.7 406 104 414 104 414s-42-17.7-64.8-37.7a88 88 0 0 1-2-1.7Zm207.4-3.6c.6-9.7 0-24.5-1-39.9-.8-13.3-2-27-3-38-2.7-.2-5.2-.6-7.8-1 1.3 8.9 5.9 40.3 5.3 64.8-.1 6.3-.6 12.2-1.6 17.1-.6 3.4-1.5 6.2-2.7 8.5a20.8 20.8 0 0 0 10.8-11.5ZM160.5 108l.2.3c4.2 5.7 7.4 11.3 9.5 15.4 2 3.7 3 6.3 3.1 6.8L163 113.8a62.2 62.2 0 0 0-6.2-6.4l-.7-.1c-4.2-1-9-1.6-16.7-.8-17.5 2-33.4 11.1-45.9 20.9-1 13.7.7 30 3.2 45.1a229.3 229.3 0 0 1 0 .2c4.6 27.7 12 52 12 52l1.6 5.1-3.3-4.2c-6-7.6-12-23.3-16.5-41.7-9.3 18.3-11.5 31.5-9.3 41.3 2.4 10.6 10.1 17 19.3 21.2a93.6 93.6 0 0 0 16.1 5.3 32.3 32.3 0 0 1-15.8-25.9 31.8 31.8 0 0 0 16.9 24.1c4.2 2.5 8.2 3.8 10.3 4.4-.6-2.6-1.9-8.1-3.2-15.4a250.2 250.2 0 0 1-3.8-40.4c0-13.4 1.3-27 5.5-38.1A110.5 110.5 0 0 0 122 201a81.5 81.5 0 0 0 11 30.5 105.6 105.6 0 0 0 39.4 37.5c-3.3-3.7-6.4-8.1-9.3-12.7-9-14.5-18.2-40.3-18.2-40.3s17 34.3 42.3 53.7c15.2 11.7 32.8 19 53.2 21.4l-2-18.8-.7-.1-3.2-1.8c-2.4-1.5-5.6-4-9.3-7.2-5.8-5-12.8-11.5-19.7-18.6-11.3-11.8-22.1-25-26-34 4.1 9 15.3 21.7 26.9 33.1 7 7 14.1 13.3 20 18.2a104.1 104.1 0 0 0 11.6 8.3h.3a87.3 87.3 0 0 0 5.2-21.1c1-9 1-20.5-2.1-33.8-3.4-15-10.5-32.5-24-51.4 14 18.6 21.6 36 25.3 51a101.2 101.2 0 0 1 .8 45.9c-1.7 7-3.7 11-3.7 11l-.3.4c.6 5.4 3.7 32.8 5.5 58.8 1 15.4 1.7 30.4 1.1 40-.6 10.3-5 18.7-10.3 25a66 66 0 0 1-17.8 14.7c27.4-2.5 46-9.5 58.4-17.6 23-15 25-33.8 25-33.8v-.6c1-8.3-.2-20.5-2.8-34.8-2-10.8-4.8-22.7-8.1-35a718.9 718.9 0 0 0-23.5-71.6c-4.5-11.3-9-21.4-13.1-29.5 4.4 8 9.2 18 13.9 29.2a564.8 564.8 0 0 1 32.8 106.5c2.6 13.9 3.8 25.8 3 34.2a63.4 63.4 0 0 0 24.8-21.3c3.8-6 6.1-13.3 5.1-21.9-1-9-4-18.8-7.8-28a305.4 305.4 0 0 0-22.3-40.2 50.5 50.5 0 0 1-6.5-13.1 78.6 78.6 0 0 0 14.4 19 36.4 36.4 0 0 0 16.3 8.4 63.8 63.8 0 0 1-19.4-22c-10.4-17.9-19-42.6-35.1-71.7a128 128 0 0 0-33.3-39.2c-20-15.6-39.6-21.2-46.4-21.5a43 43 0 0 0-8.6.3c-3.2.5-5.7 1.4-13 2.2a32.3 32.3 0 0 1-11.4-.6Zm-.2 1.4a79 79 0 0 0-19-17.8 53.2 53.2 0 0 0-12-5.9c-6-2-12.5-2.9-19.7-2-8.4 1-14 6.3-17.8 14.4a88 88 0 0 0-5.8 36.4c.4 30.6 9.3 66.6 19 84-4.7-16.5-15.9-61-13.5-92.3.6-8.1 2.1-15.4 5-21.1 3.4-7.2 9-12 17-13 5.7-.5 10.8-.5 15.5.2a50.7 50.7 0 0 1 31.3 17Zm-82.1 254c.8 1.7 5 10.2 9.9 16.9 1.2 1.7 2.5 3.3 3.8 4.6-2-5.3-5.6-16.4-7.9-34.6-2.6-20.6-2.2-55.5.4-99.4a376.3 376.3 0 0 0-8.3 92.1c.4 7.6 1.1 14.3 2.1 20.3Zm5.7-228s-5 4.2-5.8 5.2l-1.4 1.5-2 2.3-3.3 3.8c-5.6 6.4-10.6 14-15.5 24.2-5 10.5-10.2 23.5-16 40.5-6.5 19.4-16.2 44.8-22.6 68.6a136.3 136.3 0 0 0-6.2 47 59.4 59.4 0 0 0 17.6 36c-2.7-4-4.4-8-5-12.2a198.7 198.7 0 0 1 8.2-77.5A308.8 308.8 0 0 1 53 220.3c2.7-5.6 5.7-11.4 9-17.3a552.8 552.8 0 0 0-23 56.2 304.7 304.7 0 0 0-8.8 31.3c-6.1 27.5-5.9 47.8-4.3 61.6 1.2 9.9 9.7 19.3 22 28.4a317.1 317.1 0 0 0 43.8 25.6c-5.8-7.5-15.7-25.7-17.7-62.8-1.4-25.5 1-60 11.2-106a28 28 0 0 1-5.4-11.9c-2-10 .5-23.6 10.5-42.2a229.6 229.6 0 0 1-6.4-47.7ZM13.7 287l1.5-6c5.8-21.6 14.3-44.5 20.8-63-4.8 6-13.1 17.9-18.7 31.4-5 12-7.7 25.6-3.6 37.6Zm139.8-182.4a50.8 50.8 0 0 0-24.8-10.3 60 60 0 0 0-14.9 0c-7.4.9-12.3 5.2-15.5 11.8-2.5 5-4 11.4-4.6 18.5a95.3 95.3 0 0 1 45.4-20.1c6.3-.8 10.7-.5 14.4.1Z"
									className="fill-neutral-800"
								/>
								<circle cx="225.7" cy="164" r="18.1" className="fill-red" />
								<path
									d="M10.7 323.4v9h-2v-20h2v9h160.5V145.9h2V163l4.2-4.2 1.5 1.4-2.8 2.8h27.6l-2.8-2.8 1.4-1.4 4.3 4.2a19.1 19.1 0 1 1 0 2l-4.3 4.2-1.4-1.4 2.8-2.8h-27.6l2.8 2.8-1.5 1.4-4.2-4.2v156.4h160.6v-9h2v20h-2v-9H10.7Zm215-176.5a17.1 17.1 0 1 0 0 34.2 17.1 17.1 0 0 0 0-34.2Z"
									className="fill-neutral-50"
								/>
							</svg>
						</div>
					</Dialog.Trigger>
					<InfoDialog
						col
						title={t("Content.Reference.Hairbow.heading")}
						description={
							<div>
								<p>{t("Content.Reference.Hairbow.text1")}</p>
								<p>{t("Content.Reference.Hairbow.text2")}</p>
							</div>
						}
						reference={
							<div className="relative flex flex-col items-center md:flex-row w-full lg:w-3/4 max-h-2/3-screen">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 400 434"
									className="h-1/2 md:h-auto md:w-1/2"
								>
									<path
										d="M69.8 338.6c14.1 11.9 23.4 15.7 35.7 25.1a79.5 79.5 0 0 1-12.6-27.3 87 87 0 0 0 20 33.4h.1a113.3 113.3 0 0 0 12.4 11.6c9.2 7.7 18.1 13.9 23.9 21.2a29 29 0 0 1 6.7 18 80 80 0 0 1 15.1-16.4l-2.2-3.7a60.6 60.6 0 0 0-4.7-6.9 117.2 117.2 0 0 1 14.7 19.2c.2-2 .7-3.7.7-3.7l1-3 1 3 2.3 5.2a87 87 0 0 0 2.7 4.7c.3-3 .8-7.1 2.1-10.6 1.3-3.4 3.4-6.2 6.6-7.3 1.3-.4 2.3-.4 3.2 0 1.3.5 2.2 1.8 2.7 3.7.9 3.4.2 8.9-.3 12.2l6.7-4.6 21.1-13.6 2.3-1.5-.6 2.7a446.1 446.1 0 0 1-3.8 15.2c4.4-5.3 9.8-10 15-13.9 11.6-8.5 22.6-13 22.6-13l6.7-2.8-5.5 4.7a28.4 28.4 0 0 0-9 14c2.9-3.1 8.3-7.7 17-11.5 6.1-2.7 14-5 23.6-6.1 12-1.3 23-9.2 32.2-19.4a129.8 129.8 0 0 0 17.1-23.6 196.6 196.6 0 0 0 13-26.2 151.8 151.8 0 0 1-21.6 42.7 137 137 0 0 0 20.4-19.7 101 101 0 0 0 20-37.7c3.5-11.7 4-21 2.9-25a458 458 0 0 0-39.1-91.9c-11.9-20.4-26-39.4-42.1-50.8a216.3 216.3 0 0 0-32.5-20c-14.8-7-20.2-5.1-24.3-5.6l.2-2c4.2.5 9.8-1.3 25 5.8 7.9 3.7 18.4 9.8 32.8 20 16.3 11.7 30.7 30.8 42.7 51.5a459 459 0 0 1 39.4 92.5 51 51 0 0 1-1.6 21c-2 8.5-5.6 18.6-11.6 28.9.2 2.5.8 18.5-6 35.4a66 66 0 0 1-22 28.8 109.5 109.5 0 0 1-36.2 16.8c-21.3 5.8-39.6 5.4-39.6 5.4h-2l1.2-1.6a67 67 0 0 1 20.6-19.5 53.9 53.9 0 0 1 5.9-2.9 74 74 0 0 0-17.6 5.2c-13.5 6-18.7 14-18.7 14l-2.1 3.2v-4s.2-4.9 3.4-10.8c.7-1.3 1.7-2.7 2.8-4.1-4.2 2.1-10.4 5.5-16.6 10.2a77 77 0 0 0-18 17.8l-3.7 5.4 1.7-6.3 3.2-12.4 1.4-5.6a1554 1554 0 0 0-27.6 18.3l-2.4 2 .7-3.1s1.5-7 1-12.1a8.9 8.9 0 0 0-.6-3c-.3-.5-.6-1-1-1.1-.5-.2-1-.2-1.7 0-2.6 1-4.2 3.3-5.3 6-1.8 4.9-2 11-2.3 13.3l-.4 2.8-1.5-2.4s-2.4-3.6-4.5-7.6l-1-2.3-.2.9a8 8 0 0 0 0 2.5l1.7 6.6-3.5-5.8-5-8.3-1.8-3c-7.5 6-12 12.4-16.5 18.7l-.4.5-.7-.2c-38.4-9-53.7-31.7-65.3-52.5-6.9-12.5-12.4-24.3-20.8-32.1l-2.4-2.1a30.4 30.4 0 0 1-10.7-22.7c-.8-12.2 3-23.5 3-23.5l2 .6s-3.8 11-3 22.8c.6 7.7 3 15.8 10 21.2a39 39 0 0 1 2.4 2.1Zm84.1 84a27 27 0 0 0-6.3-18.7c-5.7-7.2-14.5-13.3-23.6-21a137.4 137.4 0 0 1-12.3-11.5c-13.6-11.9-22.7-15.8-35-24.8 5 7 9.4 15.7 14.4 24.7 11.2 20.3 26 42.2 62.8 51.3Zm183.3-61.8c-2 2.7-4.2 5.3-6.4 7.8-9.7 10.6-21 18.8-33.5 20.2-1.1 0-2.2.2-3.2.4a66.4 66.4 0 0 0-11.9 7.7l-1.8 1.5c-4 3.3-8.4 7.6-12.2 13 5.2-.1 20-.9 36.9-5.4 11.7-3.2 24.5-8.3 35.5-16.4 10.7-7.9 17.3-18 21.3-27.9a87 87 0 0 0 6.1-31.5 96.3 96.3 0 0 1-30.8 30.6Zm-187.1-30.2a16 16 0 0 1 3 6.7c.6 2.4.5 5 .1 7.4a33.2 33.2 0 0 1-5.4 12.8c-4 6.4-8.7 10.8-8.7 10.8l-2.2 2.2.4-3c.5-3.4-.5-6.6-2.5-9.8-1.6-2.8-4-5.5-6.8-8.3-5.4-5.4-12.4-11-19.1-17a89.7 89.7 0 0 1-17.1-19.5 36.7 36.7 0 0 1-5.6-17.9h2c.2 6 2.3 11.6 5.4 16.8a88 88 0 0 0 16.7 19c6.7 6 13.8 11.6 19.2 17 3 3 5.4 5.9 7.2 8.8a18 18 0 0 1 2.8 8.2 68.7 68.7 0 0 0 10-14.1c1-2 1.8-4.1 2.3-6.3.6-2.3.8-4.6.5-7a16 16 0 0 0-2.9-7.2l-2.4-1.4c-13.1-8-25.1-16.4-27.5-41.8a1 1 0 0 1 2-.2c2.3 24.5 13.8 32.6 26.5 40.3.8.4 15.5 8.7 27.7 19.4a60.6 60.6 0 0 1 14.6 17.4c2 4.3 2.8 8.5 1.6 12.4-.8 3-2.6 5.8-5.8 8.4a81 81 0 0 0 55.6-12 103 103 0 0 0 23.2-19.5 157 157 0 0 0 18.4-24.4 154.7 154.7 0 0 1-8.8 14.8c2 1.4 5.6 2 9.9 2a73.8 73.8 0 0 0 54.5-29.6c4-5.4 6.7-11 8.6-16.6a70 70 0 0 0 3.5-18.3c1.2-20.3-5.7-37.1-5.7-37.1a94 94 0 0 0 7 37.1c-.3 7.2-1.5 15-4.4 22.5a59.7 59.7 0 0 1-7.3 13.5 75.7 75.7 0 0 1-56.2 30.5c-4.8 0-8.7-.8-11-2.3a125.3 125.3 0 0 1-13.5 15.8 101 101 0 0 1-17 13.4c-31.3 19.5-59.7 11.8-59.7 11.8l-2.2-.7 2-1.3c4.1-2.8 6.3-6 7-9.3 1.2-5.3-1.4-11-5.8-16.7a138.6 138.6 0 0 0-34.1-27.7Zm68-149c.4 4.2 4.9 9.9 10 17a157 157 0 0 1 10.7 17 63.8 63.8 0 0 1 5 15c1 6 1 12.2-.7 18.7-1.4 5.4-4 11-8.1 16.7 3.7-5.9 6-11.5 7.1-17a43.4 43.4 0 0 0 0-18 58.4 58.4 0 0 0-5-14.5l-3-5.9a191 191 0 0 0-7-11.3c-4.7-7.4-8.8-13.5-9-17.7Zm10.2-25c3.3.6 9.8 1 17.6 2.8a67 67 0 0 1 24.4 10.9 57.2 57.2 0 0 1 18.7 23.1 100 100 0 0 1 7.3 28.9c.5 5.5.6 11.4.4 17.8-.2 8-1.1 16.9-2.7 26.5a211 211 0 0 0 1.8-26.5c0-6.4-.4-12.2-1-17.6a104 104 0 0 0-7.7-28.2 58.1 58.1 0 0 0-23.9-26.8c-7-4.3-14.2-6.7-20.4-8.1-6.4-1.6-11.7-2.1-14.5-2.7Zm63.3-15a111 111 0 0 1 25.7 25.2 120.4 120.4 0 0 1 8 12.7c2 3.9 3.5 7.4 4.1 10.4-1-3.1-3-6.9-5.7-11a147.5 147.5 0 0 0-10.9-14.6L310 161a338.6 338.6 0 0 0-8.7-10.1c-3.6-3.9-7-7.1-9.7-9.2Zm-45.8-14.5a17.5 17.5 0 0 1 6.9-.8 27.5 27.5 0 0 1 11.5 3.2c2.2 1 3.6 1.9 3.6 1.9l-3.8-1-2.5-.5-3-.7-1.3-.3c-.5 0-1.1-.2-1.7-.4l-1.7-.4c-1.2-.3-2.4-.6-3.5-.7-1.6-.3-3.1-.5-4.5-.3Z"
										className="fill-neutral-800"
									/>
									<path
										d="M199.6 197a179.2 179.2 0 0 1-49.7 72c-29.2 24.8-67 37-108.3 17.5l-4.5-2.2 5 .3s4.8.2 12.7-1a63 63 0 0 1-13-1.6c-9.3-2.2-19-7.2-25.2-17.6l-1.3-2.2 2.5.8s22.9 7 43.2-8.1c13.4-10 25.5-29.6 29.4-67-4 2.8-13.7 8.4-24.3 5l-2-.6 1.8-1.2s18.9-11.2 22-28.9c1.1-6.7 3-28.3 12.1-47.4 9.3-19.3 25.9-36.1 56.4-33a49 49 0 0 1 22 8.4 82.8 82.8 0 0 1 10.9-24.9c4.5-7.5 9.3-14.1 12.3-21.2 5.8-13.7-.6-26.2-.6-26.2l-1-1.9 2 .4c4.7 1 14.2 7.5 23.3 18C238.8 50 251.4 74.2 246 101c-7.7 37.9-30 47.3-36.8 49.3 2.4 2.5 6.3 8.8 3.6 22a43.4 43.4 0 0 1-13 24.8Zm-107-11.2c-3.7 39.7-16.5 60.3-30.4 70.7a53.8 53.8 0 0 1-42.5 9A37.4 37.4 0 0 0 42.3 280C60 284.4 83 277 83 277s-15 8.4-36.4 9.5c38.8 16.5 74.4 4.4 102-19 28.7-24.4 48.8-61.1 54.9-91 12.2-59.3-21.7-90.1-47.3-92.7-29.5-3-45.4 13.3-54.3 31.9-9 18.9-11 40.2-12 46.9-2.7 14.9-16 25.5-21 29 10.7 2.2 20.1-5 21.8-6.4.5-3.1 4.7-25 12.6-43 4.8-10.7 11-20 18.5-23-7.4 3.2-13.3 12.6-17.7 23.3a212 212 0 0 0-11.5 43.3Zm84.7-3.2A48.9 48.9 0 0 1 174 195a68.4 68.4 0 0 1-12 19.2c-2 2.2-4 4-5.7 5.4a49 49 0 0 0 7.8-10.3l2.6-4.4 1.7-3 1.7-3a141.8 141.8 0 0 0 5.7-11.5 46 46 0 0 0 1.6-5Zm30.8-30.6a120.9 120.9 0 0 1-6.9 40.5c3-3.5 7.3-10.1 9.5-20.7 2.4-11.6-.6-17.4-2.6-19.8Zm-27.9-60.6a70.8 70.8 0 0 1 27.5 52.7A279 279 0 0 0 218 90.7c.5-6.7.5-13.4 0-20-.6-6.9-2-13.5-4.3-19.4a68.1 68.1 0 0 1 5.2 19.4 120.5 120.5 0 0 1 .2 29.2 179 179 0 0 1-4.3 25.6c-2.4 10.9-5 19.3-6.2 22.8 6.3-2 28-11 35.5-47.8 5.3-26-7-49.6-20.2-64.8A65.2 65.2 0 0 0 203.6 19a35.3 35.3 0 0 1-.2 26c-3 7-7.8 13.8-12.4 21.4a79.9 79.9 0 0 0-10.8 25Z"
										className="fill-neutral-400"
									/>
									<circle cx="165.4" cy="164" r="18.1" className="fill-red" />
									<path
										d="M57.3 323.4v9h-2v-20h2v9h160.5V165l-4.2 4.2-1.4-1.4 2.8-2.8h-27.7l2.8 2.8-1.4 1.4-4.2-4.2a19.1 19.1 0 1 1 0-2l4.2-4.2 1.4 1.4-2.8 2.8H215l-2.8-2.8 1.4-1.4 4.2 4.2v-17h2v175.4h160.6v-9h2v20h-2v-9H57.3Zm108.1-176.5a17.1 17.1 0 1 0 0 34.2 17.1 17.1 0 0 0 0-34.2Z"
										className="fill-neutral-50"
									/>
								</svg>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 400 434"
									className="h-1/2 md:h-auto md:w-1/2"
								>
									<path
										d="M200.8 89.7c-7.4 7.3-8.6 15.6-8.6 15.6l-2-.3s1.4-9.8 10.4-17.8c-4.3-56.2 58.1-78 58.1-78l1.6-.7-.2 1.7c-5.5 32.8 3.8 53.5 8.7 71.8 23 6.5 34 18.2 40 32 3.2 7.3 5 15.1 6.4 23.2 1.3 7.7 2.3 15.7 3.8 23.4a96.3 96.3 0 0 0 5 18.1c1.6 3.8 3.5 7.5 5.9 11l1 1.3h-1.7s-4.5-.2-10.9-5.8a137.2 137.2 0 0 0 .6 25.2 83 83 0 0 0 12.4 37.1c10 14.8 27.8 24.3 58.8 17.1l1.8-.4-.6 1.8s-2.6 8.2-12.1 13.5a32 32 0 0 1-14.4 4.1c-3 4.1-6.9 7.9-12.6 9.6-5.8 1.7-13.5 1.5-24.6-2.6l.7-1.9c10.5 3.9 17.8 4.2 23.3 2.6 4.7-1.4 7.9-4.3 10.6-7.5-4 0-8.3-.3-13.2-1.3-4.4-.9-9.3-2.3-14.6-4.3a97 97 0 0 0 14.8 3.4c5 .8 9.5 1 13.5.6a40.8 40.8 0 0 0 15.5-4.5c6-3.4 9-8 10.3-10.5-30.9 6.5-48.8-3.4-59-18.4a84.6 84.6 0 0 1-12.7-38.2 136.6 136.6 0 0 1-.6-20.7 97.6 97.6 0 0 0-3.6 30.4c-.7-7.2-.6-13.4-.1-18.6 1-10.5 3.6-16.9 4.2-18.1a64 64 0 0 1-9.8-13 60.7 60.7 0 0 0 12 13.6 25 25 0 0 0 8.6 4.8c-2-3-3.8-6.2-5.2-9.5-2.5-6-4.2-12.1-5.4-18.5-1.6-7.7-2.5-15.7-3.9-23.5A99 99 0 0 0 307 115c-5.7-13.2-16.1-24.3-37.5-30.7 2.2 10.6-1 20-5.6 27.7a69.6 69.6 0 0 1-18.4 19.3l-1.4-.4s-4.8-10.2-8.5-25a146.8 146.8 0 0 1-4-26.6v-9.4c.3-6.9 1.4-13.9 3.4-20.6 2-6.6 4.8-12.9 8.9-18.8-3.8 6-6.3 12.5-8 19a88.4 88.4 0 0 0-2.3 29.7 138.5 138.5 0 0 0 4 26.2c3 11.8 6.5 20.6 7.8 23.5 2.8-2 11-8.5 16.8-18a35.1 35.1 0 0 0 5-27.8c-4.9-18.3-14.2-39-9.3-71.4-10.8 4.3-72.4 32-50.9 96l-1.9.7a88.8 88.8 0 0 1-4.2-18.6Z"
										className="fill-neutral-400"
									/>
									<path
										d="M37.3 374.6c-2.3-1.5-11.5-8-18.9-19.6A61.4 61.4 0 0 1 9 328.9a119 119 0 0 1 3.9-38.4c-5.8-13.2-3-28.4 2.6-41.9a149 149 0 0 1 22.4-36.2c5.8-17.2 11-30.3 16-40.8A109 109 0 0 1 70 147l3.5-3.8a104.3 104.3 0 0 1 10.5-9.2 89 89 0 0 1 6-36.7c4-8.8 10.3-14.6 19.4-15.6a46.4 46.4 0 0 1 33 8.5 75.7 75.7 0 0 1 16.3 15.5h.4a30.4 30.4 0 0 0 12.6 1c7.4-.8 9.8-1.7 13-2.2 2.2-.4 4.6-.5 9-.3 7 .3 27 5.9 47.6 21.8a130 130 0 0 1 33.9 39.8c16 29 24.6 53.9 35 71.6a57.2 57.2 0 0 0 23 24l3.5 1.8-4 .1s-10.9.5-22-9.2a231 231 0 0 1 16.7 31.9 109 109 0 0 1 8.2 28.3c1 9-1.4 16.8-5.3 23.2a66 66 0 0 1-26.8 22.6c-.5 3.3-4.3 20.6-26 34.6-13.2 8.6-33.2 16-63.4 18l-4.8.4 4.4-2s12-5.2 21-16a42.1 42.1 0 0 0 9.6-20 22.8 22.8 0 0 1-12.1 10.1l-3 1.1 2-2.4c1.6-2.4 2.8-6 3.6-10.3a105 105 0 0 0 1.5-16.8c.5-25-4.2-57.3-5.3-65.2a107.2 107.2 0 0 1-44.8-20.3 136 136 0 0 1-30.1-32.9c2.4 5.2 5.5 11.1 9 16.8a66 66 0 0 0 14.2 17.2l7.8 6-9-4.2a109 109 0 0 1-38.3-29.7 90 90 0 0 1-17-34.7 289.5 289.5 0 0 0 7.7 45.5l.5 1.6-1.7-.3c-9-1.9-20-4-29.5-8.5-4.8-2.2-9.1-5-12.6-8.7-3.2 49.3-3.9 88.5-1 110.8 3.3 26.8 9.3 37.8 9.3 37.8l1.7 3.3-3.1-2c-2.5-1.5-5.1-4.4-7.5-7.7-2.7-3.7-5.2-8-7-11.4C86.7 406 104 414 104 414s-42-17.7-64.8-37.7a88 88 0 0 1-2-1.7Zm207.4-3.6c.6-9.7 0-24.5-1-39.9-.8-13.3-2-27-3-38-2.7-.2-5.2-.6-7.8-1 1.3 8.9 5.9 40.3 5.3 64.8-.1 6.3-.6 12.2-1.6 17.1-.6 3.4-1.5 6.2-2.7 8.5a20.8 20.8 0 0 0 10.8-11.5ZM160.5 108l.2.3c4.2 5.7 7.4 11.3 9.5 15.4 2 3.7 3 6.3 3.1 6.8L163 113.8a62.2 62.2 0 0 0-6.2-6.4l-.7-.1c-4.2-1-9-1.6-16.7-.8-17.5 2-33.4 11.1-45.9 20.9-1 13.7.7 30 3.2 45.1a229.3 229.3 0 0 1 0 .2c4.6 27.7 12 52 12 52l1.6 5.1-3.3-4.2c-6-7.6-12-23.3-16.5-41.7-9.3 18.3-11.5 31.5-9.3 41.3 2.4 10.6 10.1 17 19.3 21.2a93.6 93.6 0 0 0 16.1 5.3 32.3 32.3 0 0 1-15.8-25.9 31.8 31.8 0 0 0 16.9 24.1c4.2 2.5 8.2 3.8 10.3 4.4-.6-2.6-1.9-8.1-3.2-15.4a250.2 250.2 0 0 1-3.8-40.4c0-13.4 1.3-27 5.5-38.1A110.5 110.5 0 0 0 122 201a81.5 81.5 0 0 0 11 30.5 105.6 105.6 0 0 0 39.4 37.5c-3.3-3.7-6.4-8.1-9.3-12.7-9-14.5-18.2-40.3-18.2-40.3s17 34.3 42.3 53.7c15.2 11.7 32.8 19 53.2 21.4l-2-18.8-.7-.1-3.2-1.8c-2.4-1.5-5.6-4-9.3-7.2-5.8-5-12.8-11.5-19.7-18.6-11.3-11.8-22.1-25-26-34 4.1 9 15.3 21.7 26.9 33.1 7 7 14.1 13.3 20 18.2a104.1 104.1 0 0 0 11.6 8.3h.3a87.3 87.3 0 0 0 5.2-21.1c1-9 1-20.5-2.1-33.8-3.4-15-10.5-32.5-24-51.4 14 18.6 21.6 36 25.3 51a101.2 101.2 0 0 1 .8 45.9c-1.7 7-3.7 11-3.7 11l-.3.4c.6 5.4 3.7 32.8 5.5 58.8 1 15.4 1.7 30.4 1.1 40-.6 10.3-5 18.7-10.3 25a66 66 0 0 1-17.8 14.7c27.4-2.5 46-9.5 58.4-17.6 23-15 25-33.8 25-33.8v-.6c1-8.3-.2-20.5-2.8-34.8-2-10.8-4.8-22.7-8.1-35a718.9 718.9 0 0 0-23.5-71.6c-4.5-11.3-9-21.4-13.1-29.5 4.4 8 9.2 18 13.9 29.2a564.8 564.8 0 0 1 32.8 106.5c2.6 13.9 3.8 25.8 3 34.2a63.4 63.4 0 0 0 24.8-21.3c3.8-6 6.1-13.3 5.1-21.9-1-9-4-18.8-7.8-28a305.4 305.4 0 0 0-22.3-40.2 50.5 50.5 0 0 1-6.5-13.1 78.6 78.6 0 0 0 14.4 19 36.4 36.4 0 0 0 16.3 8.4 63.8 63.8 0 0 1-19.4-22c-10.4-17.9-19-42.6-35.1-71.7a128 128 0 0 0-33.3-39.2c-20-15.6-39.6-21.2-46.4-21.5a43 43 0 0 0-8.6.3c-3.2.5-5.7 1.4-13 2.2a32.3 32.3 0 0 1-11.4-.6Zm-.2 1.4a79 79 0 0 0-19-17.8 53.2 53.2 0 0 0-12-5.9c-6-2-12.5-2.9-19.7-2-8.4 1-14 6.3-17.8 14.4a88 88 0 0 0-5.8 36.4c.4 30.6 9.3 66.6 19 84-4.7-16.5-15.9-61-13.5-92.3.6-8.1 2.1-15.4 5-21.1 3.4-7.2 9-12 17-13 5.7-.5 10.8-.5 15.5.2a50.7 50.7 0 0 1 31.3 17Zm-82.1 254c.8 1.7 5 10.2 9.9 16.9 1.2 1.7 2.5 3.3 3.8 4.6-2-5.3-5.6-16.4-7.9-34.6-2.6-20.6-2.2-55.5.4-99.4a376.3 376.3 0 0 0-8.3 92.1c.4 7.6 1.1 14.3 2.1 20.3Zm5.7-228s-5 4.2-5.8 5.2l-1.4 1.5-2 2.3-3.3 3.8c-5.6 6.4-10.6 14-15.5 24.2-5 10.5-10.2 23.5-16 40.5-6.5 19.4-16.2 44.8-22.6 68.6a136.3 136.3 0 0 0-6.2 47 59.4 59.4 0 0 0 17.6 36c-2.7-4-4.4-8-5-12.2a198.7 198.7 0 0 1 8.2-77.5A308.8 308.8 0 0 1 53 220.3c2.7-5.6 5.7-11.4 9-17.3a552.8 552.8 0 0 0-23 56.2 304.7 304.7 0 0 0-8.8 31.3c-6.1 27.5-5.9 47.8-4.3 61.6 1.2 9.9 9.7 19.3 22 28.4a317.1 317.1 0 0 0 43.8 25.6c-5.8-7.5-15.7-25.7-17.7-62.8-1.4-25.5 1-60 11.2-106a28 28 0 0 1-5.4-11.9c-2-10 .5-23.6 10.5-42.2a229.6 229.6 0 0 1-6.4-47.7ZM13.7 287l1.5-6c5.8-21.6 14.3-44.5 20.8-63-4.8 6-13.1 17.9-18.7 31.4-5 12-7.7 25.6-3.6 37.6Zm139.8-182.4a50.8 50.8 0 0 0-24.8-10.3 60 60 0 0 0-14.9 0c-7.4.9-12.3 5.2-15.5 11.8-2.5 5-4 11.4-4.6 18.5a95.3 95.3 0 0 1 45.4-20.1c6.3-.8 10.7-.5 14.4.1Z"
										className="fill-neutral-800"
									/>
									<circle cx="225.7" cy="164" r="18.1" className="fill-red" />
									<path
										d="M10.7 323.4v9h-2v-20h2v9h160.5V145.9h2V163l4.2-4.2 1.5 1.4-2.8 2.8h27.6l-2.8-2.8 1.4-1.4 4.3 4.2a19.1 19.1 0 1 1 0 2l-4.3 4.2-1.4-1.4 2.8-2.8h-27.6l2.8 2.8-1.5 1.4-4.2-4.2v156.4h160.6v-9h2v20h-2v-9H10.7Zm215-176.5a17.1 17.1 0 1 0 0 34.2 17.1 17.1 0 0 0 0-34.2Z"
										className="fill-neutral-50"
									/>
								</svg>
							</div>
						}
					/>
				</Dialog.Root>
				<Dialog.Root>
					<Dialog.Trigger asChild>
						<div
							id="shoe"
							className="relative flex items-center justify-center border-y md:border-b-0 border-r lg:border-b border-neutral-50/5 hover:bg-neutral-900 hover:shadow-lg hover:shadow-black/5 ring-0 ring-neutral-900 hover:ring-8 outline-0 outline-neutral-50/5 hover:outline hover:outline-offset-8 duration-200 active:duration-75 p-6"
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
							<div>
								<p>{t("Content.Reference.Shoes.text1")}</p>
								<p>{t("Content.Reference.Shoes.text2")}</p>
							</div>
						}
						reference={
							<FadingImage
								src={ReferenceShoes}
								alt="Drawing of a hand with a rectangular ring-3, spanning across the ring-3 and middle finger."
								className="max-h-1/3-screen w-auto lg:w-2/3 lg:max-h-[90vh] object-contain"
							/>
						}
					/>
				</Dialog.Root>
				<div id="colorpalette" className="relative flex flex-col justify-between border-y border-neutral-50/5">
					<ColorPickerToast color={currentColor} open={toastOpen} onOpenChange={setToastOpen} />
					<div className="flex flex-col h-full p-3 lg:p-6">
						<ColorSwatch color="#dddddd" height="10%" />
						<ColorSwatch color="#44bb55" height="30%" />
						<div className="flex h-[20%]">
							<ColorSwatch color="#22ccff" height="100%" />
							<ColorSwatch color="#2299ff" height="100%" />
						</div>
						<ColorSwatch color="#ffece0" height="20%" />
						<ColorSwatch color="#222222" height="20%" />
					</div>
					<p className="text-xs text-center px-3 pb-3 lg:pb-6">
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
