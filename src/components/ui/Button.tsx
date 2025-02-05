import { ButtonHTMLAttributes } from "react";
import React from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	large?: boolean;
	color?: "red" | "orange" | "yellow" | "lime" | "green" | "cyan" | "blue" | "violet" | "pink";
	outlined?: boolean;
	noMinWidth?: boolean;
}

export default function Button({
	large,
	color,
	outlined,
	noMinWidth,
	children,
	...rest
}: React.PropsWithChildren<ButtonProps>) {
	const size = large ? "h-11 px-5 text-lg" : "h-9 px-4";
	const width = noMinWidth ? "justify-center" : "w-fit";
	const colors = rest.disabled
		? outlined
			? "text-neutral/50 bg-neutral-500/20"
			: "text-neutral/50 bg-neutral-500/20"
		: color === "red"
		? outlined
			? "text-red-600 dark:text-red active:text-red-700 ring-1 active:ring-[3px] ring-inset ring-red-200 dark:ring-red-800 hover:ring-red dark:hover:ring-red active:ring-red/0 dark:active:ring-red/0 bg-red/10 hover:bg-red/20 active:bg-red/30"
			: "text-red-950 bg-red hover:bg-red-400 active:bg-red-600 active:shadow-inner"
		: color === "orange"
		? outlined
			? "text-orange-600 dark:text-orange active:text-orange-700 ring-1 active:ring-[3px] ring-inset ring-orange-200 dark:ring-orange-800 hover:ring-orange dark:hover:ring-orange active:ring-orange/0 dark:active:ring-orange/0 bg-orange/10 hover:bg-orange/20 active:bg-orange/30"
			: "text-orange-950 bg-orange hover:bg-orange-400 active:bg-orange-600 active:shadow-inner"
		: color === "yellow"
		? outlined
			? "text-yellow-600 dark:text-yellow active:text-yellow-700 ring-1 active:ring-[3px] ring-inset ring-yellow-200 dark:ring-yellow-800 hover:ring-yellow dark:hover:ring-yellow active:ring-yellow/0 dark:active:ring-yellow/0 bg-yellow/10 hover:bg-yellow/20 active:bg-yellow/30"
			: "text-yellow-950 bg-yellow hover:bg-yellow-400 active:bg-yellow-600 active:shadow-inner"
		: color === "lime"
		? outlined
			? "text-lime-600 dark:text-lime active:text-lime-700 ring-1 active:ring-[3px] ring-inset ring-lime-200 dark:ring-lime-800 hover:ring-lime dark:hover:ring-lime active:ring-lime/0 dark:active:ring-lime/0 bg-lime/10 hover:bg-lime/20 active:bg-lime/30"
			: "text-lime-950 bg-lime hover:bg-lime-400 active:bg-lime-600 active:shadow-inner"
		: color === "green"
		? outlined
			? "text-green-600 dark:text-green active:text-green-700 ring-1 active:ring-[3px] ring-inset ring-green-200 dark:ring-green-800 hover:ring-green dark:hover:ring-green active:ring-green/0 dark:active:ring-green/0 bg-green/10 hover:bg-green/20 active:bg-green/30"
			: "text-green-950 bg-green hover:bg-green-400 active:bg-green-600 active:shadow-inner"
		: color === "cyan"
		? outlined
			? "text-cyan-600 dark:text-cyan active:text-cyan-700 ring-1 active:ring-[3px] ring-inset ring-cyan-200 dark:ring-cyan-800 hover:ring-cyan dark:hover:ring-cyan active:ring-cyan/0 dark:active:ring-cyan/0 bg-cyan/10 hover:bg-cyan/20 active:bg-cyan/30"
			: "text-cyan-950 bg-cyan hover:bg-cyan-400 active:bg-cyan-600 active:shadow-inner"
		: color === "blue"
		? outlined
			? "text-blue-600 dark:text-blue active:text-blue-700 ring-1 active:ring-[3px] ring-inset ring-blue-200 dark:ring-blue-800 hover:ring-blue dark:hover:ring-blue active:ring-blue/0 dark:active:ring-blue/0 bg-blue/10 hover:bg-blue/20 active:bg-blue/30"
			: "text-blue-950 bg-blue hover:bg-blue-400 active:bg-blue-600 active:shadow-inner"
		: color === "violet"
		? outlined
			? "text-violet-600 dark:text-violet active:text-violet-700 ring-1 active:ring-[3px] ring-inset ring-violet-200 dark:ring-violet-800 hover:ring-violet dark:hover:ring-violet active:ring-violet/0 dark:active:ring-violet/0 bg-violet/10 hover:bg-violet/20 active:bg-violet/30"
			: "text-violet-950 bg-violet hover:bg-violet-400 active:bg-violet-600 active:shadow-inner"
		: color === "pink"
		? outlined
			? "text-pink-600 dark:text-pink active:text-pink-700 ring-1 active:ring-[3px] ring-inset ring-pink-200 dark:ring-pink-800 hover:ring-pink dark:hover:ring-pink active:ring-pink/0 dark:active:ring-pink/0 bg-pink/10 hover:bg-pink/20 active:bg-pink/30"
			: "text-pink-950 bg-pink hover:bg-pink-400 active:bg-pink-600 active:shadow-inner"
		: outlined
		? "text-neutral-950 dark:text-white ring-1 active:ring-[3px] ring-inset ring-neutral-200 dark:ring-neutral-800 hover:ring-neutral-500 dark:hover:ring-neutral-50 dark:active:ring-transparent active:ring-transparent bg-neutral/10 hover:bg-neutral/15 active:bg-neutral/30"
		: "text-neutral-950 dark:text-white dark:text-neutral-950 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 active:bg-black/25 dark:active:bg-white/25 active:shadow-inner";
	return (
		<button
			className={`group flex items-center font-medium duration-200 ease-out ${!rest.disabled && "hover:cursor-pointer"} ${!outlined && !rest.disabled && "hover:shadow-sm"} ${
				rest.disabled && "pointer-events-none"
			} select-none active:duration-75 ${size} ${width} ${colors}`}
			{...rest}
		>
			<div className={`flex gap-3 whitespace-nowrap items-center justify-between`}>{children}</div>
		</button>
	);
}
