import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  uuid,
  varchar,
  jsonb,
  numeric,
} from "drizzle-orm/pg-core";

export const systemSettings = pgTable("system_settings", {
  key: varchar("key", { length: 128 }).primaryKey(),
  value: jsonb("value").notNull(),
  updatedBy: uuid("updated_by"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const features = pgTable("features", {
  key: varchar("key", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  enabled: boolean("enabled").notNull().default(true),
  guestAllowed: boolean("guest_allowed").notNull().default(false),
  requiresPaidAi: boolean("requires_paid_ai").notNull().default(false),
});

export const quotaRules = pgTable("quota_rules", {
  id: uuid("id").primaryKey().defaultRandom(),
  featureKey: varchar("feature_key", { length: 64 }).notNull(),
  subject: varchar("subject", { length: 32 }).notNull(), // guest, mahasiswa, dosen, pro
  period: varchar("period", { length: 32 }).notNull(), // daily, monthly, lifetime
  metric: varchar("metric", { length: 32 }).notNull(), // tokens, requests, bytes, audio_seconds
  limitValue: integer("limit_value").notNull(),
});

export const quotaOverrides = pgTable("quota_overrides", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  featureKey: varchar("feature_key", { length: 64 }).notNull(),
  metric: varchar("metric", { length: 32 }).notNull(),
  period: varchar("period", { length: 32 }).notNull(),
  limitValue: integer("limit_value").notNull(),
});

export const aiModels = pgTable("ai_models", {
  id: varchar("id", { length: 64 }).primaryKey(), // gemini-flash, claude-sonnet, gpt-4o-mini, deepseek-local
  provider: varchar("provider", { length: 64 }).notNull(), // google, anthropic, openai, local
  modelId: varchar("model_id", { length: 128 }).notNull(), // e.g. gemini-2.5-flash
  displayName: varchar("display_name", { length: 128 }).notNull(),
  tier: varchar("tier", { length: 32 }).notNull().default("default"),
  guestAllowed: boolean("guest_allowed").notNull().default(false),
  enabled: boolean("enabled").notNull().default(true),
  priceInPerMtok: numeric("price_in_per_mtok", { precision: 10, scale: 4 }).notNull().default("0"),
  priceOutPerMtok: numeric("price_out_per_mtok", { precision: 10, scale: 4 }).notNull().default("0"),
  maxOutputTokens: integer("max_output_tokens").notNull().default(8192),
});

export const routingRules = pgTable("routing_rules", {
  id: uuid("id").primaryKey().defaultRandom(),
  taskType: varchar("task_type", { length: 64 }).notNull(), // chat, dokumen, summarization, stt, code
  preset: varchar("preset", { length: 32 }).notNull().default("balanced"), // fast, balanced, quality
  modelId: varchar("model_id", { length: 64 }).notNull().references(() => aiModels.id),
  priority: integer("priority").notNull().default(1),
});

