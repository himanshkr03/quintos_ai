// File: E:\quintos_ai\lib\services\organizations\organizationService.ts

import prisma from "@/lib/db/prisma";
import { OrganizationCreateData } from "@/lib/validations/organization";
import { Prisma } from "@prisma/client";

export class OrganizationService {
  /**
   * Creates a new Organization and assigns the creator as OWNER.
   */
  async createOrganization(data: OrganizationCreateData, creatorUserId: string) {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const org = await tx.organization.create({
        data: {
          name: data.name,
          slug: data.slug,
        },
      });

      // Update creator's organization and promote to OWNER
      await tx.user.update({
        where: { id: creatorUserId },
        data: {
          organizationId: org.id,
          role: "OWNER",
        },
      });

      return org;
    });
  }

  /**
   * Retrieves an organization by slug with members and project counts.
   */
  async getOrganizationBySlug(slug: string) {
    return prisma.organization.findUnique({
      where: { slug },
      include: {
        _count: {
          select: {
            users: true,
            projects: true,
            apiKeys: true,
          },
        },
      },
    });
  }

  /**
   * Retrieves an organization by ID.
   */
  async getOrganizationById(id: string) {
    return prisma.organization.findUnique({
      where: { id },
      include: {
        subscription: true,
      },
    });
  }
}

export const organizationService = new OrganizationService();
