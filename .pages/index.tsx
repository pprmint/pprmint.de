import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

import Head from "src/components/Head";
import Button from "src/components/Button";
import Title from "src/components/Title";

import Announcement, { Announcements } from "types/announcement";
import FadingImage from "src/components/FadingImage";

export default function Home({ Announcements }: { Announcements: Announcements }) {
	const { t } = useTranslation();
	return (
		<>
			<Head title={t("HOME:Head.title")} description={t("HOME:Head.description")} />
			<Title title={t("HOME:Head.title")} description={t("HOME:Head.description")}>
				<video
					src="https://static.pprmint.art/videos/home.mp4"
					autoPlay
					playsInline
					muted
					loop
					className="absolute w-full h-full object-cover"
				/>
			</Title>
			<main>
				<section className="relative overflow-hidden">
					<div className="relative w-full h-full -z-10">
						<FadingImage
							src={`https://static.pprmint.art${Announcements.data[0].attributes.media.data.attributes.formats.thumbnail.url}`}
							alt={Announcements.data[0].attributes.media.data.attributes.alternativeText}
							quality={90}
							width={Announcements.data[0].attributes.media.data.attributes.formats.thumbnail.width}
							height={Announcements.data[0].attributes.media.data.attributes.formats.thumbnail.height}
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
					<FadingImage
						src={`https://static.pprmint.art${Announcements.data[0].attributes.media.data.attributes.url}`}
						alt={Announcements.data[0].attributes.media.data.attributes.alternativeText}
						quality={90}
						width={Announcements.data[0].attributes.media.data.attributes.width}
						height={Announcements.data[0].attributes.media.data.attributes.height}
						className="w-full max-w-7xl mx-auto mt-24 xl:rounded-xl shadow-[0px_0px_5px_10px_#111]"
					/>
					<div className="flex max-w-7xl px-6 md:px-9 mx-auto my-12 flex-col md:flex-row items-end md:items-center gap-6 md:gap-9">
						<div className="w-full">
							<h2>{Announcements.data[0].attributes.title}</h2>
							<p>{Announcements.data[0].attributes.description}</p>
						</div>
						{Announcements.data[0].attributes.link ? (
							Announcements.data[0].attributes.link.startsWith("/") ? (
								<Link href={Announcements.data[0].attributes.link} className="w-fit">
									<Button color={Announcements.data[0].attributes.buttonColor} large>
										{Announcements.data[0].attributes.linkText}
										<i className="ri-arrow-right-line" />
									</Button>
								</Link>
							) : (
								<Link
									href={Announcements.data[0].attributes.link}
									target="_blank"
									rel="noopener noreferrer"
									className="w-fit"
								>
									<Button color={Announcements.data[0].attributes.buttonColor} large>
										{Announcements.data[0].attributes.linkText}
										<i className="ri-arrow-right-up-line" />
									</Button>
								</Link>
							)
						) : null}
					</div>
				</section>
				<hr className="px-6 md:px-9 border-dotted border-t-2 border-neutral-800" />
				<section className="my-20 px-6 md:px-9 max-w-8xl mx-auto">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-9">
						{Announcements.data.map(
							(announcement, index) =>
								index > 0 && (
									<div key={announcement.id} className="flex flex-col gap-3">
										<FadingImage
											src={`https://static.pprmint.art${announcement.attributes.media.data.attributes.url}`}
											alt={announcement.attributes.media.data.attributes.alternativeText}
											quality={90}
											width={announcement.attributes.media.data.attributes.width}
											height={announcement.attributes.media.data.attributes.height}
											className="relative rounded-xl border border-neutral-50/10 mb-3"
										/>
										<h3>{announcement.attributes.title}</h3>
										<p>{announcement.attributes.description}</p>
										{announcement.attributes.link ? (
											announcement.attributes.link.startsWith("/") ? (
												<Link href={announcement.attributes.link} className="w-fit">
													<Button color={announcement.attributes.buttonColor} outlined>
														{announcement.attributes.linkText}
														<i className="ri-arrow-right-line" />
													</Button>
												</Link>
											) : (
												<Link
													href={announcement.attributes.link}
													target="_blank"
													rel="noopener noreferrer"
													className="w-fit"
												>
													<Button color={announcement.attributes.buttonColor} outlined>
														{announcement.attributes.linkText}
														<i className="ri-arrow-right-up-line" />
													</Button>
												</Link>
											)
										) : null}
									</div>
								)
						)}
					</div>
				</section>
			</main>
		</>
	);
}

export async function getStaticProps({ locale }: { locale: string }) {
	const pageSize = 4;

	const res = await fetch(
		`${process.env.STRAPI_API_URL}/announcements?pagination[pageSize]=${pageSize}&populate=media&locale=${locale}&sort=id:desc`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
			},
		}
	);
	const Announcements: Announcements = await res.json();
	return {
		props: {
			Announcements,
		},
		revalidate: 30,
	};
}
