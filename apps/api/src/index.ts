import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import cookie from "@fastify/cookie";
import rateLimit from "@fastify/rate-limit";
import sensible from "@fastify/sensible";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import crypto from "crypto";

import { env } from "./config/env.js";
import { globalErrorHandler } from "./lib/errorHandler.js";
import { healthRoutes } from "./routes/health.js";

async function buildServer() {
  const fastify = Fastify({
    logger: {
      level: env.NODE_ENV === "production" ? "info" : "debug",
      transport:
        env.NODE_ENV !== "production"
          ? {
              target: "pino-pretty",
              options: {
                translateTime: "HH:MM:ss Z",
                ignore: "pid,hostname",
              },
            }
          : undefined,
    },
    genReqId: (req) => {
      return (req.headers["x-request-id"] as string) || crypto.randomUUID();
    },
  }).withTypeProvider<ZodTypeProvider>();

  // Zod Type Providers
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  // Security & Core Middleware Plugins
  await fastify.register(helmet, {
    contentSecurityPolicy: env.NODE_ENV === "production",
  });

  await fastify.register(cors, {
    origin: [env.CORS_ORIGIN],
    credentials: true,
  });

  await fastify.register(cookie, {
    secret: env.COOKIE_SECRET,
  });

  await fastify.register(sensible);

  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });

  // Attach Correlation ID to all response headers
  fastify.addHook("onSend", async (request, reply) => {
    reply.header("x-request-id", request.id);
  });

  // Global Error Handler
  fastify.setErrorHandler(globalErrorHandler);

  // Routes Registration
  await fastify.register(healthRoutes);

  return fastify;
}

async function start() {
  try {
    const server = await buildServer();
    await server.listen({
      port: env.PORT,
      host: env.HOST,
    });
    console.log(`🚀 ricat API Server berjalan di http://${env.HOST}:${env.PORT}`);
  } catch (err) {
    console.error("❌ Gagal memulai API server:", err);
    process.exit(1);
  }
}

start();

