import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import type { CollectionConfig } from "payload";
import { revalidateDelete, revalidateChange } from "./hooks/revalidate";

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
			name: "alt",
			label: "Alternative text",
			type: "text",
			localized: true,
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
	upload: {
		adminThumbnail: "thumbnail",
		imageSizes: [
			{
				name: "thumbnail",
				width: 320,
				height: 180,
			},
			{
				name: "fhd",
				width: 1920,
				height: 1080,
			},
		],
		resizeOptions: {
			fit: "cover",
		},
	},
	hooks: {
		afterChange: [revalidateChange],
		afterDelete: [revalidateDelete],
	},
};
