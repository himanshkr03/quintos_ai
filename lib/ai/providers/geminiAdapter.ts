// File: E:\quintos_ai\lib\ai\providers\geminiAdapter.ts

import {
  InferenceProviderAdapter,
  InferenceRequest,
  InferenceChunk,
} from "../types";
import { getAIConfig } from "../config";

interface GeminiContentPart {
  text: string;
}

interface GeminiContentMessage {
  role: "user" | "model";
  parts: GeminiContentPart[];
}

interface GeminiPayload {
  contents: GeminiContentMessage[];
  systemInstruction?: {
    parts: GeminiContentPart[];
  };
  generationConfig?: {
    temperature?: number;
    maxOutputTokens?: number;
  };
}

interface GeminiUsageMetadata {
  promptTokenCount?: number;
  candidatesTokenCount?: number;
  totalTokenCount?: number;
}

interface GeminiCandidate {
  content?: {
    parts?: GeminiContentPart[];
    role?: string;
  };
  finishReason?: string;
}

interface GeminiStreamChunk {
  candidates?: GeminiCandidate[];
  usageMetadata?: GeminiUsageMetadata;
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
}

/**
 * Sanitizes error messages to ensure API keys, internal query params,
 * or credentials are never leaked in error outputs.
 */
function sanitizeErrorMessage(rawMessage: string): string {
  // Strip potential API keys (AIza..., sk-..., etc.) and URL query params
  return rawMessage
    .replace(/key=[a-zA-Z0-9_\-]+/gi, "key=[REDACTED]")
    .replace(/AIza[0-9A-Za-z-_]{35}/g, "[REDACTED]")
    .replace(/Bearer\s+[a-zA-Z0-9_\-\.]+/gi, "Bearer [REDACTED]")
    .trim();
}

/**
 * Google Gemini Provider Adapter.
 * Communicates with the official Google Gemini Generative Language API
 * using native server-side fetch with SSE streaming.
 */
export class GeminiProviderAdapter implements InferenceProviderAdapter {
  readonly providerName = "gemini";

  async *stream(request: InferenceRequest): AsyncIterable<InferenceChunk> {
    const config = getAIConfig();

    if (!config.apiKey || config.apiKey.trim().length === 0) {
      yield {
        type: "error",
        error: "Google Gemini API key is not configured on the server. Please set AI_API_KEY in .env.local.",
      };
      return;
    }

    const model = config.defaultModel || "gemini-2.5-flash";
    const endpoint =
      config.apiEndpoint ||
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        model
      )}:streamGenerateContent?alt=sse`;

    // 1. Build Gemini contents payload
    const contents: GeminiContentMessage[] = [];

    // Map conversation history
    if (request.conversationHistory && request.conversationHistory.length > 0) {
      for (const msg of request.conversationHistory) {
        if (!msg.content || msg.content.trim().length === 0) continue;

        if (msg.role === "assistant") {
          contents.push({
            role: "model",
            parts: [{ text: msg.content }],
          });
        } else if (msg.role === "user") {
          contents.push({
            role: "user",
            parts: [{ text: msg.content }],
          });
        }
      }
    }

    // Append current user prompt
    contents.push({
      role: "user",
      parts: [{ text: request.prompt }],
    });

    const payload: GeminiPayload = {
      contents,
      generationConfig: {
        temperature: request.temperature ?? 0.7,
        maxOutputTokens: request.maxTokens ?? 2048,
      },
    };

    // Attach authoritative server-controlled system prompt
    if (request.systemPrompt && request.systemPrompt.trim().length > 0) {
      payload.systemInstruction = {
        parts: [{ text: request.systemPrompt }],
      };
    }

    let response: Response;
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": config.apiKey,
        },
        body: JSON.stringify(payload),
        signal: request.signal,
      });
    } catch (err) {
      if (request.signal?.aborted) {
        yield { type: "complete" };
        return;
      }
      const errorMsg =
        err instanceof Error ? err.message : "Inference network failure";
      yield {
        type: "error",
        error: `Gemini network error: ${sanitizeErrorMessage(errorMsg)}`,
      };
      return;
    }

    if (!response.ok) {
      let errorDetail = `HTTP ${response.status}`;
      try {
        const errorJson = await response.json();
        if (errorJson.error?.message) {
          errorDetail = sanitizeErrorMessage(errorJson.error.message);
        }
      } catch {
        // Fallback to status
      }

      if (response.status === 401 || response.status === 403) {
        yield {
          type: "error",
          error: "Gemini API authentication failed. Please verify AI_API_KEY in server environment.",
        };
        return;
      }

      if (response.status === 429) {
        yield {
          type: "error",
          error: "Gemini API rate limit or quota exceeded. Please try again shortly.",
        };
        return;
      }

      yield {
        type: "error",
        error: `Gemini provider error (${response.status}): ${errorDetail}`,
      };
      return;
    }

    if (!response.body) {
      yield { type: "error", error: "Empty response stream from Gemini provider." };
      return;
    }

    yield { type: "start" };

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        if (request.signal?.aborted) {
          yield { type: "complete" };
          break;
        }

        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith(":")) continue;

          if (trimmed.startsWith("data: ")) {
            const dataStr = trimmed.slice(6);
            if (dataStr === "[DONE]") {
              yield { type: "complete" };
              return;
            }

            try {
              const data: GeminiStreamChunk = JSON.parse(dataStr);

              // Check for inline Gemini stream error
              if (data.error?.message) {
                yield {
                  type: "error",
                  error: `Gemini stream error: ${sanitizeErrorMessage(
                    data.error.message
                  )}`,
                };
                return;
              }

              // Extract text parts from candidates
              if (data.candidates && data.candidates.length > 0) {
                const candidate = data.candidates[0];

                if (candidate.finishReason === "SAFETY") {
                  yield {
                    type: "delta",
                    text: "\n\n*(Response was modified or stopped by AI safety filters)*",
                  };
                }

                if (candidate.content?.parts) {
                  for (const part of candidate.content.parts) {
                    if (typeof part.text === "string" && part.text.length > 0) {
                      yield {
                        type: "delta",
                        text: part.text,
                      };
                    }
                  }
                }
              }

              // Extract token usage metadata if provided
              if (data.usageMetadata) {
                yield {
                  type: "usage",
                  usage: {
                    promptTokens: data.usageMetadata.promptTokenCount || 0,
                    completionTokens:
                      data.usageMetadata.candidatesTokenCount || 0,
                    totalTokens: data.usageMetadata.totalTokenCount || 0,
                  },
                };
              }
            } catch {
              // Ignore non-JSON lines or keep buffering
            }
          }
        }
      }

      yield { type: "complete" };
    } catch (streamErr) {
      if (request.signal?.aborted) {
        yield { type: "complete" };
      } else {
        const msg =
          streamErr instanceof Error ? streamErr.message : "Stream parse failure";
        yield {
          type: "error",
          error: `Gemini stream parsing error: ${sanitizeErrorMessage(msg)}`,
        };
      }
    } finally {
      reader.releaseLock();
    }
  }
}
