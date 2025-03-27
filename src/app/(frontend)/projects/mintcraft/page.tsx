import { Viewport } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Marquee from "react-fast-marquee";

import Title from "@/components/layout/Title";
import FadingImage from "@/components/ui/FadingImage";

// Container screenshots (German)
import TSurvivalDE from "/public/assets/mintcraft/de/survival.png";
import TAdvancementsDE from "/public/assets/mintcraft/de/advancements.png";
import TAnvilDE from "/public/assets/mintcraft/de/anvil.png";
import TBeaconDE from "/public/assets/mintcraft/de/beacon.png";
import TCraftingDE from "/public/assets/mintcraft/de/crafting.png";
import TCreativeDE from "/public/assets/mintcraft/de/creative.png";
import TEnchantingDE from "/public/assets/mintcraft/de/enchanting.png";
import TFurnaceDE from "/public/assets/mintcraft/de/furnace.png";
// Container screenshots (English)
import TSurvivalEN from "/public/assets/mintcraft/en/survival.png";
import TAdvancementsEN from "/public/assets/mintcraft/en/advancements.png";
import TAnvilEN from "/public/assets/mintcraft/en/anvil.png";
import TBeaconEN from "/public/assets/mintcraft/en/beacon.png";
import TCraftingEN from "/public/assets/mintcraft/en/crafting.png";
import TCreativeEN from "/public/assets/mintcraft/en/creative.png";
import TEnchantingEN from "/public/assets/mintcraft/en/enchanting.png";
import TFurnaceEN from "/public/assets/mintcraft/en/furnace.png";
import Link from "next/link";
import Button from "@/components/ui/Button";

