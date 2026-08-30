// File: E:\quintos_ai\app\api\dashboard\stats\route.ts

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { usageService } from "@/lib/services/usage/usageService";
import prisma from "@/lib/db/prisma";

/**
 * GET /api/dashboard/stats
 * Retrieves live organization-scoped usage metrics, project counts, and compute telemetry.
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

    const orgId = user.organizationId;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [usageSummary, projectCount, conversationCount, activeKeysCount, recentRecords] =
      await Promise.all([
        usageService.getOrganizationUsageSummary(orgId, thirtyDaysAgo),
        prisma.project.count({
          where: { organizationId: orgId, status: "ACTIVE" },
        }),
        prisma.conversation.count({
          where: { user: { organizationId: orgId } },
        }),
        prisma.aPIKey.count({
          where: { organizationId: orgId, status: "ACTIVE" },
        }),
        prisma.usageRecord.findMany({
          where: {
            organizationId: orgId,
            timestamp: { gte: thirtyDaysAgo },
          },
          orderBy: { timestamp: "desc" },
          take: 10,
        }),
      ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalRequests: usageSummary.totalRequests,
        totalPromptTokens: usageSummary.totalPromptTokens,
        totalCompletionTokens: usageSummary.totalCompletionTokens,
        totalTokens: usageSummary.totalPromptTokens + usageSummary.totalCompletionTokens,
        totalComputeUnits: Math.round(usageSummary.totalComputeUnits * 10) / 10,
        activeProjects: projectCount,
        totalConversations: conversationCount,
        activeApiKeys: activeKeysCount,
      },
      recentUsage: recentRecords,
    });
  } catch (error) {
    console.error("[Get Dashboard Stats Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to retrieve dashboard telemetry.",
        },
      },
      { status: 500 }
    );
  }
}
