"use client";
import { useState } from "react";
import { useTransition, a } from "@react-spring/web";
import Button from "src/components/ui/Button";
import Kofi from "src/icons/Kofi";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ExternalLink from "src/icons/ExternalLink";

export default function KofiWidget() {
	const t = useTranslations("");
	const [visible, setVisible] = useState(false);
	const transition = useTransition(visible, {
		from: {
			opacity: 0,
		},
		enter: {
			opacity: 1,
			scale: 1,
		},
		leave: {
			opacity: 0,
			scale: 0.9,
		},
		exitBeforeEnter: true,
	});
	return (
		<div className="w-full max-w-[400px]">
			<div className="rounded-xl shadow-lg mx-auto w-full max-w-[400px] h-[640px] overflow-clip bg-neutral-900">
				{transition((style, item) =>
					item ? (
						<a.iframe
							style={style}
							// @ts-expect-error
							id="kofiframe"
							src="https://ko-fi.com/pprmint/?hidefeed=true&widget=true&embed=true"
							height="640"
							title="pprmint"
							className="w-full"
						/>
					) : (
						// @ts-expect-error
						<a.div
							style={style}
							className="flex flex-col items-center justify-center size-full p-6 text-center"
						>
							<Kofi className="size-[60px] text-white" />
							<p>{t("KOFI.dataInfo")}</p>
							<Link
								className="text-sm mt-3 mb-6 text-link-external inline-flex gap-1 items-center"
								href="https://more.ko-fi.com/privacy"
								target="_blank"
								rel="noopener noreferrer"
							>
								{t("PRIVACY.Content.privacyPolicyOf", { provider: "Ko-fi" })}
								<ExternalLink />
							</Link>
							<Button outlined onClick={() => setVisible(true)}>
								{t("KOFI.showWidget")}
							</Button>
						</a.div>
					)
				)}
			</div>
			<p className="text-xs text-center mt-1">
				{t.rich("KOFI.alternative", {
					Link: (chunks) => (
						<Link href="https://ko-fi.com/pprmint" target="_blank" className="text-link-external">
							{chunks}
						</Link>
					),
				})}
			</p>
		</div>
	);
}
