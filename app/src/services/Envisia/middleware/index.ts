import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

export const validateRequestBody = (schema: yup.AnyObjectSchema) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      req.body = await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        res.status(400).json({ validationError: error.errors });
      } else {
        next(error);
      }
    }
  };
};
