"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "Tailored Furnitures <commissions@tailoredfurnitures.com>";
const SUPPORT = "commissions@tailoredfurnitures.com";

export async function notifyAdminOfCommission({
  name,
  email,
  projectScope,
  woodType,
  dimensions,
  brief,
}) {
  await resend.emails.send({
    from: FROM,
    to: SUPPORT,
    subject: `New Commission Request — ${name}`,
    html: `
      <p>A new commission request has been submitted.</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Project Scope:</strong> ${projectScope}</li>
        <li><strong>Material:</strong> ${woodType}</li>
        <li><strong>Dimensions:</strong> ${dimensions}</li>
        <li><strong>Brief:</strong> ${brief}</li>
      </ul>
    `,
  });
}

export async function notifyClientOfCommission({ name, email }) {
  await resend.emails.send({
    from: FROM,
    to: email,
    replyTo: SUPPORT,
    subject: `We've received your commission request, ${name}!`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px;">
        <h2>Thank you, ${name}!</h2>
        <p>We've received your custom furniture request and our team will review your specifications.</p>
        <p>You can expect to hear back from us within <strong>48 business hours</strong>.</p>
        <p style="color: #888; font-size: 13px;">— Tailored Furnitures Studio</p>
      </div>
    `,
  });
}
