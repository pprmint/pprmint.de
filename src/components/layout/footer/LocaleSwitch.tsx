"use client";
import { useLocale, useTranslations } from "next-intl";
import { locales } from "@/i18n/config";
import { setUserLocale } from "@/i18n/locale";
import Tooltip from "@/components/ui/Tooltip";

export default function LocaleSwitch() {
	const currentLocale = useLocale();
	const otherLocale = locales?.find((cur) => cur !== currentLocale);

	return (
		<Tooltip text={currentLocale === "en" ? "Sprache wechseln" : "Switch language"}>
			<button
				onClick={() => setUserLocale(otherLocale!)}
				className="group relative flex border border-black/5 dark:border-white/5 active:duration-75 active:opacity-75 "
			>
				<div
					className={`absolute inset-y-0 bg-black/5 dark:bg-white/5 ${currentLocale === "en" ? "left-0 right-1/2" : "left-1/2 right-0"} duration-100 ease-out`}
				/>
				{locales.map((locale) => (
					<div
						key={locale}
						className={`relative inline-flex justify-center text-sm w-9 h-6.75 leading-6.75 ${
							currentLocale === locale
								? "text-neutral-950 dark:text-white group-hover:text-inherit"
								: "group-hover:text-neutral-950 dark:group-hover:text-white"
						} duration-100 uppercase`}
					>
						{locale}
					</div>
				))}
			</button>
		</Tooltip>
	);
}
