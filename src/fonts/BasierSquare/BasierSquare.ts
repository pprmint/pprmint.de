import localFont from "next/font/local";

export const BasierSquare = localFont({
	src: [
		{ path: "./basiersquare-regular-webfont.woff2", weight: "400", style: "normal" },
		{ path: "./basiersquare-regularitalic-webfont.woff2", weight: "400", style: "italic" },
		{ path: "./basiersquare-medium-webfont.woff2", weight: "500", style: "normal" },
		{ path: "./basiersquare-mediumitalic-webfont.woff2", weight: "500", style: "italic" },
		{ path: "./basiersquare-semibold-webfont.woff2", weight: "600", style: "normal" },
		{ path: "./basiersquare-semibolditalic-webfont.woff2", weight: "600", style: "italic" },
		{ path: "./basiersquare-bold-webfont.woff2", weight: "700", style: "normal" },
		{ path: "./basiersquare-bolditalic-webfont.woff2", weight: "700", style: "italic" },
	],
	display: "swap",
	fallback: ["Basier Square", "DINish", "Bahnschrift", "D-DIN", "Inter", "Roboto", "Helvetica", "Arial", "sans-serif"],
	variable: "--font-basier",
});
