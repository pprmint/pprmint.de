"use client";
import { useState } from "react";
import { useTransition, a, easings } from "@react-spring/web";
import { Check, Loader2 } from "lucide-react";
import Button from "src/components/ui/Button";
import WarningTriangle from "src/icons/WarningTriangle";
import { useTranslations } from "next-intl";
import FadingImage from "src/components/ui/FadingImage";

import PixelMina from "public/assets/mina64.gif";

export default function Form() {
	const t = useTranslations("CONTACT.Content.Email.Form");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [sending, setSending] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [failed, setFailed] = useState(false);

	// Regular expression to validate email addresses.
	const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

	const invalidInput =
		sending ||
		submitted ||
		formData.name === "" ||
		formData.name.length > 30 ||
		formData.email === "" ||
		formData.email.length > 50 ||
		formData.subject === "" ||
		formData.subject.length > 100 ||
		!emailRegex.test(formData.email) ||
		formData.message === "" ||
		formData.message.length > 2000;

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		console.log("Sending...");
		setFailed(false);
		setSending(true);

		try {
			const response = await fetch("/contact/api", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data.message);
				setSubmitted(true);
				setSending(false);
			} else {
				console.error("Message failed to send.");
				setSending(false);
				setFailed(true);
			}
		} catch (error) {
			console.error("Sending error:", error);
		}
	}

	const submitTransition = useTransition(submitted, {
		key: submitted,
		from: {
			opacity: 0,
			y: 40,
			scale: 1,
		},
		enter: {
			opacity: 1,
			y: 0,
			scale: 1,
			config: {
				duration: 700,
				easing: easings.easeOutExpo,
			},
		},
		leave: {
			opacity: 0,
			y: 0,
			scale: 0.95,
			config: {
				duration: 200,
				easing: easings.easeInCubic,
			},
		},
		exitBeforeEnter: true,
	});

	const sendingTransition = useTransition(sending, {
		from: {
			opacity: 0,
		},
		enter: {
			opacity: 1,
		},
		leave: {
			opacity: 0,
		},
		config: {
			duration: 200,
		},
	});

	return submitTransition((styles, item) =>
		!item ? (
			<a.div style={{ ...styles }} className="relative">
				{sendingTransition((style, item) =>
					item ? (
						<a.div
							style={style}
							className="absolute inset-0 z-20 bg-neutral-950/75 flex items-center justify-center"
						>
							<FadingImage
								src={PixelMina}
								alt=""
								className="size-32"
								style={{ imageRendering: "pixelated" }}
							/>
						</a.div>
					) : null
				)}
				<form className="grid grid-cols-2 gap-3 md:gap-6">
					<div className="flex flex-col gap-1 col-span-2 md:col-span-1">
						<input
							required
							type="text"
							placeholder={t("name")}
							name="name"
							aria-label="name text field"
							maxLength={30}
							onChange={(e) => {
								setFormData({ ...formData, name: e.target.value });
							}}
							className="bg-neutral-950 focus:bg-neutral-950 border focus:border-transparent focus:outline outline-green border-neutral-900 hover:border-neutral-800 focus:hover:border-transparent hover:bg-neutral-900 focus:outline-2 text-neutral-50 placeholder:text-neutral rounded-md px-3 py-2 duration-100"
						/>
					</div>
					<div className="flex flex-col gap-1 col-span-2 md:col-span-1">
						<input
							required
							type="text"
							placeholder={t("emailAddress")}
							name="email"
							aria-label="email address text field"
							maxLength={50}
							onChange={(e) => {
								setFormData({ ...formData, email: e.target.value });
							}}
							className="bg-neutral-950 focus:bg-neutral-950 border focus:border-transparent focus:outline outline-green border-neutral-900 hover:border-neutral-800 focus:hover:border-transparent hover:bg-neutral-900 focus:outline-2 text-neutral-50 placeholder:text-neutral rounded-md px-3 py-2 duration-100"
						/>
					</div>

					<div className="flex flex-col gap-1 col-span-2">
						<input
							required
							type="text"
							placeholder={t("subject")}
							name="subject"
							aria-label="subject text field"
							maxLength={100}
							onChange={(e) => {
								setFormData({ ...formData, subject: e.target.value });
							}}
							className="bg-neutral-950 focus:bg-neutral-950 border focus:border-transparent focus:outline outline-green border-neutral-900 hover:border-neutral-800 focus:hover:border-transparent hover:bg-neutral-900 focus:outline-2 text-neutral-50 placeholder:text-neutral rounded-md px-3 py-2 duration-100"
						/>
					</div>
					<div className="flex flex-col gap-1 col-span-2">
						<textarea
							required
							name="message"
							placeholder={t("message")}
							aria-label="message field"
							maxLength={2000}
							rows={7}
							onChange={(e) => {
								setFormData({ ...formData, message: e.target.value });
							}}
							className="bg-neutral-950 focus:bg-neutral-950 border focus:border-transparent focus:outline outline-green border-neutral-900 hover:border-neutral-800 focus:hover:border-transparent hover:bg-neutral-900 focus:outline-2 text-neutral-50 placeholder:text-neutral rounded-md px-3 py-2 duration-100 resize-none"
						/>
					</div>
					<Button
						onClick={(e) => {
							handleSubmit(e);
						}}
						disabled={invalidInput}
						color={failed ? "yellow" : "green"}
					>
						{sending ? t("sending") : failed ? t("retry") : t("send")}
						{sending ? <Loader2 size={16} className="animate-spin" /> : failed && <WarningTriangle />}
					</Button>
				</form>
			</a.div>
		) : (
			<a.div
				style={styles}
				className="min-h-[396px] md:min-h-[378px] flex flex-col gap-3 items-center justify-center text-center"
			>
				<h1 className="font-display font-medium inline-flex gap-3 items-center">
					<span>
						{t("sent")}
						<span className="text-green">.</span>{" "}
					</span>
					<Check
						strokeWidth={2}
						size="1em"
						strokeLinejoin="miter"
						strokeLinecap="square"
						className="animate-lucide-check-draw-in"
						strokeDasharray={24}
					/>
				</h1>
				<p>{t("sentText")}</p>
			</a.div>
		)
	);
}
