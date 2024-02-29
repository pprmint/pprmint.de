"use client";
import { useSearchParams } from "next/navigation";
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
		replace(`${pathname}?${params.toString()}`);
	}

	return [...Array(pageCount)].map((_, index) => (
		<button
			key={index}
			className={`size-9 rounded-full ${
				index + 1 == page ? "text-neutral-950 bg-neutral-50" : "text-neutral-50 hover:bg-neutral-900"
			}`}
			onClick={() => handlePagination(String(index + 1))}
		>
			{index + 1}
		</button>
	));
}
