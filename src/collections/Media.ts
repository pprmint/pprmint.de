import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: 'altEn',
          label: "Alternative text (English)",
          type: 'text',
          // required: true,
        },
        {
          name: 'altDe',
          label: "Alternative text (German)",
          type: 'text',
          // required: true,
        },
      ]
    }
  ],
  upload: true,
}
