# Quintos AI — API Architecture & Design Guidelines

This document outlines the API design standards, routing conventions, service abstraction, and response specifications for Quintos AI.

---

## 1. Architectural Model

All backend logic in Quintos AI follows a layered service architecture:

```text
Client (React / Next.js)
  ↓
Next.js Route Handler / Server Action (app/api/... or app/auth/...)
  ↓
Zod Input Validation (lib/validations/...)
  ↓
Anti-Abuse & Rate Limiting (lib/security/rateLimit.ts)
  ↓
Service Layer (lib/services/...)
  ↓
Prisma ORM (lib/db/prisma.ts)
  ↓
Supabase PostgreSQL Database
  ↓
Inference Provider / Email Service Layer
```

---

## 2. Status by Phase

| Domain / Route | Status in Phase 5D | Implementation Phase |
| :--- | :--- | :--- |
| **POST `/api/contact`** (`app/api/contact/route.ts`) | **Implemented (Production Ready)** | Complete in Phase 5B |
| **GET `/auth/callback`** (`app/auth/callback/route.ts`) | **Implemented (Production Ready)** | Complete in Phase 5C |
| **POST `/api/ai/chat`** (`app/api/ai/chat/route.ts`) | **Implemented (Streaming & Persisted)** | Complete in Phase 5D |
| **GET/DEL/PATCH `/api/ai/conversations`** | **Implemented (Production Ready)** | Complete in Phase 5D |
| **API Key Hashing & Verification** (`lib/services/apiKeys/`) | **Implemented (Service Layer)** | Endpoints in Phase 5E |
| **Usage & Telemetry Service** (`lib/services/usage/`) | **Implemented (Active Logging)** | Complete in Phase 5D |
| **Billing & Subscriptions** (`prisma/schema.prisma`) | **Prepared (Schema Only)** | Stripe webhooks in Phase 5F |

---

## 3. Inference API Specification: `POST /api/ai/chat`

- **Content-Type:** `application/json`
- **Response Format:** `text/event-stream; charset=utf-8` (Server-Sent Events)
- **Rate Limit:** 20 requests per 60 seconds per user / IP address.

### Request Body Example
```json
{
  "message": "Derive the expectation value of Hamiltonian H under the parameterized HEA ansatz.",
  "model": "quintos-quantum-vqe",
  "context": "quantum-ml",
  "temperature": 0.7,
  "maxTokens": 2048
}
```

### Response Stream Example
```text
data: {"type":"start","conversationId":"cm123abc","isDemonstration":false}

data: {"type":"delta","text":"### Quantum Variational Algorithm Synthesis\n\n"}

data: {"type":"delta","text":"In accordance with the HEA formulation..."}

data: {"type":"complete","usage":{"promptTokens":42,"completionTokens":188,"totalTokens":230}}

data: [DONE]
```
