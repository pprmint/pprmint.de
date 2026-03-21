import config from "@payload-config";
import { getPayload } from "payload";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Mina from "./Mina";

import Heart from "@/icons/Heart";
import HotCup from "@/icons/HotCup";
import ThemeSwitch from "./ThemeSwitch";
import LocaleSwitch from "./LocaleSwitch";
import Links from "./Links";
import Buttons from "./Buttons";

export default async function Footer() {
  const t = await getTranslations("FOOTER");
  const payload = await getPayload({ config });

  // Data for buttons.
  const buttons = await payload.find({
    collection: "buttons",
    pagination: false,
    limit: undefined,
    sort: "alt",
  });
  return (
    <footer className="w-full overflow-x-hidden">
      <Mina />
      <div className="border-y border-black/5 dark:border-white/5">
        <Buttons buttons={buttons} />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-between p-6">
        <div className="sm:w-1/3">
          <div className="text-sm text-center sm:text-left">
            <p className="leading-4">
              {t("madeWith")}
              <Heart className="inline fill-red mx-0.5" />
              {t("and")}
              <Link
                href="https://github.com/pprmint/pprmint.de/blob/main/package.json"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HotCup className="inline fill-yellow mx-0.5" />
              </Link>
            </p>
          </div>
          <p className="text-neutral-950 dark:text-white text-center sm:text-left">
            {"© "}
            {new Date().getFullYear()} pprmint.
          </p>
        </div>
        <div className="sm:w-1/3 flex justify-center items-center">
          <Links />
        </div>
        <div className="sm:w-1/3 flex items-center justify-between sm:justify-end gap-6">
          <LocaleSwitch />
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
}
