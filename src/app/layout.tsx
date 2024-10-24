import { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import NavBar from "src/components/layout/NavBar";
import Footer from "src/components/layout/Footer";
import ScrollToTopButton from "src/components/layout/ScrollToTopButton";
import WarningTriangle from "src/icons/WarningTriangle";
import PotatoRedirect from "src/components/PotatoRedirect";

import "../styles.css";
import "../fonts/MinaSans/minasans.css";
import "../fonts/MinaSansDigits/minasansdigits.css";
import "../fonts/Silka/silka.css";
import "../fonts/SilkaMono/silkamono.css";
import "../fonts/BasierSquare/basiersquare.css";
import "../fonts/BasierSquareMono/basiersquaremono.css";
import "../fonts/Mintbit/mintbit.css";
import "../fonts/MintTriangles/minttriangles.css";
// yikes
import "../fonts/MintSans/mintsans.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://pprmint.de"),
	title: {
		template: `%s • pprmint.`,
		default: `pprmint.`,
	},
	keywords: ["art, design, graphic design, after effects, development, webdev, cinema 4d, 2d, 3d"],
	openGraph: {
		siteName: "pprmint.de",
	},
	twitter: {
		site: "pprmint.de",
		creator: "@npprmint",
		card: "summary_large_image",
	},
	robots: "noai",
};

export const viewport: Viewport = {
	themeColor: "#00cc66",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const locale = await getLocale();
	const messages = await getMessages();
	return (
		<html lang={locale} suppressHydrationWarning>
			<body className="bg-neutral-950 selection:bg-green selection:text-neutral-950 text-neutral focus-visible:outline-none focus-visible:ring-2 overflow-x-hidden">
				<ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
					<noscript>
						<div className="selection:bg-red fixed flex z-100 bottom-6 left-1/2 -translate-x-1/2 min-h-9 w-[92vw] max-w-max bg-gradient-to-b from-red-800/75 to-red-900/75 ring-inset ring-1 ring-red/10 border border-neutral-950 rounded-[18px] font-sans text-neutral-50 backdrop-blur-md shadow-xl shadow-neutral-950/50">
							<div className="inline-flex items-center p-2.5 rounded-3xl bg-gradient-to-b from-red/50 to-red/25">
								<WarningTriangle />
							</div>
							<p className="px-3 py-2 text-sm">
								<span className="font-bold animate-pulse">No JavaScript detected.</span> Some parts of the site won't work properly. Please
								allow JavaScript on the site or use a more recent browser.
							</p>
						</div>
					</noscript>
					<NextIntlClientProvider messages={messages}>
						<NavBar />
						{children}
						<Footer />
						<PotatoRedirect />
						<ScrollToTopButton />
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
