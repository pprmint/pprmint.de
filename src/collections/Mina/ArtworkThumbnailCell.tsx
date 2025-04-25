import BrokenImage from "@/icons/BrokenImage";
import EyeDisabled from "@/icons/EyeDisabled";
import type { Artwork } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";

export default function ArtworkThumbnailCell({
	rowData,
}: {
	rowData: Artwork;
}) {
	const nsfw =
		rowData && rowData.smut
			? rowData.smut?.docs && rowData.smut?.docs?.length > 0
			: false;
	const filename =
		rowData && rowData.thumbnailURL
			? rowData.thumbnailURL.replace(/^.*\/|-\d+x\d+(?=\.\w+$)/g, "")
			: "";
	if (rowData) {
		return rowData.thumbnailURL ? (
			<div className="leading-none">
				<Link
					href={`/admin/collections/artwork/${rowData.id}`}
					className="mina-artwork-thumbnail block group relative w-full aspect-square overflow-clip border-0 border-solid border-b border-[var(--theme-elevation-150)] hover:border-[var(--theme-elevation-250)] rounded-t-sm mb-2 duration-100"
					style={{
						backgroundImage:
							"url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M2%202V1H0V0h1v2z%22%20fill%3D%22%238881%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')",
						backgroundRepeat: "repeat",
						backgroundSize: "10%",
					}}
					title={filename}
				>
					<Image
						src={rowData.thumbnailURL}
						alt="Thumbnail"
						width={rowData.sizes?.thumbnail?.width || 0}
						height={rowData.sizes?.thumbnail?.height || 0}
						className={`size-full object-contain ${nsfw && "opacity-50 group-hover:opacity-100 duration-100"}`}
					/>
					{nsfw && (
						<div
							className="absolute inset-0 flex size-full items-center justify-center group-hover:opacity-0 text-[var(--theme-text)] duration-100"
							style={{ backdropFilter: "blur(6px)" }}
						>
							<EyeDisabled width={30} height={30} className="opacity-50" />
						</div>
					)}
				</Link>
				<Link
					href={`/admin/collections/artwork/${rowData.id}`}
					className="block underline decoration-[var(--theme-elevation-400)] text-[var(--theme-elevation-800)] text-[13px] w-full text-ellipsis overflow-hidden"
				>
					{filename}
				</Link>
			</div>
		) : (
			<Link
				href={`/admin/collections/artwork/${rowData.id}`}
				style={{
					width: 64,
					height: 64,
					border: "1px dashed var(--theme-elevation-150)",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: "var(--style-radius-s)",
				}}
			>
				<BrokenImage width={30} height={30} />
			</Link>
		);
	} else {
		return null;
	}
}
