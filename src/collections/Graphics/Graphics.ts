import type { CollectionConfig } from "payload";
import { anyone } from "@/access/anyone";
import { withRole } from "@/access/withRole";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { revalidateDelete, revalidatePage } from "./hooks/revalidate";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { slugField } from "@/fields/slug";

export const Graphics: CollectionConfig = {
	slug: "graphics",
	access: {
		create: withRole(["admin"]),
		delete: withRole(["admin"]),
		read: anyone,
		update: withRole(["admin"]),
	},
	admin: {
		useAsTitle: "title",
		custom: {
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor"><circle cx="6" cy="4.5" r="1"></circle><circle cx="9" cy="4.5" r="1"></circle><circle cx="11" cy="6.5" r="1"></circle><circle cx="4" cy="6.5" r="1"></circle><path d="M8.349 12.53a.937.937 0 0 1-.545 1.485c-.186.119-.304.085-.304.085A6.603 6.603 0 0 1 .9 7.5C.9 3.857 3.857.9 7.5.9s6.6 2.957 6.6 6.6a2.5 2.5 0 0 1-2.5 2.5H9.55a1.551 1.551 0 0 0-1.204 2.525zm-1.007.568.065-.061h.072A2.552 2.552 0 0 1 9.55 9h2.05a1.5 1.5 0 0 0 1.5-1.5c0-3.091-2.509-5.6-5.6-5.6a5.6 5.6 0 0 0-5.6 5.6 5.604 5.604 0 0 0 5.442 5.598"></path></svg>',
		},
		pagination: {
			limits: [12, 24, 48, 60, 120],
			defaultLimit: 24,
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
