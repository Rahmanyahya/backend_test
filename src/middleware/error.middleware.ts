import { NextFunction, Response } from "express";
import { UserRequest } from "../config/web";
import { ZodError } from "zod";
import { ErrorHandler } from "../config/error.handler";

export const ErrorMiddleware = (
    err: any,
    req: UserRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (err instanceof ErrorHandler) {
      res.status(err.code).json({ message: err.message });
    } else if (err instanceof ZodError) {
      res.status(400).json({ message: err });
    } else {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
}