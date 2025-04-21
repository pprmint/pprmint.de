import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Assets: CollectionConfig = {
	slug: "assets",
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	admin: {
		custom: {
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor"><path d="M14 2.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 12.5v-10A1.5 1.5 0 0 1 2.5 1h10A1.5 1.5 0 0 1 14 2.5m-1 6.79V2.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v8.793l3.5-3.5 2.058 2.058 2.934-3.076zM2.032 12.675A.5.5 0 0 0 2.5 13h10a.5.5 0 0 0 .5-.5v-1.793l-2.492-2.499-2.933 3.074L5.5 9.207z"></path><circle cx="5" cy="5" r="1.5"></circle></svg>',
		},
	},
	fields: [
		{
			name: "alt",
			label: "Alternative text",
			type: "text",
			localized: true,
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
