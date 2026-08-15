// File: E:\quintos_ai\lib\services\email\templates\inquiryNotification.ts

import { ContactFormData } from "@/lib/validations/inquiry";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildInquiryNotificationHtml(
  inquiryId: string,
  data: ContactFormData,
  createdAt: Date
): string {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeOrg = escapeHtml(data.organization || "Not Specified");
  const safeType = escapeHtml(data.inquiryType);
  const safeSubject = escapeHtml(data.subject);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br/>");
  const safeArea = escapeHtml(data.researchArea || "N/A");
  const safeTimeline = escapeHtml(data.timeline || "N/A");
  const safePlan = escapeHtml(data.plan || "N/A");
  const safePosition = escapeHtml(data.position || "N/A");
  const formattedTime = createdAt.toUTCString();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Inquiry Received - Quintos AI</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; padding: 24px; color: #0f172a;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 20px;">
      <h2 style="margin: 0; font-size: 18px; color: #1e293b;">QUINTOS AI &bull; Internal Inquiry Notification</h2>
      <p style="margin: 4px 0 0 0; font-size: 12px; font-family: monospace; color: #64748b;">Reference ID: ${inquiryId}</p>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px;">
      <tr>
        <td style="padding: 6px 0; font-weight: bold; width: 140px; color: #475569;">From Name:</td>
        <td style="padding: 6px 0; color: #0f172a;">${safeName}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-weight: bold; color: #475569;">Email Address:</td>
        <td style="padding: 6px 0; color: #0f172a;"><a href="mailto:${safeEmail}" style="color: #2563eb;">${safeEmail}</a></td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-weight: bold; color: #475569;">Organization:</td>
        <td style="padding: 6px 0; color: #0f172a;">${safeOrg}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-weight: bold; color: #475569;">Domain Category:</td>
        <td style="padding: 6px 0; color: #0f172a;">${safeType}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; font-weight: bold; color: #475569;">Subject:</td>
        <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${safeSubject}</td>
      </tr>
      ${data.researchArea ? `<tr><td style="padding: 6px 0; font-weight: bold; color: #475569;">Research Area:</td><td style="padding: 6px 0; color: #0f172a;">${safeArea}</td></tr>` : ""}
      ${data.timeline ? `<tr><td style="padding: 6px 0; font-weight: bold; color: #475569;">Timeline:</td><td style="padding: 6px 0; color: #0f172a;">${safeTimeline}</td></tr>` : ""}
      ${data.plan ? `<tr><td style="padding: 6px 0; font-weight: bold; color: #475569;">Plan Context:</td><td style="padding: 6px 0; color: #0f172a;">${safePlan}</td></tr>` : ""}
      ${data.position ? `<tr><td style="padding: 6px 0; font-weight: bold; color: #475569;">Position:</td><td style="padding: 6px 0; color: #0f172a;">${safePosition}</td></tr>` : ""}
      <tr>
        <td style="padding: 6px 0; font-weight: bold; color: #475569;">Submitted UTC:</td>
        <td style="padding: 6px 0; font-family: monospace; font-size: 11px; color: #64748b;">${formattedTime}</td>
      </tr>
    </table>

    <div style="background-color: #f1f5f9; border-radius: 8px; padding: 16px; margin-top: 16px;">
      <h4 style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #475569;">Technical Scope / Message Content:</h4>
      <div style="font-size: 13px; line-height: 1.6; color: #1e293b;">
        ${safeMessage}
      </div>
    </div>
  </div>
</body>
</html>
`;
}
