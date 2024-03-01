"use client";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "src/navigation";
import Image from "next/image";
import MinaWhat from "public/assets/mina/minawhat.png";
import Button from "src/components/ui/Button";

export default function OutOfBounds() {
	const t = useTranslations("MINA");
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	function ClipBackInBounds() {
		const params = new URLSearchParams(searchParams);
		params.set("p", "1");
		replace(`${pathname}?${params.toString()}`, { scroll: false });
	}
	return (
		<div className="absolute flex flex-col gap-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center">
			<Image src={MinaWhat} alt="" className="size-24" />
			<h3>{t("Content.Artworks.outOfBounds")}</h3>
			<Button outlined onClick={ClipBackInBounds}>
				{t("Content.Artworks.clipBackIn")}
			</Button>
		</div>
	);
}
