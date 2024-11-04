import Link from "next/link";

import Title from "src/components/layout/Title";
import { getLocale, getTranslations } from "next-intl/server";
import ExternalLink from "src/icons/ExternalLink";

export async function generateMetadata() {
	const t = await getTranslations("PRIVACY");
	return {
		title: t("Head.title"),
		description: t("Head.description"),
	};
}

export default async function Page() {
	const t = await getTranslations("PRIVACY");
	const locale = await getLocale();
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")} />
			<main className="max-w-7xl mx-auto px-6 md:px-9">
				<section className="my-20 md:my-32 xl:my-40">
					<div className="bg-elevate border border-neutral-900 rounded-xl p-6">
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
							className="text-link-external inline-flex gap-1 items-center"
							href="https://www.fastmail.com/about/privacy/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("Content.privacyPolicyOf", { provider: "Fastmail" })}
							<ExternalLink />
						</Link>
						<Link
							className="text-link-external inline-flex gap-1 items-center"
							href="https://www.fastmail.com/about/dpa/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("Content.dpaOf", { provider: "Fastmail" })}
							<ExternalLink />
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
							className="text-link-external inline-flex gap-1 items-center"
							href="https://vercel.com/legal/privacy-policy"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("Content.privacyPolicyOf", { provider: "Vercel" })}
							<ExternalLink />
						</Link>
						<Link
							className="text-link-external inline-flex gap-1 items-center"
							href="https://vercel.com/legal/dpa"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("Content.dpaOf", { provider: "Vercel" })}
							<ExternalLink />
						</Link>
						<Link
							className="text-link-external inline-flex gap-1 items-center"
							href={`https://contabo.com/${locale}/legal/privacy/`}
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("Content.privacyPolicyOf", {
								provider: "Contabo",
							})}
							<ExternalLink />
						</Link>
						<Link
							className="text-link-external inline-flex gap-1 items-center"
							href="https://www.cloudflare.com/privacypolicy/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("Content.privacyPolicyOf", {
								provider: "Cloudflare",
							})}
							<ExternalLink />
						</Link>
						<Link
							className="text-link-external inline-flex gap-1 items-center"
							href="https://www.cloudflare.com/cloudflare-customer-dpa/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("Content.dpaOf", {
								provider: "Cloudflare",
							})}
							<ExternalLink />
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
