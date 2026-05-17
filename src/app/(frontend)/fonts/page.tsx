import Title from "@/components/layout/Title";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { MNVaria } from "@public/fonts/MNVaria/MNVaria";
import Link from "next/link";
import { MNCelesta } from "@public/fonts/MNCelesta/MNCelesta";
import { MintBit } from "@public/fonts/Mintbit/MintBit";
import { PropsWithChildren } from "react";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { MintSans } from "@public/fonts/MintSans/MintSans";
import { MintTriangles } from "@public/fonts/MintTriangles/MintTriangles";

export async function generateMetadata() {
	const t = await getTranslations("FONTS");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
	const t = useTranslations("FONTS");

	function FontSection(
		props: PropsWithChildren<{
			name: string;
			link: string;
			font: NextFontWithVariable;
			type: "static" | "variable";
			axes?: [
				{
					tag: string;
					range: number[];
				},
			];
			weights: number[];
			hasItalic?: boolean;
			initialWeight?: number;
		}>,
	) {
		return (
			<section className="border-x border-b first:border-t border-black/5 dark:border-white/5 py-6 md:py-9">
				<div className="px-6 md:px-9 mb-3">
					<Link
						href={props.link}
						target={props.link.startsWith("https://") ? "_blank" : "_self"}
						rel={props.link.startsWith("https://") ? "noopener noreferrer" : ""}
						className="font-medium hover:text-black dark:hover:text-white duration-75"
					>
						{props.name}
					</Link>
				</div>
				<div className="relative">
					<div
						className={`${props.font.className} px-6 md:px-9 mb-3 text-4xl md:text-6xl lg:text-8xl text-black dark:text-white outline-0 leading-tight whitespace-nowrap overflow-auto`}
						contentEditable
						suppressContentEditableWarning
						spellCheck={false}
						style={{ fontWeight: props.initialWeight }}
					>
						{props.children}
					</div>
					<div className="absolute left-0 inset-y-0 bg-linear-to-r from-white dark:from-neutral-950 w-6 md:w-9" />
					<div className="absolute right-0 inset-y-0 bg-linear-to-l from-white dark:from-neutral-950 w-6 md:w-9" />
				</div>
				<div className="flex gap-6 px-6 md:px-9 text-xs">
					<div>{t(`Content.FontSection.Type.${props.type}`)}</div>
					{props.axes && (
						<div>
							{props.axes.map((axis) => (
								<div key={axis.tag}>
									{t(`Content.FontSection.Axis.${axis.tag}`)} [{axis.range[0]}-{axis.range[1]}]
								</div>
							))}
						</div>
					)}
					<div>
						{t("Content.FontSection.variants", {
							count: props.weights ? props.weights?.length * (props.hasItalic ? 2 : 1) : 1,
						})}
					</div>
				</div>
			</section>
		);
	}

	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")} />
			<main className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
				<FontSection
					name="MN Varia"
					font={MNVaria}
					link="/fonts/varia"
					type="variable"
					axes={[{ tag: "wght", range: [100, 900] }]}
					weights={[100, 200, 300, 400, 500, 600, 700, 800, 900]}
					initialWeight={600}
				>
					Entzückt durch ihre vielen Zeichenvarianten.
				</FontSection>
				<FontSection
					name="MN Celesta"
					font={MNCelesta}
					link="https://github.com/pprmint/MN-Celesta"
					type="static"
					weights={[400]}
					hasItalic
				>
					A fork of the brilliant Instrument Serif.
				</FontSection>
				<FontSection name="MintBit" font={MintBit} link="/fonts/mintbit" type="static" weights={[400]}>
					Pixelated goodness.
				</FontSection>
				<FontSection
					name="MintTriangles"
					font={MintTriangles}
					link="/fonts/minttriangles"
					type="static"
					weights={[400]}
				>
					12:34:56
				</FontSection>
				<FontSection name="MintSans" font={MintSans} link="/fonts/mintsans" type="static" weights={[100, 400, 700]}>
					Used to be "Butterknife", belongs in the scrapyard.
				</FontSection>
			</main>
		</>
	);
}
