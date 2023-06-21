import { NextFunction, Request, RequestHandler, Response } from "express";
import { AppError } from "../handler/errorHandler";
import { ValidationResult } from "joi";

type ValidatorFunction<T> = (data: T) => ValidationResult;

export default function validator<T>(
  validator: ValidatorFunction<T>
): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction): void {
    const reference: string = "validator";
    try {
      const data = {
        ...req.params,
        ...req.query,
        ...req.body,
      };
      const { error } = validator(data);
      if (error) {
        throw new AppError(
          reference,
          error.details?.[0]?.message.replace(/"/g, "") as string,
          412
        );
      }
      next();
    } catch (error) {
      return next(error);
    }
  };
}
