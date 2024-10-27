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
			? "text-neutral-500 bg-neutral/10"
			: "text-neutral-500 bg-neutral-700 border-t border-t-neutral-700 border-b border-b-neutral-700 active:border-b-neutral-600"
		: color === "red"
		? outlined
			? "text-red-600 dark:text-red active:text-red-700 ring-1 active:ring-[3px] ring-inset ring-red-200 dark:ring-red-800 hover:ring-red dark:hover:ring-red active:ring-red/0 dark:active:ring-red/0 bg-red/10 hover:bg-red/20 active:bg-red/30"
			: "text-red-950 bg-gradient-to-t dark:bg-gradient-to-b from-red to-red-400 dark:to-red-600 border-b border-b-red-700 active:border-b-red-600 border-t border-t-red-400 active:border-t-red-700 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: color === "orange"
		? outlined
			? "text-orange-600 dark:text-orange active:text-orange-700 ring-1 active:ring-[3px] ring-inset ring-orange-200 dark:ring-orange-800 hover:ring-orange dark:hover:ring-orange active:ring-orange/0 dark:active:ring-orange/0 bg-orange/10 hover:bg-orange/20 active:bg-orange/30"
			: "text-orange-950 bg-gradient-to-t dark:bg-gradient-to-b from-orange to-orange-400 dark:to-orange-600 border-b border-b-orange-700 active:border-b-orange-600 border-t border-t-orange-400 active:border-t-orange-700 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: color === "yellow"
		? outlined
			? "text-yellow-600 dark:text-yellow active:text-yellow-700 ring-1 active:ring-[3px] ring-inset ring-yellow-200 dark:ring-yellow-800 hover:ring-yellow dark:hover:ring-yellow active:ring-yellow/0 dark:active:ring-yellow/0 bg-yellow/10 hover:bg-yellow/20 active:bg-yellow/30"
			: "text-yellow-950 bg-gradient-to-t dark:bg-gradient-to-b from-yellow to-yellow-400 dark:to-yellow-600 border-b border-b-yellow-700 active:border-b-yellow-600 border-t border-t-yellow-400 active:border-t-yellow-700 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: color === "lime"
		? outlined
			? "text-lime-600 dark:text-lime active:text-lime-700 ring-1 active:ring-[3px] ring-inset ring-lime-200 dark:ring-lime-800 hover:ring-lime dark:hover:ring-lime active:ring-lime/0 dark:active:ring-lime/0 bg-lime/10 hover:bg-lime/20 active:bg-lime/30"
			: "text-lime-950 bg-gradient-to-t dark:bg-gradient-to-b from-lime to-lime-400 dark:to-lime-600 border-b border-b-lime-700 active:border-b-lime-600 border-t border-t-lime-400 active:border-t-lime-700 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: color === "green"
		? outlined
			? "text-green-600 dark:text-green active:text-green-700 ring-1 active:ring-[3px] ring-inset ring-green-200 dark:ring-green-800 hover:ring-green dark:hover:ring-green active:ring-green/0 dark:active:ring-green/0 bg-green/10 hover:bg-green/20 active:bg-green/30"
			: "text-green-950 bg-gradient-to-t dark:bg-gradient-to-b from-green to-green-400 dark:to-green-600 border-b border-b-green-700 active:border-b-green-600 border-t border-t-green-400 active:border-t-green-700 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: color === "cyan"
		? outlined
			? "text-cyan-600 dark:text-cyan active:text-cyan-700 ring-1 active:ring-[3px] ring-inset ring-cyan-200 dark:ring-cyan-800 hover:ring-cyan dark:hover:ring-cyan active:ring-cyan/0 dark:active:ring-cyan/0 bg-cyan/10 hover:bg-cyan/20 active:bg-cyan/30"
			: "text-cyan-950 bg-gradient-to-t dark:bg-gradient-to-b from-cyan to-cyan-400 dark:to-cyan-600 border-b border-b-cyan-700 active:border-b-cyan-600 border-t border-t-cyan-400 active:border-t-cyan-700 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: color === "blue"
		? outlined
			? "text-blue-600 dark:text-blue active:text-blue-700 ring-1 active:ring-[3px] ring-inset ring-blue-200 dark:ring-blue-800 hover:ring-blue dark:hover:ring-blue active:ring-blue/0 dark:active:ring-blue/0 bg-blue/10 hover:bg-blue/20 active:bg-blue/30"
			: "text-blue-950 bg-gradient-to-t dark:bg-gradient-to-b from-blue to-blue-400 dark:to-blue-600 border-b border-b-blue-700 active:border-b-blue-600 border-t border-t-blue-400 active:border-t-blue-700 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: color === "violet"
		? outlined
			? "text-violet-600 dark:text-violet active:text-violet-700 ring-1 active:ring-[3px] ring-inset ring-violet-200 dark:ring-violet-800 hover:ring-violet dark:hover:ring-violet active:ring-violet/0 dark:active:ring-violet/0 bg-violet/10 hover:bg-violet/20 active:bg-violet/30"
			: "text-violet-950 bg-gradient-to-t dark:bg-gradient-to-b from-violet to-violet-400 dark:to-violet-600 border-b border-b-violet-700 active:border-b-violet-600 border-t border-t-violet-400 active:border-t-violet-700 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: color === "pink"
		? outlined
			? "text-pink-600 dark:text-pink active:text-pink-700 ring-1 active:ring-[3px] ring-inset ring-pink-200 dark:ring-pink-800 hover:ring-pink dark:hover:ring-pink active:ring-pink/0 dark:active:ring-pink/0 bg-pink/10 hover:bg-pink/20 active:bg-pink/30"
			: "text-pink-950 bg-gradient-to-t dark:bg-gradient-to-b from-pink to-pink-400 dark:to-pink-600 border-b border-b-pink-700 active:border-b-pink-600 border-t border-t-pink-400 active:border-t-pink-700 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: outlined
		? "text-neutral-50 active:text-neutral-400 ring-1 active:ring-[3px] ring-inset ring-neutral-700 hover:ring-neutral-50 active:ring-transparent bg-neutral/10 hover:bg-neutral/15 active:bg-neutral/30"
		: "text-white dark:text-neutral-950 bg-gradient-to-t dark:bg-gradient-to-b from-neutral-100 to-neutral-200 border-b border-b-neutral-50 active:border-b-neutral-100 dark:border-b-neutral-400 dark:active:border-b-neutral-300 border-t border-t-neutral-400 dark:border-t-neutral-50 active:border-t-neutral-50 dark:active:border-t-neutral-300 hover:brightness-110 active:brightness-90 active:shadow-inner";
	return (
		<button
			className={`group flex items-center rounded-xl rounded-bl-md rounded-tr-md hover:rounded-md duration-200 ease-out ${!outlined && !rest.disabled && "shadow-sm shadow-black/30"} ${
				rest.disabled && "pointer-events-none"
			} select-none active:duration-75 ${size} ${width} ${colors}`}
			{...rest}
		>
			<div className={`flex gap-3 whitespace-nowrap items-center justify-between`}>{children}</div>
		</button>
	);
}
