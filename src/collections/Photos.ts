import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { fieldWithRole } from "@/access/fieldWithRole";
import { withRole } from "@/access/withRole";

export const Photos: CollectionConfig = {
	slug: "photos",
	access: {
		create: withRole(["admin"]),
		delete: withRole(["admin"]),
		read: anyone,
		update: withRole(["admin", "editor"]),
	},
	admin: {
		custom: {
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor"><path d="M4 4h1.086c.132 0 .26-.053.353-.146l1.415-1.415A1.5 1.5 0 0 1 7.914 2h2.172c.398 0 .779.158 1.06.439l1.415 1.415a.8.8 0 0 0 .353.204A1.503 1.503 0 0 1 14 5.5v6a1.503 1.503 0 0 1-1.5 1.5h-10A1.503 1.503 0 0 1 1 11.5v-6a1.5 1.5 0 0 1 1-1.414V3.25A.25.25 0 0 1 2.25 3h1.5a.25.25 0 0 1 .25.25zm2.707 0h4.586l-.854-.854A.5.5 0 0 0 10.086 3H7.914a.5.5 0 0 0-.353.146zM4 5H2.5a.5.5 0 0 0-.354.146A.5.5 0 0 0 2 5.5v6c0 .133.053.26.146.354A.5.5 0 0 0 2.5 12H4zm1 7h7.5c.133 0 .26-.053.354-.146A.5.5 0 0 0 13 11.5v-6a.5.5 0 0 0-.146-.354A.5.5 0 0 0 12.5 5H5z"></path><path d="M9 5.9a2.601 2.601 0 0 1 0 5.2 2.601 2.601 0 0 1 0-5.2m0 1a1.6 1.6 0 1 0 .002 3.202A1.6 1.6 0 0 0 9 6.9"></path></svg>',
		},
	},
	fields: [
		{
			name: "alt",
			label: "Alternative text",
			type: "text",
			localized: true,
			// required: true,
			access: {
				create: fieldWithRole(["admin"]),
				update: fieldWithRole(["admin", "editor"]),
			},
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
					access: {
						create: fieldWithRole(["admin"]),
						update: fieldWithRole(["admin"]),
					},
				},
				{
					name: "lens",
					type: "relationship",
					relationTo: "lenses",
					admin: {
						width: "33.333%",
					},
					access: {
						create: fieldWithRole(["admin"]),
						update: fieldWithRole(["admin"]),
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
							timeIntervals: 1, // I hate this.
							overrides: {
								calendarStartDay: 1,
								minDate: new Date("2010-01-01"),
							},
						},
						width: "33.333%",
					},
					access: {
						create: fieldWithRole(["admin"]),
						update: fieldWithRole(["admin"]),
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
					access: {
						create: fieldWithRole(["admin"]),
						update: fieldWithRole(["admin"]),
					},
				},
				{
					name: "aperture",
					type: "number",
					admin: {
						width: "25%",
					},
					access: {
						create: fieldWithRole(["admin"]),
						update: fieldWithRole(["admin"]),
					},
				},
				{
					name: "shutterSpeed",
					label: "Shutter speed",
					type: "text",
					admin: {
						width: "25%",
					},
					access: {
						create: fieldWithRole(["admin"]),
						update: fieldWithRole(["admin"]),
					},
				},
				{
					name: "focalLength",
					label: "Focal length (35mm equiv.)",
					type: "number",
					admin: {
						width: "25%",
					},
					access: {
						create: fieldWithRole(["admin"]),
						update: fieldWithRole(["admin"]),
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
