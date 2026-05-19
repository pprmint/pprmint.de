import Check from "@/icons/Check";
import ChevronDown from "@/icons/ChevronDown";
import ChevronUp from "@/icons/ChevronUp";
import X from "@/icons/X";
import * as RadixSelect from "@radix-ui/react-select";

interface SelectProps {
	label: string;
	selected?: { label: string; value: string };
	onValueChange: (value: string) => void;
	options: {
		label: string;
		value: string;
	}[];
	showClearButton?: boolean;
	onClear?: () => void;
}

export default function Select({ label, selected, onValueChange, options, showClearButton, onClear }: SelectProps) {
	return (
		<RadixSelect.Root value={selected?.value} onValueChange={onValueChange}>
			<RadixSelect.Trigger
				className="group flex items-center justify-between px-3 h-9 w-full hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-950 dark:hover:text-white duration-75 hover:duration-0"
				aria-label={label}
			>
				<RadixSelect.Value aria-label={selected?.label}>{selected ? selected.label : label}</RadixSelect.Value>
				<RadixSelect.Icon className="ml-auto">
					<ChevronDown />
				</RadixSelect.Icon>
			</RadixSelect.Trigger>
			{showClearButton && (
				<button
					onClick={onClear}
					className="h-9 px-2.5 hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10 hover:text-neutral-950 dark:hover:text-white duration-100"
				>
					<X />
				</button>
			)}
			<RadixSelect.Portal>
				<RadixSelect.Content className="z-99999 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/5 shadow-lg data-[state=open]:animate-fade-in">
					<RadixSelect.ScrollUpButton className="absolute z-9999 top-0 left-0 right-0 flex justify-center bg-linear-to-b from-white/50 dark:from-neutral-900/50 text-neutral-950 dark:text-white rounded-t-md">
						<ChevronUp />
					</RadixSelect.ScrollUpButton>
					<RadixSelect.Viewport className="p-1">
						<RadixSelect.Group>
							{options.map((option) => (
								<RadixSelect.Item
									key={option.value}
									value={option.value}
									className="group relative flex items-center gap-3 pr-2 pl-2 h-7 leading-none select-none outline-none focus:outline-none data-disabled:text-black/25 dark:data-disabled:text-white/25 data-disabled:pointer-events-none data-highlighted:text-neutral-950 dark:data-highlighted:text-white data-[state=checked]:text-neutral-950 dark:data-[state=checked]:text-white data-highlighted:bg-black/10 dark:data-highlighted:bg-white/10 active:opacity-75 duration-75 data-highlighted:duration-0 cursor-pointer focus-visible:outline-hidden"
								>
									<RadixSelect.ItemText className="grow">{option.label}</RadixSelect.ItemText>
									<RadixSelect.ItemIndicator className="ml-auto">
										<Check />
									</RadixSelect.ItemIndicator>
								</RadixSelect.Item>
							))}
						</RadixSelect.Group>
					</RadixSelect.Viewport>
					<RadixSelect.ScrollDownButton className="absolute z-9999 bottom-0 left-0 right-0 flex justify-center bg-linear-to-t from-white/50 dark:from-neutral-900/50 text-neutral-950 dark:text-white rounded-b-md">
						<ChevronDown />
					</RadixSelect.ScrollDownButton>
				</RadixSelect.Content>
			</RadixSelect.Portal>
		</RadixSelect.Root>
	);
}
