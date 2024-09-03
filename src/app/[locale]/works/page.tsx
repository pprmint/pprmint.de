import { getTranslations } from "next-intl/server";
import GallerySelector from "./selector";

type Props = {
	params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "WORKS" });
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default async function Page() {
	return <GallerySelector />;
}
