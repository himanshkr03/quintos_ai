// File: E:\quintos_ai\lib\validations\apiKey.ts

import { z } from "zod";

export const ApiKeyEnvironmentEnum = z.enum([
  "PRODUCTION",
  "STAGING",
  "EVALUATION",
]);

export const CreateApiKeySchema = z.object({
  name: z
    .string()
    .min(2, "Key identifier name must be at least 2 characters.")
    .max(80, "Key identifier name must not exceed 80 characters.")
    .trim(),
  organizationId: z.string().min(1, "Organization ID is required."),
  environment: ApiKeyEnvironmentEnum.default("PRODUCTION"),
});

export const RevokeApiKeySchema = z.object({
  keyId: z.string().min(1, "Key ID is required."),
  organizationId: z.string().min(1, "Organization ID is required."),
});

export type CreateApiKeyData = z.infer<typeof CreateApiKeySchema>;
export type RevokeApiKeyData = z.infer<typeof RevokeApiKeySchema>;
