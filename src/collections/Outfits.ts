import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { slugField } from "@/fields/slug";
import { withRole } from "@/access/withRole";

export const Outfits: CollectionConfig = {
	slug: "outfits",
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
		defaultColumns: ["name", "designer"],
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
		{
			name: "artworks",
			type: "join",
			collection: "mina",
			on: "outfit",
		},
		...slugField("name", {
			slugOverrides: { required: true },
		}),
	],
};
