import Tooltip from "@/components/ui/Tooltip";
import Bluesky from "@/icons/Bluesky";
import Codeberg from "@/icons/Codeberg";
import GitHub from "@/icons/GitHub";
import Kofi from "@/icons/Kofi";
import TwitterButWorse from "@/icons/TwitterButWorse";
import YouTube from "@/icons/YouTube";
import Link from "next/link";

export default function Links() {
	return [
		{ name: "Bluesky", href: "https://bsky.app/profile/pprmint.de", icon: <Bluesky /> },
		{ name: "icks", href: "https://x.com/npprmint", icon: <TwitterButWorse /> },
		{ name: "YouTube", href: "https://youtube.com/@pprmint", icon: <YouTube /> },
		{ name: "Codeberg", href: "https://codeberg.org/pprmint", icon: <Codeberg /> },
		{ name: "GitHub", href: "https://github.com/pprmint", icon: <GitHub /> },
		{ name: "Ko-fi", href: "https://ko-fi.com/pprmint", icon: <Kofi /> },
	].map((link, index) => (
		<Tooltip key={index} text={link.name}>
			<Link
				href={link.href}
				target="_blank"
				rel="noopener noreferrer"
				className="p-2 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 duration-100 active:duration-75 active:opacity-75"
			>
				{link.icon}
			</Link>
		</Tooltip>
	));
}
