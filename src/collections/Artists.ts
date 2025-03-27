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
			type: "row",
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
				},
				{
					name: "creditUrl",
					type: "text",
				},
			]
		},
		{
			name: "artworks",
			type: "join",
			collection: "mina-art",
			on: "artist",
		}
	],
}