import localFont from "next/font/local";

export const MintBit = localFont({
  src: [
    { path: "./mintbit.woff2", weight: "400", style: "normal" },
  ],
  display: "swap",
  fallback: ["New York", "Roboto Slab", "Linux Libertine", "Georgia", "Times", "serif"],
  variable: "--font-mintbit",
});
