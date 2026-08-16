"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import Select from "@/components/ui/Select";
import { useTranslations } from "next-intl";
import type { Camera } from "@/payload-types";

import { PaginatedDocs } from "payload";
import { useGalleryTransition } from "@/components/gallery/GalleryTransitionContext";

function Filters(props: { camera?: string; cameras: PaginatedDocs<Camera> }) {
	const t = useTranslations("PHOTOS");
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	const { startTransition, pending } = useGalleryTransition();

	// Dropdown for camera filter.
	function handleSelectCamera(camera: string) {
		const params = new URLSearchParams(searchParams);
		params.set("camera", camera);
		params.delete("p"); // Otherwise you may end up on a page with no results.
		startTransition(() => {
			replace(`${pathname}?${params.toString()}`, { scroll: false });
		});
	}
	function handleClearCamera() {
		const params = new URLSearchParams(searchParams);
		params.delete("camera");
		startTransition(() => {
			replace(`${pathname}?${params.toString()}`, { scroll: false });
		});
	}
	const cameraFilterActive = Boolean(props.camera && props.cameras.docs.some((a) => a.slug === props.camera));

	return (
		<>
			<div
				className={`sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:flex items-center grow ${pending && "opacity-75 pointer-events-none"} border-t border-black/5 dark:border-white/5`}
			>
				<div className="flex w-full xl:w-84 sm:border-r border-black/5 dark:border-white/5">
					<Select
						label={t("Content.Filters.camera")}
						icon={
							props.cameras.docs.find((i) => i.slug === props.camera)?.svgIcon ?? (
								<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
									<path d="M13 1v2.672c0 .663-.263 1.299-.732 1.767L9 8.707v3l-3 3v-6L2.732 5.439A2.5 2.5 0 0 1 2 3.672V1zM3 2v1.672c0 .397.158.779.439 1.06L7 8.293v4l1-1v-3l3.561-3.561A1.5 1.5 0 0 0 12 3.672V2z"></path>
								</svg>
							)
						}
						selected={{
							value: String(props.cameras.docs.find((i) => i.slug === props.camera)?.slug),
							label: props.cameras.docs.find((i) => i.slug === props.camera)?.name ?? t("Content.Filters.camera"),
						}}
						onValueChange={handleSelectCamera}
						showClearButton={cameraFilterActive}
						onClear={handleClearCamera}
						options={props.cameras.docs.map((camera) => ({
							value: camera.slug,
							label: camera.name,
							icon: camera.svgIcon ?? undefined,
						}))}
					/>
				</div>
			</div>
		</>
	);
}

export default dynamic(() => Promise.resolve(Filters), {
	ssr: false,
});
