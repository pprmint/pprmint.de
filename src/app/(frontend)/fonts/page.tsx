import Title from "@/components/layout/Title";
import { getTranslations } from "next-intl/server";

import { MNVaria } from "@public/fonts/MNVaria/MNVaria";
import { MNCelesta } from "@public/fonts/MNCelesta/MNCelesta";
import { MintBit } from "@public/fonts/Mintbit/MintBit";
import { MintSans } from "@public/fonts/MintSans/MintSans";
import { MintTriangles } from "@public/fonts/MintTriangles/MintTriangles";
import FontSection from "./FontSection";
import { MNCovert } from "@public/fonts/MNCovert/MNCovert";

export async function generateMetadata() {
	const t = await getTranslations("FONTS");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default async function Page() {
	const t = await getTranslations("FONTS");
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")} />
			<main className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
				<FontSection
					name="MN Covert"
					font={MNCovert}
					link="/fonts/covert"
					variable
					styles={[
						{
							tag: "wdth",
							steps: [50, 75, 100],
							initial: 100,
						},
					]}
				>
					187 - Indulge responsibly. Good luck.
				</FontSection>
				<FontSection
					name="MN Varia"
					font={MNVaria}
					link="/fonts/varia"
					variable
					styles={[
						{
							tag: "wght",
							steps: [100, 200, 300, 400, 500, 600, 700, 800, 900],
							initial: 400,
						},
					]}
				>
					MN Varia, née Mina Sans, entzückt mit vielen Zeichenvarianten.
				</FontSection>
				<FontSection
					name="MN Celesta"
					font={MNCelesta}
					link="https://github.com/pprmint/MN-Celesta"
					styles={[
						{
							tag: "wght",
							steps: [400],
						},
					]}
					hasItalic
				>
					A fork of the brilliant Instrument Serif.
				</FontSection>
				<FontSection
					name="MintBit"
					font={MintBit}
					link="/fonts/mintbit"
					styles={[
						{
							tag: "wght",
							steps: [400],
						},
					]}
				>
					Minenhandwerk. Vanille. Geil man.
				</FontSection>
				<FontSection
					name="MintTriangles"
					font={MintTriangles}
					link="/fonts/minttriangles"
					styles={[
						{
							tag: "wght",
							steps: [400],
						},
					]}
				>
					12:34:56
				</FontSection>
				<FontSection
					name="MintSans"
					font={MintSans}
					link="/fonts/mintsans"
					styles={[
						{
							tag: "wght",
							steps: [100, 400, 700],
							initial: 400,
						},
					]}
				>
					Used to be "Butterknife", belongs in the scrapyard.
				</FontSection>
			</main>
		</>
	);
}
