import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* OpenGraph metadata */}
                <meta property="og:site_name" content="pprmint.art" />
                {/* Twitter metadata */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@npprmint" />
                <meta name="twitter:creator" content="@npprmint" />
            </Head>
            <body className="bg-neutral-950 selection:bg-green selection:text-neutral-950 text-neutral focus-visible:outline-none focus-visible:ring-2 overflow-x-hidden">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
