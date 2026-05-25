import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import Title from "@/components/layout/Title";
import FadingImage from "@/components/ui/FadingImage";

import Link from "next/link";
import ArrowRight from "@/icons/ArrowRight";
import Button from "@/components/ui/Button";
import Download from "@/icons/Download";
import GitHub from "@/icons/GitHub";
import FontTester from "../FontTester";
import { MNVaria } from "@public/fonts/MNVaria/MNVaria";

export async function generateMetadata() {
	const t = await getTranslations("VARIA");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

const features = ["tnum", "liga"]

const stylisticSets = [
	{ tag: "ss01", label: { en: "f and t with full cross bar", de: "f und t mit durchgezogenem Querstrich" } },
	{ tag: "ss02", label: { en: "Open numbers", de: "Offene Ziffern" } },
	{ tag: "ss03", label: { en: "Conventional", de: "Konventionell" } },
	{ tag: "ss04", label: { en: "Moderno", de: "Moderno" } },
	{ tag: "ss05", label: { en: "Aikoson", de: "Aikoson" } }
]

const characterVariants = [
	{ tag: "cv01", label: { en: "1 with alternative top", de: "1 mit alternativem Kopf", } },
	{ tag: "cv02", label: { en: "2 with straight diagonal stroke", de: "2 mit gerader Diagonale", } },
	{ tag: "cv03", label: { en: "3 with flat top", de: "3 mit flachem Kopf", } },
	{ tag: "cv04", label: { en: "Open 4", de: "Offene 4", } },
	{ tag: "cv05", label: { en: "f with full cross bar", de: "f mit durchgezogenem Querstrich", } },
	{ tag: "cv06", label: { en: "Open 6", de: "Offene 6", } },
	{ tag: "cv07", label: { en: "7 with straight diagonal stroke", de: "7 gerader Diagonale", } },
	{ tag: "cv08", label: { en: "t with full cross bar", de: "t mit durchgezogenem Querstrich", } },
	{ tag: "cv09", label: { en: "Open 9", de: "Offene 9", } },
	{ tag: "cv10", label: { en: "Slashed 0", de: "Durchgestrichene 0", } },
	{ tag: "cv11", label: { en: "Double-storey a", de: "Zweistöckiges a", } },
	{ tag: "cv12", label: { en: "Simplified m", de: "Vereinfachtes m", } },
	{ tag: "cv13", label: { en: "Simplified n", de: "Vereinfachtes n", } },
	{ tag: "cv14", label: { en: "Simplified r", de: "Vereinfachtes r", } },
	{ tag: "cv15", label: { en: "Simplified u", de: "Vereinfachtes u", } },
	{ tag: "cv16", label: { en: "l without tail", de: "l ohne Schwanz", } },
	{ tag: "cv17", label: { en: "G with sharp corner and spur", de: "G mit scharfer Ecke und Sporn", } },
	{ tag: "cv18", label: { en: "G with rounded corner and spur", de: "G mit abgerundeter Ecke und Sporn", } },
	{ tag: "cv19", label: { en: "I with slabs", de: "I mit Serifen", } },
	{ tag: "cv20", label: { en: "Q with diagonal stroke through body", de: "Q mit Diagonale durch Körper", } },
	{ tag: "cv21", label: { en: "Q with wavy line", de: "Q mit gewellter Linie", } },
	{ tag: "cv22", label: { en: "Q with wavy line inside", de: "Q mit gewellter Linie innen", } },
	{ tag: "cv23", label: { en: "Q with hook", de: "Q mit Haken", } },
	{ tag: "cv24", label: { en: "R with curved leg", de: "R mit kurvigem Bein", } },
	{ tag: "cv25", label: { en: "g with flat bowel", de: "g mit flachem Bauch", } },
	{ tag: "cv26", label: { en: "M with middle section on baseline", de: "M mit dem Mittelteil auf der Grundlinie" } },
]

export default function Page() {
	const t = useTranslations();
	return (
		<>
			<Title title={t("VARIA.Head.title")} description={t("VARIA.Head.description")}>
				<div className="absolute inset-0 bg-neutral-950">
					<FadingImage
						src="/api/assets/file/3D_a_edit2.webp"
						alt=""
						fill
						className="w-full max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20 object-cover mix-blend-screen"
						style={{
							maskImage: "linear-gradient(to left, rgba(0,0,0,0.75), rgba(0,0,0,0))",
							maskRepeat: "space",
							backgroundRepeat: "repeat",
						}}
					/>
				</div>
			</Title>
			<main>
				<section>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Varia_Cover.png"
							width={3840}
							height={2160}
							unoptimized
							alt="Slide 2"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Varia_Alphabet.png"
							width={3840}
							height={2160}
							alt="Slide 1"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Varia_CharacterVariants.png"
							width={3840}
							height={2160}
							alt="Slide 4"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Varia_StVO.png"
							width={3840}
							height={2160}
							alt="Slide 3"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Varia_Time.png"
							width={3840}
							height={2160}
							alt="Slide 5"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Varia_Faktor.png"
							width={3840}
							height={2160}
							alt="Slide 6"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Varia_Testimony.png"
							width={3840}
							height={2160}
							alt="Slide 6"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Varia_ReleaseDate.png"
							width={3840}
							height={2160}
							alt="Slide 6"
							className="w-full"
						/>
					</div>
				</section>
				<section className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="py-20 md:py-32 xl:py-40 text-center border-x border-black/5 dark:border-white/5">
						<h2 className="mb-6">
							{t("VARIA.Content.Tester.heading")}
							<span className="text-green">.</span>
						</h2>
						<FontTester
							font={MNVaria}
							variable
							pangram={{
								en: "The five boxing wizards jump quickly.",
								de: "Falsches Üben von Xylophonmusik quält jeden größeren Zwerg."
							}}
							styles={[
								{
									tag: "wght",
									steps: [100, 900],
									initial: 400,
								},
							]}
							features={features}
							stylisticSets={stylisticSets}
							characterVariants={characterVariants}
						/>
					</div>
				</section>
				<section className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="text-center border-x border-black/5 dark:border-white/5">
						<h2>
							{t("VARIA.Content.Download.heading")}
							<span className="text-green">.</span>
						</h2>
						<p>{t("VARIA.Content.Download.text")}</p>
						<br />
						<div className="flex border-y border-black/5 dark:border-white/5 justify-center">
							<Link href="/api/download/file/MNVaria_0.017.zip" download target="_blank">
								<Button design="transparent" color="green" tabIndex={-1} size="large" noInitialPadding>
									<Download />
									{t("COMMON.download")}
								</Button>
							</Link>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
