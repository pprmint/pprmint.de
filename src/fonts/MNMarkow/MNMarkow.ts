import localFont from "next/font/local";

export const MNMarkow = localFont({
	src: [{ path: "./MNMarkow-Regular.woff2" }],
	display: "swap",
	fallback: ["monospace"],
	variable: "--font-markow",
	preload: false,
});
