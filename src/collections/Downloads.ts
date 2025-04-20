import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Downloads: CollectionConfig = {
	slug: "download",
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
