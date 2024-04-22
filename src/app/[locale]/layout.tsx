import { ReactNode } from "react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { locales } from "../../navigation";
import NavBar from "src/components/layout/NavBar";
import Footer from "src/components/layout/Footer";
import ScrollToTopButton from "src/components/layout/ScrollToTopButton";
import WarningTriangle from "src/icons/WarningTriangle";

type Props = {
	children: ReactNode;
	params: { locale: string };
};

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "HOME" });
	return {
		title: {
			template: `%s • pprmint.`,
			default: `pprmint.`,
		},
		description: t("Head.description"),
	};
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const messages = useMessages();
	return (
		<html lang={locale} suppressHydrationWarning>
			<body className="bg-neutral-950 selection:bg-green selection:text-neutral-950 text-neutral focus-visible:outline-none focus-visible:ring-2 overflow-x-hidden">
				<noscript>
					<div className="selection:bg-red fixed flex z-100 bottom-6 left-1/2 -translate-x-1/2 min-h-9 w-[92vw] max-w-max bg-gradient-to-b from-red-800/75 to-red-900/75 ring-inset ring-1 ring-red/10 border border-neutral-950 rounded-[18px] font-sans text-neutral-50 backdrop-blur-md shadow-xl shadow-neutral-950/50">
						<div className="inline-flex items-center p-2.5 rounded-3xl bg-gradient-to-b from-red/50 to-red/25">
							<WarningTriangle />
						</div>
						<p className="px-3 py-2 text-sm">
							<span className="font-bold animate-pulse">No JavaScript detected.</span> Some parts of the site won't work
							properly. Please allow JavaScript on the site or use a more recent browser.
						</p>
					</div>
				</noscript>
				<NextIntlClientProvider messages={messages}>
					<NavBar />
					{children}
					<Footer />
					<ScrollToTopButton />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
