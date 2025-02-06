import { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { LazyMotion, domAnimation } from "motion/react";

import NavBar from "src/components/layout/navigation/NavBar";
import Footer from "src/components/layout/Footer";
import WarningTriangle from "src/icons/WarningTriangle";

import "../styles.css";
import "../fonts/RobotoSerif/robotoserif.css";
import "../fonts/DINish/DINish.css";
import "../fonts/Mintbit/mintbit.css";
import "../fonts/MintTriangles/minttriangles.css";
// yikes
import "../fonts/MintSans/mintsans.css";
import { NavbarProvider } from "src/components/layout/navigation/NavBarContext";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import TransitionProvider from "./transitionProvider";

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
	themeColor: "#44bb55",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const locale = await getLocale();
	const messages = await getMessages();
	return (
		<html lang={locale} suppressHydrationWarning>
			<body className="bg-white dark:bg-neutral-950 max-w-screen overflow-x-hidden selection:bg-neutral-950 dark:selection:bg-neutral-50 selection:text-white dark:selection:text-neutral-950 text-neutral-950/75 dark:text-white/75 focus-visible:outline-hidden focus-visible:ring-2">
				<LazyMotion features={domAnimation}>
					<ThemeProvider defaultTheme="dark" themes={["light", "dark", "system"]} attribute="class">
						<noscript>
							<div className="selection:bg-red text-white fixed flex z-100 bottom-6 left-1/2 -translate-x-1/2 min-h-9 w-[92vw] max-w-max bg-gradient-to-b from-red-800/75 to-red-900/75 ring-inset ring-1 ring-red/10 border border-neutral-950 rounded-[18px] font-sans backdrop-blur-md shadow-xl shadow-neutral-950/50">
								<div className="inline-flex items-center p-2.5 rounded-3xl bg-gradient-to-b from-red/50 to-red/25">
									<WarningTriangle />
								</div>
								<p className="px-3 py-2 text-sm">
									<span className="font-bold animate-pulse">No JavaScript detected.</span> Some parts of the site won't work properly.
									Please allow JavaScript on the site or use a more recent browser.
								</p>
							</div>
						</noscript>
						<NextIntlClientProvider messages={messages}>
							<NavbarProvider>
								<TooltipProvider>
									<NavBar />
									<TransitionProvider>
										{children}
										<Footer />
									</TransitionProvider>
								</TooltipProvider>
							</NavbarProvider>
						</NextIntlClientProvider>
					</ThemeProvider>
				</LazyMotion>
			</body>
		</html>
	);
}
