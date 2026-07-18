// types/ai.ts

export interface ChatMessage {
  id: string;

  role:
    | "user"
    | "assistant"
    | "system";

  content: string;

  createdAt: Date;
}

export interface AIModel {
  id: string;

  name: string;

  provider: string;

  description?: string;
}