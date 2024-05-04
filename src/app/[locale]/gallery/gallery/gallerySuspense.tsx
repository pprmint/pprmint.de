import { Works } from "src/types/work";
import Filters from "../filters";
import Pagination from "src/components/gallery/Pagination";
import OutOfBounds from "src/components/gallery/OutOfBounds";
import Gallery from "./gallery";

export default async function GallerySuspense({
    locale,
    p,
    dimension,
    type,
}: {
    locale: string;
    p: number;
    dimension: string;
    type: string;
}) {
    const Works: Works = await getWorks(locale, p, dimension, type);
    return (
        <>
            <Filters type={type} dimension={dimension} />
            {Works.data.length == 0 ? (
                <OutOfBounds />
            ) : (
                <Gallery works={Works} />
            )}
            <Pagination page={p} pageCount={Works.meta.pagination.pageCount} />
        </>
    );
}

async function getWorks(
    locale: string,
    page: number,
    dimension: string,
    type: string
) {
    let dimensionFilter = "";
    let typeFilter = "";

    if (dimension && (dimension === "2d" || dimension === "3d")) {
        dimensionFilter = `filters[dimension][$eq]=${
            dimension === "2d" ? "twodee" : "threedee"
        }&`;
    }

    if (type && (type === "static" || type === "animated")) {
        typeFilter = `filters[type][$eq]=${type}&`;
    }

    const res = await fetch(
        `${
            process.env.STRAPI_API_URL
        }/works?locale=${locale}&pagination[page]=${Number(
            page
        )}&pagination[pageSize]=20&${dimensionFilter}${typeFilter}populate=*&sort=creationDate:desc`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
            },
            next: { revalidate: 0 },
        }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch works.");
    }
    return res.json();
}
