# Quintos AI — Authentication & Identity Architecture Guidelines

This document outlines the authentication lifecycle, session architecture, organization auto-provisioning, and security policies governing Quintos AI.

---

## 1. Authentication Lifecycle Flow

```text
Browser
  ↓
Supabase Auth (signInWithPassword / signUp / resetPasswordForEmail)
  ↓
Secure HttpOnly Cookies (@supabase/ssr)
  ↓
Next.js Middleware (middleware.ts token refresh & route protection)
  ↓
Authoritative Server Session (lib/auth/session.ts -> getCurrentUser())
  ↓
Application User & Organization Resolution (lib/services/users/userService.ts)
  ↓
Role-Based Authorization & Multi-Tenant Isolation
  ↓
Protected Dashboard Workspace (/dashboard, /profile, /settings, /api-keys, /billing)
```

---

## 2. Authentication Pages & Routes

| Route | Purpose | Protected / Public | Notes |
| :--- | :--- | :--- | :--- |
| `/login` | User sign in | **Public** | Validates email/password; redirects authenticated users to `/dashboard` |
| `/signup` | User & Org registration | **Public** | Validates name, email, org, password match; prompts for email confirmation |
| `/verify-email` | Email verification notice | **Public** | Clear guidance to check inbox for activation link |
| `/forgot-password` | Password recovery request | **Public** | Sends recovery email with neutral message to prevent user enumeration |
| `/reset-password` | Set new password | **Public** | Allows setting a new password via Supabase Auth update |
| `/auth/callback` | OAuth & Email Callback | **Public** | Exchanges code for session, auto-provisions Prisma User/Org, safe redirect |

---

## 3. User & Organization Initialization

### Identity Mapping
- Supabase Auth maintains credentials and issues tokens (`auth.users.id`).
- Application database maps `auth.users.id` to `User.authUserId`.
- Passwords and raw authentication tokens NEVER touch the application database or Prisma models.

### First Account Provisioning
When a user authenticates for the first time:
1. `userService.findOrCreateUser(authUserId, email, name, organizationName)` is invoked.
2. If no record exists, it automatically executes a PostgreSQL transaction that:
   - Creates an `Organization` with a unique slug.
   - Creates the application `User` with role `OWNER`.
   - Provisions a default initial `Project` (`Primary Research Workspace`).

---

## 4. Role-Based Authorization

| Role | Permissions & Scope |
| :--- | :--- |
| `OWNER` | Full administrative control over organization, members, billing, API keys, and clusters. |
| `ADMIN` | Management of workspace projects, models, and telemetry. |
| `MEMBER` | Standard access to models, datasets, and inference workspaces. |
| `RESEARCHER` | Scientific and model experimentation access without administrative privileges. |

### Server-Side Helpers (`lib/auth/session.ts`)
- `getCurrentUser()`: Resolves authenticated user, organization, and role.
- `requireAuth()`: Enforces an active authenticated session.
- `requireOrganization()`: Enforces organization membership.
- `requireRole(allowedRoles)`: Enforces role checks on sensitive mutations.

---

## 5. Middleware & Route Protection (`middleware.ts`)

- **Protected Routes:** `/dashboard`, `/api-keys`, `/billing`, `/profile`, `/settings`
- **Public Routes:** Marketing pages (`/`, `/about`, `/services`, `/products`, `/research`, `/pricing`, `/blog`, `/careers`, `/contact`, `/faq`, `/privacy`, `/terms`) and auth pages (`/login`, `/signup`, etc.).
- **Unauthenticated Handling:** Redirects to `/login?next=${pathname}`.
- **Open Redirect Protection:** Validates that `next` parameters are internal relative paths.
- **Demonstration Mode:** If Supabase credentials are not configured in local environment, allows evaluation mode without crashing.

---

## 6. Implementation Status

| Component | Status in Phase 5C | Notes |
| :--- | :--- | :--- |
| **Supabase SSR Client & Server** | **IMPLEMENTED** | `@supabase/ssr` with async cookies |
| **Auth Pages (/login, /signup, etc.)** | **IMPLEMENTED** | Complete with Zod validation & accessible states |
| **Auth Callback (/auth/callback)** | **IMPLEMENTED** | Code exchange & auto-provisioning |
| **User & Org Auto-Provisioning** | **IMPLEMENTED** | `UserService.findOrCreateUser()` |
| **Server-Side Session Helpers** | **IMPLEMENTED** | `getCurrentUser`, `requireAuth`, `requireRole` |
| **Next.js Middleware Protection** | **IMPLEMENTED** | `middleware.ts` active |
| **External Supabase Live Verification** | **AWAITING CREDENTIALS** | Configured for Supabase Auth |
