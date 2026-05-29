import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  // Placeholder for actual JWT validation
  next();
};
