import { useTranslations } from "next-intl";
import Title from "src/components/Title";
import FadingImage from "src/components/FadingImage";

import Ref from "./ref";

import HeroMina from "public/assets/mina/hero.webp";

export default function Page() {
	const t = useTranslations("MINA");
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<FadingImage src={HeroMina} alt="Original Mina artwork by wxsonz." fill className="object-cover" quality={90} />
			</Title>
			<main>
				<Ref />
			</main>
		</>
	);
}
