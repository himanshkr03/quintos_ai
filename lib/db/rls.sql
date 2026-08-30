-- ==============================================================================
-- QUINTOS AI — SUPABASE ROW LEVEL SECURITY (RLS) & MULTI-TENANT POLICIES
-- ==============================================================================
-- Architecture:
-- User (auth.uid() -> "User"."authUserId")
--   ↓
-- Organization ("User"."organizationId" -> "Organization"."id")
--   ↓
-- Projects ("Project"."organizationId" = "Organization"."id")
--   ↓
-- Conversations ("Conversation"."userId" = "User"."id")
--   ↓
-- Messages ("Message"."conversationId" = "Conversation"."id")
--   ↓
-- API Keys ("APIKey"."organizationId" = "Organization"."id")
--   ↓
-- Usage Records ("UsageRecord"."organizationId" = "Organization"."id")
-- ==============================================================================

-- 1. Enable RLS on all Application Tables
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

-- ------------------------------------------------------------------------------
-- 2. USER POLICIES
-- ------------------------------------------------------------------------------
-- Users can view their own profile or co-workers within their active organization
CREATE POLICY "user_select_tenant" ON "User"
  FOR SELECT
  USING (
    "authUserId" = auth.uid()::text
    OR "organizationId" IN (
      SELECT u."organizationId" FROM "User" u WHERE u."authUserId" = auth.uid()::text AND u."organizationId" IS NOT NULL
    )
  );

-- Users can only update their own user record
CREATE POLICY "user_update_self" ON "User"
  FOR UPDATE
  USING ("authUserId" = auth.uid()::text);

-- ------------------------------------------------------------------------------
-- 3. ORGANIZATION POLICIES
-- ------------------------------------------------------------------------------
-- Members can view their organization
CREATE POLICY "organization_select_member" ON "Organization"
  FOR SELECT
  USING (
    "id" IN (
      SELECT u."organizationId" FROM "User" u WHERE u."authUserId" = auth.uid()::text
    )
  );

-- Only Owners and Admins can update organization metadata and compute settings
CREATE POLICY "organization_update_admin" ON "Organization"
  FOR UPDATE
  USING (
    "id" IN (
      SELECT u."organizationId" FROM "User" u
      WHERE u."authUserId" = auth.uid()::text AND u."role" IN ('OWNER', 'ADMIN')
    )
  );

-- ------------------------------------------------------------------------------
-- 4. PROJECT POLICIES
-- ------------------------------------------------------------------------------
-- Members can select/read projects belonging to their organization
CREATE POLICY "project_select_tenant" ON "Project"
  FOR SELECT
  USING (
    "organizationId" IN (
      SELECT u."organizationId" FROM "User" u WHERE u."authUserId" = auth.uid()::text
    )
  );

-- Members can insert/update/delete projects inside their organization
CREATE POLICY "project_mutate_tenant" ON "Project"
  FOR ALL
  USING (
    "organizationId" IN (
      SELECT u."organizationId" FROM "User" u WHERE u."authUserId" = auth.uid()::text
    )
  );

-- ------------------------------------------------------------------------------
-- 5. API KEY POLICIES
-- ------------------------------------------------------------------------------
-- API keys are strictly isolated to the member's organization
CREATE POLICY "apikey_tenant_isolation" ON "APIKey"
  FOR ALL
  USING (
    "organizationId" IN (
      SELECT u."organizationId" FROM "User" u WHERE u."authUserId" = auth.uid()::text
    )
  );

-- ------------------------------------------------------------------------------
-- 6. CONVERSATION & MESSAGE POLICIES
-- ------------------------------------------------------------------------------
-- Users can manage conversations they authored
CREATE POLICY "conversation_user_isolation" ON "Conversation"
  FOR ALL
  USING (
    "userId" IN (
      SELECT u."id" FROM "User" u WHERE u."authUserId" = auth.uid()::text
    )
  );

-- Messages are accessible strictly through their parent conversation ownership
CREATE POLICY "message_conversation_isolation" ON "Message"
  FOR ALL
  USING (
    "conversationId" IN (
      SELECT c."id" FROM "Conversation" c
      JOIN "User" u ON c."userId" = u."id"
      WHERE u."authUserId" = auth.uid()::text
    )
  );

-- ------------------------------------------------------------------------------
-- 7. USAGE RECORD POLICIES
-- ------------------------------------------------------------------------------
-- Members can view their organization compute consumption
CREATE POLICY "usage_tenant_select" ON "UsageRecord"
  FOR SELECT
  USING (
    "organizationId" IN (
      SELECT u."organizationId" FROM "User" u WHERE u."authUserId" = auth.uid()::text
    )
  );

-- ------------------------------------------------------------------------------
-- 8. SUBSCRIPTION & INVOICE POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "subscription_tenant_select" ON "Subscription"
  FOR SELECT
  USING (
    "organizationId" IN (
      SELECT u."organizationId" FROM "User" u WHERE u."authUserId" = auth.uid()::text
    )
  );

CREATE POLICY "invoice_tenant_select" ON "Invoice"
  FOR SELECT
  USING (
    "subscriptionId" IN (
      SELECT s."id" FROM "Subscription" s
      JOIN "User" u ON s."organizationId" = u."organizationId"
      WHERE u."authUserId" = auth.uid()::text
    )
  );

-- ------------------------------------------------------------------------------
-- 9. INQUIRY POLICIES
-- ------------------------------------------------------------------------------
-- Public inserts allowed for inquiries (marketing contact forms)
CREATE POLICY "inquiry_public_insert" ON "Inquiry"
  FOR INSERT
  WITH CHECK (true);

-- Authenticated users can view their own inquiries
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
