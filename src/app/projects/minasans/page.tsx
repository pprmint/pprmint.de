import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";

import TitleImage from "public/assets/minasans/title.webp";
import Alphabet from "public/assets/minasans/Alphabet.png";
import Cover from "public/assets/minasans/Cover.png";
import faktor from "public/assets/minasans/faktor.png";
import Mina from "public/assets/minasans/Mina.png";
import NondescriptPhone from "public/assets/minasans/NondescriptPhone.png";
import ReleaseDate from "public/assets/minasans/ReleaseDate.png";
import StVO from "public/assets/minasans/StVO.png";
import Link from "next/link";
import ArrowRight from "src/icons/ArrowRight";

export async function generateMetadata() {
	const t = await getTranslations("MINASANS");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
	const t = useTranslations("MINASANS");
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<div className="absolute inset-0 bg-neutral-950">
					<FadingImage
						src={TitleImage}
						alt=""
						fill
						className="object-cover"
						style={{
							maskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))",
							maskRepeat: "space",
							backgroundRepeat: "repeat",
						}}
					/>
				</div>
			</Title>
			<main>
				<section>
					<div className="relative w-full aspect-video">
						<FadingImage src={Cover} unoptimized alt="Slide 2" className="w-full" />
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage src={Alphabet} alt="Slide 1" className="w-full" />
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage src={faktor} alt="Slide 3" className="w-full" />
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage src={StVO} alt="Slide 6" className="w-full" />
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage src={NondescriptPhone} alt="Slide 5" className="w-full" />
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage src={ReleaseDate} alt="Slide 6" className="w-full" />
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage src={Mina} alt="Slide 4" className="w-full" />
					</div>
				</section>
				<section className="max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="pt-20 md:pt-32 xl:pt-40 border-x border-black/5 dark:border-white/5">
						<h2 className="text-center">
							<Link href="/tradeoffer" className="group inline-flex items-center gap-3">
								{t("Content.deal")}
								<div className="relative overflow-clip size-[30px]">
									<ArrowRight className="size-[30px] stroke-1 stroke-green absolute group-hover:translate-x-full group-hover:duration-400 ease-out-expo" />
									<ArrowRight className="size-[30px] stroke-1 stroke-green absolute -translate-x-full group-hover:translate-x-0 group-hover:duration-400 ease-out-expo" />
								</div>
							</Link>
						</h2>
					</div>
				</section>
			</main>
		</>
	);
}
