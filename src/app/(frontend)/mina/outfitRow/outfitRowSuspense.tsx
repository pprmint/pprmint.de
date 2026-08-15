import config from "@payload-config";
import { getPayload } from "payload";
import OutfitRow from "./outfitRow";
import { getLocale, getTranslations } from "next-intl/server";

export default async function OutfitRowSuspense() {
	const t = await getTranslations("MINA");
	const locale = (await getLocale()) as "en" | "de" | "all" | undefined;
	const payload = await getPayload({ config });

	const outfits = await payload.find({
		collection: "outfits",
		where: {
			references: { exists: true },
		},
		pagination: false,
		limit: undefined,
		locale: locale,
		sort: "slug",
	});

	return (
		<div className="relative border-x border-black/5 dark:border-white/5 pt-30 lg:pt-42 xl:pt-50">
			<OutfitRow outfits={outfits} />
		</div>
	);
}
