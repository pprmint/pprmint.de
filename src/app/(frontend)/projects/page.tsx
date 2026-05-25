import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Title from "@/components/layout/Title";
import Grid from "./grid";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ArrowRight from "@/icons/ArrowRight";

export async function generateMetadata() {
	const t = await getTranslations("PROJECTS");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
	const t = useTranslations("");
	return (
		<>
			<Title title={t("PROJECTS.Head.title")} description={t("PROJECTS.Head.description")} />
			<main className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
				<Grid />
				<section className="text-center border-x border-black/5 dark:border-white/5 pt-9 lg:pt-16 xl:pt-48">
					<h2>
						{t("PROJECTS.Fonts.heading")}
						<span className="text-green">.</span>
					</h2>
					<p>{t("PROJECTS.Fonts.text")}</p>
					<br />
					<div className="flex border-y border-black/5 dark:border-white/5 justify-center">
						<Link className="flex w-max mx-auto" href="/fonts">
							<Button design="transparent" color="green" tabIndex={-1} size={"large"} noInitialPadding>
								<ArrowRight />
								{t("PROJECTS.Fonts.button")}
							</Button>
						</Link>
					</div>
				</section>
			</main>
		</>
	);
}
