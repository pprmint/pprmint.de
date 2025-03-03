"use client";
import { useEffect, useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import Button from "src/components/ui/Button";
import Kofi from "src/icons/Kofi";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ExternalLink from "src/icons/ExternalLink";
import { useNavbar } from "src/components/layout/navigation/NavBarContext";

export default function KofiWidget() {
	const t = useTranslations("");
	const [visible, setVisible] = useState(false);
	const { setInverted, setNoAccents } = useNavbar();
	useEffect(() => {
		setInverted(true);
		setNoAccents(true);
		return () => setInverted(false);
	}, [setInverted, setNoAccents]);
	return (
		<div className="w-full max-w-[400px] xl:pt-40">
			<div className="mx-auto w-full max-w-[400px] h-[640px] overflow-clip bg-black/5 dark:bg-white/5">
				<AnimatePresence mode="wait">
					{visible ? (
						<m.iframe
							key="kofi"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							id="kofiframe"
							src="https://ko-fi.com/pprmint/?hidefeed=true&widget=true&embed=true"
							height="640"
							title="pprmint"
							className="w-full"
						/>
					) : (
						<m.div
							key="warn"
							exit={{ opacity: 0 }}
							className="flex flex-col items-center justify-center size-full p-6 text-center"
						>
							<Kofi className="size-[60px] text-neutral-950 dark:text-white" />
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
							<Button design="semi-transparent" onClick={() => setVisible(true)}>
								{t("KOFI.showWidget")}
							</Button>
						</m.div>
					)}
				</AnimatePresence>
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
