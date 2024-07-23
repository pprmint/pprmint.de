import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "src/navigation";
import Tester from "./tester";
import Download from "src/icons/Download";

import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";
import Button from "src/components/ui/Button";

import TitleImage from "public/assets/mintsans/MintSans_V2.jpg";
import Slide1 from "public/assets/mintsans/slide1.svg";
import Slide2 from "public/assets/mintsans/slide2.svg";
import Slide3 from "public/assets/mintsans/slide3.svg";
import Slide4 from "public/assets/mintsans/slide4.svg";
import Slide5 from "public/assets/mintsans/slide5.svg";
import Slide6 from "public/assets/mintsans/slide6.svg";

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "MINTSANS" });
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page({ params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const t = useTranslations();
	return (
		<>
			<Title title={t("MINTSANS.Head.title")} description={t("MINTSANS.Head.description")}>
				<FadingImage src={TitleImage} alt="" fill className="object-contain" />
			</Title>
			<main>
				<section className="my-20 md:my-32 xl:my-40">
					<FadingImage src={Slide1} alt="Slide 1" className="w-full" />
					<FadingImage src={Slide2} alt="Slide 2" className="w-full" />
					<FadingImage src={Slide3} alt="Slide 3" className="w-full" />
					<FadingImage src={Slide4} alt="Slide 4" className="w-full" />
					<FadingImage src={Slide5} alt="Slide 5" className="w-full" />
					<FadingImage src={Slide6} alt="Slide 6" className="w-full" />
				</section>
				<section className="my-20 md:my-32 xl:my-40 px-6 md:px-9 py-5">
					<h2 className="max-w-7xl mx-auto">
						{t("MINTSANS.Content.Tester.heading")}
						<span className="text-green">.</span>
					</h2>
					<Tester />
				</section>
				<section className="my-20 md:my-32 xl:my-40 max-w-7xl mx-auto px-6 md:px-9 py-5">
					<h2>{t("MINTSANS.Content.Download.heading")}</h2>
					<p>{t("MINTSANS.Content.Download.text")}</p>
					<br />
					<Link href="https://static.pprmint.de/download/mintsans_2.0.zip">
						<Button color="green" tabIndex={-1}>
							<Download />
							{t("COMMON.download")}
						</Button>
					</Link>
				</section>
			</main>
		</>
	);
}
