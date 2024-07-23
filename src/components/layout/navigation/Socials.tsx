import { useTranslations } from "next-intl";
import GitHub from "src/icons/GitHub";
import Heart from "src/icons/Heart";
import HotCup from "src/icons/HotCup";
import Kofi from "src/icons/Kofi";
import Twitter from "src/icons/Twitter";
import YouTube from "src/icons/YouTube";
import { Link } from "src/navigation";

export default function Copyright(props: { className?: string }) {
	const t = useTranslations("NAVIGATION");
	return (
		<div className={`flex flex-row ${props.className}`}>
			<div className="text-neutral text-sm">
				<p className="leading-4">
					{t("madeWith")}
					<Heart className="inline fill-red mx-0.5" />
					{t("and")}
					<Link
						href="https://github.com/pprmint/pprmint.de/blob/main/package.json"
						target="_blank"
						rel="noopener noreferrer"
					>
						<HotCup className="inline fill-yellow mx-0.5" />
					</Link>
				</p>
			</div>
			<div className="flex text-neutral-50 md:text-xl ml-auto">
				<Link
					href="https://twitter.com/npprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="size-9 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-100 active:duration-75 active:opacity-75 active:scale-95"
				>
					<Twitter />
				</Link>
				<Link
					href="https://youtube.com/@pprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="size-9 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-100 active:duration-75 active:opacity-75 active:scale-95"
				>
					<YouTube />
				</Link>
				<Link
					href="https://github.com/pprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="size-9 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-100 active:duration-75 active:opacity-75 active:scale-95"
				>
					<GitHub />
				</Link>
				<Link
					href="https://ko-fi.com/pprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="size-9 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-100 active:duration-75 active:opacity-75 active:scale-95"
				>
					<Kofi />
				</Link>
			</div>
		</div>
	);
}
