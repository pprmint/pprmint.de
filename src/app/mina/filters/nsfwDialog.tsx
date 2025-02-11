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
	return (
		<Dialog.Portal>
			<Dialog.Overlay className="bg-white/90 dark:bg-neutral-950/90 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-100" />
			<Dialog.Content className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-svh md:h-max w-screen max-w-5xl bg-white dark:bg-neutral-950 md:outline outline-1 outline-black/5 dark:outline-white/5 data-[state=open]:animate-dialog-enter data-[state=closed]:animate-dialog-exit origin-center shadow-2xl">
				<div className="flex flex-col items-center md:flex-row gap-6 md:gap-9 p-6 md:p-9">
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
								<p className="font-bold text-red-600 dark:text-red">{t("Content.NSFW.Dialog.text3")}</p>
							</div>
						</Dialog.Description>
					</div>
				</div>
				<div className="grid grid-cols-2 border-t border-black/5 dark:border-white/5 h-12 divide-x divide-black/5 dark:divide-white/5">
					<Button align="center" size="full" color="red" onClick={onAccept}>
						{t("Content.NSFW.Dialog.admitSins")}
					</Button>
					<Dialog.Close asChild>
						<Button align="center" size="full">{t("Content.NSFW.Dialog.nevermind")}</Button>
					</Dialog.Close>
				</div>
				<Dialog.Close asChild>
					<button
						className="absolute top-0 right-0 inline-flex p-3 items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10 hover:text-neutral-950 dark:hover:text-white duration-100 active:duration-75"
						aria-label="Close"
					>
						<Error />
					</button>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	);
}
