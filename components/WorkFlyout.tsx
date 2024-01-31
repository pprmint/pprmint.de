import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useTransition, a, easings } from "@react-spring/web";
import * as Tooltip from "@radix-ui/react-tooltip";

import Work from "types/work";

interface FlyoutProps {
	works: Work[];
	selectedWork: number;
	onClose: () => void;
}

export default function StrapiLightbox(props: FlyoutProps) {
	const { selectedWork, onClose } = props;

	const { t } = useTranslation();
	const [currentWork, setCurrentWork] = useState(selectedWork);

	const flyoutTransition = useTransition(props.works[currentWork], {
		key: currentWork,
		from: {
			opacity: 0,
			y: -40,
		},
		enter: {
			opacity: 1,
			x: 0,
			config: { duration: 750, easing: easings.easeOutExpo },
		},
		leave: {
			opacity: 0,
			y: -40,
			config: {
				duration: 200,
				easing: easings.easeInCubic,
			},
		},
		exitBeforeEnter: true,
	});

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose]);

	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<div className="fixed flex items-center justify-center bg-neutral-950/75 backdrop-blur-md z-50 inset-0">
					<div className="fixed z-40 md:p-24 xl:p-48 h-screen w-screen overflow-auto">
                        <div onClick={onClose} className="fixed inset-0" />
						{flyoutTransition((style, work) => (
							<a.div key={work.id} style={style} className="flex mx-auto h-screen md:h-full drop-shadow-xl">
								<div className="w-full h-max bg-neutral-950 md:rounded-xl overflow-clip">
									<div className="relative overflow-hidden h-80 md:h-1/2-screen">
										<button
											className="group absolute z-50 top-3 md:top-5 right-3 md:right-5 text-neutral-50 w-10 h-10 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl"
											onClick={onClose}
										>
											<i className="ri-close-line" />
										</button>
										<Image
											src={`https://static.pprmint.art${work.attributes.cover.data.attributes.url}`}
											alt={work.attributes.title}
											width={work.attributes.cover.data.attributes.width}
											height={work.attributes.cover.data.attributes.height}
											className="absolute object-cover w-full h-auto"
										/>
										<div className="absolute inset-0 flex items-end justify-start p-9 bg-gradient-to-t from-neutral-950 to-neutral-950/50">
											<h1>{work.attributes.title}<span className="text-green">.</span></h1>
										</div>
									</div>
									<div className="px-3 md:px-6 mb-6">{work.attributes.text}</div>
								</div>
							</a.div>
						))}
					</div>
				</div>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
}
