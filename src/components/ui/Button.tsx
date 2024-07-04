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
			? "text-neutral active:text-neutral-700-600 ring-1 ring-inset ring-neutral-900 bg-neutral/10"
			: "text-neutral-800 bg-gradient-to-b from-neutral-500 to-neutral-600 border-t border-t-neutral-400 border-b border-b-neutral-800 saturate-0"
		: color === "red"
		? outlined
			? "text-red active:text-red-700 ring-1 active:ring-2 ring-inset ring-red-800 hover:ring-red active:ring-transparent bg-gradient-to-b from-red/5 to-red/10 hover:bg-red-900/50 active:bg-red-900/30"
			: "text-red-950 bg-gradient-to-b from-red to-red-600 border-b active:border-b-0 border-b-red-700 border-t active:border-t-0 border-t-red-400 active:border-t-red-800 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: color === "orange"
		? outlined
			? "text-orange active:text-orange-700 ring-1 active:ring-2 ring-inset ring-orange-800 hover:ring-orange active:ring-transparent bg-gradient-to-b from-orange/5 to-orange/10 hover:bg-orange-900/50 active:bg-orange-900/30"
			: "text-orange-950 bg-gradient-to-b from-orange to-orange-600 border-b active:border-b-0 border-b-orange-700 border-t active:border-t-0 border-t-orange-400 active:border-t-orange-800 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: color === "yellow"
		? outlined
			? "text-yellow active:text-yellow-700 ring-1 active:ring-2 ring-inset ring-yellow-800 hover:ring-yellow active:ring-transparent bg-gradient-to-b from-yellow/5 to-yellow/10 hover:bg-yellow-900/50 active:bg-yellow-900/30"
			: "text-yellow-950 bg-gradient-to-b from-yellow to-yellow-600 border-b active:border-b-0 border-b-yellow-700 border-t active:border-t-0 border-t-yellow-400 active:border-t-yellow-800 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: color === "lime"
		? outlined
			? "text-lime active:text-lime-700 ring-1 active:ring-2 ring-inset ring-lime-800 hover:ring-lime active:ring-transparent bg-gradient-to-b from-lime/5 to-lime/10 hover:bg-lime-900/50 active:bg-lime-900/30"
			: "text-lime-950 bg-gradient-to-b from-lime to-lime-600 border-b active:border-b-0 border-b-lime-700 border-t active:border-t-0 border-t-lime-400 active:border-t-lime-800 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: color === "green"
		? outlined
			? "text-green active:text-green-700 ring-1 active:ring-2 ring-inset ring-green-800 hover:ring-green active:ring-transparent bg-gradient-to-b from-green/5 to-green/10 hover:bg-green-900/50 active:bg-green-900/30"
			: "text-green-950 bg-gradient-to-b from-green to-green-600 border-b active:border-b-0 border-b-green-700 border-t active:border-t-0 border-t-green-400 active:border-t-green-800 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: color === "cyan"
		? outlined
			? "text-cyan active:text-cyan-700 ring-1 active:ring-2 ring-inset ring-cyan-800 hover:ring-cyan active:ring-transparent bg-gradient-to-b from-cyan/5 to-cyan/10 hover:bg-cyan-900/50 active:bg-cyan-900/30"
			: "text-cyan-950 bg-gradient-to-b from-cyan to-cyan-600 border-b active:border-b-0 border-b-cyan-700 border-t active:border-t-0 border-t-cyan-400 active:border-t-green-800 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: color === "blue"
		? outlined
			? "text-blue active:text-blue-700 ring-1 active:ring-2 ring-inset ring-blue-800 hover:ring-blue active:ring-transparent bg-gradient-to-b from-blue/5 to-blue/10 hover:bg-blue-900/50 active:bg-blue-900/30"
			: "text-blue-950 bg-gradient-to-b from-blue to-blue-600 border-b active:border-b-0 border-b-blue-700 border-t active:border-t-0 border-t-blue-400 active:border-t-blue-800 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: color === "violet"
		? outlined
			? "text-violet active:text-violet-700 ring-1 active:ring-2 ring-inset ring-violet-800 hover:ring-violet active:ring-transparent bg-gradient-to-b from-violet/5 to-violet/10 hover:bg-violet-900/50 active:bg-violet-900/30"
			: "text-violet-950 bg-gradient-to-b from-violet to-violet-600 border-b active:border-b-0 border-b-violet-700 border-t active:border-t-0 border-t-violet-400 active:border-t-violet-800 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: color === "pink"
		? outlined
			? "text-pink active:text-pink-700 ring-1 active:ring-2 ring-inset ring-pink-800 hover:ring-pink active:ring-transparent bg-gradient-to-b from-pink/5 to-pink/10 hover:bg-pink-900/50 active:bg-pink-900/30"
			: "text-pink-950 bg-gradient-to-b from-pink to-pink-600 border-b active:border-b-0 border-b-pink-700 border-t active:border-t-0 border-t-pink-400 active:border-t-pink-800 hover:brightness-110 active:brightness-90 active:shadow-inner"
		: outlined
		? "text-neutral-50 active:text-neutral-400 ring-1 active:ring-2 ring-inset ring-neutral-700 hover:ring-neutral-50 active:ring-transparent bg-gradient-to-b from-neutral-400/5 to-neutral-400/10 hover:bg-neutral-800/50 active:bg-neutral-800/30"
		: "text-neutral-950 bg-gradient-to-b from-neutral-100 to-neutral-200 border-b active:border-b-0 border-b-neutral-400 border-t active:border-t-0 border-t-neutral-50 active:border-t-neutral-500 hover:brightness-110 active:brightness-90 active:shadow-inner";
	return (
		<button
			className={`group flex items-center rounded-xl rounded-bl-md rounded-tr-md hover:rounded-md duration-200 ease-out ${
				rest.disabled && "pointer-events-none"
			} select-none active:duration-75 ${size} ${width} ${colors}`}
			{...rest}
		>
			<span className="flex gap-3 whitespace-nowrap items-center justify-between">{children}</span>
		</button>
	);
}
