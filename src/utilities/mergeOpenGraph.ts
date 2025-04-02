import type { Metadata } from "next";
import { getServerSideURL } from "./getURL";

const defaultOpenGraph: Metadata["openGraph"] = {
	type: "website",
	description:
		"A rosey fox spirit wandering the world, and a freelancing illustrator specializing in character design and illustration.",
	images: [
		{
			url: `${getServerSideURL()}/pinkembed.png`,
		},
	],
	siteName: "Autsellia",
	title: "Autsellia",
};

export const mergeOpenGraph = (og?: Metadata["openGraph"]): Metadata["openGraph"] => {
	return {
		...defaultOpenGraph,
		...og,
		images: og?.images ? og.images : defaultOpenGraph.images,
	};
};
