import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import Title from "@/components/layout/Title";
import FadingImage from "@/components/ui/FadingImage";

import Link from "next/link";
import ArrowRight from "@/icons/ArrowRight";

export async function generateMetadata() {
	const t = await getTranslations("VARIA");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
	const t = useTranslations("VARIA");
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
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
						<FadingImage src="/api/assets/file/Varia_Cover.png" width={3840} height={2160} unoptimized alt="Slide 2" className="w-full" />
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage src="/api/assets/file/Varia_Alphabet.png" width={3840} height={2160} alt="Slide 1" className="w-full" />
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage src="/api/assets/file/Varia_CharacterVariants.png" width={3840} height={2160} alt="Slide 4" className="w-full" />
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage src="/api/assets/file/Varia_StVO.png" width={3840} height={2160} alt="Slide 3" className="w-full" />
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage src="/api/assets/file/Varia_Time.png" width={3840} height={2160} alt="Slide 5" className="w-full" />
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage src="/api/assets/file/Varia_Faktor.png" width={3840} height={2160} alt="Slide 6" className="w-full" />
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage src="/api/assets/file/Varia_ReleaseDate.png" width={3840} height={2160} alt="Slide 6" className="w-full" />
					</div>
					<div className="relative w-full aspect-video">
						<FadingImage src="/api/assets/file/MinaSans_Mina.png" width={3840} height={2160} alt="Slide 4" className="w-full" />
					</div>
				</section>
				<section className="max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20">
					<div className="pt-20 md:pt-32 xl:pt-40 border-x border-black/5 dark:border-white/5">
						<h2 className="text-center">
							<Link href="/tradeoffer" className="group inline-flex items-center gap-3">
								{t("Content.deal")}
								<div className="relative overflow-clip size-[30px]">
									<ArrowRight className="size-[30px] stroke-1 stroke-green absolute group-hover:translate-x-full group-hover:duration-400 ease-out-expo" />
									<ArrowRight className="size-[30px] stroke-1 stroke-green absolute -translate-x-full group-hover:translate-x-0 group-hover:duration-400 ease-out-expo" />
								</div>
							</Link>
						</h2>
					</div>
				</section>
			</main>
		</>
	);
}
