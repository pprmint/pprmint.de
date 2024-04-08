import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

import Title from "src/components/layout/Title";
import FadingImage from "src/components/ui/FadingImage";

import Ref from "./ref";

import HeroMina from "public/assets/mina/hero.webp";
import Stickers from "public/assets/mina/stickers.svg";
import StickerSeyana from "public/assets/mina/sticker_seyana.webp";
import StickerStare from "public/assets/mina/sticker_stare.webp";
import StickerWhat from "public/assets/mina/sticker_what.webp";
import StickerYippie from "public/assets/mina/sticker_yippie.webp";

import { Link } from "src/navigation";
import Button from "src/components/ui/Button";
import { BookCheck, Download } from "lucide-react";
import GallerySuspense from "./gallery/gallerySuspense";
import { useTranslations } from "next-intl";
import GallerySkeleton from "./gallery/gallerySkeleton";
import FanartRules from "./rules";

type Props = {
    params: { locale: string };
    searchParams?: {
        p?: string;
        nsfw?: string;
        artist?: string;
    };
};

export async function generateMetadata({ params: { locale } }: Props) {
    const t = await getTranslations({ locale, namespace: "MINA" });
    return {
        title: t("Head.title"),
        description: t("Head.description"),
    };
}

export default function Page({ searchParams, params: { locale } }: Props) {
    unstable_setRequestLocale(locale);
    const t = useTranslations("MINA");
    const currentPage = Number(searchParams?.p) || 1;
    const nsfw = String(searchParams?.nsfw) || "hide";
    const artist = String(searchParams?.artist) || "undefined";
    return (
        <>
            <Title title={t("Head.title")} description={t("Head.description")}>
                <FadingImage
                    src={HeroMina}
                    alt=""
                    fill
                    className="object-cover"
                    quality={90}
                />
            </Title>
            <main>
                <section
                    id="lore"
                    className="my-20 md:my-32 xl:my-40 max-w-7xl mx-auto px-6 md:px-9"
                >
                    <h2>
                        {t("Content.About.heading")}
                        <span className="text-green">.</span>
                    </h2>
                    <p>{t("Content.About.text1")}</p>
                    <p>{t("Content.About.text2")}</p>
                    <p>{t("Content.About.text3")}</p>
                    <p>{t("Content.About.text4")}</p>
                    <p>{t("Content.About.text5")}</p>
                    <p>
                        {t.rich("Content.About.text6", {
                            Link: (chunks) => (
                                <Link
                                    href="https://twitter.com/wxsonz"
                                    className="text-link-external"
                                >
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </p>
                </section>
                <section
                    id="design"
                    className="my-20 md:my-32 xl:my-40 max-w-7xl mx-auto px-3 xl:px-9"
                >
                    <Ref />
                    <div className="flex flex-col lg:flex-row lg:justify-between gap-6 mt-6 px-3 md:px-6 xl:px-0">
                        <p>
                            {t.rich("Content.Reference.credit", {
                                Link: (chunks) => (
                                    <Link
                                        href="https://twitter.com/neko__draws"
                                        className="text-link-external"
                                    >
                                        {chunks}
                                    </Link>
                                ),
                            })}
                        </p>
                        <div className="flex flex-col lg:items-end">
                            <p className="mb-3">
                                {t("Content.Reference.Download.text")}
                            </p>
                            <Link
                                href="https://static.pprmint.art/download/Mina/Mina_ref_sheet_(by_nekomimi).png"
                                target="_blank"
                                download
                            >
                                <Button tabIndex={-1}>
                                    <Download size={16} />
                                    {t("Content.Reference.Download.button")}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
                <FanartRules />
                <section
                    id="gallery"
                    className="my-20 md:my-28 xl:my-32 max-w-7xl mx-auto px-3 xl:px-9"
                >
                    <Suspense fallback={<GallerySkeleton />}>
                        <GallerySuspense
                            p={currentPage}
                            artist={artist}
                            nsfw={nsfw}
                        />
                    </Suspense>
                </section>
                <section className="relative flex items-end justify-center overflow-clip my-20 md:my-32 xl:my-40 max-w-screen-3xl mx-auto px-6 md:px-9 min-h-[500px]">
                    <div className="absolute inset-0 -z-10 overflow-clip">
                        <FadingImage
                            src={Stickers}
                            alt="Discord sticker menu, showing a few Mina stickers."
                            className="absolute w-4/5 md:w-1/2 xl:w-1/3 h-auto top-0 left-1/2 -translate-x-1/2"
                        />
                        <FadingImage
                            src={StickerSeyana}
                            alt=""
                            className="hidden md:block absolute w-2/12 max-w-72 h-auto top-[30%] left-[4%] rotate-3"
                        />
                        <FadingImage
                            src={StickerWhat}
                            alt=""
                            className="hidden md:block absolute w-2/12 max-w-72 h-auto top-[6%] left-[12%] xl:left-[18%] -rotate-6"
                        />
                        <FadingImage
                            src={StickerStare}
                            alt=""
                            className="hidden md:block absolute w-2/12 max-w-72 h-auto top-[8%] right-[12%] xl:right-[18%] rotate-6"
                        />
                        <FadingImage
                            src={StickerYippie}
                            alt=""
                            className="hidden md:block absolute w-2/12 max-w-72 h-auto top-[25%] right-[4%] -rotate-3"
                        />
                        <div
                            style={{
                                maskImage:
                                    "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 80%, rgba(0,0,0,1) 100%)",
                                maskRepeat: "space",
                                backgroundRepeat: "repeat",
                            }}
                            className="absolute inset-0 bottom-0 h-full backdrop-blur-md pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950" />
                    </div>
                    <div className="flex items-center flex-col pt-96 pb-12 text-center text-balance drop-shadow-[0px_2px_8px_#111]">
                        <h2>
                            {t("Content.Discord.heading")}
                            <span className="text-green">.</span>
                        </h2>
                        <p className="pb-6">{t("Content.Discord.text")}</p>
                        <Link
                            href="https://discord.gg/nTbPhkvrXp"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button color="green">
                                <svg
                                    role="img"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="fill-current size-4"
                                >
                                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                                </svg>
                                {t("Content.Discord.button")}
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
