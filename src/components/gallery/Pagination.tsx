"use client";
import { useSearchParams } from "next/navigation";
import ChevronLeft from "src/icons/ChevronLeft";
import ChevronRight from "src/icons/ChevronRight";
import { usePathname, useRouter } from "src/navigation";

export default function Pagination({ page, pageCount }: { page: number; pageCount: number }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	function handlePagination(page: string) {
		const params = new URLSearchParams(searchParams);
		if (page) {
			params.set("p", page);
		} else {
			params.delete("p");
		}
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	return (
		<div className="flex gap-2 justify-center w-full">
			<button
				className={`group inline-flex items-center justify-center size-10 rounded-full text-lg text-neutral-50 hover:bg-neutral-900 active:bg-neutral-800 disabled:text-neutral-800 disabled:bg-transparent duration-100`}
				disabled={page == 1}
				onClick={() => handlePagination(String(page - 1))}
			>
				<ChevronLeft className={`${page != 1 &&"group-active:-translate-x-0.5"} duration-50`} />
			</button>
			{[...Array(pageCount)].map((_, index) => (
				<button
					key={index}
					className={`size-10 rounded-full text-lg ${
						index + 1 == page
							? "text-neutral-950 bg-neutral-50 pointer-events-none"
							: "text-neutral-50 hover:bg-neutral-900 active:bg-neutral-800"
					} duration-100`}
					onClick={() => handlePagination(String(index + 1))}
				>
					{index + 1}
				</button>
			))}
			<button
				className={`group inline-flex items-center justify-center size-10 rounded-full text-lg text-neutral-50 hover:bg-neutral-900 active:bg-neutral-800 disabled:text-neutral-800 disabled:bg-transparent duration-100`}
				disabled={page == pageCount}
				onClick={() => handlePagination(String(page + 1))}
			>
				<ChevronRight className={`${page != pageCount &&"group-active:translate-x-0.5"} duration-50`} />
			</button>
		</div>
	);
}
