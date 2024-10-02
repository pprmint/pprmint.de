import * as React from "react";
import { getLocale, getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Sparkle } from "lucide-react";

import Button from "src/components/ui/Button";
import Title from "src/components/layout/Title";
import HeroImage from "public/assets/home/hero.webp";

import { Announcements } from "src/types/announcement";
import FadingImage from "src/components/ui/FadingImage";
import ThreeThingies from "./threethingies";
import { MinaArtworks } from "src/types/mina-artwork";
import ArrowRight from "src/icons/ArrowRight";
import ArrowUpRight from "src/icons/ArrowUpRight";
import HeartFilled from "src/icons/HeartFilled";

type Props = {
	params: { locale: string };
};

export default async function Page({ params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const t = await getTranslations("HOME");
	const Announcements: Announcements = await GetAnnouncements();
	const MinaArt: MinaArtworks = await GetArt();
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<FadingImage src={HeroImage} alt="" fill className="object-cover origin-bottom-left" />
			</Title>
			<main>
				<ThreeThingies />
				<section className="my-20 md:my-32 xl:my-40 relative overflow-clip">
					<div className="relative w-full h-full -z-10">
						<FadingImage
							src={`https://static.pprmint.de${Announcements.data[0].media.formats.thumbnail.url}`}
							alt={Announcements.data[0].media.alternativeText}
							quality={90}
							width={Announcements.data[0].media.formats.thumbnail.width}
							height={Announcements.data[0].media.formats.thumbnail.height}
							className="absolute w-full max-w-7xl left-1/2 -translate-x-1/2 top-24 blur-3xl rounded-xl contrast-75 opacity-50"
						/>
						<div
							className="absolute left-0 right-0 h-[1000px] w-screen"
							style={{
								backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><path d="M0 10V0h10a2 2 0 0 0 4 0h10v10a2 2 0 0 0 0 4v10H14a2 2 0 0 0-4 0H0V14a2 2 0 0 0 0-4Z" style="fill:%23111"/></svg>')`,
								backgroundRepeat: "repeat",
								backgroundPosition: "center",
							}}
						/>
					</div>
					<h2 className="h-24 w-full text-center">{t("Content.News.heading")}</h2>
					<FadingImage
						src={`https://static.pprmint.de${Announcements.data[0].media.url}`}
						alt={Announcements.data[0].media.alternativeText}
						quality={90}
						width={Announcements.data[0].media.width}
						height={Announcements.data[0].media.height}
						className="w-full max-w-7xl mx-auto xl:rounded-xl shadow-[0px_0px_5px_10px_#111] xl:border border-neutral-900"
					/>
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
										<ArrowRight width={20} height={20} />
									</Button>
								</Link>
							) : (
								<Link href={Announcements.data[0].link} target="_blank" rel="noopener noreferrer" className="w-fit">
									<Button color={Announcements.data[0].buttonColor} large>
										{Announcements.data[0].linkText}
										<ArrowUpRight width={20} height={20} />
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
											<FadingImage
												src={`https://static.pprmint.de${announcement.media.url}`}
												alt={announcement.media.alternativeText}
												quality={90}
												width={announcement.media.width}
												height={announcement.media.height}
												className="relative rounded-xl border border-neutral-900 mb-3"
											/>
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
								className="absolute inset-0"
								style={{
									backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><path d="M0 10V0h10a2 2 0 0 0 4 0h10v10a2 2 0 0 0 0 4v10H14a2 2 0 0 0-4 0H0V14a2 2 0 0 0 0-4Z" style="fill:%23111"/></svg>')`,
									backgroundRepeat: "repeat",
									backgroundPosition: "center",
								}}
							/>
							<div
								className="absolute inset-0"
								style={{
									background: `radial-gradient(at right center, #111a 0%, #111 75%)`,
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
								className="relative group my-12 w-4/5 max-w-fit max-h-4/5 rotate-3 hover:rotate-0 hover:scale-[1.02] active:scale-[0.99] active:brightness-90 duration-400 active:duration-75 ease-out-back active:ease-out rounded-xl"
							>
								<FadingImage
									src={`https://static.pprmint.de${MinaArt.data[0].artwork[0].url}`}
									alt={MinaArt.data[0].artwork[0].alternativeText}
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
									<div className="absolute -left-[225%] lg:-left-full group-hover:left-[150%] top-0 bottom-0 skew-x-[30deg] w-64 group-hover:w-0 bg-neutral-50/25 duration-0 group-hover:duration-1000 ease-out-quint" />
								</div>
								<Sparkle
									className="absolute -top-3.5 -right-3.5 group-hover:animate-lucide-sparkle opacity-0"
									fill="#eee"
									stroke="none"
									size={36}
								/>
							</Link>
						</div>
					</section>
				)}
				<section className="my-48 max-w-7xl px-6 md:px-9 2xl:px-0 mx-auto flex flex-col lg:flex-row gap-3 items-center justify-center lg:justify-between">
					<h1 className="font-light">{t("Content.Contact.questions")}</h1>
					<Link href="/contact">
						<h1 className="group inline-flex text-nowrap items-center gap-3 hover:gap-6 lg:hover:gap-3 duration-200 ease-out-quint">
							{t("Content.Contact.answers")}
							<span className="text-green mt-3 group-hover:translate-x-0 lg:group-hover:translate-x-3 duration-200 ease-out-quint">
								-{">"}
							</span>
						</h1>
					</Link>
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
