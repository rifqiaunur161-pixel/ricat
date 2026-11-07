import { FastifyPluginAsync } from "fastify";
import { db } from "@ricat/db";
import { sql } from "drizzle-orm";

export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/healthz", async (request, reply) => {
    let dbStatus = "healthy";
    try {
      await db.execute(sql`SELECT 1`);
    } catch {
      dbStatus = "unreachable";
    }

    const isHealthy = dbStatus === "healthy";

    return reply.status(isHealthy ? 200 : 503).send({
      status: isHealthy ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      services: {
        database: dbStatus,
        api: "healthy",
      },
    });
  });
};

