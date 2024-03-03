import { useTranslations } from "next-intl";
import { Link } from "src/navigation";

export default function Copyright(props: { className?: string }) {
	const t = useTranslations("NAVIGATION");
	return (
		<div className={`flex flex-row ${props.className}`}>
			<div className="text-neutral text-xs">
				<p className="leading-4">
					{t("madeWith")}
					<i className="ri-heart-line mx-1 text-red" />
					{t("and")}
					<Link
						href="https://github.com/pprmint/pprmint.art/blob/main/package.json"
						target="_blank"
						rel="noopener noreferrer"
					>
						<i className="ri-cup-line mx-1 text-yellow" />
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
					className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-250 ease-out active:opacity-75 active:duration-75"
				>
					<i className="ri-twitter-line" />
				</Link>
				<Link
					href="https://youtube.com/@pprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-250 ease-out active:opacity-75 active:duration-75"
				>
					<i className="ri-youtube-line" />
				</Link>
				<Link
					href="https://github.com/pprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-250 ease-out active:opacity-75 active:duration-75"
				>
					<i className="ri-github-line" />
				</Link>
				<Link
					href="https://ko-fi.com/pprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-250 ease-out active:opacity-75 active:duration-75"
				>
					<i className="ri-cup-line" />
				</Link>
			</div>
		</div>
	);
}
