// File: E:\quintos_ai\prisma.config.ts

import { defineConfig } from "prisma/config";

/**
 * Prisma 7 Configuration
 * Manages database connection URLs for migrations and CLI operations.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres",
  },
});
