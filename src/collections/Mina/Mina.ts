import { anyone } from "@/access/anyone";
import type { CollectionConfig } from "payload";
import { revalidateArtChange, revalidateArtDelete } from "./hooks/revalidate";
import { setThumbnailURL } from "./hooks/setThumbnailURL";
import { populateNormalizedDate } from "@/hooks/populateNormalizedDate";
import { withRole } from "@/access/withRole";

export const Mina: CollectionConfig = {
	slug: "mina",
	labels: {
		singular: "Mina artwork",
		plural: "Mina artworks",
	},
	admin: {
		custom: {
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor"><path d="M1.881 7.619a3.353 3.353 0 0 1 0-4.738 3.353 3.353 0 0 1 4.738 0l.881.881.881-.881a3.353 3.353 0 0 1 4.738 0 3.353 3.353 0 0 1 0 4.738L7.5 13.238zM7.5 11.823l4.912-4.911a2.35 2.35 0 0 0 0-3.324 2.35 2.35 0 0 0-3.324 0L7.5 5.177 5.912 3.588a2.35 2.35 0 0 0-3.324 0 2.35 2.35 0 0 0 0 3.324z"></path></svg>',
		},
		defaultColumns: ["thumbnail", "artist", "date", "outfit", "commissionPrice", "pixelart", "nsfw"],
	},
	access: {
		create: withRole(["admin"]),
		delete: withRole(["admin"]),
		read: anyone,
		update: withRole(["admin"]),
	},
	fields: [
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
						sortOptions: "slug",
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
						sortOptions: "slug",
					},
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
					name: "medium",
					type: "select",
					required: true,
					options: [
						{ value: "digital", label: "Digital" },
						{ value: "physical", label: "Physical" },
					],
					defaultValue: "digital",
					admin: {
						width: "33.333%",
					},
				},
				{
					name: "style",
					type: "select",
					required: true,
					options: [
						{ value: "drawing", label: "Drawing" },
						{ value: "pixelart", label: "Pixel art" },
						{ value: "model", label: "Model" },
					],
					defaultValue: "drawing",
					admin: {
						width: "33.333%",
					},
				},
				{
					name: "detail",
					type: "select",
					required: true,
					options: [
						{ value: "rendered", label: "Rendered" },
						{ value: "flat", label: "Flat" },
						{ value: "sketch", label: "Sketch" },
					],
					defaultValue: "rendered",
					admin: {
						width: "33.333%",
					},
				},
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "reference",
			label: "Featured as reference",
			type: "checkbox",
			required: true,
			defaultValue: false,
			admin: {
				position: "sidebar",
				description: "Present artwork as a good reference for new art.",
			},
		},
		{
			name: "unoptimized",
			type: "checkbox",
			required: true,
			defaultValue: false,
			admin: {
				position: "sidebar",
				description: "Avoid compression and optimization for pixel art and GIFs.",
			},
		},
		{
			name: "wholesome",
			label: "Wholesome",
			type: "checkbox",
			required: true,
			defaultValue: false,
			admin: {
				position: "sidebar",
				description: "Show a little heart next to artist credit.",
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
				description: "Hide suggestive or lewd artwork behind a visibility checkbox.",
			},
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
			name: "normalizedDate",
			type: "date",
			required: true,
			admin: {
				hidden: true,
			},
		},
		{
			name: "thumbnailURL",
			type: "text",
			required: true,
			admin: {
				hidden: true,
			},
		},
	],
	hooks: {
		beforeChange: [populateNormalizedDate, setThumbnailURL],
		afterChange: [revalidateArtChange],
		afterDelete: [revalidateArtDelete],
	},
};
