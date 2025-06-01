import type { CollectionConfig } from "payload";
import { anyone } from "../../access/anyone";
import { withRole } from "../../access/withRole";

export const Artwork: CollectionConfig = {
	slug: "artwork",
	labels: { singular: "Artwork image", plural: "Artwork images" },
	access: {
		create: withRole(["admin"]),
		delete: withRole(["admin"]),
		read: anyone,
		update: withRole(["admin", "editor"]),
	},
	admin: {
		custom: {
			parent: "mina",
		},
		pagination: {
			limits: [12, 24, 48, 60, 120],
			defaultLimit: 24,
		},
		defaultColumns: ["artworkThumbnail", "-createdAt", "alt"]
	},
	fields: [
		{
			name: "alt",
			label: "Alternative text",
			type: "text",
			localized: true,
		},
		{
			name: "entries",
			type: "join",
			collection: "mina",
			on: "images.image",
		},
		{
			name: "smut",
			type: "join",
			collection: "mina",
			on: "images.image",
			where: {
				nsfw: {
					equals: true,
				},
			},
			admin: {
				hidden: true,
			},
		},
		{
			name: "artworkThumbnail",
			type: "ui",
			admin: {
				components: {
					Cell: "@/collections/Mina/ArtworkThumbnailCell",
				},
			},
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
				width: undefined,
				height: 480,
			},
			{
				name: "hd",
				width: undefined,
				height: 720,
			},
			{
				name: "fhd",
				width: undefined,
				height: 1080,
			},
		],
	},
};
