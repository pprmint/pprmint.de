import * as React from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { useTransition, a, config } from "@react-spring/web";
import FocusTrap from "focus-trap-react";
import * as Portal from "@radix-ui/react-portal";

import Head from "components/Head";
import Title from "components/Title";
import Lightbox from "components/Lightbox";

const Works = [
	{
		caption: "Glass Flap",
		src: "https://static.pprmint.art/works/2023/GlassFlap/Glass_Flap.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0NHL5DwAC6wGo7xXJWAAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Stairway",
		src: "https://static.pprmint.art/works/2023/KDEStairway/Stairway_Night.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkkPP/DwACAQFuxXoefQAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Inverted exit hole",
		src: "https://static.pprmint.art/works/2023/InvertedExitHole/Inverted_Exit_Hole.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPU2ZbwHwAEmwJD7zWR+QAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Atoms",
		src: "https://static.pprmint.art/works/2023/Atoms/Atoms_or_some_shit.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM009n2HwAD0QIZtfB7KAAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Acrylic stairway",
		src: "https://static.pprmint.art/works/2023/AcrylicStairway/Acrylic_Stairway.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8fz7rPwAIRgM5WZCoOAAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Acrylic outlook",
		src: "https://static.pprmint.art/works/2023/AcrylicOutlook/Acrylic_Outlook.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8fz7rPwAIRgM5WZCoOAAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Cute sandpaper",
		src: "https://static.pprmint.art/works/2023/CuteSandpaper/Cute_Sandpaper.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8FrPqPwAHSQL9ETRk+wAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Glass pillars",
		src: "https://static.pprmint.art/works/2023/GlassPillars/Glass_Pillars_green.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkOJP2BwAENgIwkJfadQAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Crystal cave",
		src: "https://static.pprmint.art/works/2023/CrystalCave/Crystal_Cave.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcabXrPwAFjwKOefZsQwAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Toilet bowl",
		src: "https://static.pprmint.art/works/2023/ToiletBowl/1_0339.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPc8B8AAmUBsYMxtcoAAAAASUVORK5CYII=",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Purple quartz",
		src: "https://static.pprmint.art/works/2022/PurpleQuartz/Purple_Quartz.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMta/+DwAEMAIYH14umAAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
		tumblr: "https://blog.pprmint.art/post/701202293755953152/purple-quartz",
	},
	{
		caption: "Landscape",
		src: "https://static.pprmint.art/works/2022/Landscape/Landscape.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMsKan8DwAFJwJi2lLHfwAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Pimples",
		src: "https://static.pprmint.art/works/2022/Pimples/Confusing_POST.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUEhL4DwABpwE1wrSuHQAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Obsidian",
		src: "https://static.pprmint.art/works/2022/Obsidian/obsidian.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0Vyn+DwADVwHXFVegmgAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Platonic",
		src: "https://static.pprmint.art/works/2022/Platonic/platonic_edit_mirrored.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUNFb+DwACLAFoF1fa3wAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Next.js",
		src: "https://static.pprmint.art/works/2022/Nextjs/NextJS.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkkPP/DwACAQFuxXoefQAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "what",
		src: "https://static.pprmint.art/works/2022/What/whatb.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMsrTzwHwAFyAKvBZZt1gAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Solar system 2",
		src: "https://static.pprmint.art/works/2022/SolarSystem/Solar_System_2.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0ctT/DwADMgGzY1TPcgAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Flap",
		src: "https://static.pprmint.art/works/2022/Flap/Flap.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNsPPvvPwAHcANNlsBOAgAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Swirl",
		src: "https://static.pprmint.art/works/2022/Swirl/Swirl_1080p_E.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMs95z4HwAE4gJSNSIlJwAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Lights",
		src: "https://static.pprmint.art/works/2022/Lights/N-720.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPkUrD4DwACAQFjqUq7jwAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Book",
		src: "https://static.pprmint.art/works/2022/Book/Cover-720.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUFhL4DwABqwE2D0tXzwAAAABJRU5ErkJggg==",
		width: 720,
		height: 1018,
	},
	{
		caption: "MINT",
		src: "https://static.pprmint.art/works/2022/MintBanners/MINT_Night-720.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMU/A8AAScBEsBwhbUAAAAASUVORK5CYII=",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Wii remake",
		src: "https://static.pprmint.art/works/2022/WiiRemake/WiiRemake-720.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8++fPfwAJ6QP2LpIhtgAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Geoballs",
		src: "https://static.pprmint.art/works/2022/Geoices/geoballs-720.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNUlXf8DwACfAGG83/Z/gAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "SUSE rebrand concept",
		src: "https://static.pprmint.art/works/2022/SUSE/suse-720.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0t7H/DwADFwGzqTOkAQAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Statistics",
		src: "https://static.pprmint.art/works/2022/Statistics/statistics.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMU+g8AASkBE945rRMAAAAASUVORK5CYII=",
		width: 1080,
		height: 1080,
	},
	{
		caption: "iPad",
		src: "https://static.pprmint.art/works/2022/iPad/iPad.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNU+Q8AAU0BJUYogwYAAAAASUVORK5CYII=",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Arch wallpaper",
		src: "https://static.pprmint.art/works/2022/ArchWall/Arch_Qogir.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUkVX8DwACEgFb11SrOwAAAABJRU5ErkJggg==",
		width: 1920,
		height: 1080,
	},
	{
		caption: "Ford rebrand concept",
		src: "https://static.pprmint.art/works/2022/Ford/Ford-720.png",
		blurData:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",
		width: 1920,
		height: 1080,
	},
];

export default function Gallery() {
	const { t } = useTranslation();
	const [selectedImage, setSelectedImage] = React.useState(0);
	const [open, setOpen] = React.useState(false);
	const handleLightboxOpen = (id: number) => {
		setSelectedImage(id);
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
		config: config.stiff,
	});
	return (
		<>
			<Head title={t("GALLERY:Head.title")} description={t("GALLERY:Head.description")} />
			<Title title={t("GALLERY:Head.title")} description={t("GALLERY:Head.description")}>
				<Image src={Works[0].src} alt={Works[0].caption} fill className="object-cover" quality={90} />
			</Title>
			<main>
				<section className="py-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-2 px-2">
						{Works.map((Work, index) => (
							<button
								key={Work.caption}
								onClick={() => handleLightboxOpen(index)}
								className="aspect-video relative group overflow-hidden border border-neutral-50/10 hover:border-neutral-50/20 rounded-lg hover:contrast-[80%] active:contrast-100 hover:scale-[102%] active:scale-100 duration-200 active:duration-75 hover:shadow-xl hover:z-10 cursor-zoom-in"
							>
								<Image
									src={Work.src}
									width={Work.width}
									height={Work.height}
									alt={Work.caption}
									placeholder="blur"
									sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, (max-width: 1920px) 25vw, 20vw"
									blurDataURL={Work.blurData}
									className="h-full object-cover object-top"
								/>
							</button>
						))}
				</section>
			</main>
			{transitions((styles, item) =>
				item ? (
					<FocusTrap>
						<Portal.Root className="fixed z-50">
							<a.div style={styles}>
								<Lightbox
									images={Works}
									aspectRatio="video"
									selectedImage={selectedImage}
									onClose={() => handleLightboxClose()}
								/>
							</a.div>
						</Portal.Root>
					</FocusTrap>
				) : null
			)}
		</>
	);
}
