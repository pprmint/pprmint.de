import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { useTransition, a, config, easings } from "@react-spring/web";
import * as Select from "@radix-ui/react-select";
import * as Portal from "@radix-ui/react-portal";
import FocusTrap from "focus-trap-react";

import Head from "components/Head";
import Title from "components/Title";
import Button from "components/Button";
import Chatbox from "components/Chatbox";

import TitleBackground1 from "public/assets/contact/chat_left.svg";
import TitleBackground2 from "public/assets/contact/chat_right.svg";
import TwitterBackground from "public/assets/contact/kenny-eliason-8Yk4T-tDSYY-unsplash.jpg";
import EmailBackground from "public/assets/contact/sigmund-jZXZvw2CdqY-unsplash.jpg";

import Letter from "public/assets/contact/letter.svg";
import Bubbles from "public/assets/contact/bubbles.svg";
import PaperPlane from "public/assets/contact/paperplane.svg";

function Form() {
	const { t } = useTranslation();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "general",
		message: "",
	});
	const Subjects = ["general", "terms", "commission", "privacy"];
	const [sending, setSending] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [failed, setFailed] = useState(false);

	// More precisely, I hate having to prepare everything before I can even consider offering them.
	const iHateCommissions = formData.subject === "commission";

	// Regular expression to validate email addresses.
	const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

	const invalidInput =
		iHateCommissions ||
		sending ||
		submitted ||
		formData.name === "" ||
		formData.email === "" ||
		!emailRegex.test(formData.email) ||
		formData.message === "";

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		console.log("Sending...");
		setFailed(false);
		setSending(true);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data.message); // Success message from the API
				setSubmitted(true);
				setSending(false);
			} else {
				console.error("Message failed to send");
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
		},
		enter: {
			opacity: 1,
			duration: 100,
		},
		leave: {
			opacity: 0,
			duration: 100,
			config: config.stiff,
		},
		exitBeforeEnter: true,
	});

	useEffect(() => {
		if (formData.message.length === 2000) {
			window.open("/assets/aintreadinalldat.png");
		}
	}, [formData]);

	return submitTransition((styles, item) =>
		!item ? (
			<a.form style={styles} className="grid grid-cols-2 gap-6">
				<div className="flex flex-col gap-1 col-span-2 md:col-span-1">
					<label htmlFor="name">{t("CONTACT:Content.Email.Form.name")}</label>
					<input
						required
						type="text"
						name="name"
						onChange={(e) => {
							setFormData({ ...formData, name: e.target.value });
						}}
						maxLength={50}
						disabled={iHateCommissions}
						className="w-full rounded-md outline focus:outline outline-1 focus:outline-2 text-neutral-50 outline-neutral-900 focus:outline-green bg-neutral-950/50 hover:bg-neutral-900/50 focus:bg-neutral-950 backdrop-blur-md px-3 py-2 duration-100 disabled:outline-dotted disabled:hover:bg-transparent disabled:cursor-not-allowed"
					/>
				</div>
				<div className="flex flex-col gap-1 col-span-2 md:col-span-1">
					<label htmlFor="email">{t("CONTACT:Content.Email.Form.emailAddress")}</label>
					<input
						required
						type="text"
						name="email"
						aria-label={t("CONTACT:Content.Email.Form.emailAddress")}
						onChange={(e) => {
							setFormData({ ...formData, email: e.target.value });
						}}
						maxLength={50}
						disabled={iHateCommissions}
						className="w-full rounded-md outline focus:outline outline-1 focus:outline-2 text-neutral-50 outline-neutral-900 focus:outline-green bg-neutral-950/50 hover:bg-neutral-900/50 focus:bg-neutral-950 backdrop-blur-md px-3 py-2 duration-100 disabled:outline-dotted disabled:hover:bg-transparent disabled:cursor-not-allowed"
					/>
				</div>
				<div className="flex flex-col gap-1 col-span-2">
					<label htmlFor="subject">{t("CONTACT:Content.Email.Form.Subject.title")}</label>
					<Select.Root
						value={formData.subject}
						onValueChange={(value) => {
							setFormData({ ...formData, subject: value });
						}}
					>
						<Select.Trigger
							aria-label={t("CONTACT:Content.Email.Form.Subject.title")}
							className={`flex justify-between w-full rounded-md outline focus:outline outline-1 focus:outline-2 text-neutral-50 ${
								iHateCommissions
									? "outline-red-800 focus:neutral-950/50 bg-red-900/50 hover:bg-neutral-950 backdrop-blur-md-800"
									: "outline-neutral-900 bg-neutral-950/50 hover:bg-neutral-900/50 focus:bg-neutral-950 backdrop-blur-md"
							} focus:bg-transparent px-3 py-2 duration-100`}
						>
							<Select.Value aria-label={formData.subject} />
							<Select.Icon>
								<i className="ri-arrow-down-s-line" />
							</Select.Icon>
						</Select.Trigger>
						<Select.Portal>
							<Select.Content className="z-50 text-neutral p-1 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-950 ring-1 ring-inset ring-neutral-50/10 shadow-xl shadow-neutral-950/50 rounded-lg data-[state=open]:animate-select-open">
								<Select.ScrollUpButton className="absolute z-50 top-0 left-0 right-0 flex justify-center bg-gradient-to-b from-neutral-900/50 text-neutral-50 rounded-t-md">
									<i className="ri-arrow-up-s-line" />
								</Select.ScrollUpButton>
								<Select.Viewport className="p-1">
									<Select.Group>
										{Subjects.map((subject) => (
											<Select.Item
												key={subject}
												value={subject}
												className="group relative flex items-center gap-3 pr-2 pl-2 data-[highlighted]:pl-3 h-8 rounded-sm leading-none select-none outline-none data-[disabled]:text-neutral data-[disabled]:pointer-events-none data-[highlighted]:text-neutral-50 data-[state=checked]:text-neutral-50 data-[highlighted]:bg-neutral-50/10 active:opacity-75 duration-100 cursor-pointer focus-visible:outline-none"
											>
												<Select.ItemText className="flex-grow">
													{t(`CONTACT:Content.Email.Form.Subject.${subject}`)}
												</Select.ItemText>
												<Select.ItemIndicator className="ml-auto">
													<i className="ri-check-line" />
												</Select.ItemIndicator>
											</Select.Item>
										))}
									</Select.Group>
								</Select.Viewport>
								<Select.ScrollDownButton className="absolute z-50 bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-neutral-900/50 text-neutral-50 rounded-b-md">
									<i className="ri-arrow-down-s-line" />
								</Select.ScrollDownButton>
							</Select.Content>
						</Select.Portal>
					</Select.Root>
					{iHateCommissions && (
						<p className="text-red mt-3">
							<i className="ri-alert-line mr-3" />
							{t("CONTACT:Content.Email.Form.noCommissions")}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-1 col-span-2">
					<label htmlFor="message">{t("CONTACT:Content.Email.Form.message")}</label>
					<textarea
						required
						name="message"
						rows={3}
						onChange={(e) => {
							setFormData({ ...formData, message: e.target.value });
						}}
						maxLength={2000}
						disabled={iHateCommissions}
						className="resize-none w-full rounded-md outline focus:outline outline-1 focus:outline-2 text-neutral-50 outline-neutral-900 focus:outline-green bg-neutral-950/50 hover:bg-neutral-900/50 focus:bg-neutral-950 backdrop-blur-md px-3 py-2 duration-100 disabled:outline-dotted disabled:hover:bg-transparent disabled:cursor-not-allowed"
						aria-label={t("CONTACT:Content.Email.Form.message")}
					/>
				</div>
				<Button onClick={handleSubmit} disabled={invalidInput} color={failed ? "red" : "green"}>
					{t(
						sending
							? "CONTACT:Content.Email.Form.sending"
							: failed
							? "CONTACT:Content.Email.Form.retry"
							: "CONTACT:Content.Email.Form.send"
					)}
					<div className={sending ? "animate-spin" : "animate-none"}>
						{sending ? (
							<i className="ri-loader-4-line" />
						) : failed ? (
							<i className="ri-refresh-line" />
						) : (
							<i className="ri-send-plane-line" />
						)}
					</div>
				</Button>
				<hr className="col-span-2 border-dotted border-neutral-800 border-t-2 md:my-3" />
				<p className="text-xs text-neutral">
					{t("CONTACT:Content.Email.preferMailto")}
					<Link
						href={`mailto:mail@pprmint.art?subject=${t("CONTACT:Content.Message.subject")}&body=${t(
							"CONTACT:Content.Message.body"
						)}`}
						className="text-green underline decoration-dotted hover:decoration-solid decoration-green-800 hover:decoration-green"
					>
						mail@pprmint.art
					</Link>
				</p>
			</a.form>
		) : (
			<a.div style={styles} className="w-full h-full flex flex-col gap-3 items-center justify-center text-center">
				<h1>
					{t("CONTACT:Content.Email.Form.sent")} <i className="ri-check-line text-green" />
				</h1>
				<p>{t("CONTACT:Content.Email.Form.sentText")}</p>
			</a.div>
		)
	);
}

export default function Contact() {
	const { t } = useTranslation();
	const [formVisible, setFormVisible] = useState(false);
	const [transitionDirection, setTransitionDirection] = useState<"left" | "right">("left");
	const isDesktop = useMediaQuery({ minWidth: 768 });

	const formTransition = useTransition(formVisible, {
		key: formVisible,
		from: {
			opacity: 0,
			x: isDesktop ? (transitionDirection === "right" ? -40 : 40) : 0,
			scale: isDesktop ? 1 : 0.95,
		},
		enter: {
			delay: 150,
			opacity: 1,
			x: 0,
			scale: 1,
			config: { duration: 750, easing: easings.easeOutExpo },
		},
		leave: {
			opacity: 0,
			config: {
				duration: 250,
				easing: easings.easeOutCirc,
			},
		},
	});

	function handleOpen() {
		if (!formVisible) {
			setTransitionDirection("right");
			setFormVisible(true);
		}
	}

	function handleClose() {
		setTransitionDirection("left");
		setFormVisible(false);
	}

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

	return (
		<>
			<Head title={t("CONTACT:Head.title")} description={t("CONTACT:Head.description")} />
			<Title
				title={t("CONTACT:Head.title")}
				description={t("CONTACT:Head.description")}
				accentColor={formVisible ? "text-green" : "text-blue"}
			>
				<Image src={TitleBackground1} alt="" fill className="object-cover" />
				<Image
					src={TitleBackground2}
					alt=""
					fill
					className={`object-cover ${formVisible ? "invert-[100%] saturate-[240%] opacity-75" : ""} duration-500`}
				/>
			</Title>
			<main>
				<section className="max-w-7xl mx-auto my-24 px-6 md:px-9 flex flex-col items-center justify-center">
					<h2>{t("CONTACT:Content.Mina.heading")}</h2>
					<p className="pb-6">{t("CONTACT:Content.Mina.text")}</p>
					<button
						onClick={handleChatboxOpen}
						className="group relative flex items-center border-2 border-neutral hover:border-transparent rounded-md rounded-tl-xl rounded-br-xl hover:rounded-md duration-500 ease-out-expo"
					>
						<div className="absolute z-0 flex items-center w-full h-full overflow-hidden group-hover:blur-lg duration-200">
							<div
								className="absolute w-full aspect-square opacity-0 group-hover:opacity-100 rounded-full animate-slow-spin duration-200"
								style={{
									backgroundImage: "conic-gradient(#f44, #f71, #fb0, #9c3, #0c6, #2cf, #29f, #95e, #e6b, #f44)",
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
							{t("CONTACT:Content.Mina.askMina")}
						</div>
					</button>
				</section>
				<section className="group relative w-full min-h-2/3-screen overflow-clip">
					<div className="max-w-7xl mx-auto px-6 md:px-9 py-9 h-full">
						<h2>Email</h2>
						<p className="pb-9">
							The classic. Send me a message through the following form and one day I'll send you a response back.
						</p>
						<Form />
					</div>
					<Image
						src={Letter}
						alt=""
						className="absolute -z-10 w-1/2 md:w-1/4 h-auto bottom-0 right-0 md:right-48 scale-90 group-hover:scale-100 opacity-25 group-hover:opacity-50 origin-bottom-right duration-500 ease-in-out"
					/>
				</section>
				<section className="group relative w-full min-h-1/3-screen overflow-clip">
					<div className="max-w-7xl mx-auto px-6 md:px-9 py-9 h-full">
						<h2>Telegram</h2>
						<p className="pb-9">Telegram</p>
					</div>
					<Image
						src={PaperPlane}
						alt=""
						className="absolute -z-10 w-1/2 md:w-1/4 h-auto top-0 md:top-1/2 md:-translate-y-1/2 right-0 md:right-48 scale-90 group-hover:scale-100 opacity-25 group-hover:opacity-50 origin-bottom-right duration-500 ease-in-out"
					/>
				</section>
				<section className="group relative w-full min-h-1/3-screen overflow-clip">
					<div className="max-w-7xl mx-auto px-6 md:px-9 py-9 h-full">
						<h2>{t("CONTACT:Content.twitter")}</h2>
						<p className="pb-9">Twitter</p>
						<Link
							href="https://twitter.com/messages/compose?recipient_id=1571518236394397699"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button color="blue">
								<i className="ri-twitter-line" />
								Nachricht schreiben
							</Button>
						</Link>
					</div>
					<Image
						src={Bubbles}
						alt=""
						className="absolute -z-10 w-1/2 md:w-1/4 h-auto top-0 md:top-1/2 md:-translate-y-1/2 right-0 md:right-48 scale-90 group-hover:scale-100 opacity-25 group-hover:opacity-50 origin-bottom-right duration-500 ease-in-out"
					/>
				</section>
			</main>
			{chatTransition((styles, item) =>
				item ? (
					<FocusTrap active={chatVisible}>
						<Portal.Root className="fixed flex items-center justify-center z-50 inset-0">
							<a.div
								onClick={handleChatboxClose}
								style={{ opacity: styles.opacity }}
								className="absolute inset-0 bg-neutral-950/75"
							/>
							<a.div style={styles} className="relative w-full max-w-lg">
								<Chatbox onClose={handleChatboxClose} />
								<button
									className="absolute z-50 top-4 md:top-5 right-4 md:right-5 text-neutral-50 w-10 h-10 rounded-full bg-neutral-50/10 hover:bg-neutral-50/20 duration-100 text-xl"
									onClick={handleChatboxClose}
								>
									<i className="ri-close-line" />
								</button>
							</a.div>
						</Portal.Root>
					</FocusTrap>
				) : null
			)}
		</>
	);
}
