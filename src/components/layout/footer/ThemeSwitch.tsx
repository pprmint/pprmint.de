"use client";
import { Fragment } from "react";
import Moon from "@/icons/Moon";
import Computer from "@/icons/Computer";
import SmartphoneHomeButton from "@/icons/SmartphoneHomeButton";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Sun from "@/icons/Sun";

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative flex w-max border border-black/5 dark:border-white/5">
      {[
        { name: "dark", icon: <Moon /> },
        {
          name: "system",
          icon: (
            <Fragment>
              <Computer className="hidden lg:block" />
              <SmartphoneHomeButton className="lg:hidden" />
            </Fragment>
          ),
        },
        { name: "light", icon: <Sun /> },
      ].map((item) => (
        <button
          key={item.name}
          onClick={() => setTheme(item.name)}
          className={`p-1.5 ${
            theme === item.name
              ? "text-neutral-950 dark:text-white bg-neutral-950/5 dark:bg-neutral-50/5"
              : "hover:bg-neutral-950/5 dark:hover:bg-neutral-50/5"
          } duration-100 active:duration-75 active:opacity-75`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}

export default dynamic(() => Promise.resolve(ThemeSwitch), {
  ssr: false,
});
