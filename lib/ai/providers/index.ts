// File: E:\quintos_ai\lib\ai\providers\index.ts

import { InferenceProviderAdapter } from "../types";
import { GeminiProviderAdapter } from "./geminiAdapter";
import { OpenAIProviderAdapter } from "./openaiAdapter";
import { getAIConfig } from "../config";

export function getInferenceProvider(): InferenceProviderAdapter {
  const config = getAIConfig();
  const provider = (config.provider || "gemini").toLowerCase();

  switch (provider) {
    case "gemini":
      return new GeminiProviderAdapter();
    case "openai":
      return new OpenAIProviderAdapter();
    default:
      throw new Error(
        `Unsupported AI provider '${config.provider}'. Valid options are 'gemini' or 'openai'.`
      );
  }
}

