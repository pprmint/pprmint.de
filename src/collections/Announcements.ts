import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import type { CollectionConfig } from "payload";

export const Announcements: CollectionConfig = {
	slug: "announcements",
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	admin: {
		useAsTitle: "title",
	},
	fields: [
		{
			name: "image",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "title",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "text",
			type: "richText",
			required: true,
			localized: true,
		},
		{
			type: "row",
			fields: [
				{
					name: "link",
					type: "text",
				},
				{
					name: "linkText",
					label: "Link text",
					type: "text",
					localized: true,
				},
			],
		},
	],
};
