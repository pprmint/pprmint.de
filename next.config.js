/** @type {import("next").NextConfig} */
const nextTranslate = require("next-translate-plugin");

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
module.exports = nextTranslate({
	reactStrictMode: true,
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
				source: "/projects",
				destination: "/",
				permanent: true,
			},
			{
				source: "/mintcraft",
				destination: "/projects/mintcraft",
				permanent: true,
			},
			{
				source: "/appicons",
				destination: "/projects/appicons",
				permanent: true,
			},
			{
				source: "/mintsans",
				destination: "/projects/mintsans",
				permanent: true,
			},
			{
				source: "/mintbit",
				destination: "/projects/mintbit",
				permanent: true,
			},
			{
				source: "/yt-dlp-gui",
				destination: "/projects/ytdg",
				permanent: true,
			},
			{
				source: "/kozu",
				destination: "/mina",
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
