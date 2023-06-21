import { Response } from "express";
import { ApiResponse } from "./handler.interface";

export default function responseHandler<T>(
  res: Response,
  message: string,
  data: T,
  statusCode?: number
): void {
  const responseBody: ApiResponse<T> = {
    success: true,
    msg: message,
    data,
  };
  res.status(statusCode || 200).json(responseBody);
}
