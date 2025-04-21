import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Lenses: CollectionConfig = {
	slug: "lenses",
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	admin: {
		useAsTitle: "name",
		custom: {
			parent: "photos",
		},
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
	],
};
