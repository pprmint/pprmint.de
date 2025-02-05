"use client";
import * as RCheckbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

interface CheckboxProps extends RCheckbox.CheckboxProps {
	color?: "neutral" | "red" | "orange" | "yellow" | "lime" | "green" | "cyan" | "blue" | "violet" | "pink";
	border?: boolean;
	large?: boolean;
}

export default function Checkbox({ color = "neutral", border, large, ...rest }: CheckboxProps) {
	const colors =
		!rest.disabled && color === "red"
			? "data-[state='checked']:bg-red data-[state='checked']:hover:bg-red-400 data-[state='checked']:active:bg-red-600 data-[state='unchecked']:hover:bg-red/10 text-red-950"
			: color === "orange"
				? "data-[state='checked']:bg-orange data-[state='checked']:hover:bg-orange-400 data-[state='checked']:active:bg-orange-600 data-[state='unchecked']:hover:bg-orange/10 text-orange-950"
				: color === "yellow"
					? "data-[state='checked']:bg-yellow data-[state='checked']:hover:bg-yellow-400 data-[state='checked']:active:bg-yellow-600 data-[state='unchecked']:hover:bg-yellow/10 text-yellow-950"
					: color === "lime"
						? "data-[state='checked']:bg-lime data-[state='checked']:hover:bg-lime-400 data-[state='checked']:active:bg-lime-600 data-[state='unchecked']:hover:bg-lime/10 text-lime-950"
						: color === "green"
							? "data-[state='checked']:bg-green data-[state='checked']:hover:bg-green-400 data-[state='checked']:active:bg-green-600 data-[state='unchecked']:hover:bg-green/10 text-green-950"
							: color === "cyan"
								? "data-[state='checked']:bg-cyan data-[state='checked']:hover:bg-cyan-400 data-[state='checked']:active:bg-cyan-600 data-[state='unchecked']:hover:bg-cyan/10 text-cyan-950"
								: color === "blue"
									? "data-[state='checked']:bg-blue data-[state='checked']:hover:bg-blue-400 data-[state='checked']:active:bg-blue-600 data-[state='unchecked']:hover:bg-blue/10 text-blue-950"
									: color === "violet"
										? "data-[state='checked']:bg-violet data-[state='checked']:hover:bg-violet-400 data-[state='checked']:active:bg-violet-600 data-[state='unchecked']:hover:bg-violet/10 text-violet-950"
										: color === "pink"
											? "data-[state='checked']:bg-pink data-[state='checked']:hover:bg-pink-400 data-[state='checked']:active:bg-pink-600 data-[state='unchecked']:hover:bg-pink/10 text-pink-950"
											: !rest.disabled
												? "data-[state='unchecked']:bg-transparent data-[state='unchecked']:hover:bg-black/10 dark:data-[state='unchecked']:hover:bg-white/10 data-[state='checked']:bg-neutral-950 data-[state='checked']:hover:bg-neutral-900 data-[state='checked']:active:bg-neutral-950 dark:data-[state='checked']:bg-white dark:data-[state='checked']:hover:bg-neutral-100 dark:data-[state='checked']:active:bg-neutral-200 text-white dark:text-neutral-950"
												: "bg-black/5 dark:bg-white/5 data-[state='checked']:bg-neutral-950 dark:data-[state='checked']:bg-white text-neutral-300 dark:text-neutral-700";

	const borders =
		border && color === "red"
			? "data-[state='unchecked']:border-red/15 data-[state='checked']:border-red"
			: color === "orange"
				? "data-[state='unchecked']:border-orange/15 data-[state='checked']:border-orange"
				: color === "yellow"
					? "data-[state='unchecked']:border-yellow/15 data-[state='checked']:border-yellow"
					: color === "lime"
						? "data-[state='unchecked']:border-lime/15 data-[state='checked']:border-lime"
						: color === "green"
							? "data-[state='unchecked']:border-green/15 data-[state='checked']:border-green"
							: color === "cyan"
								? "data-[state='unchecked']:border-cyan/15 data-[state='checked']:border-cyan"
								: color === "blue"
									? "data-[state='unchecked']:border-blue/15 data-[state='checked']:border-blue"
									: color === "violet"
										? "data-[state='unchecked']:border-violet/15 data-[state='checked']:border-violet"
										: color === "pink"
											? "data-[state='unchecked']:border-pink/15 data-[state='checked']:border-pink"
											: !rest.disabled &&
												"data-[state='unchecked']:border-black/10 dark:data-[state='unchecked']:border-white/10 data-[state='checked']:border-neutral-950 dark:data-[state='checked']:border-white";

	return (
		<RCheckbox.Root
			className={`group ${border && `border`} ${borders} ${colors} flex items-center justify-center ${large ? "size-9" : "size-6"} outline-none focus:outline duration-100 active:duration-75`}
			{...rest}
		>
			<RCheckbox.Indicator>
				<Check
					strokeWidth={2}
					size={large ? 20 : 16}
					strokeLinejoin="miter"
					strokeLinecap="square"
					className="group-data-[state=checked]:animate-lucide-check-draw-in"
					strokeDasharray={24}
				/>
			</RCheckbox.Indicator>
		</RCheckbox.Root>
	);
}
