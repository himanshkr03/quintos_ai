// File: E:\quintos_ai\lib\services\email\templates\inquiryConfirmation.ts

import { SITE } from "@/constants/site";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildInquiryConfirmationHtml(
  inquiryId: string,
  name: string,
  subject: string
): string {
  const safeName = escapeHtml(name);
  const safeSubject = escapeHtml(subject);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Inquiry Received - Quintos AI</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; padding: 24px; color: #0f172a;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 20px;">
      <h2 style="margin: 0; font-size: 20px; color: #1e293b;">QUINTOS AI</h2>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">Research. Intelligence. Innovation. Advanced Computing.</p>
    </div>

    <p style="font-size: 14px; line-height: 1.6; color: #1e293b;">Hello ${safeName},</p>

    <p style="font-size: 14px; line-height: 1.6; color: #334155;">
      Thank you for contacting Quintos AI. We have received your inquiry and recorded it in our system.
    </p>

    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; margin: 18px 0;">
      <p style="margin: 0; font-size: 12px; font-family: monospace; color: #475569;">
        <strong>Inquiry Reference ID:</strong> ${inquiryId}
      </p>
      <p style="margin: 6px 0 0 0; font-size: 12px; color: #475569;">
        <strong>Subject:</strong> ${safeSubject}
      </p>
    </div>

    <p style="font-size: 14px; line-height: 1.6; color: #334155;">
      Our engineering and research team will review the details you provided. If additional scoping or technical notes are required, we will reach out directly to this email address.
    </p>

    <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-top: 24px;">
      Regards,<br>
      <strong>Quintos AI Research Laboratory</strong><br>
      <span style="font-size: 12px; color: #64748b;">Based in Mohali, Punjab, India</span>
    </p>

    <div style="border-top: 1px solid #e2e8f0; padding-top: 14px; margin-top: 24px; font-size: 11px; color: #94a3b8;">
      Official Contact: <a href="mailto:${SITE.email}" style="color: #2563eb;">${SITE.email}</a> &bull; 
      <a href="https://github.com/Quintos-AI" style="color: #2563eb;">GitHub</a> &bull; 
      <a href="https://www.linkedin.com/company/quintos-ai/" style="color: #2563eb;">LinkedIn</a>
    </div>
  </div>
</body>
</html>
`;
}
