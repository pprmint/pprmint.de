import { Artists } from "src/types/artist";
import { MinaArtworks } from "src/types/mina-artwork";
import Filters from "../filters/filters";
import Gallery from "./gallery";
import Pagination from "src/components/gallery/Pagination";
import OutOfBounds from "src/components/gallery/OutOfBounds";

export default async function GallerySuspense({
    p,
    nsfw,
    artist,
}: {
    p: number;
    nsfw: string;
    artist: string;
}) {
    const Artists: Artists = await getArtists();
    const Artworks: MinaArtworks = await getArtworks(p, nsfw, artist, Artists);
    return (
        <>
            <Filters nsfw={nsfw} artist={artist} artists={Artists} />
            {Artworks.data.length == 0 ? (
                <OutOfBounds />
            ) : (
                <Gallery artworks={Artworks} />
            )}
            <Pagination page={p} pageCount={Artworks.meta.pagination.pageCount} />
        </>
    );
}

async function getArtworks(
    page: number,
    nsfw: string,
    artist: string,
    artists: Artists
) {
    let nsfwFilter = "";
    let artistFilter = "";

    if (nsfw !== "show") {
        nsfwFilter = `filters[nsfw][$ne]=true&`;
    }

    if (artists.data.find((a) => a.attributes.name === artist)) {
        artistFilter = `filters[artist][name][$eq]=${artist}&`;
    }

    const res = await fetch(
        `${process.env.STRAPI_API_URL}/mina-artworks?pagination[page]=${Number(
            page
        )}&pagination[pageSize]=20&${nsfwFilter}${artistFilter}populate=artwork&populate=artist&sort=creationDate:desc`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
            },
            next: { revalidate: 60 },
        }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch artworks.");
    }
    return res.json();
}

async function getArtists() {
    const res = await fetch(`${process.env.STRAPI_API_URL}/artists`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
        },
        next: { revalidate: 60 },
    });
    if (!res.ok) {
        throw new Error("Failed to fetch artists.");
    }
    return res.json();
}
