import { getTranslations } from "next-intl/server";
import Image from "next/image";
import MinaWhat from "/public/assets/mina/minawhat.png";

export default async function OutOfBounds() {
	const t = await getTranslations("MINA");
	return (
		<div className="flex flex-col gap-3 items-center z-10 py-20 md:py-32 xl:py-40 border-y border-black/5 dark:border-white/5">
			<Image src={MinaWhat} alt="" className="size-28" />
			<h3>{t("Content.Artworks.OutOfBounds.title")}<span className="text-green">.</span></h3>
            <p>{t("Content.Artworks.OutOfBounds.text")}</p>
		</div>
	);
}
