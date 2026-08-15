import configPromise from "@payload-config";
import { getPayload } from "payload";
import { draftMode } from "next/headers";
import React, { cache, Fragment } from "react";

import type { Graphic as GraphicType } from "@/payload-types";

import NotFound from "../../not-found";
import RichText from "@/components/richText";
import * as m from "motion/react-m";
import { getLocale, getFormatter, getTranslations } from "next-intl/server";
import Link from "next/link";
import Title from "@/components/layout/Title";

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
			<Title title={graphic.title} description={graphic.description} />
			<main className="border-y border-black/5 dark:border-white/5">
				<article className="relative max-w-7xl mx-auto p-6 xl:p-9 border-x border-black/5 dark:border-white/5">
					<RichText
						className="lg:text-lg xl:prose-h1:text-7xl *:first:pt-0"
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

	if (!graphic) {
		return null;
	}

	return {
		title: graphic.title,
		description: graphic.description,
		twitter: {
			images:
				(typeof graphic.thumbnail === "object" && graphic.thumbnail.sizes?.hd?.url) ||
				(typeof graphic.thumbnail === "object" && graphic.thumbnail.url),
		},
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
