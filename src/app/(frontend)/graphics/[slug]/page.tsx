import type { Metadata } from "next";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import React, { cache, Fragment } from "react";

import type { Graphic as GraphicType } from "@/payload-types";

import NotFound from "../../not-found";
import RichText from "@/components/richText";
import * as m from "motion/react-m";
import { getLocale, getFormatter, getTranslations } from "next-intl/server";
import Button from "@/components/ui/Button";
import Link from "next/link";

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise });
	const graphics = await payload.find({
		collection: "graphics",
		draft: false,
		limit: 1000,
		overrideAccess: false,
		pagination: false,
		select: {
			slug: true,
		},
	});

	const params = graphics.docs
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
	const t = await getTranslations("GRAPHICS");
	const format = await getFormatter();

	const { slug = "" } = await paramsPromise;

	let graphic: GraphicType | null;

	graphic = await queryGraphicBySlug({
		slug,
	});

	if (!graphic) {
		return <NotFound />;
	}

	return (
		<>
			<main className="max-w-8xl mx-auto px-6 md:px-9 xl:px-20">
				<article className="relative md:grid md:grid-cols-3 md:col-span-2 border-x border-b border-black/5 dark:border-white/5">
					<div className="md:sticky h-max pt-28 md:pt-32 xl:pt-40 top-0">
						<m.h1
							className="relative pb-1 md:pb-2 lg:pb-3 font-serif text-balance md:pr-9 xl:text-6xl"
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
							{graphic.title}
							<span className="text-green">.</span>
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
							{graphic.description}
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
							{format.dateTime(new Date(graphic.publishedAt), {
								day: "numeric",
								month: "long",
								year: "numeric",
							})}{" "}
							•{" "}
							<Link href={`/graphics?dimension=${graphic.dimension}`}>
								{graphic.dimension.toUpperCase()}
							</Link>
							,{" "}
							{graphic.type.length === 0 ? (
								<Link href={`/graphics?type=${graphic.type}`}>
									{t(`Content.Filters.Type.${graphic.type}`)}
								</Link>
							) : (
								graphic.type.map((type, index) => (
									<Fragment key={index}>
										{index > 0 && " & "}
										<Link href={`/graphics?type=${type}`}>
											{index > 0
												? t(`Content.Filters.Type.${type}`).toLowerCase()
												: t(`Content.Filters.Type.${type}`)}
										</Link>
									</Fragment>
								))
							)}
						</m.p>
					</div>
					<RichText
						className="lg:text-lg py-20 md:py-32 xl:py-40 md:col-span-2 prose-h1:xl:text-7xl md:border-l border-black/5 dark:border-white/5"
						data={graphic.content}
					/>
				</article>
			</main>
		</>
	);
}

export async function generateMetadata({ params: paramsPromise }: Args) {
	const { slug = "" } = await paramsPromise;

	let graphic: GraphicType | null;

	graphic = await queryGraphicBySlug({
		slug,
	});

	return {
		title: graphic.title,
		description: graphic.description,
		twitter: {
			images: typeof graphic.thumbnail === "object" && graphic.thumbnail.sizes?.hd?.url || typeof graphic.thumbnail === "object" && graphic.thumbnail.url
		}
	};
}

const queryGraphicBySlug = cache(async ({ slug }: { slug: string }) => {
	const locale = (await getLocale()) as "en" | "de" | "all" | undefined;
	const { isEnabled: draft } = await draftMode();

	const payload = await getPayload({ config: configPromise });

	const result = await payload.find({
		collection: "graphics",
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
