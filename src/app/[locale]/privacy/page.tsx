import { Link } from "src/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

import Title from "src/components/layout/Title";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "PRIVACY" });
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default function Page({ params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const t = useTranslations("PRIVACY");
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")} />
			<main className="max-w-7xl mx-auto px-6 md:px-9">
				<section className="my-20 md:my-32 xl:my-40">
					<div className="bg-neutral-900 rounded-xl p-6">
						<h2>{t("Content.Tldr.heading")}</h2>
						<p>
							{t.rich("Content.Tldr.text1", {
								b: (chunks) => <b className="text-neutral-50">{chunks}</b>,
							})}
						</p>
						<p>
							{t.rich("Content.Tldr.text2", {
								b: (chunks) => <b className="text-neutral-50">{chunks}</b>,
							})}
						</p>
						<p>
							{t.rich("Content.Tldr.text3", {
								b: (chunks) => <b className="text-neutral-50">{chunks}</b>,
							})}
						</p>
					</div>
				</section>
				<section className="my-20 md:my-32 xl:my-40">
					<h2>{t("Content.General.heading")}</h2>
					<p>{t("Content.General.text1")}</p>
					<p>{t("Content.General.text2")}</p>
					<p>{t("Content.General.text3")}</p>
					<p className="flex gap-6 flex-wrap">
						<Link
							className="text-link-external"
							href="https://www.fastmail.com/about/privacy/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("Content.privacyPolicyOf", { provider: "Fastmail" })}
						</Link>
						<Link
							className="text-link-external"
							href="https://www.fastmail.com/about/dpa/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("Content.dpaOf", { provider: "Fastmail" })}
						</Link>
					</p>
				</section>

				<section className="my-20 md:my-32 xl:my-40">
					<h2>{t("Content.Hosting.heading")}</h2>
					<p>{t("Content.Hosting.text1")}</p>
					<p>{t("Content.Hosting.text2")}</p>
					<p>{t("Content.Hosting.text3")}</p>
					<p className="flex gap-6 flex-wrap">
						<Link
							className="text-link-external"
							href={`https://contabo.com/${locale}/legal/privacy/`}
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("Content.privacyPolicyOf", {
								provider: "Contabo",
							})}
						</Link>
						<Link
							className="text-link-external"
							href="https://www.cloudflare.com/privacypolicy/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("Content.privacyPolicyOf", {
								provider: "Cloudflare",
							})}
						</Link>
						<Link
							className="text-link-external"
							href="https://www.cloudflare.com/cloudflare-customer-dpa/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("Content.dpaOf", {
								provider: "Cloudflare",
							})}
						</Link>
					</p>
				</section>

				<section className="my-20 md:my-32 xl:my-40">
					<h2>{t("Content.Contact.heading")}</h2>
					<p>
						{t.rich("Content.Contact.text1", {
							strong: (chunks) => <strong>{chunks}</strong>,
						})}
					</p>
					<p>{t("Content.Contact.text2")}</p>
				</section>
			</main>
		</>
	);
}
