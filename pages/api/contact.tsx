import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import sanitizeHtml from "sanitize-html";

// Function to sanitize field input.
function sanitizeInput(input: string) {
	return sanitizeHtml(input, {
		allowedTags: [],
		allowedAttributes: {},
	});
}

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
	// Disable API if this env variable is not set to true.
	if (process.env.EMAIL_API_ENABLED != "true") {
		return res.status(503).json({ error: "API is currently disabled." });
	}

	if (req.method === "POST") {
		const { name, email, subject, message } = req.body;
		// Check email address against regular expression.
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
		// Validate form data (deny if fields are emptry or above character limit and if email doesn't match regex above).
		if (
			name === "" ||
			name.length > 50 ||
			email === "" ||
			email.length > 50 ||
			!["general", "terms", "commission", "privacy"].includes(subject) ||
			message === "" ||
			message.length > 2000 ||
			!emailRegex.test(email)
		) {
			return res.status(400).json({ error: "Bad request. What were you trying to do...?" });
		}

		// Sanitized strings
		const sanitizedName = sanitizeInput(name);
		const sanitizedEmail = sanitizeInput(email);
		const sanitizedMessage = sanitizeInput(message);

		try {
			const transporter = nodemailer.createTransport({
				host: process.env.SMTP_HOST,
				port: Number(process.env.SMTP_PORT),
				secure: true,
				auth: {
					user: process.env.SMTP_USERNAME,
					pass: process.env.SMTP_PASSWORD,
				},
			});

			const mailOptions = {
				from: process.env.EMAIL_RECIPIENT,
				to: process.env.EMAIL_RECIPIENT,
				replyTo: sanitizedEmail,
				subject: `${sanitizedName} via pprmint.art - ${
					subject === "general"
						? "Allgemeine Nachricht"
						: subject === "terms"
						? "Nachricht bzgl. Nutzungsbedingungen"
						: subject === "commission"
						? "Nachricht oder Anfrage bzgl. Auftragsarbeit"
						: subject === "privacy"
						? "Nachricht zum Datenschutz"
						: "Nachricht"
				}`,
				text: `Nachricht von ${sanitizedName} <${sanitizedEmail}>\n\n${sanitizedMessage}`,
				html: `<p>Nachricht von <b>${sanitizedName}</b> <a href="mailto:${sanitizedEmail}">&lt;${sanitizedEmail}&gt;</a></p><hr><h1>${
					subject === "general"
						? "Allgemeine Nachricht"
						: subject === "terms"
						? "Nachricht bzgl. Nutzungsbedingungen"
						: subject === "commission"
						? "Nachricht oder Anfrage bzgl. Auftragsarbeit"
						: subject === "privacy"
						? "Nachricht zum Datenschutz"
						: "Nachricht"
				}</h1>${sanitizedMessage}<hr style="margin-top:1rem"><sub>Diese Nachricht wurde über das Kontaktformular auf pprmint.art versendet. Die Email-Adresse könnte ungültig sein.</sub>`,
			};

			await transporter.sendMail(mailOptions);

			res.status(200).json({ message: "Message sent. Good job, me, for building a functional email form." });
		} catch (error) {
			console.error("Error sending email:", error);
			res.status(500).json({ error: "Failed to send message." });
		}
	} else {
		res.status(405).json({ error: "Method not allowed." });
	}
}
