import { Link } from "src/navigation";
import Image from "next/image";

import DesktopNavigation from "./navigation/Desktop";
import MobileNavigation from "./navigation/Mobile";

import Wordmark from "public/assets/wordmark.svg";

export default function NavBar() {
	return (
		<div className={`z-90 fixed w-full h-16 flex items-start duration-300`}>
			<div
				style={{
					maskImage: "linear-gradient(rgba(0,0,0,1) 0%, rgba(0,0,0,.4) 50%, rgba(0,0,0,0) 100%)",
					maskRepeat: "space",
					backgroundRepeat: "repeat",
				}}
				className="fixed z-70 inset-x-0 top-0 h-32 bg-neutral-950/75 backdrop-blur-md pointer-events-none"
			/>
			<Link href="/" className="z-80 pl-6 md:pl-9 my-auto mr-auto drop-shadow-[0px_2px_12px_#1118]">
				<Image src={Wordmark} alt="pprmint. logo" className="h-auto w-[155px] mt-1" />
			</Link>
			<div className="hidden z-80 md:flex">
				<DesktopNavigation />
			</div>
			<div className="block z-80 md:hidden">
				<MobileNavigation />
			</div>
		</div>
	);
}
