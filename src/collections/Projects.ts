import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

export const Projects: CollectionConfig = {
	slug: "projects",
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
			type: "row",
			fields: [
				{
					name: "title",
					type: "text",
					required: true,
					localized: true,
				},
				{
					name: "description",
					type: "text",
					required: true,
					localized: true,
				},
				{
					name: "tags",
					type: "select",
					options: [
						{
							label: "Font",
							value: "font"
						},
						{
							label: "Design thing",
							value: "design"
						},
						{
							label: "Website",
							value: "website"
						},
						{
							label: "Software",
							value: "software"
						},
						{
							label: "Customization",
							value: "customization"
						},
					]
				}
			],
		},
		{
			name: "content",
			type: "richText",
			required: true,
		}
	],
};
