"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import ChevronLeft from "@/icons/ChevronLeft";
import ChevronRight from "@/icons/ChevronRight";
import { usePathname, useRouter } from "next/navigation";

function Pagination({ page, pageCount }: { page: number; pageCount: number }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const buttonRange = useMediaQuery({ minWidth: 768 }) ? 6 : 4;
	const buttonOffset = useMediaQuery({ minWidth: 768 }) ? 3 : 2;
	const buttonStart = Math.max(1, Math.min(pageCount - buttonRange, page - (buttonRange - buttonOffset)));
	const buttonEnd = Math.min(pageCount - 1, buttonStart + buttonRange - 1);

	function handlePagination(page: number) {
		const params = new URLSearchParams(searchParams);
		if (page > 1) {
			params.set("p", page.toString());
		} else {
			params.delete("p");
		}
		replace(`${pathname}?${params}`, { scroll: false });
	}

	return (
		<div className="flex justify-center border-b border-black/5 dark:border-white/5">
			<button
				className={`group inline-flex items-center justify-center size-9 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 active:bg-neutral-100 dark:active:bg-neutral-800 disabled:bg-transparent disabled:text-neutral-200 dark:disabled:text-neutral-800 duration-100 disabled:pointer-events-none`}
				disabled={page === 1}
				onClick={() => handlePagination(page - 1)}
			>
				<ChevronLeft className={`${page !== 1 && "group-active:-translate-x-0.5"} duration-50`} />
			</button>
			<button
				className={`size-9 font-stretch-expanded ${
					1 === page
						? "text-white dark:text-neutral-950 bg-neutral-950 dark:bg-neutral-50 pointer-events-none font-bold"
						: "hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 active:bg-neutral-100 dark:active:bg-neutral-800"
				}`}
				onClick={() => handlePagination(1)}
			>
				1
			</button>
			{[...Array(pageCount)].map((_, index) => {
				if (index < buttonStart || index >= buttonEnd) return null;
				return (
					<button
						key={index}
						className={`size-9 ${index + 1 > 9 ? "font-stretch-condensed" : "font-stretch-expanded"} ${
							index + 1 === page
								? "text-white dark:text-neutral-950 bg-neutral-950 dark:bg-neutral-50 pointer-events-none font-bold"
								: "hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 active:bg-neutral-100 dark:active:bg-neutral-800"
						}`}
						onClick={() => handlePagination(index + 1)}
					>
						{index + 1}
					</button>
				);
			})}
			{pageCount > 1 && (
				<button
					className={`size-9 ${pageCount > 9 ? "font-stretch-condensed" : "font-stretch-expanded"} ${
						pageCount === page
							? "text-white dark:text-neutral-950 bg-neutral-950 dark:bg-neutral-50 pointer-events-none font-bold"
							: "hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 active:bg-neutral-100 dark:active:bg-neutral-800"
					}`}
					onClick={() => handlePagination(pageCount)}
				>
					{pageCount}
				</button>
			)}
			<button
				className={`group inline-flex items-center justify-center size-9 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 active:bg-neutral-100 dark:active:bg-neutral-800 disabled:bg-transparent disabled:text-neutral-200 dark:disabled:text-neutral-800 duration-100 disabled:pointer-events-none`}
				disabled={page === pageCount}
				onClick={() => handlePagination(page + 1)}
			>
				<ChevronRight className={`${page !== pageCount && "group-active:translate-x-0.5"} duration-50`} />
			</button>
		</div>
	);
}

export default dynamic(() => Promise.resolve(Pagination), {
	ssr: false,
});
