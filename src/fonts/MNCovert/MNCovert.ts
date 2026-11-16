import localFont from "next/font/local";

export const MNCovert = localFont({
	src: [{ path: "./MNCovert-Variable.woff2" }],
	display: "swap",
	fallback: ["monospace"],
	variable: "--font-covert",
	preload: false,
});
