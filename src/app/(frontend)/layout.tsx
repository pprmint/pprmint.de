import { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { LazyMotion, domAnimation } from "motion/react";
import Toast from "@/components/ui/Toast";

import NavBar from "@/components/layout/navigation/NavBar";
import Footer from "@/components/layout/Footer";
import WarningTriangle from "@/icons/WarningTriangle";

import "@/styles.css";
import "/public/fonts/IosevkaMint/IosevkaMint.css";
import "/public/fonts/NotoSerif/notoserif.css";
import "/public/fonts/DINish/DINish.css";
import "/public/fonts/Mintbit/mintbit.css";
import "/public/fonts/MintTriangles/minttriangles.css";
// yikes
import "/public/fonts/MintSans/mintsans.css";
import { NavbarProvider } from "@/components/layout/navigation/NavBarContext";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import TransitionProvider from "./transitionProvider";
import { getServerSideURL } from "@/utilities/getURL";

export const metadata: Metadata = {
	metadataBase: new URL(getServerSideURL()),
	title: {
		template: `%s • pprmint.`,
		default: `pprmint.`,
	},
	keywords: ["art, design, graphic design, photography, after effects, development, webdev, cinema 4d, 2d, 3d"],
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
			<body className="bg-white dark:bg-neutral-950 max-w-screen overflow-x-hidden selection:bg-green/50 text-neutral-950/75 dark:text-white/75 focus-visible:outline-hidden focus-visible:ring-2">
				<LazyMotion features={domAnimation}>
					<ThemeProvider defaultTheme="system" themes={["light", "dark", "system"]} attribute="class">
						<noscript>
							<div className="px-2 py-1 bg-red text-white fixed z-100 top-0 left-1/2 -translate-x-1/2 rounded-b-md w-full max-w-max">
								<p className="text-sm">
									<WarningTriangle className="inline mb-1 mr-2" />
									<span className="font-bold">No JavaScript detected.</span> Parts of the site won't
									work properly.{" "}
									<span className="hidden md:inline-block">
										Please enable JavaScript or use a more recent browser.
									</span>
								</p>
							</div>
						</noscript>
						<NextIntlClientProvider messages={messages}>
							<NavbarProvider>
								<TooltipProvider>
									<NavBar />
									<TransitionProvider>
										<Toast />
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
