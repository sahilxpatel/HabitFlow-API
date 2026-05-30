import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: z.ZodSchema<any>, target: 'body' | 'query' | 'params' = 'body') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req[target] = await schema.parseAsync(req[target]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const zodError = error as any;
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: zodError.errors.map((err: any) => ({ field: err.path.join('.'), message: err.message }))
        });
      } else {
        next(error);
      }
    }
  };
};
