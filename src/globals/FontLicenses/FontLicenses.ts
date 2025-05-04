import { GlobalConfig } from "payload";

export const FontLicenses: GlobalConfig = {
	slug: "fontLicenses",
  label: "Font licenses",
  admin: {
    custom: {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor"><path d="M7 3H4a1 1 0 0 0-1 1H2V2h11v2h-1a1 1 0 0 0-1-1H8v10H7z"></path></svg>'
    }
  },
	fields: [
		{
			name: "desktopLicense",
			type: "richText",
			required: true,
		},
		{
			name: "webLicense",
			type: "richText",
			required: true,
		},
	],
};
