import { ReactNode } from "react";
import { Metadata, Viewport } from "next";

import "../styles.css";
import "../fonts/Silka/silka.css";
import "../fonts/SilkaMono/silkamono.css";
import "../fonts/BasierSquare/basiersquare.css";
import "../fonts/BasierSquareMono/basiersquaremono.css";
import "../fonts/Mintbit/mintbit.css";
import "../fonts/MintTriangles/minttriangles.css";
// yikes
import "../fonts/MintSans/mintsans.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://pprmint.art"),
	keywords: ["art, design, graphic design, after effects, development, webdev, cinema 4d, 2d, 3d"],
	openGraph: {
		siteName: "pprmint.art",
	},
	twitter: {
		site: "pprmint.art",
		creator: "@npprmint",
		card: "summary_large_image",
	},
	robots: "noai"
};

export const viewport: Viewport = {
	themeColor: "#00cc66",
};

type Props = {
	children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
	return children;
}
