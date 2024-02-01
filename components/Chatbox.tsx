import { PropsWithChildren, useState, useRef, useEffect } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";

import Mina from "public/assets/mina/nekomimi_smol.webp";
import Link from "next/link";
import Button from "./Button";
import { useTransition, a } from "@react-spring/web";
import dynamic from "next/dynamic";

const Messages = ["WhoYou", "WhyPprmint", "WhoWebsite", "UseSelf", "ProjectTerms", "WhatSoftware", "OfferCommissions", "OwnQuestion"];

function MessageBubble(props: { incoming?: boolean; id: string }) {
    const isAppleDevice = /iPhone|Mac/i.test(navigator.userAgent);
	return (
		<div
			className={`flex my-6 w-full animate-scale-up ${
				props.incoming ? "justify-start origin-bottom-left" : "justify-end origin-bottom-right"
			}`}
		>
			<div
				className={`w-fit max-w-[80%] px-4 py-2 rounded-3xl border-t border-b-2 ${
					props.incoming
						? "rounded-bl-md bg-neutral-700 border-t-neutral-600 border-x-neutral-600 border-b-neutral-800 text-neutral-50"
						: `rounded-br-md border-y ${isAppleDevice ? "bg-blue border-t-blue-400 border-b-blue-700 selection:text-blue" : "bg-green border-t-green-400 border-b-green-700 selection:text-green"} text-neutral-950 selection:bg-neutral-950`
				}`}
			>
				<Trans
					i18nKey={`CHAT:Messages.${props.id}.${props.incoming ? "answer" : "message"}`}
					components={{
						gallery: (
							<Link
								href="/gallery"
                                target="_blank"
								className="text-link"
							/>
						),
						sil: (
							<Link
								href="https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL"
								target="_blank"
								rel="noopener noreferrer"
								className="text-link-external"
							/>
						),
						br: <br />,
						comms: (
							<Link
								href="/commissions"
                                target="_blank"
								className="text-link"
							/>
						),
					}}
				/>
			</div>
		</div>
	);
}

function Chatbox(props: { onClose: () => void }) {
	const { t } = useTranslation();

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
		<div className="relative bg-neutral-900 sm:border border-neutral-50/10 ring-neutral-950/75 sm:rounded-xl overflow-hidden">
			<div className="absolute top-0 left-0 right-0 flex gap-6 items-center py-3 sm:py-6 px-6 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[67.5%] shadow-lg shadow-neutral-900/50 z-10">
				<div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full overflow-hidden">
					<Image alt="Mina art by Nekomimi" src={Mina} />
				</div>
				<div>
					<h3>Mina.</h3>
					<p className="text-sm sm:text-base">{t(noTalky ? "CHAT:titleAngy" : "CHAT:title")}</p>
				</div>
			</div>
			<div className="px-6 h-[600px] overflow-y-scroll pt-20 sm:pt-28" ref={chatboxRef}>
				<MessageBubble incoming id={noTalky ? "NoTalky" : "Hello"} />
				{chatMessages.map((message, index) => (
					<MessageBubble key={index} incoming={message.incoming} id={message.id} />
				))}
			</div>
			<div className="h-36 overflow-y-auto px-3 border-t border-neutral-800">
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
									{t("CHAT:Messages.EndingYes.message")}
								</Button>
								<Button outlined color="red" noMinWidth onClick={() => handleEndingNo()}>
									{t("CHAT:Messages.EndingNo.message")}
								</Button>
							</a.div>
						) : (
							<a.div style={style} className="flex flex-col gap-3 items-end py-3">
								{clickedQuestions.length > 0 && (
									<button
										className={`w-fit max-w-[80%] px-3 py-1 border border-neutral-800 hover:bg-neutral-800 hover:text-neutral-50 text-sm text-left rounded-2xl rounded-br-md duration-100 ${
											answering ? "opacity-50 pointer-events-none" : "cursor-pointer"
										}`}
										onClick={() => handleEnding("Ending")}
									>
										{t(`CHAT:Messages.Ending.message`)}
									</button>
								)}
								{availableMessages.map((id, index) => (
									<button
										key={index}
										className={`w-fit max-w-[80%] px-3 py-1 border border-neutral-800 hover:bg-neutral-800 hover:text-neutral-50 text-sm text-left rounded-2xl rounded-br-md duration-100 ${
											answering ? "opacity-50 pointer-events-none" : "cursor-pointer"
										}`}
										onClick={() => handleMessageClick(id)}
									>
										{t(`CHAT:Messages.${id}.message`)}
									</button>
								))}
							</a.div>
						)
					)}
			</div>
		</div>
	);
}

export default dynamic(() => Promise.resolve(Chatbox), {
	ssr: false,
});
