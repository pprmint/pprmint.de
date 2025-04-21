import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Downloads: CollectionConfig = {
	slug: "download",
	admin: {
		custom: {
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor"><path d="M2 2.5C2 1.67 2.67 1 3.5 1h5.59c.4 0 .78.16 1.06.44l2.41 2.41c.28.28.44.67.44 1.06v7.59c0 .83-.67 1.5-1.5 1.5h-8A1.5 1.5 0 0 1 2 12.5v-10Zm1 0v10c0 .28.22.5.5.5h8a.5.5 0 0 0 .5-.5V4.91a.5.5 0 0 0-.15-.35L9.44 2.15A.5.5 0 0 0 9.09 2H3.5a.5.5 0 0 0-.5.5Z"/></svg>',
		},
	},
	labels: {
		singular: "File",
		plural: "Files",
	},
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	upload: true,
	fields: [],
};
