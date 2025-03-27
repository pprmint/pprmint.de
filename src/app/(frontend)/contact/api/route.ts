import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import sanitizeHtml from "sanitize-html";

export async function POST(request: NextRequest) {
	// Death if the environment variable EMAIL_FORM_ENABLED is not set to "true".
	if (process.env.EMAIL_API_ENABLED != "true") {
		return NextResponse.json({ error: "API currently disabled." }, { status: 503 });
	}

	// Get request in JSON format with these fields.
	const { name, email, subject, message } = await request.json();

	// Check email address against regular expression.
	const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

	// Validate form data (deny if fields are emptry or above character limit and if email doesn't match regex above).
	if (
		name === "" ||
		name.length > 30 ||
		email === "" ||
		email.length > 50 ||
		subject === "" ||
		subject.length > 100 ||
		message === "" ||
		message.length > 2000 ||
		!emailRegex.test(email)
	) {
		return NextResponse.json({ error: "Bad request. Terrible even." }, { status: 400 });
	}

	// Sanitize field input, removing HTML tags and attributes.
	function sanitizeInput(input: string) {
		return sanitizeHtml(input, {
			allowedTags: [],
			allowedAttributes: {},
		});
	}
	// Sanitized strings
	const sanitizedName = sanitizeInput(name);
	const sanitizedEmail = sanitizeInput(email);
	const sanitizedSubject = sanitizeInput(subject);
	const sanitizedMessage = sanitizeInput(message);

	// Email transporter.
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT),
		secure: true,
		auth: {
			user: process.env.SMTP_USERNAME,
			pass: process.env.SMTP_PASSWORD,
		},
	});

	// Email headers and message content.
	const mailOptions: Mail.Options = {
		from: process.env.EMAIL_RECIPIENT,
		replyTo: sanitizedEmail,
		to: process.env.EMAIL_RECIPIENT,
		subject: `"${sanitizedSubject}" via pprmint.de`,
		text: `Name:\n${sanitizedName}\n\nEmail address:\n${sanitizedEmail}\n\n${sanitizedMessage}`,
		html: `<p>Message from <b>${sanitizedName}</b> <a href="mailto:${sanitizedEmail}">&lt;${sanitizedEmail}&gt;</a></p><hr><h1>${sanitizedSubject}</h1><p>${sanitizedMessage}</p><hr>`,
	};

	// Function to create a promise for the sending of an email.
	function sendMailPromise() {
		return new Promise<string>((resolve, reject) => {
			transporter.sendMail(mailOptions, function (death) {
				if (!death) {
					resolve("Email sent. Hooray.");
				} else {
					reject(death.message);
				}
			});
		});
	}

	try {
		await sendMailPromise();
		return NextResponse.json({ message: "Email sent. Hooray." });
	} catch (death) {
		return NextResponse.json({ error: death }, { status: 500 });
	}
}
