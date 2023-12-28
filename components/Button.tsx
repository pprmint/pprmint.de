import Link from "next/link";
import React from "react";

export default function Button(
	props: React.PropsWithChildren<{
		large?: boolean;
		color?: string;
		outlined?: boolean;
		noMinWidth?: boolean;
		onClick?: React.MouseEventHandler;
		disabled?: boolean;
        type?: "reset" | "button" | "submit";
	}>
) {
	const size = props.large ? "h-11 px-5 text-lg" : "h-9 px-4";
	const width = props.noMinWidth ? "justify-center" : "w-fit";
	const color = props.disabled
		? props.outlined
			? "text-neutral-600 ring-2 ring-inset ring-neutral-900 bg-neutral/10"
			: "text-neutral-800 bg-gradient-to-b from-neutral-500 to-neutral-600 border-t border-t-neutral-400 border-b-2 border-b-neutral-800 saturate-0"
		: props.color === "red"
		? props.outlined
			? "text-red ring-2 active:ring-4 ring-inset ring-red-800 hover:ring-red active:ring-transparent bg-red/10 hover:bg-red-900/50 active:bg-red-900/30"
			: "text-red-950 bg-gradient-to-b from-red to-red-600 border-b-2 active:border-b-0 border-b-red-800 border-t active:border-t-2 border-t-red-400 active:border-t-red-800 hover:brightness-110 active:brightness-90"
		: props.color === "orange"
		? props.outlined
			? "text-orange ring-2 active:ring-4 ring-inset ring-orange-800 hover:ring-orange active:ring-transparent bg-orange/10 hover:bg-orange-900/50 active:bg-orange-900/30"
			: "text-orange-950 bg-gradient-to-b from-orange to-orange-600 border-b-2 active:border-b-0 border-b-orange-800 border-t active:border-t-2 border-t-orange-400 active:border-t-orange-800 hover:brightness-110 active:brightness-90"
		: props.color === "yellow"
		? props.outlined
			? "text-yellow ring-2 active:ring-4 ring-inset ring-yellow-800 hover:ring-yellow active:ring-transparent bg-yellow/10 hover:bg-yellow-900/50 active:bg-yellow-900/30"
			: "text-yellow-950 bg-gradient-to-b from-yellow to-yellow-600 border-b-2 active:border-b-0 border-b-yellow-800 border-t active:border-t-2 border-t-yellow-400 active:border-t-yellow-800 hover:brightness-110 active:brightness-90"
		: props.color === "lime"
		? props.outlined
			? "text-lime ring-2 active:ring-4 ring-inset ring-lime-800 hover:ring-lime active:ring-transparent bg-lime/10 hover:bg-lime-900/50 active:bg-lime-900/30"
			: "text-lime-950 bg-gradient-to-b from-lime to-lime-600 border-b-2 active:border-b-0 border-b-lime-800 border-t active:border-t-2 border-t-lime-400 active:border-t-lime-800 hover:brightness-110 active:brightness-90"
		: props.color === "green"
		? props.outlined
			? "text-green ring-2 active:ring-4 ring-inset ring-green-800 hover:ring-green active:ring-transparent bg-green/10 hover:bg-green-900/50 active:bg-green-900/30"
			: "text-green-950 bg-gradient-to-b from-green to-green-600 border-b-2 active:border-b-0 border-b-green-800 border-t active:border-t-2 border-t-green-400 active:border-t-green-800 hover:brightness-110 active:brightness-90"
		: props.color === "cyan"
		? props.outlined
			? "text-cyan ring-2 active:ring-4 ring-inset ring-cyan-800 hover:ring-cyan active:ring-transparent bg-cyan/10 hover:bg-cyan-900/50 active:bg-cyan-900/30"
			: "text-cyan-950 bg-gradient-to-b from-cyan to-cyan-600 border-b-2 active:border-b-0 border-b-cyan-800 border-t active:border-t-2 border-t-cyan-400 active:border-t-green-800 hover:brightness-110 active:brightness-90"
		: props.color === "blue"
		? props.outlined
			? "text-blue ring-2 active:ring-4 ring-inset ring-blue-800 hover:ring-blue active:ring-transparent bg-blue/10 hover:bg-blue-900/50 active:bg-blue-900/30"
			: "text-blue-950 bg-gradient-to-b from-blue to-blue-600 border-b-2 active:border-b-0 border-b-blue-800 border-t active:border-t-2 border-t-blue-400 active:border-t-blue-800 hover:brightness-110 active:brightness-90"
		: props.color === "violet"
		? props.outlined
			? "text-violet ring-2 active:ring-4 ring-inset ring-violet-800 hover:ring-violet active:ring-transparent bg-violet/10 hover:bg-violet-900/50 active:bg-violet-900/30"
			: "text-violet-950 bg-gradient-to-b from-violet to-violet-600 border-b-2 active:border-b-0 border-b-violet-800 border-t active:border-t-2 border-t-violet-400 active:border-t-violet-800 hover:brightness-110 active:brightness-90"
		: props.color === "pink"
		? props.outlined
			? "text-pink ring-2 active:ring-4 ring-inset ring-pink-800 hover:ring-pink active:ring-transparent bg-pink/10 hover:bg-pink-900/50 active:bg-pink-900/30"
			: "text-pink-950 bg-gradient-to-b from-pink to-pink-600 border-b-2 active:border-b-0 border-b-pink-800 border-t active:border-t-2 border-t-pink-400 active:border-t-pink-800 hover:brightness-110 active:brightness-90"
		: props.outlined
		? "text-neutral-50 ring-2 active:ring-4 ring-inset ring-neutral-700 hover:ring-neutral-50 active:ring-transparent bg-neutral-400/10 hover:bg-neutral-800/50 active:bg-neutral-800/30"
		: "text-neutral-950 bg-gradient-to-b from-neutral-100 to-neutral-200 border-b-2 active:border-b-0 border-b-neutral-500 border-t active:border-t-2 border-t-neutral-50 active:border-t-neutral-500 hover:brightness-110 active:brightness-90";
	return (
		<div
			className={`group flex items-center font-medium duration-200 ease-out rounded-md rounded-tl-xl rounded-br-xl ${
				props.disabled ? "cursor-not-allowed" : "cursor-pointer hover:rounded-md"
			} select-none active:duration-50 ${size} ${width} ${color}`}
			onClick={props.onClick}
		>
			<span className="flex gap-3 whitespace-nowrap items-center justify-between">{props.children}</span>
		</div>
	);
}
