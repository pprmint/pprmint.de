"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { useTranslations } from "next-intl";
import FadingImage from "src/components/ui/FadingImage";

// An identifier or keyword cannot immediately follow a numeric literal.ts(1351)
// Fine then, lemme give it a shitty name, see if I care.
import TwoDeeCardImage from "public/assets/commissions/2D.svg";
import MoGraphCardImage from "public/assets/commissions/MoGraph.svg";
import ThreeDeeCardImage from "public/assets/commissions/3D.svg";
import WebsiteCardImage from "public/assets/commissions/Hell.svg";

export default function Services() {
	const t = useTranslations("COMMISSIONS");
	return (
		<Accordion.Root type="multiple" className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
			<Accordion.Item value="2DDesign" className="group h-fit bg-neutral-900 rounded-lg overflow-hidden">
				<Accordion.Trigger className="w-full ease-out overflow-hidden selection:bg-green selection:text-neutral-950">
					<div className="w-full right-0 h-2 bg-green shadow-lg shadow-transparent group-hover:shadow-green duration-100" />
					<div className="flex flex-col-reverse lg:flex-row px-6 pb-6 items-center text-center lg:text-left">
						<div className="flex-grow pt-6">
							<h3>{t("Content.Offers.2DDesign.heading")}</h3>
							<p className="text-md">{t("Content.Offers.2DDesign.subheading")}</p>
							<p className="font-display-mono font-semibold text-neutral-50 text-2xl lg:text-4xl tracking-tighter">50€-200€</p>
						</div>
						<FadingImage src={TwoDeeCardImage} alt="" className="w-36 h-36" />
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
			<Accordion.Item value="2DAnimation" className="group h-fit bg-neutral-900 rounded-lg overflow-hidden">
				<Accordion.Trigger className="w-full ease-out overflow-hidden selection:bg-blue selection:text-neutral-950">
					<div className="w-full right-0 h-2 bg-blue shadow-lg shadow-transparent group-hover:shadow-blue duration-100" />
					<div className="flex flex-col-reverse lg:flex-row px-6 pb-6 items-center text-center lg:text-left">
						<div className="flex-grow pt-6">
							<h3>{t("Content.Offers.2DAnimation.heading")}</h3>
							<p className="text-md">{t("Content.Offers.2DAnimation.subheading")}</p>
							<p className="font-display-mono font-semibold text-neutral-50 text-2xl lg:text-4xl tracking-tighter">100€-250€</p>
						</div>
						<FadingImage src={MoGraphCardImage} alt="" className="w-36 h-36" />
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
			<Accordion.Item value="2D3DGraphic" className="group h-fit bg-neutral-900 rounded-lg overflow-hidden">
				<Accordion.Trigger className="w-full ease-out overflow-hidden selection:bg-yellow selection:text-neutral-950">
					<div className="w-full right-0 h-2 bg-yellow shadow-lg shadow-transparent group-hover:shadow-yellow duration-100" />
					<div className="flex flex-col-reverse lg:flex-row px-6 pb-6 items-center text-center lg:text-left">
						<div className="flex-grow pt-6">
							<h3>{t("Content.Offers.2D3DGraphic.heading")}</h3>
							<p className="text-md">{t("Content.Offers.2D3DGraphic.subheading")}</p>
							<p className="font-display-mono font-semibold text-neutral-50 text-2xl lg:text-4xl tracking-tighter">150€-400€</p>
						</div>
						<FadingImage src={ThreeDeeCardImage} alt="" className="w-36 h-36" />
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
			<Accordion.Item value="Website" className="group h-fit bg-neutral-900 rounded-lg overflow-hidden">
				<Accordion.Trigger className="w-full ease-out overflow-hidden selection:bg-red selection:text-neutral-950">
					<div className="w-full right-0 h-2 bg-red shadow-lg shadow-transparent group-hover:shadow-red duration-100" />
					<div className="flex flex-col-reverse lg:flex-row px-6 pb-6 items-center text-center lg:text-left">
						<div className="flex-grow pt-6">
							<h3>{t("Content.Offers.Website.heading")}</h3>
							<p className="text-md">{t("Content.Offers.Website.subheading")}</p>
							<p className="font-display-mono font-semibold text-neutral-50 text-2xl lg:text-4xl tracking-tighter">200€-2000€+</p>
						</div>
						<FadingImage src={WebsiteCardImage} alt="" className="w-36 h-36" />
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
	);
}
