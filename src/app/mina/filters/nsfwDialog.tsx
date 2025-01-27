"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSpring, easings, a } from "@react-spring/web";
import * as Dialog from "@radix-ui/react-dialog";

import Button from "src/components/ui/Button";

import HehMina from "public/assets/mina/heh-upscaled.png";
import FadingImage from "src/components/ui/FadingImage";
import Error from "src/icons/Error";

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
		from: { val: 42.5 },
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
			<Dialog.Overlay className="bg-neutral-950/90 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-100" />
			<Dialog.Content
				className="fixed flex flex-col lg:flex-row items-center gap-9 z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-svh md:h-max w-screen max-w-5xl md:rounded-xl bg-white dark:bg-neutral-950 md:border border-white/10 md:outline outline-1 outline-black/10 dark:outline-black/50 p-6 md:p-9 data-[state=open]:animate-dialog-enter data-[state=closed]:animate-dialog-exit origin-center shadow-2xl"
			>
				<FadingImage
					hideSpinner
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
							<svg height={15} width={15} className="-rotate-90">
								<a.circle
									// @ts-expect-error
									cx={7.5}
									cy={7.5}
									r={6.75}
									strokeWidth={1.25}
									className="stroke-current fill-none"
									strokeDasharray={42.5}
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
						className="absolute top-3 right-3 inline-flex p-2 items-center justify-center hover:bg-neutral-900 hover:text-white duration-100 active:opacity-75 active:duration-75 rounded-full"
						aria-label="Close"
					>
						<Error />
					</button>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	);
}
