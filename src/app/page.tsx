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
import * as motion from "motion/react-client";

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
					<section className="relative w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
						<div className="w-full border-x border-neutral-50/5 pt-9 lg:pt-16 xl:pt-40">
							<div className="relative">
								<motion.div
									aria-hidden
									initial={{ x: -40, opacity: 0 }}
									whileInView={{
										x: 0,
										opacity: 1,
										transition: { delay: 0.2, type: "spring", bounce: 0, duration: 1 },
									}}
									viewport={{ once: true }}
									className="absolute italic leading-none text-6xl md:text-8xl lg:text-9xl xl:text-[11rem] 2xl:text-[12.5rem] tracking-tighter font-condensed text-neutral-50"
								>
									{t("Content.Mina.heading1")}
								</motion.div>
								<FadingImage
									src={`https://static.pprmint.de${MinaArt.data[0].artwork[0].url}`}
									alt={MinaArt.data[0].artwork[0].alternativeText || ""}
									width={MinaArt.data[0].artwork[0].width || 0}
									height={MinaArt.data[0].artwork[0].height || 0}
									className="w-auto h-auto max-h-screen mx-auto pt-16 pb-16 md:pt-[4.3rem] lg:pt-24 xl:pt-[9rem] xl:pb-24 drop-shadow-2xl"
								/>
								<motion.div
									initial={{ x: -40, opacity: 0 }}
									whileInView={{
										x: 0,
										opacity: 1,
										transition: { delay: 0.2, type: "spring", bounce: 0, duration: 1 },
									}}
									viewport={{ once: true }}
									aria-hidden
									className="absolute bottom-0 right-0 text-right italic leading-none text-6xl md:text-8xl lg:text-9xl xl:text-[11rem] 2xl:text-[12.5rem] font-serif font-ultra-condensed text-neutral-50 text-shadow-2xl"
								>
									{t("Content.Mina.heading2")}
								</motion.div>
							</div>
							<div className="flex flex-col grow mt-12">
								<h2 className="sr-only">
									{t("Content.Mina.heading1") + " " + t("Content.Mina.heading2")}
								</h2>
								<div className="flex flex-col w-full text-center">
									<p className="xl:text-xl 2xl:text-2xl">{t("Content.Mina.text1")}</p>
									<p className="mb-6 xl:text-xl 2xl:text-2xl">
										{t.rich("Content.Mina.text2", {
											artist: MinaArt.data[0].artist.name,
											link: (chunks) =>
												MinaArt.data[0].artist.creditUrl ? (
													<Link
														href={MinaArt.data[0].artist.creditUrl}
														className="text-link-external"
													>
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
									<div className="w-full border-y border-neutral-50/5 h-12">
										<Link
											href="/mina"
											className="flex gap-3 items-center text-lg hover:text-neutral-950 hover:font-bold group h-full w-max hover:px-4 mx-auto hover:bg-neutral-50 active:bg-neutral-100 hover:shadow-md active:shadow-inner duration-200 ease-out-expo active:duration-75"
										>
											{t("Content.Mina.button")}
											<HeartFilled />
										</Link>
									</div>
								</div>
							</div>
						</div>
					</section>
				)}
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
