"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import WarningCircle from "@/icons/WarningCircle";
import RotateCw from "@/icons/RotateCw";
import MinaOuch from "/public/assets/mina_ouch.webp";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<div className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
			<div className="flex items-center justify-center min-h-[calc(100vh_-_96px)] border-x border-x-black/5 dark:border-x-white/5 ">
				<div className="relative w-full mt-16 border-y border-red bg-red/5 overflow-clip">
					<div className="relative flex flex-col p-6 md:p-9 md:max-w-3xl mx-auto border-x border-red bg-white dark:bg-neutral-950 animate-fade-in">
						<div className="mb-6">
							<h1 className="text-3xl font-sans font-stretch-expanded">
								<WarningCircle className="fill-red size-[30px] inline mb-[0.275rem] mr-3" />
								{error.name}
							</h1>
							<p>{error.message}</p>
							{error.digest && <div className="text-xs mt-3">Code: {error.digest}</div>}
						</div>
						<Button noInitialPadding color="red" onClick={() => reset()}>
							<RotateCw />
							Retry
						</Button>
						<Image src={MinaOuch} alt="" className="w-20 h-auto absolute bottom-0 right-0" />
					</div>
				</div>
			</div>
		</div>
	);
}
