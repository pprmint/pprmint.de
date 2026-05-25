import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import Title from "@/components/layout/Title";
import FadingImage from "@/components/ui/FadingImage";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Download from "@/icons/Download";
import FontTester from "../FontTester";
import { MNCovert } from "@public/fonts/MNCovert/MNCovert";

export async function generateMetadata() {
	const t = await getTranslations("COVERT");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
	const t = useTranslations();
	return (
		<>
			<Title title={t("COVERT.Head.title")} description={t("COVERT.Head.description")} noAccents>
				<div className="absolute inset-0 bg-neutral-950">
					<FadingImage src="/api/assets/file/Covert_Hero.webp" alt="" fill className="object-cover" quality={100} />
				</div>
			</Title>
			<main>
				<section className="border-b border-black/5 dark:border-white/5">
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Covert_Title.svg"
							width={1920}
							height={1459}
							unoptimized
							alt="Slide 1"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Covert_Numbers.svg"
							width={1920}
							height={1080}
							unoptimized
							alt="Slide 2"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Covert_Grow.svg"
							width={1920}
							height={1080}
							unoptimized
							alt="Slide 3"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Covert_Friend.svg"
							width={1920}
							height={1080}
							unoptimized
							alt="Slide 4"
							className="w-full"
						/>
					</div>
				</section>
				<section className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="py-20 md:py-32 xl:py-40 text-center border-x border-black/5 dark:border-white/5">
						<h2 className="mb-6">
							{t("COVERT.Content.Tester.heading")}
							<span className="text-red">.</span>
						</h2>
						<FontTester
							font={MNCovert}
							variable
							pangram={{
								en: "Pack my box with five dozen liquor jugs.",
								de: "Prall vom Whisky flog Quax den Jet zu Bruch.",
							}}
							styles={[
								{
									tag: "wdth",
									steps: [50, 100],
									initial: 100,
								},
							]}
							features={["tnum"]}
						/>
					</div>
				</section>
				<section className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="text-center border-x border-black/5 dark:border-white/5">
						<h2>
							{t("COVERT.Content.Download.heading")}
							<span className="text-red">.</span>
						</h2>
						<p>{t("COVERT.Content.Download.text")}</p>
						<br />
						<div className="flex border-y border-black/5 dark:border-white/5 justify-center">
							<Link href="/api/download/file/MNC0.3.zip" download target="_blank">
								<Button design="transparent" color="red" tabIndex={-1} size="large" noInitialPadding>
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
