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
				source: "/projects/:slug*",
				destination: "/project/:slug*",
				permanent: false,
			},
			{
				source: "/project",
				destination: "/",
				permanent: false,
			},
			{
				source: "/projects",
				destination: "/",
				permanent: false,
			},
			{
				source: "/mintcraft",
				destination: "/project/mintcraft",
				permanent: false,
			},
			{
				source: "/appicons",
				destination: "/project/appicons",
				permanent: false,
			},
			{
				source: "/mintsans",
				destination: "/project/mintsans",
				permanent: false,
			},
			{
				source: "/mintbit",
				destination: "/project/mintbit",
				permanent: false,
			},
			{
				source: "/ytdlp",
				destination: "/project/ytdg",
				permanent: false,
			},
			{
				source: "/ytdlg",
				destination: "/project/ytdg",
				permanent: false,
			},
			{
				source: "/yt-dlp-gui",
				destination: "/project/ytdg",
				permanent: false,
			},
			{
				source: "/minttriangles",
				destination: "/project/minttriangles",
				permanent: false,
			},
			{
				source: "/triangles",
				destination: "/project/minttriangles",
				permanent: false,
			},
			{
				source: "/727",
				destination: "/project/minttriangles",
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
