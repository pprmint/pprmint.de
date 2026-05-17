"use client";
import { useEffect, useState } from "react";

export default function CountUp() {
	const [scroll, setScroll] = useState(0);
	useEffect(() => {
		const handleScroll = () => {
			setScroll(window.scrollY);
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="absolute size-full">
			<div className="font-minttriangles text-7xl md:text-8xl xl:text-9xl 2xl:text-[12rem] z-10 xl:mt-20 2xl:mt-14 mr-12 xl:mr-24 2xl:mr-28 absolute bottom-6 xl:top-1/2 xl:-translate-y-1/2 right-0">
				<p className="absolute top-0 left-0 size-fit text-white/10">****</p>
				<p className="size-fit text-white drop-shadow-[0px_0px_30px_#111]">{scroll + 1234}</p>
			</div>
		</div>
	);
}
