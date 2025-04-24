import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import { slugField } from "@/fields/slug";

export const Characters: CollectionConfig = {
	slug: "characters",
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
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
		...slugField("name", {
			slugOverrides: { required: true },
		}),
	],
};
