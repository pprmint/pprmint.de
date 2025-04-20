import type { CollectionConfig } from "payload";
import { anyone } from "../../access/anyone";
import { authenticated } from "../../access/authenticated";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { revalidateDelete, revalidatePage } from "./hooks/revalidate";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { slugField } from "@/fields/slug";

export const Graphics: CollectionConfig = {
	slug: "graphics",
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
			type: "row",
			admin: {
				position: "sidebar",
			},
			fields: [
				{
					name: "dimension",
					type: "select",
					defaultValue: "2d",
					required: true,
					admin: {
						width: "50%",
					},
					options: [
						{
							label: "2D",
							value: "2d",
						},
						{
							label: "3D",
							value: "3d",
						},
					],
				},
				{
					name: "type",
					type: "select",
					defaultValue: "static",
					required: true,
					admin: {
						width: "50%",
					},
					options: [
						{
							label: "Static",
							value: "static",
						},
						{
							label: "Animated",
							value: "animated",
						},
					],
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
					overrides: {
						calendarStartDay: 1,
						minDate: new Date("2010-01-01"),
					},
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
			name: "alt",
			label: "Alternative text",
			type: "text",
			localized: true,
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
