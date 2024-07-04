"use client";
import dynamic from "next/dynamic";
import * as Toast from "@radix-ui/react-toast";
import { useEffect, useState } from "react";
import X from "src/icons/X";
import Link from "next/link";
import { usePathname, useRouter } from "src/navigation";
import { useTranslations } from "next-intl";

function PotatoRedirect() {
	const t = useTranslations("REDIRECT");
	let redirectPotato = localStorage.getItem("redirectPotato");
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	useEffect(() => {
		if (pathname !== "/redirect") {
			if (!redirectPotato) {
				setTimeout(() => {
					setOpen(true);
				}, 5000);
			} else if (redirectPotato === "always") {
				router.push(`https://potato.pprmint.art${pathname}`);
			}
		}
	}, []);
	function handleOnce() {
		setOpen(false);
		localStorage.setItem("redirectPotato", "once");
		router.push(`https://potato.pprmint.art${pathname}`);
	}
	function handleAlways() {
		setOpen(false);
		localStorage.setItem("redirectPotato", "always");
		router.push(`https://potato.pprmint.art${pathname}`);
	}
	function handleClose() {
		setOpen(false);
		localStorage.setItem("redirectPotato", "never");
	}
	return (
		<Toast.Provider swipeDirection="right" duration={-1}>
			<Toast.Root
				className="relative w-[calc(100vw_-_48px)] max-w-md gap-6 items-center p-3 md:p-4 rounded-xl shadow-lg shadow-neutral-950/50 backdrop-blur-xl bg-gradient-to-b from-neutral-800/75 to-neutral-900/90 border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 data-[state=open]:animate-toast-slide-in data-[state=closed]:animate-fade-out-scale-down data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-toast-slide-out"
				open={open}
				onSwipeEnd={handleClose}
			>
				<Toast.Title className="text-xl font-display text-neutral-50 mb-2">{t("Toast.title")}</Toast.Title>
				<Toast.Description>
					<p className="text-sm">{t("Toast.description1")}</p>
					<p className="text-xs">
						{t.rich("Toast.description2", {
							Link: (chunks) => (
								<Link className="text-md text-neutral-50" href="/redirect">
									{chunks}
								</Link>
							),
						})}
					</p>
				</Toast.Description>
				<div className="mt-3 flex gap-3">
					<Toast.Action asChild altText="Redirect to low-end site once">
						<button
							onClick={handleOnce}
							className="text-sm px-3 py-1 rounded-md text-neutral-950 bg-gradient-to-b from-neutral-100 to-neutral-200 hover:brightness-110 active:brightness-90 duration-200 active:duration-75 ease-out"
						>
							{t("Toast.once")}
						</button>
					</Toast.Action>
					<Toast.Action asChild altText="Always redirect to low-end site">
						<button
							onClick={handleAlways}
							className="text-sm px-3 py-1 rounded-md border border-neutral-50/10 hover:bg-neutral-50/10 active:bg-neutral-500/10 duration-200 active:duration-75 ease-out"
						>
							{t("Toast.always")}
						</button>
					</Toast.Action>
				</div>
				<Toast.Close
					onClick={handleClose}
					className="absolute top-3 right-3 inline-flex items-center justify-center size-6 hover:bg-neutral-50/10 active:bg-neutral-50/5 rounded-full duration-100 active:duration-75"
				>
					<X className="fill-neutral-50" />
				</Toast.Close>
			</Toast.Root>
			<Toast.Viewport className="[--viewport-padding:_24px] fixed bottom-0 right-0 p-[var(--viewport-padding)] flex flex-col w-max z-[9999] outline-none" />
		</Toast.Provider>
	);
}

export default dynamic(() => Promise.resolve(PotatoRedirect), {
	ssr: false,
});
