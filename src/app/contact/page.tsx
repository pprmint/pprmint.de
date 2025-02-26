import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import Title from "src/components/layout/Title";
import Button from "src/components/ui/Button";
import FadingImage from "src/components/ui/FadingImage";
import Twitter from "src/icons/Twitter";

import LetterDE from "public/assets/contact/letter_de.webp";
import LetterEN from "public/assets/contact/letter_en.webp";
import LetterSilhouette from "public/assets/contact/letter_silhouette.svg";

import TitleBackgroundEn from "public/assets/contact/title_en.webp";
import TitleBackgroundDe from "public/assets/contact/title_de.webp";
import Letter from "public/assets/contact/letter.svg";
import Bubbles from "public/assets/contact/bubbles.svg";

import Chatbox from "./chatbox";
import Form from "./form";
import NoSSR from "src/components/NoSSR";

export async function generateMetadata() {
	const t = await getTranslations("CONTACT");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default async function Page() {
	const t = await getTranslations("CONTACT");
	const locale = await getLocale();
	return (
		<>
			<Title
				title={t("Head.title")}
				description={t("Head.description")}
				creditName="@neko__draws"
				creditLink="https://twitter.com/neko__draws"
			>
				<div className="relative size-full bg-neutral-950">
					<Image
						src={LetterSilhouette}
						alt=""
						className="absolute w-1/3 h-auto"
						style={{ left: "-10%", top: "-5%", transform: "rotate(6deg)" }}
					/>
					<Image
						src={LetterSilhouette}
						alt=""
						className="absolute w-1/3 h-auto"
						style={{ left: "20%", top: "30%", transform: "rotate(3deg)" }}
					/>
					<Image
						src={LetterSilhouette}
						alt=""
						className="absolute w-1/3 h-auto"
						style={{ left: "7%", top: "60%", transform: "rotate(-3deg)" }}
					/>
					<Image
						src={LetterSilhouette}
						alt=""
						className="absolute w-1/3 h-auto"
						style={{ left: "40%", top: "50%", transform: "rotate(-6deg)" }}
					/>
					<Image
						src={LetterSilhouette}
						alt=""
						className="absolute w-1/3 h-auto"
						style={{ left: "30%", top: "10%", transform: "rotate(-9deg)" }}
					/>
					<FadingImage
						src={locale === "de" ? LetterDE : LetterEN}
						alt="Postwoman Mina."
						className="absolute right-[3%] bottom-[-10%] rotate-6 w-1/2 h-auto"
					/>
					<div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-t from-neutral-950/25" />
					<FadingImage
						src="https://cms.pprmint.de/uploads/nekomimi_4_af97e38270.webp"
						width={1158}
						height={3238}
						alt="Postwoman Mina."
						className="absolute right-[5%] bottom-0 sm:bottom-auto md:right-[10%] h-full pt-9 w-auto md:w-1/3 max-w-xl md:h-auto drop-shadow-2xl"
					/>
				</div>
			</Title>
			<main className="w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
				<section className="relative w-full grid lg:grid-cols-2 border border-t-0 border-black/5 dark:border-white/5">
					<div className="w-full overflow-clip text-center py-12 md:py-20 xl:py-40 border-r border-black/5 dark:border-white/5">
						<h2>
							{t("Content.Mina.heading")}
							<span className="text-green">.</span>
						</h2>
						<p className="pb-6">{t("Content.Mina.text")}</p>
						<div className="w-fit mx-auto">
							<Chatbox />
						</div>
					</div>
					<div className="group w-full overflow-clip text-center pt-12 md:pt-20 xl:pt-40">
						<h2>
							{t("Content.Email.title")}
							<span className="text-green">.</span>
						</h2>
						<p className="pb-9 text-balance">{t("Content.Email.text")}</p>
						<Form />
					</div>
				</section>
			</main>
		</>
	);
}
