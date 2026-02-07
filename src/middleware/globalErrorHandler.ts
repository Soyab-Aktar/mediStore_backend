import { Request, Response, NextFunction } from "express";
import { Prisma } from "../../generated/prisma/client";
import { AppError } from "../scripts/appError";


const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  /* ---------------- CUSTOM APP ERROR ---------------- */
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  /* ---------------- PRISMA VALIDATION ---------------- */
  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid input data. Please check required fields.";
  }

  /* ---------------- PRISMA KNOWN ERRORS ---------------- */
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = 409;
        message = "Duplicate entry. This record already exists.";
        break;

      case "P2003":
        statusCode = 400;
        message = "Invalid reference. Related record not found.";
        break;

      case "P2025":
        statusCode = 404;
        message = "Requested resource not found.";
        break;

      case "P2000":
        statusCode = 400;
        message = "Input value is too long for the field.";
        break;

      case "P2014":
        statusCode = 400;
        message = "Invalid relation operation.";
        break;

      default:
        statusCode = 400;
        message = "Database operation failed.";
    }
  }

  /* ---------------- PRISMA INIT / CONNECTION ---------------- */
  else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 500;
    message = "Database initialization failed.";
  }

  else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    message = "Unknown database error occurred.";
  }

  /* ---------------- FALLBACK ---------------- */
  else if (err instanceof Error) {
    statusCode = 400;
    message = err.message;
  }

  /* ---------------- RESPONSE ---------------- */
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

export default errorHandler;
