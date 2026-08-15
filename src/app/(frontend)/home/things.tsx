import FadingImage from "@/components/ui/FadingImage";
import ArrowRight from "@/icons/ArrowRight";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Things() {
	const t = await getTranslations("HOME.Content.Things");

	function Arrow() {
		return (
			<div className="xl:ml-auto relative size-11.25 overflow-clip duration-0">
				<ArrowRight width={45} height={45} className="absolute group-hover:opacity-0 group-hover:duration-100" />
				<ArrowRight
					width={45}
					height={45}
					className="text-neutral-950 dark:text-white stroke-current stroke-[1px] absolute -translate-x-full group-hover:translate-x-0 group-hover:delay-100 group-hover:duration-400 ease-out-quint"
				/>
			</div>
		);
	}
	return (
		<section className="relative w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
			<div className="grid grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 border border-black/5 dark:border-white/5 w-full">
				<Link
					href="/fonts"
					className="group flex items-center xl:flex-col xl:items-start justify-between col-span-2 xl:col-span-1 xl:order-3 p-6 xl:p-9 hover:bg-black/5 dark:hover:bg-white/5 duration-200 hover:duration-0"
				>
					<div>
					<h2>
						{t("Fonts.heading")}
						<span className="text-green">.</span>
					</h2>
					<p className="xl:text-xl">{t("Fonts.description")}</p>
					</div>
					<Arrow />
				</Link>
				<Link
					href="/fonts/varia"
					className="hover:brightness-110 hover:contrast-90 duration-200 hover:duration-0 xl:col-span-2 xl:row-span-2 relative w-full aspect-video xl:border-r border-black/5 dark:border-white/5"
				>
					<FadingImage src="/api/assets/file/MNVaria_Thumbnail.png" width={1920} height={1080} alt="MN Varia" />
				</Link>
				<Link href="/fonts/covert" className="hover:brightness-110 hover:contrast-90 duration-200 hover:duration-0 relative w-full aspect-video">
					<FadingImage src="/api/assets/file/MNCovert_Thumbnail.webp" width={1920} height={1080} alt="MN Covert" />
				</Link>
			</div>
			<div className="h-9 lg:h-20 w-full border-x border-black/5 dark:border-white/5" />
			<div className="grid grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 border border-black/5 dark:border-white/5 w-full">
				<Link
					href="/photos"
					className="group flex items-center xl:flex-col xl:items-start justify-between col-span-2 xl:col-span-1 p-6 xl:p-9 hover:bg-black/5 dark:hover:bg-white/5 duration-200 hover:duration-0"
				>
					<div>
					<h2>
						{t("Photos.heading")}
						<span className="text-green">.</span>
					</h2>
					<p className="xl:text-xl">{t("Photos.description")}</p>
					</div>
					<Arrow />
				</Link>
				<Link
					href="/photos"
					className="hover:brightness-110 hover:contrast-90 duration-200 hover:duration-0 xl:col-span-2 xl:row-span-2 relative w-full aspect-3/2 xl:border-l border-black/5 dark:border-white/5 overflow-hidden"
				>
					<FadingImage src="/api/photos/file/DSC00275.webp" width={6192} height={4128} alt="" />
				</Link>
				<Link href="/photos" className="hover:brightness-110 hover:contrast-90 duration-200 hover:duration-0 relative w-full aspect-3/2 overflow-hidden">
					<FadingImage src="/api/photos/file/DSC01569.webp" width={6192} height={4128} alt="" />
				</Link>
			</div>
			<div className="h-9 lg:h-20 w-full border-x border-black/5 dark:border-white/5" />
			<div className="grid grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 border border-black/5 dark:border-white/5 w-full">
				<Link
					href="/graphics"
					className="group flex items-center xl:flex-col xl:items-start justify-between col-span-2 xl:col-span-1 xl:order-1 p-6 xl:p-9 hover:bg-black/5 dark:hover:bg-white/5 duration-200 hover:duration-0"
				>
					<div>
					<h2>
						{t("Graphics.heading")}
						<span className="text-green">.</span>
					</h2>
					<p className="xl:text-xl">{t("Graphics.description")}</p>
					</div>
					<Arrow />
				</Link>
				<Link
					href="/graphics/solar-system-3"
					className="hover:brightness-110 hover:contrast-90 duration-200 hover:duration-0 xl:col-span-2 xl:row-span-2 relative w-full aspect-video xl:border-r border-black/5 dark:border-white/5"
				>
					<FadingImage src="/api/assets/file/Solar_System_2_f133addf64.webp" width={1920} height={1080} alt="" />
				</Link>
				<Link
					href="http://localhost:3000/graphics/opensuse-rebrand-concept"
					className="hover:brightness-110 hover:contrast-90 duration-200 hover:duration-0 relative w-full aspect-video xl:order-2"
				>
					<FadingImage src="/api/assets/file/openSUSE_overview_19d4d56646.png" width={1920} height={1080} alt="" />
				</Link>
			</div>
			<div className="h-9 lg:h-16 xl:h-48 w-full border-x border-black/5 dark:border-white/5" />
		</section>
	);
}
