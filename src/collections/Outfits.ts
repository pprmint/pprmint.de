import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

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
				},
				{
					name: "designer",
					type: "relationship",
					relationTo: "artists",
					required: true,
				},
			],
		},
	],
};
