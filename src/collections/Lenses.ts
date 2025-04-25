import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import { withRole } from "@/access/withRole";

export const Lenses: CollectionConfig = {
	slug: "lenses",
	access: {
		create: withRole(["admin"]),
		delete: withRole(["admin"]),
		read: anyone,
		update: withRole(["admin"]),
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
