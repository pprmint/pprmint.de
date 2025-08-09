"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import WarningTriangle from "@/icons/WarningTriangle";
import { useTranslations } from "next-intl";
import FadingImage from "@/components/ui/FadingImage";
import * as m from "motion/react-m";

import PixelMina from "/public/assets/mina64.gif";
import { AnimatePresence } from "motion/react";
import { Link } from "next-transition-router";
import { submitForm } from "./submitForm";

export default function Form() {
	const t = useTranslations("CONTACT.Content.Email");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [sending, setSending] = useState(false);
	const [submitted, setSubmitted] = useState(true);
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
		setFailed(false);
		setSending(true);
		try {
			await submitForm(formData);
			setSubmitted(true);
		} catch (error: any) {
			setFailed(true);
			console.log(`Failed to send email: ${error.message}`);
		}
	}

	return (
		<AnimatePresence mode="wait">
			{!submitted ? (
				<m.div
					key="form"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { ease: "linear", duration: 0.2 } }}
					exit={{ opacity: 0, transition: { ease: "linear", duration: 0.2 } }}
					className="relative"
				>
					<AnimatePresence>
						{sending && (
							<m.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { ease: "linear", duration: 0.2 } }}
								exit={{ opacity: 0, transition: { ease: "linear", duration: 0.2 } }}
								className="absolute inset-0 z-20 bg-white/75 dark:bg-neutral-950/75 flex items-center justify-center"
							>
								<FadingImage
									src={PixelMina}
									alt=""
									className="size-32"
									style={{ imageRendering: "pixelated" }}
								/>
							</m.div>
						)}
					</AnimatePresence>
					<form className="grid grid-cols-2">
						<div className="col-span-2 sm:col-span-1 sm:border-r border-t sm:border-b border-black/5 dark:border-white/5">
							<input
								required
								type="text"
								placeholder={t("Form.name")}
								name="name"
								aria-label="name text field"
								maxLength={30}
								onChange={(e) => {
									setFormData({ ...formData, name: e.target.value });
								}}
								className="w-full bg-transparent hover:bg-black/5 dark:hover:bg-white/5 hover:focus:bg-transparent outline-hidden focus:outline-hidden text-neutral-950 dark:text-white placeholder:text-neutral px-3 h-9 duration-100"
							/>
						</div>
						<div className="col-span-2 sm:col-span-1 border-y border-black/5 dark:border-white/5">
							<input
								required
								type="text"
								placeholder={t("Form.emailAddress")}
								name="email"
								aria-label="email address text field"
								maxLength={50}
								onChange={(e) => {
									setFormData({ ...formData, email: e.target.value });
								}}
								className="w-full bg-transparent hover:bg-black/5 dark:hover:bg-white/5 hover:focus:bg-transparent outline-hidden focus:outline-hidden text-neutral-950 dark:text-white placeholder:text-neutral px-3 h-9 duration-100"
							/>
						</div>
						<div className="col-span-2 border-b border-black/5 dark:border-white/5">
							<input
								required
								type="text"
								placeholder={t("Form.subject")}
								name="subject"
								aria-label="subject text field"
								maxLength={100}
								onChange={(e) => {
									setFormData({ ...formData, subject: e.target.value });
								}}
								className="w-full bg-transparent hover:bg-black/5 dark:hover:bg-white/5 hover:focus:bg-transparent outline-hidden focus:outline-hidden text-neutral-950 dark:text-white placeholder:text-neutral px-3 h-9 duration-100"
							/>
						</div>
						<div className="col-span-2">
							<textarea
								required
								name="message"
								placeholder={t("Form.message")}
								aria-label="message field"
								maxLength={2000}
								rows={7}
								onChange={(e) => {
									setFormData({ ...formData, message: e.target.value });
								}}
								className="size-full bg-transparent hover:bg-black/5 dark:hover:bg-white/5 hover:focus:bg-transparent outline-hidden focus:outline-hidden text-neutral-950 dark:text-white placeholder:text-neutral px-3 py-1.5 duration-100 resize-none"
							/>
						</div>
						<div className="col-span-2 flex flex-col sm:flex-row-reverse items-center justify-between">
							<Button
								onClick={(e) => {
									handleSubmit(e);
								}}
								disabled={invalidInput}
								design="filled"
								color={failed ? "yellow" : "green"}
							>
								{failed && <WarningTriangle />}
								{sending ? t("Form.sending") : failed ? t("Form.retry") : t("Form.send")}
							</Button>
							<p className="text-xs sm:ml-3 my-3 sm:my-0">
								{t.rich("preferMailto", {
									Link: (chunks) => (
										<Link
											href={`mailto:${chunks}?subject=${t("Message.subject")}&body=${t(
												"Message.body"
											)}`}
											className="text-link"
										>
											{chunks}
										</Link>
									),
								})}
							</p>
						</div>
					</form>
				</m.div>
			) : (
				<m.div
					key="confirm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { ease: "linear", duration: 0.2 } }}
					exit={{ opacity: 0, transition: { ease: "linear", duration: 0.2 } }}
					className="min-h-[349px] sm:min-h-[293px] flex flex-col gap-3 items-center justify-center text-center"
				>
					<h1 className="pb-0">
						<span>
							{t("Form.sent")}
							<span className="text-green">.</span>{" "}
						</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.25"
							strokeLinecap="butt"
							strokeLinejoin="miter"
							className="size-[1em] inline stroke-neutral-950 dark:stroke-white"
						>
							<m.path
								d="M 4 12 L 9 17 L 20 6"
								initial={{ pathLength: 0 }}
								animate={{
									pathLength: 1,
									transition: {
										delay: 0.3,
										type: "spring",
										duration: 0.5,
										bounce: 0,
									},
								}}
							/>
						</svg>
					</h1>
					<p>{t("Form.sentText")}</p>
				</m.div>
			)}
		</AnimatePresence>
	);
}
