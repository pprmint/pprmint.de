/** @type {import("next").NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

const securityHeaders = [
	{
		key: "Strict-Transport-Security",
		value: "max-age=63072000; includeSubDomains; preload",
	},
	{
		key: "X-DNS-Prefetch-Control",
		value: "on",
	},
	{
		key: "X-Frame-Options",
		value: "DENY",
	},
	{
		key: "X-XSS-Protection",
		value: "1; mode=block",
	},
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
];

module.exports = withNextIntl({
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.pprmint.art",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/works",
				destination: "/gallery",
				permanent: false,
			},
			{
				source: "/project/:slug*",
				destination: "/projects/:slug*",
				permanent: false,
			},
			{
				source: "/minasans",
				destination: "/projects/minasans",
				permanent: false,
			},
			{
				source: "/mintcraft",
				destination: "/projects/mintcraft",
				permanent: false,
			},
			{
				source: "/appicons",
				destination: "/projects/appicons",
				permanent: false,
			},
			{
				source: "/mintsans",
				destination: "/projects/mintsans",
				permanent: false,
			},
			{
				source: "/mintbit",
				destination: "/projects/mintbit",
				permanent: false,
			},
			{
				source: "/ytdlp",
				destination: "/projects/ytdg",
				permanent: false,
			},
			{
				source: "/ytdlg",
				destination: "/projects/ytdg",
				permanent: false,
			},
			{
				source: "/yt-dlp-gui",
				destination: "/projects/ytdg",
				permanent: false,
			},
			{
				source: "/icons",
				destination: "/projects/icons",
				permanent: false,
			},
			{
				source: "/minttriangles",
				destination: "/projects/minttriangles",
				permanent: false,
			},
			{
				source: "/triangles",
				destination: "/projects/minttriangles",
				permanent: false,
			},
			{
				source: "/727",
				destination: "/projects/minttriangles",
				permanent: false,
			},
		];
	},
	async headers() {
		return [
			{
				// Apply these headers to all routes in your application.
				source: "/:path*",
				headers: securityHeaders,
			},
		];
	},
});
