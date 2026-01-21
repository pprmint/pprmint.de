import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Title from "@/components/layout/Title";
import FadingImage from "@/components/ui/FadingImage";

import NamesImage from "@public/assets/tentative/names.svg";
import WebsiteMembers from "@public/assets/tentative/websiteMembers.png";
import WebsiteProfile from "@public/assets/tentative/websiteProfile.png";
import WebsiteLocales from "@public/assets/tentative/websiteLocales.png";
import IconWxz from "@public/assets/tentative/icons/wxz.svg";
import IconAutsellia from "@public/assets/tentative/icons/autsellia.svg";
import IconPprmint from "@public/assets/tentative/icons/leafperson.svg";
import BrandingRev0 from "@public/assets/tentative/branding_rev0.png";

import BrowserWindow from "./browser";

export async function generateMetadata() {
	const t = await getTranslations("TENTATIVE");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page() {
	const t = useTranslations("TENTATIVE");
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<video
					src="https://cms.pprmint.de/uploads/hero_dedff7564d.mp4"
					autoPlay
					playsInline
					muted
					loop
					className="absolute w-screen min-h-screen max-h-svh object-cover"
				/>
			</Title>
			<main className="max-w-8xl mx-auto px-6 md:px-9 lg:px-12 xl:px-20">
				<section className="pt-20 md:pt-32 xl:pt-40 border-x border-black/5 dark:border-white/5">
					<h2>
						About Tentative<span className="text-green">.</span>
					</h2>
					<p>
						Tentative spawned from the brains of a few people who decided they wanted to form a group, under which they can work on projects
						together or just support each other. As of writing this, Tentative consists of two illustrators and a designer and developer of
						questionable quality.
					</p>
					<p>
						That wasn't meant to be the final name at first. It just served as a stop-gap name until we came up with something better, just
						so we wouldn't need to refer to it as just "the group".
					</p>
					<div className="relative w-full aspect-video">
						<FadingImage
							src={NamesImage}
							className="w-full h-auto"
							alt="Crossed out name ideas, scattered around the word 'Tentative' in the center."
						/>
					</div>
					<p>
						Even though the name wasn't finalized at the time, I still felt like playing with it a bit, experimenting with a few design
						ideas here and there. Initial ideas used the pixely{" "}
						<Link
							href="https://github.com/Bananattack/omelette_font"
							target="_blank"
							rel="noopener noreferrer"
							className="text-link-external"
						>
							Omelette Small
						</Link>{" "}
						font for the logo and headings in combination with{" "}
						<Link href="https://github.com/mozilla/Fira" target="_blank" rel="noopener noreferrer" className="text-link-external">
							Fira Sans
						</Link>{" "}
						for body text. For later experiments I used{" "}
						<Link href="https://fontshare.com/fonts/bespoke-sans" target="_blank" rel="noopener noreferrer" className="text-link-external">
							Bespoke Sans
						</Link>{" "}
						and{" "}
						<Link href="https://fontshare.com/fonts/bespoke-serif" target="_blank" rel="noopener noreferrer" className="text-link-external">
							Bespoke Serif
						</Link>
						.
					</p>
					<p>
						Here are screenshots of the first few websites from late 2022 to early 2023 to give you a general idea of what I was going for.
					</p>
					<BrowserWindow />
					<p>
						There wasn't really much rhyme or reason behind the decisions I made here. I just saw this as an opportunity to try out two
						ideas I've had for a while: Using a pixel font and the color purple (my favorite (green is a close second)).
					</p>
				</section>
				<section className="pt-20 md:pt-32 xl:pt-40 border-x border-black/5 dark:border-white/5">
					<h2>
						69 days later<span className="text-green">.</span>
					</h2>
					<p>I threw it all out the window.</p>
					<div className="relative w-full max-w-7xl mx-auto aspect-video my-9">
						<FadingImage src={BrandingRev0} alt="" className="w-full rounded-xl" />
					</div>
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
						font and (somewhat arbitrarily) decided to focus on the angle of the left stroke of the capital "A" in the light (200) weight of
						the font for the design, which turned out to be 21.5 degrees. As a nod to the "TENT" in the name I tried to make the "A" look
						more like a tent by combining it with the left and right strokes from the light and black (900) weights respectively, removing
						the middle bar in the process.
					</p>
					<p>
						If you feel like something's off about that stylized A, you are not alone. We also thought it looked weird at some point, so I
						fixed it.
					</p>
					<video src="/assets/tentative/LogoFix.mp4" autoPlay playsInline muted loop className="max-w-7xl mx-auto" />
					<p>
						Separating the "TIVE" from the "TENTA" part by setting it in the black weight turned turned out to be a neat idea, as "TENTA"
						could now be used as a prefix for other projects, or be substituted for the tent icon if space was tight.
					</p>
					<p>... "Tent" and "A"... Tent-A? Whatever.</p>
					<p>
						A somewhat recurring theme is the use of parallelograms and 21.5 degree angles, most prominently as an optional design element
						behind the Tentative wordmark, as well as the website.
					</p>
					<p>
						While Tentative used purple and later a combination of soft gold and green in the first few of ideas, the intention this time
						was to keep Tenative itself monochrome. Instead each member would be displayed around their own signature color, putting the
						focus more on them individually. However this would have made any materials about the group itself look really boring, so we
						ultimately decided on <span className="text-violet-500">violet</span> to be Tentative's main brand color.
					</p>
				</section>
				<section className="pt-20 md:pt-32 xl:pt-40 border-x border-black/5 dark:border-white/5">
					<div className="flex flex-col md:flex-row gap-9 my-9">
						<div className="w-full">
							<h2>
								The website<span className="text-green">.</span>
							</h2>
							<p>This page is already long enough, so I'll just talk about the present version of the site.</p>
							<p>
								First of all: Since Tentative has members from various different parts of the world, we thought it would be neat to localize
								the site into languages that each member can speak and write well. That means the site will (eventually) be available in
								English, German, French, Japanese and Thai.
							</p>
							<p>What is translated how is up to each member and the language they take care of.</p>
						</div>
						<FadingImage hideSpinner src={WebsiteLocales} alt="" className="rounded-xl md:w-1/2 lg:w-1/3 h-fit mx-auto" />
					</div>
					<p>
						Every member has their own logo in a different style. To achieve some feeling of uniformity, I introduced unique icons for each
						member in an early concept of the site. The icons represent a certain element about that member's branding, their character, or
						whatever else. These icons are made in a 7x7 pixel grid for more simplicity, but also flexibility. These can be used at small
						scale as they are, or at large scale with other effects like borders and gradients.
					</p>
					<div className="grid grid-cols-2 md:grid-cols-3 w-full items-center justify-between gap-12 my-9">
						<div className="relative w-full">
							<FadingImage src={IconWxz} alt="" className="size-full md:size-64" />
							<p className="text-center mt-6 text-white text-xl ">wxsonz</p>
						</div>
						<div className="relative w-full">
							<FadingImage src={IconAutsellia} alt="" className="size-full md:size-64" />
							<p className="text-center mt-6 text-white text-xl ">Autsellia</p>
						</div>
						<div className="relative w-full">
							<FadingImage src={IconPprmint} alt="" className="size-full md:size-64" />
							<p className="text-center mt-6 text-white text-xl ">Good today.</p>
						</div>
					</div>
					<p>
						While the landing page isn't fully complete as of writing this, there is a distinct section on it that features every Tentative
						member. Prominently displayed is a drawing of their respective OCs, their logo and their respective icons in the background
						visible on hover.
					</p>
					<div className="relative w-full max-w-7xl mx-auto aspect-video my-9">
						<FadingImage src={WebsiteMembers} alt="" className="rounded-xl" />
					</div>
				</section>
			</main>
		</>
	);
}
