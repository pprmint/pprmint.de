import { getLocale, getTranslations } from "next-intl/server";
import Title from "@/components/layout/Title";
import FadingImage from "@/components/ui/FadingImage";

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
						src={`/api/assets/file/letter_${locale}.webp`}
						width={1438}
						height={700}
						alt=""
						className="absolute right-4 lg:right-1/8 translate-x-1/8 bottom-0 lg:top-1/4 rotate-6 w-3/5 max-w-3xl h-auto"
						hideSpinner
					/>
					<div className="absolute inset-0 bg-linear-to-r from-neutral-950" />
					<FadingImage
						src={`/api/assets/file/postmina_${locale}.webp`}
						width={1158}
						height={3238}
						alt=""
						hideSpinner
						className="absolute right-1/8 bottom-0 sm:bottom-auto h-full pt-6 w-auto md:w-1/3 max-w-md md:h-auto drop-shadow-2xl drop-shadow-neutral-950/75"
					/>
				</div>
			</Title>
			<main className="w-full max-w-8xl sm:px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
				<Form />
			</main>
		</>
	);
}
