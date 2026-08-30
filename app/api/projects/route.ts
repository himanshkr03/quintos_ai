// File: E:\quintos_ai\app\api\projects\route.ts

import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { projectService } from "@/lib/services/projects/projectService";
import { ProjectCreateSchema } from "@/lib/validations/project";
import prisma from "@/lib/db/prisma";
import { z } from "zod";

const ClientCreateProjectSchema = z.object({
  name: z
    .string()
    .min(2, "Project name must be at least 2 characters.")
    .max(100, "Project name must not exceed 100 characters.")
    .trim(),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters.")
    .optional(),
});

/**
 * GET /api/projects
 * Lists all active projects belonging to the authenticated user's organization.
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

    const projects = await projectService.listProjectsByOrganization(
      user.organizationId
    );

    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("[List Projects Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to retrieve projects.",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects
 * Creates a new project container scoped to the user's organization.
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

    const validation = ClientCreateProjectSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: validation.error.issues[0]?.message || "Invalid project details.",
          },
        },
        { status: 422 }
      );
    }

    const project = await projectService.createProject({
      name: validation.data.name,
      description: validation.data.description,
      organizationId: user.organizationId,
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("[Create Project Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to create project workspace.",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/projects?id=...
 * Archives a project workspace belonging to the user's organization.
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
    let projectId = searchParams.get("id");

    if (!projectId) {
      try {
        const body = await request.json();
        if (body && typeof body.projectId === "string") {
          projectId = body.projectId;
        }
      } catch {
        // No body provided
      }
    }

    if (!projectId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Project ID is required for archiving.",
          },
        },
        { status: 400 }
      );
    }

    const result = await prisma.project.updateMany({
      where: {
        id: projectId,
        organizationId: user.organizationId,
      },
      data: {
        status: "ARCHIVED",
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "Project not found or already archived.",
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project workspace archived successfully.",
    });
  } catch (error) {
    console.error("[Archive Project Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to archive project.",
        },
      },
      { status: 500 }
    );
  }
}
