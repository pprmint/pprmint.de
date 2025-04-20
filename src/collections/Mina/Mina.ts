import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import type { CollectionConfig } from "payload";
import { revalidateArtChange, revalidateArtDelete } from "./hooks/revalidate";
import { setThumbnailURL } from "./hooks/setThumbnailURL";

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
			type: "row",
			admin: { position: "sidebar" },
			fields: [
				{
					name: "pixelart",
					type: "checkbox",
					required: true,
					defaultValue: false,
				},
				{
					name: "nsfw",
					label: "NSFW",
					type: "checkbox",
					required: true,
					defaultValue: false,
				},
				{
					name: "wholesome",
					label: "Wholesome",
					type: "checkbox",
					required: true,
					defaultValue: false,
				},
			],
		},
		{
			name: "images",
			type: "array",
			required: true,
			labels: {
				singular: "Image",
				plural: "Images",
			},
			admin: {
				position: "sidebar",
			},
			fields: [
				{
					name: "image",
					type: "upload",
					relationTo: "artwork",
					required: true,
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "artist",
					type: "relationship",
					relationTo: "artists",
					required: true,
					hasMany: false,
					admin: {
						width: "50%",
					},
				},
				{
					name: "date",
					label: "Creation date",
					type: "date",
					required: true,
					admin: {
						width: "40%",
						date: {
							pickerAppearance: "dayAndTime",
							displayFormat: "dd. MMMM yyy HH:mm",
							timeFormat: "HH:mm",
							overrides: {
								calendarStartDay: 1,
								minDate: new Date("2020-01-01"),
							},
						},
					},
				},
				{
					name: "commissionPrice",
					label: "Price",
					type: "number",
					min: 1,
					admin: {
						width: "10%",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "outfit",
					type: "relationship",
					label: "Outfit",
					relationTo: "outfits",
					admin: {
						width: "50%",
					},
				},
				{
					name: "featuring",
					type: "relationship",
					label: "Other characters",
					relationTo: "characters",
					hasMany: true,
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			name: "thumbnail",
			type: "ui",
			admin: {
				components: {
					Cell: "@/collections/Mina/ThumbnailCell",
				},
			},
		},
		{
			name: "thumbnailURL",
			type: "text",
			admin: {
				hidden: true,
			},
		},
	],
	hooks: {
		// Use value from the 'date' field as the doc creation date.
		// Will be deleted once all artworks have been added.
		beforeChange: [
			async ({ data, operation }) => {
				if (operation === "create" && data.date) {
					data.createdAt = new Date(data.date);
				}
				return data;
			},
			setThumbnailURL,
		],
		afterChange: [revalidateArtChange],
		afterDelete: [revalidateArtDelete],
	},
};
