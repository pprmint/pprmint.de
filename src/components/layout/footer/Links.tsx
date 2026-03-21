import Bluesky from "@/icons/Bluesky";
import GitHub from "@/icons/GitHub";
import Kofi from "@/icons/Kofi";
import YouTube from "@/icons/YouTube";
import Link from "next/link";

export default function Links() {
  return [
    { href: "https://bsky.app/profile/pprmint.de", icon: <Bluesky /> },
    { href: "https://youtube.com/@pprmint", icon: <YouTube /> },
    { href: "https://github.com/pprmint", icon: <GitHub /> },
    { href: "https://ko-fi.com/pprmint", icon: <Kofi /> },
  ].map((link, index) => (
    <Link
      key={index}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="size-9 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 duration-100 active:duration-75 active:opacity-75"
    >
      {link.icon}
    </Link>
  ));
}
