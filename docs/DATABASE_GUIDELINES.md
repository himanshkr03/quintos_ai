# Quintos AI — Database & Schema Architecture Guidelines

This document details the PostgreSQL database schema, Prisma ORM configuration, entity relationships, and indexing strategies for Quintos AI.

---

## 1. Database Architecture Overview

- **Engine:** PostgreSQL 15+ (Hosted on Supabase).
- **ORM:** Prisma ORM 7.x (`@prisma/client`, `prisma`).
- **Connection Configuration:**
  - **`DATABASE_URL`:** Pooled connection string (Port 6543, Transaction mode via Supavisor / PgBouncer).
  - **`DIRECT_URL`:** Direct connection string (Port 5432, Session mode for CLI migrations).
  - **`prisma.config.ts`:** Centralized configuration for Prisma 7 schema resolution.

---

## 2. Entity Relational Diagram

```text
Organization (id, name, slug)
  ├── User (id, authUserId, email, name, role)
  │     ├── Conversation (id, title, model, context)
  │     │     └── Message (id, role, content, tokens)
  │     └── Inquiry (id, name, email, message, status)
  ├── Project (id, name, description, status)
  │     └── Conversation (id, ...)
  ├── APIKey (id, name, keyPrefix, keyHash, status)
  ├── UsageRecord (id, model, computeUnits, timestamp)
  └── Subscription (id, plan, status)
        └── Invoice (id, amount, status, billingDate)
```

---

## 3. Indexing Strategy

To maintain high throughput on analytical and transactional queries, the following indexes are defined:

| Table | Index Columns | Purpose |
| :--- | :--- | :--- |
| `User` | `authUserId`, `organizationId`, `email` | Fast lookup during session resolution |
| `Organization` | `slug` (Unique) | Subdomain and workspace routing |
| `Project` | `organizationId`, `status` | Tenant project filtering |
| `APIKey` | `keyHash` (Unique), `organizationId`, `keyPrefix` | Constant-time authentication lookup |
| `Conversation` | `userId`, `projectId` | User session listing and search |
| `Message` | `conversationId` | Sequential message retrieval |
| `Inquiry` | `email`, `status`, `inquiryType` | CRM triage and duplicate detection |
| `UsageRecord` | `[organizationId, timestamp]`, `userId`, `model` | Aggregated billing metrics & telemetry |
| `Subscription` | `organizationId` (Unique), `status` | Entitlement and plan gating |
| `Invoice` | `subscriptionId`, `status` | Invoice history queries |

---

## 4. Migration & Operational Status

- **Prisma Schema (`prisma/schema.prisma`):** Validated (`npx prisma validate` $\to$ Success).
- **Prisma Client (`@prisma/client`):** Generated (`npx prisma generate` $\to$ Success).
- **Live Database Migrations:** Prepared for execution against a live Supabase instance once connection credentials are provided. No destructive changes are ever run against production databases.
