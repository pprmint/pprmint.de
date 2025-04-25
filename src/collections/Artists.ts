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
