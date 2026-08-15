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
  async getOrganizationUsageSummary(organizationId: string, startDate: Date, endDate: Date = new Date()) {
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
}

export const usageService = new UsageService();
