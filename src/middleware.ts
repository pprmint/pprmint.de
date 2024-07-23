import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./navigation";

export default createMiddleware({
	defaultLocale: "de",
	localePrefix,
	locales,
});

export const config = {
	// Match only internationalized pathnames
	matcher: ["/", "/(en|de)/:path*/((?!twitter-image))", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
