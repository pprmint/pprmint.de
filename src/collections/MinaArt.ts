import type { CollectionConfig } from "payload"

export const MinaArt: CollectionConfig = {
	slug: "mina-art",
	access: {
		read: () => true,
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
			]
		},
		{
			name: "artist",
			type: "relationship",
			relationTo: "artists",
			required: true,
			hasMany: false,
			admin: {
				position: "sidebar",
			}
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
			}
		},
		{
			name: "pixelart",
			type: "checkbox",
			required: true,
			defaultValue: false,
			admin: {
				position: "sidebar",
			}
		},
		{
			name: "nsfw",
			label: "NSFW",
			type: "checkbox",
			required: true,
			defaultValue: false,
			admin: {
				position: "sidebar",
			}
		},
		{
			name: "heart",
			label: "Show heart",
			type: "checkbox",
			required: true,
			defaultValue: false,
			admin: {
				position: "sidebar",
			}
		},
	],
	upload: {
		focalPoint: true,
	},
}
