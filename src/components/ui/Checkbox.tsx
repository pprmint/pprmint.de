"use client";
import * as RCheckbox from "@radix-ui/react-checkbox";

interface CheckboxProps extends RCheckbox.CheckboxProps {
	color?: "neutral" | "red" | "yellow" | "green" | "blue" | "violet";
	border?: boolean;
	large?: boolean;
}

export default function Checkbox({ color = "neutral", border, large, ...rest }: CheckboxProps) {
	const colors =
		!rest.disabled && color === "red"
			? "data-[state='checked']:bg-red data-[state='checked']:hover:bg-red-400 data-[state='checked']:active:bg-red-600 data-[state='unchecked']:hover:bg-red/10 data-[state='unchecked']:active:bg-red/25 text-red-950"
			: color === "yellow"
			? "data-[state='checked']:bg-yellow data-[state='checked']:hover:bg-yellow-400 data-[state='checked']:active:bg-yellow-600 data-[state='unchecked']:hover:bg-yellow/10 data-[state='unchecked']:active:bg-yellow/25 text-yellow-950"
			: color === "green"
			? "data-[state='checked']:bg-green data-[state='checked']:hover:bg-green-400 data-[state='checked']:active:bg-green-600 data-[state='unchecked']:hover:bg-green/10 data-[state='unchecked']:active:bg-green/25 text-green-950"
			: color === "blue"
			? "data-[state='checked']:bg-blue data-[state='checked']:hover:bg-blue-400 data-[state='checked']:active:bg-blue-600 data-[state='unchecked']:hover:bg-blue/10 data-[state='unchecked']:active:bg-blue/25 text-blue-950"
			: color === "violet"
			? "data-[state='checked']:bg-violet data-[state='checked']:hover:bg-violet-400 data-[state='checked']:active:bg-violet-600 data-[state='unchecked']:hover:bg-violet/10 data-[state='unchecked']:active:bg-violet/25 text-violet-950"
			: !rest.disabled
			? "data-[state='unchecked']:bg-transparent data-[state='unchecked']:hover:bg-black/10 dark:data-[state='unchecked']:hover:bg-white/10 data-[state='unchecked']:active:bg-black/25 dark:data-[state='unchecked']:active:bg-white/25 data-[state='checked']:bg-neutral-950 data-[state='checked']:hover:bg-neutral-900 data-[state='checked']:active:bg-neutral-950 dark:data-[state='checked']:bg-white dark:data-[state='checked']:hover:bg-neutral-100 dark:data-[state='checked']:active:bg-neutral-200 text-white dark:text-neutral-950"
			: "bg-black/5 dark:bg-white/5 data-[state='checked']:bg-black/5 dark:data-[state='checked']:bg-white/5 text-neutral-300 dark:text-neutral-700";

	const borders =
		border && color === "red"
			? "data-[state='unchecked']:border-red/15"
			: color === "yellow"
			? "data-[state='unchecked']:border-yellow/15"
			: color === "green"
			? "data-[state='unchecked']:border-green/15"
			: color === "blue"
			? "data-[state='unchecked']:border-blue/15"
			: color === "violet"
			? "data-[state='unchecked']:border-violet/15"
			: !rest.disabled
			? "data-[state='unchecked']:border-black/5 dark:data-[state='unchecked']:border-white/5"
			: "border-transparent";

	return (
		<RCheckbox.Root
			className={`group ${
				border && `border data-[state='checked']:border-transparent`
			} ${borders} ${colors} flex items-center justify-center ${
				large ? "size-9" : "size-6"
			} duration-100 active:duration-75`}
			{...rest}
		>
			<RCheckbox.Indicator>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={large ? 20 : 16}
					height={large ? 20 : 16}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinejoin="miter"
					strokeLinecap="square"
					strokeDasharray={24}
					className="group-data-[state=checked]:animate-svg-check-draw-in"
				>
					<path d="M20 6 9 17l-5-5" />
				</svg>
			</RCheckbox.Indicator>
		</RCheckbox.Root>
	);
}
