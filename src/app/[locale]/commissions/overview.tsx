"use client";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useTranslations } from "next-intl";
import FadingImage from "src/components/ui/FadingImage";

// An identifier or keyword cannot immediately follow a numeric literal.ts(1351)
// Fine then, lemme give it a shitty name, see if I care.
import TwoDeeCardImage from "public/assets/commissions/2D.svg";
import AnimCardImage from "public/assets/commissions/Anim.svg";
import ThreeDeeCardImage from "public/assets/commissions/3D.svg";
import WebsiteCardImage from "public/assets/commissions/Hell.svg";
import { Check, ChevronDown, Plus } from "lucide-react";
import Commission from "src/types/commission";

export default function Overview(data: { data: Commission }) {
	const t = useTranslations("COMMISSIONS");
	return (
		<Tooltip.Provider>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
				{[
					{
						id: "2D",
						image: TwoDeeCardImage,
						price: data.data.data.attributes.price2D,
						totalSlots: data.data.data.attributes.totalSlots2D,
						filledSlots: data.data.data.attributes.filledSlots2D,
						color: "bg-green",
						need: ["ideas", "license"],
						get: ["revisions", "assets", "exports", "projectFiles"],
					},
					{
						id: "Anim",
						image: AnimCardImage,
						price: data.data.data.attributes.priceAnim,
						totalSlots: data.data.data.attributes.totalSlotsAnim,
						filledSlots: data.data.data.attributes.filledSlotsAnim,
						color: "bg-blue",
						need: ["ideas", "license", "assets"],
						get: ["revisions", "projectFiles", "exports"],
					},
					{
						id: "3D",
						image: ThreeDeeCardImage,
						price: data.data.data.attributes.price3D,
						totalSlots: data.data.data.attributes.totalSlots3D,
						filledSlots: data.data.data.attributes.filledSlots3D,
						color: "bg-yellow",
						need: ["ideas"],
						get: ["revisions", "projectFiles", "exports"],
					},
					{
						id: "Web",
						image: WebsiteCardImage,
						price: data.data.data.attributes.priceWeb,
						totalSlots: data.data.data.attributes.totalSlotsWeb,
						filledSlots: data.data.data.attributes.filledSlotsWeb,
						color: "bg-red",
						need: ["ideas", "license", "pages", "assets", "hosting", "integrations"],
						get: ["sourceCode", "documentation", "frameworks"],
					},
				].map((service) => (
					<Collapsible.Root
						key={service.id}
						className="group/card relative w-full h-fit data-[state='closed']:active:scale-[0.98] data-[state='closed']:ring-1 ring-inset ring-neutral-900 hover:bg-neutral-900 data-[state='open']:bg-neutral-900 duration-200 data-[state='closed']:active:duration-100 rounded-lg overflow-clip"
					>
						<Collapsible.Trigger className="w-full selection:text-neutral-950">
							<div className={`w-full right-0 h-2 ${service.color}`} />
							<div className="flex flex-col-reverse lg:flex-row px-6 group-data-[state='closed']/card:pb-12 group-data-[state='open']/card:pb-6 items-center text-center lg:text-left duration-300 ease-out-cubic">
								<div className="flex-grow pt-6">
									<h3>{t(`Content.Offers.${service.id}.heading`)}</h3>
									<p className="text-md">{t(`Content.Offers.${service.id}.description`)}</p>
									<p className="font-display-mono font-semibold text-neutral-50 text-2xl lg:text-4xl tracking-tighter">
										{service.price}
									</p>
								</div>
								<FadingImage src={service.image} alt="" className="size-32" />
							</div>
						</Collapsible.Trigger>
						<Collapsible.Content className="data-[state=open]:animate-collapsible-vertical-open data-[state=closed]:animate-collapsible-vertical-close">
							<div className="border-t border-neutral-800">
								<h4 className="px-6 py-3">{t("Content.Offers.need")}</h4>
								<ul>
									{service.need.map((need) => (
										<li key={need} className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<Plus size={16} />
											{t(`Content.Offers.${service.id}.Need.${need}`)}
										</li>
									))}
								</ul>
								<h4 className="border-t border-neutral-800 px-6 py-3">{t("Content.Offers.get")}</h4>
								<ul className="pb-12">
									{service.get.map((get) => (
										<li key={need} className="flex gap-3 items-center odd:bg-neutral-800 px-6 py-2">
											<Check size={16} />
											{t(`Content.Offers.${service.id}.Get.${get}`)}
										</li>
									))}
								</ul>
							</div>
						</Collapsible.Content>
						<Tooltip.Root delayDuration={300}>
							<Collapsible.Trigger
								className="group/arrow absolute bottom-0 w-full h-12 flex items-center justify-between bg-gradient-to-t from-neutral-900"
								aria-hidden
							>
								<ChevronDown
									size={16}
									strokeWidth={3}
									className="ml-6 group-data-[state='open']/card:rotate-180 group-data-[state='closed']/card:group-hover/card:translate-y-1 group-data-[state='open']/card:group-hover/arrow:-translate-y-1 duration-200 ease-out-cubic"
								/>
								<Tooltip.Trigger asChild>
									<div className="flex gap-2 px-6 py-4">
										{[...Array(service.totalSlots)].map((_, index) => (
											<div
												className={`size-3 border-2 ${
													index >= service.filledSlots ? "border-neutral" : "bg-neutral-50"
												} rounded-full`}
												key={index}
											/>
										))}
									</div>
								</Tooltip.Trigger>
								<Tooltip.Content
									className="data-[state=delayed-open]:animate-tooltip-enter-left data-[state=instant-open]:animate-tooltip-enter-left
                                        data-[state=closed]:animate-tooltip-exit-left
                                        select-none rounded-full border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm leading-none shadow-lg will-change-[transform,opacity]"
									side="left"
									sideOffset={-5}
								>
									{service.totalSlots - service.filledSlots} slots available
									<Tooltip.Arrow className="fill-neutral-700" />
								</Tooltip.Content>
							</Collapsible.Trigger>
						</Tooltip.Root>
					</Collapsible.Root>
				))}
			</div>
		</Tooltip.Provider>
	);
}
