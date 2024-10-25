"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import ChevronLeft from "src/icons/ChevronLeft";
import ChevronRight from "src/icons/ChevronRight";
import { usePathname, useRouter } from "next/navigation";

function Pagination({ page, pageCount, onPageChange }: { page: number; pageCount: number; onPageChange?: () => void }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const buttonRange = useMediaQuery({ minWidth: 768 }) ? 6 : 4;
	const buttonOffset = useMediaQuery({ minWidth: 768 }) ? 3 : 2;
	const buttonStart = Math.max(1, Math.min(pageCount - buttonRange, page - (buttonRange - buttonOffset)));
	const buttonEnd = Math.min(pageCount - 1, buttonStart + buttonRange - 1);

	function handlePagination(page: string) {
		const params = new URLSearchParams(searchParams);
		if (page) {
			params.set("p", page);
		} else {
			params.delete("p");
		}
		replace(`${pathname}?${params.toString()}`, { scroll: false });
		onPageChange;
	}

	return (
		<div className="flex gap-1 justify-center items-center w-full">
			<button
				className={`group inline-flex items-center justify-center size-8 sm:size-10 sm:text-lg rounded-full text-neutral-50 hover:bg-neutral-900 active:bg-neutral-800 disabled:text-neutral-800 disabled:bg-transparent duration-100`}
				disabled={page == 1}
				onClick={() => handlePagination(String(page - 1))}
			>
				<ChevronLeft className={`${page != 1 && "group-active:-translate-x-0.5"} duration-50`} />
			</button>
			<button
				className={`size-8 sm:size-10 sm:text-lg rounded-full ${
					1 == page
						? "text-neutral-950 bg-neutral-50 pointer-events-none font-bold"
						: "text-neutral-50 hover:bg-neutral-900 active:bg-neutral-800"
				}`}
				onClick={() => handlePagination(String(1))}
			>
				1
			</button>
			{[...Array(pageCount)].map((_, index) => {
				if (index < buttonStart || index >= buttonEnd) return null;
				return (
					<button
						key={index}
						className={`size-8 sm:size-10 sm:text-lg rounded-full ${
							index + 1 == page
								? "text-neutral-950 bg-neutral-50 pointer-events-none font-bold"
								: "text-neutral-50 hover:bg-neutral-900 active:bg-neutral-800"
						}`}
						onClick={() => handlePagination(String(index + 1))}
					>
						{index + 1}
					</button>
				);
			})}
			<button
				className={`size-8 sm:size-10 sm:text-lg rounded-full ${
					pageCount == page
						? "text-neutral-950 bg-neutral-50 pointer-events-none font-bold"
						: "text-neutral-50 hover:bg-neutral-900 active:bg-neutral-800"
				}`}
				onClick={() => handlePagination(String(pageCount))}
			>
				{pageCount}
			</button>
			<button
				className={`group inline-flex items-center justify-center size-8 sm:size-10 sm:text-lg rounded-full text-neutral-50 hover:bg-neutral-900 active:bg-neutral-800 disabled:text-neutral-800 disabled:bg-transparent duration-100`}
				disabled={page == pageCount}
				onClick={() => handlePagination(String(page + 1))}
			>
				<ChevronRight className={`${page != pageCount && "group-active:translate-x-0.5"} duration-50`} />
			</button>
		</div>
	);
}

export default dynamic(() => Promise.resolve(Pagination), {
	ssr: false,
});
