import * as React from "react";
import useTranslation from "next-translate/useTranslation";
import { useTransition, a, config } from "@react-spring/web";
import FocusTrap from "focus-trap-react";
import * as Portal from "@radix-ui/react-portal";

import Work, { Works } from "types/work";
import Head from "components/Head";
import Title from "components/Title";
import WorkFlyout from "components/WorkFlyout";
import { useRouter } from "next/router";
import FadingImage from "components/FadingImage";

export default function Gallery({ Works }: { Works: Works }) {
	const locale = useRouter();

	const { t } = useTranslation();
	const [selectedWork, setSelectedWork] = React.useState(0);
	const [open, setOpen] = React.useState(false);

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

	return (
		<>
			<Head title={t("GALLERY:Head.title")} description={t("GALLERY:Head.description")} />
			<Title title={t("GALLERY:Head.title")} description={t("GALLERY:Head.description")}>
				<FadingImage
					src={`https://static.pprmint.art${Works.data[0].attributes.cover.data.attributes.url}`}
					alt={Works.data[0].attributes.title}
					fill
					imageClassName="object-cover"
					quality={90}
				/>
			</Title>
			<main>
				<section className="my-12">
					<div className="py-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-2 px-2">
						{Works.data.map((work: Work, index: number) => (
							<button
								key={work.id}
								onClick={() => handleLightboxOpen(index)}
								className="aspect-video relative group overflow-hidden rounded-lg hover:contrast-[80%] active:contrast-100 hover:scale-[102%] active:scale-100 duration-200 active:duration-75 hover:shadow-xl hover:z-10 cursor-zoom-in"
							>
								<FadingImage
									src={`https://static.pprmint.art${work.attributes.cover.data.attributes.url}`}
									width={work.attributes.cover.data.attributes.width}
									height={work.attributes.cover.data.attributes.height}
									alt=""
									containerClassName="h-full min-w-full object-cover bg-neutral-50/10"
									imageClassName={`h-full min-w-full object-cover ${work.attributes.coverFocus}`}
								/>
							</button>
						))}
					</div>
				</section>
			</main>
			{transitions((styles, item) =>
				item ? (
					<FocusTrap>
						<Portal.Root className="fixed z-50">
							<a.div style={styles}>
								<WorkFlyout works={Works.data} selectedWork={selectedWork} onClose={() => handleLightboxClose()} />
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
