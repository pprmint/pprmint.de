import configPromise from "@payload-config";
import { getPayload } from "payload";
import RichText from "@/components/richText";

import Title from "@/components/layout/Title";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
	const t = await getTranslations("PRIVACY");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default async function Page() {
	const t = await getTranslations("PRIVACY");
	const locale = (await getLocale()) as "en" | "de" | "all" | undefined;

	const payload = await getPayload({ config: configPromise });
	const privacyPolicy = await payload.findGlobal({
		slug: "privacyPolicy",
		locale: locale,
	});

	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")} />
			<div className="w-full h-px bg-black/5 dark:bg-white/5" />
			<main className="max-w-7xl mx-auto sm:px-6 md:px-9 lg:px-12 xl:px-20">
				<section className="border-x border-black/5 dark:border-white/5">
					<div className="bg-black/5 dark:bg-white/5 p-6 xl:p-9">
						<RichText data={privacyPolicy.tldr} className="prose-h2:pt-0" />
					</div>
				</section>
				<section className="px-6 xl:px-9 border-x border-black/5 dark:border-white/5">
					<RichText data={privacyPolicy.main} />
				</section>
				<section className="border-x border-black/5 dark:border-white/5 py-9 text-center text-xs">
					<p>
						{t("Content.lastUpdated", {
							revisionDate: new Date(privacyPolicy.updatedAt!),
						})}
					</p>
				</section>
			</main>
			<div className="w-full h-px bg-black/5 dark:bg-white/5" />
		</>
	);
}
