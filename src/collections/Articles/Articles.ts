import type { CollectionConfig } from "payload";
import { anyone } from "../../access/anyone";
import { authenticated } from "../../access/authenticated";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { revalidateDelete, revalidatePage } from "./hooks/revalidate";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { slugField } from "@/fields/slug";

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
		custom: {
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor"><path d="M6 2h7v1h-2v10h-1V3H8v10H7V9l-1 .001C4 9.001 2.465 7.5 2.465 5.5S4 2 6 2"></path></svg>',
		},
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
		...slugField(),
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
				},
			},
		},
		{
			name: "thumbnail",
			type: "upload",
			relationTo: "assets",
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
