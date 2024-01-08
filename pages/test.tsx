import Button from "components/Button";
import * as Switch from "@radix-ui/react-switch";
import { useState } from "react";

export default function Test() {
	const [disabled, setDisabled] = useState(false);
	return (
		<main className="mx-auto pt-48">
			<div className="grid grid-cols-10 pb-24">
				<div>
					<div className="h-16 w-full bg-neutral-50"></div>
					<div className="h-16 w-full bg-neutral-100"></div>
					<div className="h-16 w-full bg-neutral-200"></div>
					<div className="h-16 w-full bg-neutral-300"></div>
					<div className="h-16 w-full bg-neutral-400"></div>
					<div className="p-3 h-16 w-full bg-neutral-500 text-neutral-950 font-display-mono font-light text-center text-4xl">
						<span className="mx-auto">#777</span>
					</div>
					<div className="h-16 w-full bg-neutral-600"></div>
					<div className="h-16 w-full bg-neutral-700"></div>
					<div className="h-16 w-full bg-neutral-800"></div>
					<div className="h-16 w-full bg-neutral-900"></div>
					<div className="h-16 w-full bg-neutral-950"></div>
				</div>
				<div>
					<div className="h-16 w-full bg-red-50"></div>
					<div className="h-16 w-full bg-red-100"></div>
					<div className="h-16 w-full bg-red-200"></div>
					<div className="h-16 w-full bg-red-300"></div>
					<div className="h-16 w-full bg-red-400"></div>
					<div className="p-3 h-16 w-full bg-red-500 text-red-950 font-display-mono font-light text-center text-4xl">
						<span className="mx-auto">#f44</span>
					</div>
					<div className="h-16 w-full bg-red-600"></div>
					<div className="h-16 w-full bg-red-700"></div>
					<div className="h-16 w-full bg-red-800"></div>
					<div className="h-16 w-full bg-red-900"></div>
					<div className="h-16 w-full bg-red-950"></div>
				</div>
				<div>
					<div className="h-16 w-full bg-orange-50"></div>
					<div className="h-16 w-full bg-orange-100"></div>
					<div className="h-16 w-full bg-orange-200"></div>
					<div className="h-16 w-full bg-orange-300"></div>
					<div className="h-16 w-full bg-orange-400"></div>
					<div className="p-3 h-16 w-full bg-orange-500 text-orange-950 font-display-mono font-light text-center text-4xl">
						<span className="mx-auto">#f71</span>
					</div>
					<div className="h-16 w-full bg-orange-600"></div>
					<div className="h-16 w-full bg-orange-700"></div>
					<div className="h-16 w-full bg-orange-800"></div>
					<div className="h-16 w-full bg-orange-900"></div>
					<div className="h-16 w-full bg-orange-950"></div>
				</div>
				<div>
					<div className="h-16 w-full bg-yellow-50"></div>
					<div className="h-16 w-full bg-yellow-100"></div>
					<div className="h-16 w-full bg-yellow-200"></div>
					<div className="h-16 w-full bg-yellow-300"></div>
					<div className="h-16 w-full bg-yellow-400"></div>
					<div className="p-3 h-16 w-full bg-yellow-500 text-yellow-950 font-display-mono font-light text-center text-4xl">
						<span className="mx-auto">#fb0</span>
					</div>
					<div className="h-16 w-full bg-yellow-600"></div>
					<div className="h-16 w-full bg-yellow-700"></div>
					<div className="h-16 w-full bg-yellow-800"></div>
					<div className="h-16 w-full bg-yellow-900"></div>
					<div className="h-16 w-full bg-yellow-950"></div>
				</div>
				<div>
					<div className="h-16 w-full bg-lime-50"></div>
					<div className="h-16 w-full bg-lime-100"></div>
					<div className="h-16 w-full bg-lime-200"></div>
					<div className="h-16 w-full bg-lime-300"></div>
					<div className="h-16 w-full bg-lime-400"></div>
					<div className="p-3 h-16 w-full bg-lime-500 text-lime-950 font-display-mono font-light text-center text-4xl">
						<span className="mx-auto">#9c3</span>
					</div>
					<div className="h-16 w-full bg-lime-600"></div>
					<div className="h-16 w-full bg-lime-700"></div>
					<div className="h-16 w-full bg-lime-800"></div>
					<div className="h-16 w-full bg-lime-900"></div>
					<div className="h-16 w-full bg-lime-950"></div>
				</div>
				<div>
					<div className="h-16 w-full bg-green-50"></div>
					<div className="h-16 w-full bg-green-100"></div>
					<div className="h-16 w-full bg-green-200"></div>
					<div className="h-16 w-full bg-green-300"></div>
					<div className="h-16 w-full bg-green-400"></div>
					<div className="p-3 h-16 w-full bg-green-500 text-green-950 font-display-mono font-light text-center text-4xl">
						<span className="mx-auto">#0c6</span>
					</div>
					<div className="h-16 w-full bg-green-600"></div>
					<div className="h-16 w-full bg-green-700"></div>
					<div className="h-16 w-full bg-green-800"></div>
					<div className="h-16 w-full bg-green-900"></div>
					<div className="h-16 w-full bg-green-950"></div>
				</div>
				<div>
					<div className="h-16 w-full bg-cyan-50"></div>
					<div className="h-16 w-full bg-cyan-100"></div>
					<div className="h-16 w-full bg-cyan-200"></div>
					<div className="h-16 w-full bg-cyan-300"></div>
					<div className="h-16 w-full bg-cyan-400"></div>
					<div className="p-3 h-16 w-full bg-cyan-500 text-cyan-950 font-display-mono font-light text-center text-4xl">
						<span className="mx-auto">#2cf</span>
					</div>
					<div className="h-16 w-full bg-cyan-600"></div>
					<div className="h-16 w-full bg-cyan-700"></div>
					<div className="h-16 w-full bg-cyan-800"></div>
					<div className="h-16 w-full bg-cyan-900"></div>
					<div className="h-16 w-full bg-cyan-950"></div>
				</div>
				<div>
					<div className="h-16 w-full bg-blue-50"></div>
					<div className="h-16 w-full bg-blue-100"></div>
					<div className="h-16 w-full bg-blue-200"></div>
					<div className="h-16 w-full bg-blue-300"></div>
					<div className="h-16 w-full bg-blue-400"></div>
					<div className="p-3 h-16 w-full bg-blue-500 text-blue-950 font-display-mono font-light text-center text-4xl">
						<span className="mx-auto">#29f</span>
					</div>
					<div className="h-16 w-full bg-blue-600"></div>
					<div className="h-16 w-full bg-blue-700"></div>
					<div className="h-16 w-full bg-blue-800"></div>
					<div className="h-16 w-full bg-blue-900"></div>
					<div className="h-16 w-full bg-blue-950"></div>
				</div>
				<div>
					<div className="h-16 w-full bg-violet-50"></div>
					<div className="h-16 w-full bg-violet-100"></div>
					<div className="h-16 w-full bg-violet-200"></div>
					<div className="h-16 w-full bg-violet-300"></div>
					<div className="h-16 w-full bg-violet-400"></div>
					<div className="p-3 h-16 w-full bg-violet-500 text-violet-950 font-display-mono font-light text-center text-4xl">
						<span className="mx-auto">#95e</span>
					</div>
					<div className="h-16 w-full bg-violet-600"></div>
					<div className="h-16 w-full bg-violet-700"></div>
					<div className="h-16 w-full bg-violet-800"></div>
					<div className="h-16 w-full bg-violet-900"></div>
					<div className="h-16 w-full bg-violet-950"></div>
				</div>
				<div>
					<div className="h-16 w-full bg-pink-50"></div>
					<div className="h-16 w-full bg-pink-100"></div>
					<div className="h-16 w-full bg-pink-200"></div>
					<div className="h-16 w-full bg-pink-300"></div>
					<div className="h-16 w-full bg-pink-400"></div>
					<div className="p-3 h-16 w-full bg-pink-500 text-pink-950 font-display-mono font-light text-center text-4xl">
						<span className="mx-auto">#e6b</span>
					</div>
					<div className="h-16 w-full bg-pink-600"></div>
					<div className="h-16 w-full bg-pink-700"></div>
					<div className="h-16 w-full bg-pink-800"></div>
					<div className="h-16 w-full bg-pink-900"></div>
					<div className="h-16 w-full bg-pink-950"></div>
				</div>
			</div>
			<div className="flex flex-col gap-6 px-12 mx-auto">
				<div className="flex gap-3">
					<Button disabled={disabled}>Small button</Button>
					<Button disabled={disabled} color="red">
						Small button
					</Button>
					<Button disabled={disabled} color="orange">
						Small button
					</Button>
					<Button disabled={disabled} color="yellow">
						Small button
					</Button>
					<Button disabled={disabled} color="lime">
						Small button
					</Button>
					<Button disabled={disabled} color="green">
						Small button
					</Button>
					<Button disabled={disabled} color="cyan">
						Small button
					</Button>
					<Button disabled={disabled} color="blue">
						Small button
					</Button>
					<Button disabled={disabled} color="violet">
						Small button
					</Button>
					<Button disabled={disabled} color="pink">
						Small button
					</Button>
				</div>
				<div className="flex gap-3">
					<Button disabled={disabled} outlined>
						Small button
					</Button>
					<Button disabled={disabled} outlined color="red">
						Small button
					</Button>
					<Button disabled={disabled} outlined color="orange">
						Small button
					</Button>
					<Button disabled={disabled} outlined color="yellow">
						Small button
					</Button>
					<Button disabled={disabled} outlined color="lime">
						Small button
					</Button>
					<Button disabled={disabled} outlined color="green">
						Small button
					</Button>
					<Button disabled={disabled} outlined color="cyan">
						Small button
					</Button>
					<Button disabled={disabled} outlined color="blue">
						Small button
					</Button>
					<Button disabled={disabled} outlined color="violet">
						Small button
					</Button>
					<Button disabled={disabled} outlined color="pink">
						Small button
					</Button>
				</div>
				<div className="flex gap-3">
					<Button disabled={disabled} large>
						Large button
					</Button>
					<Button disabled={disabled} large color="red">
						Large button
					</Button>
					<Button disabled={disabled} large color="orange">
						Large button
					</Button>
					<Button disabled={disabled} large color="yellow">
						Large button
					</Button>
					<Button disabled={disabled} large color="lime">
						Large button
					</Button>
					<Button disabled={disabled} large color="green">
						Large button
					</Button>
					<Button disabled={disabled} large color="cyan">
						Large button
					</Button>
					<Button disabled={disabled} large color="blue">
						Large button
					</Button>
					<Button disabled={disabled} large color="violet">
						Large button
					</Button>
					<Button disabled={disabled} large color="pink">
						Large button
					</Button>
				</div>
				<div className="flex gap-3">
					<Button disabled={disabled} large outlined>
						Small button
					</Button>
					<Button disabled={disabled} large outlined color="red">
						Large button
					</Button>
					<Button disabled={disabled} large outlined color="orange">
						Large button
					</Button>
					<Button disabled={disabled} large outlined color="yellow">
						Large button
					</Button>
					<Button disabled={disabled} large outlined color="lime">
						Large button
					</Button>
					<Button disabled={disabled} large outlined color="green">
						Large button
					</Button>
					<Button disabled={disabled} large outlined color="cyan">
						Large button
					</Button>
					<Button disabled={disabled} large outlined color="blue">
						Large button
					</Button>
					<Button disabled={disabled} large outlined color="violet">
						Large button
					</Button>
					<Button disabled={disabled} large outlined color="pink">
						Large button
					</Button>
				</div>
			</div>
			<div className="flex items-center gap-3 justify-center pt-12">
        <label htmlFor="disabled">Buttons disabled</label>
				<Switch.Root
					className="group relative w-14 h-8 rounded-full bg-neutral-800  data-[state='checked']:bg-green duration-200 ease-out"
					id="disabled"
					onClick={() => setDisabled(!disabled)}
					checked={disabled}
				>
					<Switch.Thumb className="flex items-center justify-center w-6 h-6 group-active:w-8 data-[state='checked']:group-active:translate-x-5 rounded-full bg-gradient-to-b from-neutral-50 to-neutral-100 translate-x-1 data-[state='checked']:translate-x-7 shadow-md duration-200 ease-out">
						<div className="h-2.5 w-2.5 rounded-full group-data-[state='checked']:w-0 ring-2 group-data-[state='checked']:ring-1 ring-neutral-700 group-data-[state='checked']:ring-green-700 duration-200 ease-out" />
					</Switch.Thumb>
				</Switch.Root>
			</div>
		</main>
	);
}
