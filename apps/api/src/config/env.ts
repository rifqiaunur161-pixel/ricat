import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: "../../.env" });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  HOST: z.string().default("0.0.0.0"),
  DATABASE_URL: z.string().default("postgresql://ricat:ricat_secret_password@localhost:5432/ricat_db"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  JWT_SECRET: z.string().default("super_secret_jwt_key_at_least_32_chars_long"),
  COOKIE_SECRET: z.string().default("super_secret_cookie_signing_key_32_chars"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Konfigurasi lingkungan (.env) tidak valid:", _env.error.format());
  process.exit(1);
}

export const env = _env.data;

