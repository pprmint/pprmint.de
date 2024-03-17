import { useLocale, useTranslations } from "next-intl";
import Marquee from "react-fast-marquee";

import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";

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
import { Link } from "src/navigation";
import Button from "src/components/ui/Button";
import { SiGithub, SiModrinth } from "@icons-pack/react-simple-icons";

export default function Page() {
	const t = useTranslations("MINTCRAFT");
	const locale = useLocale();
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")} accentColor="text-yellow">
				<div style={{ perspective: 2000 }}>
					<Marquee
						gradientColor="#111"
						style={{
							width: "125vw",
							height: "900px",
							transform: "rotateX(20deg) rotateY(10deg) rotateZ(-15deg)",
						}}
						speed={50}
					>
						{locale === "en" && (
							<>
								<FadingImage src={TBeaconEN} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TSurvivalEN} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TEnchantingEN} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TCreativeEN} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TCraftingEN} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TFurnaceEN} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TAdvancementsEN} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TAnvilEN} alt="" quality={90} priority className="inline-block h-auto m-6" />
							</>
						)}
						{locale === "de" && (
							<>
								<FadingImage src={TBeaconDE} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TSurvivalDE} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TEnchantingDE} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TCreativeDE} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TCraftingDE} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TFurnaceDE} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TAdvancementsDE} alt="" quality={90} priority className="inline-block h-auto m-6" />
								<FadingImage src={TAnvilDE} alt="" quality={90} priority className="inline-block h-auto m-6" />
							</>
						)}
					</Marquee>
				</div>
			</Title>
			<main className="max-w-7xl mx-auto px-6 md:px-9">
				<section className="my-20">
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
				<section className="my-20">
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
						<h3>
							Blizzy
							<i className="ri-arrow-right-up-line text-blue" />
						</h3>
					</Link>
					<p className="pb-3">{t("Content.Credits.blizzy")}</p>
					<Link
						href="https://vanillatweaks.net"
						target="_blank"
						rel="noopener noreferrer"
						className="text-link-external"
					>
						<h3>
							Vanilla Tweaks
							<i className="ri-arrow-right-up-line text-blue" />
						</h3>
					</Link>
					<p>{t("Content.Credits.vanillaTweaks")}</p>
				</section>
				<section className="my-20">
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
				<section className="my-20">
					<h2>{t("Content.Download.heading")}</h2>
					{t("Content.Download.text")}
					<div className="flex gap-3 pt-6">
						<Link href="https://modrinth.com/resourcepack/mintcraft/versions" target="_blank" rel="noopener noreferrer">
							<Button tabIndex={-1} color="green">
								<SiModrinth size={16} />
								Modrinth
							</Button>
						</Link>
						<Link href="https://github.com/pprmint/Mintcraft/releases" target="_blank" rel="noopener noreferrer">
							<Button tabIndex={-1} color="blue">
								<SiGithub size={16} />
								GitHub
							</Button>
						</Link>
					</div>
				</section>
			</main>
		</>
	);
}
