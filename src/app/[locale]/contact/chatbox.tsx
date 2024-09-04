"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import * as Portal from "@radix-ui/react-portal";
import FocusTrap from "focus-trap-react";

import Mina from "public/assets/mina/nekomimi_smol.webp";
import Link from "next/link";
import Button from "../../../components/ui/Button";
import { useTransition, a, config } from "@react-spring/web";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import ChevronLeft from "src/icons/ChevronLeft";
import Heart from "src/icons/Heart";
import HeartBroken from "src/icons/HeartBroken";

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
						<Link href="/works/graphics" target="_blank" className="text-link">
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
				className="group relative flex items-center ring-2 hover:ring-8 ring-neutral hover:ring-transparent rounded-md rounded-tl-xl rounded-br-xl hover:rounded-md duration-500 ease-out-expo"
			>
				<div className="absolute z-0 flex items-center w-full h-full overflow-hidden group-hover:blur-lg duration-200">
					<div
						className="absolute w-full aspect-square opacity-0 group-hover:opacity-100 rounded-full animate-slow-spin duration-200"
						style={{
							backgroundImage:
								"conic-gradient(#f44, #f71, #fb0, #9c3, #0c6, #2cf, #29f, #a7e, #e6b, #f44)",
						}}
					/>
				</div>
				<div className="z-10 flex whitespace-nowrap items-center gap-3 px-3 hover:px-4 font-display font-medium text-3xl text-neutral-50 bg-neutral-950 group-focus-visible:bg-neutral-800 rounded-md rounded-tl-xl rounded-br-xl group-hover:rounded-md duration-500 ease-out-expo">
					<div className="relative h-14 w-16 overflow-clip">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 160 160"
							className="absolute bottom-0 w-full h-auto -rotate-6 group-hover:rotate-0 translate-y-4 group-hover:translate-y-2.5 group-active:translate-y-3 duration-300 group-active:duration-75 ease-in-out-custom"
						>
							<path
								d="m490.172 76.467.018-.186a2.602 2.602 0 1 1-.018.186m25.987 29.561q.017.153.025.309l.001.063a2.603 2.603 0 0 1-2.602 2.602 2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 5.178-.372m-42.932 2.641a92 92 0 0 0-2.578-2.921 89 89 0 0 0 2.185-1.797 2.602 2.602 0 0 1 .393 4.718m5.075-9.839a2.601 2.601 0 1 1-3.548 3.435 72 72 0 0 0 3.548-3.435m4.277-4.946a2.602 2.602 0 1 1-2.728 3.279 57 57 0 0 0 2.728-3.279m3.056-4.477a2.603 2.603 0 0 1 4.473 1.807 2.603 2.603 0 0 1-2.602 2.602 2.603 2.603 0 0 1-2.459-3.453q.302-.477.588-.956m29.677 9.013a2.602 2.602 0 1 1-1.313-4.512q.252.637.539 1.348c.299.737.552 1.814.774 3.164m2.219 24.874a2.603 2.603 0 0 1-.382-4.378c.118 1.447.244 2.911.382 4.378m1.205 10.214h-.008a2.603 2.603 0 0 1-2.602-2.602c0-1.205.822-2.221 1.936-2.515.201 1.734.424 3.448.674 5.117m1.839 9.153a2.603 2.603 0 0 1-4.449-1.831 2.603 2.603 0 0 1 3.451-2.46c.3 1.502.631 2.939.998 4.291m-3.982 6.604a2.602 2.602 0 0 1 4.504 2.563 19.5 19.5 0 0 1-4.504-2.563m2.395 4.077a2.602 2.602 0 0 1-2.657-3.603c.561.972 1.473 2.377 2.657 3.603m-7.577-8.682a2.603 2.603 0 0 1 4.774 1.432 2.603 2.603 0 0 1-3.014 2.569c-.706-1.353-1.281-2.749-1.76-4.001m-.935-2.374a2.602 2.602 0 1 1-2.156-4.058 2.603 2.603 0 0 1 2.19 4.007c-.189-.499-.357-.92-.51-1.235 0 0 .193.453.476 1.286m1.494 5.847a2.6 2.6 0 0 1-.709-3.214c.243.933.49 2.012.709 3.214m.67 10.308a2.604 2.604 0 0 1-.013-4.846c.089 1.526.105 3.15.013 4.846m-1.409 8.611a2.6 2.6 0 0 1 .744-3.159 39 39 0 0 1-.744 3.159m-2.274 6.07a2.602 2.602 0 1 1 1.587-3.875 38 38 0 0 1-1.587 3.875m1.964-2.605.001.082a2.6 2.6 0 0 1-1.477 2.346c.457-.695.974-1.525 1.476-2.428m2.399-1.99a2.6 2.6 0 0 1-1.195-.434c.417-.965.756-1.946.947-2.882 0 0 .04 1.238.248 3.316m1.521 9.612a2.602 2.602 0 1 1-.906-4.856c.235 1.487.531 3.122.906 4.856m4.838 14.728a2.603 2.603 0 0 1-1.996-4.805 59 59 0 0 0 1.996 4.805m21.538 19.415a2.604 2.604 0 0 1-4.197-1.353 28 28 0 0 0 4.197 1.353m19.174.611h-.034a2.6 2.6 0 0 1-1.996-.934A57 57 0 0 0 562 211s-.533.773-1.609 1.893m-6.461 4.925a2.602 2.602 0 1 1 3.866-2.57 27.5 27.5 0 0 1-3.866 2.57m-6.577 2.568a2.603 2.603 0 0 1 4.739-1.648 27.4 27.4 0 0 1-4.739 1.648m-10.27.68a2.602 2.602 0 1 1 4.874.118 32 32 0 0 1-4.874-.118m-10.048-2.387a2.603 2.603 0 0 1 4.701 1.451 45 45 0 0 1-4.701-1.451m-2.902-.527a2.602 2.602 0 1 1 .951-.237A57 57 0 0 1 523 217s.399.463 1.133 1.152m6.327 4.301a2.603 2.603 0 0 1-3.927-2.239l.001-.077c1.099.8 2.422 1.628 3.926 2.316m1.36 3.379a2.599 2.599 0 0 1 1.052-2.462c.991.299 2.036.521 3.128.63 0 0-1.623.898-4.18 1.832m-8.93 2.003a2.602 2.602 0 1 1 2.734-.334c-.885.151-1.8.267-2.734.334m-6.754-7.847a2.602 2.602 0 1 1 1.381 2.53q-.225-.424-.455-.834a77 77 0 0 1-.926-1.696m-3.286-6.931q.35-.104.733-.105a2.603 2.603 0 0 1 1.405 4.792 88 88 0 0 1-2.138-4.687m8.462-2.465a2.603 2.603 0 1 1-5.098-.974c1.936.615 3.699.878 5.098.974m-10.086-15.987a2.603 2.603 0 0 1 4.959 1.103 2.603 2.603 0 0 1-3.027 2.567 74 74 0 0 1-1.932-3.67m-3.008-6.76.102-.002a2.603 2.603 0 0 1 1.816 4.465 111 111 0 0 1-1.918-4.463m-5.042-14.585a2.601 2.601 0 0 1 1.477 4.743 194 194 0 0 1-1.477-4.743m-2.342-8.456a2.603 2.603 0 0 1 4.944 1.134 2.603 2.603 0 0 1-4.077 2.144 259 259 0 0 1-.867-3.278m-4.643-16.001a2.603 2.603 0 0 1 4.324 1.95 2.6 2.6 0 0 1-2.827 2.592 139 139 0 0 0-1.497-4.542m-5.787-13.719a2.602 2.602 0 1 1 1.743 3.612 98 98 0 0 0-1.743-3.612m-3.648-6.67a2.602 2.602 0 0 1 2.475 4.439l-.005-.01a229 229 0 0 0-2.47-4.429m-12.155-18.086a2.602 2.602 0 1 1 2.59 3.332 108 108 0 0 0-2.59-3.332m12.905 3.334a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m10.407 0a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m10.407-19.846a2.602 2.602 0 1 1 .003-5.205 2.602 2.602 0 0 1-.003 5.205m-10.407 0a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m0-9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m-10.407 19.846a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m20.814 0a2.602 2.602 0 1 1 .003-5.205 2.602 2.602 0 0 1-.003 5.205m-10.407 0a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m-10.407 19.846a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m20.814-9.923a2.602 2.602 0 1 1 .003-5.205 2.602 2.602 0 0 1-.003 5.205m0 19.846a2.602 2.602 0 0 1 0-5.203 2.602 2.602 0 0 1 0 5.203m-10.407 9.923a2.603 2.603 0 0 1-2.602-2.601 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.601m0-19.846a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m0 9.923a2.602 2.602 0 1 1 .001-5.201 2.602 2.602 0 0 1-.001 5.201m10.407-9.923a2.602 2.602 0 1 1 .003-5.205 2.602 2.602 0 0 1-.003 5.205m0 29.769a2.602 2.602 0 1 1 .001-5.203 2.602 2.602 0 0 1-.001 5.203m0 9.924a2.602 2.602 0 1 1 .003-5.205 2.602 2.602 0 0 1-.003 5.205m0 19.846a2.602 2.602 0 1 1 .003-5.205 2.602 2.602 0 0 1-.003 5.205m10.408 19.846a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m10.407 9.923a2.602 2.602 0 1 1 .001-5.201 2.602 2.602 0 0 1-.001 5.201M503.176 89.155a2.602 2.602 0 1 1 .001-5.201 2.602 2.602 0 0 1-.001 5.201m-10.407 9.923a2.602 2.602 0 0 1 0-5.203 2.602 2.602 0 0 1 0 5.203m10.407 0a2.602 2.602 0 1 1 .001-5.205 2.602 2.602 0 0 1-.001 5.205m-10.407-9.923a2.602 2.602 0 1 1 2.601-2.602 2.6 2.6 0 0 1-2.601 2.602m0 29.77a2.603 2.603 0 0 1-2.602-2.602 2.602 2.602 0 1 1 2.602 2.602m0 9.923a2.603 2.603 0 0 1-2.602-2.602 2.602 2.602 0 1 1 2.602 2.602m0-19.846a2.603 2.603 0 0 1-2.602-2.602 2.602 2.602 0 1 1 2.602 2.602m-10.408 9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m31.222 0a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m-10.407-9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m-20.815 0a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m20.815 9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m0 9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m10.407 0a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m-10.407 9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m0 19.846a2.602 2.602 0 1 1 .001-5.201 2.602 2.602 0 0 1-.001 5.201m0-9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m10.407-9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m0 49.615a2.602 2.602 0 1 1 .001-5.205 2.602 2.602 0 0 1-.001 5.205m10.407 19.847a2.602 2.602 0 1 1 .003-5.205 2.602 2.602 0 0 1-.003 5.205m10.408 9.923a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602m10.407 0a2.603 2.603 0 0 1-2.602-2.602 2.603 2.603 0 0 1 2.602-2.602 2.603 2.603 0 0 1 2.602 2.602 2.603 2.603 0 0 1-2.602 2.602"
								style={{ fill: "url(#b)" }}
								transform="matrix(.51246 0 0 .51246 -128.005 -.376)"
							/>
							<path
								d="M621.186 253.184c-2.867-3.884-12.016-6.746-12.053-6.853-4.709-13.826 4.858-29.103 23.043-32.89a1.02 1.02 0 0 1 1.167 1.334c-1.363 4.081-4.368 14.726-.943 20.892 4.563 8.214.66 15.407-6.739 21.582-.312.261-3.786-3.766-4.22-7.517a54 54 0 0 1-.331-6.324 72 72 0 0 1 .298-6.318c.122-1.409.278-2.811.481-4.186.453-3.053 1.137-5.963 2.112-8.501 1.193-3.106 2.789-5.651 4.885-7.186-2.055 1.261-3.776 3.401-5.156 6.094-.778 1.518-1.443 3.21-1.995 5.015a42 42 0 0 0-1.24 5.254 44 44 0 0 0-.463 3.567 46 46 0 0 0-.167 3.592 50 50 0 0 0 .242 5.382c.138 1.385.007 2.845 1.079 7.063"
								className="fill-neutral group-hover:fill-neutral-50 duration-300"
								transform="translate(-513.052 -207)"
							/>
							<path
								d="M494.452 269.483c.589-.853 7.255-12.585 6.943-20.893-3.059 18.949-18.026 30.479-21.435 32.391 0 0 5.597-10.872 4.986-21.615C474.237 309.56 436.311 305.386 424 299c0 0 15.037.885 25.146-18.976-9.611 9.007-20.714 10.065-20.714 10.065 27.834-11.204 26.602-53.333 23.559-84.122-.077-.148-30.614-22.644-40.991-44.967 11.628 28.253 37.808 46.1 37.808 46.1S435.409 216.647 426 214c-17.22-4.845-28-26-36-42 0 0 4.669 18.725 17 33-50-29.734-33-90-33-90-10.467 21.224-1.43 70.224-1.43 70.224C371.155 185.015 356 178 352 158c.58 8.792 1.231 17.507 6 26-13.036-4.563-19.999-14.556-20-25-.002-19.199 10.497-31.245 10.497-31.245S335 140.588 335 165c0 5.168-2.485 30.814-1.323 36.99-1.971-.618-4.785-8.036-4.785-8.036-3.468 26.878-4.511 77.617 8.655 89.915 0 0-11.792-9.455-16.419-30.205A154 154 0 0 0 321 260c0 24 13 36 13 36-.128.199-18.786-4.075-32.252-16.191-3.18-2.861-8.388-8.89-8.388-8.89.596 4.13 2.044 7.763 4.171 11.434-6.384-3.582-12.636-14.998-17.394-24.418-6.679-13.223-9.571-24.054-8.5-35.083 1.579-16.261 10.508-27.876 14.252-32.177-6.363 4.592-11.018 14.447-11.018 14.447-.789-6.792.362-20.81 5.371-29.158C285.562 167.097 299.878 148.4 306 140c0 0-6.774 4.973-10.952 4.862 7.825-4.879 20.429-19.029 23.002-22.994C326.322 109.117 335.28 96.36 348 89c18.962-10.972 32.971-15.759 44.981-14.367 7.539.874 13.289 5.773 27.299 4.106 8.422-1.003 19.448 3.225 27.166 7.541 17.113 9.571 28.065 25.146 37.236 42.019 5.128 9.436 8.561 19.78 11.137 30.102 3.029 12.138 11.375 42.074 24.17 47.592 0 0-7.046 1.084-14.052-3.722 1.749 5.153 3.954 10.197 6.581 14.869C517.16 225.395 520 238 516 248c-5.85 14.625-20.804 21.165-21.548 21.483m0 0q-.063.091-.028.012zM321.425 144.862c-3.427 5.311-7.564 13.865-12.14 23.287-2.475 5.096-5.08 10.442-7.783 15.661a296 296 0 0 1-4.421 8.241c-1.566 2.803-3.14 5.51-4.757 8.031a64 64 0 0 0-3.202 5.619c-2.459 4.898-4.012 9.649-4.895 14.217-1.487 7.682-1.077 14.837.058 21.321-.912-6.477-1.063-13.59.642-21.175 1.003-4.465 2.655-9.091 5.182-13.854a65 65 0 0 1 3.247-5.457 135 135 0 0 0 4.887-8.052 199 199 0 0 0 4.385-8.319c2.632-5.268 5.123-10.683 7.462-15.856 4.311-9.536 8.092-18.245 11.335-23.664m116.174-22.994a41 41 0 0 0 .075 6.167c.243 2.903.751 5.991 1.536 9.152a65.5 65.5 0 0 0 3.286 9.792 60 60 0 0 0 1.77 3.739 65 65 0 0 0 3.097 5.371 61 61 0 0 0 3.595 5.041 53 53 0 0 0 6.35 6.725c-2.115-2.147-4.052-4.547-5.834-7.109a70 70 0 0 1-3.261-5.173 81 81 0 0 1-2.821-5.413 104 104 0 0 1-1.671-3.708 103 103 0 0 1-1.535-3.766 85 85 0 0 1-1.981-5.773c-.932-3.081-1.641-6.086-2.076-8.932-.329-2.149-.515-4.198-.53-6.113m42.155 27.045c.031 2.708.46 6.158 1.173 10.122.8 4.445 1.945 9.533 3.264 14.944a530 530 0 0 0 1.654 6.59c.834 3.242 1.702 6.548 2.58 9.852.485 1.825.976 3.649 1.464 5.462.745 2.768 1.482 5.51 2.179 8.193 1.26 4.847 2.391 9.496 3.242 13.74 1.503 7.489 2.15 13.704 1.131 17.475 1.084-3.455.855-9.058-.161-15.85-.486-3.249-1.149-6.769-1.941-10.453a356 356 0 0 0-3.451-14.466 590 590 0 0 0-2.591-9.56c-1.37-4.924-2.748-9.757-3.983-14.302-2.406-8.861-4.286-16.61-4.56-21.747"
								className="fill-neutral group-hover:fill-neutral-50 duration-300"
								transform="matrix(.51246 0 0 .51246 -129.197 -1.568)"
							/>
							<g className="group-hover:rotate-45 group-active:rotate-[30deg] duration-300 group-active:duration-75 ease-in-out-custom origin-[51.6%_24.4%]">
								<path
									d="M378 54c17.022 0 15.506-6.048-2-4s-22.829 13.544-24 26 10.132 60.361 22 68.846c0 0-14-36.846-14-53.846s4.479-37 18-37"
									className="fill-neutral-950"
									transform="matrix(.51246 0 0 .51246 -126.696 .933)"
								/>
								<path
									d="M414 79c-2.127-10.527-20.494-31.048-38-29s-22.829 13.544-24 26 10.132 60.361 22 68.846c0 0-14-36.846-14-53.846s4.479-37 18-37c17.022 0 31.742 21.048 34.768 25.226.165.229.547.603.804.503.27-.105.487-.437.428-.729"
									className="fill-neutral group-hover:fill-neutral-50 duration-300"
									transform="matrix(.51246 0 0 .51246 -129.197 -1.568)"
								/>
							</g>
							<defs>
								<linearGradient
									id="b"
									x1="0"
									x2="1"
									y1="0"
									y2="0"
									gradientTransform="scale(163.0405)rotate(68.106 1.178 2.456)"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset="0" style={{ stopColor: "#aaa", stopOpacity: 1 }} />
									<stop offset=".54" style={{ stopColor: "#aaa", stopOpacity: 0.78 }} />
									<stop offset="1" style={{ stopColor: "#aaa", stopOpacity: 0 }} />
								</linearGradient>
							</defs>
						</svg>
					</div>
					{t("button")}
				</div>
			</button>
			{chatTransition((styles, item) =>
				item ? (
					<FocusTrap>
						<Portal.Root className="fixed flex items-center justify-center z-100 inset-0">
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
												<ChevronLeft className="size-7" />
												{t("back")}
											</button>
										</div>
										<div className="w-2/5 text-center">
											<span className="text-neutral-50 font-medium">Mina.</span>
											<br />
											<span className="text-sm sm:text-base">
												{t(noTalky ? "titleAngy" : "title")}
											</span>
										</div>
										<div className="w-1/5 pr-2">
											<Image
												alt="Mina art by Nekomimi"
												src={Mina}
												className="ml-auto size-10 rounded-full overflow-hidden self-end"
											/>
										</div>
									</div>
									<div
										className="px-3 lg:px-6 h-full overflow-y-scroll pt-14 lg:pt-16"
										ref={chatboxRef}
									>
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
														className={`grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-3 h-full py-3 items-center ${
															answering
																? "opacity-50 saturate-0 pointer-events-none"
																: "opacity-100 saturate-100"
														} duration-200`}
													>
														<button
															className="inline-flex flex-row md:flex-col items-center justify-center gap-3 border hover:border-2 border-green hover:bg-green-950 text-neutral-50 rounded-md size-full duration-100 active:scale-[0.98] active:opacity-75 active:duration-75"
															onClick={() => handleEndingYes()}
														>
															<Heart className="size-6 md:size-9 text-green" />
															{t("Messages.EndingYes.message")}
														</button>
														<button
															className="inline-flex flex-row md:flex-col items-center justify-center gap-3 border hover:border-2 border-red hover:bg-red-950 text-neutral-50 rounded-md size-full duration-100 active:scale-[0.98] active:opacity-75 active:duration-75"
															onClick={() => handleEndingNo()}
														>
															<HeartBroken className="size-6 md:size-9 text-red" />
															{t("Messages.EndingNo.message")}
														</button>
													</a.div>
												) : (
													<a.div style={style} className="flex flex-col gap-3 items-end py-3">
														{clickedQuestions.length > 0 && (
															<button
																className={`w-fit max-w-[80%] px-3 py-1 border border-neutral-900 hover:bg-neutral-900 hover:text-neutral-50 text-sm text-left rounded-2xl rounded-br-md duration-100 ${
																	answering
																		? "opacity-50 pointer-events-none"
																		: "cursor-pointer"
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
																	answering
																		? "opacity-50 pointer-events-none"
																		: "cursor-pointer"
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
