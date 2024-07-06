import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://pprmint.art",
			lastModified: new Date(),
			changeFrequency: "monthly",
			alternates: {
				languages: {
					en: "https://pprmint.art",
					de: "https://pprmint.art/de",
				},
			},
		},
		{
			url: "https://pprmint.art/mina",
			lastModified: new Date(),
			changeFrequency: "weekly",
			alternates: {
				languages: {
					en: "https://pprmint.art/mina",
					de: "https://pprmint.art/de/mina",
				},
			},
		},
		{
			url: "https://pprmint.art/contact",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.art/contact",
					de: "https://pprmint.art/de/contact",
				},
			},
		},
		{
			url: "https://pprmint.art/gallery",
			lastModified: new Date(),
			changeFrequency: "monthly",
			alternates: {
				languages: {
					en: "https://pprmint.art/gallery",
					de: "https://pprmint.art/de/gallery",
				},
			},
		},
		{
			url: "https://pprmint.art/privacy",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.art/privacy",
					de: "https://pprmint.art/de/privacy",
				},
			},
		},
		{
			url: "https://pprmint.art/ai",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.art/ai",
					de: "https://pprmint.art/de/ai",
				},
			},
		},
		{
			url: "https://pprmint.art/projects/appicons",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.art/projects/appicons",
					de: "https://pprmint.art/de/projects/appicons",
				},
			},
		},
		{
			url: "https://pprmint.art/projects/mintcraft",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.art/projects/mintcraft",
					de: "https://pprmint.art/de/projects/mintcraft",
				},
			},
		},
		{
			url: "https://pprmint.art/projects/ytdg",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.art/projects/ytdg",
					de: "https://pprmint.art/de/projects/ytdg",
				},
			},
		},
		{
			url: "https://pprmint.art/projects/mintbit",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.art/projects/mintbit",
					de: "https://pprmint.art/de/projects/mintbit",
				},
			},
		},
		// Still unfinished.
    // {
		// 	url: "https://pprmint.art/projects/tentative",
		// 	lastModified: new Date(),
		// 	changeFrequency: "yearly",
		// 	alternates: {
		// 		languages: {
		// 			en: "https://pprmint.art/projects/tentative",
		// 			de: "https://pprmint.art/de/projects/tentative",
		// 		},
		// 	},
		// },
		{
			url: "https://pprmint.art/projects/icons",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.art/projects/icons",
					de: "https://pprmint.art/de/projects/icons",
				},
			},
		},
		{
			url: "https://pprmint.art/projects/minttriangles",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.art/projects/minttriangles",
					de: "https://pprmint.art/de/projects/minttriangles",
				},
			},
		},
		{
			url: "https://pprmint.art/projects/autsellia",
			lastModified: new Date(),
			changeFrequency: "yearly",
			alternates: {
				languages: {
					en: "https://pprmint.art/projects/autsellia",
					de: "https://pprmint.art/de/projects/autsellia",
				},
			},
		},
		{
			url: "https://pprmint.art/projects/minasans",
			lastModified: new Date(),
			changeFrequency: "monthly",
			alternates: {
				languages: {
					en: "https://pprmint.art/projects/minasans",
					de: "https://pprmint.art/de/projects/minasans",
				},
			},
		},
	];
}
