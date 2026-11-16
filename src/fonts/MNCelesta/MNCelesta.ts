import localFont from "next/font/local";

export const MNCelesta = localFont({
	src: [
		{ path: "./MNCelesta-Regular.woff2", weight: "400", style: "normal" },
		{ path: "./MNCelesta-Italic.woff2", weight: "400", style: "italic" },
	],
	display: "swap",
	fallback: ["New York", "Roboto Slab", "Linux Libertine", "Georgia", "Times", "serif"],
	variable: "--font-serif",
});
