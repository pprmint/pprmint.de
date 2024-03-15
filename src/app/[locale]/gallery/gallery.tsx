"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import FadingImage from "src/components/ui/FadingImage";
import { Link } from "src/navigation";
import Work, { Works } from "src/types/work";

export default function Gallery(works: { works: Works }) {
	const t = useTranslations("MINA");
	const [selected, setSelected] = useState(0);
	const selectedWork = works.works.data[selected > works.works.data.length ? 0 : selected];
	return (
		<Dialog.Root>
			<div className="mb-10 grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
				{works.works.data.map((work: Work, index: number) => (
					<Dialog.Trigger asChild key={work.id}>
						<button
							className="relative group overflow-hidden rounded-lg hover:contrast-75 active:contrast-100 active:opacity-75 duration-200 active:duration-75 cursor-pointer aspect-video focus-visible:animate-pulse"
							onClick={() => setSelected(index)}
						>
							<FadingImage
								src={`https://static.pprmint.art${work.attributes.cover.data.attributes.url}`}
								width={work.attributes.cover.data.attributes.width}
								height={work.attributes.cover.data.attributes.height}
								alt=""
								className={`h-full min-w-full object-cover ${work.attributes.coverFocus} bg-neutral-900`}
							/>
						</button>
					</Dialog.Trigger>
				))}
			</div>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-neutral-950/90 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-50" />
				<Dialog.Content
					className={`fixed z-60 lg:top-1/2 lg:left-1/2 max-h-svh lg:max-h-[90vh] w-4/5-screen lg:-translate-x-1/2 lg:-translate-y-1/2 bg-neutral-950 border border-neutral-900 ring-1 ring-neutral-950 shadow-xl shadow-neutral-950/50 rounded-xl data-[state=open]:animate-scale-up data-[state=closed]:animate-scale-down focus:outline-none origin-center lg:origin-top-left`}
				>
					<Dialog.Close asChild>
						<button
							className="absolute z-60 inline-flex items-center justify-center top-3 md:top-5 right-3 md:right-5 size-10 rounded-full text-neutral-50 hover:bg-neutral-900 active:bg-neutral-800 duration-100"
							aria-label="Close"
						>
							<X />
						</button>
					</Dialog.Close>
					<div className="relative overflow-hidden h-80 md:h-1/3-screen">
						<FadingImage
							src={`https://static.pprmint.art${selectedWork.attributes.cover.data.attributes.formats.thumbnail.url}`}
							alt={selectedWork.attributes.title}
							fill
							className={`object-cover ${selectedWork.attributes.coverFocus} h-full min-w-full contrast-[0.87] blur-lg`}
						/>
						<div
							className="absolute inset-0"
							style={{
								backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24"><path d="M0 10V0h10a2 2 0 0 0 4 0h10v10a2 2 0 0 0 0 4v10H14a2 2 0 0 0-4 0H0V14a2 2 0 0 0 0-4Z" style="fill:%23111"/></svg>')`,
								backgroundRepeat: "repeat",
								backgroundPosition: "top",
							}}
						/>
						<div className="absolute inset-0 flex items-end justify-start px-6 lg:px-9 pb-3 bg-gradient-to-t from-neutral-950 to-neutral-950/75">
							<Dialog.Title asChild>
								<h1>
									{selectedWork.attributes.title}
									<span className="text-green">.</span>
								</h1>
							</Dialog.Title>
						</div>
					</div>
					<Dialog.Description asChild className="px-6 lg:px-9 prose-a:text-link-external">
						<Markdown remarkPlugins={[remarkGfm]}>{selectedWork.attributes.text}</Markdown>
					</Dialog.Description>
					<hr className="m-6 lg:m-9 border-neutral-900" />
					{selectedWork.attributes.gallery.data.map((media) =>
						media.attributes.mime.startsWith("image") ? (
							<FadingImage
								key={media.id.toString()}
								src={`https://static.pprmint.art${media.attributes.url}`}
								alt={media.attributes.alternativeText}
								width={media.attributes.width}
								height={media.attributes.height}
								quality={90}
								className="w-full h-auto animate-skeleton-pulse"
							/>
						) : (
							media.attributes.mime.startsWith("video") && (
								<video
									controls
									key={media.id.toString()}
									className="w-full h-auto"
									src={`https://static.pprmint.art${media.attributes.url}`}
								/>
							)
						)
					)}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
