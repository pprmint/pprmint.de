import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "TENTATIVE" });
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

type Props = {
	params: { locale: string };
};

export default function Page({ params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const t = useTranslations("TENTATIVE");
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<div className="absolute flex items-center justify-center inset-0 bg-black p-12">
					<video
						src="/assets/tentative/icon.mp4"
						autoPlay
						playsInline
						muted
						loop
						className="rounded-full"
					/>
				</div>
			</Title>
			<main className="max-w-7xl mx-auto px-6 md:px-9">soon™</main>
		</>
	);
}
