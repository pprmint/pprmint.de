import { SiGithub, SiKofi, SiTwitter, SiYoutube } from "@icons-pack/react-simple-icons";
import { Coffee, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "src/navigation";

export default function Copyright(props: { className?: string }) {
	const t = useTranslations("NAVIGATION");
	return (
		<div className={`flex flex-row ${props.className}`}>
			<div className="text-neutral text-xs">
				<p className="leading-4">
					{t("madeWith")}
					<Heart size={12} strokeWidth={2.5} className="inline stroke-red mx-0.5" />
					{t("and")}
					<Link
						href="https://github.com/pprmint/pprmint.art/blob/main/package.json"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Coffee size={12} strokeWidth={2.5} className="inline stroke-yellow mx-0.5" />
					</Link>
					<br />
					{"© "}
					{new Date().getFullYear()} pprmint.
				</p>
			</div>
			<div className="flex text-neutral-50 md:text-xl ml-auto">
				<Link
					href="https://twitter.com/npprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="size-9 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-100 active:duration-50 active:opacity-75 active:shadow-inner"
				>
					<SiTwitter size={16} />
				</Link>
				<Link
					href="https://youtube.com/@pprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="size-9 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-100 active:duration-50 active:opacity-75 active:shadow-inner"
				>
					<SiYoutube size={16} />
				</Link>
				<Link
					href="https://github.com/pprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="size-9 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-100 active:duration-50 active:opacity-75 active:shadow-inner"
				>
					<SiGithub size={16} />
				</Link>
				<Link
					href="https://ko-fi.com/pprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="size-9 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-100 active:duration-50 active:opacity-75 active:shadow-inner"
				>
					<SiKofi size={16} />
				</Link>
			</div>
		</div>
	);
}
