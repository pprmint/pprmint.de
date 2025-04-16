import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Cameras: CollectionConfig = {
	slug: "cameras",
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	admin: {
		useAsTitle: "name",
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "svgLogo",
			label: "Logo (SVG)",
			type: "code",
			validate: (val) => {
				if (!val) return true;
				const pattern = /<\s*svg[^>]*>(.*?)<\s*\/\s*svg>/g;
				return pattern.test(val.toString()) || "This doesn't look like a valid SVG.";
			},
			admin: {
				language: "xml",
				editorOptions: {
					lineNumbers: "off",
				},
			},
		},
	],
};
