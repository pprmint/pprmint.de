import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

export const Media: CollectionConfig = {
	slug: "media",
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	fields: [
		{
			name: "alt",
			label: "Alternative text",
			type: "text",
			localized: true,
			// required: true,
		},
	],
	upload: {
		focalPoint: true,
		adminThumbnail: "thumbnail",
		imageSizes: [
			{
				name: "thumbnail",
				width: 320,
				height: undefined,
			},
			{
				name: "sd",
				width: undefined,
				height: 480,
			},
			{
				name: "hd",
				width: undefined,
				height: 720,
			},
			{
				name: "fhd",
				width: undefined,
				height: 1080,
			},
		],
	},
};
