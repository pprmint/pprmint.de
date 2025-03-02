"use client";
import { ReactNode } from "react";
import Link from "next/link";
import Button from "src/components/ui/Button";
import { useTranslations } from "next-intl";
import ArrowTurnLeft from "src/icons/ArrowTurnLeft";

export default function Layout({ children }: { children: ReactNode }) {
	const t = useTranslations("GRAPHICS");
	return (
		<>
			{children}
			<div className="max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20">
				<div className="w-full pt-12 md:pt-20 xl:pt-40 border-x border-black/5 dark:border-white/5">
					<div className="flex justify-center border-y border-black/5 dark:border-white/5">
						<Link href="/graphics">
							<Button noInitialPadding size="large">
								{t("Content.return")}
								<ArrowTurnLeft />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
