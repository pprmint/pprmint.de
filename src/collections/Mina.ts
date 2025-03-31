import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import type { CollectionConfig } from "payload";

export const Mina: CollectionConfig = {
	slug: "mina",
	labels: {
		singular: "Mina artwork",
		plural: "Mina artworks",
	},
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	fields: [
		{
			name: "images",
			type: "array",
			required: true,
			labels: {
				singular: "Image",
				plural: "Images",
			},
			fields: [
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					required: true,
				},
			],
		},
		{
			name: "artist",
			type: "relationship",
			relationTo: "artists",
			required: true,
			hasMany: false,
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "date",
			label: "Creation date",
			type: "date",
			required: true,
			admin: {
				date: {
					pickerAppearance: "dayAndTime",
					displayFormat: "dd.MM.yyy HH:mm",
					timeFormat: "HH:mm",
				},
				position: "sidebar",
			},
		},
		{
			name: "pixelart",
			type: "checkbox",
			required: true,
			defaultValue: false,
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "nsfw",
			label: "NSFW",
			type: "checkbox",
			required: true,
			defaultValue: false,
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "heart",
			label: "Show heart",
			type: "checkbox",
			required: true,
			defaultValue: false,
			admin: {
				position: "sidebar",
			},
		},
	],
};
