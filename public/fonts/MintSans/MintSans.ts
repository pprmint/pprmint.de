import localFont from "next/font/local";

export const MintSans = localFont({
	src: [
		{ path: "./mintsansextralight.woff2", weight: "200", style: "normal" },
		{ path: "./mintsansregular.woff2", weight: "400", style: "normal" },
		{ path: "./mintsansbold.woff2", weight: "700", style: "normal" },
	],
	display: "swap",
	fallback: [
		"Avenir Next",
		"Avenir",
		"-apple-system",
		"BlinkMacSystemFont",
		"Inter",
		"Roboto",
		"Helvetica",
		"Arial",
		"sans-serif",
	],
	variable: "--font-mintsans",
});
