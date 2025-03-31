import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

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
			type: "row",
			fields: [
				{
					name: "altEn",
					label: "Alternative text (English)",
					type: "text",
					// required: true,
				},
				{
					name: "altDe",
					label: "Alternative text (German)",
					type: "text",
					// required: true,
				},
			],
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
