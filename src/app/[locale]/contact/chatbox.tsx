"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import * as Portal from "@radix-ui/react-portal";
import FocusTrap from "focus-trap-react";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";

import Mina from "public/assets/mina/nekomimi_smol.webp";
import Link from "next/link";
import Button from "../../../components/ui/Button";
import { useTransition, a, config } from "@react-spring/web";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { ChevronLeft, X } from "lucide-react";

const Messages = [
	"WhoYou",
	"WhyPprmint",
	"WhoWebsite",
	"UseSelf",
	"ProjectTerms",
	"WhatSoftware",
	"OfferCommissions",
	"OwnQuestion",
];

function MessageBubble(props: { incoming?: boolean; id: string }) {
	const t = useTranslations("CHAT");
	const isAppleDevice = /iPhone|Mac/i.test(navigator.userAgent);
	return (
		<div
			className={`flex my-6 w-full animate-scale-up ${
				props.incoming ? "justify-start origin-bottom-left" : "justify-end origin-bottom-right"
			}`}
		>
			<div
				className={`w-fit max-w-[80%] px-4 py-2 rounded-3xl ${
					props.incoming
						? "rounded-bl-md bg-neutral-800 text-neutral-50"
						: `rounded-br-md bg-gradient-to-b ${
								isAppleDevice
									? "from-blue to-blue-600 selection:text-blue"
									: "from-green to-green-600 selection:text-green"
						  } text-neutral-950 selection:bg-neutral-950`
				}`}
			>
				{t.rich(`Messages.${props.id}.${props.incoming ? "answer" : "message"}`, {
					gallery: (chunks) => (
						<Link href="/gallery" target="_blank" className="text-link">
							{chunks}
						</Link>
					),
					sil: (chunks) => (
						<Link
							href="https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL"
							target="_blank"
							rel="noopener noreferrer"
							className="text-link-external"
						>
							{chunks}
						</Link>
					),
					br: () => <br />,
					comms: (chunks) => (
						<Link href="/commissions" target="_blank" className="text-link">
							{chunks}
						</Link>
					),
				})}
			</div>
		</div>
	);
}

