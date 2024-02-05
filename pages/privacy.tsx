import { useRouter } from "next/router";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";

import Head from "components/Head";
import Title from "components/Title";

export default function PrivacyPolicy() {
	const { t } = useTranslation();
	const { locale } = useRouter();
	return (
		<>
			<Head title={t("PRIVACY:Head.title")} description={t("PRIVACY:Head.description")} />
			<Title title={t("PRIVACY:Head.title")} description={t("PRIVACY:Head.description")} />
			<main className="max-w-7xl mx-auto px-6 md:px-9">
				<section className="my-20">
					<div className="bg-neutral-900 rounded-xl p-6">
						<h2>
							{t("PRIVACY:Content.Tldr.heading")}
						</h2>
						<p>
							<Trans
								i18nKey="PRIVACY:Content.Tldr.text1"
								components={{
									b: <b className="text-neutral-50" />,
								}}
							/>
						</p>
						<p>
							<Trans
								i18nKey="PRIVACY:Content.Tldr.text2"
								components={{
									b: <b className="text-neutral-50" />,
								}}
							/>
						</p>
						<p>
							<Trans
								i18nKey="PRIVACY:Content.Tldr.text3"
								components={{
									b: <b className="text-neutral-50" />,
								}}
							/>
						</p>
					</div>
				</section>
				<section className="my-20">
					<h2>
						{t("PRIVACY:Content.General.heading")}
					</h2>
					<p>{t("PRIVACY:Content.General.text1")}</p>
					<p>{t("PRIVACY:Content.General.text2")}</p>
					<p>{t("PRIVACY:Content.General.text3")}</p>
                    <p className="flex gap-6 flex-wrap">
						<Link
							className="text-link-external"
							href="https://www.fastmail.com/about/privacy/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("PRIVACY:Content.privacyPolicyOf", { provider: "Fastmail" })}
							<i className="ri-arrow-right-up-line" />
						</Link>
						<Link
							className="text-link-external"
							href="https://www.fastmail.com/about/dpa/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("PRIVACY:Content.dpaOf", { provider: "Fastmail" })}
							<i className="ri-arrow-right-up-line" />
						</Link>
					</p>
				</section>

				<section className="my-20">
					<h2>
						{t("PRIVACY:Content.Hosting.heading")}
					</h2>
					<p>{t("PRIVACY:Content.Hosting.text1")}</p>
					<p>{t("PRIVACY:Content.Hosting.text2")}</p>
					<p>{t("PRIVACY:Content.Hosting.text3")}</p>
					<p className="flex gap-6 flex-wrap">
						<Link
							className="text-link-external"
                            href={`https://contabo.com/${locale}/legal/privacy/`}
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("PRIVACY:Content.privacyPolicyOf", {
                                provider: "Contabo",
							})}
							<i className="ri-arrow-right-up-line" />
						</Link>
						<Link
							className="text-link-external"
                            href="https://www.cloudflare.com/privacypolicy/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("PRIVACY:Content.privacyPolicyOf", {
								provider: "Cloudflare",
							})}
							<i className="ri-arrow-right-up-line" />
						</Link>
						<Link
							className="text-link-external"
                            href="https://www.cloudflare.com/cloudflare-customer-dpa/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("PRIVACY:Content.dpaOf", {
								provider: "Cloudflare",
							})}
							<i className="ri-arrow-right-up-line" />
						</Link>
					</p>
				</section>

				<section className="my-20">
					<h2>
						{t("PRIVACY:Content.Contact.heading")}
					</h2>
					<p>
						<Trans
							i18nKey="PRIVACY:Content.Contact.text1"
							components={{
								strong: <strong />,
							}}
						/>
					</p>
					<p>
						{t("PRIVACY:Content.Contact.text2")}
					</p>
				</section>
			</main>
		</>
	);
}
