# Quintos AI — Contact & Inquiry Backend Specification

This document provides a comprehensive technical overview of the real contact and inquiry backend architecture implemented in Phase 5B.

---

## 1. Request Lifecycle Flow

```text
User fills out Contact Form on /contact
  ↓
Client-side UX Validation (instant feedback)
  ↓
POST /api/contact (with JSON payload + hidden honeypot)
  ↓
IP-Based Rate Limiting Check (lib/security/rateLimit.ts)
  ↓
Honeypot Evaluation (rejects automated spam bots)
  ↓
Server-Side Zod Validation (lib/validations/inquiry.ts)
  ↓
User Context Resolution (lib/auth/session.ts - attaches userId if authenticated, else null)
  ↓
Inquiry Persistence via Prisma ORM (lib/services/inquiries/inquiryService.ts)
  ↓
Asynchronous Transactional Email Dispatch (lib/services/email/emailService.ts via Resend)
  ├── 1. Internal notification -> contact.quintosresearch@gmail.com
  └── 2. User confirmation -> [User's Email Address]
  ↓
HTTP 201 Response with Unique Inquiry Reference ID (e.g. `clx8f9a2b0001xyz123456789`)
  ↓
Frontend displays success confirmation with one-click reference ID copy
```

---

## 2. API Contract: `POST /api/contact`

### Headers
- `Content-Type`: `application/json`

### Payload Schema
| Field | Type | Required | Constraints |
| :--- | :--- | :--- | :--- |
| `name` | string | **Yes** | 2–100 characters |
| `email` | string | **Yes** | Valid email, max 255 characters |
| `organization` | string | No | Max 150 characters |
| `inquiryType` | string | **Yes** | `enterprise`, `research`, `biomedical`, `general` |
| `subject` | string | **Yes** | 3–200 characters |
| `message` | string | **Yes** | 10–2000 characters |
| `researchArea` | string | No | Max 100 characters |
| `timeline` | string | No | Max 100 characters |
| `plan` | string | No | Max 50 characters |
| `billing` | string | No | Max 50 characters |
| `position` | string | No | Max 100 characters |
| `topic` | string | No | Max 100 characters |
| `website` | string | No | **Honeypot field** (must be empty) |

### Response Schema

#### Success (`HTTP 201 Created`)
```json
{
  "success": true,
  "message": "Your inquiry has been submitted successfully.",
  "inquiryId": "cm1234567890abcdef"
}
```

#### Rate Limited (`HTTP 429 Too Many Requests`)
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Submission rate limit exceeded. Please wait a few minutes before submitting another inquiry."
  }
}
```

---

## 3. Resilience & Failure Policies

1. **Email Failure Decoupling:** Database persistence is the primary system of record. If Resend encounters an outage or if `RESEND_API_KEY` is not yet configured, the database record is preserved and the client receives a valid `HTTP 201` response with their inquiry reference ID.
2. **Anonymous vs Authenticated:** The endpoint is fully accessible to anonymous guests (`userId = null`). If a user has an active Supabase session, their `userId` is safely associated.
3. **Spam Protection:** In-memory sliding window rate limits each client IP to 5 submissions per 10 minutes.

---

## 4. Implementation Status

| Feature | Status | Notes |
| :--- | :--- | :--- |
| `POST /api/contact` | **IMPLEMENTED** | Production ready |
| Zod Server Validation | **IMPLEMENTED** | Schema enforced on server |
| Prisma Inquiry Persistence | **IMPLEMENTED** | Stored in PostgreSQL `Inquiry` table |
| Resend Email Integration | **IMPLEMENTED (Awaiting API Key)** | Graceful fallback when key is unconfigured |
| In-Memory Rate Limiting | **IMPLEMENTED** | Ready for Upstash Redis adapter in Phase 6 |
| Honeypot Bot Detection | **IMPLEMENTED** | Active on frontend & backend |
