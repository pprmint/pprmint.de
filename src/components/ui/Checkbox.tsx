"use client";
import * as RCheckbox from "@radix-ui/react-checkbox";

interface CheckboxProps extends RCheckbox.CheckboxProps {
	color?: "neutral" | "red" | "orange" | "yellow" | "lime" | "green" | "cyan" | "blue" | "violet" | "pink";
}

export default function Checkbox({ color = "neutral", ...rest }: CheckboxProps) {
	const colors =
		color === "red"
			? "data-[state='checked']:from-red data-[state='checked']:to-red-600 data-[state='checked']:border-t-red-400 data-[state='checked']:border-b-red-700"
			: color === "orange"
			? "data-[state='checked']:from-orange data-[state='checked']:to-orange-600 data-[state='checked']:border-t-orange-400 data-[state='checked']:border-b-orange-700"
			: color === "yellow"
			? "data-[state='checked']:from-yellow data-[state='checked']:to-yellow-600 data-[state='checked']:border-t-yellow-400 data-[state='checked']:border-b-yellow-700"
			: color === "lime"
			? "data-[state='checked']:from-lime data-[state='checked']:to-lime-600 data-[state='checked']:border-t-lime-400 data-[state='checked']:border-b-lime-700"
			: color === "green"
			? "data-[state='checked']:from-green data-[state='checked']:to-green-600 data-[state='checked']:border-t-green-400 data-[state='checked']:border-b-green-700"
			: color === "cyan"
			? "data-[state='checked']:from-cyan data-[state='checked']:to-cyan-600 data-[state='checked']:border-t-cyan-400 data-[state='checked']:border-b-cyan-700"
			: color === "blue"
			? "data-[state='checked']:from-blue data-[state='checked']:to-blue-600 data-[state='checked']:border-t-blue-400 data-[state='checked']:border-b-blue-700"
			: color === "violet"
			? "data-[state='checked']:from-violet data-[state='checked']:to-violet-600 data-[state='checked']:border-t-violet-400 data-[state='checked']:border-b-violet-700"
			: color === "pink"
			? "data-[state='checked']:from-pink data-[state='checked']:to-pink-600 data-[state='checked']:border-t-pink-400 data-[state='checked']:border-b-pink-700"
			: !rest.disabled &&
			  "data-[state='checked']:from-neutral-100 data-[state='checked']:to-neutral-200 data-[state='checked']:border-t-neutral-50 data-[state='checked']:border-b-neutral-400";
	return (
		<RCheckbox.Root
			className={`${colors} flex items-center justify-center size-6 rounded-md outline-none focus:outline hover:brightness-110 active:brightness-90 active:shadow-inner duration-100 active:duration-50 border ${
				rest.disabled
					? "text-neutral-600 bg-transparent border-neutral-900"
					: "text-neutral-950 bg-gradient-to-b data-[state='checked']:border-x-transparent data-[state='checked']:active:border-0 data-[state='checked']:active:border-transparent data-[state='unchecked']:border-neutral-800 data-[state='unchecked']:from-neutral-950 data-[state='unchecked']:to-neutral-900 "
			}`}
			{...rest}
		>
			<RCheckbox.Indicator>
				<i className="ri-check-line" />
			</RCheckbox.Indicator>
		</RCheckbox.Root>
	);
}
