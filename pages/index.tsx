import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

import Head from "components/Head";
import Button from "components/Button";
import Title from "components/Title";
import VideoPlayer from "components/VideoPlayer";

import Stairway from "/public/assets/home/Stairway_Night.webp";
import Mintcraft from "/public/assets/home/mintcraft.webp";
import Tentative from "/public/assets/home/tentative.png";

export default function Home() {
	const { t } = useTranslation();
	const Cards = [
		{
			image: "/assets/home/suse.png",
			video: "https://static.pprmint.art/works/2023/openSUSE/Comp.mp4",
			name: t("HOME:Content.RecentWork.OpenSUSE.name"),
			description: t("HOME:Content.RecentWork.OpenSUSE.description"),
			link: "https://en.opensuse.org/Logocontest",
			external: true,
		},
		{
			image: Stairway,
			name: t("HOME:Content.RecentWork.Stairway.name"),
			description: t("HOME:Content.RecentWork.Stairway.description"),
			link: "https://discuss.kde.org/t/stairway-5k-abstract-wallpaper/3880",
			external: true,
		},
		{
			image: Mintcraft,
			name: t("HOME:Content.RecentWork.Mintcraft.name"),
			description: t("HOME:Content.RecentWork.Mintcraft.description"),
			link: "/projects/mintcraft",
		},
		{
			image: Tentative,
			name: t("HOME:Content.RecentWork.Tentative.name"),
			description: t("HOME:Content.RecentWork.Tentative.description"),
			link: "https://tentative.name/home",
			external: true,
		},
	];
	return (
		<>
			<Head title={t("HOME:Head.title")} description={t("HOME:Head.description")} />
			<Title title={t("HOME:Head.title")} description={t("HOME:Head.description")}>
				<video
					src="https://static.pprmint.art/videos/seenthisbefore.mp4"
					autoPlay
					playsInline
					muted
					loop
					className="absolute w-full h-full object-cover"
				/>
			</Title>
			<main>
				<section className="relative overflow-hidden">
					<h1 className="absolute top-6 left-0 right-0 text-center text-neutral-50 font-display font-light text-xl md:text-2xl lg:text-3xl">
						{t("HOME:Content.RecentWork.title")}
					</h1>
					{Cards[0].image && (
						<div className="relative w-full h-full -z-10">
							<Image
								src={Cards[0].image}
								alt=""
								quality={90}
								width={1920}
								height={1080}
								className="absolute w-full max-w-7xl left-1/2 -translate-x-1/2 top-24 blur-3xl rounded-xl contrast-75 opacity-50"
							/>
							<div
								className="absolute left-0 right-0 h-[1000px] w-screen"
								style={{
									backgroundImage:
										"url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyIj48cGF0aCBkPSJNMTYgMHYxNkgwVjBoMTZaTTggNmEyIDIgMCAxIDAgLjAwMSA0LjAwMUEyIDIgMCAwIDAgOCA2WiIgc3R5bGU9ImZpbGw6IzExMSIvPjwvc3ZnPg==)",
									backgroundRepeat: "repeat",
									backgroundPosition: "center",
								}}
							/>
						</div>
					)}
					{Cards[0].video ? (
						<div className="w-full max-w-7xl mx-auto mt-24 xl:rounded-xl overflow-hidden shadow-[0px_0px_5px_10px_#111]">
							<VideoPlayer
								poster={Cards[0].image}
								noSound
                                loopDefault
								src={Cards[0].video}
							/>
						</div>
					) : (
						Cards[0].image && (
							<Image
								src={Cards[0].image}
								alt=""
								quality={90}
								width={1920}
								height={1080}
								className="w-full max-w-7xl mx-auto mt-24 xl:rounded-xl shadow-[0px_0px_5px_10px_#111]"
							/>
						)
					)}
					<div className="flex max-w-7xl px-6 md:px-9 mx-auto my-12 flex-col md:flex-row items-end md:items-center gap-6 md:gap-9">
						<div className="w-full">
							<h2 className="font-display font-semibold text-neutral-50 text-3xl md:text-4xl lg:text-5xl pb-6">
								{Cards[0].name}
							</h2>
							<p>{Cards[0].description}</p>
						</div>
						{Cards[0].link &&
							(Cards[0].external ? (
								<Link href={Cards[0].link} target="_blank" rel="noopener noreferrer" className="w-fit">
									<Button color="blue" large>
										{t("COMMON:visitWebsite")}
										<i className="ri-arrow-right-up-line" />
									</Button>
								</Link>
							) : (
								<Link href={Cards[0].link} className="w-fit">
									<Button color="green" large>
										{t("COMMON:learnMore")}
										<i className="ri-arrow-right-line" />
									</Button>
								</Link>
							))}
					</div>
				</section>
				<hr className="px-6 md:px-9 border-dotted border-t-2 border-neutral-800" />
				<section className="my-12 px-6 md:px-9 max-w-8xl mx-auto">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-9">
						{Cards.map(
							(card, index) =>
								index > 0 && (
									<div key={card.name} className="flex flex-col gap-3">
										<Image
											src={card.image}
											alt={card.name}
											quality={90}
											width={1920}
											height={1080}
											className="relative rounded-xl border border-neutral-50/10 mb-3"
										/>
										<h2 className="font-display font-semibold text-neutral-50 text-3xl">{card.name}</h2>
										<p>{card.description}</p>
										{card.link &&
											(card.external ? (
												<Link href={card.link} target="_blank" rel="noopener noreferrer" className="w-fit">
													<Button color="blue" outlined>
														{t("COMMON:visitWebsite")}
														<i className="ri-arrow-right-up-line" />
													</Button>
												</Link>
											) : (
												<Link href={card.link} className="w-fit">
													<Button color="green" outlined>
														{t("COMMON:learnMore")}
														<i className="ri-arrow-right-line" />
													</Button>
												</Link>
											))}
									</div>
								)
						)}
					</div>
				</section>
			</main>
		</>
	);
}
