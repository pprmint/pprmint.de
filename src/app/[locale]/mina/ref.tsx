"use client";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import * as Accordion from "@radix-ui/react-accordion";
import * as Toast from "@radix-ui/react-toast";
import FadingImage from "src/components/ui/FadingImage";

import ReferenceFront from "public/assets/mina/ref/front.webp";
import ReferenceBack from "public/assets/mina/ref/back.webp";
import ReferenceHand from "public/assets/mina/ref/hand.webp";
import ReferenceHairtieFront from "public/assets/mina/ref/head_front.svg";
import ReferenceHairtieBack from "public/assets/mina/ref/head_back.svg";

import { Link } from "src/navigation";
import Button from "src/components/ui/Button";

function ColorPickerToast(props: {
	color: string;
	open: boolean;
	onOpenChange: ((open: boolean) => void) | undefined;
}) {
	const t = useTranslations("COMMON");
	return (
		<Toast.Provider swipeDirection="right">
			<Toast.Root
				className="flex gap-5 items-center p-3 rounded-xl shadow-lg shadow-neutral-950/50 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 data-[state=open]:animate-toast-slide-in data-[state=closed]:animate-fade-out-scale-down data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-toast-slide-out"
				open={props.open}
				onOpenChange={props.onOpenChange}
			>
				<div
					className="w-[30px] h-[30px] rounded-full border border-neutral-50/10"
					style={{ backgroundColor: props.color }}
				/>
				<Toast.Description>{t("copied")}</Toast.Description>
				<Toast.Close className="hover:bg-neutral-50/10 active:bg-neutral-50/5 rounded-full duration-100 active:duration-75">
					<i className="ri-close-line text-neutral-50 p-1" />
				</Toast.Close>
			</Toast.Root>
			<Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 p-[var(--viewport-padding)] flex flex-col w-max z-50 outline-none" />
		</Toast.Provider>
	);
}

export default function RefSheet() {
	const t = useTranslations("MINA");

	// Toast
	const [open, setOpen] = useState(false);
	const timerRef = useRef(0);
	const [currentColor, setCurrentColor] = useState("");

	function ColorSwatch({ color, ring }: { color: string; ring?: boolean }) {
		function handleClick() {
			navigator.clipboard.writeText(color.substring(1));
			setOpen(false);
			window.clearTimeout(timerRef.current);
			timerRef.current = window.setTimeout(() => {
				setCurrentColor(color);
				setOpen(true);
			}, 100);
		}
		return (
			<div
				className={`active:scale-95 size-12 rounded-full duration-150 ease-out cursor-pointer ${
					ring && "ring-1 ring-neutral-800"
				}`}
				style={{ backgroundColor: color }}
				onClick={handleClick}
			/>
		);
	}

	return (
		<section id="design" className="my-20 max-w-7xl mx-auto px-2">
			<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-4 md:grid-rows-3 xl:grid-rows-2 grid-flow-dense gap-3 md:max-h-[800px]">
				<div
					id="colorpalette"
					className="flex items-center justify-center bg-neutral-900 border border-neutral-800 hover:ring-2 ring-neutral-800 duration-100 rounded-xl"
				>
					<ColorPickerToast color={currentColor} open={open} onOpenChange={setOpen} />
					<div className="flex flex-col gap-2 h-full justify-center">
						<div className="flex gap-5 px-6">
							<ColorSwatch color="#63e4a3" />
							<ColorSwatch color="#22ccff" />
							<ColorSwatch color="#111111" />
							<ColorSwatch color="#ffeee4" />
						</div>
						<div className="flex gap-2 px-4 items-center">
							<div className="flex gap-5 p-2 ring-2 ring-neutral-800 rounded-full">
								<ColorSwatch color="#00cc66" />
								<ColorSwatch color="#4499ee" />
								<ColorSwatch color="#222222" ring />
							</div>
							<p className="text-xs font-medium text-neutral-600">PRIMARY</p>
						</div>
						<div className="flex gap-5 px-6">
							<ColorSwatch color="#008b45" />
							<ColorSwatch color="#196bc0" />
							<ColorSwatch color="#111111" />
						</div>
					</div>
				</div>
                <div
					id="front"
					className="flex items-center justify-center bg-neutral-900 border border-neutral-800 hover:ring-2 ring-neutral-800 duration-100 rounded-xl row-span-2 p-3"
				>
					<FadingImage
						src={ReferenceFront}
						className="w-auto max-h-full object-contain"
						alt="Full-body drawing of Mina doing a peace sign, front perspective."
						priority
					/>
				</div>
				<div
					id="back"
					className="flex items-center justify-center bg-neutral-900 border border-neutral-800 hover:ring-2 ring-neutral-800 duration-100 rounded-xl row-span-2 p-3"
				>
					<FadingImage
						src={ReferenceBack}
						className="w-auto max-h-full object-contain"
						alt="Full-body drawing of Mina doing a peace sign, back perspective."
						priority
					/>
				</div>
                <div
					id="hairtie"
					className="flex md:col-span-2 xl:col-span-1 items-center justify-center gap-6 bg-neutral-900 border border-neutral-800 hover:ring-2 ring-neutral-800 duration-100 rounded-xl p-6"
				>
					<FadingImage
						src={ReferenceHairtieBack}
						className="w-auto max-h-full object-contain"
						alt="Outline of Mina's head, viewed from the back."
						priority
					/>
					<FadingImage
						src={ReferenceHairtieFront}
						className="w-auto max-h-full object-containm hidden md:block xl:hidden"
						alt="Outline of Mina's head, viewed from the front."
						priority
					/>
				</div>
				<div
					id="hand"
					className="flex items-center justify-center bg-neutral-900 border border-neutral-800 hover:ring-2 ring-neutral-800 duration-100 rounded-xl p-6"
				>
					<FadingImage
						src={ReferenceHand}
						className="w-auto max-h-full object-contain"
						alt="Full-body drawing of Mina doing a peace sign, front perspective."
					/>
				</div>

				<div
					id="shoe"
					className="flex items-center justify-center bg-neutral-900 border border-neutral-800 hover:ring-2 ring-neutral-800 duration-100 rounded-xl p-6"
				>
					shoes
				</div>
			</div>
			<div className="flex items-center justify-between pt-6">
				<p>
					Reference drawings made by{" "}
					<Link href="https://twitter.com/nekomimiwubs" rel="noopener noreferrer" className="text-link-external">
						Nekomimi
					</Link>
					.
				</p>
				<Link href="https://static.pprmint.art/download/Mina/reference.png">
					<Button>
						<i className="ri-download-2-line" /> Download reference sheet
					</Button>
				</Link>
			</div>
		</section>
	);
}
