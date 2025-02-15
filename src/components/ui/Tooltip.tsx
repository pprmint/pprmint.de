import * as RadixTooltip from "@radix-ui/react-tooltip";
import { PropsWithChildren, ReactNode } from "react";

interface TooltipProps {
	text: ReactNode | string;
	side?: "top" | "bottom" | "right" | "left";
}

export default function Tooltip({ text, side = "top", children }: PropsWithChildren<TooltipProps>) {
	return (
		<RadixTooltip.Root delayDuration={300}>
			<RadixTooltip.Trigger asChild>
				<div className="flex items-center justify-center gap-1">{children}</div>
			</RadixTooltip.Trigger>
			<RadixTooltip.Content
				className="
				m-1 select-none rounded-md text-neutral-950 dark:text-white bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md px-3 pt-1.5 pb-2 text-sm max-w-sm leading-none shadow-xl shadow-neutral-950/5
				border border-neutral-100 dark:border-neutral-800
				data-[side=top]:data-[state=delayed-open]:animate-tooltip-enter-top data-[side=top]:data-[state=instant-open]:animate-tooltip-enter-top data-[side=top]:data-[state=closed]:animate-tooltip-exit-top
				data-[side=bottom]:data-[state=delayed-open]:animate-tooltip-enter-bottom data-[side=bottom]:data-[state=instant-open]:animate-tooltip-enter-bottom data-[side=bottom]:data-[state=closed]:animate-tooltip-exit-bottom
				data-[side=right]:data-[state=delayed-open]:animate-tooltip-enter-right data-[side=right]:data-[state=instant-open]:animate-tooltip-enter-right data-[side=right]:data-[state=closed]:animate-tooltip-exit-right
				data-[side=left]:data-[state=delayed-open]:animate-tooltip-enter-left data-[side=left]:data-[state=instant-open]:animate-tooltip-enter-left data-[side=left]:data-[state=closed]:animate-tooltip-exit-left"
				side={side}
			>
				{text}
				<RadixTooltip.Arrow className="fill-neutral-100 dark:fill-neutral-800" />
			</RadixTooltip.Content>
		</RadixTooltip.Root>
	);
}
