// File: E:\quintos_ai\lib\validations\inquiry.ts

import { z } from "zod";

export const InquiryTypeEnum = z.enum([
  "enterprise",
  "research",
  "biomedical",
  "general",
  "research-collaborations",
  "enterprise-ai",
  "technical-advisory",
  "general-inquiries",
]);

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must contain at least 2 characters.")
    .max(100, "Full name must not exceed 100 characters.")
    .trim(),
  email: z
    .string()
    .email("Please provide a valid email address.")
    .max(255, "Email address is too long.")
    .toLowerCase()
    .trim(),
  organization: z
    .string()
    .max(150, "Organization name must not exceed 150 characters.")
    .optional()
    .or(z.literal("")),
  inquiryType: InquiryTypeEnum.default("general"),
  subject: z
    .string()
    .min(3, "Subject must contain at least 3 characters.")
    .max(200, "Subject line must not exceed 200 characters.")
    .trim(),
  message: z
    .string()
    .min(10, "Message must contain at least 10 characters.")
    .max(2000, "Message cannot exceed 2000 characters.")
    .trim(),
  researchArea: z.string().max(100).optional(),
  timeline: z.string().max(100).optional(),
  plan: z.string().max(50).optional(),
  billing: z.string().max(50).optional(),
  position: z.string().max(100).optional(),
  topic: z.string().max(100).optional(),
  // Honeypot field: Legitimate users will not fill this field.
  website: z.string().max(0, "Spam detection triggered.").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
