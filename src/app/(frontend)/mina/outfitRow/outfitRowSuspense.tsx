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
			referenceFront: { exists: true },
			referenceBack: { exists: true },
		},
		pagination: false,
		limit: undefined,
		locale: locale,
		sort: "slug",
	});

	return (
		<div className="relative border-x border-black/5 dark:border-white/5 pt-20 lg:pt-32 xl:pt-40">
			{outfits !== null && (
				<>
					<h2 className="absolute top-[0.52em] lg:top-[0.05em] xl:top-[0.17em] right-3 text-[10rem] lg:text-[20rem] text-black/5 dark:text-white/5 -z-10 font-serif italic tracking-tight">
						{t("Content.Outfits.heading")}
					</h2>
					<OutfitRow outfits={outfits} />
				</>
			)}
		</div>
	);
}
