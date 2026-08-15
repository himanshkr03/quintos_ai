// File: E:\quintos_ai\lib\services\inquiries\inquiryService.ts

import prisma from "@/lib/db/prisma";
import { ContactFormData } from "@/lib/validations/inquiry";

export class InquiryService {
  /**
   * Creates a new Inquiry record from validated contact submissions.
   */
  async createInquiry(data: ContactFormData, userId?: string) {
    return prisma.inquiry.create({
      data: {
        userId: userId || null,
        name: data.name,
        email: data.email,
        organization: data.organization || null,
        inquiryType: data.inquiryType,
        subject: data.subject || null,
        message: data.message,
        researchArea: data.researchArea || null,
        timeline: data.timeline || null,
        plan: data.plan || null,
        billing: data.billing || null,
        position: data.position || null,
        topic: data.topic || null,
        status: "RECEIVED",
      },
    });
  }

  /**
   * Lists inquiries filtered by status (administrative access).
   */
  async listInquiries(status?: "RECEIVED" | "UNDER_REVIEW" | "RESPONDED" | "CLOSED") {
    return prisma.inquiry.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Retrieves an inquiry by its unique identifier.
   */
  async getInquiryById(id: string) {
    return prisma.inquiry.findUnique({
      where: { id },
    });
  }
}

export const inquiryService = new InquiryService();
