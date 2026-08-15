// File: E:\quintos_ai\lib\services\email\emailService.ts

import { Resend } from "resend";
import { ContactFormData } from "@/lib/validations/inquiry";
import { buildInquiryNotificationHtml } from "./templates/inquiryNotification";
import { buildInquiryConfirmationHtml } from "./templates/inquiryConfirmation";
import { SITE } from "@/constants/site";

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  skipped?: boolean;
}

export class EmailService {
  private resend: Resend | null = null;
  private fromAddress: string;
  private notificationRecipient: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey && apiKey.trim().length > 0) {
      this.resend = new Resend(apiKey);
    }
    // Default sender (can be customized via FROM_EMAIL once domain is verified on Resend)
    this.fromAddress = process.env.FROM_EMAIL || "Quintos AI <inquiries@quintos.ai>";
    this.notificationRecipient =
      process.env.CONTACT_NOTIFICATION_EMAIL || SITE.email;
  }

  /**
   * Sends an internal notification email to the Quintos AI team.
   */
  async sendInquiryNotification(
    inquiryId: string,
    data: ContactFormData,
    createdAt: Date = new Date()
  ): Promise<EmailSendResult> {
    if (!this.resend) {
      // Safe fallback when Resend credentials are not configured
      console.log(
        `[Email Service]: Internal notification skipped for inquiry ${inquiryId} (RESEND_API_KEY not configured).`
      );
      return { success: false, skipped: true, error: "RESEND_API_KEY not configured." };
    }

    try {
      const htmlContent = buildInquiryNotificationHtml(inquiryId, data, createdAt);
      const subject = `[New Inquiry] ${data.inquiryType.toUpperCase()}: ${data.subject}`;

      const { data: resData, error } = await this.resend.emails.send({
        from: this.fromAddress,
        to: [this.notificationRecipient],
        replyTo: data.email,
        subject,
        html: htmlContent,
      });

      if (error) {
        console.error(`[Email Service Error - Notification]:`, error.message);
        return { success: false, error: error.message };
      }

      return { success: true, messageId: resData?.id };
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Unknown email error";
      console.error(`[Email Service Exception - Notification]:`, errMsg);
      return { success: false, error: errMsg };
    }
  }

  /**
   * Sends a receipt confirmation email to the user.
   */
  async sendInquiryConfirmation(
    inquiryId: string,
    data: ContactFormData
  ): Promise<EmailSendResult> {
    if (!this.resend) {
      console.log(
        `[Email Service]: User confirmation skipped for inquiry ${inquiryId} (RESEND_API_KEY not configured).`
      );
      return { success: false, skipped: true, error: "RESEND_API_KEY not configured." };
    }

    try {
      const htmlContent = buildInquiryConfirmationHtml(
        inquiryId,
        data.name,
        data.subject
      );
      const subject = `Quintos AI — Inquiry Received (Ref: ${inquiryId})`;

      const { data: resData, error } = await this.resend.emails.send({
        from: this.fromAddress,
        to: [data.email],
        subject,
        html: htmlContent,
      });

      if (error) {
        console.error(`[Email Service Error - Confirmation]:`, error.message);
        return { success: false, error: error.message };
      }

      return { success: true, messageId: resData?.id };
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Unknown email error";
      console.error(`[Email Service Exception - Confirmation]:`, errMsg);
      return { success: false, error: errMsg };
    }
  }
}

export const emailService = new EmailService();
