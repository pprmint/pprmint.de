import { useTranslations } from "next-intl";
import FadingImage from "src/components/ui/FadingImage";
import Title from "src/components/layout/Title";

import TitleBackground1 from "public/assets/contact/chat_left.svg";
import TitleBackground2 from "public/assets/contact/chat_right.svg";
import PixelMina from "public/assets/mina64.gif";

import Letter from "public/assets/contact/letter.svg";
import Bubbles from "public/assets/contact/bubbles.svg";
import PaperPlane from "public/assets/contact/paperplane.svg";
import Image from "next/image";
import { Link } from "src/navigation";
import Button from "src/components/ui/Button";
import Chatbox from "./chatbox";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

type Props = {
    params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
	const t = await getTranslations({ locale, namespace: "CONTACT" });
	return {
		title: `${t("Head.title")} • pprmint.art`,
		description: t("Head.description"),
	};
}

export default function Page({ params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	const t = useTranslations("CONTACT");
	return (
		<>
			<Title title={t("Head.title")} description={t("Head.description")}>
				<FadingImage src={TitleBackground1} alt="" fill className="object-cover" />
				<FadingImage src={TitleBackground2} alt="" fill className="object-cover" />
			</Title>
			<main>
				<section className="max-w-7xl mx-auto my-24 px-6 md:px-9 flex flex-col items-center justify-center">
					<h2>{t("Content.Mina.heading")}</h2>
					<p className="pb-6">{t("Content.Mina.text")}</p>
					<Chatbox />
				</section>
				<section className="group relative w-full overflow-clip border-y border-y-neutral-900">
					<div className="max-w-7xl mx-auto py-12">
						<div className="max-w-xl lg:max-w-3xl px-6 md:px-9 py-9  h-full">
							<h2>
								{t("Content.Email.title")}
								<span className="text-green">.</span>
							</h2>
							<p className="pb-9">{t("Content.Email.text")}</p>
							<Link
								href={`mailto:mail@pprmint.art?subject=${t("Content.Message.subject")}&body=${t(
									"Content.Message.body"
								)}`}
							>
								<Button tabIndex={-1} color="green">
									mail@pprmint.art
								</Button>
							</Link>
						</div>
					</div>
					<Image
						src={Letter}
						alt=""
						className="absolute -z-10 w-1/2 md:w-1/3 h-auto bottom-0 md:top-1/2 md:-translate-y-1/2 right-0 xl:right-12 2xl:right-40 scale-90 group-hover:scale-100 opacity-25 group-hover:opacity-50 origin-bottom-right duration-500 ease-in-out"
					/>
				</section>
				<section className="group relative w-full overflow-clip border-b border-b-neutral-900">
					<div className="max-w-7xl mx-auto py-12">
						<div className="max-w-xl lg:max-w-3xl px-6 md:px-9 py-9 h-full">
							<h2>
								{t("Content.Telegram.title")}
								<span className="text-green">.</span>
							</h2>
							<p className="pb-9">{t("Content.Telegram.text")}</p>
							<div className="w-max">
								<Link href="https://t.me/npprmint" target="_blank" rel="noopener noreferrer">
									<Button tabIndex={-1} color="green">
										{t("Content.Telegram.button")}
									</Button>
								</Link>
							</div>
						</div>
					</div>
					<Image
						src={PaperPlane}
						alt=""
						className="absolute -z-10 w-1/2 md:w-1/4 h-auto bottom-0 md:top-1/2 md:-translate-y-1/2 right-0 xl:right-16 2xl:right-48 scale-90 group-hover:scale-100 opacity-25 group-hover:opacity-50 origin-bottom-right duration-500 ease-in-out"
					/>
				</section>
				<section className="group relative w-full overflow-clip border-b border-b-neutral-900">
					<div className="max-w-7xl mx-auto py-12">
						<div className="max-w-xl lg:max-w-3xl px-6 md:px-9 py-9 h-full">
							<h2>
								{t("Content.Twitter.title")}
								<span className="text-green">.</span>
							</h2>
							<p className="pb-9">{t("Content.Twitter.text")}</p>
							<div className="w-max">
								<Link
									href="https://twitter.com/messages/compose?recipient_id=1571518236394397699"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Button tabIndex={-1} color="green">
										{t("Content.Twitter.button")}
									</Button>
								</Link>
							</div>
						</div>
					</div>
					<Image
						src={Bubbles}
						alt=""
						className="absolute -z-10 w-1/2 md:w-1/4 h-auto bottom-0 md:top-1/2 md:-translate-y-1/2 right-0 xl:right-16 2xl:right-48 scale-90 group-hover:scale-100 opacity-25 group-hover:opacity-50 origin-bottom-right duration-500 ease-in-out"
					/>
				</section>
			</main>
		</>
	);
}
