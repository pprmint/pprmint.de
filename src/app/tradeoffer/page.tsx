import { Viewport } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getTranslations } from "next-intl/server";
import KofiWidget from "./widget";
import FadingImage from "src/components/ui/FadingImage";
import ArtCreditButton from "src/components/ui/ArtCreditButton";
import Twitter from "src/icons/Twitter";
import Link from "next/link";

export async function generateMetadata() {
	const t = await getTranslations("TRADEOFFER");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export const viewport: Viewport = {
	themeColor: "#aa77ee",
};

export default async function Page() {
	const t = await getTranslations("TRADEOFFER");
	const license: LicenseData = await GetLicenses();
	return (
		<>
			<main>
				<section className="dark bg-neutral-950 h-screen relative pt-24 md:pt-32 xl:pt-40 mb-20 md:mb-32 xl:mb-40 px-6 md:px-9 overflow-clip">
					<div className="absolute inset-0 opacity-75">
						<FadingImage
							src="https://cms.pprmint.de/uploads/bg_f66021cc37.webp"
							alt=""
							fill
							className="object-cover origin-[50%_10%] blur scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-75% via-transparent" />
					</div>
					<div className="relative z-10">
						<div className="w-fit mb-10 px-3 xl:px-6 py-3 xl:py-5 mx-auto bg-red-600 rounded-md md:rounded-lg">
							<h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl pb-1 font-sans font-stretch-expanded font-bold">
								{t("Content.Intro.tradeOffer")}
							</h1>
						</div>
						<div className="flex justify-between gap-3 max-w-7xl mx-auto">
							<div>
								<h2
									className="text-xl sm:text-3xl xl:text-5xl"
									style={{
										textShadow:
											"-2px 0 2px #000, -2px -2px 2px #000, 0 -2px 2px #000, 0 0 2px #000, 2px -2px 2px #000, 2px 0 2px #000, 2px 2px 2px #000, 0 2px 2px #000, -2px 2px 2px #000",
									}}
								>
									{t("Content.Intro.iReceive")}
								</h2>
								<ul className="text-white sm:text-xl xl:text-2xl">
									<li>{t("Content.Intro.iReceiveSub")}</li>
								</ul>
							</div>
							<div className="text-right">
								<h2
									className="text-xl sm:text-3xl xl:text-5xl"
									style={{
										textShadow:
											"-2px 0 2px #000, -2px -2px 2px #000, 0 -2px 2px #000, 0 0 2px #000, 2px -2px 2px #000, 2px 0 2px #000, 2px 2px 2px #000, 0 2px 2px #000, -2px 2px 2px #000",
									}}
								>
									{t("Content.Intro.youReceive")}
								</h2>
								<ul className="text-white sm:text-xl xl:text-2xl">
									<li>{t("Content.Intro.youReceiveSub1")}</li>
									<li>{t("Content.Intro.youReceiveSub2")}</li>
								</ul>
							</div>
						</div>
					</div>
					<FadingImage
						hideSpinner
						src="https://cms.pprmint.de/uploads/da_mina_32d26097f7.webp"
						width={1311}
						height={1276}
						alt=""
						className="absolute bottom-0 left-1/2 -translate-x-1/2 max-h-[55%] lg:max-h-[65%] w-auto mx-auto"
					/>
					<ArtCreditButton fixToBottom link="https://twitter.com/DIVAOFDESPAlR">
						<Twitter />
						@DIVAOFDESPAlR
					</ArtCreditButton>
				</section>
				<section className="my-20 md:my-32 xl:my-40 max-w-7xl mx-auto px-6 md:px-9 flex flex-col xl:flex-row gap-9">
					<div className="grow">
						<h2>
							{t("Content.How.heading")}
							<span className="text-violet">.</span>
						</h2>
						<p>{t("Content.How.text1")}</p>
						<p>
							{t.rich("Content.How.text2", {
								Link: (chunks) => (
									<Link href="https://glyphsapp.com/" target="_blank" className="text-link-external">
										{chunks}
									</Link>
								),
							})}
						</p>
						<p>{t("Content.How.text3")}</p>
						<p>{t("Content.How.text4")}</p>
						<p>{t("Content.How.text5")}</p>
						{t.rich("Content.How.text6", {
							Link: (chunks) => (
								<Link href="/contact" className="text-link">
									{chunks}
								</Link>
							),
						})}
						<hr className="border-neutral-900 my-6" />
						<p>
							{t.rich("Content.How.text7", {
								b: (chunks) => <span className="text-white font-medium">{chunks}</span>,
							})}
						</p>
					</div>
					<KofiWidget />
				</section>
				<section className="my-20 md:my-32 xl:my-40 max-w-7xl mx-auto px-6 md:px-9">
					<h2>{t("Content.License.heading")}<span className="text-violet">.</span></h2>
					<p>{t("Content.License.text")}</p>
					<div className="flex flex-col xl:flex-row gap-9 mt-6">
						<div className="w-full">
							<Markdown
								className="prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-ul:list-disc prose-ul:list-inside prose-hr:my-3 prose-hr:border-neutral-900"
								remarkPlugins={[remarkGfm]}
							>
								{license.data.desktopLicense}
							</Markdown>
						</div>
						<div className="w-full">
							<Markdown
								className="prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-ul:list-disc prose-ul:list-inside prose-hr:my-3 prose-hr:border-neutral-900"
								remarkPlugins={[remarkGfm]}
							>
								{license.data.webLicense}
							</Markdown>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}

interface LicenseData {
	data: {
		id: 1;
		documentId: string;
		desktopLicense: string;
		webLicense: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		locale: "en";
		localizations: [];
	};
	meta: {};
}

async function GetLicenses() {
	const res = await fetch(`${process.env.STRAPI_API_URL}/license?populate=*`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
		},
		next: { revalidate: 60 },
	});
	if (!res.ok) {
		console.error("Failed to fetch license data.");
	}
	return res.json();
}
