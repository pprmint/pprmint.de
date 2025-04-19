import type { CollectionConfig } from "payload";
import { anyone } from "../../access/anyone";
import { authenticated } from "../../access/authenticated";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { revalidateDelete, revalidatePage } from "./hooks/revalidateArticle";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { MediaBlock } from "@/blocks/MediaBlock/config";

export const Articles: CollectionConfig = {
	slug: "articles",
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	admin: {
		useAsTitle: "title",
	},
	defaultPopulate: {
		title: true,
		slug: true,
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
			localized: true,
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "slug",
			type: "text",
			required: true,
			localized: false,
			unique: true,
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "description",
			type: "text",
			required: true,
			localized: true,
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "tags",
			type: "select",
			hasMany: true,
			required: true,
			admin: {
				position: "sidebar",
			},
			options: [
				{
					label: "Font",
					value: "font",
				},
				{
					label: "Design thing",
					value: "design",
				},
				{
					label: "Website",
					value: "website",
				},
				{
					label: "Software",
					value: "software",
				},
				{
					label: "Ramblings",
					value: "ramblings",
				},
			],
		},
		{
			name: "publishedAt",
			label: "Publishing date",
			type: "date",
			required: true,
			admin: {
				position: "sidebar",
				date: {
					displayFormat: "dd. MMMM yyy",
				}
			},
		},
		{
			name: "thumbnail",
			type: "upload",
			relationTo: "media",
			required: true,
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "content",
			type: "richText",
			required: true,
			localized: true,
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [
					...defaultFeatures,
					BlocksFeature({
						blocks: [MediaBlock],
					}),
				],
			}),
		},
	],
	hooks: {
		afterChange: [revalidatePage],
		beforeChange: [populatePublishedAt],
		afterDelete: [revalidateDelete],
	},
	versions: {
		drafts: {
			autosave: {
				interval: 5000,
			},
		},
		maxPerDoc: 50,
	},
};
