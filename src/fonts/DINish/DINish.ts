import localFont from "next/font/local";

export const DINish = localFont({
  src: [{ path: "./DINish[slnt,wdth,wght].woff2" }],
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Inter", "Roboto", "Helvetica", "Arial", "sans-serif"],
  variable: "--font-din",
  preload: false,
});
