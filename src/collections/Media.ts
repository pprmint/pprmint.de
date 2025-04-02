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
		{
			name: "caption",
			type: "richText",
			localized: true,
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()];
				},
			}),
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
				width: 720,
				height: 480,
			},
			{
				name: "hd",
				width: 1280,
				height: 720,
			},
			{
				name: "fhd",
				width: 1920,
				height: 1080,
			},
		],
	},
};
