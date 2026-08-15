// File: E:\quintos_ai\lib\security\rateLimit.ts

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory token bucket store for request throttling.
// NOTE: In-memory store is suitable for single-node / development environments.
// In a distributed serverless/multi-instance production environment, this abstraction
// can be backed by Upstash Redis without altering route handlers.
const memoryStore = new Map<string, RateLimitRecord>();

// Clean up expired entries periodically to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of memoryStore.entries()) {
      if (record.resetAt <= now) {
        memoryStore.delete(key);
      }
    }
  }, 60 * 1000);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  totalLimit: number;
}

/**
 * Checks whether an incoming identifier (e.g. client IP) has exceeded request limits.
 *
 * @param identifier Unique client key (such as client IP or hashed fingerprint)
 * @param limit Maximum number of allowed requests in the time window (default: 5)
 * @param windowMs Window duration in milliseconds (default: 10 minutes)
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 10 * 60 * 1000
): RateLimitResult {
  const now = Date.now();
  const record = memoryStore.get(identifier);

  if (!record || record.resetAt <= now) {
    // Initial request or window expired
    memoryStore.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: limit - 1,
      resetAt: now + windowMs,
      totalLimit: limit,
    };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.resetAt,
      totalLimit: limit,
    };
  }

  record.count += 1;
  memoryStore.set(identifier, record);

  return {
    allowed: true,
    remaining: limit - record.count,
    resetAt: record.resetAt,
    totalLimit: limit,
  };
}
