import { Response } from "express";
import { logger } from "../logger";
import { ApiResponse } from "./handler.interface";

export class AppError extends Error {
  readonly reference;
  readonly name: string;
  readonly errorCode: number;
  readonly errors: object[];
  constructor(
    reference = "Anonymous",
    msg = "Something went wrong!",
    errorCode = 500,
    name = "custom",
    errors = []
  ) {
    super(msg);
    this.reference = reference;
    this.errorCode = errorCode;
    this.name = name;
    this.errors = errors;
  }
}

export default function errorHandler(error: AppError, res: Response): void {
  let errorCode = error.errorCode || 500;
  let msg = error.message || null;
  let errors = error.errors || [];
  let reference = error.reference || "Anonymous";

  if (error.name === "custom") {
  } else {
    console.log(error, error.message);
    msg = "Server Error!";
  }

  logger.error(
    `Error: {reference: ${reference}, message: ${msg}, errorCode: ${errorCode}, error: ${
      error.message
    }, errors: ${JSON.stringify(errors)}`
  );

  const responseBody: ApiResponse<undefined> = {
    success: false,
    msg,
    data: undefined,
    errorCode,
    errors,
  };

  res.status(errorCode).json(responseBody);
}
