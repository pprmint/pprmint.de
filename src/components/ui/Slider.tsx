import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
	label: string;
	value: number[];
	unit?: string;
	onValueChange: (value: number[]) => void;
	min: number;
	max: number;
	step: number;
}

export default function Slider({ label, value, unit, onValueChange, min, max, step }: SliderProps) {
	return (
		<RadixSlider.Root
			className="group/slider relative flex items-center select-none touch-none w-full h-9"
			value={value}
			onValueChange={onValueChange}
			min={min}
			max={max}
			step={step}
			aria-label={label}
		>
			<div aria-hidden className="absolute inset-0 flex justify-between items-center px-3 pointer-events-none">
				<span className="text-neutral-950 dark:text-white">{label}</span>
				<span className=" font-mono text-xs">{value}{unit}</span>
			</div>
			<RadixSlider.Track className="relative grow h-9">
				<RadixSlider.Range
					className="absolute bg-black/5 dark:bg-white/5 inset-1 group-hover/slider:inset-0 mx-1 group-hover/slider:mx-0"
					style={{ transition: "inset 75ms, margin-inline 75ms, left 0s, right 0s" }}
				/>
			</RadixSlider.Track>
			<RadixSlider.Thumb className="block h-7 group-hover/slider:h-9 w-px group-hover/slider:w-1 active:w-1 bg-neutral-950 dark:bg-white outline-hidden focus-visible:outline-hidden duration-75" />
		</RadixSlider.Root>
	);
}
