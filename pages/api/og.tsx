import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
	runtime: "edge",
};

const fontRegular = fetch(
	new URL("../../fonts/BasierSquare/basiersquare-regular-webfont.ttf", import.meta.url),
).then((res) => res.arrayBuffer());
const fontDisplay = fetch(
	new URL("../../fonts/Silka/silka-semibold-webfont.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

export default async function OG(req: NextRequest) {
	const fontDataRegular = await fontRegular;
	const fontDataDisplay = await fontDisplay;
	const { searchParams } = req.nextUrl;
	const title = searchParams.get("title");
	const description = searchParams.get("description");
	return new ImageResponse(
		<div
			style={{
				backgroundImage: "url(https://pprmint.art/assets/og.png)",
				width: "100%",
				height: "100%",
				padding: "60px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				textAlign: "center",
			}}
		>
			<h1
				style={{
					fontFamily: "Silka",
					fontSize: 84,
					fontWeight: 600,
					lineHeight: 0.9,
					color: "#eee",
				}}
			>
				{title}
			</h1>
			<h2
				style={{
					fontFamily: "Basier Square",
					fontSize: 36,
					lineHeight: 1,
					letterSpacing: -0.004,
					color: "#bbb",
				}}
			>
				{description}
			</h2>
		</div>,
		{
			width: 1200,
			height: 600,
			fonts: [
				{
					name: "Basier Square",
					data: fontDataRegular,
					weight: 400,
				},
				{
					name: "Silka",
					data: fontDataDisplay,
					weight: 600,
				},
			],
		},
	);
}
