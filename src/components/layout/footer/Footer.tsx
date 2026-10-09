import config from "@payload-config";
import { getPayload } from "payload";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Mina from "./Mina";

import HeartBroken from "@/icons/HeartBroken";
import Cup from "@/icons/Cup";
import ThemeSwitch from "./ThemeSwitch";
import LocaleSwitch from "./LocaleSwitch";
import Links from "./Links";
import Buttons from "./Buttons";
import Tooltip from "@/components/ui/Tooltip";

export default async function Footer() {
	const t = await getTranslations("FOOTER");
	const payload = await getPayload({ config });

	// Data for buttons.
	const buttons = await payload.find({
		collection: "buttons",
		pagination: false,
		limit: undefined,
		sort: "alt",
	});
	return (
		<footer className="w-full overflow-x-hidden">
			<Mina />
			<div className="border-y border-black/5 dark:border-white/5">
				<Buttons buttons={buttons} />
			</div>
			<div className="flex flex-col sm:flex-row gap-3 justify-between p-6">
				<div className="sm:w-1/3">
					<div className="text-sm text-center sm:text-left">
						<p className="leading-4">
							{t.rich("madeWithLoveAndCoffee", {
								heart: () => <HeartBroken className="inline fill-red mx-0.5" />,
								coffee: () => (
									<Tooltip text={t("empty")}>
										<Cup className="inline fill-yellow mx-0.5" />
									</Tooltip>
								),
							})}
						</p>
					</div>
					<p className="text-neutral-950 dark:text-white text-center sm:text-left">
						{"© "}
						{new Date().getFullYear()} pprmint<span className="text-orange-500">.</span>
					</p>
				</div>
				<div className="sm:w-1/3 flex justify-center items-center gap-1">
					<Links />
				</div>
				<div className="sm:w-1/3 flex items-center justify-between sm:justify-end gap-6">
					<LocaleSwitch />
					<ThemeSwitch />
				</div>
			</div>
		</footer>
	);
}
