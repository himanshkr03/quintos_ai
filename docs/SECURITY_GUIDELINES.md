# Quintos AI — Security & Data Sovereignty Guidelines

This document specifies the security controls, credential protections, and architectural boundaries governing the Quintos AI platform.

---

## 1. Core Security Principles

### A. Zero Secrets in Client Bundles
- Client Components only ingest environment variables prefixed with `NEXT_PUBLIC_`.
- Server secrets (`SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`, `DIRECT_URL`, `RESEND_API_KEY`, `AI_API_KEY`) are strictly isolated in Node.js server runtimes.

### B. Password & Secret Token Isolation
- **User Passwords:** Stored and hashed exclusively inside Supabase Auth (`auth.users`). Passwords NEVER touch the application database or Prisma models.
- **Provider API Keys (`AI_API_KEY`):** Stored exclusively in server environment variables. Never sent to browser clients or included in client bundle manifests.
- **API Secret Keys:** Stored exclusively as one-way SHA-256 hashes (`keyHash`).

### C. Multi-Tenant Organization Isolation
- Application resources (`projects`, `conversations`, `messages`, `usageRecords`, `apiKeys`) are keyed by `organizationId` and verified on every query.
- Cross-tenant queries are blocked server-side.

---

## 2. AI Inference Security Controls

### A. Server-Controlled System Prompts
- The browser cannot pass an unvetted `systemPrompt` to the model.
- Prompts are assembled server-side from vetted templates with safety and research boundaries.

### B. Model & Context Allowlisting
- Client input for `model` and `context` is validated against strict Zod enums (`ALLOWED_MODELS`, `ALLOWED_CONTEXTS`).

### C. Rate Limiting & Abuse Prevention
- Public and inference endpoints are protected via `lib/security/rateLimit.ts`.

### D. Medical & Clinical Non-Diagnostic Boundary
- The biomedical vision research framework enforces strict non-diagnostic disclaimers in the system prompt.

---

## 3. Implementation Status

| Protection Mechanism | Status in Phase 5D | Notes |
| :--- | :--- | :--- |
| **Client / Server Separation** | **Implemented** | Zero secrets in client code |
| **AI Secret Key Isolation** | **Implemented** | `AI_API_KEY` server-only |
| **Server-Controlled Prompts** | **Implemented** | `lib/ai/systemPrompts.ts` |
| **Multi-Tenant Conversation Ownership** | **Implemented** | `ConversationService` verified |
| **IP / User Sliding Rate Limiter** | **Implemented** | `lib/security/rateLimit.ts` |
| **Open Redirect Defense** | **Implemented** | `getSafeRedirectUrl()` in middleware |
