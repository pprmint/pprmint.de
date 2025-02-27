"use client";

import Button from "src/components/ui/Button";
import WarningCircle from "src/icons/WarningCircle";
import RotateCw from "src/icons/RotateCw";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<div className="flex items-center justify-center min-h-[calc(100vh_-_96px)] animate-fade-in">
			<div className="relative w-screen border-y border-red bg-red/5 overflow-clip">
				<div className="flex flex-col p-6 md:p-9 md:max-w-3xl mx-auto border-x border-red bg-white dark:bg-neutral-950">
					<div className="mb-6">
						<h1 className="flex text-3xl font-stretch-expanded font-sans">
							<WarningCircle className="fill-red size-[30px] inline mt-1 mr-3" />
							{error.name}
						</h1>
						<p className="w-full">{error.message}</p>
						{error.digest && <div className="text-xs mt-3">Code: {error.digest}</div>}
					</div>
					<Button noInitialPadding color="red" onClick={() => reset()}>
						<RotateCw />
						Retry
					</Button>
				</div>
			</div>
		</div>
	);
}
