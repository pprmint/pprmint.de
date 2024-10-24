"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useLocale } from "next-intl";
import { setUserLocale } from "src/i18n/locale";
import CogWheel from "src/icons/CogWheel";
import Error from "src/icons/Error";
import { useTheme } from "next-themes";
import { locales } from "src/i18n/config";

export default function Settings() {
	const currentLocale = useLocale();
	const otherLocale = locales?.find((cur) => cur !== currentLocale);
	const { theme, setTheme } = useTheme();
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<button className="inline-flex z-70 items-center justify-center p-2 hover:bg-neutral-50/10 hover:text-neutral-50 duration-100 rounded-full">
					<CogWheel />
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed z-90 inset-0 bg-neutral-950/90 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
				<Dialog.Content className="fixed z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen max-w-2xl rounded-xl bg-neutral-950 p-6 outline outline-1 outline-neutral-900 data-[state=open]:animate-dialog-enter data-[state=closed]:animate-dialog-exit origin-top-left shadow-2xl">
					<Dialog.Title className="text-2xl pb-0">
						Settings<span className="text-green">.</span>
					</Dialog.Title>
					<Dialog.Description className="mb-5">Change the language and color theme used throughout the site.</Dialog.Description>
					<fieldset className="mb-6">
						<h3 className="text-lg">Language</h3>
						<button
							onClick={() => setUserLocale(otherLocale!)}
							className="relative inline-flex w-20 h-7 hover:bg-neutral-50/10 active:opacity-75 rounded-full border border-neutral-50/10 backdrop-blur-sm duration-100 active:duration-75"
						>
							<div
								className={`absolute w-[36px] h-[22px] top-0.5 text-center uppercase bg-gradient-to-b from-neutral-50 to-neutral-100 text-neutral-950 shadow-sm rounded-full ${
									currentLocale === "en" ? "left-0.5" : "left-[40px]"
								} duration-200 ease-out-cubic`}
							/>
							<div className="absolute inset-0 flex items-center">
								{locales.map((locale, _) => (
									<span
										key={locale}
										className={`w-full text-center ${
											currentLocale === locale && "text-neutral-950 font-medium"
										} text-sm uppercase duration-100`}
									>
										{locale}
									</span>
								))}
							</div>
						</button>
					</fieldset>
					<fieldset>
						<h3 className="text-lg">Theme</h3>
						<div className="flex gap-3">
							<button className="group w-full h-auto" onClick={() => setTheme("dark")} aria-label="set dark theme">
								<div
									className={`border mb-2 rounded-md overflow-clip outline ${
										theme === "dark"
											? "border-transparent outline-2 outline-green outline-offset-1"
											: "outline-0 outline-transparent border-neutral-900"
									} group-active:scale-[0.98] group-active:duration-50 duration-100 ease-out`}
								>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90">
										<path d="M0 0h160v90H0z" fill="#111" />
										<circle cx="152.5" cy="7.5" r="2.5" fill="#eee" />
										<rect width="20" height="5" x="5" y="5" rx="2.5" ry="2.5" fill="#0c6" />
										<rect width="70" height="12" x="45" y="21" rx="6" ry="6" fill="#eee" />
										<rect width="50" height="6" x="55" y="37" rx="3" ry="3" fill="#777" />
										<rect width="50" height="8" x="5" y="56" rx="4" ry="4" fill="#eee" />
										<rect width="45" height="2" x="5" y="68" rx="1" ry="1" fill="#777" />
										<path d="M90 55h63a2 2 0 0 1 2 2v33H88V57c0-1.1.9-2 2-2Z" fill="#222" />
										<rect width="15" height="2" x="5" y="73" rx="1" ry="1" fill="#777" />
										<rect width="10" height="2" x="56" y="73" rx="1" ry="1" fill="#777" />
										<rect width="30" height="2" x="23" y="73" rx="1" ry="1" fill="#777" />
										<rect width="20.8" height="2" x="53" y="68" rx="1" ry="1" fill="#777" />
										<rect width="10" height="2" x="62" y="6.5" rx="1" ry="1" fill="#777" />
										<rect width="10" height="2" x="75" y="6.5" rx="1" ry="1" fill="#777" />
										<rect width="10" height="2" x="88" y="6.5" rx="1" ry="1" fill="#777" />
										<rect width="23" height="6" x="5" y="79" rx="1" ry="1" fill="#0c6" />
										<rect width="15" height="2" x="11" y="81" rx="1" ry="1" fill="#111" />
										<circle cx="8" cy="82" r="1.5" fill="#111" />
									</svg>
								</div>
								<span
									aria-hidden
									className={`${theme === "dark" ? "text-neutral-50 font-medium" : "group-hover:text-neutral-50"} duration-100`}
								>
									Dark
								</span>
							</button>
							<button className="group w-full h-auto" onClick={() => setTheme("light")} aria-label="set light theme">
								<div
									className={`border mb-2 rounded-md overflow-clip outline ${
										theme === "light"
											? "border-transparent outline-2 outline-green outline-offset-1"
											: "outline-0 outline-transparent border-neutral-900"
									} group-active:scale-[0.98] group-active:duration-50 duration-100 ease-out`}
								>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90">
										<path d="M0 0h160v90H0z" fill="#eee" />
										<circle cx="152.5" cy="7.5" r="2.5" fill="#111" />
										<rect width="20" height="5" x="5" y="5" rx="2.5" ry="2.5" fill="#0c6" />
										<rect width="70" height="12" x="45" y="21" rx="6" ry="6" fill="#111" />
										<rect width="50" height="6" x="55" y="37" rx="3" ry="3" fill="#555" />
										<rect width="50" height="8" x="5" y="56" rx="4" ry="4" fill="#111" />
										<rect width="45" height="2" x="5" y="68" rx="1" ry="1" fill="#555" />
										<path d="M90 55h63a2 2 0 0 1 2 2v33H88V57c0-1.1.9-2 2-2Z" fill="#fff" />
										<rect width="15" height="2" x="5" y="73" rx="1" ry="1" fill="#555" />
										<rect width="10" height="2" x="56" y="73" rx="1" ry="1" fill="#555" />
										<rect width="30" height="2" x="23" y="73" rx="1" ry="1" fill="#555" />
										<rect width="20.8" height="2" x="53" y="68" rx="1" ry="1" fill="#555" />
										<rect width="10" height="2" x="62" y="6.5" rx="1" ry="1" fill="#555" />
										<rect width="10" height="2" x="75" y="6.5" rx="1" ry="1" fill="#555" />
										<rect width="10" height="2" x="88" y="6.5" rx="1" ry="1" fill="#555" />
										<rect width="23" height="6" x="5" y="79" rx="1" ry="1" fill="#0c6" />
										<rect width="15" height="2" x="11" y="81" rx="1" ry="1" fill="#111" />
										<circle cx="8" cy="82" r="1.5" fill="#111" />
									</svg>
								</div>
								<span
									aria-hidden
									className={`${theme === "light" ? "text-neutral-50 font-medium" : "group-hover:text-neutral-50"} duration-100`}
								>
									Light
								</span>
							</button>
						</div>
					</fieldset>
					<Dialog.Close asChild>
						<button
							className="absolute top-3 right-3 inline-flex p-2 items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 rounded-full"
							aria-label="Close"
						>
							<Error />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
