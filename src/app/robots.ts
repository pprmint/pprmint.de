import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: ["Googlebot", "Bingbot", "DuckDuckBot", "Slurp", "Applebot"],
				disallow: ["/redirect", "/de/redirect"],
				allow: ["/"],
			},
			{
				userAgent: [
					"Applebot-Extended",
					"Amazonbot",
					"anthropic-ai",
					"Bytespider",
					"CCBot",
					"ChatGPT-User",
					"GPTBot",
					"ClaudeBot",
					"cohere-ai",
					"Diffbot",
					"FacebookBot",
					"Google-Extended",
					"ImagesiftBot",
					"omgili",
					"omgilibot",
					"PerplexityBot",
					"Scrapy",
				],
				allow: ["/ai"],
				disallow: ["/"],
			},
			{
				userAgent: "*",
				disallow: ["/"],
			},
		],
		sitemap: "https://pprmint.de/sitemap.xml",
	};
}
