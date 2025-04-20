import type { CheckboxField, FieldHook, TextField } from "payload";

import { formatSlugHook } from "./formatSlug";

type Overrides = {
	slugOverrides?: Partial<TextField>;
	checkboxOverrides?: Partial<CheckboxField>;
};

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField];

export const slugField: Slug = (fieldToUse = "title", overrides = {}) => {
	const { slugOverrides, checkboxOverrides } = overrides;

	const checkBoxField: CheckboxField = {
		name: "slugLock",
		type: "checkbox",
		defaultValue: true,
		admin: {
			hidden: true,
			position: "sidebar",
		},
		...checkboxOverrides,
	};

	// Expect ts error here because of typescript mismatching Partial<TextField> with TextField
	// @ts-expect-error
	const slugField: TextField = {
		name: "slug",
		type: "text",
		index: true,
		label: "Slug",
    unique: true,
		...(slugOverrides || {}),
		hooks: {
			beforeChange: [generateFullSlug],
			// Kept this in for hook or API based updates
			beforeValidate: [formatSlugHook(fieldToUse)],
		},
		admin: {
			position: "sidebar",
			...(slugOverrides?.admin || {}),
			components: {
				Field: {
					path: "@/fields/slug/SlugComponent#SlugComponent",
					clientProps: {
						fieldToUse,
						checkboxFieldPath: checkBoxField.name,
					},
				},
			},
		},
	};

	return [slugField, checkBoxField];
};

const generateFullSlug: FieldHook = async ({ data, siblingData, operation, value }) => {
	const parent = data?.parent || siblingData?.parent || ""; // Get parent from incoming data
	const slug = value || siblingData?.slug; // Use the slug field value

	// Combine parent and slug to create the full path
	const fullSlug = parent ? `${parent}/${slug}` : slug;

	return fullSlug;
};
