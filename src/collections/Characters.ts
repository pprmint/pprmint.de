import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { slugField } from "@/fields/slug";
import { withRole } from "@/access/withRole";

export const Characters: CollectionConfig = {
	slug: "characters",
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
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
					admin: {
						width: "33.333%",
					},
				},
				{
					name: "owner",
					type: "text",
					admin: {
						width: "33.333%",
					},
				},
				{
					name: "link",
					type: "text",
					admin: {
						width: "33.333%",
					},
				},
			],
		},
		{
			name: "artworks",
			type: "join",
			collection: "mina",
			on: "featuring",
		},
		...slugField("name", {
			slugOverrides: { required: true },
		}),
	],
};
