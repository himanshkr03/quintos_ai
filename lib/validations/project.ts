// File: E:\quintos_ai\lib\validations\project.ts

import { z } from "zod";

export const ProjectCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Project name must be at least 2 characters.")
    .max(100, "Project name must not exceed 100 characters.")
    .trim(),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters.")
    .optional(),
  organizationId: z.string().min(1, "Organization ID is required."),
});

export type ProjectCreateData = z.infer<typeof ProjectCreateSchema>;
