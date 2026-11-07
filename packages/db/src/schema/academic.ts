import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  varchar,
  jsonb,
  customType,
} from "drizzle-orm/pg-core";
import { users } from "./auth.js";
import { files } from "./chat.js";

// Custom type for pgvector 1536 (OpenAI / Gemini embeddings)
const vector1536 = customType<{ data: number[] }>({
  dataType() {
    return "vector(1536)";
  },
  toDriver(value: number[]) {
    return `[${value.join(",")}]`;
  },
  fromDriver(value: unknown) {
    if (typeof value === "string") {
      return value
        .slice(1, -1)
        .split(",")
        .map(Number);
    }
    return value as number[];
  },
});

export const sources = pgTable("sources", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 32 }).notNull(), // pdf, paper, web, book
  title: varchar("title", { length: 512 }).notNull(),
  authors: jsonb("authors"), // string[]
  year: integer("year"),
  publisher: varchar("publisher", { length: 255 }),
  url: text("url"),
  doi: varchar("doi", { length: 128 }),
  accessedAt: timestamp("accessed_at", { withTimezone: true }),
  completeness: varchar("completeness", { length: 32 }).notNull().default("complete"), // complete, partial, needs_review
  fileId: uuid("file_id").references(() => files.id, { onDelete: "set null" }),
  raw: jsonb("raw"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const sourceChunks = pgTable("source_chunks", {
  id: uuid("id").primaryKey().defaultRandom(),
  sourceId: uuid("source_id").notNull().references(() => sources.id, { onDelete: "cascade" }),
  page: integer("page").notNull().default(1),
  text: text("text").notNull(),
  embedding: vector1536("embedding"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const campusProfiles = pgTable("campus_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: uuid("owner_id").references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 128 }).notNull(), // e.g. "Pedoman Makalah ITB 2024", "Skripsi UGM"
  taskType: varchar("task_type", { length: 64 }).notNull(), // makalah, skripsi, ppt
  structureInstruction: text("structure_instruction").notNull(),
  citationStyle: varchar("citation_style", { length: 32 }).notNull().default("APA"), // APA, IEEE, Harvard
  templateFileId: uuid("template_file_id").references(() => files.id, { onDelete: "set null" }),
  formatting: jsonb("formatting"), // font, margins, spacing
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const reports = pgTable("reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  campusProfileId: uuid("campus_profile_id").references(() => campusProfiles.id, { onDelete: "set null" }),
  citationStyle: varchar("citation_style", { length: 32 }).notNull().default("APA"),
  status: varchar("status", { length: 32 }).notNull().default("draft"), // draft, generating, completed, failed
  content: jsonb("content").notNull(), // sections, outlines, body
  outputFileId: uuid("output_file_id").references(() => files.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const reportCitations = pgTable("report_citations", {
  id: uuid("id").primaryKey().defaultRandom(),
  reportId: uuid("report_id").notNull().references(() => reports.id, { onDelete: "cascade" }),
  claimKey: varchar("claim_key", { length: 128 }).notNull(),
  sourceId: uuid("source_id").references(() => sources.id, { onDelete: "set null" }),
  page: integer("page"),
  status: varchar("status", { length: 32 }).notNull().default("verified"), // verified, unverified, user_override
});

export const studySets = pgTable("study_sets", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 32 }).notNull(), // flashcard, quiz
  title: varchar("title", { length: 255 }).notNull(),
  sourceFileId: uuid("source_file_id").references(() => files.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const studyItems = pgTable("study_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  studySetId: uuid("study_set_id").notNull().references(() => studySets.id, { onDelete: "cascade" }),
  position: integer("position").notNull().default(0),
  payload: jsonb("payload").notNull(), // { question, answer, options, explanation, difficulty }
});

