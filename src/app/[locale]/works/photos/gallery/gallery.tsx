"use client";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useTranslations, useFormatter } from "next-intl";
import Image from "next/image";
import FadingImage from "src/components/ui/FadingImage";
import CameraAperture from "src/icons/CameraAperture";
import CameraIso from "src/icons/CameraIso";
import CameraShutterSpeed from "src/icons/CameraShutterSpeed";
import CameraFocalLength from "src/icons/CameraFocalLength";
import Error from "src/icons/Error";
import { Photos } from "src/types/photo";

export default function Gallery(photos: { photos: Photos }) {
	const t = useTranslations("PHOTOS");
	const format = useFormatter();
	return (
		<Tooltip.Provider>
			<div className="group mb-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
				{photos.photos.data.map((photo) => (
					<Dialog.Root key={photo.id}>
						<Dialog.Trigger asChild>
							<button
								className="group/button relative overflow-clip hover:rounded-lg focus-visible:rounded-lg bg-neutral-950
    							odd:origin-left even:origin-right
    							lg:odd:origin-center lg:even:origin-center
    							lg:[&:nth-child(3n+1)]:origin-left lg:[&:nth-child(3n)]:origin-right
    							xl:[&:nth-child(3n+1)]:origin-center xl:[&:nth-child(3n)]:origin-center
    							xl:[&:nth-child(4n+1)]:origin-left xl:[&:nth-child(4n)]:origin-right
    							3xl:[&:nth-child(4n+1)]:origin-center 3xl:[&:nth-child(4n)]:origin-center
    							3xl:[&:nth-child(5n+1)]:origin-left 3xl:[&:nth-child(5n)]:origin-right
    							hover:scale-[1.02] focus-visible:scale-[1.02] active:scale-[1.01] hover:z-10 focus-visible:z-10 justify hover:ring-1 ring-neutral-50/10 hover:shadow-2xl hover:shadow-neutral-950/50 focus-visible:shadow-2xl duration-250 ease-out-quint active:duration-75 cursor-pointer aspect-[3/2]"
							>
								<FadingImage
									src={`https://static.pprmint.de${photo.attributes.photo.data.attributes.url}`}
									width={photo.attributes.photo.data.attributes.width}
									height={photo.attributes.photo.data.attributes.height}
									alt=""
									className={`h-full min-w-full object-cover [.group:hover_&:not(:hover)]:opacity-50 active:opacity-75 duration-250 active:duration-75 ease-out-quint group-focus-visible/button:animate-pulse`}
									unoptimized={photo.attributes.photo.data.attributes.url.includes(".gif")}
								/>
							</button>
						</Dialog.Trigger>
						<Dialog.Portal>
							<Dialog.Overlay className="bg-neutral-950 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-90" />
							<Dialog.Content
								className={`fixed z-100 flex flex-col gap-12 items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-svh w-screen max-w-max data-[state=open]:animate-scale-up data-[state=closed]:animate-scale-down origin-top-left duration-200 focus-visible:outline-none`}
							>
								<FadingImage
									src={`https://static.pprmint.de${photo.attributes.photo.data?.attributes.url}`}
									width={photo.attributes.photo.data?.attributes.width}
									height={photo.attributes.photo.data?.attributes.height}
									alt=""
									className="max-h-svh max-w-[90vw] w-auto py-16"
									unoptimized
								/>
								<div className="absolute flex items-center top-4 inset-x-0">
									<div className="flex items-center justify-between flex-grow gap-3 text-xl font-display">
										<Dialog.Title asChild>
											<p className="text-neutral-50">
												{format.dateTime(new Date(photo.attributes.dateTime), {
													day: "numeric",
													month: "long",
													year: "numeric",
												})}
												,{" "}
												{format.dateTime(new Date(photo.attributes.dateTime), {
													hour: "numeric",
													minute: "2-digit",
												})}
											</p>
										</Dialog.Title>
										<Dialog.Close asChild>
											<button className="text-neutral-50 p-2.5 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl">
												<Error />
											</button>
										</Dialog.Close>
									</div>
								</div>
								<div className="absolute flex flex-col md:flex-row items-center bottom-4 inset-x-0 h-9 gap-1">
									<div className="flex items-center flex-grow gap-6">
										<Image
											src={`https://static.pprmint.de${photo.attributes.camera.data.attributes.logo.data.attributes.url}`}
											width={photo.attributes.camera.data.attributes.logo.data.attributes.width}
											height={photo.attributes.camera.data.attributes.logo.data.attributes.height}
											alt={photo.attributes.camera.data.attributes.name}
											unoptimized
											className="invert h-4 md:h-6 w-auto"
										/>
										{photo.attributes.lens.data && photo.attributes.lens.data.attributes.name}
									</div>
									<div className="flex gap-6 select-none">
										<Tooltip.Root delayDuration={0}>
											<Tooltip.Trigger asChild>
												<div className="flex gap-1 items-center">
													<CameraIso />
													<span className="font-mono text-sm">{photo.attributes.iso}</span>
												</div>
											</Tooltip.Trigger>
											<Tooltip.Content
												className="data-[state=delayed-open]:animate-tooltip-enter-bottom data-[state=instant-open]:animate-tooltip-enter-bottom
												data-[state=closed]:animate-tooltip-exit-bottom
												select-none rounded-full border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm leading-none shadow-xl shadow-neutral-950/50"
												side="top"
											>
												{t("Content.Camera.iso")}
												<Tooltip.Arrow className="fill-neutral-700" />
											</Tooltip.Content>
										</Tooltip.Root>
										<Tooltip.Root delayDuration={0}>
											<Tooltip.Trigger asChild>
												<div className="flex gap-1 items-center">
													<CameraAperture />
													<span className="font-mono text-sm">
														<i>f</i>/{photo.attributes.aperture}
													</span>
												</div>
											</Tooltip.Trigger>
											<Tooltip.Content
												className="data-[state=delayed-open]:animate-tooltip-enter-bottom data-[state=instant-open]:animate-tooltip-enter-bottom
												data-[state=closed]:animate-tooltip-exit-bottom
												select-none rounded-full border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm leading-none shadow-xl shadow-neutral-950/50"
												side="top"
											>
												{t("Content.Camera.aperture")}
												<Tooltip.Arrow className="fill-neutral-700" />
											</Tooltip.Content>
										</Tooltip.Root>
										<Tooltip.Root delayDuration={0}>
											<Tooltip.Trigger asChild>
												<div className="flex gap-1 items-center">
													<CameraShutterSpeed />
													<span className="font-mono text-sm">
														{photo.attributes.shutter}s
													</span>
												</div>
											</Tooltip.Trigger>
											<Tooltip.Content
												className="data-[state=delayed-open]:animate-tooltip-enter-bottom data-[state=instant-open]:animate-tooltip-enter-bottom
												data-[state=closed]:animate-tooltip-exit-bottom
												select-none rounded-full border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm leading-none shadow-xl shadow-neutral-950/50"
												side="top"
											>
												{t("Content.Camera.shutterSpeed")}
												<Tooltip.Arrow className="fill-neutral-700" />
											</Tooltip.Content>
										</Tooltip.Root>
										<Tooltip.Root delayDuration={0}>
											<Tooltip.Trigger asChild>
												<div className="flex gap-1 items-center">
													<CameraFocalLength />
													<span className="font-mono text-sm">
														{photo.attributes.focalLength}mm
													</span>
												</div>
											</Tooltip.Trigger>
											<Tooltip.Content
												className="data-[state=delayed-open]:animate-tooltip-enter-bottom data-[state=instant-open]:animate-tooltip-enter-bottom
												data-[state=closed]:animate-tooltip-exit-bottom
												select-none rounded-full border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm leading-none shadow-xl shadow-neutral-950/50"
												side="top"
											>
												{t.rich("Content.Camera.focalLength", {
													small: (chunks) => <span className="text-xs">{chunks}</span>,
												})}
												<Tooltip.Arrow className="fill-neutral-700" />
											</Tooltip.Content>
										</Tooltip.Root>
									</div>
								</div>
							</Dialog.Content>
						</Dialog.Portal>
					</Dialog.Root>
				))}
			</div>
		</Tooltip.Provider>
	);
}
