import NextHead from "next/head";
import { useRouter } from "next/router";

export default function Head(props: {
	title: string;
	description: string;
	image?: string;
	color?: string; // Can't use short HEX codes (#123), must be #123456
	favicon?: string; // Prop must match respective folder name inside /public/favicons.
}) {
	// Output title element as single text node.
	const title = `${props.title} // pprmint.art`;
	// Get URL for OpenGraph metadata.
	const router = useRouter();
	// Default props if not passed in the element.
	const { favicon = "pprmint" } = props;
	const { color = "#00cc66" } = props;
	const domain = "https://pprmint.art";
	const { image = `${domain}/api/og?title=${props.title}.&description=${props.description}` } = props;
	return (
		<NextHead>
			{/* Basic metadata */}
			<title>{title}</title>
			<meta name="description" content={props.description} />
			<meta name="theme-color" content={color} />

			{/* Favicons and other things for different platforms */}
			<link rel="apple-touch-icon" sizes="180x180" href={`/favicons/${favicon}/apple-touch-icon.png`} />
			<link rel="icon" type="image/png" sizes="32x32" href={`/favicons/${favicon}/favicon-32x32.png`} />
			<link rel="icon" type="image/png" sizes="16x16" href={`/favicons/${favicon}/favicon-16x16.png`} />
			<link rel="manifest" href={`/favicons/${favicon}/site.webmanifest`} />
			<link rel="mask-icon" href={`/favicons/${favicon}/safari-pinnedtab.svg`} color={color} />
			<link rel="shortcut icon" href={`/favicons/${favicon}/favicon.ico`} />

			{/* OpenGraph metadata */}
			<meta property="og:title" content={`${props.title}.`} />
			<meta property="og:url" content={domain + router.pathname} />
			<meta property="og:description" content={props.description} />
			<meta property="og:image" content={image} />

			{/* Twitter metadata */}
			<meta name="twitter:title" content={`${props.title}.`} />
			<meta name="twitter:description" content={props.description} />
			<meta name="twitter:image" content={image} />
		</NextHead>
	);
}
