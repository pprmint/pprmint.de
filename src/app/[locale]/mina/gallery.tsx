import Pagination from "src/components/Pagination";
import { MinaArtworks } from "src/types/mina-artwork";

export default async function Gallery(artworks: { artworks: MinaArtworks }) {
	return (
		<section>
			<div className="flex gap-3">
				{artworks.artworks.data.map((artwork) => (
					<p key={artwork.id}>{artwork.attributes.artist}</p>
				))}
			</div>
			<Pagination
				page={artworks.artworks.meta.pagination.page}
				pageCount={artworks.artworks.meta.pagination.pageCount}
			/>
		</section>
	);
}
