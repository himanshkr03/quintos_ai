// File: E:\quintos_ai\lib\services\usage\usageService.ts

import prisma from "@/lib/db/prisma";

export interface RecordUsageParams {
  organizationId: string;
  userId?: string;
  model: string;
  promptTokens?: number;
  completionTokens?: number;
  computeUnits?: number;
  requestCount?: number;
}

export class UsageService {
  /**
   * Logs a compute or token usage event.
   */
  async recordUsage(params: RecordUsageParams) {
    return prisma.usageRecord.create({
      data: {
        organizationId: params.organizationId,
        userId: params.userId || null,
        model: params.model,
        promptTokens: params.promptTokens || 0,
        completionTokens: params.completionTokens || 0,
        computeUnits: params.computeUnits || 0,
        requestCount: params.requestCount || 1,
      },
    });
  }

  /**
   * Retrieves aggregated usage statistics for an organization over a date range.
   */
  async getOrganizationUsageSummary(
    organizationId: string,
    startDate: Date,
    endDate: Date = new Date()
  ) {
    const aggregate = await prisma.usageRecord.aggregate({
      where: {
        organizationId,
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        promptTokens: true,
        completionTokens: true,
        computeUnits: true,
        requestCount: true,
      },
    });

    return {
      totalPromptTokens: aggregate._sum.promptTokens || 0,
      totalCompletionTokens: aggregate._sum.completionTokens || 0,
      totalComputeUnits: aggregate._sum.computeUnits || 0,
      totalRequests: aggregate._sum.requestCount || 0,
    };
  }

  /**
   * Checks whether an organization has exceeded its monthly AI compute quota.
   * Default free research quota is 100.0 Compute Units (or customized in organization settings).
   */
  async checkOrganizationQuota(
    organizationId: string,
    defaultMonthlyLimitCU = 100.0
  ): Promise<{
    allowed: boolean;
    currentUsage: number;
    limit: number;
    remaining: number;
  }> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Retrieve organization settings if custom quota is configured
    const org = await prisma.organization.findUnique({
      where: { id: organizationId },
      select: { settings: true },
    });

    let limit = defaultMonthlyLimitCU;
    if (
      org?.settings &&
      typeof org.settings === "object" &&
      "monthlyQuotaCU" in org.settings
    ) {
      const customQuota = (org.settings as { monthlyQuotaCU?: number })
        .monthlyQuotaCU;
      if (typeof customQuota === "number" && customQuota > 0) {
        limit = customQuota;
      }
    }

    const summary = await this.getOrganizationUsageSummary(
      organizationId,
      startOfMonth
    );
    const currentUsage = Math.round(summary.totalComputeUnits * 10) / 10;
    const remaining = Math.max(0, Math.round((limit - currentUsage) * 10) / 10);
    const allowed = currentUsage < limit;

    return {
      allowed,
      currentUsage,
      limit,
      remaining,
    };
  }
}

export const usageService = new UsageService();
