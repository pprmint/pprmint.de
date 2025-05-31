"use server";

import { cookies, headers } from "next/headers";
import { Locale, defaultLocale, locales } from "./config";

const COOKIE_NAME = "locale";

export async function getUserLocale() {
	// Check for existing cookie.
	const cookieLocale = (await cookies()).get(COOKIE_NAME)?.value as Locale;

	if (cookieLocale && locales.includes(cookieLocale)) {
		return cookieLocale;
	}

	// Check for Accept-Language header from browser.
	const acceptLanguage = (await headers()).get("Accept-Language");
	if (acceptLanguage) {
		const languages = acceptLanguage
			.split(",")
			.map((lang) => lang.split(";")[0].trim().toLowerCase()) // Split up into array.
			.map((lang) => lang.split("-")[0]); // Remove subtags like -US or -AT

		const match = languages.find((lang) => locales.includes(lang as Locale));
		if (match) return match;
	}

	// If all else fails, use what most people here probably use anyways.
	return defaultLocale;
}

export async function setUserLocale(locale: Locale) {
	(await cookies()).set(COOKIE_NAME, locale, { maxAge: 60 * 60 * 24 * 365 });
}
