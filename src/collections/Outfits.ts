import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { slugField } from "@/fields/slug";
import { withRole } from "@/access/withRole";

export const Outfits: CollectionConfig = {
  slug: "outfits",
  access: {
    create: withRole(["admin"]),
    delete: withRole(["admin"]),
    read: anyone,
    update: withRole(["admin"]),
  },
  admin: {
    useAsTitle: "name",
    custom: {
      parent: "mina",
    },
    defaultColumns: ["name", "designer"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "designer",
      type: "relationship",
      relationTo: "artists",
      required: true,
      admin: {
        position: "sidebar",
        sortOptions: "name",
        isSortable: true,
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      type: "array",
      name: "references",
      label: "Reference images",
      fields: [
        {
          name: "label",
          type: "text",
          localized: true,
					required: true,
          defaultValue: "Standard",
        },
        {
          type: "row",
          fields: [
            {
              name: "referenceFront",
              label: "Front reference image",
              type: "upload",
							required: true,
              relationTo: "artwork",
              admin: {
                width: "50%",
              },
            },
            {
              name: "referenceBack",
              label: "Back reference image",
              type: "upload",
							required: true,
              relationTo: "artwork",
              admin: {
                width: "50%",
              },
            },
          ],
        },
      ],
    },
    {
      name: "artworks",
      type: "join",
      collection: "mina",
      on: "outfit",
    },
    ...slugField("name", {
      slugOverrides: { required: true },
    }),
  ],
};
