// File: E:\quintos_ai\lib\validations\organization.ts

import { z } from "zod";

export const OrganizationCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Organization name must be at least 2 characters.")
    .max(100, "Organization name must not exceed 100 characters.")
    .trim(),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters.")
    .max(60, "Slug must not exceed 60 characters.")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens.")
    .trim(),
});

export type OrganizationCreateData = z.infer<typeof OrganizationCreateSchema>;
