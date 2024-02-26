import { useState, PropsWithChildren } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { useTransition, a, config } from "@react-spring/web";
import FocusTrap from "focus-trap-react";
import * as Select from "@radix-ui/react-select";
import * as Portal from "@radix-ui/react-portal";

import Work, { Works } from "types/work";
import Head from "src/components/Head";
import Title from "src/components/Title";
import WorkCard from "src/components/WorkCard";
import FadingImage from "src/components/FadingImage";

import MinaWhat from "public/assets/mina/minawhat.png";

export default function Gallery({ Works }: { Works: Works }) {
	const { t } = useTranslation();
	const [selectedWork, setSelectedWork] = useState(0);
	const [open, setOpen] = useState(false);

	const handleLightboxOpen = (id: number) => {
		setSelectedWork(id);
		document.body.classList.add("overflow-hidden");
		setOpen(true);
	};

	const handleLightboxClose = () => {
		document.body.classList.remove("overflow-hidden");
		setOpen(false);
	};

	const transitions = useTransition(open, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: {
			duration: 100,
		},
	});

	// For dropdowns.
	function SelectItem(props: PropsWithChildren<{ value: string }>) {
		return (
			<Select.Item
				value={props.value}
				className="group relative flex items-center gap-3 pr-2 pl-2 data-[highlighted]:pl-3 h-8 rounded-sm leading-none select-none outline-none data-[disabled]:text-neutral data-[disabled]:pointer-events-none data-[highlighted]:text-neutral-50 data-[state=checked]:text-neutral-50 data-[highlighted]:bg-neutral-50/10 active:opacity-75 duration-100 cursor-pointer focus-visible:outline-none"
			>
				<Select.ItemText className="flex-grow">{props.children}</Select.ItemText>
				<Select.ItemIndicator className="ml-auto">
					<i className="ri-check-line" />
				</Select.ItemIndicator>
			</Select.Item>
		);
	}

	// Filter by dimension.
	const [filteredDimension, setFilteredDimension] = useState("");

	// Filter by whether stuff moves or not.
	const [filteredType, setFilteredType] = useState("");

	// Filter by year.
	const [filteredYear, setFilteredYear] = useState("");
	const yearList = Array.from({ length: new Date().getFullYear() - 2019 + 1 }, (_, index) =>
		(new Date().getFullYear() - index).toString()
	);

	const filteredWorks = Works.data
		.filter((work: Work) => (filteredYear != "" ? work.attributes.creationDate.startsWith(filteredYear) : true))
		.filter((work: Work) => (filteredDimension != "" ? work.attributes.dimension == filteredDimension : true))
		.filter((work: Work) => (filteredType != "" ? work.attributes.type == filteredType : true));

	return (
		<>
			<Head title={t("GALLERY:Head.title")} description={t("GALLERY:Head.description")} />
			<Title title={t("GALLERY:Head.title")} description={t("GALLERY:Head.description")}>
				<FadingImage
					src={`https://static.pprmint.art${Works.data[0].attributes.cover.data.attributes.url}`}
					alt={Works.data[0].attributes.title}
					fill
					className="object-cover"
					quality={90}
				/>
			</Title>
			<main>
				<section className="my-20 px-2">
					<div className="max-w-lg md:max-w-3xl mx-auto items-center p-2 bg-neutral-900 rounded-lg">
						<div className="grid grid-cols-2 md:flex w-full flex-wrap md:flex-nowrap gap-2">
							<Select.Root value={filteredYear} onValueChange={setFilteredYear}>
								<div className="flex md:w-1/2">
									<Select.Trigger
										className={`group flex items-center justify-between rounded-md leading-none px-3 h-9 w-full border border-neutral-800 ${
											filteredYear != "" && "rounded-r-none"
										} hover:bg-neutral-800 hover:text-neutral-50 duration-100`}
										aria-label="Year"
									>
										<Select.Value aria-label={filteredYear} placeholder={t("GALLERY:Content.Filters.year")} />
										<Select.Icon className="ml-auto group-hover:translate-y-0.5 duration-100">
											<i className="ri-arrow-down-s-line" />
										</Select.Icon>
									</Select.Trigger>
									{filteredYear != "" && (
										<button
											onClick={() => setFilteredYear("")}
											className="h-9 border border-l-0 border-neutral-800 px-2.5 rounded-r-md hover:bg-neutral-800 hover:text-neutral-50 duration-100"
										>
											<i className="ri-close-line" />
										</button>
									)}
								</div>
								<Select.Portal>
									<Select.Content className="z-50 text-neutral p-1 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 shadow-xl shadow-neutral-950/50 rounded-lg data-[state=open]:animate-select-open">
										<Select.ScrollUpButton className="absolute z-50 top-0 left-0 right-0 flex justify-center bg-gradient-to-b from-neutral-900/50 text-neutral-50 rounded-t-md">
											<i className="ri-arrow-up-s-line" />
										</Select.ScrollUpButton>
										<Select.Viewport className="p-1">
											<Select.Group>
												{yearList.map((year) => (
													<SelectItem key={year} value={year}>
														{year}
													</SelectItem>
												))}
											</Select.Group>
										</Select.Viewport>
										<Select.ScrollDownButton className="absolute z-50 bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-neutral-900/50 text-neutral-50 rounded-b-md">
											<i className="ri-arrow-down-s-line" />
										</Select.ScrollDownButton>
									</Select.Content>
								</Select.Portal>
							</Select.Root>
							<div className="flex h-9 md:w-4/5">
								<button
									onClick={() =>
										filteredDimension == "twodee" ? setFilteredDimension("") : setFilteredDimension("twodee")
									}
									className={`flex gap-3 items-center justify-center w-full hover:text-neutral-50 border border-neutral-800 rounded-l-md ${
										filteredDimension == "twodee"
											? "bg-neutral-800 text-neutral-50 hover:text-neutral"
											: "hover:bg-neutral-800"
									} duration-100`}
								>
									<i className="ri-square-line" />
									2D
								</button>
								<button
									onClick={() =>
										filteredDimension == "threedee" ? setFilteredDimension("") : setFilteredDimension("threedee")
									}
									className={`flex gap-3 items-center justify-center w-full hover:text-neutral-50 border border-neutral-800 rounded-r-md border-l-0 ${
										filteredDimension == "threedee"
											? "bg-neutral-800 text-neutral-50 hover:text-neutral"
											: "hover:bg-neutral-800"
									} duration-100`}
								>
									<i className="ri-box-3-line" />
									3D
								</button>
							</div>
							<div className="flex h-9 w-full col-span-2">
								<button
									onClick={() => (filteredType == "static" ? setFilteredType("") : setFilteredType("static"))}
									className={`flex gap-3 items-center justify-center w-full hover:text-neutral-50 border border-neutral-800 rounded-l-md ${
										filteredType == "static"
											? "bg-neutral-800 text-neutral-50 hover:text-neutral"
											: "hover:bg-neutral-800"
									} duration-100`}
								>
									<i className="ri-image-line" />
									{t("GALLERY:Content.Filters.Type.static")}
								</button>
								<button
									onClick={() => (filteredType == "animated" ? setFilteredType("") : setFilteredType("animated"))}
									className={`flex gap-3 items-center justify-center w-full hover:text-neutral-50 border border-neutral-800 rounded-r-md border-l-0 ${
										filteredType == "animated"
											? "bg-neutral-800 text-neutral-50 hover:text-neutral"
											: "hover:bg-neutral-800"
									} duration-100`}
								>
									<i className="ri-video-line" />
									{t("GALLERY:Content.Filters.Type.animated")}
								</button>
							</div>
						</div>
					</div>
					{filteredWorks.length > 0 ? (
						<>
							<h3 className="text-center pt-6">{t("GALLERY:Content.showingWorks", { count: filteredWorks.length })}</h3>
							<div className="py-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-2">
								{filteredWorks.map((work: Work, index: number) => (
									<button
										key={work.id}
										onClick={() => handleLightboxOpen(index)}
										className="aspect-video relative group overflow-hidden rounded-lg hover:contrast-[80%] active:contrast-100 hover:scale-[102%] active:scale-100 duration-200 active:duration-75 hover:shadow-xl hover:z-10 cursor-pointer"
									>
										<FadingImage
											src={`https://static.pprmint.art${work.attributes.cover.data.attributes.url}`}
											width={work.attributes.cover.data.attributes.width}
											height={work.attributes.cover.data.attributes.height}
											alt=""
											className={`h-full min-w-full object-cover bg-neutral-50/10 ${work.attributes.coverFocus}`}
										/>
									</button>
								))}
							</div>
						</>
					) : (
						<div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
							<Image src={MinaWhat} alt="" className="w-full max-w-64 h-auto my-12" />
							<h2>
								{t("COMMON:noResults")}
								<span className="text-green">.</span>
							</h2>
							<p>{t("COMMON:tryDifferent")}</p>
						</div>
					)}
				</section>
			</main>
			{transitions((styles, item) =>
				item ? (
					<FocusTrap>
						<Portal.Root className="fixed z-50">
							<a.div style={styles}>
								<WorkCard work={Works.data[selectedWork]} onClose={() => handleLightboxClose()} />
							</a.div>
						</Portal.Root>
					</FocusTrap>
				) : null
			)}
		</>
	);
}

export async function getStaticProps({ locale }: { locale: string }) {
	const initialPage = 1;
	const pageSize = 100;

	const res = await fetch(
		`${process.env.STRAPI_API_URL}/works?pagination[pageSize]=${pageSize}&pagination[currentPage]=${initialPage}&populate=cover,gallery&locale=${locale}&sort=creationDate:desc`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
			},
		}
	);
	const Works: Works = await res.json();
	return {
		props: {
			Works,
		},
		revalidate: 30,
	};
}
