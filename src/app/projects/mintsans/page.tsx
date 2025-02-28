import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Tester from "./tester";
import Download from "src/icons/Download";

import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";
import Button from "src/components/ui/Button";

import TitleImage from "public/assets/mintsans/V2.png";
import Slide1 from "public/assets/mintsans/slide1.svg";
import Slide2 from "public/assets/mintsans/slide2.svg";
import Slide3 from "public/assets/mintsans/slide3.svg";
import Slide4 from "public/assets/mintsans/slide4.svg";
import Slide5 from "public/assets/mintsans/slide5.svg";
import Slide6 from "public/assets/mintsans/slide6.svg";

export async function generateMetadata() {
	const t = await getTranslations("MINTSANS");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
	const t = useTranslations();
	return (
		<>
			<Title title={t("MINTSANS.Head.title")} description={t("MINTSANS.Head.description")}>
				<div className="absolute inset-0 bg-neutral-950">
					<FadingImage src={TitleImage} alt="" fill className="object-contain object-center p-6" />
				</div>
			</Title>
			<main>
				<section>
					<div className="bg-neutral-950 relative w-full h-auto">
						<FadingImage src={Slide1} alt="Slide 1" className="w-full" />
					</div>
					<div className="relative w-full h-auto">
						<FadingImage src={Slide2} alt="Slide 2" className="w-full" />
					</div>
					<div className="bg-neutral-950 relative w-full h-auto">
						<FadingImage src={Slide3} alt="Slide 3" className="w-full" />
					</div>
					<div className="relative w-full h-auto">
						<FadingImage src={Slide4} alt="Slide 4" className="w-full" />
					</div>
					<div className="bg-neutral-950 relative w-full h-auto">
						<FadingImage src={Slide5} alt="Slide 5" className="w-full" />
					</div>
					<div className="relative w-full h-auto">
						<FadingImage src={Slide6} alt="Slide 6" className="w-full" />
					</div>
				</section>
				<section className="px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="py-20 md:py-32 xl:py-40 text-center border-x border-black/5 dark:border-white/5">
						<h2 className="mb-6">
							{t("MINTSANS.Content.Tester.heading")}
							<span className="text-green">.</span>
						</h2>
						<Tester />
					</div>
				</section>
				<section className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="text-center border-x border-black/5 dark:border-white/5">
						<h2>{t("MINTSANS.Content.Download.heading")}</h2>
						<p>{t("MINTSANS.Content.Download.text")}</p>
						<br />
						<Link className="flex w-max mx-auto" href="https://static.pprmint.de/download/mintsans_2.0.zip">
							<Button design="filled" color="green" tabIndex={-1}>
								<Download />
								{t("COMMON.download")}
							</Button>
						</Link>
					</div>
				</section>
			</main>
		</>
	);
}
