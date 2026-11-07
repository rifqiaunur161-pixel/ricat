import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  varchar,
  jsonb,
  numeric,
  bigint,
  date,
} from "drizzle-orm/pg-core";
import { users } from "./auth.js";

export const usageEvents = pgTable("usage_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  guestId: uuid("guest_id"),
  featureKey: varchar("feature_key", { length: 64 }).notNull(),
  modelId: varchar("model_id", { length: 64 }),
  taskType: varchar("task_type", { length: 64 }).notNull(),
  inputTokens: integer("input_tokens").notNull().default(0),
  outputTokens: integer("output_tokens").notNull().default(0),
  audioSeconds: integer("audio_seconds").notNull().default(0),
  bytes: bigint("bytes", { mode: "number" }).notNull().default(0),
  durationMs: integer("duration_ms").notNull().default(0),
  costUsd: numeric("cost_usd", { precision: 10, scale: 6 }).notNull().default("0"),
  status: varchar("status", { length: 32 }).notNull().default("success"), // success, failed, throttled
  errorCode: varchar("error_code", { length: 64 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const usageDaily = pgTable("usage_daily", {
  id: uuid("id").primaryKey().defaultRandom(),
  date: date("date").notNull(),
  subjectKey: varchar("subject_key", { length: 128 }).notNull(), // user:UUID or guest:UUID
  featureKey: varchar("feature_key", { length: 64 }).notNull(),
  count: integer("count").notNull().default(0),
  tokens: integer("tokens").notNull().default(0),
  costUsd: numeric("cost_usd", { precision: 10, scale: 4 }).notNull().default("0"),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  actorId: uuid("actor_id").references(() => users.id, { onDelete: "set null" }),
  action: varchar("action", { length: 64 }).notNull(), // USER_REGISTERED, USER_APPROVED, USER_BANNED, MODEL_ROUTED, KILL_SWITCH_TRIGGERED
  targetType: varchar("target_type", { length: 64 }),
  targetId: varchar("target_id", { length: 128 }),
  metadata: jsonb("metadata"),
  ip: varchar("ip", { length: 64 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const appErrors = pgTable("app_errors", {
  id: uuid("id").primaryKey().defaultRandom(),
  source: varchar("source", { length: 64 }).notNull(), // api, worker, web
  message: text("message").notNull(),
  stackHash: varchar("stack_hash", { length: 64 }),
  context: jsonb("context"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

