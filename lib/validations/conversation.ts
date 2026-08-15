// File: E:\quintos_ai\lib\validations\conversation.ts

import { z } from "zod";

export const CreateConversationSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(100, "Title is too long.")
    .trim(),
  model: z.string().min(1, "Model identifier is required."),
  context: z.string().min(1, "Research context is required."),
  projectId: z.string().optional(),
});

export const CreateMessageSchema = z.object({
  conversationId: z.string().min(1, "Conversation ID is required."),
  role: z.enum(["USER", "ASSISTANT", "SYSTEM"]),
  content: z
    .string()
    .min(1, "Message content cannot be empty.")
    .max(50000, "Message is too long."),
  model: z.string().optional(),
  tokens: z.number().int().nonnegative().optional(),
});

export const ChatInferenceRequestSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty.")
    .max(12000, "Message cannot exceed 12,000 characters.")
    .trim(),
  model: z
    .enum([
      "quintos-reasoning-v1",
      "quintos-bio-vision-3d",
      "quintos-quantum-vqe",
    ])
    .default("quintos-reasoning-v1"),
  context: z
    .enum([
      "general-research",
      "biomedical-vision",
      "quantum-ml",
      "agentic-systems",
      "systems-inference",
    ])
    .default("general-research"),
  conversationId: z.string().optional(),
  projectId: z.string().optional(),
  temperature: z.number().min(0.0).max(1.0).optional(),
  maxTokens: z.number().int().min(100).max(4096).optional(),
});

export type CreateConversationData = z.infer<typeof CreateConversationSchema>;
export type CreateMessageData = z.infer<typeof CreateMessageSchema>;
export type ChatInferenceRequestData = z.infer<typeof ChatInferenceRequestSchema>;
