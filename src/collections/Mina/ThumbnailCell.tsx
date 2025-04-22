import BrokenImage from "@/icons/BrokenImage";
import EyeDisabled from "@/icons/EyeDisabled";
import type { Mina } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";

export default function ThumbnailCell({ rowData }: { rowData: Mina }) {
	if (rowData) {
		return rowData.thumbnailURL ? (
			rowData.images.length === 1 ? (
				<Link
					href={`/admin/collections/mina/${rowData.id}`}
					className="group relative size-16 overflow-clip rounded-[3px]"
					style={{
						boxShadow:
							"0 2px 2px -1px #0000001a, inset 0 0 1px var(--theme-elevation-150)",
						backgroundImage:
							"url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M2%202V1H0V0h1v2z%22%20fill%3D%22%238881%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')",
						backgroundRepeat: "repeat",
						backgroundSize: "20%",
						backgroundColor: "var(--theme-elevation-50)",
					}}
					title={rowData.thumbnailURL.replace(/^.*\/|-\d+x\d+(?=\.\w+$)/g, "")}
				>
					<Image
						src={rowData.thumbnailURL}
						alt="Thumbnail"
						fill
						className={`size-full object-cover object-top ${rowData.nsfw && "opacity-50 group-hover:opacity-100 duration-100"}`}
					/>
					{rowData.nsfw && (
						<div
							className="flex size-full items-center justify-center group-hover:opacity-0 text-[var(--theme-text)] duration-100"
							style={{ backdropFilter: "blur(6px)" }}
						>
							<EyeDisabled width={30} height={30} className="opacity-50" />
						</div>
					)}
				</Link>
			) : (
				<Link
					className="group relative size-16 overflow-visible"
					href={`/admin/collections/mina/${rowData.id}`}
					title={`${rowData.thumbnailURL.replace(/^.*\/|-\d+x\d+(?=\.\w+$)/g, "")} + ${
						rowData.images.length - 1
					} more`}
				>
					<div className="absolute flex items-center justify-center opacity-0 group-hover:opacity-100 bottom-0 right-0 size-[60px] border border-solid border-[var(--theme-elevation-100)] bg-[var(--theme-elevation-50)] rounded-[3px] duration-150 ease-out" />
					<div className="absolute flex items-center justify-center bottom-0 right-0 group-hover:bottom-1 group-hover:right-1 size-[60px] border border-solid border-[var(--theme-elevation-150)] bg-[var(--theme-elevation-50)] rounded-[3px] duration-150 ease-out">
						<span aria-hidden className="text-2xl">
							{rowData.images.length}
						</span>
					</div>
					<div
						className="absolute size-[60px] top-0 left-0 group-hover:-top-1 group-hover:-left-1 group-hover:opacity-0 bg-[var(--theme-elevation-50)] rounded-[3px] overflow-clip duration-150 ease-out"
						style={{
							boxShadow:
								"0 2px 2px -1px #0000001a, inset 0 0 1px var(--theme-elevation-150)",
							backgroundImage:
								"url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M2%202V1H0V0h1v2z%22%20fill%3D%22%238881%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')",
							backgroundRepeat: "repeat",
							backgroundSize: "20%",
						}}
					>
						<Image
							src={rowData.thumbnailURL}
							alt="Thumbnail"
							fill
							className={`size-full object-cover object-top ${rowData.nsfw && "opacity-50 group-hover:opacity-100 duration-100"}`}
						/>
						{rowData.nsfw && (
							<div
								className="flex size-full items-center justify-center group-hover:opacity-0 text-[var(--theme-text)] duration-100"
								style={{ backdropFilter: "blur(6px)" }}
							>
								<EyeDisabled width={30} height={30} className="opacity-50" />
							</div>
						)}
					</div>
				</Link>
			)
		) : (
			<Link
				href={`/admin/collections/mina/${rowData.id}`}
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
