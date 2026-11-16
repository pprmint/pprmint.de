import localFont from "next/font/local";

export const BasierSquareMono = localFont({
	src: [
		{ path: "./basiersquaremono-regular-webfont.woff2", weight: "400", style: "normal" },
		{ path: "./basiersquaremono-regularitalic-webfont.woff2", weight: "400", style: "italic" },
		{ path: "./basiersquaremono-medium-webfont.woff2", weight: "500", style: "normal" },
		{ path: "./basiersquaremono-mediumitalic-webfont.woff2", weight: "500", style: "italic" },
		{ path: "./basiersquaremono-semibold-webfont.woff2", weight: "600", style: "normal" },
		{ path: "./basiersquaremono-semibolditalic-webfont.woff2", weight: "600", style: "italic" },
		{ path: "./basiersquaremono-bold-webfont.woff2", weight: "700", style: "normal" },
		{ path: "./basiersquaremono-bolditalic-webfont.woff2", weight: "700", style: "italic" },
	],
	fallback: ["Basier Square Mono", "JetBrains Mono", "monospace"],
	variable: "--font-basier-mono",
	preload: false,
});
