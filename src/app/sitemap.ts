import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://pprmint.de",
			lastModified: new Date(),
			changeFrequency: "monthly",
			alternates: {
				languages: {
					en: "https://pprmint.de",
					de: "https://pprmint.de/de",
				},
			},
		},
		{
			url: "https://pprmint.de/mina",
			lastModified: new Date(),
			changeFrequency: "weekly",
			alternates: {
				languages: {
					en: "https://pprmint.de/mina",
					de: "https://pprmint.de/de/mina",
				},
			},
		},
		{
			url: "https://pprmint.de/contact",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/contact",
					de: "https://pprmint.de/de/contact",
				},
			},
		},
		{
			url: "https://pprmint.de/gallery",
			lastModified: new Date(),
			changeFrequency: "monthly",
			alternates: {
				languages: {
					en: "https://pprmint.de/gallery",
					de: "https://pprmint.de/de/gallery",
				},
			},
		},
		{
			url: "https://pprmint.de/privacy",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/privacy",
					de: "https://pprmint.de/de/privacy",
				},
			},
		},
		{
			url: "https://pprmint.de/ai",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/ai",
					de: "https://pprmint.de/de/ai",
				},
			},
		},
		{
			url: "https://pprmint.de/projects/appicons",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/projects/appicons",
					de: "https://pprmint.de/de/projects/appicons",
				},
			},
		},
		{
			url: "https://pprmint.de/projects/mintcraft",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/projects/mintcraft",
					de: "https://pprmint.de/de/projects/mintcraft",
				},
			},
		},
		{
			url: "https://pprmint.de/projects/ytdg",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/projects/ytdg",
					de: "https://pprmint.de/de/projects/ytdg",
				},
			},
		},
		{
			url: "https://pprmint.de/projects/mintbit",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/projects/mintbit",
					de: "https://pprmint.de/de/projects/mintbit",
				},
			},
		},
		// Still unfinished.
    // {
		// 	url: "https://pprmint.de/projects/tentative",
		// 	lastModified: new Date(),
		// 	changeFrequency: "yearly",
		// 	alternates: {
		// 		languages: {
		// 			en: "https://pprmint.de/projects/tentative",
		// 			de: "https://pprmint.de/de/projects/tentative",
		// 		},
		// 	},
		// },
		{
			url: "https://pprmint.de/projects/icons",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/projects/icons",
					de: "https://pprmint.de/de/projects/icons",
				},
			},
		},
		{
			url: "https://pprmint.de/projects/minttriangles",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/projects/minttriangles",
					de: "https://pprmint.de/de/projects/minttriangles",
				},
			},
		},
		{
			url: "https://pprmint.de/projects/autsellia",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/projects/autsellia",
					de: "https://pprmint.de/de/projects/autsellia",
				},
			},
		},
		{
			url: "https://pprmint.de/projects/minasans",
			lastModified: new Date(),
			changeFrequency: "monthly",
			alternates: {
				languages: {
					en: "https://pprmint.de/projects/minasans",
					de: "https://pprmint.de/de/projects/minasans",
				},
			},
		},
	];
}
