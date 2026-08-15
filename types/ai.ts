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
  tags?: string[];
  href?: string;
}

/* =====================================================
   Products
===================================================== */

export interface AIProduct {
  icon: LucideIcon;
  title: string;
  description: string;
  category?: string;
  stage?: "Enterprise Platform" | "Applied Framework" | "Research Engine" | "Platform Infrastructure";
  capabilities?: string[];
  href?: string;
}

/* =====================================================
   Research
===================================================== */

export interface ResearchArea {
  icon: LucideIcon;
  title: string;
  description: string;
  focusTopics?: string[];
  href?: string;
}

/* =====================================================
   Testimonials / Engineering Principles
===================================================== */

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  review: string;
}

export interface EngineeringPrinciple {
  title: string;
  description: string;
  category: string;
}

/* =====================================================
   FAQ
===================================================== */

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}