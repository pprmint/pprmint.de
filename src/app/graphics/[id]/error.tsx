"use client";

import { useTranslations } from "next-intl";
import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";

export default function Error() {
	const t = useTranslations("GRAPHICS");
	return (
		<div className="min-h-[calc(100vh_-_289px)] h-max">
			<div className="absolute top-0 inset-x-0 -z-10 overflow-hidden h-96">
				<FadingImage
					src="https://cms.pprmint.de/uploads/ribbon_dark_4fb33611b4.webp"
					alt=""
					fill
					className={`object-cover h-full min-w-full contrast-[0.87] blur-lg`}
				/>
				<div className="bg-gradient-to-t from-neutral-950 to-neutral-950/75 absolute inset-0" />
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24"><path d="M0 10V0h10a2 2 0 0 0 4 0h10v10a2 2 0 0 0 0 4v10H14a2 2 0 0 0-4 0H0V14a2 2 0 0 0 0-4Z" style="fill:%23111"/></svg>')`,
						backgroundRepeat: "repeat",
						backgroundPosition: "top",
					}}
				/>
			</div>
			<Title title={t("Error.title")} description={t("Error.description")} />
		</div>
	);
}
