import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import { cache, Fragment, ViewTransition } from "react";
import { MNCelesta } from "@public/fonts/MNCelesta/MNCelesta";

import type { Article as ArticleType } from "@/payload-types";

import NotFound from "../../not-found";
import RichText from "@/components/richText";
import * as m from "motion/react-m";
import { getLocale, getFormatter, getTranslations } from "next-intl/server";
import Link from "next/link";
import { Media } from "@/components/Media";

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
				<header className="relative flex justify-center px-6 md:px-9 lg:px-12 pb-9 items-end border-b border-black/5 dark:border-white/5 aspect-square sm:aspect-2/1 lg:aspect-3/1 xl:aspect-auto xl:h-110">
					<div className="absolute inset-0 overflow-clip -z-10">
						<Media resource={article.thumbnail} fill imgClassName="object-cover" />
					</div>
					<div className="absolute inset-0 bg-linear-to-t from-neutral-950" />
					<div className="relative text-center">
						<m.h1
							className={`pb-1 md:pb-2 lg:pb-3 ${MNCelesta.className} text-balance text-white`}
							initial={{ opacity: 0, filter: "blur(5px)", y: 10 }}
							animate={{
								opacity: 1,
								filter: "blur(0px)",
								y: 0,
								transition: {
									type: "spring",
									bounce: 0,
									duration: 0.4,
								},
							}}
						>
							{article.title}
						</m.h1>
						<m.p
							initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
							animate={{
								opacity: 1,
								y: 0,
								filter: "blur(0px)",
								transition: {
									type: "spring",
									bounce: 0,
									duration: 0.4,
									delay: 0.05,
								},
							}}
							className="text-xl md:text-2xl xl:text-3xl text-white/75"
						>
							{article.description}
						</m.p>
						<m.p
							initial={{ opacity: 0, y: 10 }}
							animate={{
								opacity: 1,
								y: 0,
								transition: {
									type: "spring",
									bounce: 0,
									duration: 0.4,
									delay: 0.1,
								},
							}}
							className="text-white/75"
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
				<div className="relative max-w-7xl mx-auto sm:px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="sm:border-x border-black/5 dark:border-white/5 p-6 xl:p-9">
						<RichText
							className={`${MNCelesta.variable} xl:prose-h1:text-7xl prose-headings:font-serif`}
							data={article.content}
						/>
						<div
							aria-hidden
							className={`${MNCelesta.className} py-9 italic text-center text-neutral-950 dark:text-white text-6xl xl:text-7xl tracking-tight`}
						>
							fin<span className="text-green">.</span>
						</div>
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
