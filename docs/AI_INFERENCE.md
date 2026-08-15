# Quintos AI — AI Inference & Streaming Backend Architecture

This document provides a technical specification of the production AI inference pipeline, provider abstraction, SSE streaming protocol, and persistence model.

---

## 1. Request Lifecycle Architecture

```text
Browser (ChatWidget.tsx)
  ↓
POST /api/ai/chat (JSON payload + AbortSignal)
  ↓
Authentication Check (lib/auth/session.ts -> getCurrentUser())
  ↓
Organization Authorization & Multi-Tenant Verification
  ↓
Zod Input Validation (lib/validations/conversation.ts)
  ↓
Rate Limiter (lib/security/rateLimit.ts) [Configurable window]
  ↓
Project Authorization Check (if projectId supplied)
  ↓
Conversation Resolution & User Message Persistence (lib/services/conversations/)
  ↓
Server-Controlled System Prompt Assembly (lib/ai/systemPrompts.ts)
  ↓
Production Inference Service (lib/ai/inferenceService.ts)
  ↓
Provider Adapter (lib/ai/providers/geminiAdapter.ts via SSE)
  ↓
Real AI Provider (Google Gemini Generative Language API)
  ↓
Next.js ReadableStream Response (Server-Sent Events)
  ↓
Post-Stream Persistence: Assistant Message + Token Usage Logging (lib/services/usage/)
  ↓
Progressive Rendering in UI (MarkdownRenderer.tsx)
```

---

## 2. API Contract: `POST /api/ai/chat`

### Request Headers
- `Content-Type`: `application/json`

### Request Payload Schema
| Field | Type | Required | Constraints / Allowlist |
| :--- | :--- | :--- | :--- |
| `message` | string | **Yes** | 1–12,000 characters |
| `model` | string | **Yes** | `quintos-reasoning-v1`, `quintos-bio-vision-3d`, `quintos-quantum-vqe` |
| `context` | string | **Yes** | `general-research`, `biomedical-vision`, `quantum-ml`, `agentic-systems`, `systems-inference` |
| `conversationId` | string | No | UUID / CUID string (verified for user ownership) |
| `projectId` | string | No | UUID / CUID string (verified for organization ownership) |
| `temperature` | number | No | 0.0 to 1.0 (default 0.7) |
| `maxTokens` | number | No | 100 to 4096 (default 2048) |

---

## 3. Server-Sent Events (SSE) Stream Protocol

Responses are returned with header `Content-Type: text/event-stream; charset=utf-8`.

1. **Initial Event (`start`)**:
   ```text
   data: {"type":"start","conversationId":"clx123abc","isDemonstration":false}
   ```
2. **Text Chunk Delta (`delta`)**:
   ```text
   data: {"type":"delta","text":"In accordance with"}
   ```
3. **Usage & Completion Event (`complete`)**:
   ```text
   data: {"type":"complete","usage":{"promptTokens":142,"completionTokens":380,"totalTokens":522}}
   ```
4. **Stream Terminator**:
   ```text
   data: [DONE]
   ```

---

## 4. Cancellation & Abort Handling

- The frontend provides a `Stop Generation` button wired to `AbortController.abort()`.
- When triggered, the client disconnects the fetch stream.
- The server adapter stops consuming provider tokens and cleanly terminates the `ReadableStream`.
- The partial assistant text accumulated up to the cancellation point is preserved in the conversation history.

---

## 5. Persistence & Multi-Tenancy

1. **Conversation & Message History:**
   - Conversations are keyed by `userId` and optionally `projectId`.
   - Multi-tenant boundary: An authenticated user can only access and append to conversations they own within their organization.
2. **Usage Tracking:**
   - Every completed generation records a `UsageRecord` row with `organizationId`, `userId`, `model`, `promptTokens`, `completionTokens`, and `timestamp`.
   - If the provider does not return token counts, tokens are omitted without fabricating artificial numbers.

---

## 6. Demonstration Mode vs. Production Mode

| Capability | Demonstration Mode (`AI_DEMO_MODE=true`) | Production Mode (`AI_DEMO_MODE=false`) |
| :--- | :--- | :--- |
| **Provider API Key** | Not required | Required (`AI_API_KEY`) |
| **Inference Source** | Local domain-specific mathematical simulation | Live external AI provider endpoint |
| **Streaming** | Chunked simulated typing cadence | Real-time Server-Sent Events from provider |
| **Persistence** | Supported (Local sessions) | Persisted to PostgreSQL via Prisma |
| **Badge in UI** | "Demonstration Mode" | "SSE Stream Connected" |

---

## 7. Safety & Biomedical Framing

- The **Biomedical Vision** context strictly enforces computational and engineering formulations (e.g. 3D tensor manipulation, isotropic voxel resampling, coordinate localization).
- The system prompt explicitly forbids clinical diagnosis, medical treatment recommendations, or regulatory claims.
