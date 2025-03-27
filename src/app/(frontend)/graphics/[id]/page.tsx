import { getTranslations } from "next-intl/server";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Title from "@/components/layout/Title";
import FadingImage from "@/components/ui/FadingImage";
import { getUserLocale } from "@/i18n/locale";
import Work from "@/types/work";

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata(props: Props) {
	const params = await props.params;
	const { id } = params;
	const locale = await getUserLocale();
	const Work: Work = await getWork(id, locale);
	const t = await getTranslations("GRAPHICS");
	return Work.data !== null
		? {
				title: Work.data.title,
				description: Work.data.text,
		  }
		: {
				title: t("Error.title"),
				description: t("Error.description"),
		  };
}

export default async function Page(props: Props) {
	const params = await props.params;
	const locale = await getUserLocale();
	const { id } = params;

	const Work: Work = await getWork(id, locale);
	return (
		<>
			<div className="absolute top-0 inset-x-0 -z-10 overflow-hidden h-96">
				<FadingImage
					src={`https://static.pprmint.de${Work.data.cover.formats.thumbnail.url}`}
					alt={Work.data.title}
					fill
					className={`object-cover ${Work.data.coverFocus} h-full min-w-full contrast-[0.87] blur-lg`}
				/>
				<div className="bg-gradient-to-t from-white dark:from-neutral-950 to-white/75 dark:to-neutral-950/75 absolute inset-0" />
				<div
					className="absolute inset-0 invert brightness-0 dark:invert-0 dark:brightness-100"
					style={{
						backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24"><path d="M0 10V0h10a2 2 0 0 0 4 0h10v10a2 2 0 0 0 0 4v10H14a2 2 0 0 0-4 0H0V14a2 2 0 0 0 0-4Z" style="fill:%23111"/></svg>')`,
						backgroundRepeat: "repeat",
						backgroundPosition: "top",
					}}
				/>
			</div>
			<Title
				title={Work.data.title}
				description={
					!!Object.hasOwn ? (
						<div className="prose-a:text-link-external">
							<Markdown remarkPlugins={[remarkGfm]}>{Work.data.text}</Markdown>
						</div>
					) : (
						Work.data.text
					)
				}
			/>
			<main className="w-full max-w-8xl px-6 md:px-9 lg:px-12 xl:px-20 mx-auto">
				{Work.data.gallery.map((media) =>
					media.mime.startsWith("image") ? (
						<div key={media.id.toString()} className="relative w-full min-h-12">
							<FadingImage
								src={`https://static.pprmint.de${media.url}`}
								alt={media.alternativeText || ""}
								width={media.width}
								height={media.height}
								quality={100}
								className="w-full h-auto"
							/>
						</div>
					) : (
						media.mime.startsWith("video") && (
							<video controls key={media.id.toString()} className="w-full h-auto" src={`https://static.pprmint.de${media.url}`} />
						)
					)
				)}
			</main>
		</>
	);
}

async function getWork(id: string, locale: string) {
	const res = await fetch(`${process.env.STRAPI_API_URL}/works/${id}?locale=${locale}&populate=*`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer ${process.env.STRAPI_API_KEY}`,
		},
		next: { revalidate: 0 },
	});
	if (!res.ok) {
		throw new Error("Failed to fetch work.");
	}
	return res.json();
}
