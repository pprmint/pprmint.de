import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";
import Link from "next/link";

export default function ArtCreditButton(props: PropsWithChildren<{ link: string; fixToBottom?: boolean }>) {
	const t = useTranslations("COMMON");
	return (
		<Link
			href={props.link}
			target="_blank"
			rel="noopener noreferrer"
			className={`animate-fade-in absolute ${props.fixToBottom ? "bottom-6 md:bottom-12 right-6 md:right-12" : "bottom-36 md:bottom-12 left-6 md:left-auto md:right-12"}`}
			style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}
		>
			<button className="inline-flex p-0.5 items-center gap-1 text-neutral-50 text-sm px-3 py-1 hover:bg-neutral-50/10 active:opacity-75 rounded-full border border-neutral-50/10 backdrop-blur-xs duration-100 active:duration-75">
				<span className="hidden lg:block">{t("artDrawnBy")}</span>
				{props.children}
			</button>
		</Link>
	);
}
