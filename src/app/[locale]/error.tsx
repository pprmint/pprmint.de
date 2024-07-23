'use client'

import Button from "src/components/ui/Button"
import ErrorCircle from "src/icons/ErrorCircle"
import RotateCw from "src/icons/RotateCw"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh_-_272px)] p-6 md:p-9 xl:p-0 animate-scale-up">
            <div className="bg-red-950 flex flex-col items-center justify-center w-screen md:max-w-max mx-auto border border-red rounded-xl p-6 md:p-9">
                <h2 className="inline-flex gap-3"><ErrorCircle className="fill-red size-9" />{error.name}</h2>
                <p className="pb-6 w-full text-wrap overflow-auto">{error.message}</p>
                <Button color="red" onClick={() => reset()}><RotateCw />Retry</Button>
            </div>
        </div>
    )
}