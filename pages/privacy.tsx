import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";

import Head from "components/Head";
import Title from "components/Title";

export default function PrivacyPolicy() {
	const { t } = useTranslation();
	return (
		<>
			<Head
				title={t("PRIVACY:Head.title")}
				description={t("PRIVACY:Head.description")}
			/>
			<Title
				title={t("PRIVACY:Head.title")}
				description={t("PRIVACY:Head.description")}
			/>
			<main className="max-w-7xl mx-auto px-6 md:px-9">
				<section className="my-12">
					<div className="bg-neutral-900 rounded-xl p-6">
						<h2 className="font-display font-semibold text-neutral-50 text-3xl md:text-4xl pb-3">
							{t("PRIVACY:Content.Tldr.heading")}
						</h2>
						<p>{t("PRIVACY:Content.Tldr.text")}</p>
					</div>
				</section>
				<section className="my-12">
					<h2 className="font-display font-semibold text-neutral-50 text-3xl md:text-4xl pb-3">
						{t("PRIVACY:Content.General.heading")}
					</h2>
					<p>
						{t("PRIVACY:Content.General.text1")}
						<br />
						{t("PRIVACY:Content.General.text2")}
						<br />
						<Link
							href=""
							className="font-medium text-blue underline decoration-dotted hover:decoration-solid decoration-blue-800 hover:decoration-blue duration-100"
							scroll={false}
						>
							<Trans
								i18nKey="PRIVACY:Content.General.example"
								components={{
									strong: <strong />,
								}}
							/>
							<i className="ri-arrow-right-up-line" />
						</Link>
					</p>
				</section>

				<section className="my-12">
					<h2 className="font-display font-semibold text-neutral-50 text-3xl md:text-4xl pb-3">
						{t("PRIVACY:Content.Hosting.heading")}
					</h2>
					<p>{t("PRIVACY:Content.Hosting.text1")}</p>
					<p>
						<Trans
							i18nKey="PRIVACY:Content.Hosting.text2"
							components={{
								strong: <strong />,
							}}
						/>
					</p>
					<p>
						<Trans
							i18nKey="PRIVACY:Content.Hosting.text3"
							components={{
								strong: <strong />,
							}}
						/>
					</p>
					<p>{t("PRIVACY:Content.Hosting.text4")}</p>
					<div className="pl-6 pb-4">
						<p>
							<Trans
								i18nKey="PRIVACY:Content.Hosting.Log.domain"
								components={{
									strong: <strong />,
								}}
							/>
						</p>
						<p>
							<Trans
								i18nKey="PRIVACY:Content.Hosting.Log.ipAddress"
								components={{
									strong: <strong />,
								}}
							/>
						</p>
						<p>
							<Trans
								i18nKey="PRIVACY:Content.Hosting.Log.accessTime"
								components={{
									strong: <strong />,
								}}
							/>
						</p>
						<p>
							<Trans
								i18nKey="PRIVACY:Content.Hosting.Log.receivedFile"
								components={{
									strong: <strong />,
								}}
							/>
						</p>
						<p>
							<Trans
								i18nKey="PRIVACY:Content.Hosting.Log.httpCode"
								components={{
									strong: <strong />,
								}}
							/>
							<br />
							<Link
								className="font-medium text-blue underline decoration-dotted decoration-2 decoration-blue-800 hover:decoration-blue"
								href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"
								target="_blank"
								rel="noopener noreferrer"
							>
								HTTP response status codes - HTTP | MDN
								<i className="ri-arrow-right-up-line" />
							</Link>
						</p>
						<p>
							<Trans
								i18nKey="PRIVACY:Content.Hosting.Log.userAgent"
								components={{
									strong: <strong />,
								}}
							/>
							<br />
							<Link
								className="font-medium text-blue underline decoration-dotted decoration-2 decoration-blue-800 hover:decoration-blue"
								href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent"
								target="_blank"
								rel="noopener noreferrer"
							>
								User-Agent - HTTP | MDN
								<i className="ri-arrow-right-up-line" />
							</Link>
						</p>
					</div>
					<p>
						{t("PRIVACY:Content.Hosting.text5")}
						<br />
					</p>
					<p>
						{t("PRIVACY:Content.Hosting.text6")}
						<br />
					</p>
					<p>
						<Link
							className="font-medium text-blue underline decoration-dotted decoration-2 decoration-blue-800 hover:decoration-blue"
							href="https://vercel.com/legal/privacy-policy"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("PRIVACY:Content.privacyPolicyOf", {
								provider: "Vercel",
							})}
							<i className="ri-arrow-right-up-line" />
						</Link>
					</p>
					<p>
						<Link
							className="font-medium text-blue underline decoration-dotted decoration-2 decoration-blue-800 hover:decoration-blue"
							href="https://vercel.com/legal/dpa"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("PRIVACY:Content.dpaOf", {
								provider: "Vercel",
							})}
							<i className="ri-arrow-right-up-line" />
						</Link>
					</p>
					<p>
						<Link
							className="font-medium text-blue underline decoration-dotted decoration-2 decoration-blue-800 hover:decoration-blue"
							href="https://www.hetzner.com/legal/privacy-policy"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("PRIVACY:Content.privacyPolicyOf", {
								provider: "Hetzner",
							})}
							<i className="ri-arrow-right-up-line" />
						</Link>
					</p>
				</section>
				<section className="my-12">
					<h2 className="font-display font-semibold text-neutral-50 text-3xl md:text-4xl pb-3">
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
						{t("PRIVACY:Content.Contact.text2")}{" "}
						<Trans
							i18nKey="PRIVACY:Content.Contact.text3"
							components={{
								strong: <strong />,
							}}
						/>
					</p>
					<p>
						<Link
							className="font-medium text-blue underline decoration-dotted decoration-2 decoration-blue-800 hover:decoration-blue"
							href="https://www.fastmail.com/about/privacy/"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t("PRIVACY:Content.privacyPolicyOf", { provider: "Fastmail" })}
							<i className="ri-arrow-right-up-line" />
						</Link>
					</p>
				</section>
			</main>
		</>
	);
}
