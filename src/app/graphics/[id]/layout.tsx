"use client";
import { ReactNode } from "react";
import ArrowLeft from "src/icons/ArrowLeft";
import Link from "next/link";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Link
				href="/graphics"
				className="group absolute top-60 md:top-80 xl:top-96 left-1/2 -translate-x-1/2 inline-flex z-10 text-lg text-white hover:text-neutral-950 border-2 border-neutral-50 hover:bg-neutral-50 active:border-neutral-200 active:bg-neutral-200 rounded-full p-1 duration-100 animate-fade-in"
			>
				<ArrowLeft className="size-[30px] stroke-0 group-hover:stroke-1 stroke-current duration-100" />
			</Link>
			{children}
		</>
	);
}
