import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import React, { cache, Fragment } from "react";

import type { Article as ArticleType } from "@/payload-types";

import NotFound from "../../not-found";
import RichText from "@/components/richText";
import * as m from "motion/react-m";
import { getLocale, getFormatter, getTranslations } from "next-intl/server";
import Link from "next/link";
import { Media } from "@/components/Media";

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise });
	const articles = await payload.find({
		collection: "articles",
		draft: false,
		limit: undefined,
		overrideAccess: false,
		pagination: false,
		select: {
			slug: true,
		},
	});

	const params = articles.docs
		?.filter((doc) => {
			return doc.slug !== "home";
		})
		.map(({ slug }) => {
			return { slug };
		});

	return params;
}

type Args = {
	params: Promise<{
		slug?: string;
	}>;
};

export default async function Page({ params: paramsPromise }: Args) {
	const t = await getTranslations("ARTICLES");
	const format = await getFormatter();

	const { slug = "" } = await paramsPromise;

	let article: ArticleType | null;

	article = await queryArticleBySlug({
		slug,
	});

	if (!article) {
		return <NotFound />;
	}

	return (
		<main>
			<article className="relative border-b border-black/5 dark:border-white/5">
				<header className="relative flex justify-center px-6 md:px-9 lg:px-12 pb-9 items-end border-b border-black/5 dark:border-white/5 h-2/3-screen min-h-96">
					<Media resource={article.thumbnail} fill imgClassName="object-cover" />
					<div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-950" />
					<div className="relative md:text-center">
						<m.h1
							className="pb-1 md:pb-2 lg:pb-3 font-serif text-balance"
							initial={{ opacity: 0, filter: "blur(5px)", y: 20 }}
							animate={{
								opacity: 1,
								filter: "blur(0px)",
								y: 0,
								transition: {
									type: "spring",
									bounce: 0,
									duration: 0.75,
								},
							}}
						>
							{article.title}
						</m.h1>
						<m.p
							initial={{ opacity: 0, y: 40 }}
							animate={{
								opacity: 1,
								y: 0,
								transition: {
									type: "spring",
									bounce: 0,
									duration: 0.75,
									delay: 0.05,
								},
							}}
							className="text-xl md:text-2xl xl:text-3xl md:pr-9"
						>
							{article.description}
						</m.p>
						<m.p
							initial={{ opacity: 0, y: 40 }}
							animate={{
								opacity: 1,
								y: 0,
								transition: {
									type: "spring",
									bounce: 0,
									duration: 0.75,
									delay: 0.1,
								},
							}}
						>
							{format.dateTime(new Date(article.publishedAt), {
								day: "numeric",
								month: "long",
								year: "numeric",
							})}{" "}
							•{" "}
							{article.tags.map((tag, index) => (
								<Fragment key={tag}>
									<Link href={`/articles?tag=${tag}`}>{t(`Content.Tags.${tag}`)}</Link>
									{article.tags.length > 1 && index < article.tags.length - 1 && ", "}
								</Fragment>
							))}
						</m.p>
					</div>
				</header>
				<div className="relative max-w-6xl mx-auto px-6 md:px-9 lg:px-12">
					<RichText
						className="border-x border-black/5 dark:border-white/5 lg:text-lg py-20 md:py-32 xl:py-40 md:col-span-2 prose-h1:xl:text-7xl"
						data={article.content}
					/>
					<div
						aria-hidden
						className="absolute bottom-6 right-12 lg:right-16 lg:bottom-9 -rotate-6 font-serif italic font-thin font-stretch-extra-condensed text-neutral-950 dark:text-white text-6xl xl:text-7xl"
					>
						fin<span className="text-green">.</span>
					</div>
				</div>
			</article>
		</main>
	);
}

export async function generateMetadata({ params: paramsPromise }: Args) {
	const { slug = "" } = await paramsPromise;

	let article: ArticleType | null;

	article = await queryArticleBySlug({
		slug,
	});

	if (!article) {
		return null;
	}

	return {
		title: article.title,
		description: article.description,
		twitter: {
			images:
				(typeof article.thumbnail === "object" && article.thumbnail.sizes?.hd?.url) ||
				(typeof article.thumbnail === "object" && article.thumbnail.url),
		},
	};
}

const queryArticleBySlug = cache(async ({ slug }: { slug: string }) => {
	const locale = (await getLocale()) as "en" | "de" | "all" | undefined;
	const { isEnabled: draft } = await draftMode();

	const payload = await getPayload({ config: configPromise });

	const result = await payload.find({
		collection: "articles",
		draft,
		locale: locale,
		limit: 1,
		pagination: false,
		overrideAccess: draft,
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	return result.docs?.[0] || null;
});
