import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD,
  },
});

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