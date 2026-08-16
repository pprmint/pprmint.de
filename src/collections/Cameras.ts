import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { withRole } from "@/access/withRole";
import { slugField } from "@/fields/slug";

export const Cameras: CollectionConfig = {
	slug: "cameras",
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
			admin: {
				width: "50%",
			},
		},
		...slugField("name", {
			slugOverrides: {
				required: true,
				admin: {
					position: "sidebar",
				},
			},
		}),
		{
			type: "row",
			fields: [
				{
					name: "svgLogo",
					label: "Logo (SVG)",
					type: "code",
					validate: (val) => {
						if (!val) return true;
						const pattern = /<\s*svg[^>]*>(.*?)<\s*\/\s*svg>/g;
						return pattern.test(val.toString()) || "This doesn't look like a valid SVG.";
					},
					admin: {
						width: "50%",
						language: "xml",
						editorOptions: {
							lineNumbers: "off",
						},
					},
				},
				{
					name: "svgIcon",
					label: "Icon (SVG)",
					type: "code",
					validate: (val) => {
						if (!val) return true;
						const pattern = /<\s*svg[^>]*>(.*?)<\s*\/\s*svg>/g;
						return pattern.test(val.toString()) || "This doesn't look like a valid SVG.";
					},
					admin: {
						width: "50%",
						language: "xml",
						editorOptions: {
							lineNumbers: "off",
						},
					},
				},
			],
		},
		{
			name: "photos",
			type: "join",
			collection: "photos",
			on: "camera",
			admin: {
				position: "sidebar",
			},
		},
	],
};
