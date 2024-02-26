import { useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";

import "styles/globals.css";
import "fonts/Silka/silka.css";
import "fonts/SilkaMono/silkamono.css";
import "fonts/BasierSquare/basiersquare.css";
import "fonts/BasierSquareMono/basiersquaremono.css";
import "fonts/LCD14/lcd14.css";
import "fonts/Mintbit/mintbit.css";
import "remixicon/fonts/remixicon.css";
// yikes
import "fonts/MintSans/mintsans.css";

import Navigation from "src/components/Navigation";
import Footer from "src/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	useEffect(() => {
		router.events.on("routeChangeComplete", () => document.body.classList.remove("overflow-hidden"));
	}, [router.events]);
	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<noscript>
				<div className="bg-neutral-950 fixed z-50 w-screen h-screen">
					<div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-5xl w-4/5 rounded-lg bg-neutral-900 font-sans text-neutral">
						<div className="bg-red-800 rounded-t-lg">
							<h1 className="font-display font-semibold text-neutral-50 text-3xl md:text-5xl p-5 md:p-10 ">
								JavaScript seems to be disabled.
							</h1>
						</div>
						<div className="p-5 md:p-10">
							<p>
								Hiya. This site uses features that require JavaScript to work.
								For example: Navigation menus and pop-ups are added and removed
								from the DOM tree as needed.
							</p>
							<br />
							<p>
								If you're a fellow NoScript user you'll have to allow scripts on
								this domain. If not, either some of your browser settings or an
								extension prevent JavaScript from running.
								<br />
								Or your browser's just too old, idk.
							</p>
							<br />
							<p>
								Should JavaScript not be your thing, fear not! I'm also on other
								sites that kinda require JavaScript to work properly:
							</p>
							<ul className="list-disc list-inside">
								<li>
									<a href="https://twitter.com/npprmint" className="text-blue">
										Twitter
									</a>
								</li>
								<li>
									<a href="https://youtube.com/@npprmint" className="text-blue">
										YouTube
									</a>
								</li>
								<li>
									<a href="https://npprmint.tumblr.com" className="text-blue">
										Tumblr
									</a>
								</li>
								<li>
									<a href="https://github.com/pprmint" className="text-blue">
										GitHub
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</noscript>
			<Navigation />
			<Component {...pageProps} />
            <Footer />
		</>
	);
}
