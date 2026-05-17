import localFont from "next/font/local";

export const MNVaria = localFont({
	src: [{ path: "./MNVariaWIP-VariableVF.woff2" }],
	display: "swap",
	fallback: ["Avenir Next", "Avenir", "-apple-system", "BlinkMacSystemFont", "Inter", "Roboto", "Helvetica", "Arial", "sans-serif"],
	variable: "--font-varia",
});
