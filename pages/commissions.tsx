import * as React from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import * as Accordion from "@radix-ui/react-accordion";

import Head from "components/Head";
import Title from "components/Title";

import RedLight from "public/assets/commissions/red.webp";
import YellowLight from "public/assets/commissions/yellow.webp";
import GreenLight from "public/assets/commissions/green.webp";
// An identifier or keyword cannot immediately follow a numeric literal.ts(1351)
// Fine then, lemme give it a shitty name, see if I care.
import TwoDeeCardImage from "public/assets/commissions/2D.svg";
import MoGraphCardImage from "public/assets/commissions/MoGraph.svg";
import ThreeDeeCardImage from "public/assets/commissions/3D.svg";
import WebsiteCardImage from "public/assets/commissions/Hell.svg";

export default function Commissions() {
	const { t } = useTranslation();
	// Status for commissions
	// 0 = closed (red)
	// 1 = limited (yellow)
	// 2 = open (green)
	const Status = 0;
	const HeroImages = [RedLight, YellowLight, GreenLight];
	const Colors = ["red", "yellow", "green"];
	const TextColors = ["text-red", "text-yellow", "text-green"];
	return (
		<>
			<Head title={t("COMMISSIONS:Head.title")} description={t("COMMISSIONS:Head.description")} />
			<Title
				title={t("COMMISSIONS:Head.title")}
				description={t(`COMMISSIONS:Content.Status.${Colors[Status]}`)}
				accentColor={TextColors[Status]}
			>
				<Image src={HeroImages[Status]} alt="" fill className="object-cover" quality={90} />
			</Title>
			<main className="max-w-7xl mx-auto px-6 md:px-9">
				<section className="my-20">
					<h2>
						{t("COMMISSIONS:Content.Offers.heading")}
					</h2>
					<p className="pb-6 inline-flex items-center gap-3">
						<i className="ri-information-line" />
						{t("COMMISSIONS:Content.Offers.priceInfo")}
					</p>
					<Accordion.Root type="multiple" className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
						<Accordion.Item
							value="2DDesign"
							className="group h-fit bg-neutral-900 rounded-lg overflow-hidden"
						>
							<Accordion.Trigger className="w-full ease-out overflow-hidden selection:bg-green selection:text-neutral-950">
								<div className="w-full right-0 h-2 bg-green shadow-lg shadow-transparent group-hover:shadow-green duration-100" />
								<div className="flex flex-col-reverse lg:flex-row px-6 pb-6 items-center text-center lg:text-left">
									<div className="flex-grow pt-6">
										<h4>
											{t("COMMISSIONS:Content.Offers.2DDesign.heading")}
										</h4>
										<h5 className="text-md pb-6">{t("COMMISSIONS:Content.Offers.2DDesign.subheading")}</h5>
										<h3>
											50€-200€
										</h3>
									</div>
									<Image src={TwoDeeCardImage} alt="" className="w-36 h-36" />
								</div>
							</Accordion.Trigger>
							<Accordion.Content className="data-[state=open]:animate-accordion-slide-down data-[state=closed]:animate-accordion-slide-up">
								<div className="border-t border-neutral-800">
									<h4>What I need.</h4>
									<ul>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-add-line" />
											Detailed description of ideas (sketches preferred)
										</li>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-add-line" />
											License to use custom fonts (unless OFL or similar)
										</li>
									</ul>
									<h4>What you get.</h4>
									<ul>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-check-line" />
											Assets for various social media profiles
										</li>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-check-line" />
											Exports as PNG, SVG and EPS files
										</li>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-check-line" />
											Access to Affinity Designer project files (can also be exported as .PSD files)
										</li>
									</ul>
								</div>
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item
							value="2DAnimation"
							className="group h-fit bg-neutral-900 rounded-lg overflow-hidden"
						>
							<Accordion.Trigger className="w-full ease-out overflow-hidden selection:bg-blue selection:text-neutral-950">
								<div className="w-full right-0 h-2 bg-blue shadow-lg shadow-transparent group-hover:shadow-blue duration-100" />
								<div className="flex flex-col-reverse lg:flex-row px-6 pb-6 items-center text-center lg:text-left">
									<div className="flex-grow pt-6">
										<h4>
											{t("COMMISSIONS:Content.Offers.2DAnimation.heading")}
										</h4>
										<h5 className="text-md pb-6">{t("COMMISSIONS:Content.Offers.2DAnimation.subheading")}</h5>
										<h3>
											100€-250€
										</h3>
									</div>
									<Image src={MoGraphCardImage} alt="" className="w-36 h-36" />
								</div>
							</Accordion.Trigger>
							<Accordion.Content className="data-[state=open]:animate-accordion-slide-down data-[state=closed]:animate-accordion-slide-up">
								<div className="border-t border-neutral-800">
									<h4>What you get.</h4>
									<ul>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-check-line" />
											Original After Effects project file
										</li>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-check-line" />
											Exports in various formats (MP4, AVI, WEBM, GIF, PNG sequence, Lottie-compatible JSON)
										</li>
									</ul>
								</div>
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item
							value="2D3DGraphic"
							className="group h-fit bg-neutral-900 rounded-lg overflow-hidden"
						>
							<Accordion.Trigger className="w-full ease-out overflow-hidden selection:bg-yellow selection:text-neutral-950">
								<div className="w-full right-0 h-2 bg-yellow shadow-lg shadow-transparent group-hover:shadow-yellow duration-100" />
								<div className="flex flex-col-reverse lg:flex-row px-6 pb-6 items-center text-center lg:text-left">
									<div className="flex-grow pt-6">
										<h4>
											{t("COMMISSIONS:Content.Offers.2D3DGraphic.heading")}
										</h4>
										<h5 className="text-md pb-6">{t("COMMISSIONS:Content.Offers.2D3DGraphic.subheading")}</h5>
										<h3>
											150€-400€
										</h3>
									</div>
									<Image src={ThreeDeeCardImage} alt="" className="w-36 h-36" />
								</div>
							</Accordion.Trigger>
							<Accordion.Content className="data-[state=open]:animate-accordion-slide-down data-[state=closed]:animate-accordion-slide-up">
								<div className="border-t border-neutral-800">
									<h4>What you get.</h4>
									<ul>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-check-line" />
											Something
										</li>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-check-line" />
											Something
										</li>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-check-line" />
											Something
										</li>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-check-line" />
											Something
										</li>
									</ul>
								</div>
							</Accordion.Content>
						</Accordion.Item>
						<Accordion.Item
							value="Website"
							className="group h-fit bg-neutral-900 rounded-lg overflow-hidden"
						>
							<Accordion.Trigger className="w-full ease-out overflow-hidden selection:bg-red selection:text-neutral-950">
								<div className="w-full right-0 h-2 bg-red shadow-lg shadow-transparent group-hover:shadow-red duration-100" />
								<div className="flex flex-col-reverse lg:flex-row px-6 pb-6 items-center text-center lg:text-left">
									<div className="flex-grow pt-6">
										<h4>
											{t("COMMISSIONS:Content.Offers.Website.heading")}
										</h4>
										<h5 className="text-md pb-6">{t("COMMISSIONS:Content.Offers.Website.subheading")}</h5>
										<h3>
											200€-2000€+
										</h3>
									</div>
									<Image src={WebsiteCardImage} alt="" className="w-36 h-36" />
								</div>
							</Accordion.Trigger>
							<Accordion.Content className="data-[state=open]:animate-accordion-slide-down data-[state=closed]:animate-accordion-slide-up">
								<div className="border-t border-neutral-800">
									<h4>What you get.</h4>
									<ul>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-check-line" />
											Something
										</li>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-check-line" />
											Something
										</li>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-check-line" />
											Something
										</li>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-check-line" />
											Something
										</li>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-check-line" />
											Something
										</li>
										<li className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<i className="ri-check-line" />
											Something
										</li>
									</ul>
								</div>
							</Accordion.Content>
						</Accordion.Item>
					</Accordion.Root>
				</section>
				<section className="my-20">
					<h2>
						{t("COMMISSIONS:Content.Terms.heading")}
					</h2>
					<h3>
						{t("COMMISSIONS:Content.Terms.Disclaimer.heading")}
					</h3>
					<p>{t("COMMISSIONS:Content.Terms.Disclaimer.termsAgree")}</p>
					<p>{t("COMMISSIONS:Content.Terms.Disclaimer.acknowledgement")}</p>
					<p>{t("COMMISSIONS:Content.Terms.Disclaimer.rightToWithdraw")}</p>
				</section>
			</main>
		</>
	);
}
