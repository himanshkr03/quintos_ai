// File: E:\quintos_ai\app\api\ai\chat\route.ts

import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { ChatInferenceRequestSchema } from "@/lib/validations/conversation";
import { conversationService } from "@/lib/services/conversations/conversationService";
import { projectService } from "@/lib/services/projects/projectService";
import { usageService } from "@/lib/services/usage/usageService";
import { productionInferenceService } from "@/lib/ai/inferenceService";
import { getAIConfig, validateAIConfig } from "@/lib/ai/config";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { InferenceHistoryMessage, InferenceUsage } from "@/lib/ai/types";
import { RESEARCH_MODELS } from "@/lib/ai/prompts";

export const runtime = "nodejs";

/**
 * Generates a concise title from the initial user prompt.
 */
function deriveConversationTitle(message: string): string {
  const clean = message.trim().replace(/\n+/g, " ");
  if (clean.length <= 40) return clean;
  return clean.substring(0, 37) + "...";
}

/**
 * POST /api/ai/chat
 * Authenticated AI inference and conversation streaming endpoint.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Session & Identity Resolution
    const user = await getCurrentUser();
    const config = getAIConfig();

    // Validate provider configuration if in production mode
    const configCheck = validateAIConfig(config);
    if (!configCheck.valid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "PROVIDER_CONFIG_ERROR",
            message: configCheck.error || "AI provider is not properly configured.",
          },
        },
        { status: 503 }
      );
    }

    // If unauthenticated:
    // In production mode (configured Supabase), reject with 401.
    // In development demo mode without live auth, provide a fallback demo identity.
    const effectiveUserId = user?.id || (config.isDemoMode ? "demo-researcher-local" : null);
    const effectiveOrgId =
      user?.organizationId || (config.isDemoMode ? "demo-org-local" : null);

    if (!effectiveUserId || !effectiveOrgId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication required to access the research inference runtime.",
          },
        },
        { status: 401 }
      );
    }

    // 2. Rate Limiting Check
    const rateLimit = checkRateLimit(
      effectiveUserId,
      config.rateLimit,
      config.rateWindowSeconds * 1000
    );
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "RATE_LIMITED",
            message: "Inference rate limit exceeded. Please wait before submitting additional prompts.",
          },
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // 3. Parse and Validate Request Payload
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "MALFORMED_REQUEST",
            message: "Invalid JSON request payload.",
          },
        },
        { status: 400 }
      );
    }

    const validation = ChatInferenceRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Request validation failed.",
            details: validation.error.issues.map((i) => ({
              field: i.path.join("."),
              message: i.message,
            })),
          },
        },
        { status: 422 }
      );
    }

    const data = validation.data;

    // 4. Project Authorization (Multi-Tenant Isolation)
    if (data.projectId && user?.organizationId) {
      try {
        const project = await projectService.getProjectById(
          data.projectId,
          user.organizationId
        );
        if (!project) {
          return NextResponse.json(
            {
              success: false,
              error: {
                code: "FORBIDDEN",
                message: "Specified project does not belong to your organization.",
              },
            },
            { status: 403 }
          );
        }
      } catch {
        // Safe handling if DB is in local simulation
      }
    }

    // 5. Conversation Resolution & Persistence
    let conversationId = data.conversationId;
    let historyMessages: InferenceHistoryMessage[] = [];

    if (user && conversationId) {
      try {
        const existingConv = await conversationService.getConversationById(
          conversationId,
          user.id
        );
        if (!existingConv) {
          return NextResponse.json(
            {
              success: false,
              error: {
                code: "NOT_FOUND",
                message: "Conversation not found or unauthorized.",
              },
            },
            { status: 404 }
          );
        }

        // Extract last 6 messages for multi-turn conversational context
        historyMessages = existingConv.messages.slice(-6).map((m) => ({
          role: m.role.toLowerCase() as "user" | "assistant" | "system",
          content: m.content,
        }));
      } catch (err) {
        console.warn("[Conversation Fetch Warning]:", err);
      }
    } else if (user && !conversationId) {
      try {
        const newConv = await conversationService.createConversation(
          {
            title: deriveConversationTitle(data.message),
            model: data.model,
            context: data.context,
            projectId: data.projectId,
          },
          user.id
        );
        conversationId = newConv.id;
      } catch (err) {
        console.warn("[Conversation Create Warning]:", err);
      }
    }

    // Persist incoming user message to database
    if (user && conversationId) {
      try {
        await conversationService.addMessage({
          conversationId,
          role: "USER",
          content: data.message,
          model: data.model,
        });
      } catch (err) {
        console.warn("[User Message Persistence Warning]:", err);
      }
    }

    // 6. Setup ReadableStream for Server-Sent Events (SSE) Streaming
    const encoder = new TextEncoder();
    let accumulatedText = "";
    let capturedUsage: InferenceUsage | undefined;
    let streamHasError = false;

    const stream = new ReadableStream({
      async start(controller) {
        // Send initial connection event with conversation ID
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "start",
              conversationId,
              isDemonstration: config.isDemoMode,
            })}\n\n`
          )
        );

        try {
          if (config.isDemoMode) {
            // Simulated Demonstration Mode Stream
            const modelMeta =
              RESEARCH_MODELS.find((m) => m.id === data.model) || RESEARCH_MODELS[0];
            const demoChunks = [
              `### ${modelMeta.name} — Analytical Formulation\n\n`,
              `Evaluating theoretical constraints for **${modelMeta.domain}**:\n\n`,
              `$$\\nabla_{\\theta} \\mathcal{L}(\\theta) = \\mathbb{E}_{x \\sim \\mathcal{D}}\\left[ \\log p_{\\theta}(x) \\right]$$\n\n`,
              `#### Structured Reasoning Trajectory\n`,
              `- **Context Alignment:** Verified against ${data.context} parameter boundaries.\n`,
              `- **Verification Gate:** Step-by-step mathematical consistency confirmed.\n\n`,
              `\`\`\`python\n`,
              `# Verification routine for ${data.model}\n`,
              `def verify_trajectory(spec: dict) -> bool:\n`,
              `    return spec.get("status") == "Optimal"\n`,
              `\`\`\`\n\n`,
              `*Demonstration mode active. Model response generated via simulated research runtime.*`,
            ];

            for (const chunk of demoChunks) {
              accumulatedText += chunk;
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({
                    type: "delta",
                    text: chunk,
                  })}\n\n`
                )
              );
            }

            capturedUsage = {
              promptTokens: Math.ceil(data.message.length / 4),
              completionTokens: Math.ceil(accumulatedText.length / 4),
              totalTokens:
                Math.ceil(data.message.length / 4) +
                Math.ceil(accumulatedText.length / 4),
            };
          } else {
            // Live Production Provider Stream
            const abortController = new AbortController();
            const timeoutId = setTimeout(
              () => abortController.abort(),
              config.requestTimeoutMs
            );

            try {
              const iterator = productionInferenceService.streamInference({
                prompt: data.message,
                modelId: data.model,
                contextId: data.context,
                conversationHistory: historyMessages,
                temperature: data.temperature,
                maxTokens: data.maxTokens,
                signal: abortController.signal,
              });

              for await (const chunk of iterator) {
                if (chunk.type === "delta" && chunk.text) {
                  accumulatedText += chunk.text;
                }
                if (chunk.type === "usage" && chunk.usage) {
                  capturedUsage = chunk.usage;
                }
                if (chunk.type === "error") {
                  streamHasError = true;
                }
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`)
                );
              }
            } finally {
              clearTimeout(timeoutId);
            }
          }

          if (!streamHasError) {
            // Complete stream
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: "complete",
                  usage: capturedUsage,
                })}\n\n`
              )
            );
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();

          // 7. Post-Stream Persistence (Assistant Message & Usage Tracking)
          if (user && conversationId && accumulatedText.length > 0 && !streamHasError) {
            try {
              await Promise.allSettled([
                conversationService.addMessage({
                  conversationId,
                  role: "ASSISTANT",
                  content: accumulatedText,
                  model: data.model,
                  tokens: capturedUsage?.completionTokens,
                }),
                usageService.recordUsage({
                  organizationId: user.organizationId || effectiveOrgId,
                  userId: user.id,
                  model: data.model,
                  promptTokens: capturedUsage?.promptTokens || 0,
                  completionTokens: capturedUsage?.completionTokens || 0,
                  computeUnits: 1,
                }),
              ]);
            } catch (persistErr) {
              console.warn("[Post-Stream Persistence Warning]:", persistErr);
            }
          }
        } catch (streamErr) {
          const errMessage =
            streamErr instanceof Error ? streamErr.message : "Inference failed";
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "error",
                error: `Inference stream error: ${errMessage}`,
              })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("[API AI Chat Exception]:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected server error occurred in the inference runtime.",
        },
      },
      { status: 500 }
    );
  }
}
