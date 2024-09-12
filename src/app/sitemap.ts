import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://pprmint.de",
			lastModified: new Date(),
			changeFrequency: "monthly",
			alternates: {
				languages: {
					en: "https://pprmint.de/en",
					de: "https://pprmint.de",
				},
			},
		},
		{
			url: "https://pprmint.de/mina",
			lastModified: new Date(),
			changeFrequency: "weekly",
			alternates: {
				languages: {
					en: "https://pprmint.de/en/mina",
					de: "https://pprmint.de/mina",
				},
			},
		},
		{
			url: "https://pprmint.de/contact",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/en/contact",
					de: "https://pprmint.de/contact",
				},
			},
		},
		{
			url: "https://pprmint.de/works/graphics",
			lastModified: new Date(),
			changeFrequency: "monthly",
			alternates: {
				languages: {
					en: "https://pprmint.de/en/works/graphics",
					de: "https://pprmint.de/works/graphics",
				},
			},
		},
		{
			url: "https://pprmint.de/privacy",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/en/privacy",
					de: "https://pprmint.de/privacy",
				},
			},
		},
		{
			url: "https://pprmint.de/ai",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/en/ai",
					de: "https://pprmint.de/ai",
				},
			},
		},
		{
			url: "https://pprmint.de/projects/appicons",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/en/projects/appicons",
					de: "https://pprmint.de/projects/appicons",
				},
			},
		},
		{
			url: "https://pprmint.de/projects/mintcraft",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/en/projects/mintcraft",
					de: "https://pprmint.de/projects/mintcraft",
				},
			},
		},
		{
			url: "https://pprmint.de/projects/ytdg",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/en/projects/ytdg",
					de: "https://pprmint.de/projects/ytdg",
				},
			},
		},
		{
			url: "https://pprmint.de/projects/mintbit",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/en/projects/mintbit",
					de: "https://pprmint.de/projects/mintbit",
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
		// 			en: "https://pprmint.de/en/projects/tentative",
		// 			de: "https://pprmint.de/projects/tentative",
		// 		},
		// 	},
		// },
		{
			url: "https://pprmint.de/projects/icons",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/en/projects/icons",
					de: "https://pprmint.de/projects/icons",
				},
			},
		},
		{
			url: "https://pprmint.de/projects/minttriangles",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/en/projects/minttriangles",
					de: "https://pprmint.de/projects/minttriangles",
				},
			},
		},
		{
			url: "https://pprmint.de/projects/autsellia",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.de/en/projects/autsellia",
					de: "https://pprmint.de/projects/autsellia",
				},
			},
		},
		{
			url: "https://pprmint.de/projects/minasans",
			lastModified: new Date(),
			changeFrequency: "monthly",
			alternates: {
				languages: {
					en: "https://pprmint.de/en/projects/minasans",
					de: "https://pprmint.de/projects/minasans",
				},
			},
		},
	];
}
