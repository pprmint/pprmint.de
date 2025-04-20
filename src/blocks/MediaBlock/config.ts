import type { Block } from "payload";

export const MediaBlock: Block = {
	slug: "mediaBlock",
	interfaceName: "MediaBlock",
	labels: {
		singular: "Media",
		plural: "Media blocks",
	},
	fields: [
		{
			name: "media",
			type: "upload",
			relationTo: "assets",
			required: true,
		},
	],
};
