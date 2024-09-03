import { Suspense } from "react";

import GallerySkeleton from "./gallerySkeleton";
import GallerySuspense from "./gallerySuspense";
import { useLocale } from "next-intl";

type Props = {
	searchParams?: {
		p?: string;
		type?: string;
		dimension?: string;
	};
};

export default function Gallery({ searchParams }: Props) {
	const locale = useLocale();
	const currentPage = Number(searchParams?.p) || 1;
	const type = String(searchParams?.type) || "undefined";
	const dimension = String(searchParams?.dimension) || "undefined";
	return (
		<Suspense fallback={<GallerySkeleton />}>
			<GallerySuspense locale={locale} p={currentPage} type={type} dimension={dimension} />
		</Suspense>
	);
}
