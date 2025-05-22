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
      <main className="max-w-8xl mx-auto px-6 md:px-9 xl:px-20">
        <section className="pb-20 md:pb-32 border-x border-black/5 dark:border-white/5">
          <div className="bg-black/5 dark:bg-white/5 px-6 md:px-9 py-6 md:py-9">
            <RichText data={privacyPolicy.tldr} />
          </div>
        </section>
        <section className="border-x border-black/5 dark:border-white/5">
          <RichText data={privacyPolicy.main} />
        </section>
      </main>
    </>
  );
}
