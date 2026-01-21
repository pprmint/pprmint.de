const { withPayload } = require("@payloadcms/next/withPayload");
/** @type {import("next").NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

const NEXT_PUBLIC_SERVER_URL = process.env.COOLIFY_FQDN
	? `https://${process.env.COOLIFY_FQDN}`
	: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

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

module.exports = withPayload(
	withNextIntl({
		reactStrictMode: false,
		images: {
			remotePatterns: [
				{
					hostname: "*.pprmint.de",
					protocol: "https",
				},
				{
					hostname: "pprmint.de",
					protocol: "https",
				},
				...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
					const url = new URL(item);
					return {
						hostname: url.hostname,
						protocol: url.protocol.replace(":", ""),
					};
				}),
			],
			localPatterns: [
				{
					pathname: "/api/**",
				},
			],
		},
		async redirects() {
			return [
				{
					source: "/en/:slug*",
					destination: "/:slug*",
					permanent: true,
				},
				{
					source: "/de/:slug*",
					destination: "/:slug*",
					permanent: true,
				},
				{
					source: "/works",
					destination: "/graphics",
					permanent: false,
				},
				{
					source: "/gallery",
					destination: "/graphics",
					permanent: false,
				},
				{
					source: "/works/gallery",
					destination: "/graphics",
					permanent: false,
				},
				{
					source: "/works/graphics",
					destination: "/graphics",
					permanent: false,
				},
				{
					source: "/works/photos",
					destination: "/photos",
					permanent: false,
				},
				{
					source: "/project/:slug*",
					destination: "/projects/:slug*",
					permanent: false,
				},
				{
					source: "/minasans",
					destination: "/projects/varia",
					permanent: false,
				},
				{
					source: "/projects/minasans",
					destination: "/projects/varia",
					permanent: false,
				},
				{
					source: "/varia",
					destination: "/projects/varia",
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
				{
					source: "/pomifuri",
					destination: "https://pomi.moe",
					permanent: false,
				},
				{
					source: "/projects/pomifuri",
					destination: "https://pomi.moe",
					permanent: false,
				},
				{
					source: "/autsellia",
					destination: "https://autsellia.com",
					permanent: false,
				},
				{
					source: "/projects/autsellia",
					destination: "https://autsellia.com",
					permanent: false,
				},
				{
					source: "/tentative",
					destination: "https://tentative.name",
					permanent: false,
				},
				{
					source: "/projects/tentative",
					destination: "https://tentative.name",
					permanent: false,
				},
			];
		},
		async headers() {
			return [
				{
					source: "/:path*",
					headers: securityHeaders,
				},
			];
		},
	}),
);
