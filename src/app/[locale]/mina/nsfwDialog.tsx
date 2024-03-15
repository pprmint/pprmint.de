"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSpring, useTransition, easings, a } from "@react-spring/web";
import * as Dialog from "@radix-ui/react-dialog";

import Button from "src/components/ui/Button";

import HehMina from "public/assets/mina/heh-upscaled.png";
import { Link } from "src/navigation";
import FadingImage from "src/components/ui/FadingImage";
import { X } from "lucide-react";

export default function NsfwDialog({ onAccept }: { onAccept: () => void }) {
	const t = useTranslations("MINA");

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
		<Dialog.Portal>
			<Dialog.Overlay className="bg-neutral-950/90 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-50" />
			<Dialog.Content
				className={`fixed inset-0 lg:inset-auto overflow-auto z-[9999] flex flex-col lg:flex-row gap-12 items-center lg:top-1/2 lg:left-1/2 w-screen max-w-5xl lg:-translate-x-1/2 lg:-translate-y-1/2 p-6 md:p-9 bg-neutral-950 lg:border border-neutral-900 ring-1 ring-neutral-950 lg:shadow-xl shadow-neutral-950/50 lg:rounded-xl data-[state=open]:animate-scale-up data-[state=closed]:animate-scale-down focus:outline-none origin-center lg:origin-top-left`}
			>
				<FadingImage
					src={HehMina}
					alt="A smirking Mina."
					className="h-32 lg:h-44 w-auto rounded-full border-neutral-50"
				/>
				<div>
					<Dialog.Title asChild>
						<h2 className="lg:text-balance">
							{t("Content.NSFW.Dialog.title")}
							<span className="text-green">.</span>
						</h2>
					</Dialog.Title>
					<Dialog.Description asChild>
						<div>
							<p>{t("Content.NSFW.Dialog.text1")}</p>
							<p>{t("Content.NSFW.Dialog.text2")}</p>
							<p className="font-bold text-red">{t("Content.NSFW.Dialog.text3")}</p>
						</div>
					</Dialog.Description>
					<div className="flex flex-row flex-wrap justify-between sm:justify-normal gap-3 py-9 lg:pb-0">
						<Button color="green" onClick={onAccept} disabled={timer < 10}>
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
							{t("Content.NSFW.Dialog.admitSins")}
						</Button>

						<Dialog.Close asChild>
							<Button>{t("Content.NSFW.Dialog.nevermind")}</Button>
						</Dialog.Close>
					</div>
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
