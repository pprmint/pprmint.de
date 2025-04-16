import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Photos: CollectionConfig = {
	slug: "photos",
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	fields: [
		{
			name: "alt",
			label: "Alternative text",
			type: "text",
			localized: true,
			// required: true,
		},
		{
			type: "row",
			fields: [
				{
					name: "camera",
					type: "relationship",
					relationTo: "cameras",
					required: true,
					admin: {
						width: "33.333%",
					},
				},
				{
					name: "lens",
					type: "relationship",
					relationTo: "lenses",
					admin: {
						width: "33.333%",
					},
				},
				{
					name: "date",
					label: "Capture date",
					type: "date",
					required: true,
					admin: {
						date: {
							pickerAppearance: "dayAndTime",
							displayFormat: "dd.MM.yyy HH:mm",
							timeFormat: "HH:mm",
						},
						width: "33.333%",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "iso",
          label: "ISO",
					type: "number",
					admin: {
						width: "25%",
					},
				},
				{
					name: "aperture",
					type: "number",
					admin: {
						width: "25%",
					},
				},
				{
					name: "shutterSpeed",
          label: "Shutter speed",
					type: "text",
					admin: {
						width: "25%",
					},
				},
				{
					name: "focalLength",
          label: "Focal length",
					type: "number",
					admin: {
						width: "25%",
					},
				},
			],
		},
	],
	upload: {
		focalPoint: true,
		adminThumbnail: "thumbnail",
		imageSizes: [
			{
				name: "thumbnail",
				width: 320,
				height: undefined,
			},
			{
				name: "sd",
				width: 720,
				height: 480,
			},
			{
				name: "hd",
				width: 1080,
				height: 720,
			},
			{
				name: "fhd",
				width: 1620,
				height: 1080,
			},
		],
	},
};
