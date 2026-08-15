// File: E:\quintos_ai\lib\validations\profile.ts

import { z } from "zod";

export const ProfileUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must not exceed 100 characters.")
    .trim(),
  avatarUrl: z
    .string()
    .url("Avatar must be a valid URL.")
    .max(500)
    .optional()
    .or(z.literal("")),
  organizationName: z
    .string()
    .max(150, "Organization name is too long.")
    .optional(),
  roleTitle: z
    .string()
    .max(100, "Role title is too long.")
    .optional(),
  location: z
    .string()
    .max(150, "Location string is too long.")
    .optional(),
  bio: z
    .string()
    .max(1000, "Biography must not exceed 1000 characters.")
    .optional(),
});

export type ProfileUpdateData = z.infer<typeof ProfileUpdateSchema>;
