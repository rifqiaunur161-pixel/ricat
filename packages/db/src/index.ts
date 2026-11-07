import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index.js";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://ricat:ricat_secret_password@localhost:5432/ricat_db";

// Global connection pool for serverless/long-running node environments
export const client = postgres(connectionString, {
  max: process.env.DB_MAX_CONNECTIONS ? Number(process.env.DB_MAX_CONNECTIONS) : 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(client, { schema });

export * from "./schema/index.js";

