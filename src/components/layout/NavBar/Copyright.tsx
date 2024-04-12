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
					className="size-9 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-100 active:duration-75 active:opacity-75 active:scale-95"
				>
					<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-neutral-50 size-4">
						<path d="M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148 13.98 13.98 0 0 0 11.82 8.292a4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z" />
					</svg>
				</Link>
				<Link
					href="https://youtube.com/@pprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="size-9 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-100 active:duration-75 active:opacity-75 active:scale-95"
				>
					<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-neutral-50 size-4">
						<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
					</svg>
				</Link>
				<Link
					href="https://github.com/pprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="size-9 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-100 active:duration-75 active:opacity-75 active:scale-95"
				>
					<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-neutral-50 size-4">
						<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
					</svg>
				</Link>
				<Link
					href="https://ko-fi.com/pprmint"
					target="_blank"
					rel="noopener noreferrer"
					className="size-9 flex items-center justify-center rounded-full hover:bg-neutral-50/10 duration-100 active:duration-75 active:opacity-75 active:scale-95"
				>
					<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-neutral-50 size-4">
						<path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" />
					</svg>
				</Link>
			</div>
		</div>
	);
}
