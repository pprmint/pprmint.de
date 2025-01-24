"use client";
import * as RCheckbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

interface CheckboxProps extends RCheckbox.CheckboxProps {
	color?: "neutral" | "red" | "orange" | "yellow" | "lime" | "green" | "cyan" | "blue" | "violet" | "pink";
}

export default function Checkbox({ color = "neutral", ...rest }: CheckboxProps) {
	const colors =
		!rest.disabled && color === "red"
			? "data-[state='checked']:from-red data-[state='checked']:to-red-400 dark:data-[state='checked']:to-red-600 data-[state='checked']:border-t-red-300 data-[state='checked']:border-red-700 text-red-950"
			: color === "orange"
			? "data-[state='checked']:from-orange data-[state='checked']:to-orange-400 dark:data-[state='checked']:to-orange-600 data-[state='checked']:border-t-orange-300 data-[state='checked']:border-orange-700 text-orange-950"
			: color === "yellow"
			? "data-[state='checked']:from-yellow data-[state='checked']:to-yellow-400 dark:data-[state='checked']:to-yellow-600 data-[state='checked']:border-t-yellow-300 data-[state='checked']:border-yellow-700 text-yellow-950"
			: color === "lime"
			? "data-[state='checked']:from-lime data-[state='checked']:to-lime-400 dark:data-[state='checked']:to-lime-600 data-[state='checked']:border-t-lime-300 data-[state='checked']:border-lime-700 text-lime-950"
			: color === "green"
			? "data-[state='checked']:from-green data-[state='checked']:to-green-400 dark:data-[state='checked']:to-green-600 data-[state='checked']:border-t-green-300 data-[state='checked']:border-green-700 text-green-950"
			: color === "cyan"
			? "data-[state='checked']:from-cyan data-[state='checked']:to-cyan-400 dark:data-[state='checked']:to-cyan-600 data-[state='checked']:border-t-cyan-300 data-[state='checked']:border-cyan-700 text-cyan-950"
			: color === "blue"
			? "data-[state='checked']:from-blue data-[state='checked']:to-blue-400 dark:data-[state='checked']:to-blue-600 data-[state='checked']:border-t-blue-300 data-[state='checked']:border-blue-700 text-blue-950"
			: color === "violet"
			? "data-[state='checked']:from-violet data-[state='checked']:to-violet-400 dark:data-[state='checked']:to-violet-600 data-[state='checked']:border-t-violet-300 data-[state='checked']:border-violet-700 text-violet-950"
			: color === "pink"
			? "data-[state='checked']:from-pink data-[state='checked']:to-pink-400 dark:data-[state='checked']:to-pink-600 data-[state='checked']:border-t-pink-300 data-[state='checked']:border-pink-700 text-pink-950"
			: !rest.disabled &&
			  "data-[state='checked']:from-neutral-100 data-[state='checked']:to-neutral-200 data-[state='checked']:border-t-neutral-400 dark:data-[state='checked']:border-t-neutral-50 data-[state='checked']:border-neutral-50 dark:data-[state='checked']:border-neutral-400 text-neutral-950";
	return (
		<RCheckbox.Root
			className={`group ${colors} flex items-center justify-center size-6 rounded-md outline-hidden focus:outline hover:brightness-105 active:brightness-90 active:shadow-inner duration-100 active:duration-75 border ${
				rest.disabled
					? "text-neutral-600 bg-transparent border-neutral-900 pointer-events-none"
					: "bg-linear-to-t dark:bg-linear-to-b data-[state='checked']:border-x-0 data-[state='checked']:active:border-0 data-[state='checked']:active:border-transparent data-[state='unchecked']:border-neutral-800 data-[state='unchecked']:from-neutral-950 data-[state='unchecked']:to-neutral-900 "
			}`}
			{...rest}
		>
			<RCheckbox.Indicator>
				<Check strokeWidth={2} size={16} strokeLinejoin="miter" strokeLinecap="square" className="group-data-[state=checked]:animate-lucide-check-draw-in" strokeDasharray={24} />
			</RCheckbox.Indicator>
		</RCheckbox.Root>
	);
}
