"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSpring, useTransition, easings, a } from "@react-spring/web";
import * as Dialog from "@radix-ui/react-dialog";

import Button from "src/components/ui/Button";

import HehMina from "public/assets/mina/heh-upscaled.png";
import { Link } from "src/navigation";

export default function NsfwDialog({ open }: { open: boolean }) {
	const t = useTranslations("MINA");
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);

	const [dialogOpen, setDialogOpen] = useState(open);

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
											params.set("nsfw", "show");
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
									{t.rich("MINA:Content.NSFW.Dialog.credit", {
										Link: (chunks) => (
											<Link href="https://twitter.com/wxsonz" target="_blank" className="text-link-external">
												{chunks}
											</Link>
										),
									})}
								</p>
							</a.div>
						</Dialog.Content>
					</>
				) : null
			)}
		</Dialog.Root>
	);
}
