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
				permanent: true,
			},
			{
				source: "/project",
				destination: "/",
				permanent: true,
			},
			{
				source: "/projects",
				destination: "/",
				permanent: true,
			},
			{
				source: "/mintcraft",
				destination: "/project/mintcraft",
				permanent: true,
			},
			{
				source: "/appicons",
				destination: "/project/appicons",
				permanent: true,
			},
			{
				source: "/mintsans",
				destination: "/project/mintsans",
				permanent: true,
			},
			{
				source: "/mintbit",
				destination: "/project/mintbit",
				permanent: true,
			},
			{
				source: "/ytdlp",
				destination: "/project/ytdg",
				permanent: true,
			},
			{
				source: "/ytdlg",
				destination: "/project/ytdg",
				permanent: true,
			},
			{
				source: "/yt-dlp-gui",
				destination: "/project/ytdg",
				permanent: true,
			},
			{
				source: "/minttriangles",
				destination: "/project/minttriangles",
				permanent: true,
			},
			{
				source: "/triangles",
				destination: "/project/minttriangles",
				permanent: true,
			},
			{
				source: "/727",
				destination: "/project/minttriangles",
				permanent: true,
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
