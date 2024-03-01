import FadingImage from "src/components/ui/FadingImage";
import MinaArtwork, { MinaArtworks } from "src/types/mina-artwork";

export default async function Gallery(artworks: { artworks: MinaArtworks }) {
	return (
		<section className="max-w-7xl mx-auto px-2">
			<div className="mb-10 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{artworks.artworks.data.map((art: MinaArtwork, index: number) => (
					<button
						key={art.id}
						className="relative group overflow-hidden rounded-lg hover:contrast-[80%] active:contrast-100 hover:scale-[102%] active:scale-100 duration-200 active:duration-75 hover:shadow-xl hover:z-10 cursor-pointer aspect-square"
					>
						<FadingImage
							src={`https://static.pprmint.art${art.attributes.artwork.data.attributes.url}`}
							width={art.attributes.artwork.data.attributes.width}
							height={art.attributes.artwork.data.attributes.height}
							alt=""
							className={`h-full min-w-full object-cover ${art.attributes.focus} bg-neutral-900 ${
								art.attributes.nsfw && "blur-lg group-hover:blur-none opacity-50 group-hover:opacity-100 duration-200"
							}`}
						/>
						{art.attributes.nsfw && (
							<i className="text-neutral-50/75 ri-eye-off-line absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl group-hover:opacity-0 duration-200" />
						)}
					</button>
				))}
			</div>
		</section>
	);
}
