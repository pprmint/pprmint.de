"use client";
import { BookCheck, BookX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import NoSSR from "src/components/NoSSR";

export default function FanartRules() {
    const t = useTranslations("MINA");
    const [hovered, setHovered] = useState(false);
    return (
        <section className="flex flex-col lg:flex-row items-center justify-center gap-9 mt-20 md:mt-32 xl:mt-40 max-w-7xl mx-auto px-6 md:px-9">
            <NoSSR>
                <div>
                    {hovered ? (
                        <BookX className="size-24 stroke-red" />
                    ) : (
                        <BookCheck className="size-24 stroke-green" />
                    )}
                </div>
            </NoSSR>
            <div>
                <h2>
                    {t("Content.Fanart.heading")}
                    <span className={hovered ? "text-red" : "text-green"}>
                        .
                    </span>
                </h2>
                <p>{t("Content.Fanart.text1")}</p>
                <p>{t("Content.Fanart.text2")}</p>
                <p>{t("Content.Fanart.text3")}</p>
                <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className="px-1 py-0.5 max-w-max bg-neutral-900 hover:bg-red-950 text-transparent hover:text-red-200 rounded-md duration-100 select-none hover:select-text cursor-not-allowed"
                >
                    {t("Content.Fanart.text4")}
                </div>
                <p className="text-xs text-neutral-700 pt-1">
                    {t("Content.Fanart.text5")}
                </p>
                <p>{t("Content.Fanart.text6")}</p>
            </div>
        </section>
    );
}
