"use client";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useState } from "react";

function RedirectToggle() {
	const t = useTranslations("REDIRECT");
	let redirectPotato = localStorage.getItem("redirectPotato");
	const [redirect, setRedirect] = useState(redirectPotato === "always" || false);
	function handleDisable() {
		setRedirect(false);
		localStorage.setItem("redirectPotato", "never");
	}
	function handleAlways() {
		setRedirect(true);
		localStorage.setItem("redirectPotato", "always");
	}
	return (
		<div className="relative flex w-full sm:w-[420px] h-12 mx-auto border border-neutral-900 bg-gradient-to-t from-neutral-50/5 rounded-full">
			<div className={`absolute z-0 bg-gradient-to-b from-neutral-50 to-neutral-100 rounded-full w-[calc(50%_-_8px)] top-1 bottom-1 ${redirect ? "left-[calc(50%_+_4px)] right-1" : "left-1 right-1/2"} duration-250 ease-out-quint shadow-md shadow-neutral-950`} />
			<button onClick={handleDisable} className={`z-10 inline-flex items-center justify-center w-full sm:text-lg font-medium ${!redirect ? "text-neutral-950" : "text-neutral-50"} duration-250`}>
				{t("Toast.never")}
			</button>
			<button onClick={handleAlways} className={`z-10 inline-flex items-center justify-center w-full sm:text-lg font-medium ${redirect ? "text-neutral-950" : "text-neutral-50"} duration-250`}>
				{t("Toast.always")}
			</button>
		</div>
	);
}

export default dynamic(() => Promise.resolve(RedirectToggle), {
	ssr: false,
});
