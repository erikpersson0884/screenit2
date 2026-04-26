import { z } from "zod";
import "dotenv/config";
import logger from "../lib/logger.js";

const envSchema = z.object({
    // Core
    DATABASE_URL: z.string().url(),
    PORT: z.number().int().positive().default(3001),
    LOG_LEVEL: z
        .enum(["silent", "error", "warn", "info", "debug"])
        .default("info"),

    // Auth
    JWT_SECRET: z.string().min(1),
    JWT_EXPIRATION_TIME: z
        .string()
        .regex(/^\d+[smhd]$/, "JWT_EXPIRATION_TIME must be like 1h, 30m, 10s")
        .default("1h"),

    // Gamma OAuth-ish
    GAMMA_CLIENT_ID: z.string().min(1),
    GAMMA_CLIENT_SECRET: z.string().min(1),
    GAMMA_REDIRECT_URI: z.string().url(),
    GAMMA_PRE_SHARED_AUTH: z.string().min(1),

    // Frontend
    FRONTEND_URL: z.string().url(),

    // Seed data
    SEED_USER_ID: z.string().uuid().optional(),
    SEED_USER_USERNAME: z.string().min(1).optional(),
    SEED_USER_ROLE: z.enum(["user", "admin"]).optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.format());
  process.exit(1);
} else {
    logger.info("✅ Environment variables loaded successfully");
}

export const env = parsed.data;
