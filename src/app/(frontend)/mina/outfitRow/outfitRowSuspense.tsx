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
		<div className="relative border-x border-black/5 dark:border-white/5 pt-12 lg:pt-20 xl:pt-40">
			{outfits !== null && (
				<>
					<h2 className="absolute bottom-[2.15rem] lg:-bottom-[2.7rem] left-0 text-[10rem] lg:text-[20rem] text-black/5 dark:text-white/5 -z-10 font-serif font-extralight font-stretch-extra-condensed italic tracking-tight">
						{t("Content.Outfits.heading")}
					</h2>
					<OutfitRow outfits={outfits} />
				</>
			)}
		</div>
	);
}
