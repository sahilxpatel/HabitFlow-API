import { Request, Response, NextFunction } from 'express';
import trackingService from './tracking.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';

export const markAsDone = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const log = await trackingService.markAsDone(req.user.userId, req.params.id as string);
  sendSuccess(res, 201, 'Habit marked as done', log);
});

export const getHistory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const logs = await trackingService.getHistory(req.user.userId, req.params.id as string);
  sendSuccess(res, 200, 'History fetched successfully', logs);
});
