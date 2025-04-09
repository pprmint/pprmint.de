import { CollectionConfig } from "payload";

export const Artists: CollectionConfig = {
	slug: "artists",
	access: {
		read: () => true,
	},
	admin: {
		useAsTitle: "name",
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "creditUrl",
			label: "Credit URL",
			type: "text",
			admin: {
				position: "sidebar",
			},
		},

		{
			name: "artworks",
			type: "join",
			collection: "mina",
			on: "artist",
		},
	],
};
