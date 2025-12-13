"use server";
import nodemailer from "nodemailer";
import sanitizeHtml from "sanitize-html";

export async function submitForm(formData: { name: string; email: string; subject: string; message: string }) {
  // So I don't have to type formData. in front of every variable.
  const { name, email, subject, message } = formData;

  // Death if the environment variable EMAIL_API_ENABLED is not set to "true".
  if (process.env.EMAIL_API_ENABLED !== "true") {
    throw new Error("API currently disabled.");
  }

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
    throw new Error("Invalid form data.");
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
    }
  });

  // Email headers and message content.
  const mailOptions = {
    from: process.env.EMAIL_RECIPIENT,
    replyTo: sanitizedEmail,
    to: process.env.EMAIL_RECIPIENT,
    subject: `"${sanitizedSubject}" via pprmint.de`,
    text: `Name:\n${sanitizedName}\n\nEmail address:\n${sanitizedEmail}\n\n${sanitizedMessage}`,
    html: `<p>Message from <b>${sanitizedName}</b> <a href="mailto:${sanitizedEmail}">&lt;${sanitizedEmail}&gt;</a></p><hr><h1>${sanitizedSubject}</h1><p>${sanitizedMessage}</p><hr>`,
  };

  // Send email.
  await transporter.sendMail(mailOptions);
}
