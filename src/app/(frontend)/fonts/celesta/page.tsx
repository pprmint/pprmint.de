import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

import Title from "@/components/layout/Title";
import Button from "@/components/ui/Button";
import Download from "@/icons/Download";
import FontTester from "../FontTester";
import { MNCelesta } from "@public/fonts/MNCelesta/MNCelesta";
import GitHub from "@/icons/GitHub";
import Marquee from "react-fast-marquee";

export async function generateMetadata() {
	const t = await getTranslations("CELESTA");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
	const t = useTranslations();
	return (
		<>
			<Title title={t("CELESTA.Head.title")} titleFont={MNCelesta} description={t("CELESTA.Head.description")}>
				<div className="absolute inset-0 bg-green-900" />
				<Marquee
					style={{
						maskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%",
						maskRepeat: "space",
					}}
				>
					<div
						aria-hidden
						className={`${MNCelesta.className} flex text-[25rem] leading-[0.78em] md:leading-[1em] xl:leading-[1.3em] text-green-700`}
					>
						ABCDEFGHIJKL
						<span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 148 105"
								fill="#7ad5a5"
								className="h-[0.723em] mt-[0.0115em] md:mt-[0.12em] xl:mt-[0.27em] w-auto"
							>
								<path d="M82.9 0h12.5l36.8 80.6h.7V10q0-3-1.2-4.4-1.3-1.4-4.2-2l-4.3-.6V0h24v3l-4.9.8q-2.6.4-3.7 1.7t-1.2 4.2v94.8h-6.2zM45.5 0H58l47.7 104.5h-12zM24 104.5H0v-3l4.8-.7q2.6-.5 3.8-1.8 1-1.3 1.1-4.2V10q0-3-1.2-4.4t-4.1-2L0 3V0h20.6l47.7 104.5h-12L15 15h-.8v79.5q0 3 1.3 4.4 1.2 1.5 4.1 2l4.4.6z" />
							</svg>
						</span>
						OPQRSTUVWXYZ0123456789
					</div>
				</Marquee>
			</Title>
			<main>
				<section className="max-w-8xl mx-auto sm:px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="py-20 md:py-32 xl:py-40 text-center border-x border-black/5 dark:border-white/5">
						<div className="px-6 xl:px-9 mb-6">
							<h2>
								{t("CELESTA.Content.Tester.heading")}
								<span className="text-green">.</span>
							</h2>
							<p>{t("CELESTA.Content.Tester.text")}</p>
						</div>
						<FontTester
							styles={[{ tag: "wght", steps: [400] }]}
							hasItalic
							characterVariants={[
								{
									tag: "cv01",
									label: {
										de: "Originales l mit Serifenfuß",
										en: "Original l with serifed base",
									},
								},
								{
									tag: "cv02",
									label: {
										de: "Originales Q mit längerem Schweif",
										en: "Original Q with longer Tail",
									},
								},
								{
									tag: "cv03",
									label: {
										de: "Originales g mit Ohr",
										en: "Original g with ear",
									},
								},
								{
									tag: "cv04",
									label: {
										de: "Originales @",
										en: "Original @",
									},
								},
							]}
							features={["tnum", "liga", "onum"]}
							font={MNCelesta}
							pangram={{
								de: "Vogel Quax zwickt Johnys Pferd Bim durch Auflauftrick...?!",
								en: "How quickly daft jumping zebras vex...? Archaic, I say!",
							}}
						/>
					</div>
				</section>
				<section className="max-w-8xl mx-auto sm:px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="text-center border-x border-black/5 dark:border-white/5">
						<div className="px-6 xl:px-9">
							<h2>{t.rich("CELESTA.Content.Download.heading", {
								accPunct: (mark) => <span className="accent-punctuation from-green">{mark}</span>
							})}</h2>
							<p>{t("CELESTA.Content.Download.text")}</p>
							<br />
						</div>
						<div className="flex justify-center border-y border-black/5 dark:border-white/5 divide-x divide-black/5 dark:divide-white/5">
							<Link href="https://github.com/pprmint/MN-Celesta/tree/main/fonts" target="_blank">
								<Button design="transparent" color="blue" noInitialPadding tabIndex={-1} size="large">
									<GitHub />
									{t("CELESTA.Content.Download.github")}
								</Button>
							</Link>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
