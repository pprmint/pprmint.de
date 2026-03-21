"use client";
import { useLocale } from "next-intl";
import { locales } from "@/i18n/config";
import { setUserLocale } from "@/i18n/locale";

export default function LocaleSwitch() {
  const currentLocale = useLocale();
  const otherLocale = locales?.find((cur) => cur !== currentLocale);

  return (
    <button
      onClick={() => setUserLocale(otherLocale!)}
      className="relative flex border border-black/5 dark:border-white/5"
    >
      {locales.map((locale) => (
        <div
          key={locale}
          className={`inline-flex items-center justify-center text-sm w-9 h-[27px] ${
            currentLocale === locale
              ? "text-neutral-950 dark:text-white bg-neutral-950/5 dark:bg-neutral-50/5"
              : "hover:bg-neutral-950/5 dark:hover:bg-neutral-50/5"
          } duration-100 active:duration-75 active:opacity-75 uppercase`}
        >
          {locale}
        </div>
      ))}
    </button>
  );
}
