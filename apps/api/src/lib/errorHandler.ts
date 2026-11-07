import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export function globalErrorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.error({ err: error, requestId: request.id }, "Terjadi kesalahan saat memproses permintaan");

  // Zod Validation Errors
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: {
        code: "VALIDATION_ERROR",
        message: "Format masukan tidak valid",
        details: error.flatten().fieldErrors,
      },
    });
  }

  // Fastify Validation Errors
  if (error.validation) {
    return reply.status(400).send({
      error: {
        code: "VALIDATION_ERROR",
        message: error.message,
      },
    });
  }

  // Rate Limiting Errors
  if (error.statusCode === 429) {
    return reply.status(429).send({
      error: {
        code: "RATE_LIMIT_EXCEEDED",
        message: "Terlalu banyak permintaan. Silakan tunggu beberapa saat.",
      },
    });
  }

  // Standard or Fallback Internal Server Error
  const statusCode = error.statusCode || 500;
  return reply.status(statusCode).send({
    error: {
      code: error.code || "INTERNAL_SERVER_ERROR",
      message:
        statusCode >= 500
          ? "Terjadi gangguan internal server. Tim teknis sedang menanganinya."
          : error.message,
    },
  });
}

