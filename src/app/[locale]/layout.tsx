import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";

export default function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	return (
		<html lang={locale}>
			<body className="bg-neutral-950 selection:bg-green selection:text-neutral-950 text-neutral focus-visible:outline-none focus-visible:ring-2 overflow-x-hidden">
				<noscript>
					<div className="fixed z-[9999] bottom-6 left-1/2 -translate-x-1/2 max-w-screen w-max px-4 py-2 bg-red text-black rounded-full font-sans">
						<p>
							<span className="font-bold animate-pulse">No JavaScript detected.</span> Some parts of the site might not
							work properly. Please allow JavaScript on the site or use a more recent browser.
						</p>
					</div>
				</noscript>
                <NavBar />
				{children}
                <Footer />
			</body>
		</html>
	);
}
