import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import { slugField } from "@/fields/slug";

export const Outfits: CollectionConfig = {
	slug: "outfits",
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
					localized: true,
					admin: {
						width: "50%",
					},
				},
				{
					name: "designer",
					type: "relationship",
					relationTo: "artists",
					admin: {
						width: "50%",
						sortOptions: "name",
						isSortable: true,
					},
				},
			],
		},
		...slugField("name", {
			slugOverrides: { required: true },
		}),
	],
};
