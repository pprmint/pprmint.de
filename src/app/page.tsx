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
					<section className="relative w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
						<div className="w-full border-x border-neutral-50/5 pt-64">
							<div className="relative">
								<div aria-hidden className="-z-10 absolute italic leading-none text-[10vw] tracking-tighter text-neutral-500">
									{t("Content.Mina.heading1")}
								</div>
								<FadingImage
									src={`https://static.pprmint.de${MinaArt.data[0].artwork[0].url}`}
									alt={MinaArt.data[0].artwork[0].alternativeText || ""}
									width={MinaArt.data[0].artwork[0].width || 0}
									height={MinaArt.data[0].artwork[0].height || 0}
									className="w-auto h-auto max-h-screen mx-auto pt-32 pb-20"
								/>
								<div
									aria-hidden
									className="absolute bottom-0 right-0 text-right italic leading-none text-[10vw] font-serif font-ultra-condensed text-neutral-500"
								>
									{t("Content.Mina.heading2")}
								</div>
							</div>
							<div className="flex flex-col grow">
								<h2 className="sr-only">{t("Content.Mina.heading1") + " " + t("Content.Mina.heading2")}</h2>
								<div className="flex flex-col w-full xl:text-xl 2xl:text-2xl">
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
									<Link href="/mina" className="w-max inline-flex gap-3 items-center hover:bg-neutral-50 hover:text-neutral-950 py-2 hover:px-4 duration-200 ease-out">
										{t("Content.Mina.button")}
										<HeartFilled />
									</Link>
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
