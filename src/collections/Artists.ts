import { CollectionConfig } from "payload";

export const Artists: CollectionConfig = {
	slug: "artists",
	access: {
		read: () => true,
	},
	admin: {
		useAsTitle: "name",
		custom: {
			parent: "mina",
		},
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
					admin: { width: "50%" },
				},
				{
					name: "creditUrl",
					label: "Credit URL",
					type: "text",
					admin: { width: "50%" },
				},
			],
		},
		{
			name: "artworks",
			type: "join",
			collection: "mina",
			on: "artist",
		},
	],
};
