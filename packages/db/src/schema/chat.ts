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
} from "drizzle-orm/pg-core";
import { users } from "./auth.js";

export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull().default("Percakapan Baru"),
  mode: varchar("mode", { length: 32 }).notNull().default("chat"), // chat, report, study
  preset: varchar("preset", { length: 32 }).notNull().default("balanced"), // fast, balanced, quality
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversationId: uuid("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 32 }).notNull(), // user, assistant, system
  parts: jsonb("parts").notNull(), // text, citations, tool_calls, code snippets
  modelId: varchar("model_id", { length: 64 }),
  taskType: varchar("task_type", { length: 64 }).notNull().default("chat"),
  tokensIn: integer("tokens_in").notNull().default(0),
  tokensOut: integer("tokens_out").notNull().default(0),
  costUsd: numeric("cost_usd", { precision: 10, scale: 6 }).notNull().default("0"),
  errorCode: varchar("error_code", { length: 64 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const files = pgTable("files", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  storageKey: text("storage_key").notNull(),
  originalName: varchar("original_name", { length: 255 }).notNull(),
  mime: varchar("mime", { length: 128 }).notNull(),
  sizeBytes: bigint("size_bytes", { mode: "number" }).notNull(),
  sha256: varchar("sha256", { length: 64 }),
  kind: varchar("kind", { length: 32 }).notNull(), // pdf, docx, audio, image
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const jobs = pgTable("jobs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  guestId: uuid("guest_id"),
  type: varchar("type", { length: 64 }).notNull(), // stt, convert, compress, rag_index
  status: varchar("status", { length: 32 }).notNull().default("queued"), // queued, processing, completed, failed
  progress: integer("progress").notNull().default(0),
  input: jsonb("input").notNull(),
  outputFileId: uuid("output_file_id").references(() => files.id, { onDelete: "set null" }),
  error: text("error"),
  attempts: integer("attempts").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
});

