"use client";

import Button from "@/components/ui/Button";
import WarningCircle from "@/icons/WarningCircle";
import RotateCw from "@/icons/RotateCw";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
      <div className="flex items-center justify-center min-h-[calc(100vh_-_96px)] border-x border-x-black/5 dark:border-x-white/5 ">
        <div className="relative w-full mt-16 border-y border-red bg-red/5 overflow-clip">
          <div className="flex flex-col p-6 md:p-9 md:max-w-3xl mx-auto border-x border-red bg-white dark:bg-neutral-950 animate-fade-in">
            <div className="mb-6">
              <h1 className="flex text-3xl font-mono font-normal">
                <WarningCircle className="fill-red size-[30px] inline mt-[0.175rem] mr-3" />
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
    </div>
  );
}
