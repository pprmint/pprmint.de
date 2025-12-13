"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export default function Toast({ ...props }: ToasterProps) {
	const { theme = "system" } = useTheme();
	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			toastOptions={{
        unstyled: true,
        duration: 3500,
				classNames: {
					toast: "group toast font-sans px-4 py-3 flex items-center gap-4 group-[.toaster]:bg-white/90 dark:group-[.toaster]:bg-neutral-900/90 backdrop-blur-md group-[.toaster]:text-neutral-950 dark:group-[.toaster]:text-white group-[.toaster]:border group-[.toaster]:border-black/5 dark:group-[.toaster]:border-white/5 group-[.toaster]:shadow-lg w-max max-w-lg",
          title: "group-[.toast]:text-neutral-950 dark:group-[.toast]:text-white text-base leading-none mb-1 font-medium",
					description: "group-[.toast]:text-neutral-950/75 dark:group-[.toast]:text-white/75 text-sm",
					actionButton:
						"group-[.toast]:bg-neutral-950/5 group-[.toast]:hover:bg-neutral-950/10 dark:group-[.toast]:bg-white/5 dark:group-[.toast]:hover:bg-white/10 group-[.toast]:text-neutral-950 dark:group-[.toast]:text-white whitespace-nowrap text-sm px-2 h-6",
					cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          closeButton: "absolute top-0 right-0",
				},
			}}
			{...props}
		/>
	);
}
