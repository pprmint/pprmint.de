import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "src/navigation";
import Tester from "./tester";
import Download from "src/icons/Download";

import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";
import Button from "src/components/ui/Button";

import TitleImage from "public/assets/minasans/title.webp";
import Alphabet from "public/assets/minasans/Alphabet.png";
import Cover from "public/assets/minasans/Cover.png";
import faktor from "public/assets/minasans/faktor.png";
import Mina from "public/assets/minasans/Mina.png";
import NondescriptPhone from "public/assets/minasans/NondescriptPhone.png";
import ReleaseDate from "public/assets/minasans/ReleaseDate.png";
import StVO from "public/assets/minasans/StVO.png";

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "MINASANS" });
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
			<Title title={t("MINASANS.Head.title")} description={t("MINASANS.Head.description")}>
				<FadingImage src={TitleImage} alt="" fill className="object-cover" />
			</Title>
			<main>
				<section className="my-20 md:my-32 xl:my-40">
					<FadingImage src={Cover} unoptimized alt="Slide 2" className="w-full" />
					<FadingImage src={Alphabet} alt="Slide 1" className="w-full" />
					<FadingImage src={faktor} alt="Slide 3" className="w-full" />
					<FadingImage src={StVO} alt="Slide 6" className="w-full" />
					<FadingImage src={NondescriptPhone} alt="Slide 5" className="w-full" />
					<FadingImage src={ReleaseDate} alt="Slide 6" className="w-full" />
					<FadingImage src={Mina} alt="Slide 4" className="w-full" />
				</section>
			</main>
		</>
	);
}
