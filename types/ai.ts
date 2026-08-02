// types/ai.ts

import { LucideIcon } from "lucide-react";

/* =====================================================
   Chat
===================================================== */

export interface ChatMessage {
  id: string;

  role: "user" | "assistant" | "system";

  content: string;

  createdAt: Date;
}

export interface AIModel {
  id: string;

  name: string;

  provider: string;

  description?: string;
}

/* =====================================================
   Services
===================================================== */

export interface AIService {
  icon: LucideIcon;

  title: string;

  description: string;
}

/* =====================================================
   Products
===================================================== */

export interface AIProduct {
  icon: LucideIcon;

  title: string;

  description: string;
}

/* =====================================================
   Research
===================================================== */

export interface ResearchArea {
  icon: LucideIcon;

  title: string;

  description: string;
}

/* =====================================================
   Testimonials
===================================================== */

export interface Testimonial {
  name: string;

  role: string;

  company: string;

  review: string;
}

/* =====================================================
   FAQ
===================================================== */

export interface FAQItem {
  question: string;

  answer: string;
}