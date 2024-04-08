"use client";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "src/navigation";
import Image from "next/image";
import MinaWhat from "public/assets/mina/minawhat.png";
import Button from "src/components/ui/Button";

export default function OutOfBounds() {
    const t = useTranslations("MINA");
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    function ClipBackInBounds() {
        console.log("] noclip");
        console.log("noclip OFF");
        const params = new URLSearchParams(searchParams);
        params.delete("p");
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    console.info(
        "You clipped out of bounds.\nIn other words: The page you were aiming for in the URL is out of the range of available pages.\nJust stick to the pages you can see below the gallery grid."
    );
    return (
        <div className="flex flex-col gap-3 items-center z-10 my-20 md:my-32 xl:my-40">
            <Image src={MinaWhat} alt="" className="size-28" />
            <h3>{t("Content.Artworks.outOfBounds")}</h3>
            <Button outlined onClick={ClipBackInBounds}>
                {t("Content.Artworks.clipBackIn")}
            </Button>
        </div>
    );
}
