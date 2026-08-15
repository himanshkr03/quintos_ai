# Quintos AI — Environment Variables Specification

This document provides a reference for all environment variables used by Quintos AI.

---

## 1. Public Variables (Client & Browser Accessible)

These variables are prefixed with `NEXT_PUBLIC_` and are bundled into the client JavaScript build. They MUST NOT contain secret keys or database passwords.

| Variable Name | Required | Default / Example | Purpose |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | Yes | `http://localhost:3000` | Base URL used for metadata and redirects |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | `https://your-project.supabase.co` | Supabase project API gateway endpoint |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | `eyJhbGci...` | Supabase public anonymous key (RLS enforced) |

---

## 2. Server-Only Secrets (Node.js Runtime Only)

These variables are NEVER bundled into client code. They must only be accessed in Server Components, Server Actions, Route Handlers, or Prisma CLI tools.

| Variable Name | Required | Purpose |
| :--- | :--- | :--- |
| `DATABASE_URL` | Yes | PostgreSQL connection string for Prisma Client (Port 6543, pooled) |
| `DIRECT_URL` | Yes | Direct PostgreSQL connection string for Prisma Migrations (Port 5432) |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional (Admin) | Bypasses Supabase RLS for server administration |
| `RESEND_API_KEY` | Optional (Email) | API key for transactional email dispatch via Resend (Phase 5B) |
| `CONTACT_NOTIFICATION_EMAIL` | Optional (Email) | Recipient for internal inquiry notifications |
| `FROM_EMAIL` | Optional (Email) | Verified sender address for outgoing emails |
| `AI_PROVIDER` | Optional (AI) | Inference provider name (`openai`, `groq`, `anthropic`, or `custom`) |
| `AI_MODEL` | Optional (AI) | Default provider model identifier (e.g. `gpt-4o-mini`, `llama-3.3-70b-versatile`) |
| `AI_API_KEY` | Optional (AI) | **Secret API Key** for provider authentication (SERVER-ONLY) |
| `AI_API_ENDPOINT` | Optional (AI) | Custom inference endpoint URL |
| `AI_DEMO_MODE` | Optional (AI) | Set to `"true"` to force simulated research responses |
| `AI_REQUEST_TIMEOUT_MS` | Optional (AI) | Inference timeout in milliseconds (default: `30000`) |
| `AI_RATE_LIMIT` | Optional (AI) | Allowed requests per rate window (default: `20`) |
| `AI_RATE_WINDOW_SECONDS`| Optional (AI) | Rate limit window duration in seconds (default: `60`) |

---

## 3. Future Integration Variables (Phase 5E - 5F)

- `STRIPE_SECRET_KEY`: For live payment intents (Phase 5F).
- `STRIPE_WEBHOOK_SECRET`: For cryptographic verification of Stripe webhooks (Phase 5F).
