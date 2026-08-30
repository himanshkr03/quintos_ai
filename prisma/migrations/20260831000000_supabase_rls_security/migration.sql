-- Migration: 20260831000000_supabase_rls_security
-- Description: Enables PostgreSQL Row Level Security (RLS) policies for multi-tenant isolation

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Organization" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "APIKey" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Conversation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Message" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UsageRecord" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Invoice" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Inquiry" ENABLE ROW LEVEL SECURITY;

-- User Policies
DO $$ BEGIN
  CREATE POLICY "user_select_tenant" ON "User"
    FOR SELECT
    USING (
      "authUserId" = auth.uid()::text
      OR "organizationId" IN (
        SELECT u."organizationId" FROM "User" u WHERE u."authUserId" = auth.uid()::text AND u."organizationId" IS NOT NULL
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "user_update_self" ON "User"
    FOR UPDATE
    USING ("authUserId" = auth.uid()::text);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Organization Policies
DO $$ BEGIN
  CREATE POLICY "organization_select_member" ON "Organization"
    FOR SELECT
    USING (
      "id" IN (
        SELECT u."organizationId" FROM "User" u WHERE u."authUserId" = auth.uid()::text
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "organization_update_admin" ON "Organization"
    FOR UPDATE
    USING (
      "id" IN (
        SELECT u."organizationId" FROM "User" u
        WHERE u."authUserId" = auth.uid()::text AND u."role" IN ('OWNER', 'ADMIN')
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Project Policies
DO $$ BEGIN
  CREATE POLICY "project_select_tenant" ON "Project"
    FOR SELECT
    USING (
      "organizationId" IN (
        SELECT u."organizationId" FROM "User" u WHERE u."authUserId" = auth.uid()::text
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "project_mutate_tenant" ON "Project"
    FOR ALL
    USING (
      "organizationId" IN (
        SELECT u."organizationId" FROM "User" u WHERE u."authUserId" = auth.uid()::text
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- API Key Policies
DO $$ BEGIN
  CREATE POLICY "apikey_tenant_isolation" ON "APIKey"
    FOR ALL
    USING (
      "organizationId" IN (
        SELECT u."organizationId" FROM "User" u WHERE u."authUserId" = auth.uid()::text
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Conversation Policies
DO $$ BEGIN
  CREATE POLICY "conversation_user_isolation" ON "Conversation"
    FOR ALL
    USING (
      "userId" IN (
        SELECT u."id" FROM "User" u WHERE u."authUserId" = auth.uid()::text
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Message Policies
DO $$ BEGIN
  CREATE POLICY "message_conversation_isolation" ON "Message"
    FOR ALL
    USING (
      "conversationId" IN (
        SELECT c."id" FROM "Conversation" c
        JOIN "User" u ON c."userId" = u."id"
        WHERE u."authUserId" = auth.uid()::text
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Usage Record Policies
DO $$ BEGIN
  CREATE POLICY "usage_tenant_select" ON "UsageRecord"
    FOR SELECT
    USING (
      "organizationId" IN (
        SELECT u."organizationId" FROM "User" u WHERE u."authUserId" = auth.uid()::text
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Subscription Policies
DO $$ BEGIN
  CREATE POLICY "subscription_tenant_select" ON "Subscription"
    FOR SELECT
    USING (
      "organizationId" IN (
        SELECT u."organizationId" FROM "User" u WHERE u."authUserId" = auth.uid()::text
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Invoice Policies
DO $$ BEGIN
  CREATE POLICY "invoice_tenant_select" ON "Invoice"
    FOR SELECT
    USING (
      "subscriptionId" IN (
        SELECT s."id" FROM "Subscription" s
        JOIN "User" u ON s."organizationId" = u."organizationId"
        WHERE u."authUserId" = auth.uid()::text
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Inquiry Policies
DO $$ BEGIN
  CREATE POLICY "inquiry_public_insert" ON "Inquiry"
    FOR INSERT
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "inquiry_user_select" ON "Inquiry"
    FOR SELECT
    USING (
      "userId" IN (
        SELECT u."id" FROM "User" u WHERE u."authUserId" = auth.uid()::text
      )
      OR "email" IN (
        SELECT u."email" FROM "User" u WHERE u."authUserId" = auth.uid()::text
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
