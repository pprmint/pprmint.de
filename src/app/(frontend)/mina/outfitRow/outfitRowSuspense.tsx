import config from "@payload-config";
import { getPayload } from "payload";
import OutfitRow from "./outfitRow";
import { getLocale } from "next-intl/server";

export default async function OutfitRowSuspense() {
	const locale = (await getLocale()) as "en" | "de" | "all" | undefined;
	const payload = await getPayload({ config });

	const outfits = await payload.find({
		collection: "outfits",
		where: {
			referenceFront: { exists: true },
			referenceBack: { exists: true },
		},
		pagination: false,
		limit: undefined,
		locale: locale,
		sort: "slug",
	});

	return (
		<div className="border-x border-black/5 dark:border-white/5 pt-12 lg:pt-20 xl:pt-40">
			{outfits !== null && (
				<>
					<OutfitRow outfits={outfits} />
				</>
			)}
		</div>
	);
}
