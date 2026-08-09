import { getLocale, getTranslations } from "next-intl/server";
import Title from "@/components/layout/Title";
import FadingImage from "@/components/ui/FadingImage";

import Letter from "@public/assets/contact/letter_en.webp";

import Chatbox from "./chatbox";
import Form from "./form";

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
				credits={[{ name: "nekomimi", link: "https://twitter.com/neko__draws" }]}
			>
				<div className="relative size-full max-w-8xl mx-auto px-12 bg-neutral-950">
					<FadingImage
						src={Letter}
						alt=""
						className="absolute right-12 lg:right-1/10 bottom-0 translate-y-1/4 rotate-6 w-2/5 max-w-2xl h-auto blur-sm"
						hideSpinner
					/>
					<FadingImage
						src="/api/artwork/file/nekomimi_68cdbdf7a0.webp"
						width={1158}
						height={3238}
						alt=""
						hideSpinner
						className="absolute right-1/8 bottom-0 sm:bottom-auto h-full pt-6 w-auto md:w-1/3 max-w-lg md:h-auto drop-shadow-2xl drop-shadow-neutral-950/75"
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
