"use client";
import { useNavbar } from "@/components/layout/navigation/NavBarContext";
import { ReactNode, useEffect } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	const { setDefaultColor } = useNavbar();
	useEffect(() => {
		setDefaultColor();
	}, [setDefaultColor]);

	return children;
}
