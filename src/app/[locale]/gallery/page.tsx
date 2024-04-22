import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";

import GallerySkeleton from "./gallery/gallerySkeleton";
import GallerySuspense from "./gallery/gallerySuspense";

import { Works } from "src/types/work";
import { Link } from "src/navigation";
import WarningOctagon from "src/icons/WarningOctagon";

export async function generateMetadata({ params: { locale } }: Props) {
    const t = await getTranslations({ locale, namespace: "GALLERY" });
    return {
        title: t("Head.title"),
        description: t("Head.description"),
    };
}

type Props = {
    params: { locale: string };

    searchParams?: {
        p?: string;
        type?: string;
        dimension?: string;
    };
};

export default async function Page({
    searchParams,
    params: { locale },
}: Props) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations("GALLERY");
    const currentPage = Number(searchParams?.p) || 1;
    const type = String(searchParams?.type) || "undefined";
    const dimension = String(searchParams?.dimension) || "undefined";
    const Latest: Works = await getLatest();
    return (
        <>
            <Title title={t("Head.title")} description={t("Head.description")}>
                <FadingImage
                    src={`https://static.pprmint.art${Latest.data[0].attributes.cover.data.attributes.url}`}
                    alt=""
                    fill
                    className="object-cover"
                    quality={90}
                />
            </Title>
            <main>
                <section className="mx-auto">
                    <Suspense fallback={<GallerySkeleton />}>
                        <GallerySuspense
                            locale={locale}
                            p={currentPage}
                            type={type}
                            dimension={dimension}
                        />
                    </Suspense>
                </section>
                <section className="flex flex-col lg:flex-row items-center justify-center gap-9 my-20 md:my-32 xl:my-40 max-w-7xl mx-auto px-6 md:px-9">
                    <div>
                        <WarningOctagon className="size-24 fill-red" />
                    </div>
                    <div>
                        <h2>
                            {t("Content.Disclaimer.heading")}
                            <span className="text-red">.</span>
                        </h2>
                        <p>{t("Content.Disclaimer.text1")}</p>
                        <p>
                            {t.rich("Content.Disclaimer.text2", {
                                b: (chunks) => <b>{chunks}</b>,
                            })}
                        </p>
                        <p>
                            {t.rich("Content.Disclaimer.text3", {
                                Link: (chunks) => (
                                    <Link href="/contact" className="text-link">
                                        {chunks}
                                    </Link>
                                ),
                            })}
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}

async function getLatest() {
    const res = await fetch(
        `${process.env.STRAPI_API_URL}/works?pagination[limit]=1&populate=*&sort=creationDate:desc`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
            },
            next: { revalidate: 60 },
        }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch latest.");
    }
    return res.json();
}
