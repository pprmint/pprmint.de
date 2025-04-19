import BrokenImage from "@/icons/BrokenImage";
import type { Mina } from "@/payload-types";
import Link from "next/link";

export default function ThumbnailCell({ rowData }: { rowData: Mina }) {
	if (rowData) {
		return rowData.thumbnailURL ? (
			rowData.images.length === 1 ? (
				<Link
					href={`/admin/collections/mina/${rowData.id}`}
					style={{
						width: 64,
						height: 64,
						overflow: "clip",
						borderRadius: "var(--style-radius-s)",
						boxShadow: "0 2px 2px -1px #0000001a, inset 0 0 1px var(--theme-elevation-150)",
						backgroundImage:
							"url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M2%202V1H0V0h1v2z%22%20fill%3D%22%238881%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')",
						backgroundRepeat: "repeat",
						backgroundSize: "20%",
						backgroundColor: "var(--theme-elevation-50)",
					}}
					title={rowData.thumbnailURL.replace(/^.*\/|-\d+x\d+(?=\.\w+$)/g, '')}
				>
					<img
						src={rowData.thumbnailURL}
						alt="Thumbnail"
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							objectPosition: "top",
						}}
					/>
				</Link>
			) : (
				<Link
					href={`/admin/collections/mina/${rowData.id}`}
					style={{
						width: 64,
						height: 64,
						position: "relative",
					}}
					title={`${rowData.thumbnailURL.replace(/^.*\/|-\d+x\d+(?=\.\w+$)/g, '')} + ${rowData.images.length - 1} more`}
				>
					<div
						style={{
							width: 58,
							height: 58,
							border: "1px solid var(--theme-elevation-150)",
							backgroundColor: "var(--theme-elevation-50)",
							position: "absolute",
							bottom: 0,
							right: 0,
							borderRadius: "var(--style-radius-s)",
						}}
					/>
					<div
						style={{
							width: 58,
							height: 58,
							overflow: "clip",
							position: "absolute",
							top: 0,
							left: 0,
							borderRadius: "var(--style-radius-s)",
							boxShadow: "0 2px 2px -1px #0000001a, inset 0 0 1px var(--theme-elevation-150)",
							backgroundImage:
								"url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M2%202V1H0V0h1v2z%22%20fill%3D%22%238881%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')",
							backgroundRepeat: "repeat",
							backgroundSize: "20%",
							backgroundColor: "var(--theme-elevation-50)",
						}}
					>
						<img
							src={rowData.thumbnailURL}
							alt="Thumbnail"
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
								objectPosition: "top",
							}}
						/>
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
