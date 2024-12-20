import * as React from "react";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { Sparkle } from "lucide-react";

import Button from "src/components/ui/Button";

import { Announcements } from "src/types/announcement";
import FadingImage from "src/components/ui/FadingImage";
import ThreeThingies from "./threethingies";
import { MinaArtworks } from "src/types/mina-artwork";
import ArrowRight from "src/icons/ArrowRight";
import ArrowUpRight from "src/icons/ArrowUpRight";
import HeartFilled from "src/icons/HeartFilled";
import HomeTitle from "./homeTitle";
import Envelope from "src/icons/Envelope";

export default async function Page() {
	const t = await getTranslations("HOME");
	const Announcements: Announcements = await GetAnnouncements();
	const MinaArt: MinaArtworks = await GetArt();
	return (
		<>
			<HomeTitle />
			<main>
				<ThreeThingies />
				<section className="my-20 md:my-32 xl:my-40 relative overflow-clip">
					<div className="relative w-full h-full -z-10">
						<FadingImage
							src={`https://static.pprmint.de${Announcements.data[0].media.formats.thumbnail.url}`}
							alt={Announcements.data[0].media.alternativeText || ""}
							quality={90}
							width={Announcements.data[0].media.formats.thumbnail.width}
							height={Announcements.data[0].media.formats.thumbnail.height}
							className="absolute w-full max-w-7xl left-1/2 -translate-x-1/2 top-24 blur-3xl rounded-xl contrast-75 opacity-50"
						/>
						<div
							className="absolute left-0 right-0 h-[1000px] w-screen light:invert light:brightness-[0.33]"
							style={{
								backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M0 10V0h10a2 2 0 0 0 4 0h10v10a2 2 0 0 0 0 4v10H14a2 2 0 0 0-4 0H0V14a2 2 0 0 0 0-4Z" style="fill:%23111111"/></svg>')`,
								backgroundRepeat: "repeat",
								backgroundPosition: "center",
							}}
						/>
					</div>
					<h2 className="h-24 w-full text-center">{t("Content.News.heading")}</h2>
					<div className="relative w-full aspect-video max-w-7xl mx-auto xl:rounded-xl shadow-[0px_0px_5px_10px_#111] light:shadow-[0px_0px_5px_10px_#fafafa] xl:outline outline-1 -outline-offset-1 outline-white/10 light:outline-black/10 overflow-clip">
						<FadingImage
							src={`https://static.pprmint.de${Announcements.data[0].media.url}`}
							alt={Announcements.data[0].media.alternativeText || ""}
							quality={90}
							width={Announcements.data[0].media.width}
							height={Announcements.data[0].media.height}
						/>
					</div>
					<div className="flex max-w-7xl px-6 md:px-9 2xl:px-0 mx-auto my-12 flex-col md:flex-row items-end md:items-center gap-6 md:gap-9">
						<div className="w-full">
							<h2>{Announcements.data[0].title}</h2>
							<p>{Announcements.data[0].description}</p>
						</div>
						{Announcements.data[0].link ? (
							Announcements.data[0].link.startsWith("/") ? (
								<Link href={Announcements.data[0].link} className="w-fit">
									<Button color={Announcements.data[0].buttonColor} large>
										{Announcements.data[0].linkText}
										<div className="relative size-5 overflow-clip">
											<ArrowRight
												width={20}
												height={20}
												className="absolute group-hover:translate-x-full group-hover:duration-300 ease-out-quint"
											/>
											<ArrowRight
												width={20}
												height={20}
												className="absolute -translate-x-full group-hover:translate-x-0 group-hover:duration-300 ease-out-quint"
											/>
										</div>
									</Button>
								</Link>
							) : (
								<Link href={Announcements.data[0].link} target="_blank" rel="noopener noreferrer" className="w-fit">
									<Button color={Announcements.data[0].buttonColor} large>
										{Announcements.data[0].linkText}
										<div className="relative size-5 overflow-clip">
											<ArrowUpRight
												width={20}
												height={20}
												className="absolute group-hover:translate-x-full group-hover:-translate-y-full group-hover:duration-300 ease-out-quint"
											/>
											<ArrowUpRight
												width={20}
												height={20}
												className="absolute -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 group-hover:duration-300 ease-out-quint"
											/>
										</div>
									</Button>
								</Link>
							)
						) : null}
					</div>
				</section>
				{Announcements.data && (
					<section className="my-20 md:my-32 xl:my-40 px-6 md:px-9 max-w-8xl mx-auto">
						<h2 className="pb-6">{t("Content.OtherNews.heading")}</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-9">
							{Announcements.data.map(
								(announcement, index) =>
									index > 0 && (
										<div key={announcement.id} className="flex flex-col gap-3">
											<div className="w-full aspect-video relative rounded-xl outline outline-1 -outline-offset-1 outline-white/10 light:outline-black/10 mb-3 overflow-clip">
												<FadingImage
													src={`https://static.pprmint.de${announcement.media.url}`}
													alt={announcement.media.alternativeText || ""}
													quality={90}
													width={announcement.media.width}
													height={announcement.media.height}
												/>
											</div>
											<h3>{announcement.title}</h3>
											<p>{announcement.description}</p>
											{announcement.link ? (
												announcement.link.startsWith("/") ? (
													<Link href={announcement.link} className="w-fit">
														<Button color={announcement.buttonColor} outlined>
															{announcement.linkText}
															<ArrowRight />
														</Button>
													</Link>
												) : (
													<Link href={announcement.link} target="_blank" rel="noopener noreferrer" className="w-fit">
														<Button color={announcement.buttonColor} outlined>
															{announcement.linkText}
															<ArrowUpRight />
														</Button>
													</Link>
												)
											) : null}
										</div>
									)
							)}
						</div>
					</section>
				)}
				{MinaArt.data && (
					<section className="my-20 md:my-32 xl:my-40 relative flex items-center px-6 md:px-9 w-screen min-h-[500px] overflow-clip">
						<div className="absolute inset-0 -z-10">
							<FadingImage
								src={`https://static.pprmint.de${MinaArt.data[0].artwork[0].formats.thumbnail.url}`}
								fill
								alt=""
								className="object-cover blur-xl"
							/>
							<div
								className="absolute inset-0 light:invert light:brightness-[0.33]"
								style={{
									backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M0 10V0h10a2 2 0 0 0 4 0h10v10a2 2 0 0 0 0 4v10H14a2 2 0 0 0-4 0H0V14a2 2 0 0 0 0-4Z" style="fill:%23111111"/></svg>')`,
									backgroundRepeat: "repeat",
									backgroundPosition: "center",
								}}
							/>
							<div
								className="absolute inset-0 light:invert light:brightness-[0.33]"
								style={{
									background: `radial-gradient(at right center, #111111aa 0%, #111111 75%)`,
								}}
							/>
						</div>
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
	const pageSize = 4;
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
