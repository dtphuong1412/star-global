import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import ValidationException from "../exceptions/validationException";

export default (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationException(
      "Validation Errors",
      errors.array().map((o) => {
        return { field: o.param, message: o.msg };
      })
    );
  }
  next();
};
