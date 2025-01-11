import * as React from "react";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { Sparkle } from "lucide-react";

import Button from "src/components/ui/Button";

import { Announcements as AnnouncementsType } from "src/types/announcement";
import FadingImage from "src/components/ui/FadingImage";
import { MinaArtworks } from "src/types/mina-artwork";
import ArrowRight from "src/icons/ArrowRight";
import ArrowUpRight from "src/icons/ArrowUpRight";
import HeartFilled from "src/icons/HeartFilled";
import HomeTitle from "./home/title";
import Envelope from "src/icons/Envelope";
import Announcements from "./home/announcements";

export default async function Page() {
	const t = await getTranslations("HOME");
	const announcements: AnnouncementsType = await GetAnnouncements();
	const MinaArt: MinaArtworks = await GetArt();
	return (
		<>
			<HomeTitle />
			<main>
				<Announcements data={announcements} />
				{MinaArt.data && (
					<section className="w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto overflow-clip">
						<div className="flex flex-col gap-9 md:flex-row items-center max-w-7xl h-full mx-auto">
							<div className="flex flex-col w-full">
								<h2>{t("Content.Mina.heading")}</h2>
								<p>{t("Content.Mina.text1")}</p>
								<p className="mb-6">
									{t.rich("Content.Mina.text2", {
										artist: MinaArt.data[0].artist.name,
										link: (chunks) =>
											MinaArt.data[0].artist.creditUrl ? (
												<Link href={MinaArt.data[0].artist.creditUrl} className="text-link-external">
													{chunks}
												</Link>
											) : (
												<span className="font-medium font-neutal-50">{chunks}</span>
											),
									})}
									<br />
									<span className="text-xs opacity-50">
										{t.rich("Content.Mina.text3", {
											i: (chunks) => <i>{chunks}</i>,
										})}
									</span>
								</p>
								<Link href="/mina" className="w-max">
									<Button tabIndex={-1} color="green">
										{t("Content.Mina.button")}
										<HeartFilled />
									</Button>
								</Link>
							</div>
							<Link
								href="/mina#gallery"
								className="relative group my-12 w-4/5 max-w-fit max-h-4/5 rotate-3 hover:rotate-0 hover:scale-[1.02] active:scale-[0.99] active:brightness-90 duration-400 active:duration-75 ease-out-back active:ease-out rounded-xl outline outline-1 -outline-offset-1 outline-white/10 light:outline-black/10"
							>
								<FadingImage
									src={`https://static.pprmint.de${MinaArt.data[0].artwork[0].url}`}
									alt={MinaArt.data[0].artwork[0].alternativeText || ""}
									width={MinaArt.data[0].artwork[0].width}
									height={MinaArt.data[0].artwork[0].height}
									className="rounded-xl"
								/>
								<div
									className="absolute inset-0 overflow-clip blur-md rounded-xl"
									style={{
										maskImage: `url(https://static.pprmint.de${MinaArt.data[0].artwork[0].url})`,
										maskRepeat: "no-repeat",
										maskSize: "100%",
									}}
								>
									<div className="absolute -left-[225%] lg:-left-full group-hover:left-[150%] top-0 bottom-0 skew-x-[30deg] w-64 group-hover:w-0 bg-white/25 duration-0 group-hover:duration-1000 ease-out-quint" />
								</div>
								<Sparkle
									className="absolute -top-3.5 -right-3.5 group-hover:animate-lucide-sparkle opacity-0"
									fill="#fff"
									stroke="none"
									size={36}
								/>
							</Link>
						</div>
					</section>
				)}
				<section className="relative my-48 max-w-7xl px-6 md:px-9 2xl:px-0 mx-auto">
					<h2 className="font-extralight text-3xl md:text-4xl lg:text-5xl xl:text-6xl">{t("Content.Contact.questions")}</h2>
					<Link href="/contact" className="group peer">
						<h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl group inline-flex text-nowrap gap-3 duration-400 ease-out-expo font-extralight group-hover:font-bold group-active:scale-[0.97]">
							{t("Content.Contact.answers")}
							<ArrowRight className="size-[30px] md:size-[45px] xl:size-[60px] stroke-0 group-hover:stroke-1 fill-green stroke-green duration-400 ease-out-expo mt-2.5 lg:mt-4" />
						</h3>
					</Link>
					<Envelope className="size-96 absolute opacity-0 peer-hover:opacity-100 text-elevate right-[10%] peer-hover:right-0 top-1/2 -translate-y-1/2 peer-hover:-rotate-6 duration-500 ease-in-out peer-hover:ease-out-expo pointer-events-none -z-10" />
				</section>
				<p className="px-6 md:px-9 text-center text-xs">{t("Content.Contact.pronunciation")}</p>
			</main>
		</>
	);
}

async function GetAnnouncements() {
	const pageSize = 5;
	const locale = await getLocale();
	const res = await fetch(
		`${process.env.STRAPI_API_URL}/announcements?pagination[pageSize]=${pageSize}&populate=media&locale=${locale}&sort=id:desc`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
			},
			next: { revalidate: 60 },
		}
	);
	if (!res.ok) {
		console.error("Failed to fetch announcement data.");
	}
	return res.json();
}

async function GetArt() {
	const res = await fetch(
		`${process.env.STRAPI_API_URL}/mina-artworks?pagination[limit]=1&filters[nsfw][$ne]=true&populate=artwork&populate=artist&sort=creationDate:desc`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
			},
			next: { revalidate: 60 },
		}
	);
	if (!res.ok) {
		console.error("Failed to fetch artwork.");
	}
	return res.json();
}
