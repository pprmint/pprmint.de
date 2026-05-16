"use client";
import { useTranslations } from "next-intl";
import * as Dialog from "@radix-ui/react-dialog";

import Button from "@/components/ui/Button";

import FadingImage from "@/components/ui/FadingImage";
import Error from "@/icons/Error";

export default function NsfwDialog({ onAccept }: { onAccept: () => void }) {
	const t = useTranslations("MINA");
	return (
		<Dialog.Portal>
			<Dialog.Overlay className="bg-white/90 dark:bg-neutral-950/90 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-100" />
			<Dialog.Content className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-svh md:h-max w-[93vw] max-w-5xl bg-white dark:bg-neutral-950 outline-solid outline-1 outline-black/5 dark:outline-white/5 data-[state=open]:animate-dialog-enter data-[state=closed]:animate-dialog-exit origin-center shadow-2xl">
				<Dialog.Title asChild>
					<h2 className="px-6 md:px-9 mt-6 md:mt-9 md:text-center lg:text-balance">
						{t("Content.NSFW.title")}
					</h2>
				</Dialog.Title>
				<Dialog.Description asChild>
					<div className="px-6 md:px-9 md:text-center">
						<p>{t("Content.NSFW.text1")}</p>
						<p>{t("Content.NSFW.text2")}</p>
						<p className="font-bold text-red-600 dark:text-red">{t("Content.NSFW.text3")}</p>
					</div>
				</Dialog.Description>
				<div className="grid grid-cols-2 mt-6 md:mt-9 border-t border-black/5 dark:border-white/5 h-12 divide-x divide-black/5 dark:divide-white/5">
					<Button align="center" size="full" color="red" onClick={onAccept}>
						{t("Content.NSFW.accept")}
					</Button>
					<Dialog.Close asChild>
						<Button align="center" size="full">
							{t("Content.NSFW.cancel")}
						</Button>
					</Dialog.Close>
				</div>
			</Dialog.Content>
		</Dialog.Portal>
	);
}
