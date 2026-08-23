"use client";
import { Fragment, useState } from "react";
import Moon from "@/icons/Moon";
import Computer from "@/icons/Computer";
import SmartphoneHomeButton from "@/icons/SmartphoneHomeButton";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Sun from "@/icons/Sun";
import Tooltip from "@/components/ui/Tooltip";
import { useTranslations } from "next-intl";

function ThemeSwitch() {
	const { theme, setTheme } = useTheme();
	const t = useTranslations("FOOTER.Theme");

	return (
		<div className="group relative flex w-max border border-black/5 dark:border-white/5">
			<div
				className={`absolute inset-y-0 bg-black/5 dark:bg-white/5 ${
					theme === "light" ? "left-2/3 right-0" : theme === "dark" ? "left-0 right-2/3" : "left-1/3 right-1/3"
				} duration-100 ease-out`}
			/>
			{[
				{ name: "dark", icon: <Moon /> },
				{
					name: "system",
					icon: (
						<Fragment>
							<Computer className="hidden sm:block" />
							<SmartphoneHomeButton className="sm:hidden" />
						</Fragment>
					),
				},
				{ name: "light", icon: <Sun /> },
			].map((item) => (
				<Tooltip key={item.name} text={t(item.name)}>
					<button
						onClick={() => setTheme(item.name)}
						className={`relative p-1.5 ${
							theme === item.name
								? "text-neutral-950 dark:text-white group-hover:text-inherit hover:text-neutral-950 dark:hover:text-white"
								: "hover:text-neutral-950 dark:hover:text-white"
						} duration-100 active:duration-75 active:opacity-75`}
					>
						{item.icon}
					</button>
				</Tooltip>
			))}
		</div>
	);
}

export default dynamic(() => Promise.resolve(ThemeSwitch), {
	ssr: false,
});
