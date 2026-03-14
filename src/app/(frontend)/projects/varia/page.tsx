import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import Title from "@/components/layout/Title";
import FadingImage from "@/components/ui/FadingImage";

import Link from "next/link";
import ArrowRight from "@/icons/ArrowRight";
import Tester from "./tester";
import Button from "@/components/ui/Button";
import Download from "@/icons/Download";
import GitHub from "@/icons/GitHub";

export async function generateMetadata() {
	const t = await getTranslations("VARIA");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
	const t = useTranslations();
	return (
		<>
			<Title title={t("VARIA.Head.title")} description={t("VARIA.Head.description")}>
				<div className="absolute inset-0 bg-neutral-950">
					<FadingImage
						src="/api/assets/file/3D_a_edit2.webp"
						alt=""
						fill
						className="w-full max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20 object-cover mix-blend-screen opacity-75"
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
						<FadingImage
							src="/api/assets/file/Varia_Cover.png"
							width={3840}
							height={2160}
							unoptimized
							alt="Slide 2"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Varia_Alphabet.png"
							width={3840}
							height={2160}
							alt="Slide 1"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Varia_CharacterVariants.png"
							width={3840}
							height={2160}
							alt="Slide 4"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Varia_StVO.png"
							width={3840}
							height={2160}
							alt="Slide 3"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Varia_Time.png"
							width={3840}
							height={2160}
							alt="Slide 5"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Varia_Faktor.png"
							width={3840}
							height={2160}
							alt="Slide 6"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Varia_Testimony.png"
							width={3840}
							height={2160}
							alt="Slide 6"
							className="w-full"
						/>
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage
							src="/api/assets/file/Varia_ReleaseDate.png"
							width={3840}
							height={2160}
							alt="Slide 6"
							className="w-full"
						/>
					</div>
				</section>
				<section className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="py-20 md:py-32 xl:py-40 text-center border-x border-black/5 dark:border-white/5">
						<h2 className="mb-6">
							{t("VARIA.Content.Tester.heading")}
							<span className="text-green">.</span>
						</h2>
						<Tester />
					</div>
				</section>
				<section className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="text-center border-x border-black/5 dark:border-white/5">
						<h2>
							{t("VARIA.Content.Download.heading")}
							<span className="text-green">.</span>
						</h2>
						<p>{t("VARIA.Content.Download.text")}</p>
						<br />
						<div className="flex border-y border-black/5 dark:border-white/5 justify-center">
							<Link href="/api/download/file/MNVaria_0.017.zip" download target="_blank">
								<Button design="transparent" color="green" tabIndex={-1} size="large" noInitialPadding>
									<Download />
									{t("COMMON.download")}
								</Button>
							</Link>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