function Chatbox() {
	const t = useTranslations("CHAT");

	const [chatVisible, setChatVisible] = useState(false);
	const chatTransition = useTransition(chatVisible, {
		from: { opacity: 0, y: 40 },
		enter: { opacity: 1, y: 0 },
		leave: { opacity: 0, y: 40 },
		config: config.stiff,
	});
	function handleChatboxOpen() {
		document.body.classList.add("overflow-hidden");
		setChatVisible(true);
	}

	function handleChatboxClose() {
		document.body.classList.remove("overflow-hidden");
		setChatVisible(false);
	}

	const chatboxRef = useRef<HTMLDivElement>(null);
	const [chatMessages, setChatMessages] = useState<{ incoming?: boolean; id: string }[]>([]);
	const [clickedQuestions, setClickedQuestions] = useState<string[]>([]);
	const [answering, setAnswering] = useState(false);
	const [noTalky, setNoTalky] = useState(false);
	const [messageBox, setMessageBox] = useState(true);
	const [ending, setEnding] = useState(false);

	function handleMessageClick(id: string) {
		// Set answering to true to prevent clicking of another question.
		setAnswering(true);
		// Show question.
		setChatMessages((prevMessages) => [...prevMessages, { id, incoming: false }]);
		// Add clicked question to list.
		setClickedQuestions((prevClickedQuestions) => [...prevClickedQuestions, id]);
		// Show answer after delay.
		setTimeout(() => {
			setChatMessages((prevMessages) => [...prevMessages, { id, incoming: true }]);
			setAnswering(false);
		}, 750);
	}

	// Filter out questions that have already been asked.
	const availableMessages = Messages.filter((message) => !clickedQuestions.includes(message));

	useEffect(() => {
		// Scroll to bottom of chatbox when new messages appear.
		if (chatboxRef.current) {
			chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
		}
	}, [chatMessages]);

	useEffect(() => {
		let pissedOffMina = localStorage.getItem("pissedOffMina");
		if (pissedOffMina) {
			setNoTalky(true);
			setMessageBox(false);
		}
	}, []);

	function handleEnding(id: string) {
		setEnding(true);
		handleMessageClick(id);
	}
	function handleEndingYes() {
		setMessageBox(false);
		handleMessageClick("EndingYes");
	}
	function handleEndingNo() {
		setMessageBox(false);
		handleMessageClick("EndingNo");
		localStorage.setItem("pissedOffMina", "sure did");
	}

	const messageBoxTransition = useTransition(ending, {
		from: {
			opacity: 0,
		},
		enter: {
			opacity: 1,
			delay: 700,
		},
		leave: {
			opacity: 0,
		},
	});

	return (
		<>
			<button
				onClick={handleChatboxOpen}
				className="group relative flex items-center border-2 border-neutral hover:border-transparent rounded-md rounded-tl-xl rounded-br-xl hover:rounded-md duration-500 ease-out-expo"
			>
				<div className="absolute z-0 flex items-center w-full h-full overflow-hidden group-hover:blur-lg duration-200">
					<div
						className="absolute w-full aspect-square opacity-0 group-hover:opacity-100 rounded-full animate-slow-spin duration-200"
						style={{
							backgroundImage: "conic-gradient(#f44, #f71, #fb0, #9c3, #0c6, #2cf, #29f, #a7e, #e6b, #f44)",
						}}
					/>
				</div>
				<div className="z-10 flex whitespace-nowrap items-center gap-6 px-3 hover:px-4 font-display font-medium text-3xl text-neutral-50 bg-neutral-950 rounded-md rounded-tl-xl rounded-br-xl group-hover:rounded-md duration-500 ease-out-expo">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 972 600"
						className="h-14 mx-auto fill-neutral group-hover:fill-neutral-50 pt-1 duration-100"
					>
						<path d="M88.715 680.48c4.377 27.534-28.753 46.17-28.753 46.17 20.806-27.05 18.726-70.742 14.564-101.952C71.5 602.012 44.346 574.762 57.88 506.1c3.087-15.661 7.715-29.861 12.469-41.766-15.742 18.016-35.398 26.624-61.313 33.443 31.939-11.614 62.592-37.034 74.903-66.58 10.404-24.968 16.646-64.501 45.775-95.71-9.712 4.48-31.88 11.462-43.694 12.484 15.28-1.38 63.34-44.934 75.893-60.34 51.477-63.18 109.95-97.79 193.5-97.79 38.543 0 26.17 4.923 38.543 4.162 7.08-.436 15.11-7.402 45.775-7.402 20.806 0 28.287 10.58 52.016 28.208 22.564 16.762 51.3 39.078 73.3 67.853-8.456-21.678-16.134-51.982-16.134-90.556 0-108.194 93.63-185.362 93.63-185.362-3.14 32.182 27.048 141.668 20.806 179.12-9.61 57.653-33.478 100.812-52.225 122.566 6.512-.174 13.9 3 19.664 10.044-.663-16.423 10.208-40.364 74.174-64.133 88.027-32.708 102.91-40.336 112.355-54.097-3.945 19.725-49.026 41.319-62.568 66.556 79.013-7.583 144.45 49.96 144.45 49.96-4.824-1.808-12.501-1.474-22.237.353 35.14 17.432 86 68.484 86 112.003 0 22.887-8.322 37.452-8.322 37.452s6.613-12.141 2.08-37.452c-2.945-16.454-9.331-34.33-25.29-52.286 10.655 23.866 14.888 50.406 14.888 75.173 0 70.742-20.807 99.87-85.307 156.049 54.097-72.823 68.66-149.807 22.426-199.396 0 0 35.593 43.279 8.784 74.557-24.968 29.129-46.25 40.489-60.34 58.258-21.744 27.423-29.875 55.308-37.451 95.71-4.723-42.505 2.08-81.145 10.403-97.791 12.11-24.221 13.496-54.793 9.913-76.472-5.288 45.188-79.691 79.092-101.461 76.472 24.606 2.93 81.145-54.693 81.145-76.984 0-22.29-31.21-64.5-78.32-50.824-33.967 10.457-55.867 5.435-63.681-7.434l-.133-.515c-.686 8.616-4.042 13.188-10.32 15.08-5.194 1.565-9.8 1.062-13.888-.923a505.13 505.13 0 0 1 6.132 23.81c6.543 28.276 20.807 101.952 60.339 151.887-12.287-7.798-25.764-18.77-43.694-41.613 0 60.339-16.956 87.955-29.13 122.759-11.048 31.807-33.774 54.833-66.58 62.419-14.52 3.358-49.935 2.08-89.468-18.726l12.484-8.322s-27.048 2.08-41.613-8.323l14.565-14.564c-18.726-4.162-57.771-29.51-62.42-33.291 79.065 2.08 111.03-49.186 122.759-81.145-24.726 15.412-52.84 25.177-74.904 4.16 20.6 4.559 57.485-10.402 76.984-56.176 2.814-6.606-33.977-66.893-48.81-65.895-30.371 2.045-67.611-7.113-86.432-33.977-20.53-29.301-20.806-29.13-20.806-29.13s0 16.646 14.564 39.534c-29.13-8.323-24.968-79.065-24.968-79.065s-22.887 62.419 14.565 120.678c-8.645-4.576-15.65-10.791-21.478-18.183-.253 8.335 2.31 18.748 11.075 28.586-58.258 6.242-83.226-106.113-81.146-122.758-6.242 10.403-6.242 35.37-6.242 60.338-9.897-21.438-12.57-51.48-6.242-91.548-14.564 16.645-33.91 102.953-33.29 108.194-2.201-12.697-3.79-28.837-.558-53.607-13.868 20.39-24.187 48.54-28.571 86.897-6.058 53.008 20.504 96.598 52.016 110.274-29.126-.034-48.844-31.21-48.844-31.21 5.999 50.562 18.726 81.146 47.855 95.71 0 0-16.645 12.484-35.371 10.404 0 0 22.887 29.129 66.58 54.097-18.725 0-47.854-22.887-47.854-22.887 10.403 14.564 30.118 24.967 30.118 24.967-58.085 21.496-85.307-31.21-85.307-31.21s6.48 30.71 54.097 54.098c0 0-26.531 2.603-61.814-11.767 7.049 10.379 20.34 20.13 41.008 26.33-97.527 52.828-118.062-63.562-118.973-69.056Zm505.934-392.847c-8.121-52.58-1.833-113.241 20.846-183.097 0 0-31.21 33.29-35.371 91.548-2.53 35.429 5.167 57.004 14.525 91.549Z" />
						<path
							className="group-hover:rotate-45 group-active:rotate-[30deg] origin-[36%_32%] duration-300 group-active:duration-50 ease-[cubic-bezier(0.1,1.48,0.5,1)]"
							d="M358.386 193.88c-5.452-9.953-18.764-32.965-62.22-29.268-52.016 4.424-91.696 44.16-108.194 104.295-16.497 60.135 6.242 93.629 6.242 93.629s-16.645-31.21 10.403-97.79c26.373-64.917 58.258-83.574 93.63-89.469 31.21-5.201 34.372 11.864 39.332 20.684 6.637 11.795 26.56 8.42 20.807-2.08Z"
						/>
					</svg>
					{t("button")}
				</div>
			</button>
			{chatTransition((styles, item) =>
				item ? (
					<FocusTrap>
						<Portal.Root className="fixed flex items-center justify-center z-50 inset-0">
							<a.div
								onClick={handleChatboxClose}
								style={{ opacity: styles.opacity }}
								className="absolute inset-0 bg-neutral-950/90"
							/>
							<a.div style={styles} className="relative w-full max-w-lg">
								<div className="relative flex flex-col bg-neutral-950 sm:border border-neutral-900 ring-neutral-950/75 sm:rounded-xl overflow-hidden h-svh md:h-2/3-screen">
									<div className="absolute top-0 left-0 right-0 flex gap-6 items-center justify-between py-2 backdrop-blur-xl bg-gradient-to-b from-[#282828bb] to-[#222222aa] shadow-lg shadow-neutral-950/50 z-10">
										<div className="w-1/5">
											<button
												className="flex items-center text-neutral-50 hover:opacity-75 duration-100"
												onClick={handleChatboxClose}
											>
												<ChevronLeft size={32} />
												{t("back")}
											</button>
										</div>
										<div className="w-2/5 text-center">
											<span className="text-neutral-50 font-medium">Mina.</span>
											<br />
											<span className="text-sm sm:text-base">{t(noTalky ? "titleAngy" : "title")}</span>
										</div>
										<div className="w-1/5 pr-2">
											<Image alt="Mina art by Nekomimi" src={Mina} className="ml-auto size-10 rounded-full overflow-hidden self-end" />
										</div>
									</div>
									<div className="px-3 lg:px-6 h-full overflow-y-scroll pt-14 lg:pt-16" ref={chatboxRef}>
										<MessageBubble incoming id={noTalky ? "NoTalky" : "Hello"} />
										{chatMessages.map((message, index) => (
											<MessageBubble key={index} incoming={message.incoming} id={message.id} />
										))}
									</div>
									<div className="h-64 overflow-y-auto px-3 border-t border-neutral-900">
										{messageBox &&
											messageBoxTransition((style, item) =>
												item ? (
													<a.div
														style={style}
														className={`grid grid-cols-2 gap-3 h-full items-center ${
															answering ? "opacity-50 saturate-0 pointer-events-none" : "opacity-100 saturate-100"
														} duration-200`}
													>
														<Button outlined color="green" noMinWidth onClick={() => handleEndingYes()}>
															{t("Messages.EndingYes.message")}
														</Button>
														<Button outlined color="red" noMinWidth onClick={() => handleEndingNo()}>
															{t("Messages.EndingNo.message")}
														</Button>
													</a.div>
												) : (
													<a.div style={style} className="flex flex-col gap-3 items-end py-3">
														{clickedQuestions.length > 0 && (
															<button
																className={`w-fit max-w-[80%] px-3 py-1 border border-neutral-900 hover:bg-neutral-900 hover:text-neutral-50 text-sm text-left rounded-2xl rounded-br-md duration-100 ${
																	answering ? "opacity-50 pointer-events-none" : "cursor-pointer"
																}`}
																onClick={() => handleEnding("Ending")}
															>
																{t(`Messages.Ending.message`)}
															</button>
														)}
														{availableMessages.map((id, index) => (
															<button
																key={index}
																className={`w-fit max-w-[80%] px-3 py-1 border border-neutral-900 hover:bg-neutral-900 hover:text-neutral-50 text-sm text-left rounded-2xl rounded-br-md duration-100 ${
																	answering ? "opacity-50 pointer-events-none" : "cursor-pointer"
																}`}
																onClick={() => handleMessageClick(id)}
															>
																{t(`Messages.${id}.message`)}
															</button>
														))}
													</a.div>
												)
											)}
									</div>
								</div>
							</a.div>
						</Portal.Root>
					</FocusTrap>
				) : null
			)}
		</>
	);
}

export default dynamic(() => Promise.resolve(Chatbox), {
	ssr: false,
});
