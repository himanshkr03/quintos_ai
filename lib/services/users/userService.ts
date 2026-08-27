// File: E:\quintos_ai\lib\services\users\userService.ts

import prisma from "@/lib/db/prisma";
import { ProfileUpdateData } from "@/lib/validations/profile";
import { Prisma } from "@prisma/client";

export class UserService {
  /**
   * Retrieves a user by their Supabase authentication ID.
   */
  async getUserByAuthId(authUserId: string) {
    return prisma.user.findUnique({
      where: { authUserId },
      include: {
        organization: true,
      },
    });
  }

  /**
   * Retrieves a user by their internal database ID.
   */
  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        organization: true,
      },
    });
  }

  /**
   * Ensures an application-level User and default Organization exist for an authenticated Supabase account.
   */
  async findOrCreateUser(
    authUserId: string,
    email: string,
    name?: string | null,
    organizationName?: string | null
  ) {
    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { authUserId },
      include: { organization: true },
    });

    if (existingUser) {
      return existingUser;
    }

    // 2. Provision new organization and user inside a transaction
    const orgName = organizationName || (name ? `${name}'s Research Lab` : "Quintos AI Workspace");
    const baseSlug = orgName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "workspace";
    const uniqueSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;

    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create Organization
      const org = await tx.organization.create({
        data: {
          name: orgName,
          slug: uniqueSlug,
        },
      });

      // Create User with OWNER role
      const user = await tx.user.create({
        data: {
          authUserId,
          email,
          name: name || null,
          role: "OWNER",
          organizationId: org.id,
        },
        include: {
          organization: true,
        },
      });

      // Create initial Project
      await tx.project.create({
        data: {
          organizationId: org.id,
          name: "Primary Research Workspace",
          description: "Default project container for models, datasets, and reasoning trajectories.",
          status: "ACTIVE",
        },
      });

      return user;
    });
  }

  /**
   * Updates user profile fields with validated input.
   */
  async updateProfile(userId: string, data: ProfileUpdateData) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        avatarUrl: data.avatarUrl || null,
      },
      include: {
        organization: true,
      },
    });
  }
}

export const userService = new UserService();
