import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD,
  },
  connectionTimeout: 10000,
});

transporter.verify()
  .then(() => console.log("SMTP server ready"))
  .catch(err => console.error("SMTP error:", err));

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async ({ to, subject, html, text }: SendEmailParams) => {
  return await transporter.sendMail({
    from: '"Medi Store" <mediStore@gg.email>',
    to,
    subject,
    html,
    text: text || "Please enable HTML to view this email.",
  });
};