import Title from "@/components/layout/Title";
import config from "@payload-config";
import { getPayload } from "payload";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import Pagination from "@/components/gallery/Pagination";
import FadingImage from "@/components/ui/FadingImage";
import { Fragment } from "react";

export async function generateMetadata() {
	const t = await getTranslations("ARTICLES");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default async function Page({ searchParams }: { searchParams: Promise<{ p?: string; tag?: string }> }) {
	const { p = "1", tag = "" } = await searchParams;
	const locale = (await getLocale()) as "en" | "de" | "all" | undefined;
	const format = await getFormatter();
	const t = await getTranslations("ARTICLES");
	const payload = await getPayload({ config });
	const articles = await payload.find({
		collection: "articles",
		draft: false,
		limit: 10,
		overrideAccess: false,
		locale: locale,
		pagination: true,
		page: parseInt(p),
		where: {
			tags: {
				contains: tag,
			},
		},
		select: {
			title: true,
			description: true,
			thumbnail: true,
			publishedAt: true,
			slug: true,
			tags: true,
		},
	});
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")} />
			<main className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
				<section className="border-l border-t border-black/5 dark:border-white/5">
					<div className="sm:grid sm:grid-cols-2 lg:grid-cols-1 3xl:grid-cols-2">
						{articles.docs.map((article, index) => (
							<Fragment key={article.id}>
								<Link
									href={`/articles/${article.slug}`}
									className="flex border-b border-r border-black/5 dark:border-white/5"
								>
									<div className="flex grow md:gap-3 lg:gap-6 flex-col lg:flex-row lg:items-center hover:bg-black/5 dark:hover:bg-white/5 duration-100">
										<div className="lg:h-44 2xl:h-48 relative aspect-video overflow-clip">
											{typeof article.thumbnail === "object" && (
												<FadingImage
													src={article.thumbnail.sizes?.hd?.url || ""}
													alt={article.thumbnail.alt || ""}
													width={article.thumbnail.sizes?.hd?.width || 0}
													height={article.thumbnail.sizes?.hd?.height || 0}
												/>
											)}
										</div>
										<div className="pt-2 pb-9 lg:pb-3 pr-6">
											<div className="text-xs my-1.5">
												{format.dateTime(new Date(article.publishedAt), {
													day: "numeric",
													month: "long",
													year: "numeric",
												})}{" "}
												•{" "}
												{article.tags.map((tag, tagIndex) => (
													<Fragment key={tag}>
														<span>{t(`Content.Tags.${tag}`)}</span>
														{article.tags.length > 1 &&
															tagIndex < article.tags.length - 1 &&
															", "}
													</Fragment>
												))}
											</div>
											<h2 className="pb-1.5">{article.title}</h2>
											<div>{article.description}</div>
										</div>
									</div>
								</Link>
								{index === articles.docs.length - 1 && index % 2 !== 1 && (
									<div className="hidden sm:block lg:hidden 3xl:block border-b border-r border-black/5 dark:border-white/5" />
								)}
							</Fragment>
						))}
					</div>
				</section>
				<div className="border-x border-black/5 dark:border-white/5">
					<Pagination page={parseInt(p)} pageCount={articles.totalPages} />
				</div>
			</main>
		</>
	);
}
