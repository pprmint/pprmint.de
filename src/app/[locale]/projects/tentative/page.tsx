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
import WebsiteMembers from "public/assets/tentative/websiteMembers.png";
import WebsiteProfile from "public/assets/tentative/websiteProfile.png";
import WebsiteLocales from "public/assets/tentative/websiteLocales.png";
import IconWxz from "public/assets/tentative/icons/wxz.svg";
import IconAutsellia from "public/assets/tentative/icons/autsellia.svg";
import IconPprmint from "public/assets/tentative/icons/leafperson.svg";
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
			<Title title={t("Head.title")} description={t("Head.description")} accentColor="text-violet-500">
				<video
					src="/assets/tentative/LogoCollection.mp4"
					autoPlay
					playsInline
					muted
					loop
					className="absolute w-screen min-h-screen max-h-svh object-cover"
				/>
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
						That wasn't meant to be the final name at first. It just served as a stop-gap name until we came
						up with something better, just so we wouldn't need to refer to it as just "the group".
					</p>
					<FadingImage
						src={NamesImage}
						className="w-full h-auto"
						alt="Crossed out name ideas, scattered around the word 'Tentative' in the center."
					/>
					<p>
						Even though the name wasn't finalized at the time, I still felt like playing with it a bit,
						experimenting with a few design ideas here and there. Initial ideas used the pixely{" "}
						<Link
							href="https://github.com/Bananattack/omelette_font"
							target="_blank"
							rel="noopener noreferrer"
							className="text-link-external"
						>
							Omelette Small
						</Link>{" "}
						font for the logo and headings in combination with{" "}
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
						general idea of what I was going for.
					</p>
					<div className="border border-neutral-900 rounded-xl overflow-clip p-1 my-9">
						<div className="flex items-center mb-1 gap-1">
							<div className="group flex gap-3 p-2">
								<button className="bg-red active:bg-red-700 rounded-full duration-50">
									<X className="opacity-0 group-hover:opacity-100 duration-100 fill-red-900 stroke-1 stroke-red-900" />
								</button>
								<button className="bg-yellow active:bg-yellow-700 rounded-full duration-50">
									<div className="w-[7px] mx-1 h-0.5 opacity-0 group-hover:opacity-100 duration-100 bg-yellow-900" />
								</button>
								<button className="bg-green active:bg-green-700 rounded-full duration-50">
									<TriangleBottomLeftTopRight className="opacity-0 group-hover:opacity-100 duration-100 fill-green-900 p-0.5" />
								</button>
							</div>
							<div className="inline-flex items-center gap-3 px-3 bg-neutral-900 py-0.5 flex-grow rounded-md">
								<Lock />
								<p className="flex-grow text-sm py-0.5">
									<span className="opacity-50">https://</span>
									tentative.name
								</p>
								<Bookmark />
							</div>
							<div className="hidden sm:flex gap-3 px-2">
								<Download />
								<Jiggy />
								<Menu />
							</div>
						</div>
						<Carousel images={[OldWebsite1, OldWebsite2, OldWebsite3]} className="rounded-md w-full aspect-video" />
					</div>
					<p>
						There wasn't really much rhyme or reason behind the decisions I made here. I just saw this as an
						opportunity to try out two ideas I've had for a while: Using a pixel font and the color purple
						(my favorite (green is a close second)).
					</p>
				</section>
				<section className="max-w-7xl mx-auto px-6 md:px-9 my-20">
					<h2>
						69 days later<span className="text-green">.</span>
					</h2>
					<p>I threw it all out the window.</p>
					<FadingImage src={BrandingRev0} alt="" className="my-9 rounded-xl" />
					<p>
						I found the{" "}
						<Link
							href="https://www.behance.net/gallery/168183377/NOHEMI-Typeface-Free-Variable-9-Styles"
							target="_blank"
							rel="noopener noreferrer"
							className="text-link-external"
						>
							Nohemi
						</Link>{" "}
						font and (somewhat arbitrarily) decided to focus on the angle of the left stroke of the capital
						"A" in the light (200) weight of the font for the design, which turned out to be 21.5 degrees.
						As a nod to the "TENT" in the name I tried to make the "A" look more like a tent by combining it
						with the left and right strokes from the light and black (900) weights respectively, removing
						the middle bar in the process.
					</p>
					<p>
						If you feel like something's off about that stylized A, you are not alone. We also thought it
						looked weird at some point, so I fixed it.
					</p>
					<video src="/assets/tentative/LogoFix.mp4" autoPlay playsInline muted loop />
					<p>
						Separating the "TIVE" from the "TENTA" part by setting it in the black weight turned turned out
						to be a neat idea, as "TENTA" could now be used as a prefix for other projects, or be
						substituted for the tent icon if space was tight.
					</p>
					<p>... "Tent" and "A"... Tent-A? Whatever.</p>
					<p>
						A somewhat recurring theme is the use of parallelograms and 21.5 degree angles, most prominently
						as an optional design element behind the Tentative wordmark, as well as the website.
					</p>
					<p>
						While Tentative used purple and later a combination of soft gold and green in the first few of
						ideas, the intention this time was to keep Tenative itself monochrome. Instead each member would
						be displayed around their own signature color, putting the focus more on them individually.
						However this would have made any materials about the group itself look really boring, so we
						ultimately decided on <span className="text-violet-500">violet</span> to be Tentative's main
						brand color.
					</p>
				</section>
				<section className="max-w-7xl mx-auto px-6 md:px-9 my-20">
					<div className="flex flex-col md:flex-row gap-9 my-9">
						<div className="w-full">
							<h2>
								The website<span className="text-green">.</span>
							</h2>
							<p>
								This page is already long enough, so I'll just talk about the present version of the
								site.
							</p>
							<p>
								First of all: Since Tentative has members from various different parts of the world, we
								thought it would be neat to localize the site into languages that each member can speak
								and write well. That means the site will (eventually) be available in English, German,
								French, Japanese and Thai.
							</p>
							<p>What is translated how is up to each member and the language they take care of.</p>
						</div>
						<FadingImage
							src={WebsiteLocales}
							alt=""
							className="rounded-lg md:w-1/2 lg:w-1/3 h-fit mx-auto"
						/>
					</div>
					<p>
						Every member has their own logo in a different style. To achieve some feeling of uniformity, I
						introduced unique icons for each member in an early concept of the site. The icons represent a
						certain element about that member's branding, their character, or whatever else. These icons are
						made in a 7x7 pixel grid for more simplicity, but also flexibility. These can be used at small
						scale as they are, or at large scale with other effects like borders and gradients.
					</p>
					<div className="grid grid-cols-2 md:grid-cols-3 w-full items-center justify-between gap-12 my-9">
						<div>
							<FadingImage src={IconWxz} alt="" className="size-full md:size-64" />
							<p className="text-center mt-6 text-neutral-50 text-xl font-display font-medium">wxsonz</p>
						</div>
						<div>
							<FadingImage src={IconAutsellia} alt="" className="size-full md:size-64" />
							<p className="text-center mt-6 text-neutral-50 text-xl font-display font-medium">Autsellia</p>
						</div>
						<div>
							<FadingImage src={IconPprmint} alt="" className="size-full md:size-64" />
							<p className="text-center mt-6 text-neutral-50 text-xl font-display font-medium">Good today.</p>
						</div>
					</div>
					<p>
						While the landing page isn't fully complete as of writing this, there is a distinct section on
						it that features every Tentative member. Prominently displayed is a drawing of their respective
						OCs, their logo and their respective icons in the background visible on hover.
					</p>
					<FadingImage src={WebsiteMembers} alt="" className="my-9 rounded-lg" />
				</section>
			</main>
		</>
	);
}
