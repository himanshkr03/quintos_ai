// File: E:\quintos_ai\lib\services\projects\projectService.ts

import prisma from "@/lib/db/prisma";
import { ProjectCreateData } from "@/lib/validations/project";

export class ProjectService {
  /**
   * Creates a new Project strictly scoped to the specified organization.
   */
  async createProject(data: ProjectCreateData) {
    return prisma.project.create({
      data: {
        organizationId: data.organizationId,
        name: data.name,
        description: data.description || null,
        status: "ACTIVE",
      },
    });
  }

  /**
   * Lists all projects belonging to an organization.
   */
  async listProjectsByOrganization(organizationId: string) {
    return prisma.project.findMany({
      where: { organizationId },
      orderBy: { updatedAt: "desc" },
    });
  }

  /**
   * Retrieves a single project verifying organization membership.
   */
  async getProjectById(projectId: string, organizationId: string) {
    return prisma.project.findFirst({
      where: {
        id: projectId,
        organizationId,
      },
    });
  }
}

export const projectService = new ProjectService();
