import type { CollectionConfig } from "payload";
import { anyone } from "@/access/anyone";
import { fieldWithRole } from "@/access/fieldWithRole";
import { withRole } from "@/access/withRole";
import {
  revalidateButtonChange,
  revalidateButtonDelete,
} from "./hooks/revalidate";

export const Buttons: CollectionConfig = {
  slug: "buttons",
  access: {
    create: withRole(["admin"]),
    delete: withRole(["admin"]),
    read: anyone,
    update: withRole(["admin", "editor"]),
  },
  admin: {
    custom: {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor"><path d="M8.412 11.036a.5.5 0 0 0-.352.145l-2.504 2.483A1.499 1.499 0 0 1 3 12.599V2.42a1.5 1.5 0 0 1 2.562-1.059l7.092 7.116a1.5 1.5 0 0 1-1.062 2.559zm0-1h3.18a.5.5 0 0 0 .354-.853L4.854 2.067A.501.501 0 0 0 4 2.42v10.179a.5.5 0 0 0 .852.355l2.503-2.483a1.5 1.5 0 0 1 1.057-.435"></path></svg>',
    },
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "alt",
          label: "Alternative text",
          type: "text",
          localized: true,
          required: true,
          admin: {
            width: "50%",
          },
          access: {
            create: fieldWithRole(["admin"]),
            update: fieldWithRole(["admin", "editor"]),
          },
        },
        {
          name: "link",
          type: "text",
          required: true,
          admin: {
            width: "50%",
          },
          access: {
            create: fieldWithRole(["admin"]),
            update: fieldWithRole(["admin"]),
          },
        },
      ],
    },
  ],
  upload: true,
  hooks: {
    afterChange: [revalidateButtonChange],
    afterDelete: [revalidateButtonDelete],
  },
};
