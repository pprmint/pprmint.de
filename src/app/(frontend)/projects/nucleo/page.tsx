import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import Title from "@/components/layout/Title";
import FadingImage from "@/components/ui/FadingImage";

import Link from "next/link";

export async function generateMetadata() {
	const t = await getTranslations("NUCLEO");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
	const t = useTranslations();
	return (
		<>
			<Title title={t("NUCLEO.Head.title")} description={t("NUCLEO.Head.description")} noAccents>
				<div className="absolute inset-0 bg-neutral-950">
					<FadingImage src="/api/assets/file/Nucleo_Hero.webp" alt="" fill className="object-cover" quality={100} />
				</div>
			</Title>
			<main>
				<section>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Nucleo_Title.webp"
							width={3840}
							height={2160}
							unoptimized
							alt="Slide 2"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Nucleo_Pangram.webp"
							width={3840}
							height={2160}
							unoptimized
							alt="Slide 2"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Nucleo_Lipsum.webp"
							width={3840}
							height={2160}
							unoptimized
							alt="Slide 2"
							className="w-full"
						/>
					</div>
				</section>
				<section className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="py-20 md:py-32 xl:py-40 text-center border-x border-black/5 dark:border-white/5">
						<h2 className="mb-6">
							{t("NUCLEO.Content.About.heading")}
							<span className="text-red">.</span>
						</h2>
						<p>
							{t.rich("NUCLEO.Content.About.text1", {
								link: (chunks) => (
									<Link
										href="https://www.youtube.com/watch?v=44ctXlQMk9E"
										target="_blank"
										rel="noopener noreferrer"
										className="text-link-external"
									>
										{chunks}
									</Link>
								),
							})}
						</p>
						<p>
							{t.rich("NUCLEO.Content.About.text2", {
								link: (chunks) => (
									<Link
										href="https://bsky.app/profile/fundeeraaja.bsky.social"
										target="_blank"
										rel="noopener noreferrer"
										className="text-link-external"
									>
										{chunks}
									</Link>
								),
							})}
						</p>
					</div>
				</section>
			</main>
		</>
	);
}
