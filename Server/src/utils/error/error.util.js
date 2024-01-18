import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { logger } from "../log/logger.util";

export class ErrorResponseObject {
  statusCode;
  responseMessage;
  logMessage;
}

export const throwServerError = (error, res) => {
  let errorResponseObject = null;

  if (
    error instanceof Prisma.PrismaClientRustPanicError ||
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientValidationError ||
    error instanceof Prisma.PrismaClientKnownRequestError
  ) {
    errorResponseObject = {
      statusCode: 500,
      responseMessage: "Internal server error.",
      logMessage: error
    };
  } else if (error instanceof ZodError) {
    errorResponseObject = {
      statusCode: 400,
      responseMessage: "Invalid request format",
      logMessage: error
    };
  } else {
    errorResponseObject = {
      statusCode: 418,
      responseMessage: "Unhandled error",
      logMessage: error
    };
  }

  logger.log({
    level: "error",
    message: error
  });

  res.statusMessage = errorResponseObject.responseMessage;
  return res.status(errorResponseObject.statusCode).end();
};

export const throwClientError = (
  statusCode,
  responseMessage,
  res
) => {
  res.statusMessage = responseMessage;
  return res.status(statusCode).end();
};