// File: E:\quintos_ai\app\api\settings\route.ts

import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import prisma from "@/lib/db/prisma";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const SettingsSchema = z.object({
  defaultModel: z.enum([
    "quintos-reasoning-v1",
    "quintos-bio-vision-3d",
    "quintos-quantum-vqe",
    "quintos-secure-llm",
  ]),
  dataResidency: z.enum([
    "in-sovereign",
    "eu-sovereign",
    "us-dedicated",
  ]),
  latencyBudget: z.enum([
    "balanced",
    "low-latency",
    "batch",
  ]),
  weeklyDigest: z.boolean(),
  quotaAlerts: z.boolean(),
  anomalyAlerts: z.boolean(),
});

export type WorkspaceSettings = z.infer<typeof SettingsSchema>;

const DEFAULT_SETTINGS: WorkspaceSettings = {
  defaultModel: "quintos-reasoning-v1",
  dataResidency: "in-sovereign",
  latencyBudget: "balanced",
  weeklyDigest: true,
  quotaAlerts: true,
  anomalyAlerts: true,
};

/**
 * GET /api/settings
 * Retrieves persistent settings for the authenticated user and organization.
 */
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "UNAUTHORIZED", message: "Authentication required." },
        },
        { status: 401 }
      );
    }

    if (user.organizationId) {
      const org = await prisma.organization.findUnique({
        where: { id: user.organizationId },
        select: { settings: true },
      });

      if (org?.settings && typeof org.settings === "object" && !Array.isArray(org.settings)) {
        return NextResponse.json({
          success: true,
          settings: { ...DEFAULT_SETTINGS, ...org.settings },
        });
      }
    }

    // Check user-level settings fallback
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { settings: true },
    });

    if (dbUser?.settings && typeof dbUser.settings === "object" && !Array.isArray(dbUser.settings)) {
      return NextResponse.json({
        success: true,
        settings: { ...DEFAULT_SETTINGS, ...dbUser.settings },
      });
    }

    return NextResponse.json({
      success: true,
      settings: DEFAULT_SETTINGS,
    });
  } catch (error) {
    console.error("[Get Settings Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to retrieve settings." },
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/settings
 * Persists updated workspace settings for the authenticated organization.
 */
export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "UNAUTHORIZED", message: "Authentication required." },
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
          error: { code: "BAD_REQUEST", message: "Invalid JSON body." },
        },
        { status: 400 }
      );
    }

    const validation = SettingsSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: validation.error.issues[0]?.message || "Invalid settings payload.",
          },
        },
        { status: 422 }
      );
    }

    const validSettings = validation.data;
    const settingsJson = validSettings as unknown as Prisma.InputJsonValue;

    if (user.organizationId) {
      await prisma.organization.update({
        where: { id: user.organizationId },
        data: { settings: settingsJson },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { settings: settingsJson },
      });
    }

    return NextResponse.json({
      success: true,
      settings: validSettings,
      message: "Workspace settings persisted successfully.",
    });
  } catch (error) {
    console.error("[Update Settings Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to persist settings." },
      },
      { status: 500 }
    );
  }
}
