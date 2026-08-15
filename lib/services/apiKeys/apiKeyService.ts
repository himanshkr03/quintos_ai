// File: E:\quintos_ai\lib\services\apiKeys\apiKeyService.ts

import crypto from "crypto";
import prisma from "@/lib/db/prisma";
import { CreateApiKeyData, RevokeApiKeyData } from "@/lib/validations/apiKey";

export class ApiKeyService {
  /**
   * Hashes a raw secret key using SHA-256.
   * NEVER store plaintext secret keys in the database.
   */
  hashKey(secret: string): string {
    return crypto.createHash("sha256").update(secret).digest("hex");
  }

  /**
   * Generates a new secret key token, its public prefix, and its SHA-256 hash.
   */
  generateKeySecret(environment: "PRODUCTION" | "STAGING" | "EVALUATION" = "PRODUCTION") {
    const envPrefix = environment === "PRODUCTION" ? "live" : environment === "STAGING" ? "stage" : "test";
    const randomHex = crypto.randomBytes(24).toString("hex");
    const rawSecret = `qnt_${envPrefix}_${randomHex}`;
    const keyPrefix = `qnt_${envPrefix}_${randomHex.substring(0, 4)}`;
    const keyHash = this.hashKey(rawSecret);

    return { rawSecret, keyPrefix, keyHash };
  }

  /**
   * Creates a new APIKey record in the database.
   * Returns the raw secret ONCE for immediate display to the user.
   */
  async createApiKey(data: CreateApiKeyData) {
    const { rawSecret, keyPrefix, keyHash } = this.generateKeySecret(data.environment);

    const apiKeyRecord = await prisma.aPIKey.create({
      data: {
        organizationId: data.organizationId,
        name: data.name,
        keyPrefix,
        keyHash,
        environment: data.environment,
        status: "ACTIVE",
      },
    });

    return {
      apiKey: apiKeyRecord,
      rawSecret, // Only returned at generation time
    };
  }

  /**
   * Lists all API Keys for an organization (omits secret hashes).
   */
  async listApiKeys(organizationId: string) {
    return prisma.aPIKey.findMany({
      where: { organizationId },
      select: {
        id: true,
        name: true,
        keyPrefix: true,
        environment: true,
        status: true,
        lastUsedAt: true,
        createdAt: true,
        revokedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Revokes an active API Key.
   */
  async revokeApiKey(data: RevokeApiKeyData) {
    return prisma.aPIKey.updateMany({
      where: {
        id: data.keyId,
        organizationId: data.organizationId,
        status: "ACTIVE",
      },
      data: {
        status: "REVOKED",
        revokedAt: new Date(),
      },
    });
  }

  /**
   * Verifies an incoming raw API secret against stored hashes.
   */
  async verifyApiKey(rawSecret: string) {
    const keyHash = this.hashKey(rawSecret);
    const keyRecord = await prisma.aPIKey.findUnique({
      where: { keyHash },
      include: { organization: true },
    });

    if (!keyRecord || keyRecord.status !== "ACTIVE") {
      return null;
    }

    // Touch lastUsedAt timestamp asynchronously
    await prisma.aPIKey.update({
      where: { id: keyRecord.id },
      data: { lastUsedAt: new Date() },
    });

    return keyRecord;
  }
}

export const apiKeyService = new ApiKeyService();