export async function generateMetadata() {
	const t = await getTranslations("MINTCRAFT");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export const viewport: Viewport = {
	themeColor: "#ffbb00",
};

export default function Page() {
	const locale = useLocale();
	const t = useTranslations("MINTCRAFT");
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<div className="bg-neutral-950" style={{ perspective: 2000 }}>
					<Marquee
						style={{
							width: "125vw",
							height: "900px",
							transform: "rotateX(20deg) rotateY(10deg) rotateZ(-15deg)",
						}}
						speed={50}
						gradient
						gradientColor="#111"
						gradientWidth={500}
					>
						{locale === "en" && (
							<>
								<FadingImage
									src={TBeaconEN}
									alt=""
									quality={90}
									priority
									className="inline-block h-auto m-6"
								/>
								<FadingImage
									src={TSurvivalEN}
									alt=""
									quality={90}
									priority
									className="inline-block h-auto m-6"
								/>
								<FadingImage
									src={TEnchantingEN}
									alt=""
									quality={90}
									priority
									className="inline-block h-auto m-6"
								/>
								<FadingImage
									src={TCreativeEN}
									alt=""
									quality={90}
									priority
									className="inline-block h-auto m-6"
								/>
								<FadingImage
									src={TCraftingEN}
									alt=""
									quality={90}
									priority
									className="inline-block h-auto m-6"
								/>
								<FadingImage
									src={TFurnaceEN}
									alt=""
									quality={90}
									priority
									className="inline-block h-auto m-6"
								/>
								<FadingImage
									src={TAdvancementsEN}
									alt=""
									quality={90}
									priority
									className="inline-block h-auto m-6"
								/>
								<FadingImage
									src={TAnvilEN}
									alt=""
									quality={90}
									priority
									className="inline-block h-auto m-6"
								/>
							</>
						)}
						{locale === "de" && (
							<>
								<FadingImage
									src={TBeaconDE}
									alt=""
									quality={90}
									priority
									className="inline-block h-auto m-6"
								/>
								<FadingImage
									src={TSurvivalDE}
									alt=""
									quality={90}
									priority
									className="inline-block h-auto m-6"
								/>
								<FadingImage
									src={TEnchantingDE}
									alt=""
									quality={90}
									priority
									className="inline-block h-auto m-6"
								/>
								<FadingImage
									src={TCreativeDE}
									alt=""
									quality={90}
									priority
									className="inline-block h-auto m-6"
								/>
								<FadingImage
									src={TCraftingDE}
									alt=""
									quality={90}
									priority
									className="inline-block h-auto m-6"
								/>
								<FadingImage
									src={TFurnaceDE}
									alt=""
									quality={90}
									priority
									className="inline-block h-auto m-6"
								/>
								<FadingImage
									src={TAdvancementsDE}
									alt=""
									quality={90}
									priority
									className="inline-block h-auto m-6"
								/>
								<FadingImage
									src={TAnvilDE}
									alt=""
									quality={90}
									priority
									className="inline-block h-auto m-6"
								/>
							</>
						)}
					</Marquee>
				</div>
			</Title>
			<main className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
				<section className="pt-20 md:pt-32 xl:pt-40 border-x border-black/5 dark:border-white/5">
					<h2>
						{t("Content.About.heading")}
						<span className="text-yellow">.</span>
					</h2>
					<p>{t("Content.About.text1")}</p>
					<p>{t("Content.About.text2")}</p>
					<p>{t("Content.About.text3")}</p>
					<p>{t("Content.About.text4")}</p>
					<p>
						{t.rich("Content.About.text5", {
							Link: (chunks) => (
								<Link href="/project/mintbit" className="text-link">
									{chunks}
								</Link>
							),
						})}
					</p>
					<p>{t("Content.About.text6")}</p>
				</section>
				<section className="pt-20 md:pt-32 xl:pt-40 border-x border-black/5 dark:border-white/5">
					<h2>
						{t("Content.Credits.heading")}
						<span className="text-yellow">.</span>
					</h2>
					<Link
						href="https://twitter.com/AfkBlizzy"
						target="_blank"
						rel="noopener noreferrer"
						className="text-link-external"
					>
						<h3>Blizzy</h3>
					</Link>
					<p className="pb-3">{t("Content.Credits.blizzy")}</p>
					<Link
						href="https://vanillatweaks.net"
						target="_blank"
						rel="noopener noreferrer"
						className="text-link-external"
					>
						<h3>Vanilla Tweaks</h3>
					</Link>
					<p>{t("Content.Credits.vanillaTweaks")}</p>
				</section>
				<section className="pt-20 md:pt-32 xl:pt-40 border-x border-black/5 dark:border-white/5">
					<h2>
						{t("Content.MayContainMistakes.heading")}
						<span className="text-yellow">.</span>
					</h2>
					{t.rich("Content.MayContainMistakes.text", {
						Link: (chunks) => (
							<Link href="/contact" className="text-link">
								{chunks}
							</Link>
						),
					})}
				</section>
				<section className="pt-20 md:pt-32 xl:pt-40 border-x border-black/5 dark:border-white/5 text-center">
					<h2>{t("Content.Download.heading")}</h2>
					{t("Content.Download.text")}
					<div className="flex gap-3 pt-6 justify-center">
						<Link
							href="https://modrinth.com/resourcepack/mintcraft/versions"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button tabIndex={-1} color="green" design="filled">
								<svg
									role="img"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									className="size-4 fill-current"
								>
									<path d="M12.252.004a11.78 11.768 0 0 0-8.92 3.73 11 10.999 0 0 0-2.17 3.11 11.37 11.359 0 0 0-1.16 5.169c0 1.42.17 2.5.6 3.77.24.759.77 1.899 1.17 2.529a12.3 12.298 0 0 0 8.85 5.639c.44.05 2.54.07 2.76.02.2-.04.22.1-.26-1.7l-.36-1.37-1.01-.06a8.5 8.489 0 0 1-5.18-1.8 5.34 5.34 0 0 1-1.3-1.26c0-.05.34-.28.74-.5a37.572 37.545 0 0 1 2.88-1.629c.03 0 .5.45 1.06.98l1 .97 2.07-.43 2.06-.43 1.47-1.47c.8-.8 1.48-1.5 1.48-1.52 0-.09-.42-1.63-.46-1.7-.04-.06-.2-.03-1.02.18-.53.13-1.2.3-1.45.4l-.48.15-.53.53-.53.53-.93.1-.93.07-.52-.5a2.7 2.7 0 0 1-.96-1.7l-.13-.6.43-.57c.68-.9.68-.9 1.46-1.1.4-.1.65-.2.83-.33.13-.099.65-.579 1.14-1.069l.9-.9-.7-.7-.7-.7-1.95.54c-1.07.3-1.96.53-1.97.53-.03 0-2.23 2.48-2.63 2.97l-.29.35.28 1.03c.16.56.3 1.16.31 1.34l.03.3-.34.23c-.37.23-2.22 1.3-2.84 1.63-.36.2-.37.2-.44.1-.08-.1-.23-.6-.32-1.03-.18-.86-.17-2.75.02-3.73a8.84 8.839 0 0 1 7.9-6.93c.43-.03.77-.08.78-.1.06-.17.5-2.999.47-3.039-.01-.02-.1-.02-.2-.03Zm3.68.67c-.2 0-.3.1-.37.38-.06.23-.46 2.42-.46 2.52 0 .04.1.11.22.16a8.51 8.499 0 0 1 2.99 2 8.38 8.379 0 0 1 2.16 3.449 6.9 6.9 0 0 1 .4 2.8c0 1.07 0 1.27-.1 1.73a9.37 9.369 0 0 1-1.76 3.769c-.32.4-.98 1.06-1.37 1.38-.38.32-1.54 1.1-1.7 1.14-.1.03-.1.06-.07.26.03.18.64 2.56.7 2.78l.06.06a12.07 12.058 0 0 0 7.27-9.4c.13-.77.13-2.58 0-3.4a11.96 11.948 0 0 0-5.73-8.578c-.7-.42-2.05-1.06-2.25-1.06Z" />
								</svg>
								Modrinth
							</Button>
						</Link>
						<Link
							href="https://github.com/pprmint/Mintcraft/releases"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button tabIndex={-1} color="blue" design="filled">
								<svg
									role="img"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									className="size-4 fill-current"
								>
									<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
								</svg>
								GitHub
							</Button>
						</Link>
					</div>
				</section>
			</main>
		</>
	);
}
