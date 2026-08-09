"use client";

import { createContext, useContext, useTransition } from "react";

const GalleryTransitionContext = createContext<{
	pending: boolean;
	startTransition: (callback: () => void) => void;
} | null>(null);

export function GalleryTransitionProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [pending, startTransition] = useTransition();

	return (
		<GalleryTransitionContext.Provider
			value={{
				pending,
				startTransition,
			}}
		>
			{children}
		</GalleryTransitionContext.Provider>
	);
}

export function useGalleryTransition() {
	const context = useContext(GalleryTransitionContext);

	if (!context) {
		throw new Error("useGalleryTransition must be used inside GalleryTransitionProvider.");
	}

	return context;
}
