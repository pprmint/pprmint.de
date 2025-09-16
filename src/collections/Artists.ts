import { anyone } from "@/access/anyone";
import { withRole } from "@/access/withRole";
import { slugField } from "@/fields/slug";
import { CollectionConfig } from "payload";

export const Artists: CollectionConfig = {
	slug: "artists",
	access: {
		create: withRole(["admin"]),
		delete: withRole(["admin"]),
		read: anyone,
		update: withRole(["admin"]),
	},
	admin: {
		useAsTitle: "name",
		custom: {
			parent: "mina",
		},
		defaultColumns: ["name", "creditUrl"],
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
					admin: { width: "50%" },
				},
				{
					name: "creditUrl",
					label: "Credit URL",
					type: "text",
					admin: { width: "50%" },
				},
			],
		},
		{
			name: "creditLinks",
			label: "Credit links",
			type: "array",
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "service",
							type: "select",
							required: true,
							admin: {
								width: "50%"
							},
							options: [
								{
									label: "Twitter",
									value: "twitter",
								},
								{
									label: "Bluesky",
									value: "bsky",
								},
								{
									label: "Instagram",
									value: "instagram",
								},
								{
									label: "VGen",
									value: "vgen",
								},
								{
									label: "YouTube",
									value: "youtube",
								},
								{
									label: "Own website",
									value: "website",
								},
								{
									label: "Other",
									value: "other",
								},
							]
						},
						{
							name: "url",
							label: "URL",
							type: "text",
							required: true,
						}
					]
				}
			]
		},
		...slugField("name", {
			slugOverrides: { required: true },
		}),
		{
			name: "artworks",
			type: "join",
			collection: "mina",
			on: "artist",
		},
	],
};
