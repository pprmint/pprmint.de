import { s3Storage } from "@payloadcms/storage-s3";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import nodemailer from "nodemailer";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Announcements } from "./collections/Announcements";
import { Mina } from "./collections/Mina";
import { Artists } from "./collections/Artists";
import { Media } from "./collections/Media";
import {
	AlignFeature,
	HeadingFeature,
	HorizontalRuleFeature,
	InlineToolbarFeature,
	LinkFeature,
	OrderedListFeature,
	UnorderedListFeature,
} from "@payloadcms/richtext-lexical";
import { Users } from "./collections/Users";
import { getServerSideURL } from "./utilities/getURL";
import { Articles } from "./collections/Articles/Articles";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Announcements, Articles, Mina, Artists, Media, Users],
	localization: {
		locales: [
			{
				code: "en",
				label: "English",
			},
			{
				code: "de",
				label: "German",
			},
		],
		defaultLocale: "en",
	},
	editor: lexicalEditor({
		features: ({ defaultFeatures }) => [
			...defaultFeatures,
			HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4", "h5"] }),
			// FixedToolbarFeature(),
			InlineToolbarFeature(),
			LinkFeature(),
			HorizontalRuleFeature(),
			AlignFeature(),
			OrderedListFeature(),
			UnorderedListFeature(),
		],
	}),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: mongooseAdapter({
		url: process.env.DATABASE_URI || "",
	}),
	sharp,
	cors: [getServerSideURL()].filter(Boolean),
	plugins: [
		// ...plugins,
		s3Storage({
			collections: {
				media: true,
			},
			bucket: process.env.S3_BUCKET || "",
			config: {
				endpoint: process.env.S3_ENDPOINT || "",
				region: process.env.S3_REGION || "",
				forcePathStyle: true,
				credentials: {
					accessKeyId: process.env.S3_ACCESS_KEY || "",
					secretAccessKey: process.env.S3_SECRET_KEY || "",
				},
			},
		}),
	],
	email: nodemailerAdapter({
		defaultFromAddress: process.env.FROM_ADDRESS || "noreply@example.com",
		defaultFromName: process.env.FROM_NAME || "Payload",
		transport: await nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: parseInt(process.env.SMTP_PORT || "587"),
			auth: {
				user: process.env.SMTP_USERNAME,
				pass: process.env.SMTP_PASSWORD,
			},
		}),
	}),
});
