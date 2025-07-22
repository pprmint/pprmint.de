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
				<div className="bg-white sm:flex items-center md:flex-row border-b dark:border-0 border-black/5">
					<div className="p-6 md:p-9">
						<Dialog.Title asChild>
							<h2 className="lg:text-balance dark:text-neutral-950">
								{t("Content.NSFW.title")}
								<span className="text-red">.</span>
							</h2>
						</Dialog.Title>
						<p className="md:text-lg dark:text-neutral-950/75">
							{t.rich("Content.NSFW.subtitle", {
								i: (chunks) => <span className="italic">{chunks}</span>,
							})}
						</p>
					</div>
					<FadingImage
						hideSpinner
						src="/api/assets/file/kozu_mina_handholding.webp"
						alt=""
						width={1029}
						height={718}
						quality={100}
						className="h-32 md:h-64 w-auto ml-auto"
					/>
				</div>
				<Dialog.Description asChild>
					<div className="p-6 md:p-9 md:text-center">
						<p>{t("Content.NSFW.text1")}</p>
						<p>{t("Content.NSFW.text2")}</p>
						<p className="font-bold text-red-600 dark:text-red">{t("Content.NSFW.text3")}</p>
					</div>
				</Dialog.Description>
				<div className="grid grid-cols-2 border-t border-black/5 dark:border-white/5 h-12 divide-x divide-black/5 dark:divide-white/5">
					<Button align="center" size="full" color="red" onClick={onAccept}>
						{t("Content.NSFW.admitSins")}
					</Button>
					<Dialog.Close asChild>
						<Button align="center" size="full">
							{t("Content.NSFW.nevermind")}
						</Button>
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
