/** @type {import("next").NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
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
				hostname: "**.pprmint.de",
			},
		],
	},
	devIndicators: {
		appIsrStatus: false,
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
				// Apply these headers to all routes in your application.
				source: "/:path*",
				headers: securityHeaders,
			},
		];
	},
});


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: "pprmint",
    project: "pprmint-de",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Automatically annotate React components to show their full name in breadcrumbs and session replay
    reactComponentAnnotation: {
      enabled: true,
    },

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
