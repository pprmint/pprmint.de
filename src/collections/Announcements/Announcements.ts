import { anyone } from "@/access/anyone";
import { withRole } from "@/access/withRole";
import type { CollectionConfig } from "payload";
import { revalidateDelete, revalidateChange } from "./hooks/revalidate";
import { fieldWithRole } from "@/access/fieldWithRole";

export const Announcements: CollectionConfig = {
	slug: "announcements",
	access: {
		create: withRole(["admin"]),
		delete: withRole(["admin"]),
		read: anyone,
		update: withRole(["admin", "editor"]),
	},
	admin: {
		useAsTitle: "title",
		custom: {
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor"><circle cx="7.5" cy="4.5" r=".75"></circle><path d="M7.5.9c3.643 0 6.6 2.957 6.6 6.6s-2.957 6.6-6.6 6.6A6.603 6.603 0 0 1 .9 7.5C.9 3.857 3.857.9 7.5.9m0 1a5.6 5.6 0 0 0-5.6 5.6c0 3.091 2.509 5.6 5.6 5.6s5.6-2.509 5.6-5.6-2.509-5.6-5.6-5.6"></path><path d="M8.5 10h.499L9 11h-.5A1.503 1.503 0 0 1 7 9.5V7H6V6h2v3.5c0 .133.053.26.146.354A.5.5 0 0 0 8.5 10"></path></svg>',
		},
	},
	fields: [
		{
			name: "alt",
			label: "Alternative text",
			type: "text",
			localized: true,
			access: {
				create: fieldWithRole(["admin"]),
				update: fieldWithRole(["admin", "editor"]),
			},
		},
		{
			name: "title",
			type: "text",
			required: true,
			localized: true,
			access: {
				create: fieldWithRole(["admin"]),
				update: fieldWithRole(["admin"]),
			},
		},
		{
			name: "text",
			type: "richText",
			required: true,
			localized: true,
			access: {
				create: fieldWithRole(["admin"]),
				update: fieldWithRole(["admin"]),
			},
		},
		{
			type: "row",
			fields: [
				{
					name: "link",
					type: "text",
					access: {
						create: fieldWithRole(["admin"]),
						update: fieldWithRole(["admin"]),
					},
				},
				{
					name: "linkText",
					label: "Link text",
					type: "text",
					localized: true,
					access: {
						create: fieldWithRole(["admin"]),
						update: fieldWithRole(["admin"]),
					},
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
