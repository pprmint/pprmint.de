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
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "creditLinks",
			label: "Credit links",
			labels: {
				singular: "Credit link",
				plural: "Credit links",
			},
			type: "array",
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "service",
							type: "select",
							required: true,
							defaultValue: "Twitter",
							admin: {
								width: "50%",
							},
							options: ["Twitter", "Bluesky", "Instagram", "VGen", "YouTube", "Website"],
						},
						{
							name: "url",
							label: "URL",
							type: "text",
							required: true,
						},
					],
				},
			],
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
