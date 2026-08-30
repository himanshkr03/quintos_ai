// File: E:\quintos_ai\app\api\api-keys\route.ts

import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { apiKeyService } from "@/lib/services/apiKeys/apiKeyService";
import { ApiKeyEnvironmentEnum } from "@/lib/validations/apiKey";
import { z } from "zod";

const ClientCreateApiKeySchema = z.object({
  name: z
    .string()
    .min(2, "Key identifier name must be at least 2 characters.")
    .max(80, "Key identifier name must not exceed 80 characters.")
    .trim(),
  environment: ApiKeyEnvironmentEnum.default("PRODUCTION"),
});

/**
 * GET /api/api-keys
 * Returns all API keys belonging to the authenticated user's organization.
 */
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || !user.organizationId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication and active organization membership required.",
          },
        },
        { status: 401 }
      );
    }

    const apiKeys = await apiKeyService.listApiKeys(user.organizationId);
    return NextResponse.json({ success: true, apiKeys });
  } catch (error) {
    console.error("[List API Keys Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to retrieve API keys.",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/api-keys
 * Generates a new API key for the authenticated user's organization.
 * Plaintext secret is returned ONCE only at creation time.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.organizationId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication and active organization membership required.",
          },
        },
        { status: 401 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Invalid JSON request body.",
          },
        },
        { status: 400 }
      );
    }

    const validation = ClientCreateApiKeySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: validation.error.issues[0]?.message || "Invalid input parameters.",
          },
        },
        { status: 422 }
      );
    }

    const { name, environment } = validation.data;
    const { apiKey, rawSecret } = await apiKeyService.createApiKey({
      organizationId: user.organizationId,
      name,
      environment,
    });

    return NextResponse.json(
      {
        success: true,
        apiKey: {
          id: apiKey.id,
          name: apiKey.name,
          keyPrefix: apiKey.keyPrefix,
          environment: apiKey.environment,
          status: apiKey.status,
          createdAt: apiKey.createdAt,
          lastUsedAt: apiKey.lastUsedAt,
        },
        secret: rawSecret, // Returned strictly once at creation time
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Create API Key Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to generate API key.",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/api-keys?id=...
 * Revokes an existing API key belonging to the user's organization.
 */
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.organizationId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication and active organization membership required.",
          },
        },
        { status: 401 }
      );
    }

    const { searchParams } = request.nextUrl;
    let keyId = searchParams.get("id");

    if (!keyId) {
      try {
        const body = await request.json();
        if (body && typeof body.keyId === "string") {
          keyId = body.keyId;
        }
      } catch {
        // No body provided
      }
    }

    if (!keyId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Key identifier (id) is required for revocation.",
          },
        },
        { status: 400 }
      );
    }

    const result = await apiKeyService.revokeApiKey({
      keyId,
      organizationId: user.organizationId,
    });

    if (result.count === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "API key not found or already revoked.",
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "API key revoked successfully.",
    });
  } catch (error) {
    console.error("[Revoke API Key Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to revoke API key.",
        },
      },
      { status: 500 }
    );
  }
}
