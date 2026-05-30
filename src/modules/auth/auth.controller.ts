import { Request, Response, NextFunction } from 'express';
import authService from './auth.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';

export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await authService.register(req.body);
  sendSuccess(res, 201, 'User registered successfully', { user });
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token = await authService.login(req.body);
  sendSuccess(res, 200, 'Login successful', { token });
});
