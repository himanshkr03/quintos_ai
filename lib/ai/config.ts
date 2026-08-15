// File: E:\quintos_ai\lib\ai\config.ts

import { ModelId, WorkspaceContextId } from "./types";

export interface AIProviderConfig {
  provider: "gemini" | "openai" | string;
  defaultModel: string;
  apiKey: string;
  apiEndpoint?: string;
  isDemoMode: boolean;
  requestTimeoutMs: number;
  rateLimit: number;
  rateWindowSeconds: number;
}

export const PROVIDER_DEFAULT_MODELS: Record<string, string> = {
  gemini: "gemini-2.5-flash",
  openai: "gpt-4o-mini",
};

/**
 * Resolves server-side AI configuration from environment variables.
 * Sensitive credentials (API Keys) are NEVER exposed to browser bundles.
 */
export function getAIConfig(): AIProviderConfig {
  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();
  const apiKey = process.env.AI_API_KEY || "";
  const explicitDemo = process.env.AI_DEMO_MODE === "true";
  const isDemoMode = explicitDemo || !apiKey || apiKey.trim().length === 0;

  const defaultModel =
    process.env.AI_MODEL ||
    PROVIDER_DEFAULT_MODELS[provider] ||
    "gemini-2.5-flash";

  return {
    provider,
    defaultModel,
    apiKey,
    apiEndpoint: process.env.AI_API_ENDPOINT,
    isDemoMode,
    requestTimeoutMs: parseInt(process.env.AI_REQUEST_TIMEOUT_MS || "30000", 10),
    rateLimit: parseInt(process.env.AI_RATE_LIMIT || "20", 10),
    rateWindowSeconds: parseInt(process.env.AI_RATE_WINDOW_SECONDS || "60", 10),
  };
}

/**
 * Safe server-side check for whether the provider configuration is complete for live inference.
 * Never throws at module load time to prevent breaking Next.js static builds.
 */
export function validateAIConfig(config: AIProviderConfig): { valid: boolean; error?: string } {
  if (config.isDemoMode) {
    return { valid: true };
  }

  if (!config.apiKey || config.apiKey.trim().length === 0) {
    return {
      valid: false,
      error: `AI provider '${config.provider}' requires a valid API key configured in AI_API_KEY.`,
    };
  }

  const supportedProviders = ["gemini", "openai"];
  if (!supportedProviders.includes(config.provider)) {
    return {
      valid: false,
      error: `Unsupported AI provider '${config.provider}'. Supported providers are: ${supportedProviders.join(", ")}.`,
    };
  }

  return { valid: true };
}

export const ALLOWED_MODELS: Record<
  ModelId,
  { name: string; domain: string; defaultContext: WorkspaceContextId }
> = {
  "quintos-reasoning-v1": {
    name: "Quintos Reasoning v1",
    domain: "Theoretical AI & Test-Time Search",
    defaultContext: "general-research",
  },
  "quintos-bio-vision-3d": {
    name: "Quintos Bio-Vision 3D",
    domain: "Volumetric Coordinate Perception",
    defaultContext: "biomedical-vision",
  },
  "quintos-quantum-vqe": {
    name: "Quintos Quantum VQE",
    domain: "Variational Quantum Algorithms",
    defaultContext: "quantum-ml",
  },
};

export const ALLOWED_CONTEXTS: WorkspaceContextId[] = [
  "general-research",
  "biomedical-vision",
  "quantum-ml",
  "agentic-systems",
  "systems-inference",
];

