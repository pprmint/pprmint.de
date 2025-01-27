export default function GallerySkeleton() {
    return (
        <div className="animate-pulse">
            <div className="mb-10 grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-3">
                {[...Array(20)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-neutral-900 rounded-lg w-full aspect-[3/2]"
                    />
                ))}
            </div>
            <div className="flex gap-2 justify-center">
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-neutral-900 rounded-full size-10"
                    />
                ))}
            </div>
        </div>
    );
}
