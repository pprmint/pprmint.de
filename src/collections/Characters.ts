import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

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
				},
				{
					name: "owner",
					type: "text",
					required: true,
				},
				{
					name: "link",
					type: "text",
				},
			],
		},
	],
};
