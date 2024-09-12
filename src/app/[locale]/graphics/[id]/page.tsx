import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";
import VideoPlayer from "src/components/ui/VideoPlayer";
import Work from "src/types/work";

export default async function Page({ params }: { params: { id: string } }) {
	const Work: Work = await getWork(params.id);
	return (
		<>
			<div className="absolute top-0 inset-x-0 -z-10 overflow-hidden h-96">
				<FadingImage
					src={`https://static.pprmint.de${Work.data.attributes.cover.data.attributes.formats.thumbnail.url}`}
					alt={Work.data.attributes.title}
					fill
					className={`object-cover ${Work.data.attributes.coverFocus} h-full min-w-full contrast-[0.87] blur-lg`}
				/>
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24"><path d="M0 10V0h10a2 2 0 0 0 4 0h10v10a2 2 0 0 0 0 4v10H14a2 2 0 0 0-4 0H0V14a2 2 0 0 0 0-4Z" style="fill:%23111"/></svg>')`,
						backgroundRepeat: "repeat",
						backgroundPosition: "top",
					}}
				/>
				<div className="bg-gradient-to-t from-neutral-950 to-neutral-950/50 absolute inset-0" />
			</div>
			<Title
				title={Work.data.attributes.title}
				description={
					!!Object.hasOwn ? (
						<div className="prose-a:text-link-external">
							<Markdown remarkPlugins={[remarkGfm]}>{Work.data.attributes.text}</Markdown>
						</div>
					) : (
						Work.data.attributes.text
					)
				}
				noDelay
			/>
			<main className="max-w-7xl mx-auto">
				{Work.data.attributes.gallery.data.map((media) =>
					media.attributes.mime.startsWith("image") ? (
						<FadingImage
							key={media.id.toString()}
							src={`https://static.pprmint.de${media.attributes.url}`}
							alt={media.attributes.alternativeText}
							width={media.attributes.width}
							height={media.attributes.height}
							quality={100}
							className="w-full h-auto animate-skeleton-pulse"
						/>
					) : (
						media.attributes.mime.startsWith("video") && (
							<video
								controls
								key={media.id.toString()}
								className="w-full h-auto"
								src={`https://static.pprmint.de${media.attributes.url}`}
							/>
						)
					)
				)}
			</main>
		</>
	);
}

async function getWork(id: string) {
	const res = await fetch(`${process.env.STRAPI_API_URL}/works/${id}?populate=*`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
		},
		next: { revalidate: 0 },
	});
	if (!res.ok) {
		throw new Error("Failed to fetch works.");
	}
	return res.json();
}
