// File: E:\quintos_ai\lib\ai\providers\openaiAdapter.ts

import {
  InferenceProviderAdapter,
  InferenceRequest,
  InferenceChunk,
} from "../types";
import { getAIConfig } from "../config";

/**
 * OpenAI / OpenAI-Compatible SSE Streaming Provider Adapter.
 * Uses native fetch with standard HTTP Server-Sent Events (SSE).
 */
export class OpenAIProviderAdapter implements InferenceProviderAdapter {
  readonly providerName = "openai";

  async *stream(request: InferenceRequest): AsyncIterable<InferenceChunk> {
    const config = getAIConfig();

    if (!config.apiKey) {
      yield {
        type: "error",
        error: "AI provider API key is not configured on the server.",
      };
      return;
    }

    // Build payload messages
    const messages = [];

    if (request.systemPrompt) {
      messages.push({
        role: "system",
        content: request.systemPrompt,
      });
    }

    if (request.conversationHistory && request.conversationHistory.length > 0) {
      for (const msg of request.conversationHistory) {
        messages.push({
          role: msg.role,
          content: msg.content,
        });
      }
    }

    messages.push({
      role: "user",
      content: request.prompt,
    });

    const payload = {
      model: config.defaultModel,
      messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens ?? 2048,
      stream: true,
      stream_options: {
        include_usage: true,
      },
    };

    const endpoint =
      config.apiEndpoint || "https://api.openai.com/v1/chat/completions";

    let response: Response;
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify(payload),
        signal: request.signal,
      });
    } catch (err) {
      if (request.signal?.aborted) {
        yield { type: "error", error: "Generation aborted by user." };
        return;
      }
      const errorMsg = err instanceof Error ? err.message : "Inference network failure";
      yield { type: "error", error: `Provider network error: ${errorMsg}` };
      return;
    }

    if (!response.ok) {
      let errorDetail = `HTTP ${response.status}`;
      try {
        const errorJson = await response.json();
        if (errorJson.error?.message) {
          errorDetail = errorJson.error.message;
        }
      } catch {
        // Fallback to status text
      }
      yield {
        type: "error",
        error: `Inference provider error (${response.status}): ${errorDetail}`,
      };
      return;
    }

    if (!response.body) {
      yield { type: "error", error: "Empty response body from provider." };
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

          if (trimmed === "data: [DONE]") {
            yield { type: "complete" };
            return;
          }

          if (trimmed.startsWith("data: ")) {
            const dataStr = trimmed.slice(6);
            try {
              const data = JSON.parse(dataStr);

              // 1. Text delta
              const deltaContent = data.choices?.[0]?.delta?.content;
              if (typeof deltaContent === "string" && deltaContent.length > 0) {
                yield {
                  type: "delta",
                  text: deltaContent,
                };
              }

              // 2. Token usage metadata
              if (data.usage) {
                yield {
                  type: "usage",
                  usage: {
                    promptTokens: data.usage.prompt_tokens || 0,
                    completionTokens: data.usage.completion_tokens || 0,
                    totalTokens: data.usage.total_tokens || 0,
                  },
                };
              }
            } catch {
              // Ignore non-JSON lines or keep buffer
            }
          }
        }
      }

      yield { type: "complete" };
    } catch (streamErr) {
      if (request.signal?.aborted) {
        yield { type: "complete" };
      } else {
        const msg = streamErr instanceof Error ? streamErr.message : "Stream error";
        yield { type: "error", error: `Stream parsing error: ${msg}` };
      }
    } finally {
      reader.releaseLock();
    }
  }
}
