import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "src/navigation";
import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";
import Carousel from "src/components/ui/Carousel";

import NamesImage from "public/assets/tentative/names.svg";
import OldWebsite1 from "public/assets/tentative/website1.png";
import OldWebsite2 from "public/assets/tentative/website2.png";
import OldWebsite3 from "public/assets/tentative/website3.png";
import BrandingRev0 from "public/assets/tentative/branding_rev0.png";

import X from "src/icons/X";
import TriangleBottomLeftTopRight from "src/icons/TriangleBottomLeftTopRight";
import Lock from "src/icons/Lock";
import Download from "src/icons/Download";
import Jiggy from "src/icons/Jiggy";
import Menu from "src/icons/Menu";
import Bookmark from "src/icons/Bookmark";

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
					<video src="/assets/tentative/icon.mp4" autoPlay playsInline muted loop className="rounded-full" />
				</div>
			</Title>
			<main>
				<section className="max-w-7xl mx-auto px-6 md:px-9 my-20">
					<h2>
						About Tentative<span className="text-green">.</span>
					</h2>
					<p>
						Tentative spawned from the brains of a few people who decided they wanted to form a group, under
						which they can work on projects together or just support each other. As of writing this,
						Tentative consists of two illustrators and a designer and developer of questionable quality.
					</p>
					<p>
						Tentative wasn't meant to be the final name. The idea was to just use it as a stop-gap name
						until we came up with something better, just so we wouldn't need to refer to it as just "the
						group".
					</p>
					<FadingImage
						src={NamesImage}
						className="w-full h-auto"
						alt="Crossed out name ideas, scattered around the word 'Tentative' in the center."
					/>
					<p>
						Even though the name wasn't finalized at the time, I felt like playing with the name a bit,
						experimenting with a few design ideas here and there. Initial ideas used the pixely{" "}
						<Link
							href="https://github.com/Bananattack/omelette_font"
							target="_blank"
							rel="noopener noreferrer"
							className="text-link-external"
						>
							Omelette Small
						</Link>{" "}
						font for the logo and headings, in combination with{" "}
						<Link
							href="https://github.com/mozilla/Fira"
							target="_blank"
							rel="noopener noreferrer"
							className="text-link-external"
						>
							Fira Sans
						</Link>{" "}
						for body text. For later experiments I used{" "}
						<Link
							href="https://fontshare.com/fonts/bespoke-sans"
							target="_blank"
							rel="noopener noreferrer"
							className="text-link-external"
						>
							Bespoke Sans
						</Link>{" "}
						and{" "}
						<Link
							href="https://fontshare.com/fonts/bespoke-serif"
							target="_blank"
							rel="noopener noreferrer"
							className="text-link-external"
						>
							Bespoke Serif
						</Link>
						.
					</p>
					<p>
						Here are screenshots of the first few websites from late 2022 to early 2023 to give you a
						general idea.
					</p>
					<div className="border border-neutral-900 rounded-xl overflow-clip p-1 my-9">
						<div className="flex items-center mb-1 gap-1">
							<div className="flex gap-3 p-2">
								<button className="group bg-red active:bg-red-700 rounded-full duration-50">
									<X className="opacity-0 group-hover:opacity-100 duration-100 fill-red-900 stroke-1 stroke-red-900" />
								</button>
								<button className="group bg-yellow active:bg-yellow-700 rounded-full duration-50">
									<div className="w-[7px] mx-1 h-0.5 opacity-0 group-hover:opacity-100 duration-100 bg-yellow-900" />
								</button>
								<button className="group bg-green active:bg-green-700 rounded-full duration-50">
									<TriangleBottomLeftTopRight className="opacity-0 group-hover:opacity-100 duration-100 fill-green-900 p-0.5" />
								</button>
							</div>
							<div className="inline-flex items-center gap-3 px-3 bg-neutral-900 py-0.5 flex-grow rounded-sm">
								<Lock />
								<p className="flex-grow text-sm py-0.5">
									<span className="opacity-50">https://</span>
									tentative.name
								</p>
								<Bookmark />
							</div>
							<div className="flex gap-3 px-2">
								<Download />
								<Jiggy />
								<Menu />
							</div>
						</div>
						<Carousel images={[OldWebsite1, OldWebsite2, OldWebsite3]} className="rounded-md" />
					</div>
					<p>
						At first there wasn't really any rhyme or reason behind the decisions made here. I just saw this
						as an opportunity to try out two ideas I've had for a while: Using a pixel font and the color
						purple (my favorite).
					</p>
				</section>
				<section className="max-w-7xl mx-auto px-6 md:px-9 my-20">
					<h2>
						69 days later<span className="text-green">.</span>
					</h2>
					<p>I threw it all out the window.</p>
					<FadingImage src={BrandingRev0} alt="" className="my-9 rounded-xl" />
					<p>
						I got hold of the{" "}
						<Link
							href="https://www.behance.net/gallery/168183377/NOHEMI-Typeface-Free-Variable-9-Styles"
							target="_blank"
							rel="noopener noreferrer"
							className="text-link-external"
						>
							Nohemi
						</Link>{" "}
						font and (somewhat arbitrarily) decided to focus on the angle of the left stroke of the capital
						"A" in the light (200) weight of the font, which turned out to be 21.5 degrees. As a nod to the
						"TENT" in the name I tried to make the "A" look more like a tent by combining it with the "A"
						from the black (900) weight, removing the middle bar of the A in the process. To match, the rest
						of the name was set in the black weight as well, separating it from the "TENTA" part.
					</p>
					<p>
						A paralelogram could optionally be placed behind the logo and may contain (originally)
						monochrome and dithered imagery that's either abstract or contextually fitting.
					</p>
					<p>
						While Tentative first used purple and later a combination of soft gold and green, the intention
						here was to keep Tenative itself monochrome. Instead, color would only be used along with
						respective members in context.
					</p>
				</section>
			</main>
		</>
	);
}
