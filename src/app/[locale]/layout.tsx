import { ReactNode } from "react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { locales } from "../../navigation";
import NavBar from "src/components/layout/NavBar";
import Footer from "src/components/layout/Footer";
import ScrollToTopButton from "src/components/layout/ScrollToTopButton";

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
		title: `pprmint.`,
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
					<div className="fixed z-[9999] bottom-6 left-1/2 -translate-x-1/2 w-[92vw] max-w-max px-4 py-2 bg-red text-black rounded-3xl font-sans">
						<p>
							<span className="font-bold animate-pulse">No JavaScript detected.</span> Some parts of the site might not
							work properly. Please allow JavaScript on the site or use a more recent browser.
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
