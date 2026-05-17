import localFont from "next/font/local";

export const BasierSquareNarrow = localFont({
	src: [
		{
			path: "./basiersquarenarrow-regular-webfont.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "./basiersquarenarrow-regularitalic-webfont.woff2",
			weight: "400",
			style: "italic",
		},
		{
			path: "./basiersquarenarrow-medium-webfont.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "./basiersquarenarrow-mediumitalic-webfont.woff2",
			weight: "500",
			style: "italic",
		},
		{
			path: "./basiersquarenarrow-semibold-webfont.woff2",
			weight: "600",
			style: "normal",
		},
		{
			path: "./basiersquarenarrow-semibolditalic-webfont.woff2",
			weight: "600",
			style: "italic",
		},
		{
			path: "./basiersquarenarrow-bold-webfont.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "./basiersquarenarrow-bolditalic-webfont.woff2",
			weight: "700",
			style: "italic",
		},
	],
	display: "swap",
	fallback: [
		"Basier Square Narrow",
		"DINish",
		"Bahnschrift",
		"D-DIN",
		"Inter",
		"Roboto Condensed",
		"Roboto",
		"Helvetica",
		"Arial",
		"sans-serif",
	],
	variable: "--font-basier-narrow",
});
