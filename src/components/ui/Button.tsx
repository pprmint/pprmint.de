import { ButtonHTMLAttributes } from "react";
import React from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: "regular" | "large" | "full";
	color?:
		| "red"
		| "orange"
		| "yellow"
		| "lime"
		| "green"
		| "cyan"
		| "blue"
		| "violet"
		| "pink"
		| "neutral"
	design?: "filled" | "semi-transparent" | "transparent" | "outlined";
	noInitialPadding?: boolean;
	align?: "left" | "center" | "right";
}

export default function Button({
	size = "regular",
	color = "neutral",
	design = "transparent",
	noInitialPadding,
	align = "left",
	children,
	...rest
}: React.PropsWithChildren<ButtonProps>) {
	const buttonSize =
		size === "full" ? "size-full text-lg hover:font-bold" : size === "large" ? "h-11 w-max text-lg" : "h-9 w-max";
	const padding =
		size === "large" ? (noInitialPadding ? "hover:px-5" : "px-5") : noInitialPadding ? "hover:px-4" : "px-4";
	const styles =
		rest.disabled ? 
			design === "filled" ? "bg-black/5 text-black/25 dark:bg-white/5 dark:text-white/25" :
			design === "semi-transparent" ? "bg-black/[0.025] text-black/25 dark:bg-white/[0.025] dark:text-white/25" :
			design === "outlined" ? "ring-1 ring-inset ring-black/5 dark:ring-white/5 text-black/25 dark:text-white/25" :
			design === "transparent" && "text-black/25 dark:text-white/25" :

		design === "filled" ? 
			color === "red" ? "bg-red text-red-950 hover:bg-red-400 active:bg-red-600 active:shadow-inner" :
			color === "orange" ? "bg-orange text-orange-950 hover:bg-orange-400 active:bg-orange-600 active:shadow-inner" :
			color === "yellow" ? "bg-yellow text-yellow-950 hover:bg-yellow-400 active:bg-yellow-600 active:shadow-inner" :
			color === "lime" ? "bg-lime text-lime-950 hover:bg-lime-400 active:bg-lime-600 active:shadow-inner" :
			color === "green" ? "bg-green text-green-950 hover:bg-green-400 active:bg-green-600 active:shadow-inner" :
			color === "cyan" ? "bg-cyan text-cyan-950 hover:bg-cyan-400 active:bg-cyan-600 active:shadow-inner" :
			color === "blue" ? "bg-blue text-blue-950 hover:bg-blue-400 active:bg-blue-600 active:shadow-inner" :
			color === "violet" ? "bg-violet text-violet-950 hover:bg-violet-400 active:bg-violet-600 active:shadow-inner" :
			color === "pink" ? "bg-pink text-pink-950 hover:bg-pink-400 active:bg-pink-600 active:shadow-inner" :
			color === "neutral" && "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-50 active:bg-neutral-800 dark:active:bg-neutral-100 active:shadow-inner" :

		design === "semi-transparent" ? 
			color === "red" ? "bg-red/10 text-red hover:bg-red hover:text-red-950 active:bg-red-600 active:shadow-inner" :
			color === "orange" ? "bg-orange/10 text-orange hover:bg-orange hover:text-orange-950 active:bg-orange-600 active:shadow-inner" :
			color === "yellow" ? "bg-yellow/10 text-yellow-600 dark:text-yellow hover:bg-yellow hover:text-yellow-950 active:bg-yellow-600 active:shadow-inner" :
			color === "lime" ? "bg-lime/10 text-lime hover:bg-lime hover:text-lime-950 active:bg-lime-600 active:shadow-inner" :
			color === "green" ? "bg-green/10 text-green hover:bg-green hover:text-green-950 active:bg-green-600 active:shadow-inner" :
			color === "cyan" ? "bg-cyan/10 text-cyan hover:bg-cyan hover:text-cyan-950 active:bg-cyan-600 active:shadow-inner" :
			color === "blue" ? "bg-blue/10 text-blue hover:bg-blue hover:text-blue-950 active:bg-blue-600 active:shadow-inner" :
			color === "violet" ? "bg-violet/10 text-violet hover:bg-violet hover:text-violet-950 active:bg-violet-600 active:shadow-inner" :
			color === "pink" ? "bg-pink/10 text-pink hover:bg-pink hover:text-pink-950 active:bg-pink-600 active:shadow-inner" :
			color === "neutral" && "text-neutral-950 dark:text-white hover:text-white dark:hover:text-neutral-950 bg-black/5 dark:bg-white/5 hover:bg-neutral-950 dark:hover:bg-white active:bg-neutral-800 dark:active:bg-neutral-100 active:shadow-inner" :

		design === "outlined" ?
			color === "red" ? "ring-1 ring-inset ring-red/10 hover:ring-red text-red hover:bg-red/20 active:bg-red/10 active:ring-4 active:ring-transparent" :
			color === "orange" ? "ring-1 ring-inset ring-orange/10 hover:ring-orange text-orange hover:bg-orange/20 active:bg-orange/10 active:ring-4 active:ring-transparent" :
			color === "yellow" ? "ring-1 ring-inset ring-yellow/10 hover:ring-yellow text-yellow-600 dark:text-yellow hover:bg-yellow/20 active:bg-yellow/10 active:ring-4 active:ring-transparent" :
			color === "lime" ? "ring-1 ring-inset ring-lime/10 hover:ring-lime text-lime hover:bg-lime/20 active:bg-lime/10 active:ring-4 active:ring-transparent" :
			color === "green" ? "ring-1 ring-inset ring-green/10 hover:ring-green text-green hover:bg-green/20 active:bg-green/10 active:ring-4 active:ring-transparent" :
			color === "cyan" ? "ring-1 ring-inset ring-cyan/10 hover:ring-cyan text-cyan hover:bg-cyan/20 active:bg-cyan/10 active:ring-4 active:ring-transparent" :
			color === "blue" ? "ring-1 ring-inset ring-blue/10 hover:ring-blue text-blue hover:bg-blue/20 active:bg-blue/10 active:ring-4 active:ring-transparent" :
			color === "violet" ? "ring-1 ring-inset ring-violet/10 hover:ring-violet text-violet hover:bg-violet/20 active:bg-violet/10 active:ring-4 active:ring-transparent" :
			color === "pink" ? "ring-1 ring-inset ring-pink/10 hover:ring-pink text-pink hover:bg-pink/20 active:bg-pink/10 active:ring-4 active:ring-transparent" :
			color === "neutral" && "ring-1 ring-inset ring-black/5 dark:ring-white/5 hover:ring-neutral-950 dark:hover:ring-white text-neutral-950 dark:text-white hover:bg-black/10 dark:hover:bg-white/10 active:bg-black/5 dark:active:bg-white/5 active:ring-4 active:ring-transparent dark:active:ring-transparent" :

		design === "transparent" &&
			color === "red" ? "text-red hover:bg-red hover:text-red-950 active:bg-red-600 active:shadow-inner" :
			color === "orange" ? "text-orange hover:bg-orange hover:text-orange-950 active:bg-orange-600 active:shadow-inner" :
			color === "yellow" ? "text-yellow-600 dark:text-yellow hover:bg-yellow hover:text-yellow-950 active:bg-yellow-600 active:shadow-inner" :
			color === "lime" ? "text-lime hover:bg-lime hover:text-lime-950 active:bg-lime-600 active:shadow-inner" :
			color === "green" ? "text-green hover:bg-green hover:text-green-950 active:bg-green-600 active:shadow-inner" :
			color === "cyan" ? "text-cyan hover:bg-cyan hover:text-cyan-950 active:bg-cyan-600 active:shadow-inner" :
			color === "blue" ? "text-blue hover:bg-blue hover:text-blue-950 active:bg-blue-600 active:shadow-inner" :
			color === "violet" ? "text-violet hover:bg-violet hover:text-violet-950 active:bg-violet-600 active:shadow-inner" :
			color === "pink" ? "text-pink hover:bg-pink hover:text-pink-950 active:bg-pink-600 active:shadow-inner" :
			color === "neutral" && "text-neutral-950 dark:text-white hover:text-white dark:hover:text-neutral-950 hover:bg-neutral-950 dark:hover:bg-white active:bg-neutral-800 dark:active:bg-neutral-100 active:shadow-inner"

	return (
		<button
			className={`group relative flex gap-3 items-center ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : ""} font-medium duration-200 ease-out ${padding} ${!rest.disabled && "hover:cursor-pointer"} ${!rest.disabled && "hover:shadow-sm"} ${
				rest.disabled && "pointer-events-none"
			} select-none active:duration-50 ${buttonSize} ${styles} overflow-hidden`}
			{...rest}
		>
			{children}
		</button>
	);
}
