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
	}>
) {
	const size = props.large ? "h-11 px-5 text-lg" : "h-9 px-4";
	const width = props.noMinWidth ? "justify-center" : "w-fit";
	const color = props.disabled
		? props.outlined
			? "border border-neutral-700 text-neutral-200"
			: "bg-neutral-200 text-neutral-600 border-b-2 border-neutral-500"
		: props.color === "green"
		? props.outlined
			? "border border-green-900 hover:border-green-500 active:border-green-950 hover:bg-green-900 active:bg-green-950 text-green"
			: "bg-green hover:bg-green-600 active:bg-green-700 text-neutral-950 border-b-2 border-b-green-700 border-t border-t-green-400 hover:border-t-green-500 active:border-t-green-800"
		: props.color === "yellow"
		? props.outlined
			? "border border-yellow-900 hover:border-yellow-500 active:border-yellow-950 hover:bg-yellow-900 active:bg-yellow-950 text-yellow"
			: "bg-yellow hover:bg-yellow-600 active:bg-yellow-700 text-neutral-950 border-b-2 border-b-yellow-700 border-t border-t-yellow-400 hover:border-t-yellow-500 active:border-t-yellow-800"
		: props.color === "blue"
		? props.outlined
			? "border border-blue-900 hover:border-blue-500 active:border-blue-950 hover:bg-blue-900 active:bg-blue-950 text-blue"
			: "bg-blue hover:bg-blue-600 active:bg-blue-700 text-neutral-950 border-b-2 border-b-blue-700 border-t border-t-blue-400 hover:border-t-blue-500 active:border-t-blue-800"
		: props.color === "red"
		? props.outlined
			? "border border-red-900 hover:border-red-500 active:border-red-950 hover:bg-red-900 active:bg-red-950 text-red"
			: "bg-red hover:bg-red-600 active:bg-red-700 text-neutral-950 border-b-2 border-b-red-700 border-t border-t-red-400 hover:border-t-red-500 active:border-t-red-800"
		: props.color === "orange"
		? props.outlined
			? "border border-orange-900 hover:border-orange-500 active:border-orange-950 hover:bg-orange-900 active:bg-orange-950 text-orange"
			: "bg-orange hover:bg-orange-600 active:bg-orange-700 text-neutral-950 border-b-2 border-b-orange-700 border-t border-t-orange-400 hover:border-t-orange-500 active:border-t-orange-800"
		: props.outlined
		? "border border-neutral-600 hover:border-neutral-500 active:border-neutral-800 hover:bg-neutral-700 active:bg-neutral-800 text-neutral-50"
		: "bg-neutral-50 hover:bg-neutral-200 active:bg-neutral-400 text-neutral-950 border-b-2 border-neutral-400";
	return (
		<div
			className={`group flex items-center font-medium duration-200 ease-out rounded-md ${
				props.disabled ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"
			} select-none active:duration-75 ${size} ${width} ${color}`}
			onClick={props.onClick}
		>
			<span
				className={`flex gap-3 whitespace-nowrap items-center justify-between ${
					!(props.outlined || props.disabled) && "group-active:translate-y-px duration-75"
				}`}
			>
				{props.children}
			</span>
		</div>
	);
}
