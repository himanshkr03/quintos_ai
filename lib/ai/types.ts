// File: E:\quintos_ai\lib\ai\types.ts

export type ModelId =
  | "quintos-reasoning-v1"
  | "quintos-bio-vision-3d"
  | "quintos-quantum-vqe";

export type WorkspaceContextId =
  | "general-research"
  | "biomedical-vision"
  | "quantum-ml"
  | "agentic-systems"
  | "systems-inference";

export interface ModelDefinition {
  id: ModelId;
  name: string;
  badge: string;
  domain: string;
  description: string;
  architecture: string;
  defaultContext: WorkspaceContextId;
}

export interface WorkspaceContext {
  id: WorkspaceContextId;
  title: string;
  shortName: string;
  description: string;
  iconName: string;
  recommendedModelId: ModelId;
}

export interface PromptItem {
  id: string;
  category: string;
  title: string;
  prompt: string;
  modelId: ModelId;
  contextId: WorkspaceContextId;
}

export interface PromptCategory {
  id: string;
  name: string;
  badge: string;
  prompts: PromptItem[];
}

export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  modelId?: ModelId;
  modelName?: string;
  contextId?: WorkspaceContextId;
  isDemonstration?: boolean;
  isStreaming?: boolean;
  isError?: boolean;
}

export interface ConversationSession {
  id: string;
  title: string;
  modelId: ModelId;
  contextId: WorkspaceContextId;
  updatedAt: string;
  group: "Today" | "Previous";
  messages: ChatMessage[];
}

export type InferenceStatus =
  | "idle"
  | "preparing"
  | "generating"
  | "streaming"
  | "complete"
  | "stopped"
  | "error";

export interface InferenceProgressCallback {
  onPreparing?: () => void;
  onChunk?: (accumulatedText: string, chunk: string) => void;
  onComplete?: (finalText: string) => void;
  onError?: (error: Error) => void;
  onStopped?: (partialText: string) => void;
}
